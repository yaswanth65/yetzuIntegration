import React from 'react';
import { Users, Video, User, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const sessionsData = [
  {
    id: 1,
    title: 'Research Methodology',
    subtitle: 'Pradhyumn Dhondi',
    date: '2026-02-11',
    type: '1:1',
    typeColor: 'text-blue-600 bg-blue-50 border-blue-200',
    typeIcon: User,
    status: 'Confirmed',
    statusColor: 'text-green-600',
    statusIcon: CheckCircle2,
    time: '10:30 AM - 11:45 AM',
    hasReschedule: true,
  },
  {
    id: 2,
    title: 'Spring 2026 Cohort - W4',
    subtitle: 'Research Methods - 2026 - Batch 1',
    date: '2026-02-11',
    type: 'Cohort',
    typeColor: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
    typeIcon: Users,
    status: 'Confirmed',
    statusColor: 'text-green-600',
    statusIcon: CheckCircle2,
    time: '10:30 AM - 11:45 AM',
    hasReschedule: false,
  },
  {
    id: 3,
    title: 'Spring 2026 Cohort - W3',
    subtitle: 'Research Methods - 2026 - Batch 2',
    date: '2026-02-11',
    type: 'Cohort',
    typeColor: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
    typeIcon: Users,
    status: 'Confirmed',
    statusColor: 'text-green-600',
    statusIcon: CheckCircle2,
    time: '10:30 AM - 11:45 AM',
    hasReschedule: false,
  },
  {
    id: 4,
    title: 'Cardiology Masterclass',
    subtitle: 'Diptish Gohane',
    date: '2026-02-11',
    type: '1:1',
    typeColor: 'text-blue-600 bg-blue-50 border-blue-200',
    typeIcon: User,
    status: 'Reschedule Requested',
    statusColor: 'text-orange-500',
    statusIcon: Clock,
    time: '12:30 PM - 01:45 PM',
    hasReschedule: true,
  },
  {
    id: 5,
    title: 'Academic Writing Workshop',
    subtitle: 'Fall 2025 Cohort',
    date: '2026-02-11',
    type: 'Webinar',
    typeColor: 'text-green-600 bg-green-50 border-green-200',
    typeIcon: Video,
    status: 'Confirmed',
    statusColor: 'text-green-600',
    statusIcon: CheckCircle2,
    time: '10:30 AM - 11:45 AM',
    hasReschedule: false,
  },
  {
    id: 6,
    title: 'Academic Publishing',
    subtitle: 'Fall 2025 Cohort',
    date: '2026-02-11',
    type: 'Webinar',
    typeColor: 'text-green-600 bg-green-50 border-green-200',
    typeIcon: Video,
    status: 'Confirmed',
    statusColor: 'text-green-600',
    statusIcon: CheckCircle2,
    time: '10:30 AM - 11:45 AM',
    hasReschedule: false,
  },
  {
    id: 7,
    title: 'Publication Strategy Session',
    subtitle: 'Winter 2025 Cohort',
    date: '2026-02-11',
    type: 'Cohort',
    typeColor: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
    typeIcon: Users,
    status: 'Confirmed',
    statusColor: 'text-green-600',
    statusIcon: CheckCircle2,
    time: '10:30 AM - 11:45 AM',
    hasReschedule: false,
  },
  {
    id: 8,
    title: 'H-Index Applications',
    subtitle: 'Pradhyumn Dhondi',
    date: '2026-02-11',
    type: '1:1',
    typeColor: 'text-blue-600 bg-blue-50 border-blue-200',
    typeIcon: User,
    status: 'Reschedule Requested',
    statusColor: 'text-orange-500',
    statusIcon: Clock,
    time: '12:30 PM - 01:45 PM',
    hasReschedule: true,
  },
];

export default function SessionsList() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6 mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px] whitespace-nowrap">
          <thead className="bg-[#F8FAFC] border-b border-gray-100 text-gray-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Session</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessionsData.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900 mb-0.5">{session.title}</div>
                  <div className="text-[11px] text-gray-500">{session.subtitle}</div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    {session.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-md border ${session.typeColor}`}>
                    {session.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-1.5 font-bold ${session.statusColor}`}>
                    <session.statusIcon className="w-4 h-4" />
                    {session.status}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {session.time}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-5 py-1.5 bg-white border border-gray-200 text-gray-700 font-bold text-[12px] rounded shadow-sm hover:bg-gray-50 transition-colors">
                      Join
                    </button>
                    {session.hasReschedule && (
                      <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 font-bold text-[12px] rounded shadow-sm hover:bg-gray-50 transition-colors">
                        Reschedule
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
