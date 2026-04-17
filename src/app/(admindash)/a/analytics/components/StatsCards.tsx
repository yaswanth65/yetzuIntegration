'use client';

import React from 'react';

const stats = [
  {
    label: 'TOTAL USERS',
    value: '12,847',
    change: '+12.4%',
    positive: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    ),
    iconBg: 'bg-blue-100 text-blue-500',
  },
  {
    label: 'MONTHLY REVENUE',
    value: '₹71,000',
    change: '+14.5%',
    positive: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
      </svg>
    ),
    iconBg: 'bg-green-100 text-green-500',
  },
  {
    label: 'AVG. SESSION RATING',
    value: '4.7 / 5',
    change: '+8.2',
    positive: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ),
    iconBg: 'bg-orange-100 text-orange-400',
  },
  {
    label: 'AVG. SESSION DURATION',
    value: '47 min',
    change: '+5.1%',
    positive: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
      </svg>
    ),
    iconBg: 'bg-cyan-100 text-cyan-500',
  },
  {
    label: 'CHURN RATE',
    value: '3.2%',
    change: '-0.8%',
    positive: false,
    isChurn: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    iconBg: 'bg-red-100 text-red-400',
  },
];

export default function StatsCards() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 w-full overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 xl:divide-x divide-gray-100 divide-y xl:divide-y-0">
        {stats.map((stat, i) => (
          <div key={i} className={`p-4 flex flex-col gap-2 ${i % 2 === 1 && i < 4 ? 'sm:border-l sm:border-gray-100 xl:border-0' : ''}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
                {stat.label}
              </span>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                {stat.icon}
              </span>
            </div>
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              stat.isChurn
                ? (stat.positive ? 'text-red-500' : 'text-green-500')
                : (stat.positive ? 'text-green-500' : 'text-red-500')
            }`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                {stat.positive
                  ? <path d="M7 14l5-5 5 5H7z"/>
                  : <path d="M7 10l5 5 5-5H7z"/>
                }
              </svg>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}