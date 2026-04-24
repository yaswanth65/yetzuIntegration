"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AdminAPI } from "@/lib/api";
import { Users, BookOpen, Calendar, GraduationCap, TrendingUp, TrendingDown } from "lucide-react";

const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false }
);
const Area = dynamic(
  () => import("recharts").then((mod) => mod.Area),
  { ssr: false }
);
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

const initialStatsCards = [
  {
    title: "Active Students",
    value: "8,234",
    change: "+8.2%",
    icon: GraduationCap,
    color: "#6366F1",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    gradientId: "grad-students",
    data: [
      { value: 2000 }, { value: 2000 }, { value: 2050 }, { value: 5300 },
      { value: 2400 }, { value: 2600 }, { value: 2900 }, { value: 8234 },
    ],
  },
  {
    title: "Active Educators",
    value: "342",
    change: "+3.1%",
    icon: Users,
    color: "#0D9488",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    gradientId: "grad-educators",
    data: [
      { value: 190 }, { value: 195 }, { value: 300 }, { value: 405 },
      { value: 318 }, { value: 325 }, { value: 335 }, { value: 742 },
    ],
  },
  {
    title: "Sessions Today",
    value: "47",
    change: "-2.4%",
    icon: Calendar,
    color: "#0EA5E9",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    gradientId: "grad-sessions",
    data: [
      { value: 60 }, { value: 52 }, { value: 58 }, { value: 54 },
      { value: 50 }, { value: 51 }, { value: 48 }, { value: 30 },
    ],
  },
  {
    title: "Certificates Issued",
    value: "1,456",
    change: "+22.1%",
    icon: BookOpen,
    color: "#F59E0B",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    gradientId: "grad-certs",
    data: [
      { value: 300 }, { value: 850 }, { value: 500 }, { value: 880 },
      { value: 1100 }, { value: 1250 }, { value: 1380 }, { value: 1456 },
    ],
  },
];

export default function OverViewStats() {
  const [statsCards, setStatsCards] = useState(initialStatsCards);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await AdminAPI.getOverview();
        if (response?.data) {
          const data = response.data;
          
          setStatsCards((prevCards) => {
            const updatedCards = [...prevCards];
            
            if (data.activeStudents !== undefined) updatedCards[0].value = data.activeStudents.toLocaleString();
            if (data.activeEducators !== undefined) updatedCards[1].value = data.activeEducators.toLocaleString();
            if (data.sessionsToday !== undefined) updatedCards[2].value = data.sessionsToday.toLocaleString();
            if (data.certificatesIssued !== undefined) updatedCards[3].value = data.certificatesIssued.toLocaleString();
            
            return updatedCards;
          });
        }
      } catch (error) {
        console.error('Failed to fetch admin overview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {statsCards.map((item) => {
        const isPositive = item.change.startsWith("+");
        const Icon = item.icon;

        return (
          <div key={item.gradientId} className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
            <div className="p-6 pb-2">
              {/* Icon + Title */}
              <div className="flex items-center justify-between mb-4">
                <div className={` rounded-2xl ${item.iconBg} ${item.iconColor} transition-transform group-hover:scale-110 duration-500`}>
                  <Icon size={24} />
                </div>
                <div
                  className={`flex items-center gap-1 text-[11px] font-medium rounded-full px-2.5 py-1 ${
                    isPositive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{item.change}</span>
                </div>
              </div>

              {/* Value + Title */}
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1">
                  {item.title}
                </span>
                <h2 className="font-bold text-3xl text-gray-900 tracking-tight">
                  {loading ? (
                    <div className="h-9 w-24 bg-gray-50 animate-pulse rounded-lg" />
                  ) : item.value}
                </h2>
              </div>
            </div>

            {/* Sparkline */}
            <div className="h-20 mt-auto overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={item.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={item.gradientId}
                      x1="0" y1="0"
                      x2="0" y2="1"
                    >
                      <stop offset="0%" stopColor={item.color} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={item.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={item.color}
                    strokeWidth={3}
                    fill={`url(#${item.gradientId})`}
                    dot={false}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
