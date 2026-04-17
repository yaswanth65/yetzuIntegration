"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { UsersTable } from "./components/UsersTable";
import { PermissionsDrawer } from "./components/PermissionsDrawer";
import { AddUserModal } from "./components/AddUserModal";
import { usersData } from "./components/data";
import { TabType } from "./components/types";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = usersData.filter((user) => {
    // Filter by Tab
    const matchesTab =
      activeTab === "All Users"
        ? true
        : activeTab === "Students"
        ? user.role === "Student"
        : activeTab === "Educators"
        ? user.role === "Educator"
        : true;

    // Filter by Search Query
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="w-full flex-1 p-8 bg-white min-h-screen text-gray-900 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          User Management
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPermissionsOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            <Shield className="w-4 h-4 mr-2 text-slate-500" />
            Permissions
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export
          </button>
          <button 
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-8">
          {(["All Users", "Students", "Educators"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shrink-0">
          <Filter className="w-4 h-4 mr-2 text-slate-500" />
          Filters
        </button>
      </div>

      {/* Data Table */}
      <UsersTable users={filteredUsers} />

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <p className="text-sm text-slate-500">
          Showing 1-{filteredUsers.length} of {filteredUsers.length}
        </p>
        <div className="flex items-center gap-1">
          <button className="p-2 border border-slate-200 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 min-w-[32px] border border-slate-200 rounded-md text-sm font-medium bg-slate-50 text-slate-900 transition-colors">
            1
          </button>
          <button className="p-2 border border-slate-200 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drawer Panel */}
      <PermissionsDrawer 
        isOpen={isPermissionsOpen} 
        onClose={() => setIsPermissionsOpen(false)} 
      />

      {/* Add User Modal */}
      <AddUserModal 
        isOpen={isAddUserOpen} 
        onClose={() => setIsAddUserOpen(false)} 
      />
    </div>
  );
}
