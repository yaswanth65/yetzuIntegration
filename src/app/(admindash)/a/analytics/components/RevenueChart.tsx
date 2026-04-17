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

const data = [
  { month: 'Oct', revenue: 40000 },
  { month: 'Nov', revenue: 43000 },
  { month: 'Dec', revenue: 45000 },
  { month: 'Jan', revenue: 54000 },
  { month: 'Feb', revenue: 62000 },
  { month: 'Mar', revenue: 70000 },
];

const formatYAxis = (value: number) => `$${value / 1000}k`;

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Revenue</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </button>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barSize={32}>
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
            tickFormatter={formatYAxis}
            ticks={[0, 20000, 40000, 60000, 80000]}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value: any) => [`$${((value || 0) / 1000).toFixed(0)}k`, 'Revenue']}
          />
          <Bar dataKey="revenue" fill="#818cf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}