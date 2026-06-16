"use client";

import { Users, GraduationCap, Calendar, Award, TrendingUp, TrendingDown } from "lucide-react";

const statsCards = [
  { 
    title: "Active Students", 
    value: "0", 
    icon: Users, 
    color: "blue",
    trend: "+12%",
    isUp: true 
  },
  { 
    title: "Active Educators", 
    value: "0", 
    icon: GraduationCap, 
    color: "purple",
    trend: "+5%",
    isUp: true 
  },
  { 
    title: "Sessions Today", 
    value: "0", 
    icon: Calendar, 
    color: "orange",
    trend: "-2%",
    isUp: false 
  },
  { 
    title: "Certificates", 
    value: "0", 
    icon: Award, 
    color: "emerald",
    trend: "+8%",
    isUp: true 
  },
];

interface OverViewStatsProps {
  cards?: Record<string, any>;
}

export default function OverViewStats({ cards }: OverViewStatsProps) {
  const stats = [
    { ...statsCards[0], value: String(cards?.activeStudents ?? cards?.totalStudents ?? 0) },
    { ...statsCards[1], value: String(cards?.activeEducators ?? cards?.totalEducators ?? 0) },
    { ...statsCards[2], value: String(cards?.sessionsToday ?? cards?.upcomingSessions?.length ?? 0) },
    { ...statsCards[3], value: String(cards?.certificatesIssued ?? 0) },
  ];

  if (!cards) {
    return (
      <div className="flex flex-wrap gap-6">
        {statsCards.map((_, i) => (
          <div 
            key={i} 
            className="flex-1 min-w-[180px] bg-gray-100 animate-pulse border border-gray-100 shadow-sm"
            style={{ height: "116px", borderRadius: "10px", borderWidth: "1px" }}
          />
        ))}
      </div>
    );
  }

  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="flex flex-wrap gap-6">
      {stats.map((card, i) => (
        <div 
          key={i} 
          className="flex-1 min-w-[180px] bg-white p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          style={{ height: "116px", borderRadius: "10px", borderWidth: "1px" }}
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-2xl ${colorMap[card.color] || "bg-gray-50"} group-hover:scale-110 transition-transform`}>
              <card.icon size={20} />
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${card.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
              {card.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {card.trend}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{card.title}</p>
            <p className="text-2xl font-black text-[#021165] mt-1 line-height-none">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
