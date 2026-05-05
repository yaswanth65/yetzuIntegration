import React, { useState } from "react";
import { AlertCircle, CheckCircle, Clock, MessageSquare, Eye, Ticket, Loader2 } from "lucide-react";

interface Ticket {
  id: string;
  _id?: string;
  subject: string;
  status: string;
  priority: string;
  createdAt?: string;
  created_at?: string;
  userName?: string;
  from?: string;
}

interface TicketTableProps {
  tickets: Ticket[];
  onView: (ticket: Ticket) => void;
  onResolve?: (ticketId: string, comment?: string) => void | Promise<void>;
  onStatusChange?: (ticketId: string, newStatus: string) => void | Promise<void>;
  showActions?: boolean;
  isAdmin?: boolean;
}

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "resolved":
      return (
        <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-[12px] font-medium">
          Resolved
        </span>
      );
    case "open":
      return (
        <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[12px] font-medium">
          Open
        </span>
      );
    case "in_review":
    case "in review":
      return (
        <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[12px] font-medium">
          In Review
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full text-[12px] font-medium">
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[12px] font-medium">
          {status}
        </span>
      );
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high": return "bg-red-100 text-red-700";
    case "medium": return "bg-yellow-100 text-yellow-700";
    case "low": return "bg-green-100 text-green-700";
    default: return "bg-gray-100 text-gray-600";
  }
};

const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in_review", label: "In Review" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

export default function TicketTable({ tickets, onView, onResolve, onStatusChange, showActions = false, isAdmin = false }: TicketTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getDate = (ticket: Ticket) => {
    const dateStr = ticket.createdAt || ticket.created_at;
    return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    if (!onStatusChange) return;
    setUpdatingId(ticketId);
    try {
      await onStatusChange(ticketId, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            {showActions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 6 : 5} className="px-6 py-12 text-center">
                <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No tickets found</p>
              </td>
            </tr>
          ) : (
            tickets.map((ticket: Ticket) => {
              const ticketId = ticket.id || ticket._id || "";
              const isUpdating = updatingId === ticketId;
              return (
                <tr key={ticketId} className="hover:bg-gray-50 cursor-pointer" onClick={() => onView(ticket)}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ticket.userName || ticket.from || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    {isAdmin ? (
                      <div className="relative">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticketId, e.target.value)}
                          disabled={isUpdating}
                          className="text-xs font-medium px-3 py-1 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#042BFD] cursor-pointer disabled:opacity-50"
                          style={{
                            backgroundColor: ticket.status === 'resolved' ? '#ECFDF5' :
                                           ticket.status === 'open' ? '#EFF6FF' :
                                           ticket.status === 'in_review' ? '#FFFBEB' :
                                           ticket.status === 'rejected' ? '#FEE2E2' : '#F3F4F6',
                            color: ticket.status === 'resolved' ? '#059669' :
                                   ticket.status === 'open' ? '#2563EB' :
                                   ticket.status === 'in_review' ? '#D97706' :
                                   ticket.status === 'rejected' ? '#DC2626' : '#4B5563'
                          }}
                        >
                          {STATUS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        {isUpdating && (
                          <Loader2 size={14} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-gray-500" />
                        )}
                      </div>
                    ) : (
                      getStatusBadge(ticket.status)
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{getDate(ticket)}</td>
                  {showActions && (
                    <td className="px-6 py-4">
                      {ticket.status !== "resolved" && onResolve ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onResolve(ticketId, "");
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                        >
                          <CheckCircle size={12} /> Resolve
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 font-medium">Resolved</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
