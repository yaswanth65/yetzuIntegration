import React from 'react';
import { ChevronRight, Clock, Calendar, Upload } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Home</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="font-medium text-gray-900">Overview</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">Welcome Back, Dr. Sharma</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-gray-600 text-sm">Senior Academic Mentor</span>
            <div className="flex items-center gap-2 ml-2">
              <span className="px-2 py-0.5 bg-white text-gray-600 text-[10px] font-medium rounded border border-gray-200">Medicine</span>
              <span className="px-2 py-0.5 bg-white text-gray-600 text-[10px] font-medium rounded border border-gray-200">Cardiology</span>
              <span className="px-2 py-0.5 bg-white text-gray-600 text-[10px] font-medium rounded border border-gray-200">1:1 Mentorship</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#DCFCE7] text-[#166534] rounded-md text-sm font-medium border border-[#BBF7D0]">
            Available
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Clock className="w-4 h-4 text-gray-500" />
            Update Availability
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500" />
            Block Time
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 text-gray-500" />
            Upload Resource
          </button>
        </div>
      </div>
    </div>
  );
}
