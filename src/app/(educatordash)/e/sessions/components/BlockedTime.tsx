import React from 'react';
import { Calendar, Clock, Trash2, AlertCircle } from 'lucide-react';

const blockedTimeData = [
  {
    id: 1,
    type: 'Conference',
    typeColor: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
    date: 'Feb 18, 2026 - Feb 20, 2026',
    time: '09:00 AM - 05:00 PM',
    hasConflict: false,
  },
  {
    id: 2,
    type: 'Personal',
    typeColor: 'text-gray-600 bg-gray-100 border-gray-200',
    date: 'Feb 18, 2026 - Feb 20, 2026',
    time: '09:00 AM - 05:00 PM',
    hasConflict: true,
    conflictMessage: 'This timeblock conflicts with 2 scheduled sessions',
  },
  {
    id: 3,
    type: 'Conference',
    typeColor: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
    date: 'Feb 10, 2026 - Feb 20, 2026',
    time: '09:00 AM - 05:00 PM',
    hasConflict: false,
  },
];

export default function BlockedTime() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-6 mb-8">
      <h2 className="text-[18px] font-bold text-gray-900 mb-1">Blocked Time & Time Off</h2>
      <p className="text-[13px] text-gray-500 font-medium mb-8">Manage your blocked time slots and upcoming time off</p>

      <div className="space-y-4">
        {blockedTimeData.map((item) => (
          <div key={item.id} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors bg-white">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 text-[11px] font-bold rounded-md border ${item.typeColor}`}>
                  {item.type}
                </span>
                {item.hasConflict && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md border text-red-600 bg-red-50 border-red-200">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Blocked Time
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[13px] font-bold text-gray-600 hover:text-gray-900 transition-colors">Edit</button>
                <button className="text-red-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[13px] font-bold text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {item.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {item.time}
              </div>
            </div>
            
            {item.hasConflict && (
              <div className="mt-3 text-[12px] font-bold text-red-500">
                {item.conflictMessage}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
