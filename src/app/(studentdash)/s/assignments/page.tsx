"use client";

import React, { useState, useEffect } from "react";
import { Search, Link as LinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";

// Mock data to match the exact screenshots provided
const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    title: "Advanced Insights into Cardiac Arrhythmias",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
    mentorName: "Dr. Sophia Tyler",
    status: "OVERDUE",
    date: "26 FEB, 2026",
    type: "pending",
    colorScheme: "red",
  },
  {
    id: 2,
    title: "Breaking Down the Latest Trends in Machine Learning",
    sessionName: "Cohort: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    mentorName: "John Doe",
    status: "DUE",
    date: "1 MAR, 2026",
    type: "pending",
    colorScheme: "orange",
  },
  {
    id: 3,
    title: "Understanding Blockchain's Impact on Finance",
    sessionName: "1:1 Mentorship: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
    mentorName: "Jane Smith",
    status: "DUE",
    date: "13 APR, 2026",
    type: "pending",
    colorScheme: "gray",
  },
  {
    id: 4,
    title: "Sustainable Energy Solutions for Tomorrow",
    sessionName: "1:1 Mentorship: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
    mentorName: "Dr. Sophia Tyler",
    status: "DUE",
    date: "10 JULY, 2026",
    type: "pending",
    colorScheme: "gray",
  },
  {
    id: 5,
    title: "Advanced Insights into Cardiac Arrhythmias",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
    mentorName: "Dr. Sophia Tyler",
    status: "SUBMITTED ON",
    date: "09 FEB, 2026",
    type: "completed",
    colorScheme: "green",
  },
  {
    id: 6,
    title: "Understanding Blockchain's Impact on Finance",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
    mentorName: "Jane Smith",
    status: "SUBMITTED ON",
    date: "02 FEB, 2026",
    type: "completed",
    colorScheme: "green",
  },
];

const getColorStyles = (colorScheme: string) => {
  switch (colorScheme) {
    case "red":
      return {
        wrapperBorder: "from-[#FECDD3] via-transparent to-[#FECDD3]",
        bgGradient: "from-[#FFF0F2] via-white via-40% to-white",
        badgeBg: "bg-[#FFF0F2]",
        badgeText: "text-[#E11D48]",
        image: "/images/file-format-red1.svg"
      };
    case "orange":
      return {
        wrapperBorder: "from-[#FED7AA] via-transparent to-[#FED7AA]",
        bgGradient: "from-[#FFF7ED] via-white via-40% to-white",
        badgeBg: "bg-[#FFF7ED]",
        badgeText: "text-[#EA580C]",
        image: "/images/file-format-orange.svg"
      };
    case "green":
      return {
        wrapperBorder: "from-[#A7F3D0] via-transparent to-[#A7F3D0]",
        bgGradient: "from-[#ECFDF5] via-white via-40% to-white",
        badgeBg: "bg-[#D1FAE5]",
        badgeText: "text-[#065F46]",
        image: "/images/file-format-green.svg"
      };
    case "gray":
    default:
      return {
        wrapperBorder: "from-[#E2E8F0] via-transparent to-[#E2E8F0]",
        bgGradient: "from-[#F8FAFC] via-white via-40% to-white",
        badgeBg: "bg-[#F1F5F9]",
        badgeText: "text-[#475569]",
        image: "/images/file-format-gray.svg"
      };
  }
};

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setIsLoading(true);
        // const response = await StudentAPI.getAssignments();

        // Check if response has valid data array (adjust 'response.data' based on actual API payload)
        const apiData = response?.data || response?.assignments || response;

        if (Array.isArray(apiData) && apiData.length > 0) {
          // Map backend data to match UI structure
          const formattedData = apiData.map((item: any, index: number) => ({
            id: item._id || item.id || index,
            title: item.title || "Untitled Assignment",
            sessionName: item.courseName || item.sessionName || "General Session",
            mentorImage: item.mentorImage || `https://ui-avatars.com/api/?name=${item.mentorName || 'Mentor'}&background=random`,
            mentorName: item.mentorName || item.educatorName || "Educator",
            status: item.status === "completed" ? "SUBMITTED ON" : "DUE",
            date: item.dueDate || item.createdAt || "TBD", // Format this with date-fns/moment if needed
            type: item.status === "completed" ? "completed" : "pending",
            colorScheme: item.status === "completed" ? "green" : "orange", // Modify logic based on overdue/pending
          }));
          setAssignments(formattedData);
        } else {
          // Fallback to mock if array is empty
          console.log("API returned empty array, falling back to mock data");
          setAssignments(MOCK_ASSIGNMENTS);
        }
      } catch (error) {
        console.error("Failed to fetch assignments, falling back to mock data", error);
        setAssignments(MOCK_ASSIGNMENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Filter assignments based on the active tab
  const filteredAssignments = assignments.filter(
    (assignment) => assignment.type === activeTab
  );

  const pendingCount = assignments.filter(a => a.type === "pending").length;
  const completedCount = assignments.filter(a => a.type === "completed").length;

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans">

      {/* --- FULL WIDTH HEADER --- */}
      <div className="sticky top-0 z-20 bg-white px-4 md:px-10 pt-6 md:pt-8 border-b border-gray-200 md:static md:z-auto">
        <h1 className="text-[22px]  font-semibold text-gray-900 mb-3">Assignments</h1>
        {/* Search Bar */}
        <div className=" mb-4 md:mb-6 max-w-[360px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search by assignment, session or mentor"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[2px] ${activeTab === "pending"
              ? "border-[#042BFD] text-gray-900 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
              }`}
          >
            Pending
            {activeTab === "pending" ? (
              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#042BFD] text-white text-[10px] font-medium">
                {pendingCount}
              </span>
            ) : (
              <span className="text-gray-400 text-xs font-medium">{pendingCount}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[2px] ${activeTab === "completed"
              ? "border-[#042BFD] text-gray-900 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
              }`}
          >
            Completed
            {activeTab === "completed" ? (
              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#042BFD] text-white text-[10px] font-medium">
                {completedCount}
              </span>
            ) : (
              <span className="text-gray-400 text-xs font-medium">{completedCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="p-4 md:px-10 max-w-[1600px] mx-auto mt-2">

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <Loader2 className="h-8 w-8 text-[#042BFD] animate-spin mb-4" />
            <p className="text-gray-500 font-medium text-sm">Loading assignments...</p>
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

                    {/* Smooth Background Gradient inside card */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${styles.bgGradient} pointer-events-none z-0 opacity-60`}></div>

                    {/* Top Row: Icon & Badge */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <img
                        src={styles.image}
                        alt="Icon"
                        className="w-[54px] h-[54px] object-contain opacity-90"
                      />
                      <span className={`${styles.badgeBg} ${styles.badgeText} text-[11px] font-medium px-3.5 py-1.5 rounded-full tracking-wide uppercase`}>
                        {item.status}: {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <Link href={`/s/assignments/${item.id}`} className="text-[17px] hover:underline font-bold text-gray-900 mb-5 leading-snug pr-2 line-clamp-2">
                        {item.title}
                      </Link>

                      {/* Gray Session Box */}
                      <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[12px] p-3 mb-5 mt-auto border border-gray-100/80">
                        <div className="flex items-start gap-2.5 pr-2">
                          <LinkIcon size={16} className="text-gray-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                          <span className="text-[14px] text-gray-800 leading-snug line-clamp-1">
                            {item.sessionName}
                          </span>
                        </div>

                        {/* Avatar with Custom Tooltip */}
                        <div className="relative group shrink-0">
                          <img
                            src={item.mentorImage}
                            alt={item.mentorName}
                            className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all"
                          />

                          {/* Tooltip Content (Below Avatar, Pointing Up) */}
                          <div className="absolute top-[calc(100%+12px)] right-[-6px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-max">
                            <div className="bg-[#262626] text-white text-[14px] font-medium px-4 py-2 rounded-[8px] shadow-xl relative">
                              {item.mentorName}
                              {/* Up pointing triangle pointer */}
                              <div className="absolute -top-1.5 right-[16px] w-3 h-3 bg-[#262626] rotate-45 rounded-sm"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Button (Right Aligned) */}
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