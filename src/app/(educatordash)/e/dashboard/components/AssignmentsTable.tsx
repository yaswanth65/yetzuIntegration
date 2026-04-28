"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Eye, Download, CheckCircle2, Clock, XCircle, MinusCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { EducatorAPI, asArray } from '@/lib/api';

interface DashboardAssignment {
  id: string;
  assignmentId: string;
  type: string;
  studentName: string;
  issued: string;
  due: string;
  status: string;
  actions: string[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Submitted':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#10B981] rounded-full border border-[#D1FAE5] bg-white">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          Submitted
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#D97706] rounded-full border border-[#FEF3C7] bg-white">
          <Clock className="w-3.5 h-3.5 text-[#D97706]" />
          Pending
        </span>
      );
    case 'Failed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#EF4444] rounded-full border border-[#FEE2E2] bg-white">
          <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />
          Failed
        </span>
      );
    case 'Cancelled':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#6B7280] rounded-full border border-[#E5E7EB] bg-white">
          <MinusCircle className="w-3.5 h-3.5 text-[#6B7280]" />
          Cancelled
        </span>
      );
    default:
      return null;
  }
};

const ITEMS_PER_PAGE = 8;

export default function AssignmentsTable() {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<DashboardAssignment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await EducatorAPI.getAssignments();
        const data = asArray(response);
        if (data.length > 0) {
          const mapped = data.map((item: any, idx: number) => ({
            id: item.id || String(idx),
            assignmentId: item.assignmentId || item.id || `INV-2024-${String(idx + 1).padStart(3, '0')}`,
            type: item.type || item.sessionType || 'Webinar',
            studentName: item.studentName || item.student?.name || item.assignedToName || 'Student',
            issued: item.issuedDate || item.createdAt || new Date().toLocaleDateString(),
            due: item.dueDate || item.deadline || 'TBD',
            status: item.status === 'submitted' || item.status === 'Submitted' ? 'Submitted' : 
                   item.status === 'reviewed' || item.status === 'Review Done' ? 'Submitted' : 'Pending',
            actions: item.status === 'Pending' || item.status === 'pending' ? ['review'] : ['view', 'download']
          }));
          setAssignments(mapped);
        }
      } catch {
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

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

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden mt-6 mb-8">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Loading assignments...</span>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden mt-6 mb-8">
        <div className="flex flex-col items-center justify-center h-48">
          <p className="text-gray-500 text-sm">No assignments found</p>
          <p className="text-gray-400 text-xs mt-1">Create your first assignment to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden mt-6 mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="sticky top-0 bg-[#FAFAFA] z-10">
            <tr className="bg-[#FAFAFA] border-b border-gray-100">
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Assignment ID</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Session Type</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Issued</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedAssignments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-[#3B82F6] font-semibold text-xs">{item.assignmentId}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium">
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold text-xs">{item.studentName}</span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">{item.issued}</td>
                <td className="px-6 py-4 text-gray-500 text-xs">{item.due}</td>
                <td className="px-6 py-4">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 text-right">
                  {item.actions.includes("review") ? (
                    <div className="flex justify-end">
                      <button className="px-4 py-1.5 text-xs font-medium text-gray-800 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        Review Now
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
        <p>Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, assignments.length)} of {assignments.length} assignments</p>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-semibold text-xs ${
                currentPage === page 
                  ? 'bg-[#111827] text-white' 
                  : 'text-gray-600 bg-white border border-transparent hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
