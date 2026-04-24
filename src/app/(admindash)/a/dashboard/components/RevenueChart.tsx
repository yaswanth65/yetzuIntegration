"use client";

import { useState, useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Filter } from "lucide-react";

type Period = "1M" | "3M" | "6M" | "1Y" | "All";

interface DataPoint {
  date: string;
  webinars: number;
  cohorts: number;
  mentorships: number;
}

interface RevenueData {
  [key: string]: DataPoint[];
}

const revenueData: RevenueData = {
  "1M": [
    { date: "Mar 1", webinars: 12800, cohorts: 8400, mentorships: 7200 },
    { date: "Mar 5", webinars: 14200, cohorts: 9100, mentorships: 7400 },
    { date: "Mar 9", webinars: 15600, cohorts: 9800, mentorships: 8100 },
    { date: "Mar 13", webinars: 17100, cohorts: 10400, mentorships: 8900 },
    { date: "Mar 17", webinars: 18900, cohorts: 11200, mentorships: 9600 },
    { date: "Mar 21", webinars: 20500, cohorts: 12100, mentorships: 10400 },
    { date: "Mar 25", webinars: 22800, cohorts: 13600, mentorships: 11200 },
    { date: "Mar 29", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  "3M": [
    { date: "Jan 1", webinars: 8000, cohorts: 5200, mentorships: 4800 },
    { date: "Jan 15", webinars: 9400, cohorts: 6100, mentorships: 5200 },
    { date: "Feb 1", webinars: 11200, cohorts: 7300, mentorships: 6100 },
    { date: "Feb 15", webinars: 13800, cohorts: 8800, mentorships: 7400 },
    { date: "Mar 1", webinars: 16500, cohorts: 10200, mentorships: 8900 },
    { date: "Mar 15", webinars: 19200, cohorts: 12100, mentorships: 10500 },
    { date: "Mar 29", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  "6M": [
    { date: "Oct 1", webinars: 5200, cohorts: 3400, mentorships: 3100 },
    { date: "Nov 1", webinars: 7800, cohorts: 5100, mentorships: 4600 },
    { date: "Dec 1", webinars: 10400, cohorts: 6800, mentorships: 6000 },
    { date: "Jan 1", webinars: 13100, cohorts: 8500, mentorships: 7500 },
    { date: "Feb 1", webinars: 18200, cohorts: 11200, mentorships: 9800 },
    { date: "Mar 1", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  "1Y": [
    { date: "Apr '24", webinars: 3200, cohorts: 2100, mentorships: 1900 },
    { date: "Jun '24", webinars: 5800, cohorts: 3800, mentorships: 3400 },
    { date: "Aug '24", webinars: 9100, cohorts: 5900, mentorships: 5300 },
    { date: "Oct '24", webinars: 13500, cohorts: 8700, mentorships: 7800 },
    { date: "Dec '24", webinars: 18400, cohorts: 11900, mentorships: 10600 },
    { date: "Feb '25", webinars: 22100, cohorts: 13800, mentorships: 12100 },
    { date: "Mar '25", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  All: [
    { date: "2021", webinars: 1200, cohorts: 800, mentorships: 700 },
    { date: "2022", webinars: 4800, cohorts: 3100, mentorships: 2800 },
    { date: "2023", webinars: 10200, cohorts: 6600, mentorships: 5900 },
    { date: "2024", webinars: 18900, cohorts: 12100, mentorships: 10800 },
    { date: "2025", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
};

const PERIODS: Period[] = ["1M", "3M", "6M", "1Y", "All"];

function PeriodSelector({
  active,
  onChange,
}: {
  active: Period;
  onChange: (p: Period) => void;
}) {
  return (
    <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
      {PERIODS.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            active === p
              ? "bg-[#021165] text-white shadow-md shadow-blue-900/20"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-[24px] shadow-2xl p-5 min-w-[200px] animate-in fade-in zoom-in duration-200">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">{label}</p>
      <div className="space-y-3">
        {payload.map((item: any) => (
          <div key={item.name} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2.5 text-sm font-bold text-gray-700 capitalize">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: item.color, color: item.color }}
              />
              {item.name}
            </span>
            <span className="font-bold text-gray-900">
              ${(item.value / 1000).toFixed(1)}k
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400">Total Revenue</span>
        <span className="text-sm font-black text-[#021165]">
          ${(payload.reduce((acc, curr) => acc + curr.value, 0) / 1000).toFixed(1)}k
        </span>
      </div>
    </div>
  );
}

const SERIES = [
  { key: "webinars", label: "Webinars", color: "#6366F1" },
  { key: "cohorts", label: "Cohorts", color: "#06B6D4" },
  { key: "mentorships", label: "Mentorships", color: "#10B981" },
];

export default function RevenueBreakdown() {
  const [period, setPeriod] = useState<Period>("1M");
  const data = revenueData[period];

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8 w-full group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-blue-50 text-[#042BFD] rounded-xl">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Revenue Breakdown
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-medium">Growth analysis across primary revenue streams</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <PeriodSelector active={period} onChange={setPeriod} />
          <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#021165] hover:bg-blue-50 rounded-xl border border-transparent hover:border-blue-100 transition-all ml-auto sm:ml-0">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {SERIES.map(({ key, color }) => (
                <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#F3F4F6"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
              dy={15}
            />

            <YAxis
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />

            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: "#021165", strokeWidth: 1, strokeDasharray: "4 4" }} 
            />

            {SERIES.map(({ key, color }) => (
              <Area
                key={key}
                type="natural"
                dataKey={key}
                stroke={color}
                strokeWidth={3}
                fill={`url(#grad-${key})`}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: color }}
                animationDuration={1500}
                stackId="1"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-gray-50 mt-4">
        {SERIES.map(({ key, label, color }) => (
          <div key={key} className="flex items-center gap-3">
            <div 
              className="w-3.5 h-3.5 rounded-full shadow-[0_0_8px_currentColor]" 
              style={{ backgroundColor: color, color: color }} 
            />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
