"use client";

import { Session } from "@/app/(admindash)/types/SessionType";
import { useRouter } from "next/navigation";
import { shortenId } from "@/lib/utils/shortenId";

interface Props {
  data: Session[];
  showHeader?: boolean;
  title?: string;
  onRowClick?: (session: Session) => void;
  selectedSessionId?: string;
  className?: string;
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
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { bg: string; text: string; dot?: string }> = {
    Live: { 
      bg: "bg-[#ECFDF5]", 
      text: "text-[#007A55]",
      dot: "bg-[#007A55]"
    },
    Scheduled: { 
      bg: "bg-[#EFF6FF]", 
      text: "text-[#1447E6]"
    },
    Completed: { 
      bg: "bg-[#F3F4F6]", 
      text: "text-[#4A5565]"
    },
    Missed: { 
      bg: "bg-[#FEF2F2]", 
      text: "text-[#DC2626]"
    },
    draft: {
      bg: "bg-[#F3F4F6]",
      text: "text-[#717182]"
    }
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded ${config.bg}`}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: "11px",
        lineHeight: "16px",
        letterSpacing: "0.0644531px",
      }}
    >
      {status === "Live" && config.dot && (
        <span className="relative flex h-1.5 w-1.5 mr-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dot}`} />
        </span>
      )}
      <span className={config.text}>{status}</span>
    </span>
  );
}

function formatSessionDateTime(value?: string) {
  if (!value) return "TBD";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";

  const dateLabel = `${String(date.getUTCDate()).padStart(2, "0")}/${String(
    date.getUTCMonth() + 1
  ).padStart(2, "0")}/${date.getUTCFullYear()}`;
  const timeLabel = `${String(date.getUTCHours()).padStart(2, "0")}:${String(
    date.getUTCMinutes()
  ).padStart(2, "0")}`;

  return `${dateLabel} ${timeLabel}`;
}

export default function SessionTable({data,showHeader = true, title, onRowClick, selectedSessionId, className = "" }: Props) {
    const router = useRouter();

    const columns = [
      { key: "code", label: "Session ID" },
      { key: "title", label: "Session Name" },
      { key: "type", label: "Type" },
      { key: "educator", label: "Educator" },
      { key: "students", label: "Students" },
      { key: "startDateTime", label: "Start Date Time" },
      { key: "endDateTime", label: "End Date Time" },
      { key: "status", label: "Status" },
      { key: "actions", label: "Actions" },
    ];

    const gridCols = "grid-cols-[minmax(130px,1.3fr)_minmax(150px,1.5fr)_minmax(105px,1fr)_minmax(150px,2fr)_minmax(85px,0.7fr)_minmax(145px,1.3fr)_minmax(145px,1.3fr)_minmax(115px,1fr)_minmax(75px,0.6fr)]";

    return (
        <div className={`w-full ${className}`}>
            {/* Table Header */}
            <div 
              className={`grid ${gridCols} items-center bg-[#F8F9FA] border-b border-[rgba(0,0,0,0.1)]`}
              style={{ height: "45.5px" }}
            >
                {columns.map((col) => (
                    <div 
                      key={col.key}
                      className="flex items-center px-4 h-full"
                    >
                        <span 
                          className="text-[14px] font-medium text-[#717182]"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "21px",
                            letterSpacing: "-0.150391px",
                          }}
                        >
                          {col.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[rgba(0,0,0,0.1)]">
                {(!data || data.length === 0) ? (
                  <div className="flex items-center justify-center py-12 text-[#717182] text-sm">
                    No sessions found
                  </div>
                ) : data.map((item, idx) => (
                    <div 
                        key={idx} 
                        className={`grid ${gridCols} items-center transition-colors hover:bg-gray-50 cursor-pointer ${
                          selectedSessionId === item.id ? "bg-blue-50/50" : ""
                        }`}
                        style={{ height: "46px" }}
                        onClick={() => onRowClick && onRowClick(item)}
                    >
                        {/* Session ID */}
                        <div className="flex items-center px-4">
                            <span 
                              className="font-medium text-[14px] text-[#0A0A0A] truncate"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                                fontSize: "14px",
                                lineHeight: "21px",
                                letterSpacing: "-0.150391px",
                              }}
                              title={String(item.sessionCode || item.id)}
                            >
                              {shortenId(String(item.sessionCode || item.id))}
                            </span>
                        </div>

                        {/* Session Name */}
                        <div className="flex items-center px-4">
                            <span 
                              className="text-[14px] text-[#0A0A0A] truncate"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                                fontSize: "14px",
                                lineHeight: "21px",
                                letterSpacing: "-0.150391px",
                              }}
                              title={String(item.title || "")}
                            >
                              {String(item.title || "Untitled Session")}
                            </span>
                        </div>

                        {/* Type */}
                        <div className="flex items-center px-4">
                            <span 
                              className="text-[14px] text-[#717182] truncate"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "21px",
                                letterSpacing: "-0.150391px",
                              }}
                            >
                              {String(item.type)}
                            </span>
                        </div>

                        {/* Educator */}
                        <div className="flex items-center px-4">
                            <span 
                              className="text-[14px] text-[#0A0A0A] truncate"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "21px",
                                letterSpacing: "-0.150391px",
                              }}
                            >
                              {String(item.educator)}
                            </span>
                        </div>

                        {/* Students */}
                        <div className="flex items-center px-4">
                            <span 
                              className="text-[14px] text-[#717182]"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "21px",
                                letterSpacing: "-0.150391px",
                              }}
                            >
                              {Number(item.students)}
                            </span>
                        </div>

                        {/* Start Date Time */}
                        <div className="flex items-center px-4">
                            <span 
                              className="text-[14px] text-[#717182]"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "21px",
                                letterSpacing: "-0.150391px",
                              }}
                            >
                              {formatSessionDateTime(item.startDateTime || item.dateTime?.toString() || item.date)}
                            </span>
                        </div>

                        {/* End Date Time */}
                        <div className="flex items-center px-4">
                            <span 
                              className="text-[14px] text-[#717182]"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "21px",
                                letterSpacing: "-0.150391px",
                              }}
                            >
                              {formatSessionDateTime(item.endDateTime)}
                            </span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center px-4">
                            <StatusBadge status={item.status} />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center px-4">
                            <button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                if (onRowClick) {
                                  onRowClick(item); 
                                } else {
                                  router.push("/a/sessions");
                                }
                              }}
                              className="flex items-center justify-center w-7 h-7 text-[#717182] hover:text-[#042BFD] hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <EyeIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Footer */}
            {data && data.length > 0 && (
              <div 
                className="flex items-center justify-between px-4 border-t border-[rgba(0,0,0,0.1)]"
                style={{ height: "57px" }}
              >
                <span 
                  className="text-[12px] text-[#717182]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "18px",
                  }}
                >
                  Showing 1-{data.length} of {data.length}
                </span>
                
                <div className="flex items-center gap-1">
                  <button 
                    disabled
                    className="flex items-center justify-center w-8 h-8 border border-[rgba(0,0,0,0.1)] rounded opacity-30 cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="flex items-center justify-center w-8 h-8 bg-[#F3F4F6] border border-[rgba(0,0,0,0.1)] rounded text-[14px] font-medium text-[#0A0A0A]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "21px",
                      letterSpacing: "-0.150391px",
                    }}
                  >
                    1
                  </button>
                  <button 
                    disabled
                    className="flex items-center justify-center w-8 h-8 border border-[rgba(0,0,0,0.1)] rounded opacity-30 cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
        </div>
    );
}
