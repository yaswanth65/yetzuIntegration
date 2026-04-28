"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Calendar, Clock, MoreVertical, ExternalLink } from "lucide-react";
import Link from "next/link"; 
import RescheduleModal from "../../components/Reschedule";
import { CourseAPI } from "@/lib/api"; 

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

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "missed">("upcoming");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await CourseAPI.getAllCourses();
        if (res.courses && Array.isArray(res.courses)) {
          const mappedCourses = res.courses.map((course: any) => {
            const startDate = new Date(course.startDateTime);
            const durationHours = parseInt(course.duration) || 1; 
            const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

            const dateStr = startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
            const formatTime = (d: Date) => d.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });
            const timeStr = `${formatTime(startDate)} - ${formatTime(endDate)}`;

            const today = new Date();
            const isToday = startDate.toDateString() === today.toDateString();
            const isPast = endDate < today;
            
            let tab = "upcoming";
            if (isPast) tab = "completed";

            let badge = null;
            let badgeType = "gray";
            if (isToday && !isPast) {
              badge = `STARTS IN 12 MINS`;
              badgeType = "purple";
            }

            return {
              id: course._id,
              slug: course._id, 
              title: course.title || "Untitled Session",
              type: course.title?.toLowerCase().includes('cohort') ? 'cohort' : 'webinar',
              mentor: {
                name: course.educator?.name || course.educatorName || "Educator", 
                role: course.subtitle || course.educator?.role || "",
                avatar: course.educator?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.educator?.name || course.educatorName || "Educator")}&background=random`,
              },
              date: dateStr,
              time: timeStr,
              badge,
              badgeType,
              tab,
              isFocusToday: isToday && !isPast,
            };
          });

          setSessions(mappedCourses);
        }
      } catch {
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter((s) => s.tab === activeTab);
  const focusTodaySessions = filteredSessions.filter((s) => s.isFocusToday);
  const otherSessions = filteredSessions.filter((s) => !s.isFocusToday);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCard = (session: any, isFocus: boolean) => {
    const theme = getThemeStyles(session.type, session.badgeType);
    const isDropdownOpen = openDropdownId === session.id;

    return (
      <div
        key={session.id}
        className={`relative rounded-[24px] p-[1.5px] bg-gradient-to-br ${theme.wrapperBorder} flex flex-col min-h-[320px] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none transition-all hover:scale-[1.02]`}
      >
        <div className="relative flex-1 flex flex-col bg-white rounded-[22px] p-5 h-full shadow-sm border border-gray-100/50 overflow-hidden">
          <div className={`absolute inset-0 rounded-[22px] bg-gradient-to-b ${theme.bgGradient} pointer-events-none z-0`}></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-50">
              <img src={theme.icon} alt="Icon" className="w-8 h-8 object-contain" />
            </div>
            {session.badge && (
              <span className={`${theme.badgeClasses} text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm`}>
                {session.badge.includes("STARTS") && <Clock size={12} />}
                {session.badge}
              </span>
            )}
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            <Link href={`sessions/${session.slug}`} className="hover:text-[#042BFD] transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight pr-2 line-clamp-2">
                {session.title}
              </h3>
            </Link>

            <div className="flex items-center gap-3 mb-6 mt-auto">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                <img src={session.mentor.avatar} alt="Mentor" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 leading-none mb-1 truncate">{session.mentor.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{session.mentor.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3 mb-6 w-full border border-gray-100">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <Calendar size={14} className="text-gray-400 shrink-0" /> <span className="truncate">{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <Clock size={14} className="text-gray-400 shrink-0" /> <span className="truncate">{session.time}</span>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 relative">
              <Link href={`sessions/${session.slug}`} className="flex-1">
                <button className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  isFocus && activeTab === "upcoming" 
                    ? "bg-[#021165] text-white hover:bg-[#031a9c] shadow-lg shadow-blue-900/10" 
                    : "border-2 border-[#042BFD] text-[#042BFD] hover:bg-blue-50"
                }`}>
                  {isFocus && activeTab === "upcoming" ? "Join Session" : "View Details"}
                  <ExternalLink size={14} />
                </button>
              </Link>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdownId(isDropdownOpen ? null : session.id);
                }}
                className="w-10 h-10 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 flex items-center justify-center shrink-0 transition-all"
              >
                <MoreVertical size={18} />
              </button>

              {isDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 bottom-full mb-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-bottom-right"
                >
                  <button 
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setOpenDropdownId(null);
                      setIsRescheduleOpen(true);
                    }}
                  >
                    Reschedule
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + `/sessions/${session.slug}`);
                      setOpenDropdownId(null);
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#021165]">Sessions</h1>
            <p className="text-gray-500 text-sm mt-1">Track your upcoming and past learning sessions</p>
          </div>
          
          <div className="relative w-full md:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search sessions or mentors..."
              className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-gray-200">
          {(["upcoming", "completed", "missed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            let count = sessions.filter((s) => s.tab === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 flex items-center gap-2 border-b-2 transition-all -mb-[1px] capitalize text-sm sm:text-base ${
                  isActive
                    ? "border-[#042BFD] text-[#021165] font-bold"
                    : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
                }`}
              >
                {tab}
                <span 
                  className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10px] font-bold ${
                    isActive 
                      ? tab === "missed" ? "bg-red-100 text-red-600" : "bg-[#042BFD] text-white" 
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
      <div className="max-w-[1600px] mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[300px] bg-white rounded-3xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : activeTab === "upcoming" ? (
          <div className="space-y-12">
            {/* Focus For Today */}
            {focusTodaySessions.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
                    Focus For Today
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                  {focusTodaySessions.map((session) => renderCard(session, true))}
                </div>
              </section>
            )}

            {/* Upcoming Sessions */}
            {otherSessions.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
                    Upcoming Sessions
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherSessions.map((session) => renderCard(session, false))}
                </div>
              </section>
            )}

            {focusTodaySessions.length === 0 && otherSessions.length === 0 && (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No upcoming sessions</h3>
                <p className="text-gray-500 text-sm mt-1">Check back later or explore new courses</p>
              </div>
            )}
          </div>
        ) : (
          /* Completed / Missed Tab View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => renderCard(session, false))}
            
            {filteredSessions.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Clock size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No sessions found</h3>
                <p className="text-gray-500 text-sm mt-1">Sessions in this category will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>

      <RescheduleModal 
        isOpen={isRescheduleOpen} 
        onClose={() => setIsRescheduleOpen(false)} 
      />
    </div>
  );
}
