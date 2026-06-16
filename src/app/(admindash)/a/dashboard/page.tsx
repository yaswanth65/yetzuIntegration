"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import OverViewStats from "./components/OverViewStats";
import RevenueChart from "./components/RevenueChart";
import RecentSessionsCards from "./components/RecentSessionsCards";
import LiveActivityFeed from "./components/LiveActivityFeed";
import AlertIssues from "./components/AlertIssues";
import SupportTickets from "./components/SupportTickets";
import SessionDetailsPanel from "../../components/SessionDetailsPanel";
import { Session } from "@/app/(admindash)/types/SessionType";
import { AdminAPI } from "@/lib/api";

type OverviewResponse = {
  cards?: Record<string, any>;
  revenueBreakdown?: Array<{ month: string; amount: number }>;
  liveActivityFeed?: Array<Record<string, any>>;
  alerts?: Array<Record<string, any>>;
  recentSessions?: Array<Record<string, any>>;
  recentTickets?: Array<Record<string, any>>;
};

const toSession = (item: Record<string, any>, index: number): Session => {
  const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
  const date = rawDate ? new Date(rawDate) : null;
  const status = item.status || item.Status || "Scheduled";
  const studentsCount =
    typeof item.studentsCount === "number"
      ? item.studentsCount
      : typeof item.students === "number"
        ? item.students
        : Array.isArray(item.students)
          ? item.students.length
          : typeof item.attendees === "number"
            ? item.attendees
            : typeof item.enrolledCount === "number"
              ? item.enrolledCount
              : 0;

  const dateLabel = date
    ? `${String(date.getUTCDate()).padStart(2, "0")} ${date.toLocaleDateString("en-GB", {
        month: "short",
        timeZone: "UTC",
      })}, ${date.getUTCFullYear()}`
    : "TBD";
  const timeLabel = date
    ? `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`
    : "09:00 AM";

  return {
    id: String(item.sessionCode || item.id || item._id || `SESSION-${index + 1}`),
    title: item.title || item.sessionName || "Session",
    type: item.sessionType || item.type || "Webinar",
    educator: item.educator?.name || item.educatorName || item.mentorName || "Educator",
    students: studentsCount,
    attendees: studentsCount,
    date: dateLabel,
    dateTime: rawDate || undefined,
    startTime: item.startTime || timeLabel,
    endTime: item.endTime || item.endDateTime || "",
    status: status === "Upcoming" || status === "upcoming" ? "Scheduled" : status,
  };
};

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response: any = await AdminAPI.getOverview();
        const data = response?.data || response || {};
        const overviewData: OverviewResponse = {
          cards: data.cards || {},
          revenueBreakdown: Array.isArray(data.revenueBreakdown) ? data.revenueBreakdown : [],
          liveActivityFeed: Array.isArray(data.liveActivityFeed) ? data.liveActivityFeed : [],
          alerts: Array.isArray(data.alerts) ? data.alerts : [],
          recentSessions: Array.isArray(data.recentSessions) ? data.recentSessions : [],
          recentTickets: Array.isArray(data.recentTickets) ? data.recentTickets : [],
        };
        setOverview(overviewData);
        setSessions((overviewData.recentSessions || []).map(toSession));
      } catch {
        setOverview({
          cards: {},
          revenueBreakdown: [],
          liveActivityFeed: [],
          alerts: [],
          recentSessions: [],
          recentTickets: [],
        });
        setSessions([]);
      }
    };
    fetchOverview();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Overview</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Monitor your platform's performance and key metrics</p>
        </div>
      </div>

      {/* --- STATS SECTION (KPI Cards) --- */}
      <OverViewStats cards={overview?.cards} />

      {/* --- RECENT SESSIONS CARDS SECTION --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent Sessions</h2>
           <Link href="/a/sessions" className="text-xs font-bold text-[#042BFD] uppercase tracking-widest hover:underline">View Schedule</Link>
        </div>
        <RecentSessionsCards sessions={sessions} onSelect={setSelectedSession} />
      </div>

      {/* --- REVENUE SECTION --- */}
      <RevenueChart revenueBreakdown={overview?.revenueBreakdown || []} />

      {/* --- ACTIVITY & ALERTS SECTION --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <LiveActivityFeed items={overview?.liveActivityFeed || []} />
        <AlertIssues alerts={overview?.alerts || []} />
      </div>

      {/* --- TICKETS SECTION --- */}
      <SupportTickets tickets={overview?.recentTickets || []} />

      {/* --- DETAILS PANEL OVERLAY --- */}
      {selectedSession && (
        <>
          <div 
            className="fixed inset-0 bg-[#021165]/40 backdrop-blur-sm z-[60] transition-opacity" 
            onClick={() => setSelectedSession(null)} 
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-500">
            <SessionDetailsPanel 
              session={selectedSession} 
              onClose={() => setSelectedSession(null)} 
            />
          </div>
        </>
      )}
      
      <div className="pb-10" />
    </div>
  );
}
