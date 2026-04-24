import React from 'react';
import { Play, ClipboardList, BookOpen, Clock, TrendingUp } from 'lucide-react';

const statsCards = [
  {
    title: "Scheduled Sessions",
    value: "02",
    icon: Play,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Pending Assignments",
    value: "23",
    icon: ClipboardList,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Active Students",
    value: "142",
    icon: BookOpen,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Hours Taught",
    value: "38.5",
    icon: Clock,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statsCards.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 flex flex-col justify-between h-[140px] shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.title}</p>
              <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor}`}>
                <Icon size={20} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{item.value}</h3>
              <div className="flex items-center gap-1 text-[#10B981] text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={14} />
                <span>+12%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
