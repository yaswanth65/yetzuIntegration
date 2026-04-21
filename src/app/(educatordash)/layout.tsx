"use client";

import React, { useState } from "react";

import Sidebar from "./components/Sidebar";

export default function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 h-screen overflow-y-auto w-full lg:pl-64">
        {children}
      </main>
    </div>
  );
}
