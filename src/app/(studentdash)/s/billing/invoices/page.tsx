"use client";

import React, { useEffect, useState } from "react";
import { 
  Search, 
  Eye, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText,
  X,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { StudentAPI, BillingAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

// --- MOCK DATA ---
const FALLBACK_INVOICES = [
  { id: "INV-2024-001", service: "Webinar", session: "Thesis Chapter 3 – Literature Review", issued: "15 Jan 2024", dueDate: "22 Jan 2024", amount: "₹4,130", status: "Paid", method: "Card" },
  { id: "INV-2024-002", service: "Cohort", session: "Research Paper Draft - Social", issued: "20 Jan 2024", dueDate: "27 Jan 2024", amount: "₹2,596", status: "Paid", method: "UPI" },
  { id: "INV-2024-003", service: "Mentorship", session: "Career Strategy Session – PhD", issued: "01 Feb 2024", dueDate: "08 Feb 2024", amount: "₹5,900", status: "Pending", method: "Net Banking" },
  { id: "INV-2024-004", service: "Cohort", session: "Academic Writing Masterclass", issued: "05 Feb 2024", dueDate: "12 Feb 2024", amount: "₹1,770", status: "Paid", method: "Card" },
  { id: "INV-2024-005", service: "Mentorship", session: "MBA Application Essay - Busir", issued: "10 Feb 2024", dueDate: "17 Feb 2024", amount: "₹4,956", status: "Failed", method: "Card" },
  { id: "INV-2024-006", service: "Webinar", session: "Literature Survey - Climate Ch", issued: "15 Feb 2024", dueDate: "22 Feb 2024", amount: "₹3,304", status: "Paid", method: "UPI" },
  { id: "INV-2024-007", service: "Webinar", session: "PhD Guidance Session - Disse", issued: "20 Feb 2024", dueDate: "27 Feb 2024", amount: "₹8,850", status: "Paid", method: "Net Banking" },
  { id: "INV-2024-008", service: "Mentorship", session: "Statistics for Research - SPSS", issued: "01 Mar 2024", dueDate: "08 Mar 2024", amount: "₹2,124", status: "Cancelled", method: "Card" },
];

// --- HELPERS ---
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return (
        <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#059669] px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#A7F3D0]">
          <CheckCircle2 size={12} strokeWidth={2.5} /> Paid
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1 bg-[#FFF7ED] text-[#EA580C] px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#FED7AA]">
          <Clock size={12} strokeWidth={2.5} /> Pending
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1 bg-[#FEF2F2] text-[#E11D48] px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#FECDD3]">
          <XCircle size={12} strokeWidth={2.5} /> Failed
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1 bg-[#F8FAFC] text-[#64748B] px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#E2E8F0]">
          <XCircle size={12} strokeWidth={2.5} /> Cancelled
        </span>
      );
    default:
      return null;
  }
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const perPage = 8;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        // Try overview API first (covers payment history)
        const overview = await StudentAPI.getDashboardOverview();
        const overviewData = overview?.data || overview;
        const paymentHistory = overviewData?.paymentHistory || overviewData?.payments || overviewData?.invoices || [];
        if (Array.isArray(paymentHistory) && paymentHistory.length > 0) {
          setInvoices(paymentHistory);
          return;
        }
      } catch {
        // fall through to BillingAPI
      }
      try {
        const res = await BillingAPI.getInvoices({ page: currentPage, limit: perPage });
        const list = res?.data?.list || res?.data?.invoices || res?.data || res?.list || res?.invoices || [];
        if (Array.isArray(list) && list.length > 0) {
          setInvoices(list);
          return;
        }
      } catch {
        // fall through to mock
      }
      console.warn("Invoice API unavailable, using fallback data");
      setInvoices(FALLBACK_INVOICES);
    };
    fetchInvoices();
  }, [currentPage]);

  const filtered = invoices.filter((inv) =>
    `${inv.id} ${inv.session} ${inv.service}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = async (invoiceId: string) => {
    setDownloadingId(invoiceId);
    try {
      const response = await BillingAPI.downloadInvoice(invoiceId);
      const blob = response?.data || response;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Invoice downloaded");
    } catch {
      toast.error("Download failed. Feature may not be available yet.");
    } finally {
      setDownloadingId(null);
    }
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedInvoice(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-[#F8F9FA] flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-[#042BFD]" />
      </div>
    );
  }

  return (
    <div className="font-sans relative">
      
      {/* --- FULL WIDTH WHITE HEADER --- */}
      <div className="bg-white px-6 md:px-10 py-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold text-gray-900 mb-1">Invoices</h1>
            <p className="text-[14px] text-gray-500">Complete record of all your sessions</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-[380px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search by invoice ID or session"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN GRAY CONTENT AREA --- */}
      <div className="p-6 md:px-10">
        
        {/* INVOICES TABLE */}
        <div className="bg-white rounded-[16px] border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-200">
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Session</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Issued</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-16 text-center text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  filtered.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50/60 transition-colors group">
                      <td 
                        className="py-4 px-6 text-[13px] whitespace-nowrap font-semibold text-[#042BFD] cursor-pointer hover:underline"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        {invoice.id}
                      </td>
                      <td className="py-4 px-6 text-[13px] text-gray-500">{invoice.service}</td>
                      <td className="py-4 px-6 text-[13px] font-bold text-gray-800 truncate max-w-[200px]">{invoice.session}</td>
                      <td className="py-4 px-6 text-[13px] text-gray-600">{invoice.issued}</td>
                      <td className="py-4 px-6 text-[13px] text-gray-600">{invoice.dueDate}</td>
                      <td className="py-4 px-6 text-[13px] font-bold text-gray-900">{invoice.amount}</td>
                      <td className="py-4 px-6">{getStatusBadge(invoice.status)}</td>
                      <td className="py-4 px-6 text-[13px] whitespace-nowrap text-gray-600">{invoice.method}</td>
                      <td className="py-4 px-6 flex items-center justify-end gap-3 h-full">
                        <button 
                          className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <Eye size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDownload(invoice.id)}
                          disabled={downloadingId === invoice.id}
                          className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-40"
                        >
                          <Download size={18} strokeWidth={1.5} />
                        </button>
                        {(invoice.status === "Pending" || invoice.status === "Failed") && (
                          <button className="ml-2 px-4 py-1.5 border border-gray-200 text-gray-700 rounded-[8px] text-[13px] font-semibold hover:bg-gray-50 transition-colors shrink-0 shadow-sm">
                            Pay now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
            <span className="text-[13px] text-gray-500 font-medium">
              Showing 1-{Math.min(perPage, filtered.length)} of {filtered.length} invoices
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.ceil(invoices.length / perPage) || 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium text-[13px] transition-colors ${
                    currentPage === i + 1
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(Math.ceil(invoices.length / perPage), p + 1))}
                disabled={currentPage >= Math.ceil(invoices.length / perPage)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- SLIDE-OVER MODAL (INVOICE DETAILS) --- */}
      {selectedInvoice && (
        <div 
          className="fixed inset-0 bg-black/30 z-50 flex justify-end"
          onClick={handleOverlayClick}
        >
          <div className="w-full max-w-[480px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-400" />
                  <span className="text-[14px] font-medium text-gray-600">{selectedInvoice.id}</span>
                  {getStatusBadge(selectedInvoice.status)}
                </div>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <h2 className="text-[20px] font-bold text-gray-900 leading-snug mb-1">
                {selectedInvoice.session}
              </h2>
              <p className="text-[14px] text-gray-500">{selectedInvoice.service}</p>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
              
              {/* Invoice Summary */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">Invoice Summary</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[12px] text-gray-500 mb-1">Invoice ID</p>
                    <p className="text-[14px] font-semibold text-gray-900">{selectedInvoice.id}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-500 mb-1">Service Type</p>
                    <p className="text-[14px] font-semibold text-gray-900">{selectedInvoice.service}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-500 mb-1">Issued Date</p>
                    <p className="text-[14px] font-semibold text-gray-900">{selectedInvoice.issued}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-500 mb-1">Due Date</p>
                    <p className="text-[14px] font-semibold text-gray-900">{selectedInvoice.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-500 mb-1">Payment Method</p>
                    <p className="text-[14px] font-semibold text-gray-900">{selectedInvoice.method}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-500 mb-1">Status</p>
                    <p className="text-[14px] font-semibold text-gray-900">{selectedInvoice.status}</p>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">Line Items</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-y border-gray-100 bg-[#F8FAFC]">
                      <th className="py-2.5 px-3 text-[12px] font-semibold text-gray-600 w-[55%]">Description</th>
                      <th className="py-2.5 px-3 text-[12px] font-semibold text-gray-600 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-[12px] font-semibold text-gray-600 text-right">Unit Price</th>
                      <th className="py-2.5 px-3 text-[12px] font-semibold text-gray-600 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-4 px-3 text-[13px] font-medium text-gray-900">{selectedInvoice.session}</td>
                      <td className="py-4 px-3 text-[13px] text-gray-600 text-center">1</td>
                      <td className="py-4 px-3 text-[13px] text-gray-600 text-right">₹2,500</td>
                      <td className="py-4 px-3 text-[13px] font-bold text-gray-900 text-right">₹2,500</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-3 text-[13px] font-medium text-gray-900">Structural Feedback Report</td>
                      <td className="py-4 px-3 text-[13px] text-gray-600 text-center">1</td>
                      <td className="py-4 px-3 text-[13px] text-gray-600 text-right">₹700</td>
                      <td className="py-4 px-3 text-[13px] font-bold text-gray-900 text-right">₹700</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-3 text-[13px] font-medium text-gray-900">Plagiarism Check</td>
                      <td className="py-4 px-3 text-[13px] text-gray-600 text-center">1</td>
                      <td className="py-4 px-3 text-[13px] text-gray-600 text-right">₹300</td>
                      <td className="py-4 px-3 text-[13px] font-bold text-gray-900 text-right">₹300</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tax Breakdown */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">Tax Breakdown (GST)</h3>
                <div className="bg-[#F8FAFC] rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹3,500</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-600">CGST (9%)</span>
                    <span className="font-semibold text-gray-900">₹315</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-gray-600">SGST (9%)</span>
                    <span className="font-semibold text-gray-900">₹315</span>
                  </div>
                  <div className="border-t border-gray-200 my-1"></div>
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-bold text-gray-900">₹4,130</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-3 leading-relaxed px-1">
                  * GST @ 18% applied as per Indian tax regulations. Tax-compliant invoice available for download.
                </p>
              </div>

              {/* Payment History */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">Payment History</h3>
                <div className="border border-gray-100 rounded-xl p-5 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[#059669] text-[12px] font-bold">
                        <CheckCircle2 size={14} strokeWidth={2.5} /> Success
                      </span>
                      <span className="text-[13px] text-gray-500">{selectedInvoice.method}</span>
                    </div>
                    <span className="text-[15px] font-bold text-gray-900">₹4,130</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] text-gray-800 font-medium">Txn: TXN-RAZ****9012</p>
                    <p className="text-[12px] text-gray-500">22 Jan 2024</p>
                  </div>
                </div>

                <div className="bg-[#F0F5FF] border border-[#D6E4FF] rounded-xl p-3 flex items-center gap-3">
                  <ShieldCheck size={18} className="text-[#042BFD] shrink-0" />
                  <p className="text-[12px] text-[#042BFD] font-medium">
                    All transactions are secured and encrypted by Razorpay.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 shrink-0 bg-white">
              <button
                onClick={() => handleDownload(selectedInvoice.id)}
                disabled={downloadingId === selectedInvoice.id}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-900 font-semibold text-[14px] py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              >
                {downloadingId === selectedInvoice.id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Download size={18} strokeWidth={2} />
                )}
                Download Invoice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}