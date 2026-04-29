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
    default:
      return {
        wrapperBorder: "from-[#FED7AA] via-transparent to-[#FED7AA]",
        bgGradient: "from-[#FFF7ED] via-white via-40% to-white",
        badgeBg: "bg-[#FFF7ED]",
        badgeText: "text-[#EA580C]",
        image: "/images/file-format-orange.svg",
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

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response: any = await StudentAPI.getAssignments();
        const apiData = asArray(response?.data || response);
        setAssignments(apiData.map(mapAssignment));
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
    <div className="bg-[#F8F9FA] min-h-screen font-sans flex flex-col">
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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search assignments or mentors..."
              className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 border-b border-gray-200">
          {(["pending", "completed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const count = tab === "pending" ? pendingCount : completedCount;

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
                    isActive ? "bg-[#042BFD] text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-[280px] bg-white rounded-[32px] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-gray-100 shadow-sm text-center px-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-400">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Unable to load assignments</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-md">{error}</p>
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
                    <div className={`absolute inset-0 bg-gradient-to-b ${styles.bgGradient} pointer-events-none z-0 opacity-40 group-hover:opacity-60 transition-opacity`} />

                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-50 group-hover:shadow-md transition-shadow">
                        <img src={styles.image} alt="Icon" className="w-8 h-8 object-contain" />
                      </div>
                      <span className={`${styles.badgeBg} ${styles.badgeText} text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm border border-black/5`}>
                        {item.badgeLabel}: {item.date}
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
                          <span className="text-sm text-gray-600 font-medium truncate">{item.sessionName}</span>
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
                              <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-[#1a1a1a] rotate-45" />
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
