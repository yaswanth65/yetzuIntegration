"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Assignment } from '../types';
import { DownloadCloud, Eye, CheckCircle2, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface AssignmentListProps {
  assignments: Assignment[];
  loading?: boolean;
}

const ITEMS_PER_PAGE = 10;

export default function AssignmentList({ assignments, loading: externalLoading }: AssignmentListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [internalLoading] = useState(false);

  const totalPages = Math.ceil(assignments.length / ITEMS_PER_PAGE);
  
  const paginatedAssignments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return assignments.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, assignments]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  const loading = internalLoading || externalLoading;

  if (loading && assignments.length === 0) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-2 md:p-6 mt-6">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Loading assignments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-2 md:p-6 mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
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
                <td colSpan={8} className="text-center py-12 text-gray-500">
                  <p className="text-lg font-medium">No assignments found</p>
                  <p className="text-sm text-gray-400 mt-1">Create your first assignment to get started</p>
                </td>
              </tr>
            ) : (
              paginatedAssignments.map((assignment, index) => (
                <tr
                  key={assignment.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    index === paginatedAssignments.length - 1 ? 'border-none' : ''
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

      {assignments.length > 0 && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <span>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, assignments.length)} of {assignments.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl font-medium transition-colors ${
                  currentPage === page 
                    ? 'bg-[#111827] text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}