"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Search, Filter } from "lucide-react";
import { AdminAPI } from "@/lib/api";
import { asArray } from "@/lib/api";
import TicketTable from "@/components/tickets/TicketTable";
import TicketModal from "@/components/tickets/TicketModal";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadTickets = async () => {
    try {
      const res = await AdminAPI.getTickets();
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

  const handleView = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleResolve = async (ticketId: string, comment?: string) => {
    try {
      await AdminAPI.updateTicket(ticketId, { status: "resolved", comment });
      setShowModal(false);
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
    <div className="font-sans flex flex-col">
      {/* --- FULL WIDTH WHITE HEADER --- */}
      <div className="bg-white px-6 md:px-10 py-4 border-b border-gray-200 shrink-0">
        <div>
          <h1 className="text-2xl font-medium text-[#021165] sm:text-3xl md:text-4xl">Manage Tickets</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage all support tickets</p>
        </div>
      </div>

      {/* --- MAIN GRAY CONTENT AREA --- */}
      <div className="flex-1 p-4 md:p-10 w-full">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm min-w-[150px]"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_review">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm min-w-[150px]"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Table */}
        <TicketTable
          tickets={filteredTickets}
          onView={handleView}
          onResolve={handleResolve}
          onStatusChange={handleStatusChange}
          showActions={true}
          isAdmin={true}
        />

        {/* Modal */}
        {showModal && (
          <TicketModal
            ticket={selectedTicket}
            onClose={() => setShowModal(false)}
            onResolve={handleResolve}
          />
        )}
      </div>
    </div>
  );
}
