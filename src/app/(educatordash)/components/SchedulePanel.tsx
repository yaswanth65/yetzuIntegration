// "use client";

// import React from "react";
// import { SCHEDULE_DAYS, SLOTS } from "../constants";
// import { Calendar, ChevronDown } from "lucide-react";

// const SchedulePanel: React.FC = () => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full lg:w-[350px] flex-shrink-0 flex flex-col">
//       {/* Header */}
//       <div className="px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <Calendar size={18} className="text-gray-400" />
//           <h3 className="text-base font-semibold text-gray-900">Slots</h3>
//         </div>
//         <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800">
//           View All <ChevronDown size={14} className="-rotate-90" />
//         </button>
//       </div>

//       {/* Calendar Strip */}
//       <div className="px-2 sm:px-3 py-3 border-b border-gray-100">
//         <div className="flex justify-between items-center gap-1">
//           {SCHEDULE_DAYS.map((day, index) => (
//             <div
//               key={index}
//               className={`flex flex-col items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg cursor-pointer transition-colors ${
//                 day.active
//                   ? "bg-black text-white"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               <span className="text-[8px] sm:text-[10px] font-semibold uppercase">
//                 {day.day}
//               </span>
//               <span className="text-[10px] sm:text-xs font-semibold">
//                 {day.date}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Slots List */}
//       <div className="flex-1 flex flex-col">
//         {SLOTS.map((slot, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
//           >
//             <div className="min-w-0 flex-1">
//               <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
//                 {slot.name}
//               </h4>
//               <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
//                 {slot.type}
//               </p>
//             </div>
//             <button className="bg-[#042BFD] hover:bg-blue-700 text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors shadow-none ml-2 flex-shrink-0">
//               {slot.time}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SchedulePanel;
"use client";

import React, { useState, useEffect } from "react";
import { SCHEDULE_DAYS } from "../constants"; // Removed SLOTS as it's now dynamic
import { Calendar, ChevronDown, Loader2 } from "lucide-react";
import { EducatorAPI } from "@/lib/api";

const SchedulePanel: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const res = await EducatorAPI.getOverview();
        
        const sessionList = res?.data?.session?.list || [];
        
        // Map the API data to fit the UI structure
        const formattedSessions = sessionList.map((item: any, index: number) => {
          // Attempt to format date/time if provided as ISO string, fallback to static text
          let formattedTime = item.time || "TBD";
          if (item.startTime || item.date || item.createdAt) {
            const dateObj = new Date(item.startTime || item.date || item.createdAt);
            if (!isNaN(dateObj.getTime())) {
              formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
          }

          return {
            id: item.id || index,
            name: item.title || item.name || "Untitled Session",
            type: item.type || item.sessionType || "Webinar",
            time: formattedTime
          };
        });

        setSessions(formattedSessions);
      } catch (error) {
        console.error("Failed to fetch sessions", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full lg:w-[350px] flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <h3 className="text-base font-semibold text-gray-900">Slots</h3>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800">
          View All <ChevronDown size={14} className="-rotate-90" />
        </button>
      </div>

      {/* Calendar Strip */}
      <div className="px-2 sm:px-3 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center gap-1">
          {SCHEDULE_DAYS.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg cursor-pointer transition-colors ${
                day.active
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="text-[8px] sm:text-[10px] font-semibold uppercase">
                {day.day}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold">
                {day.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Slots List */}
      <div className="flex-1 flex flex-col min-h-[200px]">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-8">
            <Loader2 className="w-6 h-6 animate-spin mb-2 text-blue-600" />
            <span className="text-xs font-medium">Loading slots...</span>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 py-8">
            <span className="text-xs font-medium">No sessions scheduled.</span>
          </div>
        ) : (
          sessions.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                  {slot.name}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                  {slot.type}
                </p>
              </div>
              <button className="bg-[#042BFD] hover:bg-blue-700 text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors shadow-none ml-2 flex-shrink-0">
                {slot.time}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchedulePanel;