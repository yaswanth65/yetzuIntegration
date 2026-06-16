import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteContact } from "@/lib/queries/formService/useFormService";
import { asArray, AdminAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactData: any | null;
}

export default function ContactDetailsModal({ isOpen, onClose, contactData }: ContactDetailsModalProps) {
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const queryClient = useQueryClient();
  const deleteContact = useDeleteContact();

  if (!isOpen || !contactData) return null;

  const ticketId = contactData.id || contactData._id || "";
  const hasReply = Boolean(
    contactData.reply_message ||
    contactData.reply_sent_at ||
    contactData.replyMessage ||
    contactData.replySentAt
  );
  const displayStatus = hasReply ? "Closed" : String(contactData.status || "Pending");

  const attemptReply = async () => {
    const subject = replySubject.trim();
    const message = replyMessage.trim();

    const payload = {
      replySubject: subject,
      replyMessage: message,
      reply_subject: subject,
      reply_message: message,
    };

    await AdminAPI.replyToContact(ticketId, payload);
    toast.success("Reply sent successfully");
    setReplyMessage("");
    setReplySubject("");
    setErrorMessage("");
    queryClient.invalidateQueries({ queryKey: ["adminContacts"] });
    onClose();
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      const message = "Please enter a reply message";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsSending(true);
    try {
      await attemptReply();
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to send reply";
      setErrorMessage(message);
      const isDuplicate = message.toLowerCase().includes("already exists") || message.toLowerCase().includes("duplicate");

      if (isDuplicate) {
        try {
          toast.loading("Removing duplicate contacts...", { id: "dedup-contacts" });
          const contactsCache: any = queryClient.getQueryData(["adminContacts"]);
          const allContacts = asArray(contactsCache?.data || contactsCache?.contacts || contactsCache || []);
          const email = contactData.email || "";

          const toDelete = allContacts.filter(
            (c: any) => (c.email || "").toLowerCase() === email.toLowerCase()
          );

          for (const c of toDelete) {
            await deleteContact.mutateAsync(c.id || c._id);
          }

          toast.success("Duplicate contacts removed. Retrying reply...", { id: "dedup-contacts" });
          await attemptReply();
        } catch (deleteError: any) {
          const dedupError = "Failed to remove duplicate contacts. Please try again.";
          setErrorMessage(dedupError);
          toast.error(dedupError, { id: "dedup-contacts" });
        }
      } else {
        toast.error(message || "Failed to send reply");
      }
    } finally {
      setIsSending(false);
    }
  };

  const submittedAt = contactData.createdAt || contactData.created_at || contactData.submittedDate;

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
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</div>
            <div className="text-sm font-bold text-gray-900">
              {displayStatus}
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

        {!hasReply ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Reply</h3>
            <input
              type="text"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
              placeholder={contactData.subject ? `Re: ${contactData.subject}` : "Reply subject (optional)"}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 font-medium"
            />
            <textarea
              value={replyMessage}
              onChange={(e) => {
                setReplyMessage(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="Type your reply message..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none font-medium"
            />
            {errorMessage && (
              <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                disabled={isSending}
                className="flex items-center gap-2 px-4 py-2 bg-[#0F172B] hover:bg-blue-500 disabled:bg-slate-400 text-white rounded-lg text-sm font-bold transition-colors"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Reply</h3>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Subject</div>
              <div className="text-sm font-semibold text-gray-900">{contactData.reply_subject || contactData.replySubject || 'Replied'}</div>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Message</div>
              <div className="text-sm text-gray-900 leading-relaxed font-medium">{contactData.reply_message || contactData.replyMessage || 'No reply message'}</div>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Replied On</div>
              <div className="text-sm text-gray-900 leading-relaxed font-medium">
                {contactData.reply_sent_at ? new Date(contactData.reply_sent_at).toLocaleString() : 'N/A'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
