"use client";

import React, { useEffect, useMemo, useState, use } from "react";
import Link from "next/link";
import { FileText, DownloadCloud, ChevronRight, Send, Download, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { EducatorAPI, asArray } from "@/lib/api";
import { toast } from "react-hot-toast";

type SubmissionView = {
  id: string;
  name: string;
  url?: string;
  studentName: string;
  status: string;
};

type CommentView = {
  id: string;
  author: string;
  date: string;
  text: string;
};

type AssignmentDetailsView = {
  id: string;
  title: string;
  description: string;
  sessionTitle: string;
  studentName: string;
  resources: Array<{ id: string; name: string; url?: string }>;
  submissions: SubmissionView[];
  comments: CommentView[];
  status: string;
};

const formatDateTime = (value?: string) => {
  if (!value) return "Just now";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
};

const mapAssignment = (item: any, assignmentId: string): AssignmentDetailsView => {
  const payload = item?.data ?? item;
  const base = payload?.assignment ?? payload?.data ?? payload;

  const toDownloadUrl = (value?: string) => {
    if (!value) return undefined;
    const url = String(value);
    if (/^https?:\/\//i.test(url)) return url;
    return `https://rvleyzlrzxdkgfyqrvzy.supabase.co/storage/v1/object/public/${url.replace(/^\/+/, "")}`;
  };

  const studentName =
    base.assignedStudents?.[0]?.name ||
    base.studentName ||
    base.student?.name ||
    "Student";

  return {
    id: String(base.id || base._id || base.assignmentId || assignmentId),
    title: base.title || "Assignment",
    description: base.description || "No assignment description available.",
    sessionTitle: base.sessionTitle || base.course?.title || base.title || "Session",
    studentName,
    resources: [
      ...(base.documentUrl
        ? [
            {
              id: "resource-primary",
              name: base.documentPath?.split("/").pop() || `${base.title || "Assignment"} resource`,
              url: toDownloadUrl(base.documentUrl),
            },
          ]
        : base.documentPath
          ? [
              {
                id: "resource-primary",
                name: base.documentPath?.split("/").pop() || `${base.title || "Assignment"} resource`,
                url: toDownloadUrl(base.documentPath),
              },
            ]
          : []),
      ...asArray(base.resources || payload?.resources || base.files || base.attachments).map((resource: any, index: number) => ({
        id: String(resource.id || resource._id || index),
        name: resource.name || resource.title || "Resource",
        url: toDownloadUrl(resource.url || resource.fileUrl || resource.documentUrl || resource.path || resource.documentPath),
      })),
    ],
    submissions: asArray(base.submissions || payload?.submissions || base.submittedFiles || base.documents).map(
      (submission: any, index: number) => ({
      id: String(submission.id || submission._id || index),
      name: submission.fileName || submission.documentName || submission.name || "Submission.pdf",
        url: toDownloadUrl(submission.fileUrl || submission.documentUrl || submission.url || submission.documentPath || submission.path),
      studentName: submission.studentName || submission.student?.name || studentName,
      status: String(submission.status || base.status || "pending"),
    }),
    ),
    comments: asArray(base.comments || base.feedbacks || payload?.comments).map((comment: any, index: number) => ({
      id: String(comment.id || comment._id || index),
      author: comment.author || comment.name || "Mentor",
      date: formatDateTime(comment.createdAt || comment.updatedAt || comment.date),
      text: comment.text || comment.comment || "",
    })),
    status: String(base.status || payload?.status || "pending"),
  };
};

export default function EducatorAssignmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const assignmentId = unwrappedParams.id;
  const [assignmentData, setAssignmentData] = useState<AssignmentDetailsView | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setIsLoading(true);
        setError("");
        // Fetch assignment details - uses GET /api/educator/assignments/{{id}} (from Postman)
        // Returns: assignment details + all student submissions with submitted files
        const response = await EducatorAPI.getAssignmentById(assignmentId);
        const mappedData = mapAssignment(response, assignmentId);
        
        // Log for debugging
        console.log("Educator assignment details:", mappedData);
        console.log("Student submissions:", mappedData.submissions);
        
        setAssignmentData(mappedData);
      } catch (fetchError: any) {
        console.error("Failed to load educator assignment data", fetchError);
        setAssignmentData(null);
        setError(fetchError?.message || "Unable to load assignment.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const submissionState = useMemo(() => {
    const normalizedStatus = String(assignmentData?.status || "").toLowerCase();
    if (["review done", "reviewed", "completed"].includes(normalizedStatus)) return 3;
    if (assignmentData?.submissions.length) return 2;
    return 1;
  }, [assignmentData]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !assignmentData) return;

    try {
      await EducatorAPI.addFeedback({ assignmentId: assignmentData.id, text: commentText });
      setAssignmentData((current) =>
        current
          ? {
              ...current,
              comments: [
                ...current.comments,
                {
                  id: crypto.randomUUID(),
                  author: "You",
                  date: formatDateTime(new Date().toISOString()),
                  text: commentText,
                },
              ],
            }
          : current,
      );
      setCommentText("");
      toast.success("Feedback added.");
    } catch (commentError) {
      console.error("Failed to add educator feedback", commentError);
      toast.error("Failed to add feedback.");
    }
  };

  const handleApprove = async () => {
    if (!assignmentData?.submissions.length) return;

    setIsApproving(true);
    try {
      await EducatorAPI.reviewSubmission({
        submissionId: assignmentData.submissions[0].id,
        status: "reviewed",
        educatorRemark: "Reviewed by educator",
      });
      setAssignmentData((current) =>
        current
          ? {
              ...current,
              status: "review done",
              submissions: current.submissions.map((submission) => ({
                ...submission,
                status: "reviewed",
              })),
            }
          : current,
      );
      toast.success("Submission reviewed successfully.");
    } catch (approveError) {
      console.error("Failed to approve submission", approveError);
      toast.error("Failed to review submission.");
    } finally {
      setIsApproving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center font-sans">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading assignment details...</span>
        </div>
      </div>
    );
  }

  if (!assignmentData || error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center font-sans">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-lg text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load assignment</h2>
          <p className="text-sm text-gray-500">{error || "Assignment not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-10 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8 font-medium">
          <Link href="/e/sessions" className="hover:text-gray-900 transition-colors">
            Sessions
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-900 truncate max-w-lg">{assignmentData.sessionTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div>
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900">{assignmentData.title}</h1>
                  {submissionState === 2 && (
                    <span className="px-2.5 py-1 bg-orange-50 text-orange-600 outline outline-1 outline-orange-200 text-[10px] font-bold rounded uppercase tracking-wider">
                      NEEDS REVIEW
                    </span>
                  )}
                  {submissionState === 3 && (
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 outline outline-1 outline-green-200 text-[10px] font-bold rounded uppercase tracking-wider">
                      REVIEW DONE
                    </span>
                  )}
                  {submissionState === 1 && (
                    <span className="px-2.5 py-1 bg-gray-50 text-gray-600 outline outline-1 outline-gray-200 text-[10px] font-bold rounded uppercase tracking-wider">
                      PENDING SUBMISSION
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
                    <Image src={`https://ui-avatars.com/api/?name=${encodeURIComponent(assignmentData.studentName)}&background=random`} alt={assignmentData.studentName} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">Submitted By: {assignmentData.studentName}</h3>
                    <p className="text-[13px] text-gray-500">Student</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">DESCRIPTION</h4>
                <p className="text-[13px] text-gray-700 leading-[1.8] text-justify">{assignmentData.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              {submissionState === 1 ? (
                <div className="text-center py-10">
                  <h4 className="text-[15px] font-bold text-gray-500">Student has not submitted yet</h4>
                </div>
              ) : (
                <>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-4">Student Submissions</h4>
                  <div className="space-y-3">
                    {assignmentData.submissions.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl shadow-sm bg-[#F8FAFC]">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-lg shrink-0">
                            <FileText size={20} />
                          </div>
                          <span className="text-[13px] font-bold text-gray-900">{file.name}</span>
                        </div>
                        <a
                          href={file.url || "#"}
                          target={file.url ? "_blank" : undefined}
                          rel="noreferrer"
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          <DownloadCloud size={20} />
                        </a>
                      </div>
                    ))}
                  </div>

                  {submissionState === 2 && (
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={handleApprove}
                        disabled={isApproving}
                        className="px-8 py-2.5 bg-[#042BFD] text-white rounded-[12px] text-[13px] font-bold hover:bg-blue-700 transition-all shadow-sm disabled:opacity-60 flex items-center gap-2"
                      >
                        {isApproving && <Loader2 size={14} className="animate-spin" />}
                        {isApproving ? "Approving..." : "Approve Submission"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Educator PDF Section - Resources uploaded by educator */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-[13px] font-bold text-gray-900 mb-5">Educator PDF (Resources Uploaded)</h3>
              <div className="space-y-3">
                {assignmentData.resources.length === 0 ? (
                  <p className="text-sm text-gray-500">No resources uploaded.</p>
                ) : (
                  assignmentData.resources.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2.5 bg-blue-50/80 text-blue-600 rounded-lg shrink-0 flex items-center justify-center">
                          <FileText size={16} />
                        </div>
                        <span className="text-[13px] font-bold text-gray-900 truncate pr-4">{file.name}</span>
                      </div>
                      <a 
                        href={file.url || "#"} 
                        target={file.url ? "_blank" : undefined} 
                        rel="noreferrer" 
                        className="text-gray-400 hover:text-gray-600 transition-colors pr-1 shrink-0"
                        title="Download Resource"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col max-h-[500px]">
              <h3 className="text-[13px] font-bold text-gray-900 mb-5">Feedback / Comments</h3>

              <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
                {assignmentData.comments.length === 0 && <p className="text-xs text-gray-400">No feedback given yet.</p>}
                {assignmentData.comments.map((comment) => (
                  <div key={comment.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-start mb-2.5">
                      <span className="font-bold text-[13px] text-gray-900">{comment.author}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{comment.date}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">{comment.text}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-auto">
                <input
                  type="text"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleAddComment()}
                  placeholder="Enter feedback here..."
                  className="w-full text-[13px] font-medium border border-gray-200 rounded-[12px] py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500 bg-white placeholder-gray-400"
                />
                <button onClick={handleAddComment} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#042BFD] transition-colors">
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-3.5 flex items-start gap-1 font-medium">
                Feedback comments are visible to the student.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
