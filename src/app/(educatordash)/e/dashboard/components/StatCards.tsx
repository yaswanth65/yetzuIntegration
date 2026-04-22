import React from 'react';
import { Play, DollarSign, Star, Clock, TrendingUp } from 'lucide-react';

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* SCHEDULED SESSIONS */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col justify-between h-[130px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Scheduled Sessions</p>
          <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED]">
            <Play className="w-4 h-4 fill-current" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-gray-900">02</h3>
          <p className="text-xs font-semibold text-[#10B981] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> View All
          </p>
        </div>
      </div>

      {/* PENDING ASSIGNMENTS */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col justify-between h-[130px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Pending Assignments</p>
          <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-gray-900">23</h3>
          <p className="text-xs font-semibold text-[#10B981] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.5%
          </p>
        </div>
      </div>

      {/* MY SESSIONS */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col justify-between h-[130px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">My Sessions</p>
          <div className="w-8 h-8 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[#F97316]">
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-gray-900">12</h3>
          <p className="text-xs font-semibold text-[#10B981] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +0.2
          </p>
        </div>
      </div>

      {/* ASSIGNMENTS CREATED */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col justify-between h-[130px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Assignments Created</p>
          <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-gray-900">04</h3>
          <p className="text-xs font-semibold text-[#10B981] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +5.1%
          </p>
        </div>
      </div>
    </div>
  );
}
