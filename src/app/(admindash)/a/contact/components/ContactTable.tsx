import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { useGetContacts } from "@/lib/queries/formService/useFormService";
import { asArray } from "@/lib/api";

interface ContactTableProps {
  onViewClick: (contactData: any) => void;
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const cfg: Record<string, { bg: string; text: string }> = {
    Pending: { bg: "bg-[#EFF6FF]", text: "text-[#1447E6]" },
    Resolved: { bg: "bg-[#ECFDF5]", text: "text-[#007A55]" },
    Closed: { bg: "bg-[#F3F4F6]", text: "text-[#717182]" },
  };
  const c = cfg[status] || cfg.Closed;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded ${c.bg} ${c.text}`}
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", lineHeight: "16px", letterSpacing: "0.0644531px" }}
    >
      {normalized === "closed" ? "Closed" : status}
    </span>
  );
}

export default function ContactTable({ onViewClick }: ContactTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useGetContacts();
  const contactData = asArray(data?.data || data?.contacts || data || []);

  const filteredContacts = contactData.filter((item: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (item.name || '').toLowerCase().includes(query) ||
      (item.email || '').toLowerCase().includes(query) ||
      (item.mobile || '').toLowerCase().includes(query)
    );
  });

  const gridCols = "grid-cols-[130px_1.5fr_1fr_1.8fr_110px_90px]";
  const columns = [
    { key: "date", label: "Submitted" },
    { key: "user", label: "User" },
    { key: "inquiry", label: "Inquiry" },
    { key: "message", label: "Message" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  return (
    <div className="border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b border-[rgba(0,0,0,0.1)]">
        <div className="relative" style={{ width: "320px" }}>
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]" strokeWidth={1.5} />
          <input 
            type="text" 
            placeholder="Search name, email, phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[rgba(10,10,10,0.5)] focus:outline-none"
            style={{ height: "39px", fontFamily: "'Inter', sans-serif" }}
          />
        </div>
      </div>

      {/* Header */}
      <div
        className={`grid ${gridCols} items-center bg-[#F8F9FA] border-b border-[rgba(0,0,0,0.1)]`}
        style={{ height: "45.5px" }}
      >
        {columns.map((col) => (
          <div key={col.key} className="flex items-center px-4 h-full">
            <span
              className="text-[14px] font-medium text-[#717182]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
            >
              {col.label}
            </span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="divide-y divide-[rgba(0,0,0,0.1)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-[#717182] text-sm">
            Loading contacts...
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-[#717182] text-sm">
            No contact submissions found
          </div>
        ) : filteredContacts.map((item: any, index: number) => (
          <div
            key={item.id || item._id || index}
            className={`grid ${gridCols} items-center transition-colors hover:bg-gray-50 cursor-pointer`}
            style={{ height: "46px" }}
            onClick={() => onViewClick(item)}
          >
            <div className="flex items-center px-4">
              <span
                className="text-[14px] text-[#717182]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
              >
                {item.createdAt || item.created_at ? new Date(item.createdAt || item.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex items-center px-4">
              <span
                className="text-[14px] text-[#0A0A0A] truncate"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
                title={`${item.name || 'N/A'} - ${item.email || 'N/A'}`}
              >
                {item.name || 'N/A'}
              </span>
            </div>
            <div className="flex items-center px-4">
              <span
                className="text-[14px] text-[#717182] truncate"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
              >
                {item.subject || 'General'}
              </span>
            </div>
            <div className="flex items-center px-4">
              <span
                className="text-[14px] text-[#717182] truncate"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
              >
                {item.description || 'No message'}
              </span>
            </div>
            <div className="flex items-center px-4">
              <StatusBadge status={
                item.reply_message || item.reply_sent_at || item.replyMessage || item.replySentAt
                  ? "Closed"
                  : item.status || 'Pending'
              } />
            </div>
            <div className="flex items-center px-4">
              <button
                onClick={(e) => { e.stopPropagation(); onViewClick(item); }}
                className="flex items-center justify-center w-7 h-7 text-[#717182] hover:text-[#042BFD] hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye size={14} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
