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
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [dashboardError, setDashboardError] = useState("");
  const router = useRouter();
  const { user } = useSession();

  const loadDashboardData = async () => {
    try {
      // Fetch enrolled sessions + catalog courses in parallel
      const [enrolledRes, coursesRes] = await Promise.all([
        StudentAPI.getEnrolledSessions(),
        CourseAPI.getAllCourses()
      ]);
      
      console.log("Enrolled sessions response:", enrolledRes);
      console.log("Courses response:", coursesRes);
      
      // Parse enrolled sessions
      const enrolledData = enrolledRes?.data || enrolledRes || {};
      const enrolledFromApi = asArray(
        enrolledData?.sessions || 
        enrolledData?.enrolledCourses || 
        enrolledData?.enrolled || 
        enrolledData || []
      );
      
      // Parse catalog courses
      const coursesData = coursesRes?.data || coursesRes || {};
      const allCatalogCourses = asArray(
        coursesData.courses || coursesData.list || coursesData || []
      ).map(mapCatalogCourse);
      
      // Build enrolled course IDs set
      const enrolledIds = new Set(
        enrolledFromApi.map((c: any) => String(c.sessionId || c.courseId || c._id || c.id || ""))
      );
      console.log("Enrolled IDs:", Array.from(enrolledIds));
      
      // Upcoming sessions = enrolled sessions
      const upcoming = enrolledFromApi.map((ec: any) => {
        const course = ec.course || ec.fullCourseData || ec;
        return {
          id: ec.sessionId || ec.courseId || ec._id || ec.id || "",
          title: ec.courseTitle || course.title || "Untitled Session",
          subtitle: ec.courseSubtitle || course.subtitle || "Session",
          type: ec.sessionType || course.sessionType || "Webinar",
          educatorName: ec.educatorData?.name || course.educatorName || "TBA",
          thumbnail: getImageUrl(ec.courseThumbnail || course.thumbnail || ""),
          startDateTime: ec.startDateTime || course.startDateTime || "",
          dateLabel: formatDateValue(ec.startDateTime || course.startDateTime || ""),
          timeLabel: (ec.startDateTime || course.startDateTime) ? 
            new Date(ec.startDateTime || course.startDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "TBA",
          duration: ec.duration || course.duration || "1 hour",
          webinarLink: ec.webinarLink || course.webinarLink || "",
          cohortLink: ec.cohortLink || course.cohortLink || "",
          progress: ec.progress || 0,
        };
      });
      
      // Discover = catalog courses NOT enrolled
      const discover = allCatalogCourses
        .filter(c => !enrolledIds.has(c.id) && c.isActive);
      
      console.log("Upcoming sessions:", upcoming);
      console.log("Discover courses:", discover);
      
      setUpcomingSessions(upcoming);
      setAvailableCourses(discover);
      setEnrolledCourseIds(Array.from(enrolledIds));
      setApiData({ enrolledCourses: upcoming, allCourses: allCatalogCourses });
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
      console.log("Enrolling - sessionId:", sessionId, "amount:", amount);
      
      // For free courses, use minimum amount 1 INR
      if (amount <= 0) {
        amount = 1;
      }
      
      // Get user profile to get userId
      const profileRes = await StudentAPI.getProfile();
      const userId = profileRes?.data?.id || profileRes?.id || profileRes?.user?.id;
      
      if (!userId) {
        throw new Error("Unable to get user profile");
      }
      
      console.log("User ID for enrollment:", userId);
      
      // Simulate payment and trigger webhook
      const paymentResult = await PaymentAPI.verifyPayment({
        userId: userId,
        sessionId: sessionId,
        amount: amount * 100 // Convert to paise
      });
      
      console.log("Payment verification result:", paymentResult);
      
      toast.success(`Enrolled successfully in ${course.title || "course"}!`);
      
      // Refresh dashboard data
      await loadDashboardData();
    } catch (error: any) {
      console.error("Enrollment failed", error?.response?.data);
      toast.error(error?.response?.data?.message || error?.message || "Failed to enroll. Please try again.");
    }
  };
  
  if (isLoading) {
    return (
      <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </main>
    );
  }
  
  // --- PARSE API DATA ---
  const safeData = apiData || {};
  const userInfo = safeData.userInfo || safeData.user || {};
  const allCourses = asArray(safeData.allCourses || []);
  
  // Pending assignments
  const pendingAssignments = asArray(userInfo.pendingAssignments || userInfo.dueAssignments || [])
    .filter((a: any) => {
      const status = String(a.status || "").toLowerCase();
      return status === "pending" || status === "submitted" || status === "due";
    })
    .map((a: any) => ({
      id: a.id || a._id || a.assignmentId || "",
      title: a.title || a.assignmentTitle || "Untitled Assignment",
      courseTitle: a.courseTitle || a.sessionTitle || "Course",
      dueDate: a.dueDate || a.deadline || "TBA",
    }));
  
  return (
    <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, {userInfo.name || "Student"}! Here's what's happening with your learning journey.</p>
      </div>
      
      {dashboardError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {dashboardError}
        </div>
      )}
      
      {/* Upcoming Sessions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
        {upcomingSessions.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No upcoming sessions. Enroll in a course to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSessions.map((session, index) => {
              const theme = getUpcomingTheme(['teal', 'orange', 'purple'][index % 3]);
              return (
                <div key={session.id} className={`bg-white rounded-xl border ${theme.border} p-6 shadow-sm`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden relative">
                      {session.thumbnail && (
                        <img src={session.thumbnail} alt={session.title} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                      <p className="text-sm text-gray-500">{session.educatorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {session.dateLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {session.timeLabel}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/s/sessions/${session.id}`}
                      className={`flex-1 text-center py-2 px-4 rounded-lg text-sm font-medium ${theme.btnBg} ${theme.btnText}`}
                    >
                      View Details
                    </Link>
                    {session.webinarLink && (
                      <a 
                        href={session.webinarLink} 
                        target="_blank"
                        className="py-2 px-4 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <ExternalLink size={14} className="inline mr-1" />
                        Join
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      
      {/* Pending Assignments */}
      {pendingAssignments.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Assignments</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {pendingAssignments.map((assignment: any) => (
              <div key={assignment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.courseTitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-orange-600">Due: {assignment.dueDate}</span>
                  <Link href={`/s/assignments/${assignment.id}`} className="ml-4 text-sm text-blue-600 hover:underline">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Discover Sessions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Discover New Sessions</h2>
        {availableCourses.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No new sessions available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                  {course.thumbnail && (
                    <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{course.educatorName}</p>
                <p className="text-sm text-gray-600 mb-4">{course.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">₹{course.cost}</span>
                  <button
                    onClick={(e) => handleEnroll(e, course)}
                    className="py-2 px-4 rounded-lg text-sm font-medium bg-[#042BFD] text-white hover:bg-blue-700"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
