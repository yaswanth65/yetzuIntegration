"use client";

import React, { useEffect, useState } from "react";
import { Ticket, Loader2 } from "lucide-react";
import { StudentAPI } from "@/lib/api";
import { asArray } from "@/lib/api";

// --- HELPERS ---
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "in_review":
    case "in review":
      return (
        <span className="inline-flex items-center bg-[#FFFBEB] text-[#D97706] px-3 py-1 rounded-full text-[12px] font-medium">
          In Review
        </span>
      );
    case "resolved":
      return (
        <span className="inline-flex items-center bg-[#ECFDF5] text-[#059669] px-3 py-1 rounded-full text-[12px] font-medium">
          Resolved
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center bg-[#FEE2E2] text-[#DC2626] px-3 py-1 rounded-full text-[12px] font-medium">
          Rejected
        </span>
      );
    case "open":
      return (
        <span className="inline-flex items-center bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full text-[12px] font-medium">
          Open
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

const getPriorityBadge = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return (
        <span className="inline-flex items-center bg-red-100 text-red-700 px-2 py-1 rounded-full text-[11px] font-medium">
          High
        </span>
      );
    case "medium":
      return (
        <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-[11px] font-medium">
          Medium
        </span>
      );
    case "low":
      return (
        <span className="inline-flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-[11px] font-medium">
          Low
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-[11px] font-medium">
          {priority}
        </span>
      );
  }
};

interface Ticket {
  id: string;
  _id?: string;
  subject: string;
  status: string;
  priority: string;
  createdAt?: string;
  created_at?: string;
}

export default function StudentTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTickets = async () => {
    try {
      const res = await StudentAPI.getTickets();
      const ticketsList = asArray(res?.data || res?.tickets || res);
      setTickets(ticketsList);
    } catch (error) {
      console.error("Failed to load tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      await StudentAPI.createTicket({ subject, description, priority });
      setSubject("");
      setDescription("");
      setPriority("medium");
      setShowForm(false);
      loadTickets();
    } catch (error) {
      console.error("Failed to create ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDate = (ticket: Ticket) => {
    const dateStr = ticket.createdAt || ticket.created_at;
    return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
  };

  if (isLoading) {
    return (
      <div className="w-full bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#6366F1]" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] font-sans">
      {/* --- FULL WIDTH WHITE HEADER --- */}
      <div className="bg-white px-6 md:px-10 py-4 border-b border-gray-200 shrink-0">
        <div>
          <h1 className="text-[26px] font-bold text-gray-900 mb-1">My Tickets</h1>
          <p className="text-[14px] text-gray-500">View and manage your support tickets</p>
        </div>
      </div>

      {/* --- MAIN GRAY CONTENT AREA --- */}
      <div className="p-4 md:p-10">
        {/* --- TOP ACTION CARD --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col h-full">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4 shrink-0">
              <Ticket size={20} className="text-[#6366F1]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Raise a Support Ticket</h3>
            <p className="text-[13px] text-gray-500 mb-6 leading-relaxed flex-1">
              Open a new request for technical or platform assistance.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-[14px] py-2.5 rounded-lg transition-colors"
            >
              {showForm ? "Cancel" : "Open Ticket"}
            </button>
          </div>
        </div>

        {/* --- TICKET FORM --- */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 mb-8">
            <h2 className="text-[16px] font-bold text-gray-900 mb-4">Raise New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of the issue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about your issue..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-[#6366F1] text-white px-6 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors disabled:opacity-50 text-sm font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Ticket size={16} />
                    Create Ticket
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* --- TICKETS TABLE --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-[16px] font-bold text-gray-900">All Tickets</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Ticket ID</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Subject</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Priority</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Status</th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Created On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No tickets found</p>
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket, index) => {
                    const ticketId = ticket.id || ticket._id || `T-${index}`;
                    return (
                      <tr key={ticketId} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-6 text-[14px] text-gray-600">{ticketId}</td>
                        <td className="py-5 px-6 text-[14px] text-gray-600 font-medium">{ticket.subject}</td>
                        <td className="py-5 px-6">{getPriorityBadge(ticket.priority)}</td>
                        <td className="py-5 px-6">{getStatusBadge(ticket.status)}</td>
                        <td className="py-5 px-6 text-[14px] text-gray-600">{getDate(ticket)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
