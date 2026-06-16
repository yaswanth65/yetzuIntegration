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
} from 'recharts';
import type { AnalyticsChartBlock } from '../types';

const tabs = ['1M', '3M', '6M', '1Y', 'All'];

interface Props {
  data?: AnalyticsChartBlock;
}

const formatYAxis = (value: number) => `$${value / 1000}k`;

export default function RevenueBreakdownChart({ data }: Props) {
  const [activeTab, setActiveTab] = useState('1M');
  const chartData = (data?.series || []).map((item, index) => ({
    date: item.month || item.label || data?.labels?.[index] || `Item ${index + 1}`,
    webinars: Number(item.value || 0),
    cohorts: 0,
    mentorships: 0,
  }));

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
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="webinarsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
