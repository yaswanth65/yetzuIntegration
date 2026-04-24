"use client";

import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col font-['Inter'] bg-[#F8F9FA]">
      <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
          <div className="max-w-[1600px] mx-auto min-h-full">
            {children}
          </div>
        </main>

        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
    </div>
  );
}
