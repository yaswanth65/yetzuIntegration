"use client";

import React, { useState } from "react";
import { Search, Link as LinkIcon, Download } from "lucide-react";

// Mock data to match the exact screenshots provided
const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    title: "Advanced Insights into Cardiac Arrhythmias",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
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
    status: "DUE",
    date: "12 APR, 2026",
    type: "pending",
    colorScheme: "gray",
  },
  {
    id: 4,
    title: "Sustainable Energy Solutions for Tomorrow",
    sessionName: "1:1 Mentorship: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Tyler&background=random",
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
        wrapperBorder: "from-[#FBCFE8] via-transparent to-transparent",
        bgGradient: "from-[#FDF2F8] to-transparent",
        badgeBg: "bg-[#FCE7F3]",
        badgeText: "text-[#9D174D]",
        image:"/images/file-format-red.svg"
      };
    case "orange":
      return {
        wrapperBorder: "from-[#FED7AA] via-transparent to-transparent",
        bgGradient: "from-[#FFF7ED] to-transparent",
        badgeBg: "bg-[#FFEDD5]",
        badgeText: "text-[#C2410C]",
        image:"/images/file-format-orange.svg"
      };
    case "green":
      return {
        wrapperBorder: "from-[#A7F3D0] via-transparent to-transparent",
        bgGradient: "from-[#ECFDF5] to-transparent",
        badgeBg: "bg-[#D1FAE5]",
        badgeText: "text-[#065F46]",
        image:"/images/file-format-green.svg"
      };
    case "gray":
    default:
      return {
        wrapperBorder: "from-[#E2E8F0] via-transparent to-transparent",
        bgGradient: "from-[#F8FAFC] to-transparent",
        badgeBg: "bg-[#F1F5F9]",
        badgeText: "text-[#475569]",
        image:"/images/file-format-gray.svg"
      };
  }
};

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  // Filter assignments based on the active tab
  const filteredAssignments = MOCK_ASSIGNMENTS.filter(
    (assignment) => assignment.type === activeTab
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
      {/* --- HEADER --- */}
      <div className="mb-6 bg-white px-3 pt-3 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Assignments</h1>
        
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "pending"
                ? "border-blue-600 text-gray-900 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
            }`}
          >
            Pending
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === "pending" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
            }`}>
              6
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "completed"
                ? "border-blue-600 text-gray-900 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
            }`}
          >
            Completed
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === "completed" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
            }`}>
              2
            </span>
          </button>
        </div>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-[18px] w-[18px] text-gray-400" strokeWidth={2} />
          </div>
          <input
            type="text"
            placeholder="Search by assignment, session or mentor"
            className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* --- GRID OF CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssignments.map((item) => {
          const styles = getColorStyles(item.colorScheme);

          return (
            <div
              key={item.id}
              className={`relative rounded-[20px] p-[1.5px] bg-gradient-to-br ${styles.wrapperBorder} flex flex-col min-h-[280px]`}
            >
              <div className="relative flex-1 flex flex-col bg-white rounded-[18.5px] p-5 overflow-hidden h-full shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100/50">
                
                {/* Background Gradient inside white card */}
                <div className={`absolute top-0 left-0 w-full h-[140px] bg-gradient-to-b ${styles.bgGradient} pointer-events-none z-0`}></div>
                
                {/* Icon Element (Ensuring High Visibility) */}
                <div className="absolute top-5 left-5 z-10">
                  <img 
                    src={`${styles.image}` }
                    alt="Assignment Icon" 
                    className="w-14 h-14 opacity-80 mix-blend-multiply" 
                  />
                </div>

                {/* Status Badge */}
                <div className="flex justify-end mb-12 relative z-20">
                  <span className={`${styles.badgeBg} ${styles.badgeText} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                    {item.status}: {item.date}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-20 flex-1 flex flex-col">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4 leading-snug">
                    {item.title}
                  </h3>

                  {/* Gray Info Box */}
                  <div className="flex items-center justify-between bg-[#F8FAFC] rounded-xl p-3 mb-6 border border-gray-50">
                    <div className="flex items-start gap-2.5 pr-2">
                      <LinkIcon size={14} className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-[12px] text-gray-600 line-clamp-2 leading-relaxed">
                        {item.sessionName}
                      </span>
                    </div>
                    <img 
                      src={item.mentorImage} 
                      alt="Mentor" 
                      className="w-8 h-8 rounded-full border-2 border-white shrink-0 object-cover" 
                    />
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-auto flex gap-3">
                    <button className="flex-1 border border-[#2563EB] text-[#2563EB] bg-white rounded-xl py-2.5 text-sm font-medium hover:bg-blue-50 transition-colors">
                      {item.type === "pending" ? "Submit Assignment" : "Download Answer"}
                    </button>
                    <button className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center shrink-0">
                      <Download size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}