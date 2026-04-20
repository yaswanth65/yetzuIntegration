import React from 'react';
import { Edit2, ExternalLink } from 'lucide-react';

const SummaryCard = ({ value, label, valueColor, subtitle }: { value: string, label: string, valueColor: string, subtitle?: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
    <div className={`text-xl font-bold mb-1 ${valueColor}`}>{value} {subtitle && <span className="text-gray-400 text-sm font-medium">({subtitle})</span>}</div>
    <div className="text-xs text-gray-500 font-medium">{label}</div>
  </div>
);

export default function SessionsTab() {
  const sessions = [
    { id: 'SEN-001', name: 'Advanced Research Methods', type: 'Master', participants: '45/50', attendance: 90, date: 'Mar 12, 2026', status: 'Completed' },
    { id: 'SEN-002', name: 'Data Science Cohort 1', type: 'Cohort', participants: '28/30', attendance: 93, date: 'Mar 14, 2026', status: 'Scheduled' },
    { id: 'SEN-003', name: 'Writing Workshop', type: 'Workshop', participants: '38/40', attendance: 95, date: 'Mar 15, 2026', status: 'Completed' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard value="Writing Workshop" subtitle="65%" label="Active Session" valueColor="text-green-500" />
        <SummaryCard value="83.7%" label="Average Attendance" valueColor="text-blue-600" />
        <SummaryCard value="3" label="Missed Sessions" valueColor="text-red-500" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-gray-100">
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[12%]">Session ID</th>
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[20%]">Session Name</th>
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[13%]">Type</th>
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[15%] text-center">Students Participated</th>
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[15%]">Attendance %</th>
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[10%]">Date</th>
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[10%]">Status</th>
                <th className="py-4 px-5 text-xs font-semibold text-gray-500 w-[5%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sessions.map((session, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5 text-sm text-gray-500 font-medium">
                    {session.id}
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-gray-900">
                    {session.name}
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-1 rounded">
                      {session.type}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900 font-medium text-center">
                    {session.participants}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${session.attendance}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 w-8">{session.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-500">
                    {session.date}
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                      session.status === 'Completed' 
                        ? 'text-gray-500 bg-gray-100' 
                        : 'text-blue-600 bg-blue-50'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button className="hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
