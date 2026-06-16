"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, AlertTriangle, Info, ChevronRight } from "lucide-react";

type AlertType = "error" | "warning" | "info";

interface AlertItems {
  id: string;
  alertName: string;
  type: AlertType;
  time: string;
}

interface AlertIssuesProps {
  alerts: Array<Record<string, any>>;
}

const getAlertStyles = (type: AlertType) => {
  switch (type) {
    case "error":
      return {
        icon: AlertCircle,
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-100",
        shadow: "shadow-red-900/5",
      };
    case "warning":
      return {
        icon: AlertTriangle,
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-100",
        shadow: "shadow-amber-900/5",
      };
    case "info":
      return {
        icon: Info,
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
        shadow: "shadow-blue-900/5",
      };
    default:
      return {
        icon: Info,
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
        shadow: "shadow-blue-900/5",
      };
  }
};

const ITEMS_PER_PAGE = 5;

export default function AlertIssues({ alerts }: AlertIssuesProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const normalizedAlerts: AlertItems[] = (alerts || []).map((item: any, index: number) => ({
    id: item.id || String(index),
    alertName: item.title || item.alertName || item.message || item.description || "Alert",
    type: String(item.priority || item.type || item.severity || "info").toLowerCase() === "high"
      ? "error"
      : String(item.priority || item.type || item.severity || "info").toLowerCase() === "medium"
        ? "warning"
        : "info",
    time: item.timeAgo || item.time || item.createdAt || "",
  }));

  const totalPages = Math.max(1, Math.ceil(normalizedAlerts.length / ITEMS_PER_PAGE));
  const paginatedAlerts = normalizedAlerts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8 w-full group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
            <AlertCircle size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-none">Alerts & Issues</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Action Required
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-black text-[#021165] border border-gray-100">
          {normalizedAlerts.length}
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar" style={{ maxHeight: "35vh" }}>
        {normalizedAlerts.length === 0 ? (
          <p className="text-sm text-gray-500">No alerts or issues.</p>
        ) : (
          paginatedAlerts.map((data) => {
            const styles = getAlertStyles(data.type);
            const Icon = styles.icon;

            return (
              <div
                key={data.id}
                onClick={() => router.push(`/a/analytics`)}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${styles.bg} ${styles.border} hover:${styles.shadow} transition-all duration-300 group/alert cursor-pointer`}
              >
                <div className={`p-2 rounded-xl bg-white shadow-sm ${styles.text}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-bold truncate ${styles.text}`}>{data.alertName}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5 tracking-tighter">
                    {data.time}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover/alert:text-gray-500 group-hover/alert:translate-x-0.5 transition-all" />
              </div>
            );
          })
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
