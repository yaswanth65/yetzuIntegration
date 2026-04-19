"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AdminAPI } from "@/lib/api";

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
    icon: "/admin-dashboard/education-cap-icon.svg",
    color: "#6366F1",
    iconBg: "bg-[#2563eb26]",
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
    icon: "/admin-dashboard/book-icon.svg",
    color: "#0D9488",
    iconBg: "bg-[#05966926]",
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
    icon: "/admin-dashboard/calendar-icon.svg",
    color: "#0EA5E9",
    iconBg: "bg-[#0ea5e926]",
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
    icon: "/admin-dashboard/badge-icon.svg",
    color: "#D97706",
    iconBg: "bg-[#f9731626]",
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
            
            if (data.activeStudents !== undefined) updatedCards[0].value = String(data.activeStudents);
            if (data.activeEducators !== undefined) updatedCards[1].value = String(data.activeEducators);
            if (data.sessionsToday !== undefined) updatedCards[2].value = String(data.sessionsToday);
            if (data.certificatesIssued !== undefined) updatedCards[3].value = String(data.certificatesIssued);
            
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
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 w-full">
      {statsCards.map((item) => {
        const isPositive = item.change.startsWith("+");

        return (
          <div key={item.gradientId} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 pt-5">
              {/* Icon + Title */}
              <div className="flex items-center gap-2">
                <img
                  className={`p-2 rounded-lg ${item.iconBg}`}
                  src={item.icon}
                  alt={item.title}
                />
                <span className="text-gray-500 uppercase font-medium text-xs">
                  {item.title}
                </span>
              </div>

              {/* Value + Badge */}
              <h2 className="font-semibold text-4xl mt-3">
                {loading ? "..." : item.value}
              </h2>
              <div className="flex items-center gap-2 mt-3 mb-4">
                <div
                  className={`inline-flex text-[11px] font-medium rounded-xl px-[10px] py-[2px] gap-1 ${
                    isPositive
                      ? "bg-emerald-500/20 text-emerald-700"
                      : "bg-red-500/20 text-red-700"
                  }`}
                >
                  <span>{isPositive ? "↗" : "↘"}</span>
                  <span>{item.change}</span>
                </div>
                <p className="text-gray-400 font-light text-sm">vs last month</p>
              </div>
            </div>

            {/* Sparkline — unique gradient ID per card */}
            <div className="h-20">
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
                      <stop offset="0%" stopColor={item.color} stopOpacity={0.18} />
                      <stop offset="100%" stopColor={item.color} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={item.color}
                    strokeWidth={2.5}
                    fill={`url(#${item.gradientId})`}
                    dot={false}
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
