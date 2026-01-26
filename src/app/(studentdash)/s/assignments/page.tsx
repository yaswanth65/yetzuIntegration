"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, ChevronRight } from "lucide-react";
import { ASSIGNMENTS_DATA } from "../../constants"; // Ensure this path is correct

export default function AssignmentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ALL");

  // Mock images for participants
  const mockImages = [
    "https://picsum.photos/40/40?random=1",
    "https://picsum.photos/40/40?random=2",
    "https://picsum.photos/40/40?random=3",
    "https://picsum.photos/40/40?random=4",
  ];

  const TABS = ["ALL", "Webinar", "Cohort", "Mentorship"];

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] p-6 md:p-8 font-['Inter']">
      
      {/* --- HEADER SECTION WITH TABS --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-6">
        

        {/* Tab Filters */}
        <div className="bg-white p-1 rounded-lg border border-gray-200 flex gap-1 shadow-sm overflow-x-auto max-w-full">
          {TABS.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-200 whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-[#042BFD] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- CAROUSEL CONTAINER --- */}
      <div className="relative group">
        
        {/* Scrollable Container */}
        <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 pb-4 no-scrollbar snap-x">
          {ASSIGNMENTS_DATA.map((item) => (
            <div
              key={item.id}
              // Fixed width for desktop carousel, full width mobile
              className="w-full md:w-[400px] md:min-w-[400px] md:shrink-0 bg-white border border-gray-200 rounded-[20px] overflow-hidden snap-center hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Image Placeholder */}
              <div className="bg-gray-200 h-48 w-full relative">
                 {/* Replace with <Image src={item.webinar.heroImage} /> */}
              </div>

              <div className="p-5 flex flex-col gap-4 flex-grow">
                {/* Title & Join Button Row */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {item.webinar.description}
                    </p>
                  </div>
                  <button className="bg-[#042BFD] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-blue-500/20 hover:bg-[#0325D7] transition-colors whitespace-nowrap shrink-0 h-fit">
                    Join In
                  </button>
                </div>

                {/* Date & Time */}
                <div className="flex items-center text-xs font-medium text-gray-500 mt-auto">
                  <Clock size={14} className="mr-2 text-gray-400" />
                  <span>{item.webinar.date}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="truncate">{item.webinar.time}</span>
                </div>

                {/* Footer: Avatars & View More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                  <div className="flex items-center -space-x-2">
                    {mockImages.map((img, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={idx}
                        src={img}
                        alt="Participant"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-xs font-bold text-[#042BFD] z-10">
                      +4
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push(`/s/assignments/${item.slug}`)} 
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#021165] transition-colors"
                  >
                    View More <ChevronRight size={14} className="mt-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}