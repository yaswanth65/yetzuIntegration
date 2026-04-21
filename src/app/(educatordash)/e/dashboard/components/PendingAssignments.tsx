import React from 'react';
import { CheckCircle2, Clock, Ban } from 'lucide-react';

const assignments = [
  {
    id: 1,
    student: 'A. Kumar',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    task: 'Webinar Assignment Review',
    role: 'Editing',
    status: 'Submitted',
    statusColor: 'text-green-700 bg-green-50 border-green-200',
    statusIcon: 'check',
    deadline: 'Today',
    deadlineColor: 'text-gray-900',
  },
  {
    id: 2,
    student: 'P. Sharma',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    task: 'Chapter 3 Feedback',
    role: 'Editing',
    status: 'Pending',
    statusColor: 'text-orange-700 bg-orange-50 border-orange-200',
    statusIcon: 'clock',
    deadline: 'Tomorrow',
    deadlineColor: 'text-gray-900',
  },
  {
    id: 3,
    student: 'R. Mehta',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    task: 'Research Proposal',
    role: 'Review',
    status: 'Overdue',
    statusColor: 'text-red-700 bg-red-50 border-red-200',
    statusIcon: 'ban',
    deadline: 'Yesterday',
    deadlineColor: 'text-red-600 font-semibold',
  },
  {
    id: 4,
    student: 'S. Patel',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    task: 'Literature Review',
    role: 'Editing',
    status: 'Active',
    statusColor: 'text-green-700 bg-green-50 border-green-200',
    statusIcon: 'check',
    deadline: 'Feb 13',
    deadlineColor: 'text-gray-900',
  },
  {
    id: 5,
    student: 'G. Diptish',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
    task: 'Methodology Task Review',
    role: 'Review',
    status: 'Pending',
    statusColor: 'text-orange-700 bg-orange-50 border-orange-200',
    statusIcon: 'clock',
    deadline: 'Feb 14',
    deadlineColor: 'text-gray-900',
  },
  {
    id: 6,
    student: 'K. Yashwanth',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    task: 'Research Proposal',
    role: 'Review',
    status: 'Overdue',
    statusColor: 'text-red-700 bg-red-50 border-red-200',
    statusIcon: 'ban',
    deadline: 'March 1',
    deadlineColor: 'text-gray-900',
  },
];

export default function PendingAssignments() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'check':
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mr-1" />;
      case 'clock':
        return <Clock className="w-3.5 h-3.5 text-orange-500 mr-1" />;
      case 'ban':
        return <Ban className="w-3.5 h-3.5 text-red-500 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 mb-8">
      <h2 className="text-[16px] font-bold text-gray-900 mb-4 px-1">Pending Assignment & Reviews</h2>
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-b border-gray-100 text-gray-500 font-medium">
              <tr>
                <th className="px-5 py-4 font-semibold">Student</th>
                <th className="px-5 py-4 font-semibold">Task</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Deadline</th>
                <th className="px-5 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.avatar} alt={item.student} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-bold text-gray-900">{item.student}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 font-medium">{item.task}</td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-bold rounded-full tracking-wide">
                      {item.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className={`inline-flex items-center px-2 py-1 text-[11px] font-bold rounded-md border ${item.statusColor}`}>
                      {getIcon(item.statusIcon)}
                      {item.status}
                    </div>
                  </td>
                  <td className={`px-5 py-4 ${item.deadlineColor} font-medium`}>
                    {item.deadline}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 font-bold text-[12px] rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                      Review Now
                    </button>
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
