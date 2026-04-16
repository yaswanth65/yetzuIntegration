import { style } from "framer-motion/client";


type Priority = "High" | "Medium" | "Low";
type Status = "In Review" | "Submitted" | "Completed" | "Rejected";

// type
interface SupportItem {
    id: string;
    description: string;
    priority: Priority;
    raisedOn: string;
    status: Status;
}

// JSON data
const supportItems: SupportItem[] = [
    {
        id: "TK-1024",
        description: "unable to open the cards section of session",
        priority: "High",
        raisedOn: "Mar 16, 2026",
        status: "In Review",
    },
    {
        id: "TK-1232",
        description: "Assignment submission failing with error message",
        priority: "Medium",
        raisedOn: "Mar 16, 2026",
        status: "Submitted",
    },
    {
        id: "TK-1344",
        description: "Video playback buffering excessively in Course",
        priority: "Low",
        raisedOn: "Mar 15, 2026",
        status: "Completed",
    },
    {
        id: "TK-1234",
        description: "Grade sync discrepancy between LMS and gradebook",
        priority: "High",
        raisedOn: "Mar 15, 2026",
        status: "Rejected",
    },
    {
        id: "TK-4522",
        description: "Student unable to join scheduled live session",
        priority: "Low",
        raisedOn: "Mar 14, 2026",
        status: "Completed",
    },
];

// PriorityStyle
const PRIORITY_CONFIG: Record<Priority, { label: string, icon: string, classes: string }> = {
    High: {
        label: "High",
        icon: "ri-arrow-up-line",
        classes: "text-red-500 bg-red-50 border border-red-400",
    },

    Medium: {
        label: "Medium",
        icon: "ri-subtract-line",
        classes: "text-yellow-500 bg-yellow-50 border border-yellow-400"
    },

    Low: {
        label: "Low",
        icon: "ri-arrow-down-line",
        classes: "text-sky-500 bg-sky-50 border border-sky-400"
    }
}

// StatusStyle
const STATUS_CONFIG: Record<Status, { label: string; icon: string; classes: string }
> = {
  "In Review": {
    label: "In Review",
    icon: "ri-time-line",
    classes: "text-orange-500 bg-orange-50 border px-2 py-1 border-orange-200",
  },

  Submitted: {
    label: "Submitted",
    icon: "ri-upload-2-line",
    classes: "text-blue-600 bg-blue-50 border border-blue-200",
  },

  Completed: {
    label: "Completed",
    icon: "ri-check-line",
    classes: "text-gray-500 bg-gray-100 border border-gray-200",
  },

  Rejected: {
    label: "Rejected",
    icon: "ri-close-line",
    classes: "text-red-600 bg-red-50 border border-red-200",
  },
};

//EyeIcon
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

// Main Component
export default function SupportTickets() {
    return (
        <div className="bg-white  rounded-2xl mt-10 border shadow-sm border-gray-100">
            <div className="flex items-center justify-between p-6">
                <h1 className="font-semibold">Support Tickets</h1>
                <p className="text-blue-600 text-sm font-semibold">View All</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className=" bg-gray-100 border-b border-t border-gray-200">
                            {["Ticket ID", "Description", "Priority", "Raised On", "Status", "Actions"].map((col, idx) => (
                                <th key={idx} className="text-[14px] font-medium text-gray-600 px-7 py-4 text-left" >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {supportItems.map((data, idx) => {

                            const pStyle = PRIORITY_CONFIG[data.priority]
                            const sStyle = STATUS_CONFIG[data.status]

                            return(
                                <tr key={idx}>
                                    <td className="px-7 py-4 font-semibold">{data.id}</td>
                                    <td className="px-7 py-4 text-gray-600">{data.description}</td>
                                    <td className="px-7 py-4"> <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-medium ${pStyle.classes}`}><i className={pStyle.icon}></i> {pStyle.label} </span> </td>
                                    <td className="px-7 py-4 text-gray-600">{data.raisedOn}</td>
                                    <td className="px-7 py-4"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-medium ${sStyle.classes}`}><i className={sStyle.icon}></i>{sStyle.label}</span></td>
                                    <td className="px-7 py-4"><EyeIcon /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
