import { td } from "framer-motion/client";

type SessionType = "Webinar" | "Cohort" | "1:1" | "Workshop";
type SessionStatus = "Live" | "Scheduled" | "Completed";

interface Session {
    id: string;
    type: SessionType;
    educator: string;
    students: number,
    date: string;
    status: SessionStatus;
}

const sessionsData: Session[] = [
    { id: "WEB_204", type: "Webinar", educator: "Dr. Sarah Chen", students: 45, date: "Mar 16, 2026", status: "Live", },
    { id: "COH-112", type: "Cohort", educator: "Prof. James W.", students: 28, date: "Mar 16, 2026", status: "Scheduled" },
    { id: "MTR-089", type: "1:1", educator: "Dr. Anita Roy", students: 1, date: "Mar 16, 2026", status: "Completed" },
    { id: "WRK-056", type: "Workshop", educator: "Dr. Liu Wei", students: 32, date: "Mar 15, 2026", status: "Completed" },
    { id: "WEB-203", type: "Webinar", educator: "Prof. Brown", students: 67, date: "Mar 15, 2026", status: "Completed" },
]

const statusStyles: Record<SessionStatus, string> = {
    Live: "text-green-600 bg-green-50",
    Scheduled: "text-blue-600 bg-blue-50",
    Completed: "text-gray-500 bg-gray-100",
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

export default function RecentSession() {
    return (
        <div className="bg-white  rounded-2xl mt-10 border shadow-sm border-gray-100 ">
            <div className="flex items-center justify-between p-6">
                <h1 className="font-semibold">Recent Sessions</h1>
                <p className="text-blue-600 text-sm font-semibold">View All</p>
            </div>

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
                        {sessionsData.map((data, idx) => (
                            <tr key={idx}>
                                <td className="px-7 py-4 font-semibold">{data.id}</td>
                                <td className="px-7 py-4 text-gray-500">{data.type}</td>
                                <td className="px-7 py-4">{data.educator}</td>
                                <td className="px-7 py-4 text-gray-500">{data.students}</td>
                                <td className="px-7 py-4 text-gray-500">{data.date}</td>
                                <td className="px-7 py-4"><StatusBadge status={data.status} /></td>
                                <td className="px-7 py-4"><EyeIcon/></td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    )
}
