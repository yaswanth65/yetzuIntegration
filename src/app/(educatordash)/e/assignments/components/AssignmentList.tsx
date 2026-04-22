import React from 'react';
import Link from 'next/link';
import { Assignment } from '../types';
import { DownloadCloud, Eye, CheckCircle2, Clock } from 'lucide-react';

interface AssignmentListProps {
  assignments: Assignment[];
}

export default function AssignmentList({ assignments }: AssignmentListProps) {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'Submitted':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50/50 text-green-600 text-xs font-semibold">
            <CheckCircle2 size={14} />
            Submitted
          </div>
        );
      case 'Pending':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50/50 text-yellow-600 text-xs font-semibold">
            <Clock size={14} />
            Pending
          </div>
        );
      case 'Review Done':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50/50 text-blue-600 text-xs font-semibold">
            <CheckCircle2 size={14} />
            Review Done
          </div>
        );
      default:
        return null;
    }
  };

  const getSessionTypeStyle = (type: string) => {
    return (
      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
        {type}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-2 md:p-6 mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100 uppercase tracking-wider">
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Assignment ID</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Session</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Student Name</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Session Type</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Due Date</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Status</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Submission Date</th>
              <th className="font-semibold py-4 px-4 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  No assignments found
                </td>
              </tr>
            ) : (
              assignments.map((assignment, index) => (
                <tr
                  key={assignment.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    index === assignments.length - 1 ? 'border-none' : ''
                  }`}
                >
                  <td className="py-4 px-4 text-sm font-medium text-blue-600 whitespace-nowrap">
                    {assignment.assignmentId}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {assignment.sessionTitle}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {assignment.studentName}
                  </td>
                  <td className="py-4 px-4 text-sm whitespace-nowrap">
                    {getSessionTypeStyle(assignment.sessionType)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">
                    {assignment.dueDate}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {getStatusDisplay(assignment.status)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">
                    {assignment.submissionDate}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3 min-w-[80px]">
                      <Link href={`/e/assignments/${assignment.id}`} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye size={18} />
                      </Link>
                      {assignment.hasDownload && (
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <DownloadCloud size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
        <span>
          Showing 1–8 of 15 invoices
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
            {'<'}
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white font-medium transition-colors">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 font-medium transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
