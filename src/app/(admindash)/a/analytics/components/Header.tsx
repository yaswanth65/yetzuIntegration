'use client';

import React from 'react';

const periods = [15, 30, 60, 90] as const;

interface HeaderProps {
  rangeDays: number;
  onRangeDaysChange: (rangeDays: number) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  loading?: boolean;
}

export default function Header({
  rangeDays,
  onRangeDaysChange,
  onExportCsv,
  onExportJson,
  loading,
}: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Analytics</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Key platform metrics · Last {rangeDays} days</p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => onRangeDaysChange(p)}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              rangeDays === p
                ? 'bg-indigo-500 text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {p} days
          </button>
        ))}
        <button
          onClick={onExportCsv}
          disabled={loading}
          className="flex items-center gap-1.5 md:ml-2 px-3 py-1.5 text-xs border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-60"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export Report
        </button>
        <button
          onClick={onExportJson}
          disabled={loading}
          className="px-3 py-1.5 text-xs border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-60"
        >
          JSON
        </button>
      </div>
    </div>
  );
}
