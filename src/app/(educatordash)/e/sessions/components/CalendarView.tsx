import React from 'react';
import { Session } from '../types';

interface CalendarViewProps {
  sessions: Session[];
}

export default function CalendarView({ sessions }: CalendarViewProps) {
  const days = [
    { date: 7, name: 'Monday' },
    { date: 8, name: 'Tuesday' },
    { date: 9, name: 'Wednesday' },
    { date: 10, name: 'Thursday' },
    { date: 11, name: 'Friday' },
    { date: 12, name: 'Saturday' },
  ];

  const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'];

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-2 md:p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg text-gray-900">7th Jan, 2026</h3>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="flex items-center bg-gray-50 rounded-xl p-1">
          <button className="px-4 py-1.5 text-sm font-medium text-gray-500 rounded-lg">Day</button>
          <button className="px-4 py-1.5 text-sm font-medium bg-white text-gray-900 shadow-sm rounded-lg">Week</button>
          <button className="px-4 py-1.5 text-sm font-medium text-gray-500 rounded-lg">Month</button>
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-100 bg-white">
          <div className="py-4 border-r border-gray-100"></div>
          {days.map((day) => (
            <div key={day.date} className="py-4 text-center border-r border-gray-100 last:border-r-0">
              <div className="font-bold text-gray-900">{day.date}</div>
              <div className="text-sm text-gray-500">{day.name}</div>
            </div>
          ))}
        </div>

        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-100 last:border-b-0">
              <div className="py-8 text-center text-sm text-gray-500 border-r border-gray-100 relative">
                <span className="absolute -top-3 left-0 right-0 bg-white text-xs">{hour}</span>
              </div>
              <div className="border-r border-gray-100"></div>
              <div className="border-r border-gray-100 relative">
                {hour === '9 AM' && (
                  <div className="absolute top-4 left-2 right-2 bg-blue-100/50 border-l-4 border-blue-500 rounded-r-lg p-2 z-10 h-24">
                    <div className="font-semibold text-blue-900 text-xs">WEB - 204</div>
                    <div className="text-[10px] text-blue-800 mt-1">Dr. Sane Chen</div>
                    <div className="text-[10px] text-blue-800">40 Students</div>
                    <div className="text-[10px] text-blue-800">09 AM - 10 AM</div>
                  </div>
                )}
                {hour === '11 AM' && (
                  <div className="absolute top-4 left-2 right-2 bg-blue-100/50 border-l-4 border-blue-500 rounded-r-lg p-2 z-10 h-24">
                    <div className="font-semibold text-blue-900 text-xs">WEB - 207</div>
                    <div className="text-[10px] text-blue-800 mt-1">Dr. End Johns</div>
                    <div className="text-[10px] text-blue-800">32 Students</div>
                    <div className="text-[10px] text-blue-800">11 AM - 12 PM</div>
                  </div>
                )}
              </div>
              <div className="border-r border-gray-100 relative">
                {hour === '9 AM' && (
                  <div className="absolute top-4 left-2 right-2 bg-blue-100/50 border-l-4 border-blue-500 rounded-r-lg p-2 z-10 h-24">
                    <div className="font-semibold text-blue-900 text-xs">WEB - 209</div>
                    <div className="text-[10px] text-blue-800 mt-1">Dr. Manoj Kumar</div>
                    <div className="text-[10px] text-blue-800">32 Students</div>
                    <div className="text-[10px] text-blue-800">09 AM - 10 AM</div>
                  </div>
                )}
                {hour === '12 PM' && (
                  <div className="absolute top-4 left-2 right-2 bg-green-100/50 border-l-4 border-green-500 rounded-r-lg p-2 z-10 h-24">
                    <div className="font-semibold text-green-900 text-xs">COH - 112</div>
                    <div className="text-[10px] text-green-800 mt-1">Dr. Sarah Jones</div>
                    <div className="text-[10px] text-green-800">22 Students</div>
                    <div className="text-[10px] text-green-800">12 PM - 01 PM</div>
                  </div>
                )}
              </div>
              <div className="border-r border-gray-100 relative">
                 {hour === '11 AM' && (
                  <div className="absolute top-4 left-2 right-2 bg-purple-100/50 border-l-4 border-purple-500 rounded-r-lg p-2 z-10 h-24">
                    <div className="font-semibold text-purple-900 text-xs">WRK - 115</div>
                    <div className="text-[10px] text-purple-800 mt-1">Dr. Sane Chen</div>
                    <div className="text-[10px] text-purple-800">25 Students</div>
                    <div className="text-[10px] text-purple-800">11 AM - 12 PM</div>
                  </div>
                )}
              </div>
              <div className="border-r border-gray-100 relative">
                 {hour === '11 AM' && (
                  <div className="absolute top-4 left-2 right-2 bg-purple-100/50 border-l-4 border-purple-500 rounded-r-lg p-2 z-10 h-24">
                    <div className="font-semibold text-purple-900 text-xs">WRK - 118</div>
                    <div className="text-[10px] text-purple-800 mt-1">Dr. Sane Chen</div>
                    <div className="text-[10px] text-purple-800">25 Students</div>
                    <div className="text-[10px] text-purple-800">11 AM - 01 PM</div>
                  </div>
                )}
              </div>
              <div className="border-r border-gray-100 relative"></div>
            </div>
          ))}
          
           {/* Row for 3 PM just for the WRK-128 block at left side */}
           <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-100">
              <div className="py-8 text-center text-sm text-gray-500 border-r border-gray-100 relative">
                <span className="absolute -top-3 left-0 right-0 bg-white text-xs">3 PM</span>
              </div>
              <div className="border-r border-gray-100 relative">
                  <div className="absolute top-4 left-2 right-2 bg-purple-100/50 border-l-4 border-purple-500 rounded-r-lg p-2 z-10 h-24">
                    <div className="font-semibold text-purple-900 text-xs">WRK - 128</div>
                    <div className="text-[10px] text-purple-800 mt-1">Dr. End Johns</div>
                    <div className="text-[10px] text-purple-800">22 Students</div>
                    <div className="text-[10px] text-purple-800">03 PM - 04 PM</div>
                  </div>
              </div>
              <div className="border-r border-gray-100"></div>
              <div className="border-r border-gray-100"></div>
              <div className="border-r border-gray-100"></div>
              <div className="border-r border-gray-100"></div>
              <div className="border-r border-gray-100"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
