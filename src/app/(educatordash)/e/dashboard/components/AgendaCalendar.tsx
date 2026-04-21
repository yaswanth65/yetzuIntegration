import React from 'react';
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AgendaCalendar() {
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col min-h-[450px]">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-sm">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-blue-600 leading-tight mb-0.5">Saturday 14 February 2026</h2>
            <p className="text-[11px] text-gray-500 font-medium">Last Updated 2hrs Ago</p>
          </div>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          All Sessions
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 relative overflow-x-auto min-h-[380px]">
        <div className="min-w-[700px] h-full flex flex-col pt-2">
          {/* Header row */}
          <div className="flex text-[11px] text-gray-400 py-3 font-medium px-4">
            <div className="w-8 flex items-center justify-center shrink-0">
              <button className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                 <ChevronLeft className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 flex justify-between ml-4">
                <div className="w-1/4 text-center">8:00 am</div>
                <div className="w-1/4 text-center">9:00 am</div>
                <div className="w-1/4 text-center text-blue-600 font-semibold relative">
                  10:00 am
                </div>
                <div className="w-1/4 text-center">11:00 am</div>
            </div>
            <div className="w-24 text-center">12:00 pm</div>
            <div className="w-8 flex items-center justify-center shrink-0">
              <button className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          {/* Calendar body */}
          <div className="flex-1 relative pb-6 px-4">
            {/* Vertical grid lines */}
            <div className="absolute inset-0 flex ml-12 mr-12 pointer-events-none px-4">
              <div className="w-1/4 border-l border-dashed border-gray-200 h-full text-center relative"><div className="w-px h-full bg-transparent border-r border-dashed border-gray-200 absolute left-1/2 top-0 pointer-events-none opacity-50"></div></div>
              <div className="w-1/4 border-l border-dashed border-gray-200 h-full text-center relative"><div className="w-px h-full bg-transparent border-r border-dashed border-gray-200 absolute left-1/2 top-0 pointer-events-none opacity-50"></div></div>
              <div className="w-1/4 border-l border-dashed border-blue-600 h-full text-center relative"></div>
              <div className="w-1/4 border-l border-dashed border-gray-200 h-full text-center relative"><div className="w-px h-full bg-transparent border-r border-dashed border-gray-200 absolute left-1/2 top-0 pointer-events-none opacity-50"></div></div>
              <div className="border-l border-dashed border-gray-200 h-full"></div>
            </div>
            
            {/* Events Overlay */}
            <div className="absolute inset-0 ml-[64px] mr-[104px] pt-4">
              {/* Event 1 - 9:00am column (approx 25% to 50%) */}
              <div className="absolute top-0 left-[26%] w-[22%] bg-[#FDF4FF] border border-[#E879F9] rounded-xl p-3 shadow-sm z-10">
                <div className="inline-block px-2 py-0.5 bg-[#F0ABFC] text-purple-900 text-[9px] font-bold tracking-wide rounded-full mb-2">
                  1:1 Mentorship
                </div>
                <div className="text-[13px] font-bold text-gray-900 leading-tight mb-1 truncate">Human Autonomy...</div>
                <div className="text-[10px] font-medium text-gray-500">9:00 am - 9:30 am</div>
              </div>

              {/* Event 2 - 9:00am column overlapping */}
              <div className="absolute top-28 left-[26%] w-[22%] bg-[#FDF4FF] border border-[#E879F9] rounded-xl p-3 shadow-sm z-10">
                <div className="inline-block px-2 py-0.5 bg-[#F0ABFC] text-purple-900 text-[9px] font-bold tracking-wide rounded-full mb-2">
                  1:1 Mentorship
                </div>
                <div className="text-[13px] font-bold text-gray-900 leading-tight mb-1 truncate">Human Autonomy...</div>
                <div className="text-[10px] font-medium text-gray-500">9:00 am - 9:30 am</div>
              </div>

              {/* Event 3 - 8:00am to 9:30am bottom area (green) */}
              <div className="absolute top-[220px] left-[5%] w-[22%] bg-[#F0FDF4] border border-[#86EFAC] rounded-xl p-3 shadow-sm z-10">
                <div className="inline-block px-2 py-0.5 bg-[#86EFAC] text-green-900 text-[9px] font-bold tracking-wide rounded-full mb-2">
                  Cohort
                </div>
                <div className="text-[13px] font-bold text-gray-900 leading-tight mb-1 truncate">Human Autonomy...</div>
                <div className="text-[10px] font-medium text-gray-500">10:00 am - 10:45 am</div>
              </div>

              {/* Event 4 - 10:00am column top (blue) */}
              <div className="absolute top-2 left-[51%] w-[22%] bg-[#EFF6FF] border border-[#93C5FD] rounded-xl p-3 shadow-sm z-10">
                <div className="inline-block px-2 py-0.5 bg-[#93C5FD] text-blue-900 text-[9px] font-bold tracking-wide rounded-full mb-2">
                  Webinar
                </div>
                <div className="text-[13px] font-bold text-gray-900 leading-tight mb-1 truncate">Human Autonomy...</div>
                <div className="text-[10px] font-medium text-gray-500">10:00 am - 10:45 am</div>
              </div>

              {/* Event 5 - 11:00am column mid (blue) */}
              <div className="absolute top-[100px] left-[76%] w-[22%] bg-[#EFF6FF] border border-[#93C5FD] rounded-xl p-3 shadow-sm z-10">
                <div className="inline-block px-2 py-0.5 bg-[#93C5FD] text-blue-900 text-[9px] font-bold tracking-wide rounded-full mb-2">
                  Assignment Review
                </div>
                <div className="text-[13px] font-bold text-gray-900 leading-tight mb-1 truncate">Assignment Review</div>
                <div className="text-[10px] font-medium text-gray-500">10:00 am - 10:45 am</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
