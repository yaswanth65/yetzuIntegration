import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function AssignmentsHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center text-[13px] text-gray-500 mb-6">
        <span className="hover:text-gray-700 cursor-pointer transition-colors">Home</span>
        <ChevronRight className="w-3.5 h-3.5 mx-2" />
        <span className="font-bold text-gray-900">My Sessions</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900 mb-1">Assignments</h1>
          <p className="text-gray-500 text-[13px] font-medium">Manage your assignments, deadlines and student submissions.</p>
        </div>
      </div>
    </div>
  );
}
