"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function DiscoverCoursesPromo() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-[#F8F9FA] rounded-[16px] p-4 overflow-hidden border border-gray-100/50">
      
      {/* Custom Top Gradient - Fades out perfectly by the top label */}
      <div 
        className="absolute top-0 left-0 w-full h-[50px] pointer-events-none opacity-60 z-0"
        style={{ 
          background: 'linear-gradient(to right, #B2BBFF, #EFCBAA)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
        }}
      ></div>

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-2.5">
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight tracking-tight">
          Discover More Courses
        </h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-800 transition-colors shrink-0 ml-1.5 -mt-0.5"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Body Text */}
      <p className="relative z-10 text-[13px] text-gray-600 leading-[1.45] mb-4 pr-1">
        Webinars, cohorts, and mentorships are waiting for you. Expand your learning journey with expert-led sessions.
      </p>

      {/* Button */}
      <button className="relative z-10 w-full bg-[#EAEFFF] hover:bg-[#E1E8FF] text-[#042BFD] text-[13px] font-bold py-2.5 rounded-[10px] transition-colors tracking-wide">
        Explore Courses
      </button>
      
    </div>
  );
}