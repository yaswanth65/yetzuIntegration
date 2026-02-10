"use client";

import React from "react";
import { ADMIN_STATS_DATA } from "../constants";

const AdminStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ADMIN_STATS_DATA.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-[120px]"
        >
          <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsGrid;
