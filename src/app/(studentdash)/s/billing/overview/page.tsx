"use client";

import React, { useEffect, useState } from "react";
import { 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  ChevronRight, 
  ArrowRight, 
  FileText,
  Loader2
} from "lucide-react";
import { StudentAPI } from "@/lib/api";

// Mock fallback data
const FALLBACK_METRICS = [
  { id: 1, title: "TOTAL SPENT", value: "₹36,580", subtitle: "All-time paid Invoices", icon: DollarSign, colorScheme: "blue" },
  { id: 2, title: "OUTSTANDING AMOUNT", value: "₹21,476", subtitle: "Pending + failed invoices", icon: AlertCircle, colorScheme: "orange" },
  { id: 3, title: "ACTIVE SUBSCRIPTION", value: "Active", subtitle: "Pro Mentorship Plan - Monthly", icon: CheckCircle2, colorScheme: "green" },
  { id: 4, title: "LAST PAYMENT DATE", value: "01 Apr 2024", subtitle: "Webinar: Major Insights on Human Ner...", icon: Calendar, colorScheme: "purple" },
];

const FALLBACK_INVOICES = [
  { id: "INV-2024-015", title: "International Publication Strategy - S...", type: "Mentorship", date: "05 Apr 2024", status: "Cancelled", amount: "₹9,440" },
  { id: "INV-2024-014", title: "Thesis Proposal – Urban Planning Study", type: "Webinar", date: "01 Apr 2024", status: "Failed", amount: "₹3,776" },
  { id: "INV-2024-013", title: "Dissertation Abstract & Executive", type: "Webinar", date: "25 Mar 2024", status: "Paid", amount: "₹5,310" },
  { id: "INV-2024-012", title: "Grant Writing Workshop - ICSSR Funding", type: "Cohort", date: "20 Mar 2024", status: "Pending", amount: "₹2,360" },
  { id: "INV-2024-011", title: "Research Methodology Workshop - 3 Sess...", type: "Mentorship", date: "15 Mar 2024", status: "Paid", amount: "₹7,080" },
];

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid": return "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]";
    case "pending": return "bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA]";
    case "failed": return "bg-[#FEF2F2] text-[#E11D48] border border-[#FECDD3]";
    case "cancelled": return "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]";
    default: return "bg-gray-100 text-gray-600";
  }
};

const getMetricIconStyles = (colorScheme: string) => {
  switch (colorScheme) {
    case "blue": return "bg-[#EEF2FF] text-[#4F46E5]";
    case "orange": return "bg-[#FFF7ED] text-[#EA580C]";
    case "green": return "bg-[#ECFDF5] text-[#059669]";
    case "purple": return "bg-[#F3E8FF] text-[#7C3AED]";
    default: return "bg-gray-100 text-gray-500";
  }
};

export default function PaymentsOverviewPage() {
  const [metrics, setMetrics] = useState(FALLBACK_METRICS);
  const [invoices, setInvoices] = useState(FALLBACK_INVOICES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setIsLoading(true);
        const res = await StudentAPI.getDashboardOverview();
        const data = res?.data || res;

        const paymentHistory = data?.paymentHistory || data?.payments || data?.invoices || [];
        const userData = data?.user || data;

        const totalSpent = paymentHistory.reduce?.((sum: number, p: any) =>
          sum + (parseInt(String(p.amount)?.replace(/[^0-9]/g, "")) || 0), 0) || 0;
        const pendingAmount = paymentHistory.reduce?.((sum: number, p: any) =>
          p.status?.toLowerCase() === "pending" || p.status?.toLowerCase() === "failed"
            ? sum + (parseInt(String(p.amount)?.replace(/[^0-9]/g, "")) || 0) : sum, 0) || 0;
        const lastPayment = paymentHistory.find?.((p: any) => p.status?.toLowerCase() === "paid") ||
          paymentHistory[paymentHistory.length - 1];

        const apiMetrics = [
          { id: 1, title: "TOTAL SPENT", value: totalSpent > 0 ? `₹${totalSpent.toLocaleString()}` : "₹0", subtitle: "All-time paid Invoices", icon: DollarSign, colorScheme: "blue" },
          { id: 2, title: "OUTSTANDING AMOUNT", value: pendingAmount > 0 ? `₹${pendingAmount.toLocaleString()}` : "₹0", subtitle: "Pending + failed invoices", icon: AlertCircle, colorScheme: "orange" },
          {
            id: 3,
            title: "ACTIVE SUBSCRIPTION",
            value: data?.subscription?.status === "active" ? "Active" : data?.subscription?.plan || "N/A",
            subtitle: data?.subscription?.plan
              ? `${data.subscription.plan} - ${data.subscription.billingCycle || "Monthly"}`
              : userData?.name || "No active plan",
            icon: CheckCircle2,
            colorScheme: "green",
          },
          {
            id: 4,
            title: "LAST PAYMENT DATE",
            value: lastPayment?.date || lastPayment?.createdAt?.split("T")[0] || "N/A",
            subtitle: lastPayment?.session || lastPayment?.title || "No recent payments",
            icon: Calendar,
            colorScheme: "purple",
          },
        ];
        setMetrics(apiMetrics);

        if (Array.isArray(paymentHistory) && paymentHistory.length > 0) {
          setInvoices(paymentHistory.slice(0, 5));
        }
      } catch {
        console.warn("Overview API unavailable, using fallback data");
        setMetrics(FALLBACK_METRICS);
        setInvoices(FALLBACK_INVOICES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-[#F8F9FA] flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-[#042BFD]" />
      </div>
    );
  }

  return (
    <div className="md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto flex flex-col gap-5 min-h-screen overflow-x-hidden pb-24 lg:pb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#021165]">
          Payments Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage your subscriptions and view transaction history</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const iconStyles = getMetricIconStyles(metric.colorScheme);
            return (
              <div key={metric.id} className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 flex flex-col transition-all hover:shadow-md">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconStyles}`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1 leading-none">{metric.value}</p>
                <p className="text-xs text-gray-400 truncate mt-1">{metric.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#021165] via-[#042BFD] to-[#2D2D7E] rounded-[32px] p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">CURRENT PLAN</span>
              <span className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                <CheckCircle2 size={12} strokeWidth={2.5} /> Active
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">Pro Mentorship Plan</h2>
            <p className="text-sm text-blue-100/70 mb-8 max-w-sm">Premium access with 5 mentorship services included per month.</p>
            <button className="bg-white text-[#021165] font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-all active:scale-95 shadow-lg w-full sm:w-fit justify-center">
              Manage Subscription <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between lg:justify-end gap-6 sm:gap-12 md:gap-16 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-2">PLAN AMOUNT</p>
              <h3 className="text-4xl font-bold text-white leading-none mb-1">₹4,999</h3>
              <p className="text-xs text-blue-200/60">per month</p>
            </div>
            <div className="hidden sm:block w-[1px] h-12 bg-white/20"></div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-2">NEXT RENEWAL</p>
              <h3 className="text-xl font-bold text-white mb-1">01 May 2024</h3>
              <p className="text-xs text-blue-200/60">Renews automatically</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
              <p className="text-xs text-gray-500 mt-0.5">Download and track your payment receipts</p>
            </div>
            <a href="/s/billing/invoices" className="text-sm font-bold text-[#042BFD] hover:bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
              View All <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>

          <div className="flex flex-col divide-y divide-gray-50">
            {invoices.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-sm">No invoices found</div>
            ) : (
              invoices.map((invoice: any) => (
                <div key={invoice.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 hover:bg-gray-50/50 transition-all group px-2 -mx-2 rounded-xl">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <FileText size={20} className="text-gray-400" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 mb-0.5 truncate group-hover:text-[#042BFD] transition-colors cursor-pointer">
                        {invoice.title || invoice.session || invoice.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium overflow-hidden">
                        <span className="shrink-0">{invoice.id}</span>
                        <span className="text-gray-300 shrink-0">•</span>
                        <span className="truncate">{invoice.type || invoice.service || invoice.method}</span>
                        <span className="text-gray-300 shrink-0">•</span>
                        <span className="shrink-0">{invoice.date || invoice.issued || invoice.createdAt?.split("T")[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pl-16 sm:pl-0">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(invoice.status)}`}>
                      {invoice.status}
                    </span>
                    <span className="text-base font-bold text-gray-900 min-w-[80px] text-right">
                      {invoice.amount ? `₹${invoice.amount}` : "—"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}