import React, { useState } from "react";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 7)); // default Jan 7th 2026
  const [viewType, setViewType] = useState<"Day" | "Week" | "Month">("Week");

  // Format Helper e.g. "7th Jan, 2026"
  const getOrdinalSuffix = (i: number) => {
    let j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
  };
  
  const formattedDate = `${currentDate.getDate()}${getOrdinalSuffix(currentDate.getDate()).replace(/\d+/g, '')} ${currentDate.toLocaleString('default', { month: 'short' })}, ${currentDate.getFullYear()}`;

  const getStartOfWeek = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const generateDays = () => {
    if (viewType === "Day") {
      return [{ date: currentDate.getDate().toString(), day: currentDate.toLocaleDateString("en-US", { weekday: "long" }) }];
    }
    const startOfWeek = getStartOfWeek(currentDate);
    // Keep 5-day view (Mon-Fri) for Week and Month representations as per initial design
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return {
        date: d.getDate().toString(),
        day: d.toLocaleDateString("en-US", { weekday: "long" })
      };
    });
  };

  const days = generateDays();
  const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"];
  const hourHeight = 140;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setCurrentDate(new Date(value));
    }
  };

  // Only show the hardcoded events if we're in the default view for the mockup week
  const showMockEvents = viewType === "Week" && currentDate.getFullYear() === 2026 && currentDate.getMonth() === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
           <input 
              type="date"
              value={currentDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
           />
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg transition-colors group relative z-0">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{formattedDate}</h2>
            <i className="ri-arrow-down-s-line text-gray-400 text-xl group-hover:text-blue-600 transition-colors"></i>
          </div>
        </div>

        <div className="flex bg-gray-50/80 p-1 rounded-xl border border-gray-100">
          <button 
             onClick={() => setViewType("Day")}
             className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-colors ${viewType === "Day" ? "text-gray-900 bg-white shadow-sm border border-gray-200/50" : "text-gray-500 hover:text-gray-700"}`}>
            Day
          </button>
          <button 
             onClick={() => setViewType("Week")}
             className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-colors ${viewType === "Week" ? "text-gray-900 bg-white shadow-sm border border-gray-200/50" : "text-gray-500 hover:text-gray-700"}`}>
            Week
          </button>
          <button 
             onClick={() => setViewType("Month")}
             className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-colors ${viewType === "Month" ? "text-gray-900 bg-white shadow-sm border border-gray-200/50" : "text-gray-500 hover:text-gray-700"}`}>
            Month
          </button>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="min-w-[800px] overflow-x-auto">
        <div className="grid border-l border-t border-gray-100" style={{ gridTemplateColumns: `80px repeat(${days.length}, minmax(0, 1fr))` }}>
          
          {/* Header Row */}
          <div className="border-b border-r border-gray-100 bg-white h-20"></div>
          {days.map((d, i) => (
            <div key={i} className="border-b border-r border-gray-100 bg-white h-20 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-gray-900">{d.date}</span>
              <span className="text-xs font-medium text-gray-500">{d.day}</span>
            </div>
          ))}

          {/* Grid Background lines */}
          <div className="col-span-full relative" style={{ height: `${times.length * hourHeight}px` }}>
            {/* Horizontal lines */}
            {times.map((time, i) => (
              <div key={time} className="absolute w-full flex" style={{ top: `${i * hourHeight}px`, height: `${hourHeight}px` }}>
                <div className="w-[80px] border-r border-b border-gray-100 flex justify-center pt-3">
                  <span className="text-[11px] font-medium text-gray-400">{time}</span>
                </div>
                {days.map((_, dayIdx) => (
                  <div key={dayIdx} className="flex-1 border-r border-b border-gray-100"></div>
                ))}
              </div>
            ))}

            {/* Event Blocks - Only showing for the mocked screenshot week/design context */}
            {showMockEvents && (
              <>
                <div 
                   className="absolute p-2" 
                   style={{ top: '0px', left: `calc(80px + ((100% - 80px) / 5) * 1)`, width: 'calc((100% - 80px) / 10)', height: `${1 * hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#eef2fa] border-l-4 border-blue-600 rounded drop-shadow-sm p-3 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">WEB-204</span>
                      <span className="text-[10px] text-gray-500 flex flex-wrap gap-1 items-center whitespace-nowrap"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Sarah Chen</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center whitespace-nowrap"><i className="ri-group-line text-[#9ca3af]"></i> 48 Students</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center whitespace-nowrap"><i className="ri-time-line text-[#9ca3af]"></i> 09 AM - 10 AM</span>
                   </div>
                </div>
                <div 
                   className="absolute p-2" 
                   style={{ top: '0px', left: `calc(80px + ((100% - 80px) / 5) * 1 + ((100% - 80px) / 10))`, width: 'calc((100% - 80px) / 10)', height: `${1 * hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#eef2fa] border-l-4 border-blue-600 rounded drop-shadow-sm p-3 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">WEB-209</span>
                      <span className="text-[10px] text-gray-500 flex flex-wrap gap-1 items-center whitespace-nowrap"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Manoj Kumar</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center whitespace-nowrap"><i className="ri-group-line text-[#9ca3af]"></i> 32 Students</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center whitespace-nowrap"><i className="ri-time-line text-[#9ca3af]"></i> 09 AM - 10 AM</span>
                   </div>
                </div>

                <div 
                   className="absolute p-2" 
                   style={{ top: `${2 * hourHeight}px`, left: `calc(80px + ((100% - 80px) / 5) * 1)`, width: 'calc((100% - 80px) / 2.5)', height: `${2 * hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#eef2fa] border-l-4 border-blue-600 rounded drop-shadow-sm p-4 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">WEB-207</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Emil John</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-group-line text-[#9ca3af]"></i> 12 Students</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-time-line text-[#9ca3af]"></i> 11 AM - 01 PM</span>
                   </div>
                </div>

                <div 
                   className="absolute p-2 pb-0" 
                   style={{ top: `${5 * hourHeight}px`, left: `calc(80px + ((100% - 80px) / 5) * 1)`, width: 'calc((100% - 80px) / 2.5)', height: `${hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#eef2fa] border-l-4 border-blue-600 rounded-t drop-shadow-sm p-3 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">WEB-214</span>
                      <span className="text-[10px] text-gray-500 flex flex-wrap gap-1 items-center"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Emil John</span>
                   </div>
                </div>

                <div 
                   className="absolute p-2" 
                   style={{ top: `${1 * hourHeight}px`, left: `calc(80px + ((100% - 80px) / 5) * 3)`, width: 'calc((100% - 80px) / 5)', height: `${3 * hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#fae8fb] border-l-4 border-purple-600 rounded drop-shadow-sm p-4 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">WRK-115</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Nath Kumar</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-group-line text-[#9ca3af]"></i> 22 Students</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-time-line text-[#9ca3af]"></i> 11 AM - 01 PM</span>
                   </div>
                </div>

                <div 
                   className="absolute p-2" 
                   style={{ top: `${1 * hourHeight}px`, left: `calc(80px + ((100% - 80px) / 5) * 4)`, width: 'calc((100% - 80px) / 5)', height: `${3 * hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#fae8fb] border-l-4 border-purple-600 rounded drop-shadow-sm p-4 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">WRK-116</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Man Kumar</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-group-line text-[#9ca3af]"></i> 22 Students</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-time-line text-[#9ca3af]"></i> 11 AM - 01 PM</span>
                   </div>
                </div>

                <div 
                   className="absolute p-2" 
                   style={{ top: `${2 * hourHeight}px`, left: `calc(80px + ((100% - 80px) / 5) * 2)`, width: 'calc((100% - 80px) / 5)', height: `${2 * hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#e8faeb] border-l-4 border-green-600 rounded drop-shadow-sm p-4 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">COH-112</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Nath Kumar</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-group-line text-[#9ca3af]"></i> 22 Students</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-time-line text-[#9ca3af]"></i> 11 AM - 01 PM</span>
                   </div>
                </div>

                <div 
                   className="absolute p-2 pb-0" 
                   style={{ top: `${4 * hourHeight}px`, left: `calc(80px + ((100% - 80px) / 5) * 0)`, width: 'calc((100% - 80px) / 5)', height: `${1.5 * hourHeight}px` }}
                >
                   <div className="h-full w-full bg-[#fae8fb] border-l-4 border-purple-600 rounded-t drop-shadow-sm p-4 flex flex-col gap-1.5 overflow-hidden">
                      <span className="font-bold text-gray-900 text-xs">WRK-125</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-user-line text-[#9ca3af]"></i> Dr. Nath Kumar</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-group-line text-[#9ca3af]"></i> 22 Students</span>
                      <span className="text-[10px] text-gray-500 flex gap-1 items-center"><i className="ri-time-line text-[#9ca3af]"></i> 11 AM - 01 PM</span>
                   </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
