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
    <div className="h-screen flex flex-col font-['Inter'] bg-white">
      <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
          <div className="px-6 md:px-8 min-h-full">
            <div className="max-w-[1600px] py-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
