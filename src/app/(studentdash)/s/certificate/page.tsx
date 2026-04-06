"use client";

import React from "react";
import { Search, Clock, User, Download, Lock, Award, ExternalLink } from "lucide-react";

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
      <div className="sticky top-0 z-20 bg-white px-6 md:px-10 pt-8 border-b border-gray-200 md:static md:z-auto">
        <h1 className="text-[22px] font-semibold text-gray-900 mb-5">
          Ceritificates
        </h1>
        
        <div className="relative max-w-md my-4">
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
      <div className=" p-3 md:p-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
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
                  <div className="relative group shrink-0 flex items-center justify-center">
  {/* Your existing button */}
  <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
    <Download size={18} strokeWidth={1.5} />
  </button>
  
  {/* Tooltip Content (Centered Above the Button) */}
  <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-max">
  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#262626] rotate-45 rounded-sm"></div>

    <div className="bg-[#262626] text-white text-[12px] font-medium px-3.5 py-2 rounded-[8px] shadow-xl relative">
      Download Certificate
      {/* Down pointing triangle pointer */}
    </div>
  </div>
</div>
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


          <div className="relative w-full max-w-[540px] min-h-[380px] border-3 bg-linear-to-b  mb-20 md:mb-0  from-[#E5E9FF] via-[#f2f3fa] to-[#F8F9FF] rounded-[24px] p-7 overflow-hidden shadow-sm  border-white  font-sans flex flex-col">
      
      {/* Top Right Graphic Placeholder 
        Swap the 'src' below with your actual image path.
      */}
      <img
        src="/images/empty-state.svg" 
        alt="Learning Graphic"
        className="absolute -top-20 -right-20  w-[280px] h-[280px] object-contain pointer-events-none z-0"
      />

      {/* Content Container */}
      <div className="relative z-10 mt-12 flex flex-col h-full flex-1">
        
        {/* Headline */}
        <h2 className="text-[28px]  font-bold text-[#0F172A] leading-[1.15] mb-6 max-w-[260px] tracking-tight">
          Ready to keep learning?
        </h2>

        {/* Body Text */}
        <p className="text-[16px] text-[#334155] leading-[1.6] max-w-[380px] mb-10 font-medium">
          Loren Ipsum meta description is display here
          Loren Ipsum meta Loren Ipsum meta description
          is display here Loren Ipsum meta
        </p>

        {/* Button aligned to bottom right */}
        <button className="mt-auto self-end flex items-center gap-2 border-[1.5px] border-[#042BFD] text-[#042BFD] bg-transparent hover:bg-blue-50/50 px-6 py-3 rounded-[12px]  text-[15px] font-medium transition-colors">
          Explore More Webinars
          <ExternalLink size={18} strokeWidth={2} />
        </button>

      </div>
    </div>
        </div>
      </div>
    </div>
  );
}