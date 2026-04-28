"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, AlertTriangle, Info, ChevronRight } from "lucide-react";
import { AdminAPI, asArray } from "@/lib/api";

type AlertType = "error" | "warning" | "info"

interface AlertItems {
    id: string;
    alertName: string;
    type: AlertType;
    time: string;
}

const getAlertStyles = (type: AlertType) => {
  switch (type) {
    case 'error': return {
      icon: AlertCircle,
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-100',
      shadow: 'shadow-red-900/5'
    };
    case 'warning': return {
      icon: AlertTriangle,
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      shadow: 'shadow-amber-900/5'
    };
    case 'info': return {
      icon: Info,
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      shadow: 'shadow-blue-900/5'
    };
    default: return {
      icon: Info,
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      shadow: 'shadow-blue-900/5'
    };
  }
};

export default function AlertIssues() {
    const [alerts, setAlerts] = useState<AlertItems[]>([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await AdminAPI.getOverview();
                const data = response?.data || response;
                const rawAlerts = asArray(data?.alerts || data?.issues || data?.alertIssues);
                setAlerts(rawAlerts.map((item: any, index: number) => ({
                    id: item.id || String(index),
                    alertName: item.title || item.alertName || item.message || item.description || "Alert",
                    type: String(item.type || item.severity || "info").toLowerCase() as AlertType,
                    time: item.timeAgo || item.time || item.createdAt || "",
                })));
            } catch {
                setAlerts([]);
            }
        };
        fetchAlerts();
    }, []);

    return (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8 w-full group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                        <AlertCircle size={22} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-none">Alerts & Issues</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Action Required</p>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-black text-[#021165] border border-gray-100">
                    {alerts.length}
                </div>
            </div>

            <div className="space-y-4">
                {alerts.length === 0 ? (
                    <p className="text-sm text-gray-500">No alerts or issues.</p>
                ) : alerts.map((data) => {
                    const styles = getAlertStyles(data.type);
                    const Icon = styles.icon;

                    return (
                        <div 
                            key={data.id} 
                            className={`flex items-center gap-4 p-4 rounded-2xl border ${styles.bg} ${styles.border} hover:${styles.shadow} transition-all duration-300 group/alert cursor-pointer`}
                        >
                            <div className={`p-2 rounded-xl bg-white shadow-sm ${styles.text}`}>
                                <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className={`text-sm font-bold truncate ${styles.text}`}>{data.alertName}</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5 tracking-tighter">{data.time}</p>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover/alert:text-gray-500 group-hover/alert:translate-x-0.5 transition-all" />
                        </div>
                    )
                })}
            </div>

            <button className="w-full mt-8 py-3 text-xs font-bold text-[#021165] hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all uppercase tracking-widest">
                Resolve All
            </button>
        </div>
    );
}
