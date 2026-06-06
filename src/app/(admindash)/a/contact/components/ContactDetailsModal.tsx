import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useQueryClient } from "@tanstack/react-query";
import { useCreateContact, useDeleteContact } from "@/lib/queries/formService/useFormService";
import { asArray } from "@/lib/api";
import { toast } from "react-hot-toast";

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactData: any | null;
}

export default function ContactDetailsModal({ isOpen, onClose, contactData }: ContactDetailsModalProps) {
  const [replyMessage, setReplyMessage] = useState("");
  const queryClient = useQueryClient();
  const createContact = useCreateContact();
  const deleteContact = useDeleteContact();

  if (!isOpen || !contactData) return null;

  const attemptReply = async () => {
    await createContact.mutateAsync({
      name: "Admin",
      email: contactData.email || "N/A",
      subject: contactData.subject ? `Re: ${contactData.subject}` : "Reply",
      mobile: contactData.mobile || "N/A",
      medical_school_affiliation: contactData.medical_school_affiliation || "N/A",
      description: replyMessage.trim(),
    });
    toast.success("Reply sent successfully");
    setReplyMessage("");
    queryClient.invalidateQueries({ queryKey: ["adminContacts"] });
    onClose();
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      await attemptReply();
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "";
      const isDuplicate = message.toLowerCase().includes("already exists") || message.toLowerCase().includes("duplicate");

      if (isDuplicate) {
        try {
          toast.loading("Removing duplicate contacts...", { id: "dedup-contacts" });
          const contactsCache: any = queryClient.getQueryData(["adminContacts"]);
          const allContacts = asArray(contactsCache?.data || contactsCache?.contacts || contactsCache || []);
          const email = contactData.email || "";
          const currentId = contactData.id || contactData._id || "";

          const toDelete = allContacts.filter(
            (c: any) => (c.email || "").toLowerCase() === email.toLowerCase()
          );

          for (const c of toDelete) {
            await deleteContact.mutateAsync(c.id || c._id);
          }

          toast.success("Duplicate contacts removed. Retrying reply...", { id: "dedup-contacts" });
          await attemptReply();
        } catch (deleteError: any) {
          toast.error("Failed to remove duplicate contacts. Please try again.", { id: "dedup-contacts" });
        }
      } else {
        toast.error(message || "Failed to send reply");
      }
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-semibold text-gray-500 mb-2">Contact Query</div>
        <h2 className="text-xl font-bold text-gray-900 pr-8">
          {contactData.name || contactData.user?.name || 'N/A'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {contactData.email || contactData.user?.email || 'N/A'}
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Inquiry Type & Submitted */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Inquiry Type</div>
            <div className="text-sm font-bold text-gray-900">{contactData.subject || contactData.inquiry || 'General'}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Submitted</div>
            <div className="text-sm font-bold text-gray-900">
              {contactData.createdAt || contactData.created_at || contactData.submittedDate
                ? new Date(contactData.createdAt || contactData.created_at).toLocaleDateString()
                : 'N/A'}
            </div>
          </div>
        </div>

        {/* Phone & Institution */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</div>
            <div className="text-sm font-bold text-gray-900">{contactData.mobile || contactData.user?.phone || 'N/A'}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Institution</div>
            <div className="text-sm font-bold text-gray-900">{contactData.medical_school_affiliation || contactData.user?.institution || 'N/A'}</div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</div>
          <p className="text-sm text-gray-900 leading-relaxed font-medium">{contactData.description || contactData.message || 'No message'}</p>
        </div>

        {/* Reply Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Reply</h3>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Type your reply message..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none font-medium"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendReply}
              disabled={createContact.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F172B] hover:bg-blue-500 disabled:bg-slate-400 text-white rounded-lg text-sm font-bold transition-colors"
            >
              {createContact.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {createContact.isPending ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
