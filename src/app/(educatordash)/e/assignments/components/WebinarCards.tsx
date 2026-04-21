import React from 'react';
import { Calendar, Clock, Users, CloudUpload, PlusCircle } from 'lucide-react';

interface WebinarCardsProps {
  onCreateAssignment: (webinar: { title: string, subtitle: string }) => void;
}

export default function WebinarCards({ onCreateAssignment }: WebinarCardsProps) {
  const webinars = [
    {
      id: 1,
      title: 'Writing a Publication-Ready Research Manuscript',
      subtitle: 'Feb 2025 - Research Writing Batch',
      assignmentsCount: 1,
      date: 'Feb 10, 2025',
      duration: '2 Hours',
      students: 14,
      uploaded: '06/14',
    },
    {
      id: 2,
      title: 'Writing a Publication-Ready Research Manuscript',
      subtitle: 'Feb 2025 - Research Writing Batch',
      assignmentsCount: 1,
      date: 'Feb 10, 2025',
      duration: '2 Hours',
      students: 14,
      uploaded: '06/14',
    },
    {
      id: 3,
      title: 'Writing a Publication-Ready Research Manuscript',
      subtitle: 'Feb 2025 - Research Writing Batch',
      assignmentsCount: 1,
      date: 'Feb 10, 2025',
      duration: '2 Hours',
      students: 14,
      uploaded: '06/14',
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-gray-900 mb-1">My Webinars</h2>
        <p className="text-gray-500 text-[13px]">Define what students can track based on their class</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinars.map((webinar) => (
          <div key={webinar.id} className="bg-white rounded-[12px] p-5 border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[15px] font-bold text-gray-900 leading-tight pr-4">{webinar.title}</h3>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap">
                {webinar.assignmentsCount} Assignment{webinar.assignmentsCount > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-gray-500 text-[13px] mb-5">{webinar.subtitle}</p>

            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-center text-gray-600 text-[13px]">
                <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                {webinar.date}
              </div>
              <div className="flex items-center text-gray-600 text-[13px]">
                <Clock className="w-4 h-4 mr-3 text-gray-400" />
                {webinar.duration}
              </div>
              <div className="flex items-center text-gray-600 text-[13px]">
                <Users className="w-4 h-4 mr-3 text-gray-400" />
                {webinar.students} Students
              </div>
              <div className="flex items-center text-gray-600 text-[13px]">
                <CloudUpload className="w-4 h-4 mr-3 text-gray-400" />
                Uploaded: {webinar.uploaded}
              </div>
            </div>

            <button 
              onClick={() => onCreateAssignment(webinar)}
              className="w-full flex items-center justify-center gap-2 bg-[#1B2538] hover:bg-[#0F172A] text-white py-2.5 rounded-lg text-[13px] font-medium transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Create Assignment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
