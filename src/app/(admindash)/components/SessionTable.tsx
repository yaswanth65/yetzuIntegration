"use client";

import { Session } from "@/app/(admindash)/types/SessionType";

interface Props {
  data: Session[];
  showHeader?: boolean;
  title?: string;
  onRowClick?: (session: Session) => void;
  selectedSessionId?: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
    Live: "text-green-600 bg-green-50",
    Scheduled: "text-blue-600 bg-blue-50",
    Completed: "text-gray-500 bg-gray-100",
    Missed: "text-red-600 bg-red-50",
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-4 h-4"
    >
      {/* Eye outline */}
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pupil */}
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    Live: "bg-green-100 text-green-800",
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-gray-100 text-gray-800",
    Missed: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
      {status === "Live" && (
        <span className="relative flex h-1.5 w-1.5 mr-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
        </span>
      )}
      {status}
    </span>
  );
}

export default function SessionTable({data,showHeader = true, title, onRowClick, selectedSessionId, className = "mt-10" }: Props) {

    return (
        <div className={`bg-white rounded-2xl border-2 border-gray-100 overflow-hidden w-full ${className}`}>
            {showHeader && (
              <div className="flex items-center justify-between p-6">
                <h1 className="font-semibold">{title || "Recent Sessions"}</h1>
                <p className="text-blue-600 text-sm font-semibold">View All</p>
            </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm table-auto">
                    <thead>
                        <tr className="bg-gray-100 border-b border-t border-gray-200">
                            {["Session ID", "Type", "Educator", "Students", "Date", "Status", "Actions"].map((col, idx) => (
                                <th key={idx} className="font-medium text-[14px] text-gray-600 px-7 py-4 text-left">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {(!data || data.length === 0) ? (
                          <tr>
                            <td colSpan={7} className="px-7 py-8 text-center text-gray-500">
                              No sessions found
                            </td>
                          </tr>
                        ) : data.map((item, idx) => {
                            const renderSafe = (value: any) => {
                              if (typeof value === 'object' && value !== null) {
                                return JSON.stringify(value);
                              }
                              return value;
                            };
                            return (
                            <tr 
                              key={idx} 
                              className={`transition-colors hover:bg-gray-50 ${selectedSessionId === item.id ? "bg-blue-50/50" : ""}`}
                            >
                                <td className="px-7 py-4 font-semibold">{renderSafe(item.id)}</td>
                                <td className="px-7 py-4 text-gray-500">{renderSafe(item.type)}</td>
                                <td className="px-7 py-4">{renderSafe(item.educator)}</td>
                                <td className="px-7 py-4 text-gray-500">{renderSafe(item.students)}</td>
                                <td className="px-7 py-4 text-gray-500">{renderSafe(item.date)}</td>
                                <td className="px-7 py-4"><StatusBadge status={item.status} /></td>
                                <td className="px-7 py-4">
                                  <button 
                                    onClick={() => onRowClick && onRowClick(item)}
                                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  >
                                    <EyeIcon/>
                                  </button>
                                </td>
                            </tr>
                        )})};
                    </tbody>

                </table>

            </div>

        </div>
    )
}
