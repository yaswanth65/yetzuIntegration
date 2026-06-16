'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { AnalyticsChartBlock } from '../types';

interface Props {
  data?: AnalyticsChartBlock;
}

export default function AssignmentPerformanceChart({ data }: Props) {
  const chartData = (data?.series || []).map((item, index) => ({
    month: item.month || item.label || data?.labels?.[index] || `Item ${index + 1}`,
    yetToSubmit: Number(item.value || 0),
    completed: 0,
    overdue: 0,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Assignment Performance</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </button>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barSize={18} barGap={3}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={(v) => `${v}%`}
            ticks={[0, 25, 50, 75, 100]}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value: any, name: any) => [`${value || 0}%`, name || '']}
          />
          <Bar dataKey="yetToSubmit" name="Yet to Submit" fill="#6366f1" radius={[3, 3, 0, 0]} />
          <Bar dataKey="completed" name="Completed" fill="#2dd4bf" radius={[3, 3, 0, 0]} />
          <Bar dataKey="overdue" name="Overdue" fill="#f87171" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
