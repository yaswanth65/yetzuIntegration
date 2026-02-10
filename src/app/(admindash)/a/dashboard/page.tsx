"use client";

import React from "react";
import AdminStatsGrid from "../../components/AdminStatsGrid";
import UserTable from "../../components/UserTable";

export default function AdminDashboardPage() {
  return (
    <main className="p-4 sm:p-6 max-w-[1600px] mx-auto flex flex-col gap-4 sm:gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back Alan!</h2>
        <p className="text-gray-500 mt-1">
          Here's a list of user who can access the platform
        </p>
      </div>

      <AdminStatsGrid />

      <UserTable />
    </main>
  );
}
