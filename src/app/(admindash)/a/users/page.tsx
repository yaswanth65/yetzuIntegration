"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
  Check,
} from "lucide-react";
import { UsersTable } from "./components/UsersTable";
import { PermissionsDrawer } from "./components/PermissionsDrawer";
import { AddUserModal } from "./components/AddUserModal";
import { TabType, User } from "./components/types";
import { AdminAPI, asArray } from "@/lib/api";
import { toast } from "react-hot-toast";

interface FilterSection {
  title: string;
  type: "checkboxes" | "text" | "number-range" | "select";
  options?: { label: string; value: string }[];
  placeholder?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const filterPanelRef = useRef<HTMLDivElement>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: any = {};

      if (searchQuery) params.search = searchQuery;
      if (activeTab === "Students") params.role = "student";
      if (activeTab === "Educators") params.role = "educator";
      if (activeFilters["Status"] && activeFilters["Status"].length > 0) {
        params.status = activeFilters["Status"][0];
      }

      const response = await AdminAPI.getUsers(params);
      const responseData = response?.data || response;
      const rawUsers = asArray(responseData?.list || responseData);

      const apiUsers = rawUsers.map((item: any) => {
        const role = String(item.role || "").toLowerCase();
        return {
          id: String(item.id || item.userId || "-"),
          name: String(item.name || "-"),
          email: String(item.email || "-"),
          role: role === "student" ? "Student" : role === "educator" ? "Educator" : role === "admin" ? "Admin" : "Student",
          status: String(item.status || "active").toLowerCase() === "active" ? "Active" : "Suspended",
          joined: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
          sessions: Number(item.sessionCount || item.sessions || 0),
          mobileno: String(item.mobileno || ""),
        };
      });

      setUsers(apiUsers as User[]);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchQuery, activeFilters]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  useEffect(() => {
    if (!isFilterOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isFilterOpen]);

  const handleExport = () => {
    try {
      const headers = ["User ID", "Name", "Email", "Role", "Status", "Joined", "Sessions"];
      const csvRows = [
        headers.join(","),
        ...filteredUsers.map((user) =>
          [user.id, `"${user.name}"`, user.email, user.role, user.status, user.joined, user.sessions].join(",")
        ),
      ];
      const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `users_export_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Users exported successfully");
    } catch (error) {
      toast.error("Failed to export users");
    }
  };

  const filterSections: FilterSection[] = [
    {
      title: "Role",
      type: "checkboxes",
      options: [
        { label: "Student", value: "student" },
        { label: "Educator", value: "educator" },
        { label: "Admin", value: "admin" },
      ],
    },
    {
      title: "Status",
      type: "checkboxes",
      options: [
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
      ],
    },
    {
      title: "Search by Name/Email",
      type: "text",
      placeholder: "Enter name or email...",
    },
    {
      title: "Sessions Range",
      type: "number-range",
      minPlaceholder: "Min sessions",
      maxPlaceholder: "Max sessions",
    },
  ];

  const handleCheckboxChange = (sectionTitle: string, value: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const currentValues = prev[sectionTitle] || [];
      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter((v: string) => v !== value);
      return { ...prev, [sectionTitle]: updated };
    });
  };

  const handleTextChange = (sectionTitle: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [sectionTitle]: value }));
  };

  const handleNumberRangeChange = (sectionTitle: string, field: "min" | "max", value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [sectionTitle]: { ...(prev[sectionTitle] || {}), [field]: value },
    }));
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    fetchUsers();
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    fetchUsers();
  };

  const filteredUsers = users.filter((user) => {
    const matchesTab =
      activeTab === "All Users" ? true :
      activeTab === "Students" ? user.role === "Student" :
      activeTab === "Educators" ? user.role === "Educator" : true;

    if (activeFilters["Status"] && activeFilters["Status"].length > 0) {
      const statusFilter = activeFilters["Status"][0];
      const userStatus = user.status === "Active" ? "active" : "suspended";
      if (userStatus !== statusFilter) return false;
    }

    if (activeFilters["Role"] && activeFilters["Role"].length > 0) {
      const roleFilter = activeFilters["Role"][0];
      const userRole = user.role === "Student" ? "student" : user.role === "Educator" ? "educator" : "admin";
      if (userRole !== roleFilter) return false;
    }

    if (activeFilters["Sessions Range"]) {
      const { min, max } = activeFilters["Sessions Range"];
      if (min && user.sessions < Number(min)) return false;
      if (max && user.sessions > Number(max)) return false;
    }

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  const activeFilterCount = Object.values(activeFilters).reduce((acc: number, val) => {
    if (Array.isArray(val)) return acc + val.length;
    if (val && typeof val === "object") return acc + Object.values(val).filter(Boolean).length;
    return acc + (val ? 1 : 0);
  }, 0);

  return (
    <div className="w-full flex-1 p-8 text-gray-900 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-medium text-[#021165] sm:text-3xl md:text-4xl">
          User Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage all users, roles, and permissions across the platform</p>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsPermissionsOpen(true)} className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
            <Shield className="w-4 h-4 mr-2 text-slate-500" />Permissions
          </button>
          <button onClick={handleExport} className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4 mr-2 text-slate-500" />Export
          </button>
          <button onClick={() => setIsAddUserOpen(true)} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0f172a] rounded-md hover:bg-slate-800 transition-colors">
            <Plus className="w-4 h-4 mr-2" />Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-8">
          {(["All Users", "Students", "Educators"] as TabType[]).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === tab ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
              }`}>
              {tab}
              {activeTab === tab && <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-600 rounded-t-full" />}
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
          <input type="text" className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="relative">
          <button onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-slate-50 transition-colors shrink-0 ${
              isFilterOpen || activeFilterCount > 0
                ? "border-blue-300 text-blue-600 bg-blue-50"
                : "border-slate-200 text-slate-700"
            }`}>
            <Filter className="w-4 h-4 mr-2 text-slate-500" />Filters
            {activeFilterCount > 0 && <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{activeFilterCount}</span>}
          </button>

          {/* Mega Dropdown Filter Panel */}
          {isFilterOpen && (
            <div ref={filterPanelRef} className="absolute right-0 top-full mt-2 z-50 w-[480px] bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={16} /></button>
              </div>
              <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
                {filterSections.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{section.title}</h4>
                    {section.type === "checkboxes" && section.options && (
                      <div className="grid grid-cols-2 gap-2">
                        {section.options.map((option) => {
                          const isChecked = (activeFilters[section.title] || []).includes(option.value);
                          return (
                            <label
                              key={option.value}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                                isChecked
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                  isChecked ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300"
                                }`}
                              >
                                {isChecked && <Check size={12} strokeWidth={3} />}
                              </div>
                              <span className="text-sm font-medium">{option.label}</span>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={isChecked}
                                onChange={(e) => handleCheckboxChange(section.title, option.value, e.target.checked)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {section.type === "text" && (
                      <input
                        type="text"
                        placeholder={section.placeholder || "Search..."}
                        value={activeFilters[section.title] || ""}
                        onChange={(e) => handleTextChange(section.title, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    )}

                    {section.type === "number-range" && (
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder={section.minPlaceholder || "Min"}
                          value={(activeFilters[section.title] || {}).min || ""}
                          onChange={(e) => handleNumberRangeChange(section.title, "min", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                        <input
                          type="number"
                          placeholder={section.maxPlaceholder || "Max"}
                          value={(activeFilters[section.title] || {}).max || ""}
                          onChange={(e) => handleNumberRangeChange(section.title, "max", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <button onClick={() => { setActiveFilters({}); handleResetFilters(); }} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors">
                  Reset
                </button>
                <button onClick={handleApplyFilters} className="px-6 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <div className="text-center py-12"><p className="text-slate-500">Loading users...</p></div>}

      {/* Data Table */}
      {!isLoading && <UsersTable users={filteredUsers} onRefresh={fetchUsers} />}

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <p className="text-sm text-slate-500">Showing {filteredUsers.length} of {users.length} users</p>
        <div className="flex items-center gap-1">
          <button className="p-2 border border-slate-200 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <button className="px-3 py-1.5 min-w-[32px] border border-slate-200 rounded-md text-sm font-medium bg-slate-50 text-slate-900 transition-colors">1</button>
          <button className="p-2 border border-slate-200 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <PermissionsDrawer isOpen={isPermissionsOpen} onClose={() => setIsPermissionsOpen(false)} />
      <AddUserModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)}
        onSubmit={async (user) => {
          try { await AdminAPI.createUser(user); toast.success("User created successfully"); await fetchUsers(); }
          catch (error) { toast.error("Failed to create user"); }
        }}
      />
    </div>
  );
}
