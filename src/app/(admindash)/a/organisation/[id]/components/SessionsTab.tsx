import React from 'react';
import { Edit2, ExternalLink } from 'lucide-react';
import { shortenId } from "@/lib/utils/shortenId";

const SummaryCard = ({ value, label, valueColor, subtitle }: { value: string, label: string, valueColor: string, subtitle?: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
    <div className={`text-xl font-bold mb-1 ${valueColor}`}>{value} {subtitle && <span className="text-gray-400 text-sm font-medium">({subtitle})</span>}</div>
    <div className="text-xs text-gray-500 font-medium">{label}</div>
  </div>
);

type SessionsTabProps = {
  sessions?: any[];
};

export default function SessionsTab({ sessions }: SessionsTabProps) {
  const sessionList = (sessions && sessions.length > 0) ? sessions : [];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">

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
              {sessionList.map((session: any, idx: number) => {
                const id = session.sessionId || session.id || session.Id || `SES-${idx}`;
                const name = session.sessionName || session.name || session.Name || 'Untitled';
                const type = session.type || session.Type || 'webinar';
                const participants = session.studentsParticipated ?? session.participants ?? session.Participants ?? 0;
                const total = session.totalStudents ?? session.total ?? 0;
                const attendance = session.attendancePercentage ?? session.attendance ?? 0;
                const date = session.date || session.Date || session.scheduledDate || 'N/A';
                const displayDate = date !== 'N/A' ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
                const status = session.status || session.Status || 'draft';

                return (
                <tr key={id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5 text-sm text-gray-500 font-medium" title={id}>
                    {shortenId(id)}
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-gray-900">
                    {name}
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-1 rounded">
                      {type}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-900 font-medium text-center">
                    {participants}{total ? `/${total}` : ''}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${attendance}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 w-8">{attendance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-500">
                    {displayDate}
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                      status === 'completed' || status === 'Completed'
                        ? 'text-gray-500 bg-gray-100'
                        : 'text-blue-600 bg-blue-50'
                    }`}>
                      {status}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
