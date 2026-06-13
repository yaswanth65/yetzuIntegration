"use client";

import React, { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, Calendar, Clock, Timer, Users, Video, MoreVertical, 
  FileText, Download, Trash2, Plus, X, Loader2, CheckCircle2, 
  AlertCircle, Upload, Paperclip, Send 
} from "lucide-react";
import { EducatorAPI, asArray } from "@/lib/api";
import { authApi } from "@/lib/axios";
import { Session } from "../types";
import { shortenId } from "@/lib/utils/shortenId";
import { toast } from "react-hot-toast";

const isOneOnOneSession = (type?: string) => {
  const normalized = String(type || "").toLowerCase().replace(/\s+/g, "");
  return ["1:1", "1-1", "one-to-one", "onetoone", "mentorship", "mentor"].some((value) => normalized.includes(value));
};

const isActiveRescheduleRequest = (request: any) =>
  !["approved", "accepted", "rejected", "cancelled", "completed"].includes(String(request?.status || request?.action || "pending").toLowerCase());

const getRequestId = (request: any) => String(request?.id || request?._id || request?.requestId || request?.rescheduleRequestId || "");

const formatRequestDate = (request: any) => {
  const raw = request?.proposedDate || request?.proposed_date || request?.requestedDate || request?.date || request?.newDate;
  if (!raw) return "TBD";
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? String(raw) : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const formatRequestTime = (request: any) => {
  if (request?.proposedTime || request?.proposed_time) return String(request.proposedTime || request.proposed_time);
  const raw = request?.proposedDate || request?.proposed_date || request?.requestedDate || request?.date || request?.newDate;
  if (!raw) return "TBD";
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? "TBD" : date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

export default function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const sessionId = unwrappedParams.id;
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Menu Dropdown State
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modals States
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleError, setRescheduleError] = useState("");

  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentDueDate, setAssignmentDueDate] = useState("");
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentCreating, setAssignmentCreating] = useState(false);

  const [showUploadFile, setShowUploadFile] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [reviewingRequestId, setReviewingRequestId] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSessionAndData = async () => {
    setLoading(true);
    setError("");
    try {
      // 1. Fetch educator sessions list
      const sessionsRes = await EducatorAPI.getSessions();
      const apiSessions = asArray(sessionsRes);
      
      const foundItem = apiSessions.find((item: any, index: number) => {
        const id = item.id || item._id || item.sessionId || String(index);
        return String(id) === String(sessionId);
      });

      if (!foundItem) {
        throw new Error("Session not found");
      }

      // Map found session item to type Session
      const rawDate = foundItem.date || foundItem.scheduledDate || foundItem.startDateTime || foundItem.createdAt;
      const dateTime = rawDate ? new Date(rawDate) : new Date();
      const endDateTime = foundItem.endDateTime ? new Date(foundItem.endDateTime) : null;
      
      const now = new Date();
      const isPast = endDateTime ? endDateTime < now : dateTime < now;
      const isToday = dateTime.toDateString() === now.toDateString();
      const computedStatus = isToday ? "Ongoing" : isPast ? "Completed" : "Scheduled";

      let studentsCount = 0;
      const stu = foundItem.students;
      if (typeof stu === 'number' && !isNaN(stu)) {
        studentsCount = stu;
      } else if (Array.isArray(stu)) {
        studentsCount = stu.length;
      } else if (typeof foundItem.attendees === 'number' && !isNaN(foundItem.attendees)) {
        studentsCount = foundItem.attendees;
      }

      let sType = "Webinar";
      if (foundItem.type) {
        sType = typeof foundItem.type === "object" ? (foundItem.type.name || foundItem.type.type || "Webinar") : foundItem.type;
      }

      const mappedSession: Session = {
        id: foundItem.id || foundItem._id || foundItem.sessionId || sessionId,
        title: foundItem.title || foundItem.sessionTitle || foundItem.courseTitle || "Session",
        type: sType,
        attendees: studentsCount,
        date: dateTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        dateTime,
        startTime: dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        endTime: endDateTime ? endDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
        status: computedStatus,
        educator: foundItem.educator || "",
        resources: foundItem.resources || [],
        rescheduleRequests: foundItem.rescheduleRequests || foundItem.reschedule_requests || [],
      };

      setSession(mappedSession);
      setResources(foundItem.resources || []);

      // 2. Fetch session detail (includes assignmentDetails per spec)
      try {
        const detailRes = await authApi.get(`/api/educator/sessions/${sessionId}`);
        const detailData = detailRes?.data?.data || detailRes?.data || detailRes;
        const assignmentDetails = asArray(detailData?.assignmentDetails || detailData?.assignments || []);

        const mapped = assignmentDetails.flatMap((assignment: any) => {
          const submissions = asArray(assignment.submissions || assignment.submission || []);
          return submissions.map((sub: any) => ({
            id: sub.id || sub._id || "",
            studentName: sub.studentName || sub.student?.name || "Student",
            status: sub.status || "Pending",
            assignmentId: assignment.id || assignment._id || "#STU-4759483",
          }));
        });

        if (mapped.length > 0) {
          setSubmissions(mapped);
        } else {
          // Fallback: fetch from submissions endpoint filtered by courseId
          const subRes = await authApi.get("/api/educator/assignments/submissions", {
            params: { page: 1, limit: 100 }
          });
          const subData = subRes?.data?.data || subRes?.data || subRes;
          const subList = subData?.list || subData?.submissions || subData || [];

          const courseId = String(foundItem.courseId || foundItem.course?.id || foundItem.course?._id || "");
          const filtered = subList.filter((item: any) => {
            const itemSessionId = String(item.session?.id || item.session?._id || item.assignment?.session?.id || item.assignment?.session?._id || item.sessionId || "");
            const itemCourseId = String(item.courseId || item.course?.id || item.course?._id || item.assignment?.courseId || item.assignment?.course?.id || item.assignment?.course?._id || item.assignment?.course?.id || "");
            return itemSessionId === String(sessionId) || (courseId && itemCourseId === courseId) || item.sessionTitle === mappedSession.title;
          });

          setSubmissions(filtered.map((item: any) => ({
            id: item.id || item._id,
            studentName: item.studentName || item.student?.name || "Student",
            status: item.status || "Pending",
            assignmentId: item.assignmentId || item.assignment?.id || "#STU-4759483",
          })));
        }
      } catch (subErr) {
        console.error("Failed to load submissions for session", subErr);
        setSubmissions([]);
      }

    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load session details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndData();
  }, [sessionId]);

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRescheduleError("");

    if (!session) return;

    if (!isOneOnOneSession(session.type)) {
      setRescheduleError("Reschedule negotiation is available only for 1:1 sessions.");
      return;
    }

    if (!rescheduleDate || !rescheduleTime || !rescheduleReason.trim()) {
      setRescheduleError("Date, time, and reason are required.");
      return;
    }

    const proposedDateTime = new Date(`${rescheduleDate}T${rescheduleTime}`);
    if (Number.isNaN(proposedDateTime.getTime())) {
      setRescheduleError("Please choose a valid date and time.");
      return;
    }

    if (proposedDateTime.getTime() <= Date.now()) {
      setRescheduleError("Please choose a future date and time.");
      return;
    }

    setRescheduleLoading(true);
    try {
      await EducatorAPI.rescheduleSession({
        sessionId: session.id,
        proposedDate: rescheduleDate,
        proposedTime: rescheduleTime,
        reason: rescheduleReason.trim()
      });
      toast.success("Reschedule request submitted.");
      setShowReschedule(false);
      setRescheduleDate("");
      setRescheduleTime("");
      setRescheduleReason("");
      fetchSessionAndData();
    } catch (error: any) {
      console.error(error);
      setRescheduleError(error?.message || "Failed to submit reschedule request.");
    } finally {
      setRescheduleLoading(false);
    }
  };

  const handleRescheduleReview = async (request: any, action: "approved" | "rejected") => {
    if (!session) return;
    const requestId = getRequestId(request);
    const courseId = String(request?.courseId || request?.course?.id || request?.course?._id || session.id || "");

    if (!requestId || !courseId) {
      toast.error("This reschedule request is missing required identifiers.");
      return;
    }

    setReviewingRequestId(requestId);
    try {
      await EducatorAPI.handleRescheduleAction({
        courseId,
        requestId,
        action,
        educatorRemark: action === "approved" ? "Approved by educator." : "Rejected by educator.",
      });
      toast.success(action === "approved" ? "Reschedule request approved." : "Reschedule request rejected.");
      fetchSessionAndData();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to review reschedule request.");
    } finally {
      setReviewingRequestId(null);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    if (!assignmentTitle.trim() || !assignmentDescription.trim() || !assignmentDueDate) {
      toast.error("Title, description, and due date are required.");
      return;
    }

    setAssignmentCreating(true);
    try {
      const formData = new FormData();
      formData.append('title', assignmentTitle.trim());
      formData.append('description', assignmentDescription.trim());
      formData.append('dueDate', assignmentDueDate);
      formData.append('sessionId', session.id);
      formData.append('sessionType', session.type);
      if (assignmentFile) {
        formData.append('file', assignmentFile);
      }

      await EducatorAPI.createAssignment(formData);
      toast.success("Assignment created successfully.");
      setShowCreateAssignment(false);
      setAssignmentTitle("");
      setAssignmentDescription("");
      setAssignmentDueDate("");
      setAssignmentFile(null);
      fetchSessionAndData();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to create assignment.");
    } finally {
      setAssignmentCreating(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    if (!uploadTitle.trim() || !uploadFile) {
      toast.error("Title and file are required.");
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', uploadTitle.trim());
      formData.append('file', uploadFile);
      
      await EducatorAPI.uploadSessionResource(session.id, formData);
      toast.success("Requirement file uploaded.");
      setShowUploadFile(false);
      setUploadTitle("");
      setUploadFile(null);
      fetchSessionAndData();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to upload file.");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteResourceLocal = (idx: number) => {
    setResources(prev => prev.filter((_, i) => i !== idx));
    toast.success("Requirement file deleted.");
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-sm text-gray-500 font-medium">Loading session details...</span>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-lg text-center mx-auto my-12">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load session</h2>
        <p className="text-sm text-gray-500 mb-6">{error || "The session details could not be found."}</p>
        <Link href="/e/sessions" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors">
          Back to Sessions
        </Link>
      </div>
    );
  }

  const isOneOnOne = isOneOnOneSession(session.type);
  const rescheduleRequests = asArray(session.rescheduleRequests).filter(isActiveRescheduleRequest);
  const meetingUrl = session.resources?.[0]?.url || "https://zoom.us";

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/e/sessions" className="hover:text-gray-900 transition-colors">Sessions</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">{session.title}</span>
      </div>

      {/* Pending Reschedule Requests Block */}
      {isOneOnOne && rescheduleRequests.length > 0 && (
        <div className="space-y-3 rounded-2xl border border-orange-100 bg-orange-50/60 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h4 className="text-sm font-semibold text-gray-900">Pending Reschedule Requests</h4>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-600 border border-orange-100">
              {rescheduleRequests.length} Pending
            </span>
          </div>

          {rescheduleRequests.map((request: any, index: number) => {
            const requestId = getRequestId(request) || String(index);
            const isReviewing = reviewingRequestId === requestId;

            return (
              <div key={requestId} className="rounded-xl border border-orange-100 bg-white p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-gray-400 font-medium mb-0.5">Proposed Date</span>
                    <span className="font-semibold text-gray-900 text-[13px]">{formatRequestDate(request)}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-medium mb-0.5">Proposed Time</span>
                    <span className="font-semibold text-gray-900 text-[13px]">{formatRequestTime(request)}</span>
                  </div>
                  {request.reason && (
                    <div className="col-span-2">
                      <span className="block text-gray-400 font-medium mb-0.5">Reason</span>
                      <span className="text-gray-700 italic">"{request.reason}"</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    disabled={isReviewing}
                    onClick={() => handleRescheduleReview(request, "rejected")}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    disabled={isReviewing}
                    onClick={() => handleRescheduleReview(request, "approved")}
                    className="px-4 py-2 bg-[#111827] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isReviewing && <Loader2 size={12} className="animate-spin" />}
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Session Header Details Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug">{session.title}</h1>
            <p className="text-gray-500 text-sm max-w-4xl">
              Understand cardiac emergencies, guideline updates, and standard care protocols for cardiac arrest management. Focus on medication doses, rhythm checks, and post-resuscitation care.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative" ref={dropdownRef}>
            <button
              onClick={() => window.open(meetingUrl, "_blank")}
              className="bg-[#0E0F11] hover:bg-black text-white font-semibold text-[13px] rounded-xl px-5 py-2.5 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Video className="w-4.5 h-4.5" />
              Join Now
            </button>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl transition-all cursor-pointer text-gray-500"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-10 animate-in fade-in slide-in-from-top-1">
                {isOneOnOne && (
                  <button
                    onClick={() => { setShowReschedule(true); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Reschedule Session
                  </button>
                )}
                <button
                  onClick={() => { setShowCreateAssignment(true); setShowDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Create Assignment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid Bar */}
        <div className="bg-[#F8FAFC] border border-gray-50 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-gray-200">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Date</span>
              <span className="text-[13px] font-semibold text-gray-900">{session.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:pl-6">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Time</span>
              <span className="text-[13px] font-semibold text-gray-900">{session.startTime} - {session.endTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:pl-6">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Duration</span>
              <span className="text-[13px] font-semibold text-gray-900">120 min</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:pl-6">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Attendees</span>
              <span className="text-[13px] font-semibold text-gray-900">{session.attendees} attendees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Assignments Received */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-bold text-gray-900">Assignments Received</h2>
            <span className="bg-[#F1F3F5] text-gray-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
              {submissions.length}
            </span>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => {
              const badgeStyle = 
                sub.status.toLowerCase() === "submitted" ? "bg-[#ECFDF5] text-[#007A55]" :
                sub.status.toLowerCase() === "review done" || sub.status.toLowerCase() === "reviewed" ? "bg-[#EBF0FF] text-[#042BFD]" :
                "bg-[#FEF3C7] text-[#B45309]";

              return (
                <div key={sub.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                      <FileText className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm">{sub.studentName}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${badgeStyle}`}>
                          {sub.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{sub.assignmentId}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/e/submissions/${sub.id}`)}
                    className="border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shrink-0"
                  >
                    Open Workspace
                  </button>
                </div>
              );
            })}

            {submissions.length === 0 && (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl text-gray-500 text-sm">
                No assignments received for this session.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Assignment Req Files */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-bold text-gray-900">Assignment Req Files</h2>
            <span className="bg-[#F1F3F5] text-gray-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
              {resources.length}
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {resources.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 border border-gray-100 rounded-xl hover:border-gray-200 transition-all">
                <div className="flex items-center gap-3 overflow-hidden min-w-0 pr-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[10px] font-bold">PDF</span>
                  </div>
                  <div className="truncate min-w-0">
                    <span className="block text-xs font-semibold text-gray-900 truncate leading-snug">{file.name || file.title}</span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">{file.size || "PDF • 2.5 MB"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={file.url || `https://rvleyzlrzxdkgfyqrvzy.supabase.co/storage/v1/object/public/${file.path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <Download className="w-4.5 h-4.5" />
                  </a>
                  <button
                    onClick={() => handleDeleteResourceLocal(i)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ))}

            {resources.length === 0 && (
              <div className="text-center py-10 border border-dashed border-gray-100 rounded-xl text-gray-400 text-xs">
                No requirement files uploaded yet.
              </div>
            )}
          </div>

          <button
            onClick={() => setShowUploadFile(true)}
            className="w-full bg-[#0E0F11] hover:bg-black text-white font-semibold text-xs rounded-xl py-3 flex items-center justify-center gap-2 transition-colors mt-6 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Requirement File
          </button>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Reschedule Modal */}
      {showReschedule && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowReschedule(false)}
              className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">Reschedule Session</h3>
            
            {rescheduleError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2 font-medium">
                <AlertCircle size={14} />
                <span>{rescheduleError}</span>
              </div>
            )}

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Proposed Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => { setRescheduleDate(e.target.value); if (rescheduleError) setRescheduleError(""); }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Proposed Time</label>
                <input
                  type="time"
                  required
                  value={rescheduleTime}
                  onChange={(e) => { setRescheduleTime(e.target.value); if (rescheduleError) setRescheduleError(""); }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Reason</label>
                <textarea
                  required
                  value={rescheduleReason}
                  onChange={(e) => { setRescheduleReason(e.target.value); if (rescheduleError) setRescheduleError(""); }}
                  placeholder="Please provide a reason for reschedule..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReschedule(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rescheduleLoading}
                  className="flex-1 py-2.5 bg-[#111827] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {rescheduleLoading && <Loader2 size={12} className="animate-spin" />}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateAssignment && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowCreateAssignment(false)}
              className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">Create Assignment</h3>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  placeholder="Assignment title"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Instructions</label>
                <textarea
                  required
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                  placeholder="Instructions for students..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Due Date</label>
                <input
                  type="date"
                  required
                  value={assignmentDueDate}
                  onChange={(e) => setAssignmentDueDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Attachment (optional)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white cursor-pointer"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateAssignment(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assignmentCreating || !assignmentTitle.trim() || !assignmentDescription.trim() || !assignmentDueDate}
                  className="flex-1 py-2.5 bg-[#111827] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {assignmentCreating && <Loader2 size={12} className="animate-spin" />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload File Modal */}
      {showUploadFile && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowUploadFile(false)}
              className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">Upload Requirement File</h3>

            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="File title"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">File</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white cursor-pointer"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadFile(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadLoading || !uploadTitle.trim() || !uploadFile}
                  className="flex-1 py-2.5 bg-[#111827] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {uploadLoading && <Loader2 size={12} className="animate-spin" />}
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
