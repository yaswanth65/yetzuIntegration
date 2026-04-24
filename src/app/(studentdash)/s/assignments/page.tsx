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
        const response: any = { data: [] }; // Dummy response

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
    <div className="bg-[#F8F9FA] min-h-screen font-sans flex flex-col">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#021165]">Assignments</h1>
            <p className="text-gray-500 text-sm mt-1">Submit and track your academic progress</p>
          </div>
          
          <div className="relative w-full md:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search assignments or mentors..."
              className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-gray-200">
          {(["pending", "completed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            let count = tab === "pending" ? pendingCount : completedCount;

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
                      ? "bg-[#042BFD] text-white" 
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
      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[280px] bg-white rounded-[32px] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <LinkIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No {activeTab} assignments</h3>
            <p className="text-gray-500 text-sm mt-1">Assignments in this category will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAssignments.map((item) => {
              const styles = getColorStyles(item.colorScheme);

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-[32px] p-[1.5px] bg-gradient-to-br ${styles.wrapperBorder} flex flex-col min-h-[300px] transition-all hover:scale-[1.02]`}
                >
                  <div className="relative flex-1 flex flex-col bg-white rounded-[30.5px] p-6 md:p-7 overflow-hidden h-full shadow-sm border border-gray-100/50">
                    <div className={`absolute inset-0 bg-gradient-to-b ${styles.bgGradient} pointer-events-none z-0 opacity-40 group-hover:opacity-60 transition-opacity`}></div>

                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-50 group-hover:shadow-md transition-shadow">
                        <img
                          src={styles.image}
                          alt="Icon"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <span className={`${styles.badgeBg} ${styles.badgeText} text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm border border-black/5`}>
                        {item.status}: {item.date}
                      </span>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col">
                      <Link href={`/s/assignments/${item.id}`} className="hover:text-[#042BFD] transition-colors">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 mt-auto border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <LinkIcon size={16} className="text-gray-400 shrink-0" strokeWidth={2} />
                          <span className="text-sm text-gray-600 font-medium truncate">
                            {item.sessionName}
                          </span>
                        </div>

                        <div className="relative group/mentor shrink-0">
                          <img
                            src={item.mentorImage}
                            alt={item.mentorName}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm cursor-pointer hover:ring-[#042BFD] transition-all"
                          />
                          <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover/mentor:opacity-100 group-hover/mentor:visible transition-all duration-200 z-50">
                            <div className="bg-[#1a1a1a] text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                              {item.mentorName}
                              <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-[#1a1a1a] rotate-45"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link href={`/s/assignments/${item.id}`} className="w-full sm:w-auto">
                          <button className="w-full sm:w-auto bg-[#021165] hover:bg-[#031a9c] text-white rounded-xl px-8 py-3 text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/10">
                            Open Workspace
                          </button>
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