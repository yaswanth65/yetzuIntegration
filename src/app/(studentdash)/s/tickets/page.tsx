"use client";

import React, { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { StudentAPI } from "@/lib/api";
import { asArray } from "@/lib/api";
import TicketTable from "@/components/tickets/TicketTable";
import TicketModal from "@/components/tickets/TicketModal";
import TicketForm from "@/components/tickets/TicketForm";

export default function StudentTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleSubmit = async (data: { subject: string; description: string; priority: string }) => {
    setIsSubmitting(true);
    try {
      await StudentAPI.createTicket(data);
      setShowForm(false);
      loadTickets();
    } catch (error) {
      console.error("Failed to create ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleView = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-gray-500">Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#042BFD] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Create Ticket
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-6">
          <h2 className="text-lg font-bold mb-4">Raise New Ticket</h2>
          <TicketForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      )}

      <TicketTable
        tickets={tickets}
        onView={handleView}
        showActions={false}
      />

      {showModal && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
