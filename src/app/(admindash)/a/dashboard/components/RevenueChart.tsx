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
  Legend,
} from "recharts";


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

//Mock JSON Data (swap fetch from Supabase later) 

const revenueData: RevenueData = {
  "1M": [
    { date: "Mar 1",  webinars: 12800, cohorts: 8400,  mentorships: 7200 },
    { date: "Mar 5",  webinars: 14200, cohorts: 9100,  mentorships: 7400 },
    { date: "Mar 9",  webinars: 15600, cohorts: 9800,  mentorships: 8100 },
    { date: "Mar 13", webinars: 17100, cohorts: 10400, mentorships: 8900 },
    { date: "Mar 17", webinars: 18900, cohorts: 11200, mentorships: 9600 },
    { date: "Mar 21", webinars: 20500, cohorts: 12100, mentorships: 10400 },
    { date: "Mar 25", webinars: 22800, cohorts: 13600, mentorships: 11200 },
    { date: "Mar 29", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  "3M": [
    { date: "Jan 1",  webinars: 8000,  cohorts: 5200,  mentorships: 4800 },
    { date: "Jan 15", webinars: 9400,  cohorts: 6100,  mentorships: 5200 },
    { date: "Feb 1",  webinars: 11200, cohorts: 7300,  mentorships: 6100 },
    { date: "Feb 15", webinars: 13800, cohorts: 8800,  mentorships: 7400 },
    { date: "Mar 1",  webinars: 16500, cohorts: 10200, mentorships: 8900 },
    { date: "Mar 15", webinars: 19200, cohorts: 12100, mentorships: 10500 },
    { date: "Mar 29", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  "6M": [
    { date: "Oct 1",  webinars: 5200,  cohorts: 3400,  mentorships: 3100 },
    { date: "Nov 1",  webinars: 7800,  cohorts: 5100,  mentorships: 4600 },
    { date: "Dec 1",  webinars: 10400, cohorts: 6800,  mentorships: 6000 },
    { date: "Jan 1",  webinars: 13100, cohorts: 8500,  mentorships: 7500 },
    { date: "Feb 1",  webinars: 18200, cohorts: 11200, mentorships: 9800 },
    { date: "Mar 1",  webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  "1Y": [
    { date: "Apr '24", webinars: 3200,  cohorts: 2100,  mentorships: 1900 },
    { date: "Jun '24", webinars: 5800,  cohorts: 3800,  mentorships: 3400 },
    { date: "Aug '24", webinars: 9100,  cohorts: 5900,  mentorships: 5300 },
    { date: "Oct '24", webinars: 13500, cohorts: 8700,  mentorships: 7800 },
    { date: "Dec '24", webinars: 18400, cohorts: 11900, mentorships: 10600 },
    { date: "Feb '25", webinars: 22100, cohorts: 13800, mentorships: 12100 },
    { date: "Mar '25", webinars: 25200, cohorts: 15100, mentorships: 12800 },
  ],
  All: [
    { date: "2021", webinars: 1200,  cohorts: 800,   mentorships: 700   },
    { date: "2022", webinars: 4800,  cohorts: 3100,  mentorships: 2800  },
    { date: "2023", webinars: 10200, cohorts: 6600,  mentorships: 5900  },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<Period, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const btn = buttonRefs.current.get(active);
    const container = containerRef.current;
    if (!btn || !container) return;
    const bRect = btn.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    setIndicator({ left: bRect.left - cRect.left, width: bRect.width });
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center bg-gray-100 rounded-2xl p-1 gap-0.5"
    >
      {/* Sliding pill */}
      <div
        className="absolute top-1 bottom-1 bg-white rounded-xl shadow shadow-gray-200/80 transition-all duration-200 ease-in-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {PERIODS.map((p) => (
        <button
          key={p}
          ref={(el) => { if (el) buttonRefs.current.set(p, el); }}
          onClick={() => onChange(p)}
          className={`relative z-10 px-4 py-1.5 rounded-xl text-sm font-semibold transition-colors duration-150 ${
            active === p ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm min-w-[150px]">
      <p className="text-gray-500 font-medium mb-2">{label}</p>
      {payload.map((item) => (
        <div key={item.name} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-gray-600 capitalize">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </span>
          <span className="font-semibold text-gray-900">
            ${(item.value / 1000).toFixed(1)}k
          </span>
        </div>
      ))}
    </div>
  );
}


const SERIES = [
  { key: "webinars",     label: "Webinars",     color: "#8B5CF6" },
  { key: "cohorts",      label: "Cohorts",      color: "#06B6D4" },
  { key: "mentorships",  label: "Mentorships",  color: "#10B981" },
];

function CustomLegend() {
  return (
    <div className="flex items-center justify-center gap-6 pt-2">
      {SERIES.map(({ key, label, color }) => (
        <span key={key} className="flex items-center gap-1.5 text-sm" style={{ color : color }}>
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, color : color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

//  Y-Axis Formatter 

function formatY(value: number) {
  return `$${(value / 1000).toFixed(0)}k`;
}

//  Main Component 

export default function RevenueBreakdown() {
  const [period, setPeriod] = useState<Period>("1M");
  const data = revenueData[period];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-10 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3 ">
        <h2 className="text-base font-semibold text-gray-900 tracking-tight">
          Revenue Breakdown
        </h2>
        <PeriodSelector active={period} onChange={setPeriod} />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            {SERIES.map(({ key, color }) => (
              <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.18} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E5E7EB"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            tickLine={false}
            axisLine={false}
            dy={8}
          />

          <YAxis
            tickFormatter={formatY}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            tickLine={false}
            axisLine={false}
            width={44}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }} />

          {SERIES.map(({ key, color }) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${key})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              animationDuration={600}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <CustomLegend />
    </div>
  );
}
