"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AdminSessionsStats from "./AdminSessionsStats";
import AdminSessionsTable from "./AdminSessionsTable";
import SessionModal from "./SessionModal";

const SessionsView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back Alan!
          </h2>
          <p className="text-gray-500 mt-1">
            Here's a list of user who can access the platform
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
        >
          Add Sessions <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

      <AdminSessionsStats />

      <AdminSessionsTable />

      <SessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SessionsView;
