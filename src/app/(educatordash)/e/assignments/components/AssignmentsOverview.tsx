import React from 'react';
import { ChevronRight, Video, FileText, Users, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface AssignmentsOverviewProps {
  onCreateAssignment: () => void;
}

export default function AssignmentsOverview({ onCreateAssignment }: AssignmentsOverviewProps) {
  const stats = [
    {
      title: 'Total Webinars',
      value: '3',
      subtext: 'Total students assigned',
      icon: Video,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
    {
      title: 'Active Assignments',
      value: '1',
      subtext: 'Assignments awaiting review',
      icon: FileText,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-50',
    },
    {
      title: 'Total Students',
      value: '60',
      subtext: 'For Webinars/Cohorts',
      icon: Users,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
    },
  ];

  const webinars = Array(3).fill({
    title: 'Writing a Publication Ready Research Manuscript',
    subtitle: 'Fall 2025 - Research Writing Batch',
    date: 'Feb 15, 2026',
    duration: '4 Hours',
    students: '30 Students',
    submitted: '12 Submitted 00/30',
  });

  return (
    <div className="animate-in fade-in duration-300 w-full">
      {/* Header */}
      <div className="mb-6 w-full">
        <div className="flex items-center text-[13px] text-gray-500 mb-6 w-full">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-bold text-gray-900">Assignments</span>
        </div>
        
        <div>
          <h1 className="text-[20px] font-bold text-gray-900 leading-tight">Assignments</h1>
          <p className="text-gray-500 text-[13px] mt-1 font-medium">Manage your assignments, students, feedback and results</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[14px] font-bold text-gray-900">{stat.title}</h3>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
            </div>
            <div>
              <div className="text-[28px] font-bold text-gray-900 leading-none mb-1.5">{stat.value}</div>
              <div className="text-[11px] text-gray-500 font-medium">{stat.subtext}</div>
            </div>
          </div>
        ))}
      </div>

      {/* My Webinars */}
      <div className="w-full">
        <h2 className="text-[16px] font-bold text-gray-900 mb-1">My Webinars</h2>
        <p className="text-[13px] text-gray-500 font-medium mb-6">Define when students can book sessions with you</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {webinars.map((webinar, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col w-full h-full">
              <div className="flex justify-between items-start mb-1 gap-2">
                <h3 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2">{webinar.title}</h3>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded shrink-0">Assigned</span>
              </div>
              <p className="text-[12px] text-gray-500 mb-6 font-medium">{webinar.subtitle}</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[12px] font-bold text-gray-700 mb-6 mt-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {webinar.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {webinar.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  {webinar.students}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                  {webinar.submitted}
                </div>
              </div>
              
              <button 
                onClick={onCreateAssignment}
                className="w-full py-2.5 bg-[#1B2538] hover:bg-[#0F172A] text-white text-[13px] font-bold rounded-lg transition-colors flex justify-center items-center gap-2 mt-auto"
              >
                + Create Assignment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
