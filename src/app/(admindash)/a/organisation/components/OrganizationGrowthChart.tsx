"use client"
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Oct', created: 26, students: 26 },
  { name: 'Nov', created: 38, students: 30 },
  { name: 'Dec', created: 40, students: 35 },
  { name: 'Jan', created: 42, students: 38 },
  { name: 'Feb', created: 45, students: 43 },
  { name: 'Mar', created: 47, students: 47 },
  { name: 'Apr', created: null, students: null },
  { name: 'May', created: null, students: null },
  { name: 'Jun', created: null, students: null },
];

export default function OrganizationGrowthChart() {
  const [timeRange, setTimeRange] = useState('1M');
  const ranges = ['1M', '3M', '6M', '1Y', 'All'];

  return (
    <div className="bg-white rounded-2xl border shadow-sm border-gray-100 p-5 col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-[#0A0A0A] text-sm sm:text-base">Organization Growth</h3>
        <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                timeRange === range 
                  ? 'bg-white shadow-sm text-gray-800 border border-gray-200/60' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#9CA3AF' }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              domain={[0, 52]}
              ticks={[0, 13, 26, 39, 52]}
              dx={-5}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
            />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ fontSize: '11px', color: '#6B7280', paddingTop: '20px' }}
            />
            <Line 
              name="Organizations Created"
              type="linear" 
              dataKey="created" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: '#8B5CF6', stroke: '#fff' }}
              activeDot={{ r: 6 }}
              connectNulls
            />
            <Line 
              name="Student Growth"
              type="linear" 
              dataKey="students" 
              stroke="#06B6D4" 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: '#06B6D4', stroke: '#fff' }}
              activeDot={{ r: 6 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
