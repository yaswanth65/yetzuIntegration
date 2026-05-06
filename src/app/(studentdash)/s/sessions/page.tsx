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
        className={`relative flex min-h-[300px] w-[85vw] shrink-0 snap-center flex-col rounded-[18px] bg-gradient-to-br p-[1.5px] md:min-w-0 md:w-auto md:snap-align-none ${theme.wrapperBorder}`}
      >
        <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-[16px] border border-gray-100/50 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className={`pointer-events-none absolute inset-0 z-0 rounded-[16px] bg-gradient-to-b ${theme.bgGradient}`}></div>

          <div className="relative z-10 mb-6 flex items-start justify-between">
            <img src={theme.icon} alt="Icon" className="h-[64px] w-[64px] object-contain opacity-90" />
            {session.badge ? (
              <span className={`${theme.badgeClasses} flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide shadow-sm`}>
                {session.badge.includes("STARTS") ? <Clock size={14} /> : null}
                {session.badge}
              </span>
            ) : null}
          </div>

          <div className="relative z-10 flex flex-1 flex-col">
            <Link href={`/s/sessions/${session.slug}`} className="transition-colors hover:text-[#042BFD]">
              <h3 className="mb-5 pr-2 text-[18px] font-bold leading-snug text-gray-900 line-clamp-2">{session.title}</h3>
            </Link>

            <div className="mt-auto mb-6 flex items-center gap-3">
              <img src={session.mentor.avatar} alt="Mentor" className="h-11 w-11 shrink-0 rounded-full object-cover" />
              <div>
                <p className="mb-1 text-[14px] font-semibold leading-none text-gray-900">{session.mentor.name}</p>
                <p className="text-[12px] text-gray-500">{session.mentor.role}</p>
              </div>
            </div>

            <div className="mb-6 flex w-full items-center gap-4 rounded-[10px] border border-gray-50 bg-[#F8FAFC] px-4 py-3">
              <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
                <Calendar size={16} className="shrink-0 text-gray-400" /> <span className="truncate">{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
                <Clock size={16} className="shrink-0 text-gray-400" /> <span className="truncate">{session.time}</span>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-3">
              {session.webinerLink && activeTab === "upcoming" ? (
                <a
                  href={session.webinerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 rounded-[10px] py-2.5 text-[14px] font-medium transition-colors active:scale-95 ${
                    isFocus
                      ? "bg-[#111111] text-white hover:bg-black"
                      : "border border-[#042BFD] bg-white text-[#042BFD] hover:bg-blue-50"
                  }`}
                >
                  {isFocus ? "Join Session" : "View Details"}
                  <ExternalLink size={14} />
                </a>
              ) : (
                <Link href={`/s/sessions/${session.slug}`} className="flex-1">
                  <button
                    className={`flex w-full items-center justify-center gap-2 rounded-[10px] py-2.5 text-[14px] font-medium transition-colors active:scale-95 ${
                      isFocus && activeTab === "upcoming"
                        ? "bg-[#111111] text-white hover:bg-black"
                        : "border border-[#042BFD] bg-white text-[#042BFD] hover:bg-blue-50"
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
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-gray-200 text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
              >
                <MoreVertical size={20} />
              </button>

              {isDropdownOpen ? (
                <div
                  ref={dropdownRef}
                  className="animate-in fade-in zoom-in-95 absolute right-0 bottom-[110%] z-50 mb-2 w-48 origin-bottom-right rounded-xl border border-gray-100 bg-white py-2 shadow-[0_10px_25px_rgba(0,0,0,0.1)] duration-200"
                >
                  <button
                    className="w-full px-4 py-2.5 text-left text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    onClick={() => {
                      setOpenDropdownId(null);
                      setRescheduleSession(session);
                    }}
                  >
                    Reschedule
                  </button>
                  <button
                    className="w-full px-4 py-2.5 text-left text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/s/sessions/${session.slug}`);
                      setOpenDropdownId(null);
                    }}
                  >
                    Copy Link to Interview
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
    <div className="w-full bg-white md:bg-[#F8F9FA] font-sans pb-18 lg:pb-8">
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-20 md:static md:z-auto bg-white pt-4 md:pt-6 md:px-10 border-b border-gray-100 md:border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6 px-4 md:px-0">
          <h1 className="text-[22px] font-bold text-gray-900">Sessions</h1>
          
          <div className="relative w-full md:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by session, mentor or topic"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center px-4 md:px-0 gap-6 md:gap-8 overflow-x-auto no-scrollbar">
          {(["upcoming", "completed", "missed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const count = sessions.filter((session) => session.tab === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[1px] md:-mb-[2px] capitalize whitespace-nowrap ${
                  isActive
                    ? "border-[#042BFD] text-gray-900 font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
                }`}
              >
                <span className="text-[14px] md:text-[15px]">{tab}</span>
                <span 
                  className={`flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium ${
                    isActive 
                      ? tab === "missed" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600" 
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

      {/* --- MAIN CONTENT AREA --- */}
      <div className="px-4 md:p-6 md:px-10 max-w-[1600px] mx-auto mt-4 md:mt-2">
        
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-[300px] animate-pulse rounded-[18px] bg-white" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[18px] border border-red-200 bg-red-50 px-6 py-10 text-center">
            <h3 className="text-lg font-bold text-gray-900">Unable to load sessions</h3>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-none md:rounded-2xl md:border border-gray-100 shadow-sm py-20 px-6 min-h-[500px] w-full">
            <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-3xl"></div>
              <img src="/images/empty-state.svg" alt="Learning Journey" className="relative z-10 w-full h-full object-contain" />
            </div>
            <h2 className="text-xl md:text-[24px] font-bold text-gray-900 mb-3 text-center">Your learning journey starts here</h2>
            <p className="text-center text-sm text-gray-500 max-w-[550px] mb-8 leading-relaxed">
              Explore webinars, cohorts, and 1:1 mentorships across a wide range of topics.<br className="hidden md:block" />
              Start learning from expert educators and unlock exclusive resources and study materials.
            </p>
            <button className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
              Explore Courses <ExternalLink size={16} />
            </button>
          </div>
        ) : activeTab === "upcoming" ? (
          <>
            {/* Focus For Today */}
            {focusTodaySessions.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4 px-4 md:px-0">
                  <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    FOCUS FOR TODAY
                  </span>
                  <div className="hidden md:block flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {focusTodaySessions.map((session) => renderCard(session, true))}
                </div>
              </div>
            )}

            {/* Upcoming Sessions */}
            {otherSessions.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-4 px-4 md:px-0">
                  <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    UPCOMING SESSIONS
                  </span>
                  <div className="hidden md:block flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {otherSessions.map((session) => renderCard(session, false))}
                </div>
              </div>
            )}

            {focusTodaySessions.length === 0 && otherSessions.length === 0 && (
              <div className="py-20 text-center text-gray-500 px-4">
                No upcoming sessions found.
              </div>
            )}
          </>
        ) : (
          /* Completed / Missed Tab View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredSessions.map((session) => renderCard(session, false))}
            
            {filteredSessions.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500">
                No sessions found in this category.
              </div>
            )}
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
