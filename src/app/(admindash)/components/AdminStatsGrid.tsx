"use client";

import React from "react";
import { ADMIN_STATS_DATA } from "../constants";

const AdminStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ADMIN_STATS_DATA.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-[120px] flex flex-col justify-between"
        >
          <h3 className="text-3xl font-medium text-gray-900 leading-none">
            {stat.value}
          </h3>

          <p className="text-sm text-gray-500 font-normal">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsGrid;
