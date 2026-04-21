import React from 'react';
import { User, FileCheck, Users } from 'lucide-react';

export default function AssignmentsStats() {
  const stats = [
    {
      title: 'Total Webinars',
      value: '3',
      description: 'Total sessions assigned',
      icon: User,
      iconColor: 'text-[#3E73F8]',
      iconBg: 'bg-[#F0F5FF]'
    },
    {
      title: 'Active Assignments',
      value: '1',
      description: 'Assignments pending review',
      icon: FileCheck,
      iconColor: 'text-[#F97316]',
      iconBg: 'bg-[#FFF7ED]'
    },
    {
      title: 'Total Students',
      value: '60',
      description: '10 Webinars, 2 Cohorts',
      icon: Users,
      iconColor: 'text-[#22C55E]',
      iconBg: 'bg-[#F0FDF4]'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-[12px] p-6 border border-gray-100 shadow-sm flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-[13px] font-medium mb-2">{stat.title}</span>
            <span className="text-gray-900 text-[24px] font-bold mb-1">{stat.value}</span>
            <span className="text-gray-400 text-[12px]">{stat.description}</span>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg}`}>
            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
