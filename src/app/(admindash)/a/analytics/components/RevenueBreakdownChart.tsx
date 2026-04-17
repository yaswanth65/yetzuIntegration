'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { date: 'Mar 27', webinars: 26000, cohorts: 21000, mentorships: 14000 },
  { date: 'Mar 28', webinars: 27000, cohorts: 21500, mentorships: 14500 },
  { date: 'Mar 29', webinars: 27500, cohorts: 22000, mentorships: 15000 },
  { date: 'Mar 30', webinars: 28000, cohorts: 21800, mentorships: 15200 },
  { date: 'Mar 31', webinars: 27800, cohorts: 22200, mentorships: 15500 },
  { date: 'Apr 1', webinars: 28200, cohorts: 22500, mentorships: 15800 },
  { date: 'Apr 2', webinars: 28800, cohorts: 23000, mentorships: 16000 },
];

const tabs = ['1M', '3M', '6M', '1Y', 'All'];

const formatYAxis = (value: number) => `$${value / 1000}k`;

const CustomLegend = () => (
  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-2">
    {[
      { color: '#6366f1', label: 'Webinars' },
      { color: '#14b8a6', label: 'Cohorts' },
      { color: '#86efac', label: 'Mentorships' },
    ].map((item) => (
      <div key={item.label} className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
        <span className="text-xs text-gray-500">{item.label}</span>
      </div>
    ))}
  </div>
);

export default function RevenueBreakdownChart() {
  const [activeTab, setActiveTab] = useState('1M');

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-800">Revenue Breakdown</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-0.5 overflow-x-auto max-w-full no-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 text-xs rounded transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="webinarsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="cohortsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="mentorshipsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#86efac" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#86efac" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={formatYAxis}
            ticks={[0, 7000, 14000, 21000, 28000]}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value: any) => [`$${((value || 0) / 1000).toFixed(0)}k`]}
          />
          <Area
            type="monotone"
            dataKey="webinars"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#webinarsGrad)"
          />
          <Area
            type="monotone"
            dataKey="cohorts"
            stroke="#14b8a6"
            strokeWidth={2}
            fill="url(#cohortsGrad)"
          />
          <Area
            type="monotone"
            dataKey="mentorships"
            stroke="#86efac"
            strokeWidth={2}
            fill="url(#mentorshipsGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
}