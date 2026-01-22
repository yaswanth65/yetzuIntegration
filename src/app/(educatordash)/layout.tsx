"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import TrendingSection from "./components/TrendingSection";
import AssignmentsTable from "./components/AssignmentsTable";
import SchedulePanel from "./components/SchedulePanel";
import MySessions from "./components/MySessions";
import AssignmentsPage from "./components/AssignmentsPage";

export default function EducatorDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      <div className="min-h-screen bg-white">
        <Header />

        <div className="pl-64">
          {activeView === "dashboard" && (
            <main className="p-6 max-w-[1600px] mx-auto flex flex-col gap-6">
              <StatsGrid />

              <TrendingSection />

              <div className="flex flex-col lg:flex-row gap-6">
                <AssignmentsTable />
                <SchedulePanel />
              </div>
            </main>
          )}

          {activeView === "sessions" && <MySessions />}

          {activeView === "assignments" && <AssignmentsPage />}
        </div>
      </div>
    </div>
  );
}
