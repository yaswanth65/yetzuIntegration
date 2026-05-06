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
import { StudentAPI, CourseAPI, PaymentAPI, asArray } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/utils/imageUtils";
import useSession from "@/hooks/useSession";

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

const getExploreTheme = (index: number) => {
  const themes = [
    { badge: "bg-[#7B42F6]", price: "text-[#7B42F6]", btn: "bg-[#7B42F6] hover:bg-[#6633D6]", link: "text-[#7B42F6] hover:text-[#6633D6]", bgLight: "#F9F6FF" },
    { badge: "bg-[#2F9089]", price: "text-[#2F9089]", btn: "bg-[#2F9089] hover:bg-[#24756F]", link: "text-[#2F9089] hover:text-[#24756F]", bgLight: "#F2FAFA" },
    { badge: "bg-[#D97706]", price: "text-[#D97706]", btn: "bg-[#D97706] hover:bg-[#B46205]", link: "text-[#D97706] hover:text-[#B46205]", bgLight: "#FFF8F2" },
    { badge: "bg-[#059669]", price: "text-[#059669]", btn: "bg-[#059669] hover:bg-[#047A55]", link: "text-[#059669] hover:text-[#047A55]", bgLight: "#E6F5EE" },
  ];
  return themes[index % themes.length];
};
const getUpcomingTheme = (theme: string) => {
  switch(theme) {
    case 'teal': return { border: "border-teal-100", btnBg: "bg-[#F2FAFA] hover:bg-[#E5F5F5]", btnText: "text-[#2F9089]" , background : "bg-teal-50" };
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

const formatOldDate = (value: any) => {
  const parsed = parseDateValue(value);
  if (!parsed) return "TBD";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parsed.getDate()} ${months[parsed.getMonth()]}, ${parsed.getFullYear()}`;
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
      const [enrolledRes, coursesRes, profileRes] = await Promise.all([
        StudentAPI.getEnrolledSessions(),
        CourseAPI.getAllCourses(),
        StudentAPI.me().catch(() => null)
      ]);
      
      const enrolledData = enrolledRes?.data || enrolledRes || {};
      const enrolledFromApi = asArray(
        enrolledData?.enrolledCourses || 
        enrolledData?.enrolled || 
        enrolledData?.sessions ||
        enrolledData || []
      );

      const totalEnrolledCourses = enrolledData.totalEnrolledCourses || enrolledFromApi.length;

      const coursesData = coursesRes?.data || coursesRes || {};
      const allCatalogCourses = asArray(
        coursesData.courses || coursesData.list || coursesData || []
      ).map(mapCatalogCourse);

      const enrolledIds = new Set(
        enrolledFromApi.map((c: any) => String(c.sessionId || c.courseId || c._id || c.id || ""))
      );

      const upcomingSessions = enrolledFromApi.map((ec: any, i: number) => {
        const course = ec.course || ec.fullCourseData || ec;
        const themes = ['purple', 'teal', 'orange'];
        return {
          id: ec.sessionId || ec.courseId || ec._id || ec.id || `session-${i}`,
          title: ec.courseTitle || course.title || "Untitled Session",
          date: formatOldDate(ec.startDateTime || course.startDateTime),
          time: (ec.startDateTime || course.startDateTime) ?
            new Date(ec.startDateTime || course.startDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "TBA",
          theme: themes[i % themes.length],
          sessionLink: ec.webinerLink || ec.webinarLink || ec.sessionLink || course.webinerLink || course.webinarLink || course.cohortLink || "",
          startDateTime: ec.startDateTime || course.startDateTime || "",
          progress: ec.progress || course.progress || 0,
          assignments: asArray(course.assignments || ec.assignments || []),
        };
      });

      const pendingAssignments: any[] = [];
      enrolledFromApi.forEach((ec: any, i: number) => {
        const course = ec.course || ec.fullCourseData || ec;
        const assignments = asArray(course.assignments || ec.assignments || []);
        assignments.forEach((a: any, ai: number) => {
          const status = String(a.status || "").toLowerCase();
          if (status === "pending" || status === "published") {
            pendingAssignments.push({
              id: a.id || a.assignmentId || `${ec.sessionId || ec.courseId || "assign"}-${ai}`,
              title: a.title || "Untitled Assignment",
              subtitle: ec.courseTitle || course.title || "Assignment",
              due: a.dueDate ? formatOldDate(a.dueDate) : "TBD",
              sessionId: ec.sessionId || ec.courseId || "",
            });
          }
        });
      });

      const discover = allCatalogCourses
        .filter(c => !enrolledIds.has(c.id) && c.isActive);

      const profileData = profileRes?.data || profileRes || {};
      const userProfile = profileData.user || profileData || {};

      const avgProgress = enrolledFromApi.length > 0
        ? Math.round(enrolledFromApi.reduce((sum: number, ec: any) => sum + (ec.progress || 0), 0) / enrolledFromApi.length)
        : 0;

      setApiData({
        userInfo: {
          name: userProfile.name || user?.name || "Student",
          totalEnrolledCourses,
          totalCertificates: 0,
          progress: { percentage: avgProgress },
          enrolledCourses: enrolledFromApi.slice(0, 1).map((ec: any) => ({
            title: ec.courseTitle || ec.course?.title || "your course"
          }))
        },
        upcomingSessions,
        pendingAssignments,
        feedbacks: [],
      });

      setAvailableCourses(discover);
      setEnrolledCourseIds(Array.from(enrolledIds));
      setDashboardError("");
    } catch (error: any) {
      console.error("Dashboard data load failed", error);
      setDashboardError(error?.message || "Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleEnroll = async (e: React.MouseEvent, course: any) => {
    e.preventDefault();
    const sessionId = String(course._id || course.id || "");
    
    if (!sessionId) {
      toast.error("This course is missing an ID, so it cannot be opened right now.");
      return;
    }
    
    try {
      let amount = Number(course.cost || course.price || 0);
      if (amount <= 0) {
        amount = 1;
      }
      
      const profileRes = await StudentAPI.getProfile();
      const userId = profileRes?.data?.id || profileRes?.id || profileRes?.user?.id;
      
      if (!userId) {
        throw new Error("Unable to get user profile");
      }
      
      const paymentResult = await PaymentAPI.verifyPayment({
        userId: userId,
        sessionId: sessionId,
        amount: amount * 100
      });
      
      toast.success(`Enrolled successfully in ${course.title || "course"}!`);
      await loadDashboardData();
    } catch (error: any) {
      console.error("Enrollment failed", error?.response?.data);
      toast.error(error?.response?.data?.message || error?.message || "Failed to enroll. Please try again.");
    }
  };
  
  if (isLoading) {
    return (
      <main className="md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  const safeData = apiData || {};
  const userInfo = safeData.userInfo || {};
  
  const upcomingSessions = safeData.upcomingSessions || [];
  const pendingAssignments = safeData.pendingAssignments || [];

  const isActuallyEmpty = (
    (!userInfo.totalEnrolledCourses || userInfo.totalEnrolledCourses === 0) && 
    upcomingSessions.length === 0 &&
    pendingAssignments.length === 0
  );

  const isCompleted = (userInfo.totalCertificates > 0);
  const ringProgress = isActuallyEmpty ? 0 : (isCompleted ? 100 : (userInfo.progress?.percentage || 25));

  const userName = userInfo.name?.split(" ")[0] || "Student";
  const courseName = userInfo.enrolledCourses?.[0]?.title || "your courses";

  const bannerTitle = isActuallyEmpty ? `Welcome ${userName} 👋🏼` : `Welcome ${userName}. You're on track...`;
  const bannerSubtitle = isActuallyEmpty 
    ? "Get your journey started with you with the varieties of sessions in Yetzu."
    : `You're making great progress in your <span class="font-semibold text-gray-700">${courseName}</span> journey. Keep the momentum going!`;

  const focusThisWeek: any[] = [];
  if (upcomingSessions.length > 0) {
    const todaySession = upcomingSessions[0];
    focusThisWeek.push({
      id: "focus-session-0",
      type: "purple",
      title: todaySession.title,
      date: todaySession.date,
      time: todaySession.time,
      badgeText: "TODAY",
      badgeClasses: "bg-[#7B42F6] text-white",
      icon: "/images/video-chat.svg",
      sessionId: todaySession.id,
      sessionLink: todaySession.sessionLink,
    });
  }
  if (pendingAssignments.length > 0) {
    focusThisWeek.push({
      id: "focus-assignment-0",
      type: "green",
      title: pendingAssignments[0].title,
      date: `Due on: ${pendingAssignments[0].due}`,
      time: null,
      badgeText: "Due Soon",
      badgeClasses: "bg-[#FFF4E5] text-[#F58220] border border-[#FFE0B2]",
      icon: "/images/file-edit.svg",
      assignmentId: pendingAssignments[0].id,
    });
  }

  const trackerSteps = [
    { id: 1, label: "Signed up!", icon: "/images/shake-hand.svg", active: true },
    { id: 2, label: "Sessions", icon: "/images/calander.svg", active: upcomingSessions.length > 0 },
    { id: 3, label: "Assignments", icon: "/images/assignment.svg", active: pendingAssignments.length > 0 },
    { id: 4, label: isCompleted ? "Completed" : "Certifications", icon: isCompleted ? "/images/flag.svg" : "/images/certificate.svg", active: isCompleted }
  ];

  return (
    <div className="bg-white md:bg-transparent">
      <main className="px-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto flex flex-col gap-5 md:bg-gray-50 min-h-screen overflow-x-hidden pb-24 lg:pb-8">
      
        {dashboardError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {dashboardError}
          </div>
        )}

        {/* =========================================
            1. DYNAMIC TOP BANNER 
            ========================================= */}
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between bg-white md:border md:border-gray-100 shadow-sm rounded-none md:rounded-2xl p-4 md:p-6 gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-50 via-transparent to-transparent pointer-events-none"></div>
          <img 
            src="/images/clip-path.svg" 
            alt="Background pattern" 
            className="absolute left-[15%] top-1/2 -translate-y-1/2 h-[150%] min-w-[300px] object-cover pointer-events-none z-0 opacity-70" 
          />

          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-5 z-10 w-full xl:w-auto text-left">
            <div 
              className={`relative rounded-full flex items-center justify-center shrink-0 ${isActuallyEmpty ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px]' : 'w-[72px] h-[72px] xl:w-[76px] xl:h-[76px]'}`}
              style={{ background: ringProgress > 0 ? `conic-gradient(#042BFD ${ringProgress}%, #f3f4f6 ${ringProgress}%)` : 'transparent' }}
            >
              <div className={`rounded-full overflow-hidden bg-white ${ringProgress > 0 ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px] border-[3px] border-white' : 'w-full h-full'}`}>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || "Student")}&background=random`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 mt-1 xl:mt-0">
              <h1 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-tight mb-1.5">{bannerTitle}</h1>
              <p className="text-[13px] md:text-[14px] text-gray-500 max-w-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: bannerSubtitle }} />
            </div>
          </div>

          {!isActuallyEmpty && (
            <>
              <div className="hidden xl:flex items-center justify-end overflow-x-auto w-auto pb-0 z-10 no-scrollbar">
                {trackerSteps.map((step, index) => {
                  const isLast = index === trackerSteps.length - 1;
                  return (
                    <React.Fragment key={`desktop-${step.id}`}>
                      <div className={`flex flex-col items-center gap-1.5 shrink-0 transition-opacity ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="w-8 h-8 flex items-center justify-center">
                          <img src={step.icon} alt={step.label} className="max-w-full max-h-full object-contain drop-shadow-sm" />
                        </div>
                        <span className={`text-[12px] font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                      </div>
                      {!isLast && (
                        index === 0 ? (
                          <div className="w-16 h-[4px] bg-gray-200 rounded-full mb-6 mx-3 shrink-0 relative flex items-center">
                            <div className="w-[60%] h-full rounded-full bg-[#10B981]"></div>
                            <div className="absolute left-[60%] w-2.5 h-2.5 bg-[#10B981] rounded-full -ml-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                          </div>
                        ) : (
                          <div className="w-8 h-[2px] border-t-2 border-dashed border-gray-300 mb-6 mx-3 shrink-0 opacity-50"></div>
                        )
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="flex xl:hidden w-full justify-between items-end z-10 mt-3 gap-1.5">
                {trackerSteps.map((step, index) => {
                  let fillWidth = "w-0";
                  if (index === 0) fillWidth = "w-full"; 
                  else if (index === 1 && step.active) fillWidth = isCompleted ? "w-full" : "w-[40%]"; 
                  else if (index > 1 && step.active) fillWidth = "w-full"; 

                  return (
                    <div key={`mobile-${step.id}`} className="flex flex-col items-center flex-1 gap-2.5 overflow-hidden">
                      <div className={`transition-opacity flex flex-col items-center gap-1.5 ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="h-8 flex items-end justify-center">
                          <img src={step.icon} alt={step.label} className="max-h-full object-contain drop-shadow-sm" />
                        </div>
                        <span className={`text-[11px] font-medium whitespace-nowrap ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.label}
                        </span>
                      </div>
                      <div className="w-[85%] h-[4px] bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-[#22C55E] rounded-full transition-all duration-500 ${fillWidth}`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* =========================================
            2. EMPTY STATE VIEW
            ========================================= */}
        {isActuallyEmpty && (
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
            {availableCourses.length > 0 ? (
              <Link href="/s/sessions" className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
                Explore Courses <ExternalLink size={16} />
              </Link>
            ) : (
              <button className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
                Explore Courses <ExternalLink size={16} />
              </button>
            )}
          </div>
        )}

        {/* =========================================
            3. POPULATED DASHBOARD VIEW 
            ========================================= */}
        {!isActuallyEmpty && (
          <>
            {/* Focus For This Week */}
            {focusThisWeek.length > 0 && (
              <div className="md:border md:border-gray-100 md:shadow-sm md:rounded-2xl px-0 py-2 md:p-6 bg-white w-full overflow-hidden">
                <div className="flex justify-between items-center mb-4 px-4 md:px-0">
                  <h2 className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">FOCUS FOR THIS WEEK</h2>
                  <div className="hidden md:flex gap-2 shrink-0">
                    <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400 transition-colors"><ChevronLeft size={16} /></button>
                    <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"><ChevronRight size={16} /></button>
                  </div>
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-4 px-4 md:px-0 gap-4 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {focusThisWeek.map((item: any) => {
                    const theme = getFocusCardTheme(item.type);
                    return (
                      <div key={item.id} className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.border} flex flex-col min-h-[260px] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`}>
                        <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} via-white to-white pointer-events-none z-0`}></div>
                          
                          <div className="absolute top-5 left-5 z-10">
                            <img src={item.icon} alt="Icon" className="w-[68px] h-[68px]" />
                          </div>

                          {item.badgeText && (
                            <div className="flex justify-end mb-8 relative z-20">
                              <span className={`${item.badgeClasses} text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0`}>
                                {item.badgeText}
                              </span>
                            </div>
                          )}

                          <div className={`relative z-20 flex-1 flex flex-col h-full justify-end ${!item.badgeText ? 'mt-18' : 'mt-3'}`}>
                            <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">{item.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
                              <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> {item.date}</span>
                              {item.time && <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> {item.time}</span>}
                            </div>
                            {item.sessionId ? (
                              <Link href={`/s/sessions/${item.sessionId}`}>
                                <ViewDetailsButton variant={theme.btn} />
                              </Link>
                            ) : item.assignmentId ? (
                              <Link href={`/s/assignments/${item.assignmentId}`}>
                                <ViewDetailsButton variant={theme.btn} />
                              </Link>
                            ) : (
                              <ViewDetailsButton variant={theme.btn} />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Bottom Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-4 w-full">
              
              {/* Upcoming Sessions */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">UPCOMING SESSIONS</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{upcomingSessions.length}</span>
                </div>
                
                <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {upcomingSessions.length > 0 ? upcomingSessions.map((session : any) => {
                    const theme = getUpcomingTheme(session.theme);
                    return (
                      <div key={session.id} className={`border ${theme.border} rounded-xl p-1 overflow-hidden flex flex-col ${theme.background} shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`}>
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
                        <Link href={`/s/sessions/${session.id}`}>
                          <button className={`w-full ${theme.btnBg} ${theme.btnText} text-[14px] font-medium py-3 transition-colors shrink-0`}>
                            View Details
                          </button>
                        </Link>
                      </div>
                    );
                  }) : (
                    <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No upcoming sessions.</p>
                  )}
                </div>
              </div>

              {/* Pending Assignments */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">PENDING ASSIGNMENTS</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingAssignments.length}</span>
                </div>
                
                <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {pendingAssignments.length > 0 ? pendingAssignments.map((assignment :any ) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-xl overflow-hidden flex p-1 bg-[#F5F6FF] flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none">
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
                      <Link href={`/s/assignments/${assignment.id}`}>
                        <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
                          Open Workspace
                        </button>
                      </Link>
                    </div>
                  )) : (
                    <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No pending assignments.</p>
                  )}
                </div>
              </div>

              {/* Explore - Unpurchased Courses */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden md:col-span-2 xl:col-span-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">EXPLORE</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{availableCourses.length}</span>
                </div>

                <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {availableCourses.length > 0 ? availableCourses.slice(0, 4).map((course :any, index: number) => {
                    const theme = getExploreTheme(index);
                    return (
                    <div key={course.id} className={`border border-gray-200 rounded-xl overflow-hidden flex p-1 flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`} style={{ backgroundColor: theme.bgLight }}>
                      <div className="p-4 bg-white rounded-xl mb-2 flex-1">
                        <div className="h-24 rounded-xl overflow-hidden relative mb-3 bg-gray-100">
                          {course.thumbnail ? (
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Calendar size={24} />
                            </div>
                          )}
                          <div className={`absolute top-1.5 right-1.5 ${theme.badge} text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase`}>
                            {course.type}
                          </div>
                        </div>
                        <h3 className="text-[15px] font-bold text-gray-900 mb-1.5 leading-snug line-clamp-2">{course.title}</h3>
                        <p className="text-[12px] text-gray-500 mb-3">{course.educatorName}</p>
                        <div className="flex items-center gap-3 text-[13px] text-gray-600">
                          <span className="flex items-center gap-1.5 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                            <Calendar size={14} className="shrink-0 text-gray-400" /> {course.dateLabel}
                          </span>
                          {course.cost > 0 && <span className={`${theme.price} font-semibold`}>₹{course.cost}</span>}
                          {course.cost === 0 && <span className="text-green-600 font-semibold">Free</span>}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => handleEnroll(e, course)}
                        className={`w-full  text-green font-medium text-[14px] py-3 transition-colors shrink-0`}
                      >
                        {course.cost > 0 ? `Enroll - ₹${course.cost}` : "Enroll Free"}
                      </button>
                    </div>
                    );
                  }) : (
                    <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No courses to explore.</p>
                  )}
                </div>

                {availableCourses.length > 4 && (
                  <Link href="/s/sessions" className={`mt-3 flex items-center justify-center gap-1 text-[13px] font-medium ${getExploreTheme(0).link} transition-colors px-4 md:px-0`}>
                    View All Courses <ExternalLink size={14} />
                  </Link>
                )}
              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
}
