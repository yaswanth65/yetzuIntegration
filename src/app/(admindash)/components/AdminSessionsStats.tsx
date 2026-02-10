"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { SESSIONS_STATS } from "../sessions_constants";

const AdminSessionsStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SESSIONS_STATS.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-[124px]"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-[32px] font-bold text-gray-900 leading-none">
              {stat.value}
            </h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
          <div className="flex items-center gap-1">
            {stat.isPositive ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
            <span
              className={`text-xs font-bold ${stat.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {stat.growth}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSessionsStats;
