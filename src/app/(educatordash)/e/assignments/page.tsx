"use client";

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import AssignmentList from './components/AssignmentList';
import { assignmentData } from './dummyData';

export default function EducatorAssignmentsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssignments = useMemo(() => {
    return assignmentData.filter((assignment) => {
      // 1. Filter by Tab
      if (activeTab === 'Pending' && assignment.status !== 'Pending') return false;
      if (activeTab === 'Completed' && assignment.status !== 'Review Done' && assignment.status !== 'Submitted') {
        return false;
      }

      // 2. Filter by Search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        if (
          !assignment.assignmentId.toLowerCase().includes(query) &&
          !assignment.sessionTitle.toLowerCase().includes(query) &&
          !assignment.studentName.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  const allCount = assignmentData.length;
  const pendingCount = assignmentData.filter(a => a.status === 'Pending').length;
  // According to image, Completed tab has 2. It seems it includes both 'Submitted' and 'Review Done' or just submitted?
  // We'll just group everything that is not pending into completed.
  const completedCount = assignmentData.filter(a => a.status !== 'Pending').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8 font-sans">
      <div className="max-w-[1550px] mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Assignments</h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          {/* Tabs */}
          <div className="flex items-center gap-8 translate-y-[17px]">
            <button
              onClick={() => setActiveTab('All')}
              className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 ${activeTab === 'All'
                  ? 'text-blue-600 border-b-2 border-blue-600 z-10'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                }`}
            >
              All
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === 'All' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {allCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('Pending')}
              className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 ${activeTab === 'Pending'
                  ? 'text-blue-600 border-b-2 border-blue-600 z-10'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                }`}
            >
              Pending
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === 'Pending' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('Completed')}
              className={`pb-4 text-sm font-semibold transition-colors relative flex items-center gap-2 ${activeTab === 'Completed'
                  ? 'text-blue-600 border-b-2 border-blue-600 z-10'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                }`}
            >
              Completed
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === 'Completed' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>
                {completedCount}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by assignment, session or student"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[42px] pl-10 pr-4 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              />
            </div>

            {/* New Assignment Button */}
            <button className="flex items-center gap-2 bg-[#000520] hover:bg-gray-900 text-white px-5 h-[42px] rounded-[12px] text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
              <Plus size={18} />
              New Assignment
            </button>
          </div>
        </div>

        {/* Content */}
        <AssignmentList assignments={filteredAssignments} />
      </div>
    </div>
  );
}
