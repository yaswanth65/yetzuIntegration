"use client";

import React from "react";
import { AlertCircle, AlertTriangle, Info, ChevronRight } from "lucide-react";

type AlertType = "error" | "warning" | "info"

interface AlertItems {
    id: string;
    alertName: string;
    type: AlertType;
    time: string;
}

const AlertData: AlertItems[] = [
    { id: "1", alertName: "Payment failure for student ID #4821", type: "error", time: "5m ago" },
    { id: "2", alertName: "Session conflict: WEB-204 & COH-112 overlap", type: "warning", time: "12m ago" },
    { id: "3", alertName: "3 assignments overdue in Cohort Batch 11", type: "warning", time: "45m ago" },
    { id: "4", alertName: "Educator Dr. Patel unavailable on Mar 17", type: "info", time: "2h ago" },
];

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
  }
};

export default function AlertIssues() {
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
                    4
                </div>
            </div>

            <div className="space-y-4">
                {AlertData.map((data) => {
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
