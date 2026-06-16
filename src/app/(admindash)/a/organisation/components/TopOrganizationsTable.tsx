"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminAPI, asArray } from '@/lib/api';
import type { TimeRange } from '../types';

const mapOrganization = (org: any, index: number) => {
  const students = Number(org.students || org.totalStudents || org.studentCount || org.studentsCount || 0);
  const activeUsers = Number(org.activeUsers || org.activeStudents || org.active || 0);
  const activePercent = Number(org.activePercent ?? org.activePercentage ?? (students ? Math.round((activeUsers / students) * 100) : 0));
  const rawRevenue = org.revenue || org.revenueGenerated || 0;
  const formattedRevenue = typeof rawRevenue === 'number' ? `$${rawRevenue.toLocaleString()}` : rawRevenue;

  return {
    id: org.id || org._id || org.organizationId || org.orgId || '',
    code: org.orgId || org.code || org.organizationCode || org.orgCode || `ORG-${index + 1}`,
    name: org.name || org.organizationName || 'Untitled Organization',
    students,
    activeUsers,
    activePercent,
    revenue: formattedRevenue,
    completionRate: Number(org.completionRate || org.avgCompletionRate || org.sessionCompletionRate || 0),
    status: String(org.status || 'active').toLowerCase(),
    subscriptionStatus: String(org.subscriptionStatus || '').toLowerCase(),
  };
};

function dateRangeLabel(timeRange: TimeRange) {
  const today = new Date();
  let start: Date;
  switch (timeRange) {
    case '1M': start = new Date(today); start.setMonth(start.getMonth() - 1); break;
    case '3M': start = new Date(today); start.setMonth(start.getMonth() - 3); break;
    case '6M': start = new Date(today); start.setMonth(start.getMonth() - 6); break;
    case '1Y': start = new Date(today); start.setFullYear(start.getFullYear() - 1); break;
    default: start = new Date(today); start.setFullYear(start.getFullYear() - 2); break;
  }
  const fmt = (d: Date) => `${d.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]}`;
  return `${fmt(start)} - ${fmt(today)}`;
}

function columnLabels(timeRange: TimeRange) {
  const range = dateRangeLabel(timeRange);
  return {
    students: `Students (${range})`,
    active: `Active (${range})`,
    revenue: `Revenue (${range})`,
    completion: `Completion (${range})`,
  };
}

export default function TopOrganizationsTable({ timeRange }: { timeRange: TimeRange }) {
  const [organizationsData, setOrganizationsData] = useState<any[]>([]);
  const labels = columnLabels(timeRange);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const response = await AdminAPI.getOrganizations({ page: 1, limit: 5 });
        setOrganizationsData(asArray(response).map(mapOrganization));
      } catch (error) {
        console.error('Failed to fetch top organizations:', error);
        setOrganizationsData([]);
      }
    };

    loadOrganizations();
  }, []);

  return (
    <div className="bg-white rounded-2xl border shadow-sm border-gray-100 mt-6 w-full overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <h3 className="font-semibold text-[#0A0A0A] text-sm sm:text-base">Top Organisations by Performance</h3>
        <Link href="/a/organisation/all" className="text-xs font-semibold text-[#3B82F6] hover:text-blue-700 transition-colors">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[800px] table-auto">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100">
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500">Org Name</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500">{labels.students}</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500">{labels.active}</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500">{labels.revenue}</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500">{labels.completion}</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 text-right">Status</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {organizationsData.map((org, index) => (
              <tr key={org.id || index} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-5 text-sm font-semibold text-[#3B82F6]">
                  <Link href={org.id ? `/a/organisation/${org.id}` : '#'} className="hover:underline">
                    {org.name}
                  </Link>
                </td>
                <td className="py-4 px-5 text-[13px] font-medium text-gray-600">
                  {org.students}
                </td>
                <td className="py-4 px-5 text-[13px] font-medium text-gray-600">
                  {org.activeUsers} <span className="text-gray-400">({org.activePercent}%)</span>
                </td>
                <td className="py-4 px-5 text-[13px] font-semibold text-[#0A0A0A]">
                  {org.revenue}
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-4">
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#3B82F6] rounded-full"
                        style={{ width: `${org.completionRate}%` }}
                      />
                    </div>
                    <span className="text-[13px] font-medium text-gray-500 min-w-[32px]">{org.completionRate}%</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${
                    org.status === 'suspended' ? 'bg-red-50 text-red-600' :
                    org.status === 'inactive' ? 'bg-gray-100 text-gray-500' :
                    'bg-[#ECFDF5] text-[#10B981]'
                  }`}>
                    {org.status === 'suspended' ? 'Suspended' : org.status === 'inactive' ? 'Inactive' : 'Active'}
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <Link href={`/a/organisation/${org.id}`} className="text-xs font-semibold text-[#3B82F6] hover:underline whitespace-nowrap">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
            {organizationsData.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 px-5 text-center text-sm text-gray-500">No organizations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
