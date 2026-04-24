"use client";

import Image from "next/image";
import React from "react";
import { Activity, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  minutesAgo: number;
  type: 'webinar' | 'assignment' | 'certificate' | 'user' | 'cohort';
}

const activityData: ActivityItem[] = [
  {
    id: "1",
    message: "Priya Sharma joined webinar 'Academic Writing Fundamentals'",
    timestamp: "2 min ago",
    minutesAgo: 2,
    type: 'webinar'
  },
  {
    id: "2",
    message: "Assignment 'Research Methodology Paper' submitted by Rahul K.",
    timestamp: "5 min ago",
    minutesAgo: 5,
    type: 'assignment'
  },
  {
    id: "3",
    message: "Certificate issued to Aisha M. for 'Publication Ethics'",
    timestamp: "8 min ago",
    minutesAgo: 8,
    type: 'certificate'
  },
  {
    id: "4",
    message: "New user registered: Dr. James Wilson",
    timestamp: "12 min ago",
    minutesAgo: 12,
    type: 'user'
  },
  {
    id: "5",
    message: "Cohort 'Research Methods Batch 12' session started",
    timestamp: "15 min ago",
    minutesAgo: 15,
    type: 'cohort'
  },
  {
    id: "6",
    message: "Assignment graded: 'Literature Review' – 87/100",
    timestamp: "18 min ago",
    minutesAgo: 18,
    type: 'assignment'
  },
];

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'webinar': return 'bg-blue-50 text-blue-600';
    case 'assignment': return 'bg-amber-50 text-amber-600';
    case 'certificate': return 'bg-emerald-50 text-emerald-600';
    case 'user': return 'bg-purple-50 text-purple-600';
    case 'cohort': return 'bg-rose-50 text-rose-600';
    default: return 'bg-gray-50 text-gray-600';
  }
};

export default function LiveActivityFeed() {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8 w-full group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Activity size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-none">Activity Feed</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time Updates</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
        {activityData.map((data, idx) => (
          <div key={data.id} className="flex gap-4 relative group/item">
            <div className={`w-10 h-10 rounded-xl shrink-0 z-10 flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover/item:scale-110 duration-300 ${getTypeStyles(data.type)}`}>
               <div className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <p className="text-sm font-bold text-gray-800 leading-snug group-hover/item:text-[#021165] transition-colors">
                  {data.message}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 whitespace-nowrap uppercase tracking-tighter">
                  <Clock size={10} />
                  {data.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
