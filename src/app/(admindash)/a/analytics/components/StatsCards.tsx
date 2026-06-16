'use client';

import React from 'react';
import type { AnalyticsOverview } from '../types';

const cards = [
  { key: 'totalUsers', label: 'TOTAL USERS', format: 'number' },
  { key: 'monthlyRevenue', label: 'MONTHLY REVENUE', format: 'currency' },
  { key: 'avgSessionRating', label: 'AVG. SESSION RATING', format: 'rating' },
  { key: 'avgSessionDurationMinutes', label: 'AVG. SESSION DURATION', format: 'minutes' },
  { key: 'churnRate', label: 'CHURN RATE', format: 'percent' },
] as const;

interface StatsCardsProps {
  overview?: AnalyticsOverview;
}

const formatValue = (value: number | undefined, format: (typeof cards)[number]['format']) => {
  if (typeof value !== 'number') {
    return format === 'currency' ? '$0' : format === 'rating' ? '0.0 / 5' : format === 'minutes' ? '0 min' : format === 'percent' ? '0%' : '0';
  }
  if (format === 'currency') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  if (format === 'rating') return `${value.toFixed(1)} / 5`;
  if (format === 'minutes') return `${value} min`;
  if (format === 'percent') return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
  return new Intl.NumberFormat('en-US').format(value);
};

export default function StatsCards({ overview }: StatsCardsProps) {
  const values = {
    totalUsers: overview?.totalUsers,
    monthlyRevenue: overview?.monthlyRevenue,
    avgSessionRating: overview?.avgSessionRating,
    avgSessionDurationMinutes: overview?.avgSessionDurationMinutes,
    churnRate: overview?.churnRate,
  } as const;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 w-full overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 xl:divide-x divide-gray-100 divide-y xl:divide-y-0 gap-3">
        {cards.map((stat, i) => (
          <div key={stat.key} className={`p-4 flex flex-col gap-5 ${i % 2 === 1 && i < 4 ? 'sm:border-l sm:border-gray-100 xl:border-0' : ''}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
                {stat.label}
              </span>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-blue-100 text-blue-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </span>
            </div>
            <div className="text-xl font-bold text-gray-900">{formatValue(values[stat.key], stat.format)}</div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5H7z"/>
              </svg>
              Live
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
