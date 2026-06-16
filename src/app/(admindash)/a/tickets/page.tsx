"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { AdminAPI } from "@/lib/api";
import { asArray } from "@/lib/api";
import TicketTable from "@/components/tickets/TicketTable";
import TicketModal from "@/components/tickets/TicketModal";

const toUserName = (value: any) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return String(value.name || value.full_name || value.displayName || value.email || value.mobileno || value.role || value.id || "");
  }
  return String(value);
};

const normalizeTicket = (ticket: any) => ({
  ...ticket,
  subject: String(ticket?.subject || ticket?.title || "Untitled Ticket"),
  description: typeof ticket?.description === "string" ? ticket.description : String(ticket?.description || ""),
  status: String(ticket?.status || "open"),
  priority: String(ticket?.priority || "medium"),
  userName: toUserName(ticket?.userName || ticket?.from || ticket?.user),
  from: toUserName(ticket?.from || ticket?.user),
  comment: typeof ticket?.comment === "string" ? ticket.comment : String(ticket?.comment || ""),
  createdAt: String(ticket?.createdAt || ticket?.created_at || ticket?.created_on || ""),
  created_at: String(ticket?.created_at || ticket?.createdAt || ticket?.created_on || ""),
});

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showPanel, setShowPanel] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadTickets = async () => {
    try {
      const res = await AdminAPI.getTickets();
      const ticketsList = asArray(res?.data || res?.tickets || res);
      setTickets(ticketsList.map(normalizeTicket));
    } catch (error) {
      console.error("Failed to load tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleView = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowPanel(true);
  };

  const handleResolve = async (ticketId: string, comment?: string) => {
    try {
      await AdminAPI.updateTicket(ticketId, { status: "resolved", comment });
      setShowPanel(false);
      loadTickets();
    } catch (error) {
      console.error("Failed to resolve ticket:", error);
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      await AdminAPI.updateTicket(ticketId, { status: newStatus });
      loadTickets();
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  // Filter tickets locally
  const filteredTickets = tickets.filter((ticket: any) => {
    if (statusFilter && ticket.status !== statusFilter) return false;
    if (priorityFilter && ticket.priority !== priorityFilter) return false;
    if (searchTerm && !ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-[#6366F1]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="pb-6">
        <div className="flex items-center justify-between">
          <div>
           <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Tickets</h1>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="pb-6">
        <div className="flex items-center gap-3">
          <div className="relative" style={{ width: "320px" }}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[rgba(10,10,10,0.5)] focus:outline-none"
              style={{ height: "39px", fontFamily: "'Inter', sans-serif" }}
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-3 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#525866] focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_review">In Review</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none px-3 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#525866] focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 pb-8">
        <TicketTable
          tickets={filteredTickets}
          onView={handleView}
          onResolve={handleResolve}
          onStatusChange={handleStatusChange}
          showActions={true}
          isAdmin={true}
        />
      </div>

      {/* Panel Overlay */}
      {showPanel && (
        <>
          <div 
            className="fixed inset-0 bg-[#021165]/40 backdrop-blur-sm z-[60] transition-opacity"
            onClick={() => setShowPanel(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-500">
            <TicketModal
              ticket={selectedTicket}
              onClose={() => setShowPanel(false)}
              onResolve={handleResolve}
            />
          </div>
        </>
      )}
    </div>
  );
}
