"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  BookOpen,
  User,
  Edit2,
  Building2,
  Languages,
  Check,
  Minus,
  Mail,
  Key,
  Info,
  ChevronDown
} from "lucide-react";

// Types
type Role = "Student" | "Educator";
type Status = "Active" | "Suspended";
type TabType = "All Users" | "Students" | "Educators";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
  sessions: number;
}

const permissionsRoles = [
  {
    role: "Admin",
    users: 2,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    Icon: Shield,
    permissions: [true, true, true, true, true, true],
  },
  {
    role: "Educator",
    users: 4,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    Icon: BookOpen,
    permissions: [false, true, true, true, false, false],
  },
  {
    role: "Student",
    users: 5,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    Icon: User,
    permissions: [false, false, false, false, false, false],
  },
  {
    role: "Editor",
    users: 1,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
    Icon: Edit2,
    permissions: [false, false, true, false, false, false],
  },
  {
    role: "Institution",
    users: 1,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
    Icon: Building2,
    permissions: [true, true, false, true, true, false],
  },
  {
    role: "Translator",
    users: 1,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-50",
    Icon: Languages,
    permissions: [false, false, false, false, false, false],
  },
];

// Mock Data
const usersData: User[] = [
  {
    id: "USR-001",
    name: "Priya Sharma",
    email: "priya.s@email.com",
    role: "Student",
    status: "Active",
    joined: "Jan 15, 2024",
    sessions: 5,
  },
  {
    id: "USR-002",
    name: "Dr. Sarah Chen",
    email: "sarah.c@email.com",
    role: "Educator",
    status: "Active",
    joined: "Nov 5, 2023",
    sessions: 124,
  },
  {
    id: "USR-003",
    name: "Rahul Kumar",
    email: "rahul.k@email.com",
    role: "Student",
    status: "Active",
    joined: "Feb 2, 2024",
    sessions: 2,
  },
  {
    id: "USR-004",
    name: "Prof. James Wilson",
    email: "james.w@email.com",
    role: "Educator",
    status: "Active",
    joined: "Sep 10, 2023",
    sessions: 186,
  },
  {
    id: "USR-005",
    name: "Neha Gupta",
    email: "neha.g@email.com",
    role: "Student",
    status: "Suspended",
    joined: "Dec 1, 2023",
    sessions: 12,
  },
  {
    id: "USR-006",
    name: "Aisha Muhammad",
    email: "aisha.m@email.com",
    role: "Student",
    status: "Active",
    joined: "Jan 5, 2024",
    sessions: 3,
  },
  {
    id: "USR-007",
    name: "Dr. Lin Wu",
    email: "lin.w@email.com",
    role: "Educator",
    status: "Active",
    joined: "Jul 22, 2023",
    sessions: 89,
  },
  {
    id: "USR-008",
    name: "Chen Meng",
    email: "chen.m@email.com",
    role: "Student",
    status: "Active",
    joined: "Feb 18, 2024",
    sessions: 7,
  },
];

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  // Add User State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [addUserStep, setAddUserStep] = useState(1);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
    institution: "",
    department: "",
    permissions: {
      manageSessions: false,
      manageAssignments: false,
      viewAnalytics: false,
      manageUsers: false,
      manageBilling: false,
      manageSettings: false,
    },
    inviteMethod: "email", // "email" or "temp"
  });

  const addUserSteps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Access Control" },
    { num: 3, label: "Permissions" },
    { num: 4, label: "Review" },
  ];

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
            onClick={() => {
              setIsAddUserOpen(true);
              setAddUserStep(1);
            }}
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
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 w-12">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          user.role === "Student"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          user.status === "Active"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {user.sessions}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 text-right whitespace-nowrap">
                      <button className="p-1 rounded-md hover:bg-slate-100 transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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

      {/* Drawer Overlay */}
      {isPermissionsOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsPermissionsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[800px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isPermissionsOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Roles & Permissions
              </h2>
              <p className="text-sm text-slate-500">6 roles · 14 users</p>
            </div>
          </div>
          <button
            onClick={() => setIsPermissionsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 w-48 font-inter">
                    Role
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Users
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Sessions
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Assignments
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    View<br/>Analytics
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Billing
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Settings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {permissionsRoles.map((role) => (
                  <tr key={role.role} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${role.bgColor} ${role.iconColor}`}>
                          <role.Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{role.role}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{role.users} {role.users === 1 ? 'user' : 'users'}</p>
                        </div>
                      </div>
                    </td>
                    {role.permissions.map((hasPermission, idx) => (
                      <td key={idx} className="px-4 py-4 text-center">
                        {hasPermission ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-500">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                            <Minus className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Add New User</h2>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Steps Indicator */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between relative">
              <div className="absolute left-12 right-12 top-1/2 h-0.5 -mt-[1px] bg-slate-100 z-0">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${((addUserStep - 1) / 3) * 100}%` }}
                />
              </div>
              {addUserSteps.map((step) => (
                <div
                  key={step.num}
                  className="flex items-center relative z-10 bg-white px-2"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 transition-colors ${
                      addUserStep > step.num
                        ? "bg-emerald-100 text-emerald-600"
                        : addUserStep === step.num
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {addUserStep > step.num ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      addUserStep >= step.num
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="p-8 h-[380px] overflow-y-auto">
              {addUserStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Jane Doe"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="jane@example.com"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Role
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() =>
                          setNewUser({ ...newUser, role: "Student" })
                        }
                        className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                          newUser.role === "Student"
                            ? "border-blue-600 bg-blue-50/50 text-blue-700"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Student
                      </button>
                      <button
                        onClick={() =>
                          setNewUser({ ...newUser, role: "Educator" })
                        }
                        className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                          newUser.role === "Educator"
                            ? "border-blue-600 bg-blue-50/50 text-blue-700"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Educator
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {addUserStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Select Institution
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                        value={newUser.institution}
                        onChange={(e) =>
                          setNewUser({ ...newUser, institution: e.target.value })
                        }
                      >
                        <option value="">Select institution...</option>
                        <option value="YETZU University">YETZU University</option>
                        <option value="Global Tech">Global Tech</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Select Department
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                        value={newUser.department}
                        onChange={(e) =>
                          setNewUser({ ...newUser, department: e.target.value })
                        }
                      >
                        <option value="">Select department...</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Engineering">Engineering</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {addUserStep === 3 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-4">
                    Permissions for {newUser.role}
                  </h3>
                  <div className="space-y-1 border border-slate-200 rounded-lg p-2 bg-slate-50">
                    {[
                      { key: "manageSessions", label: "Manage Sessions" },
                      { key: "manageAssignments", label: "Manage Assignments" },
                      { key: "viewAnalytics", label: "View Analytics" },
                      { key: "manageUsers", label: "Manage Users" },
                      { key: "manageBilling", label: "Manage Billing" },
                      { key: "manageSettings", label: "Manage Settings" },
                    ].map((perm) => (
                      <div
                        key={perm.key}
                        className="flex items-center justify-between px-4 py-3 bg-white border border-slate-100 rounded-md shadow-sm"
                      >
                        <span className="text-sm font-medium text-slate-700">
                          {perm.label}
                        </span>
                        <button
                          onClick={() =>
                            setNewUser({
                              ...newUser,
                              permissions: {
                                ...newUser.permissions,
                                [perm.key]:
                                  !newUser.permissions[
                                    perm.key as keyof typeof newUser.permissions
                                  ],
                              },
                            })
                          }
                          className={`w-11 h-6 rounded-full transition-colors relative ${
                            newUser.permissions[
                              perm.key as keyof typeof newUser.permissions
                            ]
                              ? "bg-blue-600"
                              : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              newUser.permissions[
                                perm.key as keyof typeof newUser.permissions
                              ]
                                ? "left-6"
                                : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {addUserStep === 4 && (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                        Name
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {newUser.name || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                        Email Address
                      </p>
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {newUser.email || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                        Role
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {newUser.role}
                      </p>
                    </div>
                  </div>

                  {/* Invite Method */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3">
                      Invite method
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() =>
                          setNewUser({ ...newUser, inviteMethod: "email" })
                        }
                        className={`p-4 rounded-lg border text-left transition-colors flex items-start gap-3 ${
                          newUser.inviteMethod === "email"
                            ? "border-blue-600 bg-blue-50/50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Mail
                          className={`w-5 h-5 ${
                            newUser.inviteMethod === "email"
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}
                        />
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              newUser.inviteMethod === "email"
                                ? "text-blue-700"
                                : "text-slate-700"
                            }`}
                          >
                            Email Invite
                          </p>
                        </div>
                      </button>
                      <button
                        onClick={() =>
                          setNewUser({ ...newUser, inviteMethod: "temp" })
                        }
                        className={`p-4 rounded-lg border text-left transition-colors flex items-start gap-3 ${
                          newUser.inviteMethod === "temp"
                            ? "border-blue-600 bg-blue-50/50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Key
                          className={`w-5 h-5 ${
                            newUser.inviteMethod === "temp"
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}
                        />
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              newUser.inviteMethod === "temp"
                                ? "text-blue-700"
                                : "text-slate-700"
                            }`}
                          >
                            Temp Password
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Info Banner */}
                  {newUser.inviteMethod === "email" && (
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3 text-blue-700">
                      <Info className="w-5 h-5 text-blue-500 shrink-0" />
                      <p className="text-sm">
                        An invitation link will be sent to the user's email
                        address. They will be prompted to create a password.
                      </p>
                    </div>
                  )}
                  {newUser.inviteMethod === "temp" && (
                    <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3 text-slate-700 border border-slate-100">
                      <Info className="w-5 h-5 text-slate-500 shrink-0" />
                      <p className="text-sm">
                        A temporary password will be generated and shown after
                        creation. You must share it with the user manually.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-xl">
              <div>
                {addUserStep === 1 ? (
                  <button
                    onClick={() => setIsAddUserOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => setAddUserStep((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    &lt; Back
                  </button>
                )}
              </div>
              <div>
                {addUserStep < 4 ? (
                  <button
                    onClick={() => setAddUserStep((p) => Math.min(4, p + 1))}
                    className="px-6 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAddUserOpen(false);
                      setAddUserStep(1);
                      // In a real app, form submission happens here
                    }}
                    className="px-6 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Add User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
