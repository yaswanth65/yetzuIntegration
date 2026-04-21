import React from 'react';
import { ChevronDown, Clock } from 'lucide-react';

export default function CalendarView() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6 mb-8">
      {/* Header */}
      <div className="p-5 flex justify-between items-end md:items-center border-b border-gray-100 flex-col md:flex-row gap-4">
        <div>
          <div className="text-gray-400 text-[13px] mb-1 font-medium">Calendar</div>
          <div className="flex items-center gap-2 cursor-pointer">
            <h2 className="text-[20px] font-bold text-gray-900">7th Jan, 2026</h2>
            <ChevronDown className="w-4 h-4 text-gray-500 mt-1" />
          </div>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-lg p-0.5">
          <button className="px-5 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 rounded-md transition-colors">Day</button>
          <button className="px-5 py-2 text-[13px] font-bold bg-gray-100 text-gray-900 rounded-md shadow-sm">Week</button>
          <button className="px-5 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 rounded-md transition-colors">Month</button>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[950px] flex flex-col pb-4">
          {/* Grid Header labels */}
          <div className="flex border-b border-gray-100">
            <div className="w-[85px] shrink-0 border-r border-gray-100"></div>
            {[
              { date: '7', day: 'Monday' },
              { date: '8', day: 'Tuesday' },
              { date: '9', day: 'Wednesday' },
              { date: '10', day: 'Thursday' },
              { date: '10', day: 'Thursday' }, // Image actually repeats '10 Thursday'
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-center py-4 border-r border-gray-100 last:border-r-0">
                <div className="text-[18px] font-bold text-gray-900">{d.date}</div>
                <div className="text-[13px] text-gray-500 font-medium">{d.day}</div>
              </div>
            ))}
          </div>

          {/* Grid Body */}
          <div className="relative">
            {/* Background horizontal lines and time labels */}
            {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'].map((time, rowIdx) => (
              <div key={rowIdx} className="flex border-b border-gray-100 h-[120px]">
                <div className="w-[85px] shrink-0 border-r border-gray-100 flex items-start justify-end py-2.5 pr-4 text-[12px] text-gray-400 font-medium">
                  {time}
                </div>
                <div className="flex-1 border-r border-gray-100"></div>
                <div className="flex-1 border-r border-gray-100"></div>
                <div className="flex-1 border-r border-gray-100"></div>
                <div className="flex-1 border-r border-gray-100"></div>
                <div className="flex-1 border-r-0"></div>
              </div>
            ))}

            {/* Event Overlay Layer */}
            <div className="absolute inset-0 left-[85px] flex pointer-events-auto">
              {/* Col 0 - Monday */}
              <div className="flex-1 relative border-r border-transparent">
                {/* 1 PM Event -> top 480px, height approx 200px spilling off bottom */}
                <div className="absolute top-[488px] left-[8px] right-[8px] h-[200px] bg-[#FAF5FF] border-l-[3.5px] border-[#D946EF] rounded-r-xl rounded-l p-3.5 shadow-sm flex flex-col">
                  <div>
                    <div className="text-[12px] font-bold text-purple-900 leading-tight mb-1.5 line-clamp-2">How is AR used in medical procedure</div>
                    <div className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 opacity-80">
                      <Clock className="w-3.5 h-3.5" /> 01 PM - 03 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 1 - Tuesday */}
              <div className="flex-1 relative border-r border-transparent">
                {/* 9AM to 10AM Event -> top 8px, height 104px */}
                <div className="absolute top-[8px] left-[8px] right-[8px] h-[104px] bg-[#EEF2FF] border-l-[3.5px] border-[#3B82F6] rounded-r-xl rounded-l p-3.5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[12px] font-bold text-blue-900 leading-tight mb-1.5 line-clamp-2">How is AR used in medical procedure</div>
                    <div className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 opacity-80">
                      <Clock className="w-3.5 h-3.5" /> 09 AM - 10 AM
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[8px] text-gray-400 font-bold overflow-hidden"><div className="w-full h-full bg-blue-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[8px] text-gray-400 font-bold overflow-hidden"><div className="w-full h-full bg-blue-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[8px] text-gray-400 font-bold overflow-hidden"><div className="w-full h-full bg-blue-100 opacity-50"></div></div>
                    </div>
                    <span className="text-[11px] text-gray-400 ml-2.5 font-medium">+4 Other</span>
                  </div>
                </div>

                {/* 12PM to 1PM Event -> top 368px, height 104px */}
                <div className="absolute top-[368px] left-[8px] right-[8px] h-[104px] bg-[#EEF2FF] border-l-[3.5px] border-[#3B82F6] rounded-r-xl rounded-l p-3.5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[12px] font-bold text-blue-900 leading-tight mb-1.5 line-clamp-2">How is AR used in medical procedure</div>
                    <div className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 opacity-80">
                      <Clock className="w-3.5 h-3.5" /> 09 AM - 10 AM
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-blue-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-blue-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-blue-100 opacity-50"></div></div>
                    </div>
                    <span className="text-[11px] text-gray-400 ml-2.5 font-medium">+4 Other</span>
                  </div>
                </div>
              </div>

              {/* Col 2 - Wednesday */}
              <div className="flex-1 relative border-r border-transparent">
                {/* 11AM Event -> top 248px, height 104px */}
                <div className="absolute top-[248px] left-[8px] right-[8px] h-[104px] bg-[#F0FDF4] border-l-[3.5px] border-[#22C55E] rounded-r-xl rounded-l p-3.5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[12px] font-bold text-green-700 leading-tight mb-1.5 line-clamp-2">How is AR used in medical procedure</div>
                    <div className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 opacity-80">
                      <Clock className="w-3.5 h-3.5" /> 09 AM - 10 AM
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3 - Thursday 1 */}
              <div className="flex-1 relative border-r border-transparent">
                {/* 10AM Event -> top 128px, height 232px */}
                <div className="absolute top-[128px] left-[8px] right-[8px] h-[232px] bg-[#FAF5FF] border-l-[3.5px] border-[#9333EA] rounded-r-xl rounded-l p-3.5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[12px] font-bold text-purple-900 leading-tight mb-1.5 line-clamp-2">How is AR used in medical procedure</div>
                    <div className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 opacity-80">
                      <Clock className="w-3.5 h-3.5" /> 01 PM - 03 PM
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-purple-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-purple-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-purple-100 opacity-50"></div></div>
                    </div>
                    <span className="text-[11px] text-gray-400 ml-2.5 font-medium">+4 Other</span>
                  </div>
                </div>
              </div>

              {/* Col 4 - Thursday 2 */}
              <div className="flex-1 relative">
                {/* Same event on 10AM */}
                <div className="absolute top-[128px] left-[8px] right-[8px] h-[232px] bg-[#FAF5FF] border-l-[3.5px] border-[#9333EA] rounded-r-xl rounded-l p-3.5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[12px] font-bold text-purple-900 leading-tight mb-1.5 line-clamp-2">How is AR used in medical procedure</div>
                    <div className="text-[11px] text-gray-500 font-semibold flex items-center gap-1.5 opacity-80">
                      <Clock className="w-3.5 h-3.5" /> 01 PM - 03 PM
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-purple-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-purple-100 opacity-50"></div></div>
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-purple-100 opacity-50"></div></div>
                    </div>
                    <span className="text-[11px] text-gray-400 ml-2.5 font-medium">+4 Other</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
