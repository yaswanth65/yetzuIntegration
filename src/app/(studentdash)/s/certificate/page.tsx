"use client";

import React from "react";
import { Search, Clock, User, Download, Lock, Award } from "lucide-react";

const BronzeMedal = () => (
<Award color="#fcb51d" />
);

const GreyMedal = () => (
  <Award color="#a1a1a1" />
);

export default function CertificatesPage() {
  const CERTIFICATES_DATA = [
    {
      id: 1,
      title: "Certificate of Completion - Advanced Insights into Cardiac Arrhythmias",
      hours: "1.5",
      mentor: "Dr. Sofiya Tyler",
      status: "unlocked",
    },
    {
      id: 2,
      title: "Certificate of Completion - Mastering Data Visualization Techniques",
      hours: "2",
      mentor: "Mr. Kevin Chen",
      status: "unlocked",
    },
    {
      id: 3,
      title: "Certificate of Completion - Fundamentals of User Experience Design",
      hours: "2.5",
      mentor: "Ms. Laura Martinez",
      status: "locked",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans">
      {/* Header Section */}
      {/* Header Sections for git */}
      <div className="bg-white px-6 md:px-10 py-6 border-b border-gray-100">
        <h1 className="text-[22px] font-bold text-gray-900 mb-5">
          Ceritificates
        </h1>
        
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by session or mentor"
            className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Grid Section */}
      <div className="p-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border   border-gray-100 rounded-2xl p-6 flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-shadow duration-300 min-h-[280px]"
            >
              {/* Medal Icon */}
              <div className="mb-4">
                {cert.status === "unlocked" ? <BronzeMedal /> : <GreyMedal />}
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-semibold text-gray-900 leading-snug mb-5  ">
                {cert.title}
              </h3>

              {/* Details Box */}
              <div className="bg-[#F8F9FB] rounded-xl p-4 flex mb-6 mt-auto">
                <div className="flex-1 flex flex-col items-center justify-center   border-r border-gray-200 gap-2">
                  <Clock size={16} className="text-gray-500" strokeWidth={1.5} />
                  <span className="text-[13px] text-gray-700 font-medium">
                    {cert.hours} learning hours
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <User size={16} className="text-gray-500" strokeWidth={1.5} />
                  <span className="text-[13px] text-gray-700 font-medium text-center px-1">
                    {cert.mentor}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {cert.status === "unlocked" ? (
                <div className="flex justify-end items-center gap-3">
                  <button className="px-5 py-2 rounded-lg border border-[#2563EB] text-[#2563EB] text-sm font-medium hover:bg-blue-50 transition-colors">
                    Add to LinkedIn
                  </button>
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    <Download size={18} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2 text-gray-500 py-1">
                  <Lock size={16} strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">
                    Complete the session to unlock
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}