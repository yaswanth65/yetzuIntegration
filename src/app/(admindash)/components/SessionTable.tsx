import { Session, Status as SessionStatus } from "@/app/(admindash)/types/SessionType";

interface Props {
  data: Session[];
  showHeader?: boolean;
  title?: string;
  onRowClick?: (session: Session) => void;
  selectedSessionId?: string;
}

const statusStyles: Record<SessionStatus, string> = {
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

function StatusBadge({ status }: { status: SessionStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${statusStyles[status]}`}>
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

export default function SessionTable({data,showHeader = true, title, onRowClick, selectedSessionId }: Props) {

  console.log(showHeader, title)
    return (
        <div className="bg-white rounded-2xl mt-10 border-2 border-gray-100 overflow-hidden ">
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
                        {data.map((item, idx) => (
                            <tr 
                              key={idx} 
                              className={`transition-colors hover:bg-gray-50 ${selectedSessionId === item.id ? "bg-blue-50/50" : ""}`}
                            >
                                <td className="px-7 py-4 font-semibold">{item.id}</td>
                                <td className="px-7 py-4 text-gray-500">{item.type}</td>
                                <td className="px-7 py-4">{item.educator}</td>
                                <td className="px-7 py-4 text-gray-500">{item.students}</td>
                                <td className="px-7 py-4 text-gray-500">{item.date}</td>
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
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    )
}
