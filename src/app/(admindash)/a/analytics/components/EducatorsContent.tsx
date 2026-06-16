'use client';

import React from 'react';
import type { AnalyticsActivityItem } from '../types';

interface Props {
  items?: AnalyticsActivityItem[];
}

export default function EducatorsContent({ items = [] }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Activity</h3>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-100 px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.description || 'No description available.'}</p>
                </div>
                <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap">
                  {item.activityTime ? new Date(item.activityTime).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent activity available.</p>
      )}
    </div>
  );
}
