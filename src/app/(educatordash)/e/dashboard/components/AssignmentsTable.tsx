import React from 'react';
import { Eye, Download, CheckCircle2, Clock, XCircle, MinusCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const assignments = [
  {
    id: "INV-2024-001",
    type: "Webinar",
    session: "Thesis Chapter 3 - Literature Review",
    issued: "15 Jan 2024",
    due: "22 Jan 2024",
    status: "Submitted",
    actions: ["view", "download"]
  },
  {
    id: "INV-2024-002",
    type: "Cohort",
    session: "Research Paper Draft - Social Sciences",
    issued: "20 Jan 2024",
    due: "27 Jan 2024",
    status: "Submitted",
    actions: ["view", "download"]
  },
  {
    id: "INV-2024-003",
    type: "Mentorship",
    session: "Career Strategy Session - PhD Applicants",
    issued: "01 Feb 2024",
    due: "08 Feb 2024",
    status: "Pending",
    actions: ["review"]
  },
  {
    id: "INV-2024-004",
    type: "Cohort",
    session: "Academic Writing Masterclass",
    issued: "05 Feb 2024",
    due: "12 Feb 2024",
    status: "Submitted",
    actions: ["view", "download"]
  },
  {
    id: "INV-2024-005",
    type: "Mentorship",
    session: "MBA Application Essay - Business School",
    issued: "10 Feb 2024",
    due: "17 Feb 2024",
    status: "Failed",
    actions: ["review"]
  },
  {
    id: "INV-2024-006",
    type: "Webinar",
    session: "Literature Survey - Climate Change",
    issued: "15 Feb 2024",
    due: "22 Feb 2024",
    status: "Submitted",
    actions: ["view", "download"]
  },
  {
    id: "INV-2024-007",
    type: "Webinar",
    session: "PhD Guidance Session - Dissertation",
    issued: "20 Feb 2024",
    due: "27 Feb 2024",
    status: "Submitted",
    actions: ["view", "download"]
  },
  {
    id: "INV-2024-008",
    type: "Mentorship",
    session: "Statistics for Research - SPSS Basics",
    issued: "01 Mar 2024",
    due: "08 Mar 2024",
    status: "Cancelled",
    actions: ["view", "download"]
  }
];

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

export default function AssignmentsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden mt-6 mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100">
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Assignment ID</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Session Type</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Session</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Issued</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignments.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-[#3B82F6] font-semibold text-xs">{item.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium">
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold text-xs">{item.session}</span>
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
        <p>Showing 1-8 of 15 invoices</p>
        <div className="flex items-center gap-1.5">
          <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors bg-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white bg-[#111827] font-semibold text-xs">
            1
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 bg-white border border-transparent hover:bg-gray-50 font-semibold text-xs">
            2
          </button>
          <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors bg-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
