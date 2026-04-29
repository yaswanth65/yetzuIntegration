"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Paperclip,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { StudentAPI, CourseAPI, PaymentAPI, asArray } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/utils/imageUtils";
import useSession from "@/hooks/useSession";

const getUpcomingTheme = (theme: string) => {
  switch(theme) {
    case 'teal': return { border: "border-teal-100", btnBg: "bg-[#F2FAFA] hover:bg-[#E5F5F5]", btnText: "text-[#2F9089]" , background : "bg-teal-50"  };
    case 'orange': return { border: "border-orange-100", btnBg: "bg-[#FFF8F2] hover:bg-[#FFF0E5]", btnText: "text-[#D97706]",background : "bg-orange-50" };
    case 'purple': return { border: "border-purple-100", btnBg: "bg-[#F9F6FF] hover:bg-[#F3EFFF]", btnText: "text-[#7B42F6]",background : "bg-purple-50" };
    default: return { border: "border-gray-200", btnBg: "bg-gray-50 hover:bg-gray-100", btnText: "text-gray-600",background : "bg-gray-50" };
  }
};

const parseDateValue = (value: any) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDateValue = (value: any) => {
  const parsed = parseDateValue(value);
  return parsed ? parsed.toLocaleDateString() : "Date TBA";
};

const formatTimeValue = (value: any, fallback?: string) => {
  const parsed = parseDateValue(value);
  if (parsed) {
    return parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return fallback || "Time TBA";
};

const mapCatalogCourse = (course: any) => {
  const id = String(course._id || course.id || course.courseId || "");
  return {
    ...course,
    id,
    title: course.title || course.courseTitle || "Untitled Course",
    subtitle: course.subtitle || course.description || "Learn from top educators in this interactive session.",
    type: course.type || course.sessionType || "Webinar",
    educatorName: course.educatorName || course.educator?.name || course.mentorName || "TBA",
    thumbnail: getImageUrl(course.thumbnail || ""),
    startDateTime: course.startDateTime || course.scheduleDate || course.date || "",
    dateLabel: formatDateValue(course.startDateTime || course.scheduleDate || course.date),
    timeLabel: course.time || course.startTime || formatTimeValue(course.startDateTime || course.scheduleDate || course.date),
    duration: course.duration || "1 hour",
    capacity: course.capacity || course.maxStudents || "Unlimited",
    cost: Number(course.cost ?? course.price ?? course.finalPrice ?? 0),
    isActive: course.isActive !== false,
  };
};

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<any>(null);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [dashboardError, setDashboardError] = useState("");
  const router = useRouter();
  const { user } = useSession();

  const loadDashboardData = async () => {
    try {
      console.log("Fetching courses...");
      const coursesRes = await CourseAPI.getAllCourses();
      console.log("Courses response:", coursesRes);
      
      const catalogCourses = asArray(coursesRes?.courses || coursesRes?.data?.courses || []).map(mapCatalogCourse);
      console.log("Catalog courses:", catalogCourses);

      setAvailableCourses(catalogCourses.filter((course: any) => course.id && course.isActive));
      setApiData({ allCourses: catalogCourses });
    } catch (error: any) {
      console.error("Failed to load courses:", error);
      setAvailableCourses([]);
      setApiData({});
    }
  };

  const handleEnroll = async (e: React.MouseEvent, course: any) => {
    e.preventDefault();
    const courseId = String(course._id || course.id || "");

    if (!courseId) {
      toast.error("This course is missing an ID, so it cannot be opened right now.");
      return;
    }

    try {
      const amount = Number(course.cost || course.price || 0);
      await PaymentAPI.createOrder({
        amount: amount,
        courseId
      });
      toast.success(`Enrollment started for ${course.title || course.type || "session"}.`);
      setEnrolledCourseIds((prev) => Array.from(new Set([...prev, courseId])));
      setApiData((previous: any) => {
        const current = previous || {};
        const currentUserInfo = current.userInfo || {};
        const currentEnrolled = asArray(currentUserInfo.enrolledCourses || current.enrolledCourses);
        const nextCourse = {
          ...course,
          _id: courseId,
          id: courseId,
          courseId,
          educatorName: course.educatorName,
          title: course.title,
        };

        return {
          ...current,
          userInfo: {
            ...currentUserInfo,
            totalEnrolledCourses: (currentUserInfo.totalEnrolledCourses || currentEnrolled.length || 0) + 1,
            enrolledCourses: [nextCourse, ...currentEnrolled],
          },
          upcomingSessions: [nextCourse, ...asArray(current.upcomingSessions)],
        };
      });
      router.push(`/s/sessions/${courseId}`);
    } catch (error: any) {
      console.error("Dashboard enroll failed", error);
      toast.error(error?.message || "Failed to start enrollment.");
      router.push(`/courses/${courseId}`);
    }
  };

  // --- FETCH DASHBOARD DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setDashboardError("");
      try {
        await loadDashboardData();
      } catch (error: any) {
        console.error("Dashboard fetch error:", error);
        setApiData({});
        setAvailableCourses([]);
        setDashboardError(error?.message || "Unable to load your dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

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
  const allCourses = asArray(safeData?.allCourses || []);
  const discoverCourses = allCourses;
  const upcomingSessions = allCourses.filter((c: any) => c.isActive).slice(0, 4).map((s: any, i: number) => {
    const themes = ['purple', 'teal', 'orange'];
    return {
      ...s,
      id: s.id || s._id || i, 
      title: s.title || "Session", 
      type: s.type || "Webinar",
      educatorName: s.educatorName || "TBA",
      duration: s.duration || "1 hour",
      capacity: s.capacity || "Unlimited",
      thumbnail: s.thumbnail || "/images/activity.png",
      date: s.dateLabel || "TBA",
      time: s.timeLabel || "TBA",
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
  const isActuallyEmpty = allCourses.length === 0;

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
              {dashboardError ? (
                <div className="mx-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 md:mx-0">
                  {dashboardError}
                </div>
              ) : null}
              
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

              {discoverCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {discoverCourses.slice(0, 4).map((course) => (
                  <div key={course.id} className="group border border-gray-200 rounded-2xl overflow-hidden hover:border-[#042BFD] hover:shadow-md transition-all flex flex-col bg-white">
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={course.thumbnail} 
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
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {course.subtitle || course.description || "Learn from top educators in this interactive session."}
                      </p>
                      
                      <div className="flex flex-col gap-2 mb-4 mt-auto">
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <span className="font-semibold text-gray-900">Educator:</span> {course.educatorName || course.educator?.name || "TBA"}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <Calendar size={12} className="text-gray-400" />
                          {course.dateLabel}
                          <span className="mx-1">•</span>
                          <Clock size={12} className="text-gray-400" />
                          {course.timeLabel}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                          <span className="font-medium">Duration:</span> {course.duration} <span className="mx-1">•</span>
                          <span className="font-medium">Capacity:</span> {course.capacity}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Price</span>
                          <span className="text-[16px] font-bold text-gray-900">
                            {course.cost === 0 ? "Free" : `$${course.cost}`}
                          </span>
                        </div>
                        {(()=>{
                          const isEnrolled = enrolledCourseIds.includes(String(course.id));
                          return (
                            <button 
                              onClick={(e) => !isEnrolled && handleEnroll(e, course)}
                              disabled={isEnrolled}
                              className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                                isEnrolled 
                                  ? "bg-green-100 text-green-800 opacity-80 cursor-default"
                                  : "bg-[#111111] hover:bg-black text-white"
                              }`}
                            >
                              {isEnrolled ? "Enrolled" : "Enroll Now"}
                            </button>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-12 text-center">
                  <h3 className="text-lg font-bold text-gray-900">No new sessions available right now</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Newly published sessions that students can access will appear here automatically.
                  </p>
                </div>
              )}
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
                    <div key={session.id} className="group border border-gray-200 rounded-2xl overflow-hidden hover:border-[#042BFD] hover:shadow-md transition-all flex flex-col bg-white min-w-[300px] md:min-w-[320px] shrink-0">
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        <img 
                          src={session.thumbnail || "/images/activity.png"} 
                          alt={session.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2.5 py-1 rounded-full uppercase text-gray-700 shadow-sm">
                            {session.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-[16px] font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-[#042BFD] transition-colors">
                          {session.title}
                        </h3>
                        
                        <div className="flex flex-col gap-2 mb-4 mt-auto">
                          <div className="flex items-center gap-2 text-[12px] text-gray-600">
                            <span className="font-semibold text-gray-900">Educator:</span> {session.educatorName}
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-gray-600">
                            <Calendar size={12} className="text-gray-400" /> {session.date}
                            <span className="mx-1">•</span>
                            <Clock size={12} className="text-gray-400" /> {session.time}
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-gray-600">
                            <span className="font-medium">Duration:</span> {session.duration}
                            <span className="mx-1">•</span>
                            <span className="font-medium">Capacity:</span> {session.capacity}
                          </div>
                        </div>
                        
                        <Link href={`/s/sessions/${session.id}`} className="mt-auto px-4 py-2 bg-[#F8FAFC] text-gray-900 border border-gray-200 hover:bg-[#042BFD] hover:text-white hover:border-[#042BFD] text-[13px] font-medium rounded-lg transition-colors text-center">
                          View Details
                        </Link>
                      </div>
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
                      <Link
                        href={`/s/assignments/${assignment.id}`}
                        className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0 text-center rounded-b-[11px]"
                      >
                        Open Workspace
                      </Link>
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

            </div>
          </>
        )}

      </main>
    </div>
  );
}
