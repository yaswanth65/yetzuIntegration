"use client";

import React, { useState } from "react";
import { Search, ArrowUpDown, Plus, Upload } from "lucide-react";
import { MOCK_USERS } from "../constants";
import AddUserModal from "./AddUserModal";
import UploadUsersModal from "./UploadUsersModal";
import EditUserModal from "./EditUserModal";

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  let bgClass = "bg-gray-100 text-gray-800";

  switch (status.toLowerCase()) {
    case "active":
      bgClass = "bg-blue-100 text-blue-700";
      break;
    case "suspended":
      bgClass = "bg-red-100 text-red-700";
      break;
    case "pending":
      bgClass = "bg-orange-100 text-orange-700";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgClass}`}
    >
      {status}
    </span>
  );
};

const UserTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUploadUsersOpen, setIsUploadUsersOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const tabs = ["All", "Students", "Educator", "Editor", "Admin"];

  const handleAddUser = (data: any) => {
    console.log("New user:", data);
    setIsAddUserOpen(false);
    // API call would go here
  };

  const handleUploadUsers = (data: any) => {
    console.log("Upload data:", data);
    setIsUploadUsersOpen(false);
    // API call would go here
  };

  const handleEditUser = (data: any) => {
    console.log("Updated user:", data);
    setIsEditUserOpen(false);
    // API call would go here
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col mt-6 shadow-sm">
      {/* Header Section */}
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search name..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          />
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          {/* Add User Button */}
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#042BFD] text-white rounded-lg text-sm font-medium hover:bg-[#021DC0] transition-colors whitespace-nowrap"
          >
            <Plus size={18} />
            Add User
          </button>

          {/* Upload Users Button */}
          <button
            onClick={() => setIsUploadUsersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Upload size={18} />
            Upload Users
          </button>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex bg-gray-50">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50/50">
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <th className="py-4 px-6 w-12 text-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
              </th>

              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  User ID
                </div>
              </th>

              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Name
                </div>
              </th>

              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Email
                </div>
              </th>

              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Role <ArrowUpDown size={14} />
                </div>
              </th>

              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Status <ArrowUpDown size={14} />
                </div>
              </th>

              <th className="py-4 px-6 text-left">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Created <ArrowUpDown size={14} />
                </div>
              </th>

              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_USERS.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                </td>

                <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                  {user.id}
                </td>

                <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                  {user.name}
                </td>

                <td className="py-4 px-6 text-sm text-gray-500">
                  {user.email}
                </td>

                <td className="py-4 px-6 text-sm text-gray-700">{user.role}</td>

                <td className="py-4 px-6">
                  <StatusPill status={user.status} />
                </td>

                <td className="py-4 px-6 text-sm text-gray-500">
                  {user.created}
                </td>

                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => openEditModal(user)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer (Optional but good for completeness) */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1 to 5 of 120 entries</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSubmit={handleAddUser}
      />
      <UploadUsersModal
        isOpen={isUploadUsersOpen}
        onClose={() => setIsUploadUsersOpen(false)}
        onSubmit={handleUploadUsers}
      />
      <EditUserModal
        isOpen={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
        onSubmit={handleEditUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UserTable;
