"use client";

import React from "react";
import { ArrowRight } from "lucide-react"; // Assuming you have lucide-react, or replace with SVG below
import { STATS_DATA } from "../constants";

const PulseIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    width="20"
    height="20"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const StatsGrid: React.FC = () => {
  return (<>
    <div className="p-4" >
      <h2 className="text-[#0036D9] font-bold  text-2xl " >Welcome Yaswanth!</h2>
      <p className="text-gray-700  text-lg " >      Here’s a list of your Assignments for this month
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {STATS_DATA.map((stat, index) => {
        const isFirst = index === 0;

        return (
          <div
            key={stat.label}
            className={`
              relative flex flex-col justify-between rounded-2xl p-5 h-full min-h-[160px] shadow-sm transition-all
              ${isFirst 
                ? "bg-gradient-to-b from-[#0036D9] via-[#0036D9]  to-[#011654] text-white border border-[#0036D9]" 
                : "bg-white text-gray-900 border border-gray-200"
              }
            `}
          >
            {/* Top Icon */}
            <div className="mb-4">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isFirst 
                    ? "bg-white text-[#0036D9]" 
                    : "bg-[#0036D9] text-white"
                  }
                `}
              >
                <PulseIcon className="w-5 h-5" />
              </div>
            </div>

            {/* Content Group */}
            <div>
              <p
                className={`
                  text-xs sm:text-sm font-normal mb-1
                  ${isFirst ? "text-white/90" : "text-gray-500"}
                `}
              >
                {stat.label}
              </p>

              <div className="flex items-end justify-between w-full">
                <span
                  className={`
                    text-3xl sm:text-4xl font-bold tracking-tight
                    ${isFirst ? "text-white" : "text-[#0036D9]"}
                  `}
                >
                  {stat.value}
                </span>

                <button
                  className={`
                    flex items-center gap-1 text-[10px] sm:text-xs font-medium transition-opacity hover:opacity-80 mb-1.5
                    ${isFirst ? "text-white" : "text-gray-600"}
                  `}
                >
                  View all
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default StatsGrid;