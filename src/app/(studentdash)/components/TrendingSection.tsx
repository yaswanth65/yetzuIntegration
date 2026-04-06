"use client";

import React, { useState } from "react";
import { TRENDING_SKILLS } from "../constants";
import { ChevronRight, ArrowRight , Clock  } from "lucide-react";
import { useRouter } from "next/navigation";

const TrendingSection: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const filters = ["ALL", "Webinar", "Cohort", "Mentorship"];
  return (
  
    <div className="relative group mx-2 ">
        <div className="flex flex-col my-6 md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-black font-inter">Sessions</h2>
        
        {/* Navigation Filters */}
        <div className="flex items-center bg-white border border-gray-100 p-1 rounded-xl shadow-sm w-fit">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-[#003fc7] text-white shadow-md"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {/* Mobile: Vertical Stack | Desktop: Horizontal Scroll */}
      <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 pb-2 no-scrollbar snap-x">
        {TRENDING_SKILLS.map((item) => (
          <div
            key={item.id}
            // Mobile: Full width | Desktop: Fixed width (Carousel behavior)
            className="w-full md:w-[377px] md:min-w-[377px] md:shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden snap-center hover:shadow-none transition-shadow duration-300"
          >
            <div className="bg-gray-200 h-40 w-full relative"></div>

            <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-inter font-medium text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-inter text-gray-500 leading-snug w-4/5">
                    {item.description}
                  </p>
                </div>
                <button className="bg-[#042BFD] font-inter text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0">
                  Join In
                </button>
              </div>

              <div className="flex items-center font-inter text-[10px] sm:text-xs font-light text-gray-500 mt-auto ">
                <Clock size={12} className="mr-1.5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600 whitespace-nowrap">{item.date}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="truncate">{item.startTime} - {item.endTime}</span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center -space-x-2">
                  {item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Participant"
                      className="w-6 h-6 rounded-full border border-white"
                    />
                  ))}
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-white flex items-center justify-center text-[10px] font-medium text-blue-800 z-10">
                    +4
                  </div>
                </div>

                <button onClick={() => router.push(`/s/assignments/${item.slug}`)} className="flex font-inter items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">
                  View More <ChevronRight size={12} className="mt-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/80 text-white cursor-pointer hover:bg-gray-900 shadow-none">
        <ArrowRight size={16} />
      </div>
    </div>
  );
};

export default TrendingSection;

 