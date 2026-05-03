import React from "react";
import { AlertCircle, CheckCircle, Clock, MessageSquare, Eye, Ticket } from "lucide-react";

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
  showActions?: boolean;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "resolved": return <CheckCircle size={16} className="text-green-500" />;
    case "open": return <Clock size={16} className="text-yellow-500" />;
    case "in_review": return <Eye size={16} className="text-blue-500" />;
    case "rejected": return <AlertCircle size={16} className="text-red-500" />;
    default: return <Ticket size={16} className="text-gray-400" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-700";
    case "medium": return "bg-yellow-100 text-yellow-700";
    case "low": return "bg-green-100 text-green-700";
    default: return "bg-gray-100 text-gray-600";
  }
};

export default function TicketTable({ tickets, onView, onResolve, showActions = false }: TicketTableProps) {
  const getDate = (ticket: Ticket) => {
    const dateStr = ticket.createdAt || ticket.created_at;
    return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            {showActions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 5 : 4} className="px-6 py-12 text-center">
                <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No tickets found</p>
              </td>
            </tr>
          ) : (
            tickets.map((ticket: Ticket) => {
              const ticketId = ticket.id || ticket._id;
              return (
                <tr key={ticketId} className="hover:bg-gray-50 cursor-pointer" onClick={() => onView(ticket)}>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <span className="text-sm capitalize">{ticket.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{getDate(ticket)}</td>
                  {showActions && (
                    <td className="px-6 py-4">
                      {ticket.status !== "resolved" && onResolve ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // @ts-ignore - onResolve accepts string | undefined
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
