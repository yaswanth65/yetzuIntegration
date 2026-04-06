"use client";

import React, { useState } from "react";
import { 
  Search, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ShieldCheck,
  X,
  AlertCircle
} from "lucide-react";

// --- MOCK DATA ---
const SUBSCRIPTIONS_DATA = [
  {
    id: "SUB-2024-001",
    planName: "Pro Mentorship Plan",
    billingCycle: "Monthly",
    startDate: "01 Jan 2024",
    nextBilling: "01 May 2024",
    amount: "₹4,999",
    status: "Active",
  },
  {
    id: "SUB-2024-002",
    planName: "Review & Editing Bundle",
    billingCycle: "Quarterly",
    startDate: "01 Oct 2023",
    nextBilling: "01 Jul 2024",
    amount: "₹8,999",
    status: "Paused",
  },
  {
    id: "SUB-2023-003",
    planName: "Basic Webinar Pass",
    billingCycle: "Annual",
    startDate: "01 Jun 2023",
    nextBilling: "01 Jun 2024",
    amount: "₹5,999",
    status: "Cancelled",
  },
];

// Helper for status badges
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#059669] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#A7F3D0]">
          <CheckCircle2 size={12} strokeWidth={2.5} /> Active
        </span>
      );
    case "paused":
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#FFF7ED] text-[#EA580C] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#FED7AA]">
          <Clock size={12} strokeWidth={2.5} /> Paused
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] text-[#64748B] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#E2E8F0]">
          <X size={12} strokeWidth={2.5} /> Cancelled
        </span>
      );
    default:
      return null;
  }
};

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] = useState(false);

  // Handlers for Modals
  const openManageModal = () => setIsManageModalOpen(true);
  const closeManageModal = () => setIsManageModalOpen(false);
  
  const openCancelModal = () => {
    setIsManageModalOpen(false); // Close manage modal
    setIsCancelConfirmModalOpen(true); // Open cancel confirmation
  };
  const closeCancelModal = () => setIsCancelConfirmModalOpen(false);

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans relative">
      
      {/* --- FULL WIDTH WHITE HEADER --- */}
      <div className="bg-white px-6 md:px-10 py-6  border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold text-gray-900 mb-1">Subscriptions</h1>
            <p className="text-[14px] text-gray-500">Manage your active plans, billing cycles, and renewal dates.</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-[380px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search by plan name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN GRAY CONTENT AREA --- */}
      <div className="p-6 md:px-10 max-w-[1600px] mx-auto">
        
        {/* --- HERO BANNER --- */}
        <div className="  bg-gradient-to-b from-[#030213] via-[#1A1A4E] to-[#2D2D7E] rounded-[24px] p-6 md:p-8 lg:px-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8 mb-8 shadow-md">
          
          {/* Left Side: Plan Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold text-[#8A88A4] uppercase tracking-wider">
                CURRENT PLAN
              </span>
              <span className="flex items-center gap-1.5 bg-[#059669]/10 border border-[#059669]/30 text-[#10B981] text-[11px] font-bold px-2.5 py-1 rounded-full">
                <CheckCircle2 size={12} strokeWidth={2.5} /> Active
              </span>
            </div>
            
            <h2 className="text-[24px]  font-medium text-white mb-1.5 leading-snug">
              Pro Mentorship Plan
            </h2>
            <p className="text-[13px] text-[#8A88A4] mb-6">
              Monthly • 5 services included
            </p>
             
            <button onClick={openManageModal} className="bg-white text-gray-900 font-bold text-[13px] px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-gray-100 transition-colors w-fit">
              Manage Plan <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Right Side: Price & Renewal */}
          <div className="flex flex-row items-center justify-between lg:justify-end gap-8 md:gap-16">
            <div className="text-left lg:text-right">
              <p className="text-[10px] font-bold text-[#8A88A4] uppercase tracking-wider mb-1.5">
                PLAN AMOUNT
              </p>
              <h3 className="text-[32px] md:text-[36px] font-bold text-white leading-none mb-1.5 flex items-baseline justify-start lg:justify-end">
                ₹4,999
              </h3>
              <p className="text-[12px] text-[#8A88A4]">
                per month
              </p>
            </div>
            
            {/* Divider Line */}
            <div className="w-[1px] h-[60px] bg-white/10 hidden md:block"></div>
            
            <div className="text-left">
              <p className="text-[10px] font-bold text-[#8A88A4] uppercase tracking-wider mb-1.5">
                RENEWAL DATE
              </p>
              <h3 className="text-[18px] font-bold text-white mb-1.5">
                01 May 2024
              </h3>
              <p className="text-[12px] text-[#8A88A4]">
                renews automatically
              </p>
            </div>
          </div>

        </div>

        {/* --- METRICS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
              <Calendar size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">TOTAL PLANS</p>
              <p className="text-[24px] font-bold text-gray-900 leading-none">3</p>
            </div>
          </div>
          
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">ACTIVE</p>
              <p className="text-[24px] font-bold text-gray-900 leading-none">1</p>
            </div>
          </div>

          <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
              <Clock size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">PAUSED / CANCELLED</p>
              <p className="text-[24px] font-bold text-gray-900 leading-none">2</p>
            </div>
          </div>
        </div>

        {/* --- ALL SUBSCRIPTIONS TABLE --- */}
        <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
          
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-[18px] font-bold text-gray-900">All Subscriptions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-100">
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Plan Name</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Next Billing</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-wider  ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SUBSCRIPTIONS_DATA.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6">
                      <p className="text-[14px] font-semibold text-gray-900">{sub.planName}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{sub.id}</p>
                    </td>
                    <td className="py-5 px-6 text-[13px] font-medium text-gray-600">{sub.billingCycle}</td>
                    <td className="py-5 px-6 text-[13px] text-gray-600">{sub.startDate}</td>
                    <td className="py-5 px-6 text-[13px] text-gray-600">{sub.nextBilling}</td>
                    <td className="py-5 px-6 text-[14px] font-bold text-gray-900">{sub.amount}</td>
                    <td className="py-5 px-6">{getStatusBadge(sub.status)}</td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-start gap-4">
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 font-medium text-[12px] rounded-[8px] hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                        <button className="text-[13px] font-semibold text-red-500 hover:text-red-700 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Security Note */}
          <div className="bg-[#F8FAFC] border-t border-gray-100 p-5 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#042BFD]" />
            <p className="text-[12px] text-gray-500 font-medium">
              Recurring billing is handled securely by Razorpay & Stripe. You may cancel anytime.
            </p>
          </div>
        </div>

      </div>

      {/* =========================================================
          MODAL 1: MANAGE PLAN 
          ========================================================= */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeManageModal}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[20px] font-bold text-gray-900">Pro Mentorship Plan</h2>
                  <span className="flex items-center gap-1 bg-[#ECFDF5] text-[#059669] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#A7F3D0]">
                    <CheckCircle2 size={10} strokeWidth={2.5} /> Active
                  </span>
                </div>
                <p className="text-[13px] text-gray-500">SUB-2024-001</p>
              </div>
              <button onClick={closeManageModal} className="p-1 text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              
              {/* Billing Details Grid */}
              <div className="mb-8">
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">BILLING DETAILS</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-gray-100 rounded-[12px] p-3 bg-[#F8FAFC]">
                    <p className="text-[11px] text-gray-500 mb-1">Plan Amount</p>
                    <p className="text-[13px] font-bold text-gray-900">₹4,999 / monthly</p>
                  </div>
                  <div className="border border-gray-100 rounded-[12px] p-3 bg-[#F8FAFC]">
                    <p className="text-[11px] text-gray-500 mb-1">Billing Cycle</p>
                    <p className="text-[13px] font-bold text-gray-900">Monthly</p>
                  </div>
                  <div className="border border-gray-100 rounded-[12px] p-3 bg-[#F8FAFC]">
                    <p className="text-[11px] text-gray-500 mb-1">Start Date</p>
                    <p className="text-[13px] font-bold text-gray-900">01 Jan 2024</p>
                  </div>
                  <div className="border border-gray-100 rounded-[12px] p-3 bg-[#F8FAFC]">
                    <p className="text-[11px] text-gray-500 mb-1">Next Billing</p>
                    <p className="text-[13px] font-bold text-gray-900">01 May 2024</p>
                  </div>
                </div>
              </div>

              {/* Services Included */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">SERVICES INCLUDED</h3>
                <div className="border border-gray-100 rounded-[16px] p-2 flex flex-col gap-1">
                  
                  <div className="flex items-start gap-3 p-3">
                    <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-semibold text-gray-900">Mentorship Sessions</p>
                      <p className="text-[12px] text-gray-500">4 sessions / month (60 min each)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3">
                    <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-semibold text-gray-900">Webinar Access</p>
                      <p className="text-[12px] text-gray-500">Unlimited access to all live webinars</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3">
                    <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-semibold text-gray-900">Resource Library</p>
                      <p className="text-[12px] text-gray-500">Full access to 200+ templates & guides</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3">
                    <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-semibold text-gray-900">Priority Support</p>
                      <p className="text-[12px] text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-white flex justify-center">
              <button 
                onClick={openCancelModal}
                className="w-full text-[#E11D48] border border-[#FECDD3] bg-[#FFF1F2] hover:bg-[#FFE4E6] font-semibold text-[14px] py-3 rounded-[12px] transition-colors"
              >
                Cancel Plan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: CANCEL CONFIRMATION 
          ========================================================= */}
      {isCancelConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeCancelModal}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[450px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-6 pb-2 flex items-start justify-between">
              <h2 className="text-[20px] font-bold text-gray-900">Cancel Pro Mentorship Plan?</h2>
              <button onClick={closeCancelModal} className="p-1 text-gray-400 hover:text-gray-900 transition-colors -mt-1">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6">
              <p className="text-[13px] text-gray-600 mb-5 leading-relaxed">
                You'll lose access at the end of your current billing period. This action cannot be undone.
              </p>

              {/* Orange Alert Box */}
              <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[12px] p-4 flex gap-3">
                <AlertCircle size={18} className="text-[#D97706] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#B45309] leading-relaxed">
                  You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. No refunds are issued for partial months. Active sessions already booked will be honored until the cancellation date.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 pt-0 flex items-center justify-end gap-3">
              <button 
                onClick={closeCancelModal}
                className="px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold text-[13px] rounded-[10px] hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={closeCancelModal}
                className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold text-[13px] rounded-[10px] transition-colors"
              >
                Cancel Plan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}