"use client";

import React, { useMemo, useState } from "react";
import { Activity, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: "webinar" | "assignment" | "certificate" | "user" | "cohort";
}

interface LiveActivityFeedProps {
  items: Array<Record<string, any>>;
}

const getTypeStyles = (type: string) => {
  switch (type) {
    case "webinar":
      return "bg-blue-50 text-blue-600";
    case "assignment":
      return "bg-amber-50 text-amber-600";
    case "certificate":
      return "bg-emerald-50 text-emerald-600";
    case "user":
      return "bg-purple-50 text-purple-600";
    case "cohort":
      return "bg-rose-50 text-rose-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

const ITEMS_PER_PAGE = 6;

const formatTimestamp = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

export default function LiveActivityFeed({ items }: LiveActivityFeedProps) {
  const [page, setPage] = useState(1);

  const activityData = useMemo<ActivityItem[]>(
    () =>
      (items || []).map((item: any, index: number) => ({
        id: item.id || String(index),
        message: item.title || item.description || item.message || "Activity update",
        timestamp: formatTimestamp(item.time || item.timestamp || item.createdAt),
        type: String(item.source || item.type || "user").toLowerCase() as ActivityItem["type"],
      })),
    [items]
  );

  const totalPages = Math.max(1, Math.ceil(activityData.length / ITEMS_PER_PAGE));
  const paginatedData = activityData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8 w-full group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Activity size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-none">Activity Feed</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Real-time Updates
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div
        className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100 flex-1 overflow-y-auto custom-scrollbar"
        style={{ maxHeight: "35vh" }}
      >
        {activityData.length === 0 ? (
          <p className="text-sm text-gray-500 pl-14">No recent activity.</p>
        ) : (
          paginatedData.map((data) => (
            <div key={data.id} className="flex gap-4 relative group/item">
              <div
                className={`w-10 h-10 rounded-xl shrink-0 z-10 flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover/item:scale-110 duration-300 ${getTypeStyles(
                  data.type
                )}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <p className="text-sm font-bold text-gray-800 leading-snug group-hover/item:text-[#021165] transition-colors">
                    {data.message}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 whitespace-nowrap uppercase tracking-tighter">
                    <Clock size={10} />
                    {data.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-auto pt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
              page === p
                ? "bg-[#021165] text-white"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
