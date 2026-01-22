"use client";

import React from "react";
import { SCHEDULE_DAYS, SLOTS } from "../constants";
import { Calendar, ChevronDown } from "lucide-react";

const SchedulePanel: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full lg:w-[350px] flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <h3 className="text-base font-semibold text-gray-900">Slots</h3>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800">
          View All <ChevronDown size={14} className="-rotate-90" />
        </button>
      </div>

      {/* Calendar Strip */}
      <div className="px-3 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          {SCHEDULE_DAYS.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors ${day.active
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
                }`}
            >
              <span className="text-[10px] font-semibold uppercase">
                {day.day}
              </span>
              <span className="text-xs font-semibold">{day.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slots List */}
      <div className="flex-1 flex flex-col">
        {SLOTS.map((slot, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900">{slot.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{slot.type}</p>
            </div>
            <button className="bg-[#042BFD] hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-2 rounded-md transition-colors shadow-none">
              {slot.time}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePanel;
