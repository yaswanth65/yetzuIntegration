'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Webinar', value: 142, percent: 46.6, color: '#6366f1' },
  { name: 'Cohort', value: 68, percent: 22.3, color: '#14b8a6' },
  { name: '1:1 Mentoring', value: 95, percent: 31.1, color: '#5eead4' },
];

export default function StudentDistributionChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">Student Distribution</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={2}
              stroke="#fff"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value: any, name: any) => [value || 0, name || '']}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="w-full mt-2 space-y-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">{item.percent}%</span>
                <span className="font-semibold text-gray-800 w-8 text-right">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}