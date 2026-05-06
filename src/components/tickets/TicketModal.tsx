import React, { useState } from "react";
import { X, Calendar, User, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Ticket {
  id: string;
  _id?: string;
  subject: string;
  description?: string;
  status: string;
  priority: string;
  createdAt?: string;
  created_at?: string;
  userName?: string;
  from?: string;
  comment?: string;
}

interface TicketModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  onResolve?: (ticketId: string, comment?: string) => void | Promise<void>;
}

export default function TicketModal({ ticket, onClose, onResolve }: TicketModalProps) {
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!ticket) return null;

  const ticketId = ticket.id || ticket._id;

  const handleResolve = async () => {
    if (!onResolve) return;
    setIsUpdating(true);
    try {
      // @ts-ignore - comment is string type, onResolve accepts string | undefined
      await onResolve(ticketId, comment);
      onClose();
    } catch (error) {
      console.error("Failed to resolve ticket:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
      case "closed":
        return <CheckCircle size={18} className="text-[#059669]" />;
      case "open":
        return <Clock size={18} className="text-[#2563EB]" />;
      case "in_review":
      case "in progress":
        return <AlertCircle size={18} className="text-[#D97706]" />;
      default:
        return <AlertCircle size={18} className="text-gray-400" />;
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

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-[16px] font-bold text-gray-900">Ticket Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Priority */}
          <div className="flex gap-6">
            <div>
              <p className="text-[14px] text-gray-500 mb-1">Status</p>
              <span className="flex items-center gap-2">
                {getStatusIcon(ticket.status)}
                <span className="text-[14px] capitalize font-medium text-gray-600">{ticket.status}</span>
              </span>
            </div>
            <div>
              <p className="text-[14px] text-gray-500 mb-1">Priority</p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>
          </div>

          {/* Subject */}
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Subject</p>
            <p className="text-[16px] font-bold text-gray-900">{ticket.subject}</p>
          </div>

          {/* Description */}
          {ticket.description && (
            <div>
              <p className="text-[14px] text-gray-500 mb-1">Description</p>
              <p className="text-[14px] text-gray-600 leading-relaxed">{ticket.description}</p>
            </div>
          )}

          {/* User Info */}
          {(ticket.userName || ticket.from) && (
            <div>
              <p className="text-[14px] text-gray-500 mb-1">From</p>
              <span className="flex items-center gap-2 text-[14px] text-gray-600">
                <User size={14} />
                {ticket.userName || ticket.from}
              </span>
            </div>
          )}

          {/* Date */}
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Created</p>
            <span className="flex items-center gap-2 text-[14px] text-gray-500">
              <Calendar size={14} />
              {new Date(ticket.createdAt || ticket.created_at || "").toLocaleString()}
            </span>
          </div>

          {/* Comment (if resolved) */}
          {ticket.comment && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-[14px] text-gray-500 mb-1">Resolution Comment</p>
              <p className="text-[14px] text-gray-600">{ticket.comment}</p>
            </div>
          )}

          {/* Resolve Section (Admin only) */}
          {onResolve && ticket.status !== "resolved" && ticket.status !== "closed" && (
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-[14px] font-bold text-gray-900 mb-2">
                Resolution Comment (Optional)
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment about the resolution..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD] text-[14px] text-gray-900"
              />
              <button
                onClick={handleResolve}
                disabled={isUpdating}
                className="mt-3 flex items-center gap-2 bg-[#6366F1] text-white px-4 py-2 rounded-lg hover:bg-[#4F46E5] transition-colors disabled:opacity-50 text-[14px] font-medium"
              >
                <CheckCircle size={16} />
                {isUpdating ? "Resolving..." : "Resolve Ticket"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
