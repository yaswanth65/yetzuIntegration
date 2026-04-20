import React from 'react';
import Link from 'next/link';

const organizationsData = [
  { name: 'Boston University', students: 390, activeUsers: 310, activePercent: 79, revenue: '$31,200', completionRate: 84 },
  { name: 'Stanford Institute', students: 320, activeUsers: 290, activePercent: 91, revenue: '$28,400', completionRate: 91 },
  { name: 'Cambridge College', students: 480, activeUsers: 505, activePercent: 105, revenue: '$24,800', completionRate: 76 },
  { name: 'Global Tech Institute', students: 280, activeUsers: 240, activePercent: 86, revenue: '$22,100', completionRate: 78 },
  { name: 'MIT Extension', students: 215, activeUsers: 198, activePercent: 92, revenue: '$19,600', completionRate: 88 },
];

export default function TopOrganizationsTable() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm border-gray-100 mt-6 w-full overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <h3 className="font-semibold text-[#0A0A0A] text-sm sm:text-base">Top Organisations by Performance</h3>
        <Link href="/a/organisation/all" className="text-xs font-semibold text-[#3B82F6] hover:text-blue-700 transition-colors">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100">
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 w-[20%]">Org Name</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 w-[15%]">Students</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 w-[15%]">Active Users</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 w-[15%]">Revenue</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 w-[20%]">Session Completion Rate</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 w-[10%] text-right">Status</th>
              <th className="py-3.5 px-5 text-xs font-semibold text-gray-500 w-[5%] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {organizationsData.map((org, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-5 text-sm font-semibold text-[#3B82F6]">
                  {org.name}
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#10B981]">
                    Active
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <Link href={`/a/organisation/${index + 1}`} className="text-xs font-semibold text-[#3B82F6] hover:underline whitespace-nowrap">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
