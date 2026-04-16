"use client"
import React, { useMemo, useState } from "react";
import SessionTable from "@/app/(admindash)/components/SessionTable";
import { Session, Status, Tab } from "@/app/(admindash)/types/SessionType";

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

  const filteredData = useMemo(() => {
    let list = data;

    if (activeTab !== "All") {
      const status = tabStatusMap[activeTab];
      list = list.filter((session) => session.status === status);
    }

    if (search.trim()) {
      const lowered = search.toLowerCase();
      list = list.filter(
        (session) =>
          session.id.toLowerCase().includes(lowered) ||
          session.educator.toLowerCase().includes(lowered)
      );
    }

    return list;
  }, [activeTab, data, search]);

  const tabCounts = useMemo(
    () => ({
      All: data.length,
      Upcoming: data.filter((session) => session.status === "Scheduled").length,
      Completed: data.filter((session) => session.status === "Completed").length,
      Missed: data.filter((session) => session.status === "Missed").length,
    }),
    [data]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
        <button className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm">
          <i className="ri-add-line"></i>
          Create Session
        </button>
      </div>

      <div className="flex flex-col gap-4  border-gray-200 mb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-7">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={` relative flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === tab
                  ? "text-gray-900 border-b-2 py-3 border-blue-600"
                  : "text-gray-500 hover:text-gray-70"
                }`}
            >
              {tab}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${ activeTab  === tab ? "bg-blue-100 text-blue-800" :"bg-gray-200 text-gray-400"}`}>
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">

          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by session ID or educator"
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder-gray-400 text-gray-700"
          />
        </div>
      </div>

      <SessionTable data={filteredData} showHeader={false} />
    </div>
  );
}
