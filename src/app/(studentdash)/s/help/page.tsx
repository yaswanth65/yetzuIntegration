"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Ticket, Mail } from "lucide-react";

// --- MOCK DATA ---
const SUPPORT_REQUESTS = [
  {
    id: "MS-8821",
    subject: "Climate Change Impact in Sub-Saharan Africa",
    category: "Technical Support",
    status: "In Progress",
    createdOn: "Oct 28, 2025",
  },
  {
    id: "MS-8821",
    subject: "Climate Change Impact in Sub-Saharan Africa",
    category: "Financial",
    status: "Closed",
    createdOn: "Oct 28, 2025",
  },
  {
    id: "MS-8821",
    subject: "Climate Change Impact in Sub-Saharan Africa",
    category: "Account",
    status: "Open",
    createdOn: "Oct 28, 2025",
  },
];

// --- HELPERS ---
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return (
        <span className="inline-flex items-center bg-[#FFFBEB] text-[#D97706] px-3 py-1 rounded-full text-[12px] font-medium">
          In Progress
        </span>
      );
    case "closed":
      return (
        <span className="inline-flex items-center bg-[#ECFDF5] text-[#059669] px-3 py-1 rounded-full text-[12px] font-medium">
          Closed
        </span>
      );
    case "open":
      return (
        <span className="inline-flex items-center bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full text-[12px] font-medium">
          Open
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[12px] font-medium">
          {status}
        </span>
      );
  }
};

export default function HelpAndSupportPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
      
      {/* --- FULL WIDTH WHITE HEADER --- */}
      <div className="bg-white px-6 md:px-10 py-4 border-b border-gray-200 shrink-0">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-[26px] font-bold text-gray-900 mb-1">Help & Support</h1>
          {/* Subtitle explicitly matches the design text provided */}
          <p className="text-[14px] text-gray-500">Complete record of all your sessions</p>
        </div>
      </div>

      {/* --- MAIN GRAY CONTENT AREA --- */}
      <div className="flex-1 p-4 md:p-10 max-w-[1600px] mx-auto w-full">
        
        {/* --- TOP ACTION CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Browse Help Articles */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4 shrink-0">
              <BookOpen size={20} className="text-[#6366F1]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Browse Help Articles</h3>
            <p className="text-[13px] text-gray-500 mb-6 leading-relaxed flex-1">
              Find answers in our extensive documentation and video guides.
            </p>
            <Link href="/s/help/help-article" className="w-full">
              <button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-[14px] py-2.5 rounded-lg transition-colors">
                View Articles
              </button>
            </Link>
          </div>

          {/* Card 2: Raise a Support Ticket */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4 shrink-0">
              <Ticket size={20} className="text-[#6366F1]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Raise a Support Ticket</h3>
            <p className="text-[13px] text-gray-500 mb-6 leading-relaxed flex-1">
              Open a new request for technical or platform assistance.
            </p>
            <button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-[14px] py-2.5 rounded-lg transition-colors">
              Open Ticket
            </button>
          </div>

          {/* Card 3: Contact Management Office */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4 shrink-0">
              <Mail size={20} className="text-[#6366F1]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Contact Management Office</h3>
            <p className="text-[13px] text-gray-500 mb-6 leading-relaxed flex-1">
              Direct line to the editorial team regarding specific manuscripts.
            </p>
            <button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-[14px] py-2.5 rounded-lg transition-colors">
              Contact Office
            </button>
          </div>

        </div>

        {/* --- RECENT SUPPORT REQUESTS TABLE --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
          
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-[16px] font-bold text-gray-900">Recent Support Requests</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Ticket ID</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Subject</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Category</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Status</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Created On</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SUPPORT_REQUESTS.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 text-[14px] text-gray-600">
                      {request.id}
                    </td>
                    <td className="py-5 px-6 text-[14px] text-gray-600">
                      {request.subject}
                    </td>
                    <td className="py-5 px-6 text-[14px] text-gray-600">
                      {request.category}
                    </td>
                    <td className="py-5 px-6">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="py-5 px-6 text-[14px] text-gray-600">
                      {request.createdOn}
                    </td>
                    <td className="py-5 px-6">
                      <button className="text-[#2563EB] text-[14px] font-semibold hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>

      </div>
    </div>
  );
}