"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Link as LinkIcon, AlertCircle } from "lucide-react";
import Link from "next/link";
import { StudentAPI, asArray } from "@/lib/api";

const getColorStyles = (colorScheme: string) => {
  switch (colorScheme) {
    case "red":
      return {
        wrapperBorder: "from-[#FECDD3] via-transparent to-[#FECDD3]",
        bgGradient: "from-[#FFF0F2] via-white via-40% to-white",
        badgeBg: "bg-[#FFF0F2]",
        badgeText: "text-[#E11D48]",
        image: "/images/file-format-red1.svg",
      };
    case "green":
      return {
        wrapperBorder: "from-[#A7F3D0] via-transparent to-[#A7F3D0]",
        bgGradient: "from-[#ECFDF5] via-white via-40% to-white",
        badgeBg: "bg-[#D1FAE5]",
        badgeText: "text-[#065F46]",
        image: "/images/file-format-green.svg",
      };
    case "orange":
      return {
        wrapperBorder: "from-[#FED7AA] via-transparent to-[#FED7AA]",
        bgGradient: "from-[#FFF7ED] via-white via-40% to-white",
        badgeBg: "bg-[#FFF7ED]",
        badgeText: "text-[#EA580C]",
        image: "/images/file-format-orange.svg",
      };
    case "gray":
    default:
      return {
        wrapperBorder: "from-[#E2E8F0] via-transparent to-[#E2E8F0]",
        bgGradient: "from-[#F8FAFC] via-white via-40% to-white",
        badgeBg: "bg-[#F1F5F9]",
        badgeText: "text-[#475569]",
        image: "/images/file-format-gray.svg",
      };
  }
};

const toDisplayDate = (value?: string) => {
  if (!value) return "TBD";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const mapAssignment = (item: any, index: number) => {
  const status = String(item.status || "").toLowerCase();
  const dueSource = item.dueDate || item.deadline || item.createdAt || "";
  const dueDate = dueSource ? new Date(dueSource) : null;
  const isSubmitted = ["submitted", "review done", "reviewed", "graded", "completed"].includes(status);
  const isOverdue = !isSubmitted && dueDate ? dueDate.getTime() < Date.now() : false;
  const sessionName =
    item.sessionName ||
    item.sessionTitle ||
    item.courseTitle ||
    item.course?.title ||
    "General Session";
  const mentorName =
    item.educatorName ||
    item.mentorName ||
    item.educator?.name ||
    item.educator?.Name ||
    "Educator";

  return {
    id: String(item._id || item.id || item.assignmentId || index),
    title: item.title || item.assignmentTitle || "Untitled Assignment",
    sessionName,
    mentorName,
    mentorImage:
      item.mentorImage ||
      item.educator?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorName)}&background=random`,
    date: toDisplayDate(dueSource),
    type: isSubmitted ? "completed" : "pending",
    colorScheme: isSubmitted ? "green" : isOverdue ? "red" : "orange",
    badgeLabel: isSubmitted ? "SUBMITTED ON" : isOverdue ? "OVERDUE" : "DUE",
  };
};

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [assignments, setAssignments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        course?.session?._id ||
        course?.session?.id ||
        course?.course?._id ||
        course?.course?.id ||
        "",
    );

  const getCourseTitle = (course: any): string =>
    String(course?.courseTitle || course?.sessionTitle || course?.title || course?.course?.title || "");

  const getEducatorName = (course: any): string =>
    String(
      course?.educator?.name ||
        course?.mentor?.name ||
        course?.educatorName ||
        course?.mentorName ||
        course?.fullCourseData?.educator?.name ||
        "Educator",
    );

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

  const flattenAssignmentsFromCourse = (course: any) => {
    const fullCourse = course?.fullCourseData || course;
    const courseId = getCourseId(fullCourse) || getCourseId(course);
    const courseTitle = getCourseTitle(fullCourse) || getCourseTitle(course) || "General Session";
    const educatorName = getEducatorName(fullCourse) || getEducatorName(course);

    const list = asArray(
      fullCourse?.assignments ||
        course?.assignments ||
        fullCourse?.course?.assignments ||
        course?.course?.assignments ||
        [],
    );

    return list
      .map((assignment: any) => {
        const id = getAssignmentId(assignment);
        if (!id) return null;

        return {
          id,
          title: assignment?.title || assignment?.assignmentTitle || "Untitled Assignment",
          dueDate: assignment?.dueDate || assignment?.deadline || assignment?.due || assignment?.createdAt || "",
          status: String(assignment?.status || ""),
          courseId: String(courseId || getAssignmentCourseId(assignment)),
          courseTitle,
          educatorName,
          documentUrl: assignment?.documentUrl || assignment?.fileUrl || assignment?.url,
          documentPath: assignment?.documentPath || assignment?.path,
        };
      })
      .filter(Boolean);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setIsLoading(true);
        setError("");

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
          console.warn("Falling back to enrolled course assignments only", studentAssignmentsError);
        }

        const filteredStudentAssignments = studentScopedAssignments.filter((assignment: any) => {
          const assignmentId = String(
            assignment?.id || assignment?._id || assignment?.assignmentId || assignment?.assignment_id || "",
          );
          const assignmentCourseId = getAssignmentCourseId(assignment);

          if (assignmentId && courseAssignmentIds.has(assignmentId)) return true;
          if (assignmentCourseId && enrolledCourseIds.has(assignmentCourseId)) return true;

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
          const id = String(item?.id || item?._id || item?.assignmentId || item?.assignment_id || "");
          if (!id) continue;
          const existing = mergedById.get(id) || {};
          mergedById.set(id, {
            ...existing,
            ...item,
            id,
            courseId: existing.courseId || getAssignmentCourseId(item),
            courseTitle:
              existing.courseTitle ||
              item?.courseTitle ||
              item?.sessionTitle ||
              item?.sessionName ||
              item?.course?.title,
            educatorName:
              existing.educatorName || item?.educatorName || item?.mentorName || item?.educator?.name,
            dueDate: item?.dueDate || item?.deadline || existing.dueDate,
          });
        }

        const mergedAssignments = Array.from(mergedById.values());
        setAssignments(mergedAssignments.map(mapAssignment));
      } catch (fetchError: any) {
        console.error("Student assignments fetch failed", fetchError);
        setAssignments([]);
        setError(fetchError?.message || "Failed to load assignments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return assignments.filter((assignment) => {
      if (assignment.type !== activeTab) return false;
      if (!query) return true;
      return (
        assignment.title.toLowerCase().includes(query) ||
        assignment.sessionName.toLowerCase().includes(query) ||
        assignment.mentorName.toLowerCase().includes(query)
      );
    });
  }, [activeTab, assignments, searchTerm]);

  const pendingCount = assignments.filter((assignment) => assignment.type === "pending").length;
  const completedCount = assignments.filter((assignment) => assignment.type === "completed").length;

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans">
      
      {/* --- FULL WIDTH HEADER --- */}
      <div className="sticky top-0 z-20 bg-white px-4 md:px-10 pt-6 md:pt-8 border-b border-gray-200 md:static md:z-auto">
        <h1 className="text-[22px] font-semibold text-gray-900 mb-3">Assignments</h1>
        
        {/* Search Bar */}
        <div className="mb-4 md:mb-6 max-w-[360px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by assignment, session or mentor"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8">
          {(["pending", "completed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const count = tab === "pending" ? pendingCount : completedCount;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[2px] capitalize ${
                  isActive
                    ? "border-[#042BFD] text-gray-900 font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
                }`}
              >
                {tab}
                <span 
                  className={`flex items-center justify-center w-[18px] h-[18px] rounded-full text-[10px] font-medium ${
                    isActive 
                      ? "bg-[#042BFD] text-white" 
                      : "text-gray-400"
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
      <div className="px-4 md:px-10 max-w-[1600px] mx-auto mt-2">
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <div className="h-8 w-8 border-4 border-[#042BFD] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium text-sm">Loading assignments...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[40vh] bg-white rounded-xl border border-gray-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-400">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Unable to load assignments</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-md">{error}</p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[40vh] bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 font-medium">No {activeTab} assignments found.</p>
          </div>
        ) : (
          /* Grid of Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-20 md:mb-20">
            {filteredAssignments.map((item) => {
              const styles = getColorStyles(item.colorScheme);

              return (
                <div
                  key={item.id}
                  className={`relative rounded-[20px] p-[1px] bg-gradient-to-br ${styles.wrapperBorder} flex flex-col min-h-[280px]`}
                >
                  <div className="relative flex-1 flex flex-col bg-white rounded-[18px] p-6 overflow-hidden h-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50">
                    
                    <div className={`absolute inset-0 bg-gradient-to-b ${styles.bgGradient} pointer-events-none z-0 opacity-60`}></div>
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <img 
                        src={styles.image}
                        alt="Icon" 
                        className="w-[54px] h-[54px] object-contain opacity-90" 
                      />
                      <span className={`${styles.badgeBg} ${styles.badgeText} text-[11px] font-medium px-3.5 py-1.5 rounded-full tracking-wide uppercase`}>
                        {item.badgeLabel}: {item.date}
                      </span>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col">
                      <Link href={`/s/assignments/${item.id}`} className="hover:underline">
                        <h3 className="text-[17px] font-bold text-gray-900 mb-5 leading-snug pr-2 line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[12px] p-3 mb-5 mt-auto border border-gray-100/80">
                        <div className="flex items-start gap-2.5 pr-2">
                          <LinkIcon size={16} className="text-gray-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                          <span className="text-[14px] text-gray-800 leading-snug line-clamp-1">
                            {item.sessionName}
                          </span>
                        </div>
                        
                        <div className="relative group shrink-0">
                          <img 
                            src={item.mentorImage} 
                            alt={item.mentorName} 
                            className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all" 
                          />
                          
                          <div className="absolute top-[calc(100%+12px)] right-[-6px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-max">
                            <div className="bg-[#262626] text-white text-[14px] font-medium px-4 py-2 rounded-[8px] shadow-xl relative">
                              {item.mentorName}
                              <div className="absolute -top-1.5 right-[16px] w-3 h-3 bg-[#262626] rotate-45 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link href={`/s/assignments/${item.id}`} className="border border-[#042BFD] text-[#042BFD] bg-white rounded-[10px] px-6 py-2 text-[14px] font-medium hover:bg-blue-50 transition-colors">
                          Open Workspace
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
