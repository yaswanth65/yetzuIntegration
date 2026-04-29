"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Calendar,
  Clock,
  Timer,
  Users,
  Download,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";
import { CourseAPI, StudentAPI, asArray } from "@/lib/api";
import RescheduleModal from "@/app/(studentdash)/components/Reschedule";

interface SessionDetail {
  courseId: string;
  title: string;
  type: string;
  mentor: {
    name: string;
    role: string;
    avatar: string;
  };
  stats: {
    date: string;
    time: string;
    duration: string;
    attendees: string;
  };
  joinUrl?: string;
  startIso?: string;
  assignments: Array<{ id: string; title: string; due: string }>;
  resources: Array<{ id: string; title: string; url?: string }>;
}

const parseDateValue = (value: any) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDuration = (item: any, startDate: Date | null) => {
  if (item.duration) return String(item.duration);

  const endDate = parseDateValue(item.endDateTime);
  if (startDate && endDate) {
    const minutes = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 60000));
    return `${minutes} min`;
  }

  return "TBD";
};

const formatDate = (date: Date | null) =>
  date
    ? date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "TBD";

const formatTimeRange = (item: any, startDate: Date | null) => {
  if (item.time) return String(item.time);
  if (!startDate) return "TBD";

  const endDate = parseDateValue(item.endDateTime);
  const startLabel = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (!endDate) return startLabel;

  const endLabel = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${startLabel} - ${endLabel}`;
};

const toResourceList = (course: any) =>
  [
    ...asArray(course?.resources),
    ...asArray(course?.files),
    ...asArray(course?.materials),
    ...asArray(course?.documents),
  ].map((resource: any, index: number) => ({
    id: String(resource.id || resource._id || index),
    title: resource.title || resource.name || resource.fileName || "Resource",
    url: resource.url || resource.fileUrl || resource.documentUrl || resource.path,
  }));

const toAssignmentList = (course: any, assignments: any[]) => {
  const directAssignments = asArray(course?.assignments).map((assignment: any, index: number) => ({
    id: String(assignment.id || assignment._id || assignment.assignmentId || index),
    title: assignment.title || assignment.assignmentTitle || "Assignment",
    due: assignment.dueDate || assignment.deadline || "TBD",
  }));

  if (directAssignments.length > 0) return directAssignments;

  return assignments.map((assignment: any, index: number) => ({
    id: String(assignment.id || assignment._id || assignment.assignmentId || index),
    title: assignment.title || assignment.assignmentTitle || assignment.sessionTitle || "Assignment",
    due: assignment.dueDate || assignment.deadline || "TBD",
  }));
};

const matchAssignmentsToCourse = (courseId: string, title: string, assignments: any[]) =>
  assignments.filter((assignment: any) => {
    const linkedCourseId = String(
      assignment.courseId || assignment.sessionId || assignment.course?._id || assignment.course?.id || "",
    );
    const linkedTitle = String(assignment.courseTitle || assignment.sessionTitle || "").toLowerCase();

    return linkedCourseId === courseId || linkedTitle === title.toLowerCase();
  });

export default function SessionSlugPage() {
  const params = useParams();
  const slug = String(params?.slug || "");

  const [sessionData, setSessionData] = useState<SessionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [overviewResponse, assignmentResponse] = await Promise.all([
          StudentAPI.getOverview(),
          StudentAPI.getAssignments().catch(() => ({ data: [] })),
        ]);

        const overviewData = overviewResponse?.data || overviewResponse;
        const overviewItems = [
          ...asArray(overviewData?.enrolledCourses),
          ...asArray(overviewData?.upcomingSessions),
          ...asArray(overviewData?.sessions),
        ];

        const overviewMatch = overviewItems.find(
          (item: any) => String(item._id || item.id || item.courseId || item.sessionId) === slug,
        );

        let coursePayload: any = overviewMatch || null;

        try {
          const courseResponse = await CourseAPI.getCourseById(slug);
          coursePayload = courseResponse?.course || courseResponse || coursePayload;
        } catch (courseError) {
          if (!coursePayload) {
            throw courseError;
          }
        }

        if (!coursePayload) {
          throw new Error("Session details were not found.");
        }

        const startDate = parseDateValue(
          coursePayload.startDateTime || coursePayload.scheduledDate || coursePayload.date,
        );
        const title = coursePayload.title || coursePayload.sessionTitle || coursePayload.courseTitle || "Session";
        const courseId = String(
          coursePayload._id || coursePayload.id || coursePayload.courseId || coursePayload.sessionId || slug,
        );
        const relatedAssignments = matchAssignmentsToCourse(courseId, title, asArray(assignmentResponse));
        const mentorName =
          coursePayload.educatorName || coursePayload.educator?.name || coursePayload.mentorName || "Educator";

        setSessionData({
          courseId,
          title,
          type: String(coursePayload.type || coursePayload.sessionType || "Session"),
          mentor: {
            name: mentorName,
            role: coursePayload.subtitle || coursePayload.educator?.role || coursePayload.category || "Session Mentor",
            avatar:
              coursePayload.educator?.avatar ||
              coursePayload.educator?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorName)}&background=042BFD&color=fff`,
          },
          stats: {
            date: formatDate(startDate),
            time: formatTimeRange(coursePayload, startDate),
            duration: formatDuration(coursePayload, startDate),
            attendees: `${coursePayload.enrolledCount || coursePayload.attendees || coursePayload.maxStudents || 0} attendees`,
          },
          joinUrl:
            coursePayload.meetingUrl ||
            coursePayload.meetingLink ||
            coursePayload.joinUrl ||
            coursePayload.sessionLink ||
            coursePayload.link,
          startIso: startDate?.toISOString(),
          assignments: toAssignmentList(coursePayload, relatedAssignments),
          resources: toResourceList(coursePayload),
        });
      } catch (fetchError: any) {
        console.error("Student session detail fetch failed", fetchError);
        setSessionData(null);
        setError(fetchError?.message || "Unable to load this session.");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCourseDetails();
    }
  }, [slug]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageUrl = useMemo(() => (typeof window !== "undefined" ? `${window.location.origin}/s/sessions/${slug}` : ""), [slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white md:bg-[#F8F9FA]">
        <p className="font-medium text-gray-500">Loading details...</p>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="w-full min-h-screen bg-white md:bg-[#F8F9FA] md:p-8">
        <div className="mx-auto max-w-[900px] rounded-[24px] border border-red-200 bg-white p-8 shadow-sm">
          <Link href="/s/sessions" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#021165]">
            <ArrowLeft size={18} />
            Back to Sessions
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Unable to load session</h1>
          <p className="mt-2 text-sm text-red-600">{error || "This session could not be found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white p-0 pb-10 font-sans md:mt-4 md:bg-[#F8F9FA] md:p-8 md:pb-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex items-center gap-2 px-4 pt-6 text-[18px] font-semibold text-gray-900 md:hidden">
          <Link href="/s/sessions" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Sessions
          </Link>
        </div>

        <div className="mb-6 hidden items-center gap-2 px-2 text-[13px] font-medium md:flex">
          <Link href="/s/sessions" className="text-gray-500 transition-colors hover:text-gray-900">
            Sessions
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="truncate text-gray-900">
            {sessionData.type}: {sessionData.title}
          </span>
        </div>

        <div className="mb-2 bg-white p-4 pt-0 md:mb-6 md:rounded-[24px] md:border md:border-gray-100 md:p-8 md:pt-8 md:shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
          <div className="mb-6 flex flex-col justify-between gap-6 xl:flex-row xl:items-start md:mb-8">
            <div className="flex-1">
              <h1 className="mb-4 max-w-4xl text-[20px] font-semibold leading-snug text-gray-900 md:mb-6 md:text-[28px]">
                {sessionData.type}: {sessionData.title}
              </h1>

              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={sessionData.mentor.avatar}
                  alt={sessionData.mentor.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover md:h-12 md:w-12"
                />
                <div>
                  <h3 className="text-[14px] font-medium leading-snug text-gray-900 md:text-[16px] md:font-semibold">
                    {sessionData.mentor.name}
                  </h3>
                  <p className="text-[12px] text-gray-500 md:text-[14px]">{sessionData.mentor.role}</p>
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-3 md:flex">
              {sessionData.joinUrl ? (
                <a
                  href={sessionData.joinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#111111] px-6 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-black"
                >
                  <img src="/images/google-video.svg" alt="Meet" className="h-5 w-5 object-contain" />
                  Join Now
                </a>
              ) : (
                <button disabled className="flex items-center gap-2 rounded-xl bg-[#111111] px-6 py-2.5 text-[14px] font-medium text-white opacity-60">
                  <img src="/images/google-video.svg" alt="Meet" className="h-5 w-5 object-contain" />
                  Join Now
                </button>
              )}

              <div className="relative flex items-center" ref={dropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen((current) => !current);
                  }}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                    isMenuOpen
                      ? "border-gray-300 bg-gray-50 text-gray-900"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <MoreVertical size={20} strokeWidth={2} className="pointer-events-none" />
                </button>

                {isMenuOpen ? (
                  <div className="animate-in fade-in zoom-in-95 absolute right-0 top-[115%] z-50 w-[220px] rounded-[12px] border border-gray-200 bg-white py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] duration-200">
                    <button
                      className="w-full px-5 py-2.5 text-left text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsRescheduleOpen(true);
                      }}
                    >
                      Reschedule
                    </button>
                    <button
                      className="w-full px-5 py-2.5 text-left text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      onClick={() => {
                        navigator.clipboard.writeText(pageUrl);
                        setIsMenuOpen(false);
                      }}
                    >
                      Copy Link to Session
                    </button>

                    {sessionData.type.toLowerCase() === "mentorship" || sessionData.type.toLowerCase() === "1:1" ? (
                      <Link
                        href="/s/chat"
                        className="block w-full px-5 py-2.5 text-left text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Chat with Mentor
                      </Link>
                    ) : null}

                    <div className="my-1.5 h-[1px] bg-gray-100"></div>
                    <div className="px-5 py-2 text-[13px] font-medium text-gray-400">{sessionData.type} Session</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:rounded-[16px] md:border md:border-gray-50 md:bg-[#F8FAFC] md:py-6">
            <div className="flex flex-col items-center justify-center gap-2 rounded-[12px] border border-gray-50 bg-[#F8FAFC] p-4 md:gap-3 md:border-r md:border-gray-200 md:bg-transparent md:p-0">
              <Calendar size={20} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-center text-[14px] font-medium text-gray-700 md:text-[15px]">{sessionData.stats.date}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-[12px] border border-gray-50 bg-[#F8FAFC] p-4 md:gap-3 md:border-r md:border-gray-200 md:bg-transparent md:p-0">
              <Clock size={20} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-center text-[14px] font-medium text-gray-700 md:text-[15px]">{sessionData.stats.time}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-[12px] border border-gray-50 bg-[#F8FAFC] p-4 md:gap-3 md:border-r md:border-gray-200 md:bg-transparent md:p-0">
              <Timer size={20} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-center text-[14px] font-medium text-gray-700 md:text-[15px]">{sessionData.stats.duration}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-[12px] border border-gray-50 bg-[#F8FAFC] p-4 md:gap-3 md:bg-transparent md:p-0">
              <Users size={20} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-center text-[14px] font-medium text-gray-700 md:text-[15px]">{sessionData.stats.attendees}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-b border-gray-300 pb-4 md:hidden md:pb-8">
            {sessionData.joinUrl ? (
              <a
                href={sessionData.joinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 py-3.5 text-[14px] text-white shadow-sm transition-colors hover:bg-black"
              >
                <img src="/images/google-video.svg" alt="Meet" className="h-5 w-5 object-contain" />
                Join Now
              </a>
            ) : (
              <button disabled className="w-full rounded-xl bg-[#111111] px-6 py-3.5 text-[14px] text-white opacity-60">
                Join Now
              </button>
            )}
            <button
              onClick={() => setIsRescheduleOpen(true)}
              className="w-full rounded-xl border border-gray-200 px-6 py-3.5 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Reschedule
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(pageUrl)}
              className="w-full rounded-xl px-6 py-3.5 text-center text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Copy Link to Session
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 md:gap-6 md:px-0 lg:grid-cols-2">
          <div className="mt-0 flex flex-col rounded-[24px] bg-white p-0 md:border md:border-gray-100 md:p-8 md:shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <h2 className="text-[16px] font-semibold text-gray-900 md:text-[18px]">Assignments</h2>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F5F9] text-[12px] font-bold text-gray-600">
                {sessionData.assignments.length}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 md:gap-4">
              {sessionData.assignments.length > 0 ? (
                sessionData.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 md:p-5"
                  >
                    <div className="mb-4 flex items-start gap-3 md:gap-4">
                      <img src="/images/green-file.svg" alt="Assignment" className="h-[40px] w-[40px] shrink-0 object-contain md:h-[48px] md:w-[48px]" />
                      <div className="pt-0.5 md:pt-1">
                        <h4 className="mb-2 text-[14px] font-semibold leading-snug text-gray-900 md:mb-2.5 md:text-[16px]">
                          {assignment.title}
                        </h4>
                        <span className="inline-block rounded-full bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 md:px-3 md:py-1.5 md:text-[11px]">
                          DUE: {assignment.due}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto flex w-full justify-end md:w-auto">
                      <Link href={`/s/assignments/${assignment.id}`} className="w-full md:w-auto">
                        <button className="w-full rounded-xl border border-gray-200 px-5 py-2.5 text-[14px] font-medium text-gray-900 transition-colors hover:bg-gray-50 md:w-auto">
                          Open Workspace
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-500">
                  No assignments have been published for this session yet.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col rounded-[24px] bg-white p-0 md:mt-0 md:border md:border-gray-100 md:p-8 md:shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <h2 className="text-[16px] font-semibold text-gray-900 md:text-[18px]">Resources</h2>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F5F9] text-[11px] font-bold text-gray-600 md:text-[12px]">
                {sessionData.resources.length}
              </span>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              {sessionData.resources.length > 0 ? (
                sessionData.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 md:flex-row md:items-center"
                  >
                    <div className="flex min-w-0 items-center gap-3 md:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#EEF2FF] text-[#042BFD] md:h-12 md:w-12 md:rounded-[14px]">
                        <span className="text-[10px] font-bold uppercase tracking-wider md:text-[12px]">PDF</span>
                      </div>
                      <h4 className="truncate pr-2 text-[14px] font-medium text-gray-900 md:pr-4">{resource.title}</h4>
                    </div>

                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full shrink-0 items-center justify-center rounded-xl border border-gray-200 py-2.5 text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 md:h-11 md:w-11 md:py-0 md:text-transparent"
                      >
                        <span className="md:hidden">Download</span>
                        <Download size={20} strokeWidth={1.5} className="hidden md:block" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex w-full shrink-0 items-center justify-center rounded-xl border border-gray-200 py-2.5 text-[13px] font-medium text-gray-400 md:h-11 md:w-11 md:py-0 md:text-transparent"
                      >
                        <span className="md:hidden">Unavailable</span>
                        <Download size={20} strokeWidth={1.5} className="hidden md:block" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-500">
                  Session resources will appear here when they are uploaded.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <RescheduleModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        courseId={sessionData.courseId}
        sessionTitle={sessionData.title}
        sessionDate={sessionData.stats.date}
        sessionTime={sessionData.stats.time}
        mentorName={sessionData.mentor.name}
        sessionStartIso={sessionData.startIso}
      />
    </div>
  );
}
