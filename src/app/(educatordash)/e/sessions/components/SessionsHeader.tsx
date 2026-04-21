import React from 'react';
import { ChevronRight, Calendar, Clock } from 'lucide-react';

export default function SessionsHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center text-[13px] text-gray-500 mb-6">
        <span className="hover:text-gray-700 cursor-pointer transition-colors">Home</span>
        <ChevronRight className="w-3.5 h-3.5 mx-2" />
        <span className="font-bold text-gray-900">My Sessions</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900 mb-1">Schedule Management</h1>
          <p className="text-gray-500 text-[13px] font-medium">Manage Sessions, Availability, and time commitments</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            Block Time
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1B2538] border border-[#1B2538] rounded-lg text-[13px] font-medium text-white hover:bg-[#0F172A] transition-colors shadow-sm">
            <Clock className="w-4 h-4 text-gray-300" />
            Update Availability
          </button>
        </div>
      </div>
    </div>
  );
}
