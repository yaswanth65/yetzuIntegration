"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import SessionTable from "@/app/(admindash)/components/SessionTable";
import SessionDetailsPanel from "@/app/(admindash)/components/SessionDetailsPanel";
import { Session, Status, Tab } from "@/app/(admindash)/types/SessionType";
import { AdminAPI, asArray } from "@/lib/api";
import CreateSession from "./CreateSession";
import CalendarView from "./CalendarView";
import { Plus, Search, List, Calendar as CalendarIcon, Filter, X, Check, ChevronDown } from "lucide-react";

interface Props {
  data: Session[];
}

const tabs: Tab[] = ["All", "Upcoming", "Completed", "Missed", "Draft"];

const tabStatusMap: Record<Exclude<Tab, "All">, Status> = {
  Upcoming: "Scheduled",
  Completed: "Completed",
  Missed: "Missed",
  Draft: "draft",
};

interface FilterSection {
  title: string;
  type: "checkboxes" | "text" | "number-range" | "select";
  options?: { label: string; value: string }[];
  placeholder?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

export default function AllSessions({ data }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [localData, setLocalData] = useState<Session[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const filterPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalData([]);
    if (data && data.length > 0) {
      const mappedData = data.map((item: any, index: number) => {
        const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
        
        let educatorName = "Educator";
        const edu = item.educator;
        if (typeof edu === 'string') {
          educatorName = edu;
        } else if (edu && typeof edu === 'object' && edu !== null) {
          educatorName = edu.name || edu.full_name || edu.displayName || String(edu.id || "");
        } else if (item.educatorName) {
          educatorName = item.educatorName;
        } else if (item.mentorName) {
          educatorName = item.mentorName;
        }

        let sessionType = "Webinar";
        const typ = item.type;
        if (typeof typ === 'string') {
          sessionType = typ;
        } else if (typ && typeof typ === 'object' && typ !== null) {
          sessionType = typ.name || typ.type || typ.displayName || "Webinar";
        } else if (item.sessionType) {
          sessionType = item.sessionType;
        }

        let studentsCount = 0;
        const stu = item.students;
        if (typeof stu === 'number' && !isNaN(stu)) {
          studentsCount = stu;
        } else if (Array.isArray(stu)) {
          studentsCount = stu.length;
        } else if (typeof item.attendees === 'number' && !isNaN(item.attendees)) {
          studentsCount = item.attendees;
        } else if (typeof item.enrolledCount === 'number' && !isNaN(item.enrolledCount)) {
          studentsCount = item.enrolledCount;
        }

        let status = item.status || "Scheduled";
        if (status === "draft") status = "draft";
        else if (status === "upcoming" || status === "Upcoming") status = "Scheduled";
        else if (status === "live" || status === "Live") status = "Live";
        else if (status === "completed" || status === "Completed") status = "Completed";
        else if (status === "missed" || status === "Missed") status = "Missed";

        const dateTime = rawDate ? new Date(rawDate) : new Date();

        return {
          id: String(item.id || item._id || item.sessionId || item.sessionCode || `SESSION-${index + 1}`),
          title: String(item.title || item.name || item.courseTitle || "Untitled Session"),
          type: String(sessionType || "Webinar"),
          educator: String(educatorName || "Educator"),
          students: Number(studentsCount) || 0,
          date: rawDate ? dateTime.toLocaleDateString() : "TBD",
          dateTime: dateTime,
          status: String(status),
          sessionCode: String(item.sessionCode || ""),
          startTime: item.startTime || "",
          endTime: item.endTime || "",
          mode: item.mode || "",
        };
      });
      setLocalData(mappedData as Session[]);
    }
  }, [data]);

  const refreshSessions = async () => {
    try {
      const response = await AdminAPI.getSessions({ limit: 200 });
      const rawData = asArray(response);
      const apiSessions = rawData.map((item: any, index: number) => {
        const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
        
        let educatorName = "Educator";
        const edu = item.educator;
        if (typeof edu === 'string') {
          educatorName = edu;
        } else if (edu && typeof edu === 'object' && edu !== null) {
          educatorName = edu.name || edu.full_name || edu.displayName || String(edu.id || "");
        } else if (item.educatorName) {
          educatorName = item.educatorName;
        } else if (item.mentorName) {
          educatorName = item.mentorName;
        }

        let sessionType = "Webinar";
        const typ = item.type;
        if (typeof typ === 'string') {
          sessionType = typ;
        } else if (typ && typeof typ === 'object' && typ !== null) {
          sessionType = typ.name || typ.type || typ.displayName || "Webinar";
        } else if (item.sessionType) {
          sessionType = item.sessionType;
        }

        let studentsCount = 0;
        const stu = item.students;
        if (typeof stu === 'number' && !isNaN(stu)) {
          studentsCount = stu;
        } else if (Array.isArray(stu)) {
          studentsCount = stu.length;
        } else if (typeof item.attendees === 'number' && !isNaN(item.attendees)) {
          studentsCount = item.attendees;
        } else if (typeof item.enrolledCount === 'number' && !isNaN(item.enrolledCount)) {
          studentsCount = item.enrolledCount;
        }

        let status = item.status || "Scheduled";
        if (status === "draft") status = "draft";
        else if (status === "upcoming" || status === "Upcoming") status = "Scheduled";
        else if (status === "live" || status === "Live") status = "Live";
        else if (status === "completed" || status === "Completed") status = "Completed";
        else if (status === "missed" || status === "Missed") status = "Missed";

        const dateTime = rawDate ? new Date(rawDate) : new Date();

        return {
          id: String(item.id || item._id || item.sessionId || item.sessionCode || `SESSION-${index + 1}`),
          title: String(item.title || item.name || item.courseTitle || "Untitled Session"),
          type: String(sessionType || "Webinar"),
          educator: String(educatorName || "Educator"),
          students: Number(studentsCount) || 0,
          date: rawDate ? dateTime.toLocaleDateString() : "TBD",
          dateTime: dateTime,
          status: String(status),
          sessionCode: String(item.sessionCode || ""),
          startTime: item.startTime || "",
          endTime: item.endTime || "",
          mode: item.mode || "",
        };
      });
      setLocalData(apiSessions as Session[]);
    } catch (error) {
      console.error("Failed to refresh sessions:", error);
    }
  };

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

  const [sortBy, setSortBy] = useState<"date" | "title" | "students">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filterSections: FilterSection[] = [
    {
      title: "Status",
      type: "checkboxes",
      options: [
        { label: "Scheduled", value: "Scheduled" },
        { label: "Completed", value: "Completed" },
        { label: "Missed", value: "Missed" },
        { label: "Live", value: "Live" },
        { label: "Draft", value: "draft" },
      ],
    },
    {
      title: "Educator",
      type: "select",
      options: [
        ...[...new Set(localData.map(s => s.educator))].map(edu => ({ label: edu, value: edu })),
      ],
    },
    {
      title: "Session Type",
      type: "checkboxes",
      options: [
        { label: "Webinar", value: "Webinar" },
        { label: "Workshop", value: "Workshop" },
        { label: "Course", value: "Course" },
      ],
    },
    {
      title: "Students Range",
      type: "number-range",
      minPlaceholder: "Min students",
      maxPlaceholder: "Max students",
    },
  ];

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setActiveFilters({});
  };

  const filteredData = useMemo(() => {
    let list = [...localData];

    if (activeTab !== "All") {
      const status = tabStatusMap[activeTab];
      list = list.filter((session) => session.status === status);
    }

    if (activeFilters["Status"] && activeFilters["Status"].length > 0) {
      list = list.filter((session) => activeFilters["Status"].includes(session.status));
    }

    if (activeFilters["Educator"]) {
      list = list.filter((session) => session.educator === activeFilters["Educator"]);
    }

    if (activeFilters["Session Type"] && activeFilters["Session Type"].length > 0) {
      list = list.filter((session) => activeFilters["Session Type"].includes(session.type));
    }

    if (activeFilters["Students Range"]) {
      const { min, max } = activeFilters["Students Range"];
      list = list.filter((session) => {
        if (min && session.students < Number(min)) return false;
        if (max && session.students > Number(max)) return false;
        return true;
      });
    }

    if (search.trim()) {
      const lowered = search.toLowerCase();
      list = list.filter(
        (session) =>
          String(session.id).toLowerCase().includes(lowered) ||
          String(session.title).toLowerCase().includes(lowered) ||
          String(session.educator).toLowerCase().includes(lowered)
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "date") {
        const dateA = new Date(a.date).getTime() || 0;
        const dateB = new Date(b.date).getTime() || 0;
        cmp = dateA - dateB;
      } else if (sortBy === "title") {
        cmp = (a.title || "").localeCompare(b.title || "");
      } else if (sortBy === "students") {
        cmp = (a.students || 0) - (b.students || 0);
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return list;
  }, [activeTab, localData, search, sortBy, sortOrder, activeFilters]);

  const tabCounts = useMemo(
    () => ({
      All: localData.length,
      Upcoming: localData.filter((session) => session.status === "Scheduled").length,
      Completed: localData.filter((session) => session.status === "Completed").length,
      Missed: localData.filter((session) => session.status === "Missed").length,
      Draft: localData.filter((session) => session.status === "draft").length,
    }),
    [localData]
  );

  const activeFilterCount = Object.values(activeFilters).reduce((acc: number, val) => {
    if (Array.isArray(val)) return acc + val.length;
    if (val && typeof val === "object") return acc + Object.values(val).filter(Boolean).length;
    return acc + (val ? 1 : 0);
  }, 0);

  if (isCreating) {
    return (
      <CreateSession
        onBack={() => setIsCreating(false)}
        onCreated={async () => {
          await refreshSessions();
          setSelectedSession(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <div className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Sessions</h1>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center justify-center gap-2 bg-[#021165] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#010d4a] transition-all active:scale-[0.98]"
          >
            <Plus size={16} strokeWidth={2.5} />
            Create Session
          </button>
        </div>
      </div>

      {/* Tab Navigation - Figma: Tab Menu Horizontal */}
      <div className="border-gray-200">
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-1.5 pb-3.5 pt-0 text-[14px] font-medium transition-colors ${
                  activeTab === tab
                    ? "text-[#0A0D14]"
                    : "text-[#525866] hover:text-[#0A0D14]"
                }`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "-0.006em",
                  fontFeatureSettings: "'cv09' on, 'ss11' on, 'calt' off, 'liga' off",
                }}
              >
                {tab}
                {tabCounts[tab] > 0 && (
                  <span 
                    className={`inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[11px] font-medium ${
                      activeTab === tab
                        ? "bg-[#E6EAFF] text-[#042BFD]"
                        : "bg-[#F3F4F6] text-[#717182]"
                    }`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "12px",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tabCounts[tab]}
                  </span>
                )}
                {activeTab === tab && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#375DFB]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <div 
              className="flex items-center gap-2 px-3 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg w-[320px]"
              style={{
                height: "39px",
              }}
            >
              <Search className="text-[#717182] flex-shrink-0" size={14} strokeWidth={1.5} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by session ID or educator"
                className="flex-1 bg-transparent text-[14px] text-[#0A0A0A] placeholder-[rgba(10,10,10,0.5)] focus:outline-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "17px",
                  letterSpacing: "-0.150391px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle & Filters */}
      <div className="py-4">
        <div className="flex items-center justify-between">
          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#F8F9FA] rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-[#021165] shadow-sm border border-gray-200'
                  : 'text-[#525866] hover:text-[#0A0D14]'
              }`}
            >
              <List size={14} strokeWidth={2} />
              Sessions List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-[#021165] shadow-sm border border-gray-200'
                  : 'text-[#525866] hover:text-[#0A0D14]'
              }`}
            >
              <CalendarIcon size={14} strokeWidth={2} />
              Calendar View
            </button>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none flex items-center gap-2 px-3 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#525866] focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Name</option>
                <option value="students">Sort by Students</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717182] pointer-events-none" size={14} />
            </div>

            {/* Sort Order Toggle */}
            <button 
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center justify-center w-9 h-9 bg-white border border-gray-200 rounded-lg text-[#717182] hover:text-[#021165] hover:border-blue-200 transition-colors"
              title={sortOrder === "asc" ? "Ascending" : "Descending"}
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>

            {/* Filter Button */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center justify-center w-9 h-9 border rounded-lg transition-colors ${
                  isFilterOpen || activeFilterCount > 0
                    ? "text-[#042BFD] border-blue-200 bg-blue-50"
                    : "text-[#717182] hover:text-[#021165] hover:border-blue-200 bg-white border-gray-200"
                }`}
              >
                <Filter size={16} strokeWidth={2} />
              </button>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#042BFD] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}

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
                                  onClick={() => {
                                    const current = activeFilters[section.title] || [];
                                    const updated = isChecked 
                                      ? current.filter((v: string) => v !== option.value)
                                      : [...current, option.value];
                                    setActiveFilters({ ...activeFilters, [section.title]: updated });
                                  }}
                                >
                                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                    isChecked ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300"
                                  }`}>
                                    {isChecked && <Check size={12} strokeWidth={3} />}
                                  </div>
                                  <span className="text-sm font-medium">{option.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}

                        {section.type === "select" && section.options && (
                          <select
                            value={activeFilters[section.title] || ""}
                            onChange={(e) => setActiveFilters({ ...activeFilters, [section.title]: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          >
                            <option value="">All Educators</option>
                            {section.options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        )}

                        {section.type === "number-range" && (
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="number"
                              placeholder={section.minPlaceholder || "Min"}
                              value={(activeFilters[section.title] || {}).min || ""}
                              onChange={(e) => setActiveFilters({
                                ...activeFilters,
                                [section.title]: { ...(activeFilters[section.title] || {}), min: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                            <input
                              type="number"
                              placeholder={section.maxPlaceholder || "Max"}
                              value={(activeFilters[section.title] || {}).max || ""}
                              onChange={(e) => setActiveFilters({
                                ...activeFilters,
                                [section.title]: { ...(activeFilters[section.title] || {}), max: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                    <button
                      onClick={() => { setActiveFilters({}); handleResetFilters(); }}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleApplyFilters}
                      className="px-6 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 pb-8">
        {viewMode === 'list' ? (
          <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden">
            <SessionTable 
              data={filteredData} 
              showHeader={true} 
              onRowClick={setSelectedSession}
              selectedSessionId={selectedSession?.id}
            />
          </div>
        ) : (
          <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-6">
            <CalendarView data={filteredData} onSessionClick={(session) => setSelectedSession(session)} />
          </div>
        )}
      </div>
      
      {/* Details Panel Overlay */}
      {selectedSession && (
        <>
          <div 
            className="fixed inset-0 bg-[#021165]/40 backdrop-blur-sm z-[60] transition-opacity" 
            onClick={() => setSelectedSession(null)} 
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-500">
            <SessionDetailsPanel 
               session={selectedSession} 
               onClose={() => setSelectedSession(null)} 
            />
          </div>
        </>
      )}
    </div>
  );
}
