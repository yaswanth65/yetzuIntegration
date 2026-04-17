'use client';

import React, { useState } from 'react';

const periods = ['15 days', '30 days', '60 days', '90 days'];

export default function Header() {
  const [active, setActive] = useState('30 days');

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-xs text-gray-500 mt-0.5">Key platform metrics · Last 30 days</p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              active === p
                ? 'bg-indigo-500 text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
        <button className="flex items-center gap-1.5 md:ml-2 px-3 py-1.5 text-xs border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export Report
        </button>
      </div>
    </div>
  );
}