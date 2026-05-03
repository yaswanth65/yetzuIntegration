"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Clock, MessageSquare, AlertCircle, CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { AdminAPI, asArray } from "@/lib/api";
import { shortenId } from "@/lib/utils/shortenId";

type Priority = "High" | "Medium" | "Low";
type Status = "In Review" | "Submitted" | "Completed" | "Rejected";

interface SupportItem {
  id: string;
  description: string;
  priority: Priority;
  raisedOn: string;
  status: Status;
}

const getPriorityStyles = (priority: Priority) => {
  switch (priority) {
    case "High": return "bg-red-50 text-red-600 ring-1 ring-red-100";
    case "Medium": return "bg-amber-50 text-amber-600 ring-1 ring-amber-100";
    case "Low": return "bg-blue-50 text-blue-600 ring-1 ring-blue-100";
  }
};

const getStatusStyles = (status: Status) => {
  switch (status) {
    case "In Review": return { color: "text-orange-600", bg: "bg-orange-50", icon: Clock };
    case "Submitted": return { color: "text-blue-600", bg: "bg-blue-50", icon: MessageSquare };
    case "Completed": return { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 };
    case "Rejected": return { color: "text-gray-500", bg: "bg-gray-50", icon: XCircle };
  }
};

export default function SupportTickets() {
  const router = useRouter();
  const [supportItems, setSupportItems] = useState<SupportItem[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await AdminAPI.getTickets({ page: 1, limit: 5 });
        setSupportItems(asArray(response).map((item: any, index: number) => ({
          id: item.ticketId || item.id || `TK-${index + 1}`,
          description: item.subject || item.description || "Support ticket",
          priority: String(item.priority || "Low").toLowerCase() === "high" ? "High" : String(item.priority || "").toLowerCase() === "medium" ? "Medium" : "Low",
          raisedOn: item.raisedOn || item.createdAt || item.created || "-",
          status: String(item.status || "").toLowerCase() === "completed" || String(item.status || "").toLowerCase() === "closed"
            ? "Completed"
            : String(item.status || "").toLowerCase() === "rejected"
              ? "Rejected"
              : String(item.status || "").toLowerCase() === "open"
                ? "Submitted"
                : "In Review",
        })));
      } catch {
        setSupportItems([]);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
      <div className="flex items-center justify-between p-6 sm:p-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 leading-none">Support Tickets</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Open Issues & Requests</p>
        </div>
        <Link href="/a/support" className="px-4 py-2 text-xs font-bold text-[#042BFD] bg-blue-50 hover:bg-blue-100 rounded-xl transition-all uppercase tracking-widest">
          View All
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-y border-gray-100">
              <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID</th>
              <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Description</th>
              <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Priority</th>
              <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {supportItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-8 text-center text-sm text-gray-500">No support tickets.</td>
              </tr>
            ) : supportItems.map((item) => {
              const status = getStatusStyles(item.status);
              const StatusIcon = status.icon;
              return (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group/row">
                  <td className="px-8 py-5 text-sm font-bold text-gray-900" title={item.id}>#{shortenId(item.id)}</td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-medium text-gray-600 line-clamp-1">{item.description}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">{item.raisedOn}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getPriorityStyles(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${status.bg} ${status.color}`}>
                      <StatusIcon size={12} />
                      {item.status}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => router.push(`/a/support/${item.id}`)}
                        className="p-2 text-gray-400 hover:text-[#042BFD] hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-50">
        {supportItems.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">No support tickets.</div>
        ) : supportItems.map((item) => {
          const status = getStatusStyles(item.status);
          const StatusIcon = status.icon;
          return (
            <div key={item.id} className="p-6 active:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#021165] bg-blue-50 px-2 py-1 rounded-lg" title={item.id}>#{shortenId(item.id)}</span>
                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getPriorityStyles(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-800 mb-2 leading-relaxed">{item.description}</p>
              <div className="flex items-center justify-between mt-4">
                 <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${status.bg} ${status.color}`}>
                    <StatusIcon size={10} />
                    {item.status}
                 </div>
                 <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                   {item.raisedOn}
                   <button className="p-1 text-gray-400">
                     <ChevronRight size={16} />
                   </button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
