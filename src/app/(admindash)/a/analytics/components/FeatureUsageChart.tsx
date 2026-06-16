'use client';

import React from 'react';
import type { AnalyticsTicket } from '../types';

interface Props {
  tickets?: AnalyticsTicket[];
}

export default function FeatureUsageChart({ tickets = [] }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Support Queue</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </button>
      </div>

      {tickets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 px-2 text-xs font-semibold text-gray-500">Ticket</th>
                <th className="py-3 px-2 text-xs font-semibold text-gray-500">Subject</th>
                <th className="py-3 px-2 text-xs font-semibold text-gray-500">Priority</th>
                <th className="py-3 px-2 text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-900">{ticket.ticketCode || ticket.id}</td>
                  <td className="py-3 px-2 text-sm text-gray-700">{ticket.subject || 'Untitled ticket'}</td>
                  <td className="py-3 px-2 text-sm text-gray-700 capitalize">{ticket.priority || 'medium'}</td>
                  <td className="py-3 px-2 text-sm text-gray-700 capitalize">{ticket.status || 'open'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No open tickets in this range.</p>
      )}
    </div>
  );
}
