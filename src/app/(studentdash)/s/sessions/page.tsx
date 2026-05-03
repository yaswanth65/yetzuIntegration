"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Calendar, Clock, MoreVertical, ExternalLink } from "lucide-react";
import Link from "next/link";
import RescheduleModal from "../../components/Reschedule";
import { StudentAPI, asArray } from "@/lib/api";
import { getImageUrl } from "@/lib/utils/imageUtils";

type SessionTab = "upcoming" | "completed" | "missed";

interface SessionCardData {
  id: string;
  courseId: string;
  slug: string;
  title: string;
  type: string;
  mentor: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  time: string;
  badge: string | null;
  badgeType: string;
  tab: SessionTab;
  isFocusToday: boolean;
  startIso: string;
  webinerLink?: string;
  thumbnail?: string;
}

const getThemeStyles = (type: string, badgeType?: string) => {
  let badgeClasses = "";
  if (badgeType === "purple") badgeClasses = "bg-[#E0D4F5] text-[#7B42F6]";
  else if (badgeType === "orange") badgeClasses = "bg-[#FFEDD5] text-[#EA580C]";
  else badgeClasses = "bg-gray-100 text-gray-600";

  switch (type) {
    case "webinar":
      return {
        wrapperBorder: "from-[#C4A9FF] via-transparent to-[#C4A9FF]",
        bgGradient: "from-[#F3EDFF] via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
    case "mentorship":
      return {
        wrapperBorder: "from-[#FAD0A5] via-transparent to-[#FAD0A5]",
        bgGradient: "from-[#FFF3E3] via-white via-40% to-white",
        icon: "/images/User2.svg",
        badgeClasses,
      };
    case "cohort":
      return {
        wrapperBorder: "from-[#9FE4EE] via-transparent to-[#9FE4EE]",
        bgGradient: "from-[#E6F8FA] via-white via-40% to-white",
        icon: "/images/team.svg",
        badgeClasses,
      };
    case "workshop":
      return {
        wrapperBorder: "from-[#B6E0C3] via-transparent to-[#B6E0C3]",
        bgGradient: "from-[#ECFDF3] via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
    case "missed":
      return {
        wrapperBorder: "from-[#FECDD3] via-transparent to-[#FECDD3]",
        bgGradient: "from-[#FFF0F2] via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
    default:
      return {
        wrapperBorder: "from-gray-200 via-transparent to-gray-200",
        bgGradient: "from-gray-50 via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
  }
};

const parseDateValue = (value: any) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const inferSessionTab = (item: any, startDate: Date | null): SessionTab => {
  const rawStatus = String(item.status || item.courseStatus || item.sessionStatus || "").toLowerCase();

  if (rawStatus.includes("miss")) return "missed";
  if (rawStatus.includes("complete")) return "completed";

  if (!startDate) return "upcoming";
  return startDate.getTime() < Date.now() ? "completed" : "upcoming";
};

const formatDateLabel = (date: Date | null) =>
  date
    ? date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "TBD";

const formatTimeLabel = (item: any, date: Date | null) => {
  if (item.time) return String(item.time);

  if (!date) return "TBD";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const normalizeSessionType = (item: any) =>
  String(item.sessionType || item.type || item.courseType || "Webinar").toLowerCase();

const mapStudentSession = (item: any, focusIds: Set<string>): SessionCardData => {
  const id = String(item._id || item.id || item.courseId || item.sessionId || item.slug);
  const startDate = parseDateValue(item.startDateTime || item.scheduledDate || item.date);
  const tab = inferSessionTab(item, startDate);
  const isFocusToday = focusIds.has(id);
  const title = item.title || item.sessionTitle || item.courseTitle || "Untitled Session";
  const mentorName = item.educatorName || item.educator?.name || item.mentorName || "Educator";

  return {
    id,
    courseId: id,
    slug: id,
    title,
    type: tab === "missed" ? "missed" : normalizeSessionType(item),
    mentor: {
      name: mentorName,
      role: item.subtitle || item.educator?.role || item.category || "Session Mentor",
      avatar:
        item.educator?.avatar ||
        item.educator?.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorName)}&background=042BFD&color=fff`,
    },
    date: formatDateLabel(startDate),
    time: formatTimeLabel(item, startDate),
    badge: isFocusToday && tab === "upcoming" ? "STARTS SOON" : null,
    badgeType: isFocusToday && tab === "upcoming" ? "purple" : "gray",
    tab,
    isFocusToday,
    startIso: startDate?.toISOString() || "",
  };
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SessionTab>("upcoming");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [rescheduleSession, setRescheduleSession] = useState<SessionCardData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      setError("");

      try {
        const enrolledRes = await StudentAPI.getEnrolledCourses();
        const enrolledData = enrolledRes?.data || enrolledRes;
        const enrolledList = asArray(enrolledData?.enrolledCourses || enrolledData?.courses || enrolledData);
        
        const now = new Date();
        const mappedSessions = enrolledList.map((item: any) => {
          const course = item.course || item;
          const educator = course.educatorData || {};
          const startIso = course.startDateTime || item.startDateTime || "";
          const startDate = startIso ? new Date(startIso) : null;
          const isPast = startDate ? startDate.getTime() < now.getTime() : false;
          
          return {
            id: course.id || item.courseId || item.id || "",
            courseId: item.courseId || course.id,
            slug: course.id || item.courseId || item.id || "",
            title: course.title || "Untitled Session",
            type: course.subtitle || "Webinar",
            mentor: {
              name: educator.name || "Educator",
              role: educator.email || "Session Mentor",
              avatar: educator.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(educator.name)}&background=042BFD&color=fff` : "/images/educator.png",
            },
            date: startDate ? startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "TBD",
            time: startIso ? new Date(startIso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : "TBD",
            badge: null,
            badgeType: "gray",
            tab: (isPast ? "completed" : "upcoming") as SessionTab,
            isFocusToday: false,
            startIso,
            webinerLink: course.webinerLink || "",
            thumbnail: getImageUrl(course.thumbnail || ""),
          };
        });

        setSessions(mappedSessions);
      } catch (fetchError: any) {
        console.error("Student sessions fetch failed", fetchError);
        setSessions([]);
        setError(fetchError?.message || "Unable to load your sessions right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSessions = useMemo(() => {
    const loweredSearch = searchQuery.trim().toLowerCase();

    return sessions.filter((session) => {
      if (session.tab !== activeTab) return false;
      if (!loweredSearch) return true;

      return (
        session.title.toLowerCase().includes(loweredSearch) ||
        session.mentor.name.toLowerCase().includes(loweredSearch)
      );
    });
  }, [activeTab, searchQuery, sessions]);

  const focusTodaySessions = filteredSessions.filter((session) => session.isFocusToday);
  const otherSessions = filteredSessions.filter((session) => !session.isFocusToday);

  const renderCard = (session: SessionCardData, isFocus: boolean) => {
    const theme = getThemeStyles(session.type, session.badgeType);
    const isDropdownOpen = openDropdownId === session.id;

    return (
      <div
        key={session.id}
        className={`relative flex min-h-[320px] w-[85vw] shrink-0 snap-center flex-col rounded-[24px] bg-gradient-to-br p-[1.5px] transition-all hover:scale-[1.02] md:min-w-0 md:w-auto md:snap-align-none ${theme.wrapperBorder}`}
      >
        <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-[22px] border border-gray-100/50 bg-white p-5 shadow-sm">
          <div className={`pointer-events-none absolute inset-0 z-0 rounded-[22px] bg-gradient-to-b ${theme.bgGradient}`}></div>

          <div className="relative z-10 mb-6 flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-50 bg-white shadow-sm">
              <img src={theme.icon} alt="Icon" className="h-8 w-8 object-contain" />
            </div>
            {session.badge ? (
              <span className={`${theme.badgeClasses} flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm`}>
                {session.badge.includes("STARTS") ? <Clock size={12} /> : null}
                {session.badge}
              </span>
            ) : null}
          </div>

          <div className="relative z-10 flex flex-1 flex-col">
            <Link href={`/s/sessions/${session.slug}`} className="transition-colors hover:text-[#042BFD]">
              <h3 className="mb-4 line-clamp-2 pr-2 text-lg font-bold leading-tight text-gray-900">{session.title}</h3>
            </Link>

            <div className="mt-auto mb-6 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100 shadow-sm">
                <img src={session.mentor.avatar} alt="Mentor" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="mb-1 truncate text-sm font-bold leading-none text-gray-900">{session.mentor.name}</p>
                <p className="truncate text-[11px] text-gray-500">{session.mentor.role}</p>
              </div>
            </div>

            <div className="mb-6 flex w-full items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <Calendar size={14} className="shrink-0 text-gray-400" /> <span className="truncate">{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <Clock size={14} className="shrink-0 text-gray-400" /> <span className="truncate">{session.time}</span>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-3">
              {session.webinerLink && activeTab === "upcoming" ? (
                <a
                  href={session.webinerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all active:scale-95 ${
                    isFocus
                      ? "bg-[#021165] text-white shadow-lg shadow-blue-900/10 hover:bg-[#031a9c]"
                      : "bg-[#042BFD] text-white hover:bg-[#0325D7]"
                  }`}
                >
                  Join Session
                  <ExternalLink size={14} />
                </a>
              ) : (
                <Link href={`/s/sessions/${session.slug}`} className="flex-1">
                  <button
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all active:scale-95 ${
                      isFocus && activeTab === "upcoming"
                        ? "bg-[#021165] text-white shadow-lg shadow-blue-900/10 hover:bg-[#031a9c]"
                        : "border-2 border-[#042BFD] text-[#042BFD] hover:bg-blue-50"
                    }`}
                  >
                    {isFocus && activeTab === "upcoming" ? "Join Session" : "View Details"}
                    <ExternalLink size={14} />
                  </button>
                </Link>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdownId(isDropdownOpen ? null : session.id);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:bg-gray-50"
              >
                <MoreVertical size={18} />
              </button>

              {isDropdownOpen ? (
                <div
                  ref={dropdownRef}
                  className="animate-in fade-in zoom-in-95 absolute right-0 bottom-full z-50 mb-3 w-48 origin-bottom-right rounded-2xl border border-gray-100 bg-white py-2 shadow-2xl duration-200"
                >
                  <button
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50"
                    onClick={() => {
                      setOpenDropdownId(null);
                      setRescheduleSession(session);
                    }}
                  >
                    Reschedule
                  </button>
                  <button
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/s/sessions/${session.slug}`);
                      setOpenDropdownId(null);
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <div className="mb-8">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-medium text-[#021165] sm:text-3xl md:text-4xl">Sessions</h1>
            <p className="mt-1 text-sm text-gray-500">Track your upcoming and past learning sessions</p>
          </div>

          <div className="relative w-full md:w-[320px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions or mentors..."
              className="block w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm placeholder-gray-400 shadow-sm transition-all focus:border-[#042BFD] focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 border-b border-gray-200 sm:gap-8">
          {(["upcoming", "completed", "missed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const count = sessions.filter((session) => session.tab === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`-mb-[1px] flex items-center gap-2 border-b-2 pb-4 text-sm capitalize transition-all sm:text-base ${
                  isActive
                    ? "border-[#042BFD] font-bold text-[#021165]"
                    : "border-transparent font-medium text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                <span
                  className={`flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    isActive
                      ? tab === "missed"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#042BFD] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px]">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-[300px] animate-pulse rounded-3xl border border-gray-100 bg-white" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 px-6 py-10 text-center">
            <h3 className="text-lg font-bold text-gray-900">Unable to load sessions</h3>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : activeTab === "upcoming" ? (
          <div className="space-y-12">
            {focusTodaySessions.length > 0 ? (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    Focus For Today
                  </span>
                  <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>
                <div className="-mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:px-0 md:pb-0 lg:grid-cols-3">
                  {focusTodaySessions.map((session) => renderCard(session, true))}
                </div>
              </section>
            ) : null}

            {otherSessions.length > 0 ? (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    Upcoming Sessions
                  </span>
                  <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {otherSessions.map((session) => renderCard(session, false))}
                </div>
              </section>
            ) : null}

            {focusTodaySessions.length === 0 && otherSessions.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No upcoming sessions</h3>
                <p className="mt-1 text-sm text-gray-500">Your enrolled sessions will appear here once they are scheduled.</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSessions.map((session) => renderCard(session, false))}

            {filteredSessions.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Clock size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No sessions found</h3>
                <p className="mt-1 text-sm text-gray-500">Sessions in this category will appear here when they are available.</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <RescheduleModal
        isOpen={Boolean(rescheduleSession)}
        onClose={() => setRescheduleSession(null)}
        courseId={rescheduleSession?.courseId}
        sessionTitle={rescheduleSession?.title}
        sessionDate={rescheduleSession?.date}
        sessionTime={rescheduleSession?.time}
        mentorName={rescheduleSession?.mentor.name}
        sessionStartIso={rescheduleSession?.startIso}
      />
    </div>
  );
}
