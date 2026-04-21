import React from 'react';
import { Clock, ChevronDown, Check } from 'lucide-react';

export default function AvailabilitySettings() {
  const days = [
    { name: 'Monday', active: true },
    { name: 'Tuesday', active: true },
    { name: 'Wednesday', active: true },
    { name: 'Thursday', active: true },
    { name: 'Friday', active: true },
    { name: 'Saturday', active: false },
    { name: 'Sunday', active: false },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-6 mb-8 max-w-[800px]">
      <h2 className="text-[18px] font-bold text-gray-900 mb-1">Availability Settings</h2>
      <p className="text-[13px] text-gray-500 font-medium mb-8">Define when students can book sessions with you</p>

      <div className="space-y-8">
        {/* Available Days */}
        <div>
          <h3 className="text-[14px] font-bold text-gray-900 mb-3">Available Days</h3>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day.name}
                className={`px-4 py-2 text-[13px] font-bold rounded border ${
                  day.active
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                {day.name}
              </button>
            ))}
          </div>
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Start Time*</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                defaultValue="12:30 PM"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-2 font-medium">Session should be 60 mins long</p>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">End Time*</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                defaultValue="12:30 PM"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Buffer Time Between Sessions</label>
            <div className="relative">
              <select className="w-full appearance-none px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option>15 Minutes</option>
                <option>30 Minutes</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Maximum Sessions Per Day</label>
            <div className="relative">
              <select className="w-full appearance-none px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option>6 Sessions</option>
                <option>8 Sessions</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div>
          <label className="block text-[13px] font-bold text-gray-900 mb-3">Allowed Session Types</label>
          <div className="space-y-3">
            {[
              { id: 'type-1', label: '1:1 Sessions', defaultChecked: true },
              { id: 'type-2', label: 'Cohort Sessions', defaultChecked: true },
              { id: 'type-3', label: 'Webinars', defaultChecked: true },
            ].map((type) => (
              <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 outline-none">
                  <input 
                    type="checkbox" 
                    defaultChecked={type.defaultChecked}
                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 cursor-pointer transition-colors"
                  />
                  <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                </div>
                <span className="text-[13px] font-bold text-gray-900">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <button className="w-full py-3 bg-[#1B2538] hover:bg-[#0F172A] text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Availability Settings
          </button>
        </div>

      </div>
    </div>
  );
}
