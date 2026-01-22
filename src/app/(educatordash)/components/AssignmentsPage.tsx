"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Download,
  Upload,
  Info,
  FileText,
} from "lucide-react";
import { FULL_ASSIGNMENTS_LIST, SUBMISSIONS_LIST } from "../constants";
import { CreateAssignmentModal, UploadFeedbackModal } from "./AssignmentModals";

const EmptyState: React.FC<{ onCreate: () => void }> = ({ onCreate }) => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-blue-50/50 rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 border-[3px] border-dashed border-blue-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="relative transform rotate-[-10deg]">
          <FileText
            size={48}
            className="text-blue-600 fill-blue-50"
            strokeWidth={1.5}
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-1 border-4 border-white">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-60"></div>
      </div>
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-2">No Assignments</h2>
    <p className="text-gray-500 mb-8 text-sm">
      You have not added any Assignments
    </p>
    <button
      onClick={onCreate}
      className="bg-[#042BFD] hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
    >
      Create New <ChevronDown size={16} />
    </button>
  </div>
);

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  let styles = "bg-gray-100 text-gray-800";

  if (status === "Posted") styles = "bg-[#F3E8FF] text-[#9333EA]";
  if (status === "Completed") styles = "bg-[#DCFCE7] text-[#16A34A]";
  if (status === "Attention") styles = "bg-[#FFEDD5] text-[#EA580C]";
  if (status === "Feedback") styles = "bg-[#DCFCE7] text-[#16A34A]";
  if (status === "Review") styles = "bg-[#FFEDD5] text-[#EA580C]";

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-3 rounded-md
        font-nunito text-[12px] font-normal
        leading-[20px] tracking-[0]
        text-center align-middle
        ${styles}
      `}
    >
      {status}
    </span>
  );
};

const AssignmentsTab: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="w-14 py-4 px-4 text-center">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">
                Webinar/Cohort
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider w-1/3">
                Assignment
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">
                Deadline
              </th>
            </tr>
          </thead>
          <tbody>
            {FULL_ASSIGNMENTS_LIST.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors last:border-b-0 group"
              >
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {item.id}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-between gap-4 max-w-md">
                    <span className="text-sm text-gray-600 truncate font-medium">
                      {item.assignment}
                    </span>
                    <Info
                      size={16}
                      className="text-gray-400 shrink-0 transition-colors cursor-pointer hover:text-gray-600"
                    />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <StatusPill status={item.status} />
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 font-medium">
                  {item.deadline}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubmissionsTab: React.FC<{ onUploadClick: () => void }> = ({
  onUploadClick,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    if (openDropdownId === id) setOpenDropdownId(null);
    else setOpenDropdownId(id);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible shadow-none min-h-[500px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                Students
                <span className="bg-[#E6EAFF] text-[#0325D7] px-2 py-0.5 rounded text-[10px] font-bold">
                  300
                </span>
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider w-1/3">
                Task
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider">
                Report
              </th>
            </tr>
          </thead>
          <tbody>
            {SUBMISSIONS_LIST.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors last:border-b-0"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border border-gray-100"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">
                        {item.studentName}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {item.designation}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-700 font-medium">
                    {item.type}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 group">
                    <span className="text-sm text-gray-600 truncate max-w-[250px] font-medium">
                      {item.task}
                    </span>
                    <Info
                      size={14}
                      className="text-gray-400 transition-colors cursor-pointer hover:text-gray-600"
                    />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <StatusPill status={item.status} />
                </td>
                <td className="py-4 px-4 relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(item.id);
                    }}
                    className={`text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors px-2 py-1 rounded-md ${openDropdownId === item.id ? "bg-gray-100 text-gray-900" : ""}`}
                  >
                    Report{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${openDropdownId === item.id ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdownId === item.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10 cursor-default"
                        onClick={() => setOpenDropdownId(null)}
                      ></div>
                      <div className="absolute right-4 top-10 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-20 animate-in fade-in zoom-in-95 duration-150 overflow-hidden py-1">
                        <button
                          onClick={() => {
                            onUploadClick();
                            setOpenDropdownId(null);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-3 transition-colors"
                        >
                          <Upload size={14} className="text-gray-500" /> Upload
                        </button>
                        <button className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-3 transition-colors">
                          <Download size={14} className="text-gray-500" />{" "}
                          Download
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AssignmentsPage: React.FC = () => {
  const [viewState, setViewState] = useState<"empty" | "content">("content");
  const [activeTab, setActiveTab] = useState<"Assignments" | "Submissions">(
    "Assignments",
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  if (viewState === "empty") {
    return (
      <>
        <EmptyState onCreate={() => setShowCreateModal(true)} />
        <CreateAssignmentModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6 flex flex-col gap-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-sm px-4 text-gray-500 mt-1">
            Here&apos;s a list of your Assignments for this month
          </p>
        </div>
        {activeTab === "Assignments" ? (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#042BFD] hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-blue-600/20"
          >
            Create New <ChevronDown size={16} />
          </button>
        ) : (
          <button className="bg-[#042BFD] hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-blue-600/20">
            Download Excel <Download size={16} />
          </button>
        )}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-[320px]">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Filter tasks..."
            className="w-full pl-10 pr-4 py-2.5 border border-blue-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <div className="flex bg-white border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("Assignments")}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
              activeTab === "Assignments"
                ? "bg-[#042BFD] text-white shadow-none"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Assignments
          </button>
          <button
            onClick={() => setActiveTab("Submissions")}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
              activeTab === "Submissions"
                ? "bg-[#042BFD] text-white shadow-none"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Submissions
          </button>
        </div>
      </div>

      {/* Content Table */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === "Assignments" ? (
          <AssignmentsTab />
        ) : (
          <SubmissionsTab onUploadClick={() => setShowFeedbackModal(true)} />
        )}
      </div>

      {/* Modals */}
      <CreateAssignmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <UploadFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
    </div>
  );
};

export default AssignmentsPage;
