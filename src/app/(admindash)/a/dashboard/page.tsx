
import React from "react";
import OverViewStats from "./components/OverViewStats";
import RevenueChart from "./components/RevenueChart";
import LiveActivityFeed from "./components/LiveActivityFeed";
import AlertIssues from "./components/AlertIssues";
import RecentSession from "../../components/SessionTable";
import SupportTickets from "./components/SupportTickets";
import { sessionsData } from "@/app/(admindash)/data/SessionData";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#021165] tracking-tight">Overview</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Monitor your platform's performance and key metrics</p>
        </div>
        {/* <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
             Download Report
           </button>
           <button className="px-5 py-2.5 bg-[#042BFD] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#0325D7] transition-all shadow-lg shadow-blue-600/20">
             Manage Access
           </button>
        </div> */}
      </div>

      {/* --- STATS SECTION --- */}
      <OverViewStats />

      {/* --- REVENUE SECTION --- */}
      <RevenueChart />

      {/* --- ACTIVITY & ALERTS SECTION --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <LiveActivityFeed />
        <AlertIssues />
      </div>

      {/* --- SESSIONS SECTION --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent Sessions</h2>
           <button className="text-xs font-bold text-[#042BFD] uppercase tracking-widest hover:underline">View Schedule</button>
        </div>
        <RecentSession data={sessionsData} />
      </div>

      {/* --- TICKETS SECTION --- */}
      <SupportTickets />
      
      <div className="pb-10" />
    </div>
  );
}
