"use client";

import React from "react";
import { PENDING_ASSIGNMENTS } from "../constants";
import { Menu, ChevronDown } from "lucide-react";

const TypePill: React.FC<{ type: string }> = ({ type }) => {
  let bgClass = "bg-gray-100 text-gray-800";

  if (type === "Webinar") bgClass = "bg-[#EBF6EB] text-[#31AA27]";
  else if (type === "1:1 Mentorship") bgClass = "bg-[#E6EAFF] text-[#0325D7]";
  else if (type === "Cohort") bgClass = "bg-[#FCE4EC] text-[#CB30E0]";

  return (
    <span
      className={`inline-flex items-center justify-center
        px-3 rounded-full
        font-nunito text-[12px] font-normal leading-[20px] tracking-[0]
        text-center align-middle
        ${bgClass}`}
    >
      {type}
    </span>
  );
};

const AssignmentsTable: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-blue-600 rounded-full hidden"></div>
          <Menu className="w-5 h-5 text-gray-400 mr-1" />
          <h3 className="text-base font-semibold text-gray-900">
            Pending assignments
          </h3>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800">
          View All <ChevronDown size={14} className="-rotate-90" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-5 text-sm font-medium text-gray-900 w-1/2">
                Webinar/Cohort
              </th>
              <th className="text-left py-4 px-5 text-sm font-medium text-gray-900">
                Type
              </th>
              <th className="text-left py-4 px-5 text-sm font-medium text-gray-900">
                Deadline
              </th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {PENDING_ASSIGNMENTS.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-5">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900 font-normal">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400 font-normal mt-0.5">
                      {item.id}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-5">
                  <TypePill type={item.type} />
                </td>
                <td className="py-3 px-5">
                  <span className="text-sm text-gray-900">{item.deadline}</span>
                </td>
                <td className="py-3 px-5 text-center">
                  <button className="bg-gray-100 p-1.5 rounded hover:bg-gray-200">
                    <ChevronDown size={14} className="text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentsTable;
