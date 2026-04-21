import React from 'react';
import { User, BookOpen, Video, Award } from 'lucide-react';

const stats = [
  {
    title: 'Active Students',
    value: '12',
    description: 'Total students assigned',
    icon: User,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    title: 'Pending Reviews',
    value: '4',
    description: 'Assignments awaiting action',
    icon: BookOpen,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
  },
  {
    title: 'Sessions Today',
    value: '3',
    description: '1:1, Webinars, Cohorts',
    icon: Video,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    title: 'Rating',
    value: '4.8',
    description: 'Student Feedback Score',
    icon: Award,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-50',
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-700 text-[15px] font-medium">{stat.title}</h3>
            <div className={`p-2 rounded-full ${stat.iconBg}`}>
              <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-bold text-gray-900 leading-none mb-1.5">{stat.value}</div>
            <div className="text-[11px] text-gray-500">{stat.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
