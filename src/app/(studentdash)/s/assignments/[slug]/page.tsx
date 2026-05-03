"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Download, Send, X, ArrowLeft, File, AlertCircle } from "lucide-react";
import { StudentAPI, asArray } from "@/lib/api";
import { toast } from "react-hot-toast";

type ResourceItem = {
  id: string;
  name: string;
  url?: string;
};

type CommentItem = {
  id: string;
  author: string;
  date: string;
  text: string;
};

type AssignmentView = {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  mentor: {
    name: string;
    session: string;
    avatar: string;
  };
  resources: ResourceItem[];
  comments: CommentItem[];
  submittedFiles: ResourceItem[];
  status: string;
};

const EMPTY_ASSIGNMENT: AssignmentView = {
  id: "",
  title: "",
  dueDate: "",
  description: "",
  mentor: {
    name: "Educator",
    session: "",
    avatar: "https://ui-avatars.com/api/?name=Educator&background=random",
  },
  resources: [],
  comments: [],
  submittedFiles: [],
  status: "",
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

const formatDueDate = (value?: string) => {
  if (!value) return "TBD";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).toUpperCase();
};

const getBadgeDetails = (dueDateStr: string, status: string) => {
  const normalizedStatus = status.toLowerCase();
  if (["submitted", "completed", "review done", "reviewed", "graded"].includes(normalizedStatus)) {
    return { text: "SUBMITTED", color: "bg-[#ECFDF5] text-[#059669]" };
  }

  if (!dueDateStr) {
    return { text: "DUE: TBD", color: "bg-[#F1F5F9] text-[#64748B]" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);

  if (Number.isNaN(due.getTime())) {
    return { text: `DUE: ${dueDateStr}`, color: "bg-[#F1F5F9] text-[#64748B]" };
  }

  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const formattedDate = formatDueDate(dueDateStr);

  if (diffDays < 0) {
    return { text: `OVERDUE: ${formattedDate}`, color: "bg-[#FFF0F2] text-[#E11D48]" };
  }

  if (diffDays <= 2) {
    return { text: `DUE: ${formattedDate}`, color: "bg-[#FFF7ED] text-[#EA580C]" };
  }

  return { text: `DUE: ${formattedDate}`, color: "bg-[#F1F5F9] text-[#64748B]" };
};

const mapAssignmentDetails = (item: any, assignmentId: string): AssignmentView => {
  const payload = item?.data ?? item;
  const base = payload?.assignment ?? payload;

  const toDownloadUrl = (value?: string) => {
    if (!value) return undefined;
    const url = String(value);
    if (/^https?:\/\//i.test(url)) return url;
    // Many APIs return a Supabase storage path; keep consistent with existing pages.
    return `https://rvleyzlrzxdkgfyqrvzy.supabase.co/storage/v1/object/public/${url.replace(/^\/+/, "")}`;
  };

  const mentorName =
    base.educatorName ||
    base.mentorName ||
    base.educator?.name ||
    base.assignedBy ||
    "Educator";

  const resourceSource = [...asArray(base.resources), ...asArray(base.files), ...asArray(base.attachments)];

  const primaryDocumentUrl = base.documentUrl || base.fileUrl || base.url;
  const primaryDocumentPath = base.documentPath || base.path;
  const primaryDocumentName =
    base.documentPath?.split("/").pop() || base.documentName || base.fileName || `${base.title || "Assignment"} resource`;

  const sessionResources = asArray(base.sessionResources || base.courseResources || base.session?.resources || base.course?.resources);

  const combinedResources = [
    ...(primaryDocumentUrl || primaryDocumentPath
      ? [
          {
            id: "resource-primary",
            name: primaryDocumentName,
            url: primaryDocumentUrl ? toDownloadUrl(primaryDocumentUrl) : toDownloadUrl(primaryDocumentPath),
          },
        ]
      : []),
    ...resourceSource,
    ...sessionResources,
  ];

  const normalizeResourceUrl = (value?: string) => (value ? String(value).trim() : "");
  const uniqueResources = new Map<string, { id: string; name: string; url?: string }>();
  combinedResources.forEach((resource: any, index: number) => {
    const name = resource?.name || resource?.title || resource?.fileName || resource?.documentName || "Resource Document";
    const url =
      resource?.url ||
      resource?.fileUrl ||
      resource?.documentUrl ||
      resource?.path ||
      resource?.documentPath ||
      undefined;
    const downloadUrl = toDownloadUrl(url);
    const key = `${name}::${normalizeResourceUrl(url)}`;
    if (!uniqueResources.has(key)) {
      uniqueResources.set(key, {
        id: String(resource?.id || resource?._id || resource?.resourceId || index),
        name,
        url: downloadUrl,
      });
    }
  });

  const submittedFiles = asArray(base.submittedFiles || base.submissions || base.documents || payload?.submissions).map(
    (file: any, index: number) => ({
      id: String(file.id || file._id || file.submissionId || index),
      name: file.name || file.fileName || file.documentName || "Submission.pdf",
      url: file.url || file.fileUrl || file.documentUrl,
    }),
  );

  const comments = asArray(base.comments || base.feedbacks || base.activity || payload?.comments).map((comment: any, index: number) => ({
    id: String(comment.id || comment._id || index),
    author: comment.author || comment.name || comment.educatorName || mentorName,
    date: formatDateTime(comment.createdAt || comment.updatedAt || comment.date),
    text: comment.text || comment.comment || comment.message || "",
  }));

  return {
    id: String(base.id || base._id || base.assignmentId || assignmentId),
    title: base.title || base.assignmentTitle || base.sessionTitle || "Untitled Assignment",
    dueDate: base.dueDate || base.deadline || "",
    description: base.description || base.details || "No assignment description available.",
    mentor: {
      name: mentorName,
      session:
        base.sessionTitle || base.sessionName || base.courseTitle || base.course?.title || payload?.courseTitle || "Assignment Session",
      avatar:
        base.educator?.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorName)}&background=random`,
    },
    resources: Array.from(uniqueResources.values()),
    comments,
    submittedFiles,
    status: String(base.status || payload?.status || ""),
  };
};

export default function AssignmentSlugPage() {
  const params = useParams();
  const assignmentId = String(params?.slug || "");
  const [assignmentData, setAssignmentData] = useState<AssignmentView>(EMPTY_ASSIGNMENT);
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; file: File }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      if (!assignmentId) return;

      try {
        setIsLoading(true);
        setError("");

        const extractEnrolledCourses = (response: any): any[] => {
          const payload = response?.data ?? response;
          return asArray(
            payload?.enrolledCourses ||
              payload?.enrolledSessions ||
              payload?.sessions ||
              payload?.list ||
              payload?.courses ||
              payload ||
              [],
          );
        };

        const getCourseId = (course: any): string =>
          String(
            course?.courseId ||
              course?._id ||
              course?.id ||
              course?.sessionId ||
              course?.course?._id ||
              course?.course?.id ||
              course?.session?._id ||
              course?.session?.id ||
              "",
          );

        const getCourseTitle = (course: any): string =>
          String(course?.courseTitle || course?.sessionTitle || course?.title || course?.course?.title || "");

        const getAssignmentId = (assignment: any): string =>
          String(assignment?.id || assignment?._id || assignment?.assignmentId || assignment?.assignment_id || "");

        const getAssignmentCourseId = (assignment: any): string =>
          String(
            assignment?.courseId ||
              assignment?.sessionId ||
              assignment?.course?._id ||
              assignment?.course?.id ||
              assignment?.session?._id ||
              assignment?.session?.id ||
              "",
          );

        const toResourceList = (course: any) =>
          [
            ...asArray(course?.resources),
            ...asArray(course?.files),
            ...asArray(course?.materials),
            ...asArray(course?.documents),
          ].map((resource: any, index: number) => ({
            id: String(resource.id || resource._id || index),
            name: resource.title || resource.name || resource.fileName || "Resource",
            url: resource.url || resource.fileUrl || resource.documentUrl || resource.path,
          }));

        const flattenAssignmentsFromCourse = (course: any) => {
          const fullCourse = course?.fullCourseData || course;
          const courseId = getCourseId(fullCourse) || getCourseId(course);
          const courseTitle = getCourseTitle(fullCourse) || getCourseTitle(course);
          const educatorName =
            fullCourse?.educator?.name || course?.educator?.name || course?.mentor?.name || course?.educatorName || "Educator";
          const sessionResources = toResourceList(fullCourse);

          const list = asArray(fullCourse?.assignments || course?.assignments || fullCourse?.course?.assignments || []);
          return list
            .map((assignment: any) => {
              const id = getAssignmentId(assignment);
              if (!id) return null;
              return {
                id,
                title: assignment?.title || assignment?.assignmentTitle || "Untitled Assignment",
                dueDate: assignment?.dueDate || assignment?.deadline || assignment?.createdAt || "",
                status: String(assignment?.status || ""),
                courseId: String(courseId || getAssignmentCourseId(assignment)),
                courseTitle,
                educatorName,
                documentUrl: assignment?.documentUrl || assignment?.fileUrl || assignment?.url,
                documentPath: assignment?.documentPath || assignment?.path,
                courseResources: sessionResources,
              };
            })
            .filter(Boolean);
        };

        const enrolledResult = await StudentAPI.getEnrolledSessions();
        const enrolledCourses = extractEnrolledCourses(enrolledResult);
        const enrolledCourseIds = new Set(enrolledCourses.map(getCourseId).filter(Boolean));

        const courseDerivedAssignments = enrolledCourses.flatMap(flattenAssignmentsFromCourse);
        const courseAssignmentIds = new Set(courseDerivedAssignments.map((a: any) => String(a.id)).filter(Boolean));

        let studentScopedAssignments: any[] = [];
        try {
          const studentAssignmentsResult: any = await StudentAPI.getAssignments();
          studentScopedAssignments = asArray(studentAssignmentsResult?.data || studentAssignmentsResult);
        } catch (studentAssignmentsError) {
          console.warn("Student assignments list unavailable; using course-derived list", studentAssignmentsError);
        }

        const filteredStudentAssignments = studentScopedAssignments.filter((assignment: any) => {
          const id = getAssignmentId(assignment);
          const courseId = getAssignmentCourseId(assignment);
          if (id && courseAssignmentIds.has(id)) return true;
          if (courseId && enrolledCourseIds.has(courseId)) return true;

          const linkedTitle = String(
            assignment?.courseTitle || assignment?.sessionTitle || assignment?.sessionName || "",
          ).toLowerCase();
          if (!linkedTitle) return false;
          return enrolledCourses.some((course: any) => getCourseTitle(course).toLowerCase() === linkedTitle);
        });

        const mergedById = new Map<string, any>();
        for (const item of courseDerivedAssignments) {
          if (!item) continue;
          mergedById.set(String(item.id), item);
        }
        for (const item of filteredStudentAssignments) {
          const id = getAssignmentId(item);
          if (!id) continue;
          const existing = mergedById.get(id) || {};
          mergedById.set(id, {
            ...existing,
            ...item,
            id,
            courseId: existing.courseId || getAssignmentCourseId(item),
            courseTitle:
              existing.courseTitle || item?.courseTitle || item?.sessionTitle || item?.sessionName || item?.course?.title,
            educatorName: existing.educatorName || item?.educatorName || item?.mentorName || item?.educator?.name,
            dueDate: item?.dueDate || item?.deadline || existing.dueDate,
            courseResources: existing.courseResources,
          });
        }

        const mergedAssignments = Array.from(mergedById.values());
        const match = mergedAssignments.find((assignment: any) => String(assignment.id) === assignmentId);

        if (!match) {
          throw new Error("Assignment not found.");
        }

        const mapped = mapAssignmentDetails(match, assignmentId);
        setAssignmentData(mapped);
        setComments(mapped.comments);
      } catch (fetchError: any) {
        console.error("Student assignment detail fetch failed", fetchError);
        setAssignmentData(EMPTY_ASSIGNMENT);
        setComments([]);
        setError(fetchError?.message || "Unable to load assignment details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  const badge = useMemo(
    () => getBadgeDetails(assignmentData.dueDate, assignmentData.status),
    [assignmentData.dueDate, assignmentData.status],
  );

  const hasSubmittedFiles = assignmentData.submittedFiles.length > 0 || uploadedFiles.length > 0;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const nextFiles = Array.from(event.target.files).map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));

    setUploadedFiles((current) => [...current, ...nextFiles]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    if (!event.dataTransfer.files?.length) return;

    const nextFiles = Array.from(event.dataTransfer.files).map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));

    setUploadedFiles((current) => [...current, ...nextFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((current) => current.filter((file) => file.id !== id));
  };

  const handleSubmit = async () => {
    if (!uploadedFiles.length || !assignmentId) {
      toast.error("Please add at least one file before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await StudentAPI.submitAssignment(assignmentId, uploadedFiles[0].file);
      toast.success("Assignment submitted successfully.");
      setAssignmentData((current) => ({
        ...current,
        status: "submitted",
        submittedFiles: uploadedFiles.map((item) => ({
          id: item.id,
          name: item.file.name,
        })),
      }));
      setUploadedFiles([]);
    } catch (submitError) {
      console.error("Student assignment submit failed", submitError);
      toast.error("Unable to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendComment = async () => {
    if (!comment.trim() || !assignmentId) return;

    try {
      await StudentAPI.addAssignmentComment({ assignmentId, comment });
      const nextComment = {
        id: crypto.randomUUID(),
        author: "You",
        date: formatDateTime(new Date().toISOString()),
        text: comment,
      };

      setComments((current) => [...current, nextComment]);
      setComment("");
      toast.success("Comment added.");
    } catch (commentError) {
      console.error("Student assignment comment failed", commentError);
      toast.error("Unable to add comment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white md:bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading assignment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-white md:bg-[#F8F9FA] flex items-center justify-center px-4">
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 max-w-lg text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load assignment</h2>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white md:bg-[#F8F9FA] md:p-8 md:mt-2 font-sans pb-18 md:pb-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex md:hidden items-center gap-2 mb-2 px-4 pt-6">
          <Link href="/s/assignments" className="text-gray-900 flex items-center gap-2 font-semibold text-[16px] md:text-[18px]">
            <ArrowLeft size={20} /> Assignments
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[13px] font-medium mb-6 px-2 text-gray-500">
          <Link href="/s/sessions" className="hover:text-gray-900 transition-colors">
            Sessions
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-500 truncate">{assignmentData.mentor.session}</span>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-6 bg-white md:bg-transparent">
          <div className="order-1 md:col-span-2 bg-white p-4 md:p-8 border-b border-gray-200 md:border md:border-gray-100 md:rounded-[24px] md:shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col md:flex-row md:items-start justify-start gap-4 mb-5 md:mb-6">
              <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-900 leading-snug inline-block">
                {assignmentData.title}
                <span className={`md:hidden inline-flex ml-2 align-middle ${badge.color} text-[11px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider`}>
                  {badge.text}
                </span>
              </h1>
              <span className={`hidden md:inline-flex shrink-0 ${badge.color} text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mt-1`}>
                {badge.text}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <img
                src={assignmentData.mentor.avatar}
                alt={assignmentData.mentor.name}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0"
              />
              <div>
                <h3 className="text-[14px] md:text-[15px] font-medium text-gray-900">{assignmentData.mentor.name}</h3>
                <p className="text-[12px] md:text-[13px] text-gray-500 line-clamp-1 md:line-clamp-none">
                  {assignmentData.mentor.session}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-[12px] font-normal text-gray-500 uppercase tracking-wider mb-2 md:mb-3">DESCRIPTION</h4>
              <p className="text-[14px] text-gray-600 leading-[1.6]">{assignmentData.description}</p>
            </div>
          </div>

          <div className="order-2 md:col-span-1 md:col-start-3 md:row-start-1 bg-white p-4 md:p-8 border-b border-gray-100 md:border md:border-gray-100 md:rounded-[24px] md:shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <h2 className="text-[16px] md:text-[18px] font-medium text-gray-900">Assignment Resources</h2>
              <span className="bg-[#F1F5F9] text-gray-600 text-[11px] md:text-[12px] font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full">
                {assignmentData.resources.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {assignmentData.resources.length === 0 ? (
                <p className="text-sm text-gray-500">No resources added for this assignment.</p>
              ) : (
                assignmentData.resources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-[16px] p-3 flex items-center justify-between gap-3 bg-white hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-[#EEF2FF] text-[#042BFD] rounded-[10px] flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
                        PDF
                      </div>
                      <h4 className="text-[14px] font-medium md:font-semibold text-gray-900 truncate">
                        {resource.name}
                      </h4>
                    </div>
                    <a
                      href={resource.url || "#"}
                      target={resource.url ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors shrink-0 pr-1"
                    >
                      <Download size={18} strokeWidth={1.5} />
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="order-3 md:col-span-2 md:row-start-2 bg-white p-4 md:p-8 border-b border-gray-100 md:border md:border-gray-100 md:rounded-[24px] md:shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <h2 className="text-[16px] md:text-[18px] font-semibold text-gray-900">
                {hasSubmittedFiles ? "Your Submissions" : "Upload Your Submissions Here"}
              </h2>
              <span className="md:hidden bg-gray-100 text-gray-500 text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {assignmentData.submittedFiles.length + uploadedFiles.length}
              </span>
            </div>

            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc"
            />

            {!hasSubmittedFiles && (
              <>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`hidden md:flex border-2 border-dashed rounded-[16px] p-6 flex-col md:flex-row items-center justify-between gap-4 transition-all ${
                    isDragging ? "border-[#042BFD] bg-[#EEF2FF]" : "border-[#C7D2FE] bg-white "
                  }`}
                >
                  <div className="invisible">Dummy</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <img src="/images/upload.svg" alt="Upload" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">
                        Drag and Drop or Choose the file to be uploaded
                      </h4>
                      <p className="text-[13px] text-gray-500">Only .docx, or .pdf file up to 20 MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full md:w-auto bg-[#f6f8ff] border border-[#C7D2FE] text-[#042BFD] text-[14px] font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-100 transition-colors shrink-0 shadow-sm"
                  >
                    Browse Files
                  </button>
                </div>

                {uploadedFiles.length === 0 && (
                  <div className="flex md:hidden flex-col items-center justify-center py-6 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <File size={32} strokeWidth={1} className="text-gray-300 mb-2" />
                    <p className="text-[12px] text-gray-500">All your submissions will appear here</p>
                  </div>
                )}
              </>
            )}

            {(uploadedFiles.length > 0 || assignmentData.submittedFiles.length > 0) && (
              <div className="mt-2 md:mt-4 flex flex-col gap-3">
                {[...assignmentData.submittedFiles, ...uploadedFiles.map((item) => ({ id: item.id, name: item.file.name }))].map((fileObj) => (
                  <div key={fileObj.id} className="border border-gray-200 rounded-[16px] p-4 flex items-center justify-between gap-4 bg-white">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 bg-[#EEF2FF] text-[#042BFD] rounded-[12px] flex items-center justify-center text-[11px] font-bold tracking-wider shrink-0 border border-[#E0E7FF]">
                        {fileObj.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOC"}
                      </div>
                      <h4 className="text-[14px] font-medium text-gray-900 truncate pr-4">{fileObj.name}</h4>
                    </div>
                    {uploadedFiles.find((file) => file.id === fileObj.id) ? (
                      <button onClick={() => handleRemoveFile(fileObj.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <X size={18} />
                      </button>
                    ) : (
                      <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shrink-0">
                        <Download size={20} strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                ))}

                {uploadedFiles.length > 0 && (
                  <div className="hidden md:flex justify-end mt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-[#111111] hover:bg-black text-white text-[14px] font-semibold px-8 py-3 rounded-xl transition-colors shadow-md disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Assignment"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="order-4 md:col-span-1 md:col-start-3 md:row-start-2 bg-white p-4 md:p-8 flex flex-col h-full md:border md:border-gray-100 md:rounded-[24px] md:shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <h2 className="text-[16px] md:text-[18px] font-medium text-gray-900 mb-4 md:mb-6">Add Private Comment</h2>

            <div className="flex-1 hidden md:flex flex-col justify-end min-h-[50px] md:min-h-[100px] mb-4 gap-3">
              {comments.length === 0 ? (
                <p className="text-sm text-gray-500">No comments yet.</p>
              ) : (
                comments.map((commentItem) => (
                  <div key={commentItem.id} className="bg-[#F8FAFC] rounded-[16px] p-4 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] font-bold text-gray-900">{commentItem.author}</span>
                      <span className="text-[11px] text-gray-400">{commentItem.date}</span>
                    </div>
                    <p className="text-[14px] text-gray-600 italic leading-relaxed">{commentItem.text}</p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto mb-2 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter here"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSendComment()}
                  className="w-full border border-gray-200 rounded-[14px] pl-4 pr-12 py-3 md:py-3.5 text-[13px] md:text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#042BFD] transition-all"
                />
                <button onClick={handleSendComment} className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#042BFD] transition-colors rounded-lg">
                  <Send size={18} strokeWidth={2} />
                </button>
              </div>
              <p className="text-[12px] md:text-[11px] text-gray-400 mt-2 pl-1">
                Private comments are only visible to you and your mentor
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="md:hidden mt-6 w-full">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] hover:bg-black text-white text-[18px] font-normal py-3.5 rounded-xl transition-colors shadow-md disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
