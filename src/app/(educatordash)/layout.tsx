"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col font-sans">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 h-full w-full">
          {children}
        </main>
      </div>
    </div>
  );
}