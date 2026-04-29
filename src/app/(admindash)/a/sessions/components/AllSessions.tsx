"use client";

import React, { useMemo, useState, useEffect } from "react";
import SessionTable from "@/app/(admindash)/components/SessionTable";
import SessionDetailsPanel from "@/app/(admindash)/components/SessionDetailsPanel";
import { Session, Status, Tab } from "@/app/(admindash)/types/SessionType";
import { AdminAPI, asArray } from "@/lib/api";
import CreateSession from "./CreateSession";
import CalendarView from "./CalendarView";
import { Plus, Search, List, Calendar as CalendarIcon, Filter } from "lucide-react";

interface Props {
  data: Session[];
}

const tabs: Tab[] = ["All", "Upcoming", "Completed", "Missed"];

const tabStatusMap: Record<Exclude<Tab, "All">, Status> = {
  Upcoming: "Scheduled",
  Completed: "Completed",
  Missed: "Missed",
};

export default function AllSessions({ data }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [localData, setLocalData] = useState<Session[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setLocalData(data);
    }
  }, [data]);

  const refreshSessions = async () => {
    try {
      const response = await AdminAPI.getSessions();
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
        if (typeof stu === 'number') {
          studentsCount = stu;
        } else if (Array.isArray(stu)) {
          studentsCount = stu.length;
        } else if (item.attendees) {
          studentsCount = item.attendees;
        } else if (item.enrolledCount) {
          studentsCount = item.enrolledCount;
        }

        return {
          id: String(item.id || item._id || item.sessionId || item.sessionCode || `SESSION-${index + 1}`),
          type: String(sessionType || "Webinar"),
          educator: String(educatorName || "Educator"),
          students: Number(studentsCount) || 0,
          date: rawDate ? new Date(rawDate).toLocaleDateString() : "TBD",
          status: String(item.status === "Upcoming" ? "Scheduled" : (item.status || "Scheduled")),
        };
      });
      setLocalData(apiSessions as Session[]);
    } catch (error) {
      console.error("Failed to refresh sessions:", error);
    }
  };
  const filteredData = useMemo(() => {
    let list = localData;

    if (activeTab !== "All") {
      const status = tabStatusMap[activeTab];
      list = list.filter((session) => session.status === status);
    }

    if (search.trim()) {
      const lowered = search.toLowerCase();
      list = list.filter(
        (session) =>
          String(session.id).toLowerCase().includes(lowered) ||
          String(session.educator).toLowerCase().includes(lowered)
      );
    }

    return list;
  }, [activeTab, localData, search]);

  const tabCounts = useMemo(
    () => ({
      All: localData.length,
      Upcoming: localData.filter((session) => session.status === "Scheduled").length,
      Completed: localData.filter((session) => session.status === "Completed").length,
      Missed: localData.filter((session) => session.status === "Missed").length,
    }),
    [localData]
  );

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
    <div className="flex flex-col gap-8 p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#021165] tracking-tight">Sessions</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage and monitor all platform educational sessions</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center justify-center gap-2 bg-[#042BFD] text-white px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#0325D7] transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          Create Session
        </button>
      </div>

      {/* Filters & Search Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                activeTab === tab
                  ? "bg-white text-[#021165] shadow-sm ring-1 ring-black/5"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                activeTab === tab ? "bg-blue-50 text-blue-600" : "bg-gray-200 text-gray-500"
              }`}>
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 w-full lg:max-w-md">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#042BFD] transition-colors" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID or educator..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#042BFD]/20 transition-all shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#021165] hover:border-blue-100 transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex">
        <div className="inline-flex items-center bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2.5 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              viewMode === 'list'
                ? 'bg-white text-[#021165] shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <List size={16} />
            List
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2.5 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              viewMode === 'calendar'
                ? 'bg-white text-[#021165] shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <CalendarIcon size={16} />
            Calendar
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full">
        {viewMode === 'list' ? (
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <SessionTable 
              data={filteredData} 
              showHeader={true} 
              onRowClick={setSelectedSession}
              selectedSessionId={selectedSession?.id}
            />
          </div>
        ) : (
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8">
            <CalendarView data={filteredData} />
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

      <div className="pb-10" />
    </div>
  );
}
