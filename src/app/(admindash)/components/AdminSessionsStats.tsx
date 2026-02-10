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
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-[120px] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-3xl font-medium text-gray-900 leading-none">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500 font-normal mt-1">
              {stat.label}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {stat.isPositive ? (
              <TrendingUp size={14} className="text-green-500" />
            ) : (
              <TrendingDown size={14} className="text-red-500" />
            )}
            <span
              className={`text-xs font-medium ${
                stat.isPositive ? "text-green-500" : "text-red-500"
              }`}
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
