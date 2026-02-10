"use client";

import React from "react";
import { Activity, ArrowRight } from "lucide-react";
import { STATS_DATA } from  "../constants" ;

 

const StatsGrid: React.FC = () => {
  return (
    <div className=" mx-4 
  grid grid-cols-2 gap-4
  md:flex md:mx-10 md:w-[999px] md:h-[138px]
  bg-white">
      {STATS_DATA.map((stat, index) => {
        const isFirst = index === 0;
        
        return (
          <div
            key={stat.label}
            className={`
              relative rounded-[20px] p-5 flex flex-col justify-between min-h-[120px] md:flex-1 transition-all
            ${isFirst 
                ? "bg-gradient-to-b from-[#003fc7] via-[#003fc7] to-[#010c25] text-white shadow-lg shadow-blue-200" 
                : "bg-white border border-gray-100 shadow-sm"
              }
            `}
          >
            {/* Icon Circle */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${isFirst ? "bg-white" : "bg-[#003fc7]"}
            `}>
              <Activity size={16} className={isFirst ? "text-[#003fc7]" : "text-white"} />
            </div>

            {/* Label and Value */}
            <div className="mt-2">
              <p className={`text-[11px] font-medium leading-tight mb-1 ${isFirst ? "text-blue-100" : "text-gray-400"}`}>
                {stat.label}
              </p>
              <p className={`text-[32px] font-bold leading-none ${isFirst ? "text-white" : "text-[#003fc7]"}`}>
                {stat.value}
              </p>
            </div>

            {/* View All Link */}
            <button className="absolute bottom-5 right-5 flex items-center gap-1 group">
              <span className={`text-[10px] font-medium ${isFirst ? "text-blue-100" : "text-gray-500"}`}>
                View all
              </span>
              <ArrowRight size={10} className={isFirst ? "text-blue-100" : "text-gray-500"} />
            </button>

            {/* Pink spacing indicator from design (Optional visual helper) */}
            {index !== STATS_DATA.length - 1 && (
              <div className="absolute -right-[9px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-pink-400 opacity-0 group-hover:opacity-100" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;