 
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
import ChatWidget from "./components/ChatWidget";

export default function EducatorDashLayout() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    /* FIXED: Change min-h-screen to h-screen and added overflow-hidden */
    <div className="flex h-screen w-full bg-white text-gray-900 font-inter overflow-hidden">
      
      {/* 1. Permanent Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          setIsChatOpen(false); 
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 h-full">
        
        {/* 3. FIXED HEADER */}
        {/* Removed the extra div wrapper and used the Header's internal sticky/relative logic */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          onChatToggle={() => setIsChatOpen(!isChatOpen)}
          isChatActive={isChatOpen}
        />

        {/* 4. Center Content Area */}
        {/* Locked height to ensure only this area scrolls */}
        <div className="flex-1 overflow-hidden relative">
          {isChatOpen ? (
            <div className="w-full h-full animate-in fade-in duration-300">
              <ChatWidget onClose={() => setIsChatOpen(false)} />
            </div>
          ) : (
            /* overflow-y-auto here ensures dashboard scrolls while Header remains fixed above it */
            <main className="h-full w-full overflow-y-auto p-4 sm:p-6 custom-scrollbar">
              {activeView === "dashboard" && (
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6 pb-10">
                  <StatsGrid />
                  <TrendingSection />
                  <div className="flex flex-col lg:flex-row gap-6">
                    <AssignmentsTable />
                    <SchedulePanel />
                  </div>
                </div>
              )}
              {activeView === "sessions" && <MySessions />}
              {activeView === "assignments" && <AssignmentsPage />}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}