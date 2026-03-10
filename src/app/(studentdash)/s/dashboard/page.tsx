"use client";

import React from "react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  CheckCircle2,
  FileText,
  Award,
} from "lucide-react";
import Image from "next/image";

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

export default function OverviewPage() {
  return (
    <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto flex flex-col gap-6 bg-gray-50 min-h-screen overflow-x-hidden">
      
      <div className="flex flex-col xl:flex-row items-center justify-between bg-white border border-gray-100 shadow-sm rounded-2xl p-6 gap-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-50 via-transparent to-transparent pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start xl:items-center gap-5 z-10 w-full xl:w-auto text-center sm:text-left">
          <div 
            className="relative w-[76px] h-[76px] rounded-full flex items-center justify-center shrink-0"
            style={{ background: "conic-gradient(#003fc7 25%, #f3f4f6 25%)" }}
          >
            <div className="w-[68px] h-[68px] rounded-full overflow-hidden border-[3px] border-white bg-white">
              <img
                src="https://ui-avatars.com/api/?name=Natalia+Sam&background=random"
                alt="Natalia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-xl font-bold text-gray-900 leading-tight">
              Welcome Natalia. You're on track...
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 max-w-lg">
              You're making great progress in your <span className="font-semibold text-gray-700">Data Science</span> journey. Keep the momentum going!
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start xl:justify-end overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 z-10 no-scrollbar">

<div className="flex flex-col items-center gap-1 shrink-0">
  <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100" />
  <span className="text-xs font-medium text-gray-900">Signed up!</span>
</div>

{/* progress bar */}
<div className="w-16 h-[4px] bg-gray-300 rounded-full mb-6 mx-2">
  <div className="w-3/4 h-full rounded-full bg-green-500"></div>
</div>

<div className="flex flex-col items-center gap-1 shrink-0 opacity-50">
  <Calendar className="w-6 h-6 text-gray-400" />
  <span className="text-xs font-medium text-gray-500">Sessions</span>
</div>

{/* dashed connector */}
<div className="w-8 h-[2px] border-t-2 border-dashed border-gray-300 mb-6 mx-2 shrink-0"></div>

<div className="flex flex-col items-center gap-1 shrink-0 opacity-50">
  <FileText className="w-6 h-6 text-gray-400" />
  <span className="text-xs font-medium text-gray-500">Assignments</span>
</div>

<div className="w-8 h-[2px] border-t-2 border-dashed border-gray-300 mb-6 mx-2 shrink-0"></div>

<div className="flex flex-col items-center gap-1 shrink-0 opacity-50">
  <Award className="w-6 h-6 text-gray-400" />
  <span className="text-xs font-medium text-gray-500">Certifications</span>
</div>

</div>
      </div>

      <div className="border border-gray-100 shadow-sm rounded-2xl p-6 bg-white w-full overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            FOCUS FOR THIS WEEK
          </h2>
          <div className="flex gap-2 shrink-0">
            <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="relative rounded-[18px] p-[1.5px] bg-gradient-to-br from-[#C4A9FF] via-[#F3EDFF] to-transparent flex flex-col min-h-[260px]">
            <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#F3EDFF] to-transparent pointer-events-none"></div>
              {/* Card-1 */}
              <div className="absolute top-5 left-5 z-0">
                <img src="/images/video-chat.svg" alt="Video" className="w-16 h-16 opacity-70" />
              </div>
              <div className="flex justify-end mb-8 relative z-10">
                <span className="bg-[#7B42F6] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0">
                  Today
                </span>
              </div>
              <div className="relative z-10 flex-1 flex flex-col h-full justify-end">
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">
                  Webinar: Major Insights on Human Nervous System with Dr. Rao
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> 22 Feb, 2026</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> 3:00 PM</span>
                </div>
                <ViewDetailsButton variant="solid" />
              </div>
            </div>
          </div>
          {/* Card-1 */}
          <div className="relative rounded-[18px] p-[1.5px] bg-gradient-to-br from-[#A3DFB3] via-[#E6F5EE] to-transparent flex flex-col min-h-[260px]">
            <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#E6F5EE] to-transparent pointer-events-none"></div>
              <div className="absolute top-5 left-5 z-0">
                <img src="/images/file-edit.svg" alt="Edit" className="w-16 h-16 opacity-70" />
              </div>
              <div className="flex justify-end mb-8 relative z-10">
                <span className="bg-[#FFF4E5] text-[#F58220] text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0">
                  Due in 2 Days
                </span>
              </div>
              <div className="relative z-10 flex-1 flex flex-col h-full justify-end">
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">
                  Assignment: Obstetric Case- Third Trimester Bleeding
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> Due on: 24 Feb, 2026</span>
                </div>
                <ViewDetailsButton />
              </div>
            </div>
          </div>

          {/* Card 3 - Mentorship (Orange) */}
          <div className="relative rounded-[18px] p-[1.5px] bg-gradient-to-br from-[#FAD0A5] via-[#FFF3E3] to-transparent flex flex-col min-h-[260px]">
            <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#FFF3E3] to-transparent pointer-events-none"></div>
              <div className="absolute top-5 left-5 z-0">
                <img src="/images/User2.svg" alt="User" className="w-16 h-16 opacity-70" />
              </div>
              <div className="h-6 mb-8 relative z-10"></div>
              <div className="relative z-10 flex-1 flex flex-col h-full justify-end">
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">
                  1:1 Mentorship with Dr. Nikhitha Vimal
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> 26 Feb, 2026</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> 7:00 PM</span>
                </div>
                <ViewDetailsButton />
              </div>
            </div>
          </div>

      <div className="relative rounded-[18px] p-[1.5px] bg-gradient-to-br from-[#9FE4EE] via-[#E6F8FA] to-transparent flex flex-col min-h-[260px]">
            <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#E6F8FA] to-transparent pointer-events-none"></div>
              <div className="absolute top-5 left-5 z-0">
                <img src="/images/team.svg" alt="Team" className="w-16 h-16 opacity-70" />
              </div>
              <div className="h-6 mb-8 relative z-10"></div>
              <div className="relative z-10 flex-1 flex flex-col h-full justify-end">
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">
                  Cohort: Drug Dose Calculation Exercise with Dr. Rao
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> 27 Feb, 2026</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> 7:00 PM</span>
                </div>
                <ViewDetailsButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        
        <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upcoming Sessions</h2>
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
          </div>
          <div className="space-y-3">
            <div className="border border-gray-100 bg-purple-50  rounded-xl p-4 flex flex-col justify-end min-h-[100px]">
               <button className="text-sm font-semibold text-purple-600 text-center w-full">View Details</button>
            </div>
            
            <div className="border border-teal-50 rounded-xl p-4 bg-teal-50/20">
              <h3 className="text-[13px] font-bold text-gray-900 mb-2">Cohort: Major Insights on Human Nervous System with Dr. Rao</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1 whitespace-nowrap"><Calendar size={12} /> 21 Feb, 2026</span>
                <span className="flex items-center gap-1 whitespace-nowrap"><Clock size={12} /> 3:00 PM</span>
              </div>
              <button className="text-sm font-semibold bg-teal-50 p-2 rounded  text-teal-600 text-center w-full">View Details</button>
            </div>

            <div className="border border-orange-50 rounded-xl p-4 bg-orange-50/20">
              <h3 className="text-[13px] font-bold text-gray-900 mb-2">Cohort: Major Insights on Human Nervous System with Dr. Rao</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1 whitespace-nowrap"><Calendar size={12} /> 23 Feb, 2026</span>
                <span className="flex items-center gap-1 whitespace-nowrap"><Clock size={12} /> 3:00 PM</span>
              </div>
              <button className="text-sm font-semibold bg-orange-50 p-2 rounded  text-orange-400 text-center w-full">View Details</button>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pending Assignments</h2>
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="p-4 bg-white">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-2 truncate whitespace-normal line-clamp-2">Obstetric Case- Third Trimester Bleeding</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1.5 rounded-md mb-2 w-fit max-w-full">
                    <Paperclip size={12} className="text-gray-400 shrink-0" />
                    <span className="truncate">Drug Dose Calculation Exercise with Dr. Rao</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 whitespace-nowrap">
                    <Calendar size={12} className="shrink-0" /> Due on: 24 Feb, 2026
                  </div>
                </div>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2.5 transition-colors border-t border-gray-100">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden md:col-span-2 xl:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Feedbacks</h2>
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
          </div>
          <div className="space-y-3">
            
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="p-4 bg-white">
                <h3 className="text-[14px] font-bold text-gray-900 mb-2">Dr. Nikhil Nath</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-100 px-2 py-1.5 rounded-md mb-3 max-w-full">
                  <Paperclip size={12} className="text-gray-400 shrink-0" />
                  <span className="truncate">Drug Dose Calculation Exercise with Dr.Nikhil Nath</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 italic">
                  Great effort, but remember to double-check your calculations for pediatric dosages. See attached notes for areas to improve.
                </div>
              </div>
              <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2.5 transition-colors border-t border-gray-100">
                View Details
              </button>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="p-4 bg-white">
                <h3 className="text-[14px] font-bold text-gray-900 mb-2">Dr. Rao</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-100 px-2 py-1.5 rounded-md mb-3 max-w-full">
                  <Paperclip size={12} className="text-gray-400 shrink-0" />
                  <span className="truncate">Deep Dive in Human Nervous System with Dr. Rao</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 italic">
                  Great effort, but remember to double-check your calculations for pediatric dosages. See attached notes for areas to improve.
                </div>
              </div>
              <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2.5 transition-colors border-t border-gray-100">
                View Details
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}