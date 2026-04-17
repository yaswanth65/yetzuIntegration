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
  Cell,
} from 'recharts';

const data = [
  { name: 'Session Joined', value: 2200, color: '#6366f1' },
  { name: 'Assignment Opened', value: 1600, color: '#a78bfa' },
  { name: 'Resource Viewed', value: 2000, color: '#22d3ee' },
  { name: 'Certificate Downloaded', value: 900, color: '#f59e0b' },
];

export default function FeatureUsageChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Feature Usage</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </button>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          barSize={22}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            ticks={[0, 500, 1000, 1500, 2000, 2500]}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            width={140}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value: any) => [(value || 0).toLocaleString(), 'Count']}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}