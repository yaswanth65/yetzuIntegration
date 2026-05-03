"use client";

import React, { useEffect, useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
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

  // Filter tickets locally
  const filteredTickets = tickets.filter((ticket: any) => {
    if (statusFilter && ticket.status !== statusFilter) return false;
    if (priorityFilter && ticket.priority !== priorityFilter) return false;
    if (searchTerm && !ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <p className="text-gray-500">Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Tickets</h1>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD] text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD] text-sm"
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
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD] text-sm"
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
        showActions={true}
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
  );
}
