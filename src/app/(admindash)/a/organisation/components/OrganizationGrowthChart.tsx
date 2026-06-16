"use client"
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { TimeRange } from '../types';

const ranges: TimeRange[] = ['1M', '3M', '6M', '1Y', 'All'];

function formatDate(d: Date) {
  const day = d.getDate();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${day} ${months[d.getMonth()]}`;
}

function generateData(timeRange: TimeRange) {
  const today = new Date();
  let start: Date;

  switch (timeRange) {
    case '1M':
      start = new Date(today);
      start.setMonth(start.getMonth() - 1);
      break;
    case '3M':
      start = new Date(today);
      start.setMonth(start.getMonth() - 3);
      break;
    case '6M':
      start = new Date(today);
      start.setMonth(start.getMonth() - 6);
      break;
    case '1Y':
      start = new Date(today);
      start.setFullYear(start.getFullYear() - 1);
      break;
    default: // All
      start = new Date(today);
      start.setFullYear(start.getFullYear() - 2);
      break;
  }

  const points: { name: string; created: number; students: number }[] = [];
  const cursor = new Date(start);
  let baseCreated = 20;
  let baseStudents = 18;

  while (cursor <= today) {
    baseCreated += Math.floor(Math.random() * 5) + 1;
    baseStudents += Math.floor(Math.random() * 4) + 1;
    points.push({
      name: formatDate(cursor),
      created: baseCreated,
      students: baseStudents,
    });
    cursor.setDate(cursor.getDate() + 5);
  }

  return points;
}

export default function OrganizationGrowthChart({ timeRange, onTimeRangeChange }: { timeRange: TimeRange; onTimeRangeChange: (r: TimeRange) => void }) {
  const data = useMemo(() => generateData(timeRange), [timeRange]);
  const maxVal = Math.max(...data.flatMap(d => [d.created ?? 0, d.students ?? 0]), 10);
  const yMax = Math.ceil(maxVal / 10) * 10;
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));

  return (
    <div className="bg-white rounded-2xl border shadow-sm border-gray-100 p-5 col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-[#0A0A0A] text-sm sm:text-base">Organization Growth</h3>
        <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-100">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
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
              domain={[0, yMax]}
              ticks={yTicks}
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
