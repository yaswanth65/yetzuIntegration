"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ASSIGNMENTS_DATA } from "../../../constants"; // Adjust path
import {
  Calendar,
  Clock,
  MoreVertical,
  Plus,
  Send,
  FileText,
  Download,
  ArrowLeft,
 } from "lucide-react";

export default function AssignmentDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"Webinar" | "Assignment">("Webinar");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  // Find Data
  const pageData = ASSIGNMENTS_DATA.find((item) => item.slug === params.slug);

  if (!pageData) {
    return <div className="p-10 text-center font-inter text-gray-500">Assignment not found</div>;
  }

  // Handle Tab Switching
  const handleTabChange = (tab: "Webinar" | "Assignment") => {
    setActiveTab(tab);
    if (tab === "Webinar") setSelectedAssignmentId(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] p-4 md:p-6 font-['Inter']">
  

      {/* 2. Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1">
        <button
          onClick={() => handleTabChange("Webinar")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "Webinar"
              ? "bg-[#042BFD] text-white shadow-md shadow-blue-200"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Webinar
        </button>
        <button
          onClick={() => handleTabChange("Assignment")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "Assignment"
              ? "bg-[#042BFD] text-white shadow-md shadow-blue-200"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Assignments
        </button>
      </div>

      {/* 3. Content Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "Webinar" && (
          <WebinarView data={pageData} />
        )}

        {activeTab === "Assignment" && !selectedAssignmentId && (
          <AssignmentListView 
            assignments={pageData.assignments || []} 
            onSelect={(id) => setSelectedAssignmentId(id)}
          />
        )}

        {activeTab === "Assignment" && selectedAssignmentId && (
          <AssignmentDetailView 
            assignment={pageData.assignments?.find(a => a.id === selectedAssignmentId)}
            mentor={pageData.mentor}
            onBack={() => setSelectedAssignmentId(null)}
          />
        )}
      </div>
    </div>
  );
}

// --- 1. WEBINAR VIEW (Updated for Mobile Ordering) ---
function WebinarView({ data }: { data: any }) {
  return (
    // CHANGE: Added 'flex flex-col' for mobile stacking control
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
      
      {/* Left Column: Timeline & Hero */}
      {/* CHANGE: Added 'order-2 lg:order-1' -> Bottom on mobile, Left on desktop */}
      {/* <div className="lg:col-span-2 flex flex-col gap-8 order-2 lg:order-1">
        <div className="relative w-full h-48 md:h-80 bg-gray-200 rounded-[20px] overflow-hidden flex items-center justify-center text-gray-400">
           Webinar Hero Image
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[20px] border border-gray-100">
          <div className="relative pl-2">
            <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-blue-100"></div>
            {data.webinar.timeline.map((item: any, index: number) => (
              <div key={index} className="relative flex gap-6 mb-8 last:mb-0 group">
                <div className="relative z-10 w-6 h-6 rounded-full bg-[#042BFD] border-4 border-white shadow-sm flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="text-lg font-semibold text-[#021165] mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 font-medium mb-2">{item.time}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
<div className="lg:col-span-2 flex flex-col gap-8 order-2 lg:order-1 font-inter">
      {/* Webinar Hero Image */}
      <div className="relative w-full h-48 md:h-80 bg-gray-200 rounded-[20px] overflow-hidden flex items-center justify-center text-gray-400">
        Webinar Hero Image
      </div>

      {/* Timeline Card */}
      <div className="bg-white p-6 md:p-8 rounded-[20px] border border-gray-100 shadow-sm">
        <div className="relative">
          {data.webinar.timeline.map((item: any, index: number) => (
            <div key={index} className="relative flex gap-6 group">
              
              {/* Vertical Line Logic */}
              <div className="relative flex flex-col items-center">
                {/* Timeline Dot */}
                <div className="relative z-10 w-[24px] h-[24px] rounded-full bg-[#003fc7] border-4 border-white shadow-sm mt-1 flex-shrink-0" />
                
                {/* Vertical Line: Hidden for the last item */}
                {index !== data.webinar.timeline.length - 1 && (
                  <div className="w-[2px] h-full bg-[#003fc7] opacity-20 -mt-1" />
                )}
              </div>

              {/* Content */}
              <div className={`flex flex-col ${index !== data.webinar.timeline.length - 1 ? "pb-10" : "pb-0"}`}>
                <h4 className="text-lg font-bold text-[#021165] leading-none mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[12px] font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                    {item.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Right Column: Info Card */}
      {/* CHANGE: Added 'order-1 lg:order-2' -> Top on mobile, Right on desktop */}
      <div className="lg:col-span-1 order-1 lg:order-2">
        <div className="bg-white p-6 rounded-[20px] border border-gray-100 sticky top-8">
          <h2 className="text-xl font-bold text-[#021165] mb-1">{data.title}</h2>
          <p className="text-sm text-gray-500 mb-6">{data.subtitle}</p>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-50 rounded-lg text-[#042BFD]">
                 <Calendar size={20} />
               </div>
               <div>
                 <p className="text-xs text-gray-500">Session Date</p>
                 <p className="text-sm font-semibold text-gray-900">{data.webinar.date}</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-50 rounded-lg text-[#042BFD]">
                 <Clock size={20} />
               </div>
               <div>
                 <p className="text-xs text-gray-500">Session Time</p>
                 <p className="text-sm font-semibold text-gray-900">{data.webinar.time}</p>
               </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{data.webinar.description}</p>
          </div>

          <button className="w-full py-3 bg-[#042BFD] hover:bg-[#0325D7] text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-200">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 2. ASSIGNMENT LIST VIEW (Updated for Mobile Scroll) ---
function AssignmentListView({ assignments, onSelect }: { assignments: any[], onSelect: (id: string) => void }) {
  if (!assignments || assignments.length === 0) {
    return <div className="text-center p-10 text-gray-500">No assignments found.</div>;
  }

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-2">
      {/* CHANGE: Added overflow-x-auto for horizontal scrolling on mobile */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[600px]"> 
          {/* min-w-[600px] ensures it doesn't squish on small screens, triggers scroll instead */}
          <tbody className="divide-y divide-gray-50">
            {assignments.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                {/* ID */}
                <td className="py-4 pl-6 text-sm text-gray-500 font-medium w-32 align-middle whitespace-nowrap">
                  {item.id}
                </td>
                
                {/* Title */}
                <td className="py-4 text-sm font-medium text-gray-700 group-hover:text-[#042BFD] align-middle min-w-[200px]">
                  {item.title}
                </td>

                {/* Date */}
                <td className="py-4 text-sm text-gray-500 text-right pr-6 align-middle whitespace-nowrap">
                  {item.uploadOn}
                </td>

                {/* Dots Action */}
                <td className="py-4 pr-6 w-10 text-right align-middle">
                   <MoreVertical size={18} className="text-gray-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- 3. ASSIGNMENT DETAIL VIEW (Already Correctly Stacked via flex-col-reverse) ---
function AssignmentDetailView({ assignment, mentor, onBack }: { assignment: any, mentor: any, onBack: () => void }) {
  if (!assignment) return <div>Data Missing</div>;

  return (
    // 'flex-col-reverse' puts the last element (Right Col/Your Work) on top for mobile
    // 'lg:grid' restores the side-by-side layout for desktop
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
      
      {/* Left Column: Details */}
      <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[20px] border border-gray-100 h-fit">
        
        {/* Back Link */}
        <button onClick={onBack} className=" hidden md:flex items-center gap-1 text-xs text-gray-400 hover:text-[#021165] mb-4 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#021165] mb-2">{assignment.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative">
                 {/* <Image /> */}
              </div>
              <span className="font-medium text-gray-900">{mentor.name}</span>
              <span>•</span>
              <span>{mentor.date}</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Assignment</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{assignment.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Study Material</h3>
          <div className="space-y-3">
            {assignment.studyMaterials && assignment.studyMaterials.map((file: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                   <FileText className="text-gray-400 group-hover:text-[#042BFD]" size={20} />
                   <span className="text-sm font-medium text-gray-700">{file.name}</span>
                </div>
                <Download size={18} className="text-gray-400 group-hover:text-[#042BFD]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Submission */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Your Work</h3>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Due: {assignment.dueDate}</span>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#042BFD] text-[#042BFD] rounded-lg font-medium hover:bg-blue-50 transition-colors">
              <Plus size={18} />
              Add or Create
            </button>
            <button className="w-full py-2.5 bg-[#042BFD] text-white rounded-lg font-medium hover:bg-[#0325D7] transition-colors shadow-md shadow-blue-200">
              Hand in
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm">
           <h3 className="text-sm font-semibold text-gray-900 mb-4">Add Private Comment</h3>
           <div className="relative">
             <input 
               type="text" 
               placeholder="Input Value"
               className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
             />
             <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#042BFD]">
               <Send size={16} />
             </button>
           </div>
           <p className="text-[10px] text-gray-400 mt-3 leading-tight">
             Private Comment are only visible to you and your mentor
           </p>
        </div>
      </div>
    </div>
  );
}