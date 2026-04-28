"use client";

import React, { useEffect, useState } from 'react';
import { Play, ClipboardList, BookOpen, Clock, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { EducatorAPI } from '@/lib/api';

interface StatCard {
  title: string;
  value: string;
  trend?: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const statsCards = [
  {
    title: "Scheduled Sessions",
    value: "00",
    trend: 0,
    icon: Play,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Pending Assignments",
    value: "0",
    trend: 0,
    icon: ClipboardList,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Active Students",
    value: "0",
    trend: 0,
    icon: BookOpen,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Hours Taught",
    value: "0.0",
    trend: 0,
    icon: Clock,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

export default function StatCards() {
  const [cards, setCards] = useState<StatCard[]>(statsCards);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await EducatorAPI.getOverview();
        const data = response?.data || response;
        
        setCards((prev) => prev.map((card) => {
          const title = card.title.toLowerCase();
          let value = card.value;
          let trend = 0;
          
          if (title.includes("scheduled")) {
            const sessions = data?.scheduledSessions ?? data?.todaySessions?.length ?? data?.sessionsToday ?? 0;
            value = String(sessions).padStart(2, "0");
            trend = data?.sessionsTrend ?? 0;
          }
          if (title.includes("pending")) {
            value = String(data?.pendingAssignments ?? data?.pendingSubmissions ?? data?.assignmentsPending ?? 0);
            trend = data?.pendingTrend ?? 0;
          }
          if (title.includes("students")) {
            value = String(data?.activeStudents ?? data?.studentsCount ?? data?.students?.length ?? 0);
            trend = data?.studentsTrend ?? 0;
          }
          if (title.includes("hours")) {
            value = String(data?.hoursTaught ?? data?.totalHours ?? 0);
            trend = data?.hoursTrend ?? 0;
          }
          
          return { ...card, value, trend };
        }));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 flex flex-col justify-between h-[140px]">
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.title}</p>
              <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor}`}>
                <item.icon size={20} />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((item, i) => {
        const Icon = item.icon;
        const trend = item.trend ?? 0;
        const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : null;
        const trendColor = trend > 0 ? 'text-emerald-600 bg-emerald-50' : trend < 0 ? 'text-red-600 bg-red-50' : 'text-gray-400 bg-gray-50';
        
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
              {TrendIcon && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trendColor}`}>
                  <TrendIcon size={14} />
                  <span>{trend > 0 ? '+' : ''}{trend}%</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
