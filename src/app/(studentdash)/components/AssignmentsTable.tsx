"use client";

import React from "react";
import { Filter, ArrowRight, Download, Menu } from "lucide-react";
import { PENDING_ASSIGNMENTS } from "../constants";


// Updated Data with 'uploadOn' field included
 

const TypePill: React.FC<{ type: string }> = ({ type }) => {
  let bgClass = "bg-gray-100 text-gray-700 border-gray-200";
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("webinar")) {
    bgClass = "bg-[#EBF6EB] text-[#31AA27] border border-[#EBF6EB]";
  } else if (normalizedType.includes("mentorship")) {
    bgClass = "bg-[#E6EAFF] text-[#0325D7] border border-[#E6EAFF]";
  } else if (normalizedType.includes("cohort")) {
    bgClass = "bg-[#FCE4EC] text-[#CB30E0] border border-[#FCE4EC]";
  }

  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[12px] font-bold leading-none ${bgClass}`}>
      {type}
    </span>
  );
};

const AssignmentsTable: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm overflow-hidden flex flex-col font-['Inter'] w-full">
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
        <div className="flex  items-center gap-2">
          {/* <Filter className="w-4 h-4 text-[#021165]" /> */}
          <h3 className="text-lg font-bold text-[#021165]">
             Pending assignments
          </h3>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#021165] transition-colors">
          View All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[800px] font-inter text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Assignment ID
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Assignment Title
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Upload on
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Type
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Deadline
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {PENDING_ASSIGNMENTS.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50/80 transition-colors group"
              >
                <td className="py-4 px-6 text-xs text-gray-500 font-medium whitespace-nowrap">
                  {item.id}
                </td>
                <td className="py-4 px-6 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  {item.title}
                </td>
                <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                  {item.uploadOn}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <TypePill type={item.type} />
                </td>
                <td className="py-4 px-6 text-xs text-gray-500 font-medium whitespace-nowrap">
                  {item.deadline}
                </td>
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <button className="p-2 text-gray-400 hover:text-[#042BFD] hover:bg-blue-50 rounded-lg transition-all inline-flex items-center">
                    <Download size={18} />
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