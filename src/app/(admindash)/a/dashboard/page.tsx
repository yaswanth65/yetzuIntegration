
import React from "react";
import OverViewStats from "./components/OverViewStats";
import RevenueChart from "./components/RevenueChart";
import LiveActivityFeed from "./components/LiveActivityFeed";
import AlertIssues from "./components/AlertIssues";
import RecentSession from "../../components/SessionTable";
import SupportTickets from "./components/SupportTickets";
import { sessionsData } from "@/app/(admindash)/data/SessionData";

export default function page() {
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-[#0A0A0A] text-3xl font-semibold">Overview</h1>
      <div className="">
        <OverViewStats />
          <RevenueChart />
        <div className="grid grid-cols-[1fr_400px] gap-5">
          <LiveActivityFeed />
          <AlertIssues />
        </div>
        <RecentSession data={sessionsData} />
        <SupportTickets />
      </div>
    </div>
  );
}
