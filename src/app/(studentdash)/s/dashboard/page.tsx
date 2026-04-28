"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { StudentAPI, CourseAPI, asArray } from "@/lib/api";

// --- HELPER COMPONENTS & STYLES ---
const ViewDetailsButton = ({ variant = "outline" }: { variant?: "solid" | "outline" }) => {
  if (variant === "solid") {
    return (
      <button className="w-full bg-[#111111] hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
        View Details
      </button>
    );
  }
  return (
    <button className="w-full bg-white hover:bg-gray-50 text-[#111111] border border-gray-200 text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
      View Details
    </button>
  );
};

const getFocusCardTheme = (type: string) => {
  switch (type) {
    case 'purple': return { border: "from-[#C4A9FF] via-transparent to-[#C4A9FF]", bg: "from-[#F3EDFF]", btn: "solid" as const };
    case 'green': return { border: "from-[#A3DFB3] via-transparent to-[#A3DFB3]", bg: "from-[#E6F5EE]", btn: "outline" as const };
    case 'orange': return { border: "from-[#FAD0A5] via-transparent to-[#FAD0A5]", bg: "from-[#FFF3E3]", btn: "outline" as const };
    case 'blue': return { border: "from-[#9FE4EE] via-transparent to-[#9FE4EE]", bg: "from-[#E6F8FA]", btn: "outline" as const };
    default: return { border: "from-gray-200 via-transparent to-gray-200", bg: "from-gray-50", btn: "outline" as const };
  }
};

const getUpcomingTheme = (theme: string) => {
  switch(theme) {
    case 'teal': return { border: "border-teal-100", btnBg: "bg-[#F2FAFA] hover:bg-[#E5F5F5]", btnText: "text-[#2F9089]" , background : "bg-teal-50"  };
    case 'orange': return { border: "border-orange-100", btnBg: "bg-[#FFF8F2] hover:bg-[#FFF0E5]", btnText: "text-[#D97706]",background : "bg-orange-50" };
    case 'purple': return { border: "border-purple-100", btnBg: "bg-[#F9F6FF] hover:bg-[#F3EFFF]", btnText: "text-[#7B42F6]",background : "bg-purple-50" };
    default: return { border: "border-gray-200", btnBg: "bg-gray-50 hover:bg-gray-100", btnText: "text-gray-600",background : "bg-gray-50" };
  }
};

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<any>(null);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);

  // --- FETCH DASHBOARD DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [overviewRes, coursesRes] = await Promise.all([
          StudentAPI.getOverview(),
          CourseAPI.getAllCourses()
        ]);

        const overviewData = overviewRes?.data || overviewRes;
        if (overviewRes?.success !== false && overviewData && Object.keys(overviewData).length > 0) {
          setApiData(overviewData);
        } else {
          setApiData({});
        }

        if (coursesRes?.courses && Array.isArray(coursesRes.courses)) {
          setAvailableCourses(coursesRes.courses);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setApiData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading your dashboard...</p>
      </main>
    );
  }

  // --- PARSE API DATA ---
  const safeData = apiData || {};
  const userInfo = safeData.userInfo || safeData.user || {};
  
  // 1. Focus For This Week Logic
  const focusThisWeek: any[] = [];
  const upcomingFocusSessions = asArray(safeData.focusThisWeek?.contactThisWeek?.upcomingSessions || safeData.upcomingSessions || []);
  const assignmentsDueThisWeek = asArray(safeData.focusThisWeek?.assignmentsDueThisWeek || safeData.dueAssignments || safeData.pendingAssignments || []);

  upcomingFocusSessions.slice(0, 2).forEach((s: any, idx: number) => {
    const d = s.sessionTime || s.date ? new Date(s.sessionTime || s.date) : new Date();
    focusThisWeek.push({
      id: `fs-${idx}`, 
      type: "purple", 
      title: s.courseTitle || s.title || "Upcoming Session", 
      date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), 
      time: s.time || d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      badgeText: "Upcoming", 
      badgeClasses: "bg-[#7B42F6] text-white", 
      icon: "/images/video-chat.svg" 
    });
  });

  assignmentsDueThisWeek.slice(0, 2).forEach((a: any, idx: number) => {
    focusThisWeek.push({
      id: `fa-${idx}`, 
      type: "green", 
      title: a.title || "Pending Assignment", 
      date: `Due: ${a.deadline || a.dueDate || "Soon"}`, 
      time: null, 
      badgeText: "Due Soon", 
      badgeClasses: "bg-[#FFF4E5] text-[#F58220] border border-[#FFE0B2]", 
      icon: "/images/file-edit.svg" 
    });
  });

  // 2. Upcoming Sessions Logic
  const upcomingSessions = (asArray(safeData.upcomingSessions || safeData.recentSessions || [])).map((s: any, i: number) => {
    const themes = ['purple', 'teal', 'orange'];
    const d = s.sessionTime || s.date ? new Date(s.sessionTime || s.date) : new Date();
    return {
      id: s.id || s._id || i, 
      title: s.courseTitle || s.title || "Upcoming Session", 
      date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), 
      time: s.time || d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      theme: themes[i % themes.length]
    };
  });

  // 3. Pending Assignments Logic
  const pendingAssignments = (asArray(safeData.pendingAssignments || safeData.dueAssignments || [])).map((a: any, i: number) => ({
    id: a.id || a._id || i, 
    title: a.title || "Pending Assignment", 
    subtitle: a.courseTitle || a.sessionName || "Assignment", 
    due: a.deadline || a.dueDate || "TBD"
  }));

  // 4. Feedbacks Logic
  const feedbacks = (asArray(safeData.feedbacks || safeData.alerts || [])).map((f: any, i: number) => ({
    id: f.id || f._id || i, 
    doctor: f.educatorName || f.from || "Mentor", 
    subject: f.sessionName || f.title || "Feedback", 
    text: f.comment || f.message || "No feedback provided."
  }));

  // --- DASHBOARD DISPLAY LOGIC ---
  const isActuallyEmpty = (
    (!userInfo.totalEnrolledCourses || userInfo.totalEnrolledCourses === 0) && 
    focusThisWeek.length === 0 &&
    upcomingSessions.length === 0 &&
    pendingAssignments.length === 0
  );

  const courseName = userInfo.enrolledCourses?.[0]?.title || "your courses";
  const emptyMessage = isActuallyEmpty 
    ? "Get your journey started with you with the varieties of sessions in Yetzu."
    : `You're making great progress in your <span class="font-semibold text-gray-700">${courseName}</span> journey. Keep the momentum going!`;

  return (
    <div className="w-full min-h-screen bg-white md:bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 p-0 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full pb-20 md:pb-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 px-4 pt-6 md:px-0 md:pt-0">
          <div>
            <h1 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-2">
              Welcome back, {userInfo.name || "Student"}!
            </h1>
            <p className="text-[14px] md:text-[15px] text-gray-500 max-w-2xl leading-relaxed" dangerouslySetInnerHTML={{ __html: emptyMessage }} />
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#042BFD]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date Today</p>
              <p className="text-[15px] font-bold text-gray-900">
                {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {isActuallyEmpty ? (
           <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm mx-4 md:mx-0">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
               <Calendar size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Courses Yet</h3>
            <p className="text-gray-500 max-w-md mb-8">
              Explore our wide range of cohorts and webinars to start your learning journey.
            </p>
            <Link href="/courses" className="bg-[#042BFD] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
              Explore Sessions
            </Link>
           </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 md:gap-4 px-0 md:px-0">
              
              {/* Focus Section */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl p-6 md:p-6 md:shadow-sm overflow-hidden flex flex-col w-full">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">FOCUS FOR THIS WEEK</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{focusThisWeek.length}</span>
                </div>
                
                <div className="flex overflow-x-auto gap-4 flex-1 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {focusThisWeek.length > 0 ? focusThisWeek.map((card) => {
                    const theme = getFocusCardTheme(card.type);
                    return (
                      <div key={card.id} className={`relative bg-gradient-to-b ${theme.border} p-[1px] rounded-2xl min-w-[300px] md:min-w-[320px] shrink-0 shadow-sm overflow-hidden group`}>
                        <div className={`h-full w-full bg-gradient-to-br ${theme.bg} to-white rounded-2xl p-5 flex flex-col`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                              <img src={card.icon} alt={card.title} className="w-6 h-6 object-contain" />
                            </div>
                            <span className={`${card.badgeClasses} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                              {card.badgeText}
                            </span>
                          </div>
                          
                          <h3 className="text-[16px] font-bold text-gray-900 mb-6 leading-snug line-clamp-2 flex-1">
                            {card.title}
                          </h3>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/50">
                              <Calendar size={14} className="text-gray-400" />
                              {card.date}
                            </div>
                            {card.time && (
                              <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/50">
                                <Clock size={14} className="text-gray-400" />
                                {card.time}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <p className="text-[14px] text-gray-500">Nothing to focus on this week.</p>
                  )}
                </div>
              </div>

            {/* Upcoming Sessions (Moved Up) */}
            <div className="md:border md:border-gray-100 bg-white md:rounded-2xl p-6 md:p-6 md:shadow-sm overflow-hidden flex flex-col w-full">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">UPCOMING SESSIONS</h2>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{upcomingSessions.length}</span>
              </div>
              
              <div className="flex overflow-x-auto gap-4 flex-1 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {upcomingSessions.length > 0 ? upcomingSessions.map((session : any) => {
                  const theme = getUpcomingTheme(session.theme);
                  return (
                    <div key={session.id} className={`border ${theme.border} rounded-xl p-1 overflow-hidden flex flex-col ${theme.background} shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[300px] md:min-w-[320px] shrink-0`}>
                      <div className="p-4 bg-white rounded-xl flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{session.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                            <Calendar size={14} className="shrink-0 text-gray-400" /> {session.date}
                          </span>
                          <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                            <Clock size={14} className="shrink-0 text-gray-400" /> {session.time}
                          </span>
                        </div>
                      </div>
                      <Link href={`/s/sessions/${session.id}`} className={`w-full ${theme.btnBg} ${theme.btnText} text-[14px] font-medium py-3 transition-colors shrink-0 text-center`}>
                        View Details
                      </Link>
                    </div>
                  );
                }) : (
                  <p className="text-[14px] text-gray-500">No upcoming sessions yet.</p>
                )}
              </div>
            </div>

            {/* Bottom Layout Grid (Assignments & Feedback) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              
              {/* Pending Assignments */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl p-5 md:shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">PENDING ASSIGNMENTS</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingAssignments.length}</span>
                </div>
                
                <div className="flex flex-col space-y-4 flex-1">
                  {pendingAssignments.length > 0 ? pendingAssignments.slice(0, 3).map((assignment :any ) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-xl overflow-hidden flex p-1 bg-[#F5F6FF] flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      <div className="p-4 bg-white rounded-xl mb-2 flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{assignment.title}</h3>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white">
                            <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{assignment.subtitle}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg whitespace-nowrap w-fit">
                            <Calendar size={14} className="text-gray-400 shrink-0" /> Due on: {assignment.due}
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
                        Open Workspace
                      </button>
                    </div>
                  )) : (
                    <p className="text-[14px] text-gray-500">No pending assignments.</p>
                  )}
                </div>
              </div>

              {/* Feedbacks */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl p-5 md:shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">FEEDBACKS</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{feedbacks.length}</span>
                </div>

                <div className="flex flex-col space-y-4 flex-1">
                  {feedbacks.length > 0 ? feedbacks.slice(0, 3).map((feedback :any) => (
                    <div key={feedback.id} className="border border-gray-200 rounded-xl p-1 overflow-hidden flex flex-col bg-[#F5F6FF] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      <div className="p-4 bg-white rounded-xl flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-4">{feedback.doctor}</h3>
                        <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white mb-3">
                          <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feedback.subject}</span>
                        </div>
                        <div className="bg-[#F6F8FA] p-3 rounded-lg text-[13px] text-gray-700 italic leading-relaxed line-clamp-3">
                          {feedback.text}
                        </div>
                      </div>
                      <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
                        View Details
                      </button>
                    </div>
                  )) : (
                    <p className="text-[14px] text-gray-500">No new feedback.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Discover New Sessions Section */}
            <div className="md:border md:border-gray-100 bg-white md:rounded-2xl p-6 md:p-6 md:shadow-sm overflow-hidden flex flex-col w-full mt-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">DISCOVER NEW SESSIONS</h2>
                  <p className="text-sm text-gray-500">Browse and enroll in new programs created by our admins.</p>
                </div>
                <Link href="/courses" className="text-[14px] font-medium text-[#042BFD] hover:underline flex items-center gap-1.5">
                  View All <ExternalLink size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableCourses.slice(0, 4).map((course) => (
                  <div key={course._id} className="group border border-gray-200 rounded-2xl overflow-hidden hover:border-[#042BFD] hover:shadow-md transition-all flex flex-col bg-white">
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={course.thumbnail || "/images/activity.png"} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2.5 py-1 rounded-full uppercase text-gray-700 shadow-sm">
                          {course.type || "Webinar"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[16px] font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-[#042BFD] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {course.subtitle || course.description || "Learn from top educators in this interactive session."}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Price</span>
                          <span className="text-[16px] font-bold text-gray-900">
                            {course.cost === 0 || !course.cost ? "Free" : `$${course.cost}`}
                          </span>
                        </div>
                        <Link 
                          href={`/courses/${course._id}`}
                          className="px-4 py-2 bg-[#111111] hover:bg-black text-white text-[13px] font-medium rounded-lg transition-colors"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
