"use client";

import React, { useState } from "react";
import {
  Search,
  Info,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash,
  Eye,
  Ban,
} from "lucide-react";
import { MOCK_SESSIONS } from "../sessions_constants";
import SessionModal from "./SessionModal";

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  let bgClass = "bg-gray-100 text-gray-800";

  switch (status) {
    case "Active":
      bgClass = "bg-[#EEF4FF] text-[#6366F1]"; // Light indigoish blue
      break;
    case "Completed":
      bgClass = "bg-[#EBF6EB] text-[#31AA27]"; // Light green
      break;
    default:
      bgClass = "bg-gray-100 text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center px-4 py-0.5 rounded-full text-[11px] font-medium ${bgClass}`}
    >
      {status}
    </span>
  );
};

const ActionMenu = ({ onEdit }: { onEdit: () => void }) => (
  <div className="absolute right-8 top-0 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
    <button
      onClick={onEdit}
      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
    >
      Edit
    </button>
    <div className="h-px bg-gray-100 my-0"></div>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
      Delete
    </button>
    <div className="h-px bg-gray-100 my-0"></div>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
      View List
    </button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
      Suspend
    </button>
  </div>
);

const AdminSessionsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const tabs = ["All", "Webinar", "Cohort"];

  const handleEdit = () => {
    setActiveMenu(null);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm">
        {/* Header Section */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-blue-600" />
            </div>
            <input
              type="text"
              placeholder="Filter tasks..."
              className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex bg-white rounded-lg overflow-hidden border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#FFFFFF]">
              <tr className="border-b border-gray-100 text-xs text-gray-900 font-bold tracking-tight">
                <th className="py-4 px-6 w-12 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                </th>

                <th className="py-4 px-4 text-left w-32">Session ID</th>
                <th className="py-4 px-4 text-left w-1/3">Assignment</th>
                <th className="py-4 px-4 text-center w-32">Status</th>
                <th className="py-4 px-4 text-left w-32">Deadline</th>
                <th className="py-4 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_SESSIONS.map((session, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors relative group"
                >
                  <td className="py-4 px-6 text-center">
                    <input
                      type="checkbox"
                      className={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 ${index === 2 ? "checked:bg-blue-600" : ""}`}
                      checked={
                        index === 2 || index === 4 || index === 5 || index === 6
                      }
                      readOnly={true}
                    />
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-600">
                    {session.id}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col max-w-[280px]">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {session.title}
                        </span>
                        <span className="text-xs text-gray-500 truncate mt-0.5">
                          {session.description}
                        </span>
                      </div>
                      <Info size={16} className="text-gray-400" />
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <StatusPill status={session.status} />
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-900">
                    {session.deadline}
                  </td>

                  <td className="py-4 px-4 text-center relative">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === index ? null : index)
                      }
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {activeMenu === index && <ActionMenu onEdit={handleEdit} />}
                    {/* Click outside listener pseudo-element could be here or managed via global listener */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <p>0 of 68 row(s) selected.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <div className="border border-gray-200 rounded px-2 py-1 flex items-center gap-2">
                6 <ChevronDown size={14} />
              </div>
            </div>
            <p>Page 1 of 7</p>
            <div className="flex gap-1">
              <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">
                <span className="sr-only">First</span>«
              </button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">
                <span className="sr-only">Previous</span>‹
              </button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50">
                <span className="sr-only">Next</span>›
              </button>
              <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50">
                <span className="sr-only">Last</span>»
              </button>
            </div>
          </div>
        </div>
      </div>

      <SessionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        isEdit={true}
      />
    </>
  );
};

export default AdminSessionsTable;
