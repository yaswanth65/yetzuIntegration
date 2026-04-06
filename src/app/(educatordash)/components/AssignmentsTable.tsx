// "use client";

// import React, { useState } from "react";
// import { PENDING_ASSIGNMENTS } from "../constants";
// import { Menu, ChevronDown } from "lucide-react";

// const TypePill: React.FC<{ type: string }> = ({ type }) => {
//   let bgClass = "bg-gray-100 text-gray-800";

//   if (type === "Webinar") bgClass = "bg-[#EBF6EB] text-[#31AA27]";
//   else if (type === "1:1 Mentorship") bgClass = "bg-[#E6EAFF] text-[#0325D7]";
//   else if (type === "Cohort") bgClass = "bg-[#FCE4EC] text-[#CB30E0]";

//   return (
//     <span
//       className={`inline-flex items-center py-[2px] justify-center
//         px-3 rounded-full
//         font-nunito text-[12px] font-normal leading-[20px] tracking-[0]
//         text-center align-middle
//         ${bgClass}`}
//     >
//       {type}
//     </span>
//   );
// };

// const AssignmentsTable: React.FC = () => {
//   const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

//   const toggleCheck = (index: number) => {
//     const newChecked = new Set(checkedItems);
//     if (newChecked.has(index)) {
//       newChecked.delete(index);
//     } else {
//       newChecked.add(index);
//     }
//     setCheckedItems(newChecked);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 flex flex-col">
//       <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100 flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <div className="w-1 h-5 bg-blue-600 rounded-full hidden"></div>
//           <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-1" />
//           <h3 className="text-sm sm:text-base font-semibold text-gray-900">
//             Pending assignments
//           </h3>
//         </div>
//         <button className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-500 hover:text-gray-800">
//           View All <ChevronDown size={14} className="-rotate-90" />
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[500px]">
//           <thead>
//             <tr className="border-b border-gray-100">
//               <th className="text-center py-3 sm:py-4 px-3 sm:px-5 w-10 sm:w-12 align-middle">
//                 <input
//                   type="checkbox"
//                   className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
//                 />
//               </th>

//               <th
//                 className="
//         text-left py-3 sm:py-4 px-3 sm:px-5 w-1/2
//         font-inter text-[12px] sm:text-[16px] font-bold
//         leading-[20px] tracking-[0]
//         text-gray-900 align-middle
//       "
//               >
//                 Webinar/Cohort
//               </th>

//               <th
//                 className="
//         text-left py-3 sm:py-4 px-3 sm:px-5
//         font-inter text-[12px] sm:text-[16px] font-bold
//         leading-[20px] tracking-[0]
//         text-gray-900 align-middle
//         hidden sm:table-cell
//       "
//               >
//                 Type
//               </th>

//               <th
//                 className="
//         text-left py-3 sm:py-4 px-3 sm:px-5
//         font-inter text-[12px] sm:text-[16px] font-bold
//         leading-[20px] tracking-[0]
//         text-gray-900 align-middle
//       "
//               >
//                 Deadline
//               </th>

//               <th className="w-10 sm:w-12"></th>
//             </tr>
//           </thead>

//           <tbody>
//             {PENDING_ASSIGNMENTS.map((item, index) => (
//               <tr
//                 key={index}
//                 className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
//               >
//                 <td className="py-2 sm:py-3 px-3 sm:px-5 text-center">
//                   <input
//                     type="checkbox"
//                     checked={checkedItems.has(index)}
//                     onChange={() => toggleCheck(index)}
//                     className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
//                   />
//                 </td>
//                 <td className="py-2 sm:py-3 px-3 sm:px-5">
//                   <div className="flex flex-col">
//                     <span className="text-xs sm:text-sm text-gray-900 font-normal truncate">
//                       {item.name}
//                     </span>
//                     <span className="text-[10px] sm:text-xs text-gray-400 font-normal mt-0.5">
//                       {item.id}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="py-2 sm:py-3 px-3 sm:px-5 hidden sm:table-cell">
//                   <TypePill type={item.type} />
//                 </td>
//                 <td className="py-2 sm:py-3 px-3 sm:px-5">
//                   <span className="text-xs sm:text-sm text-gray-900">
//                     {item.deadline}
//                   </span>
//                 </td>
//                 <td className="py-2 sm:py-3 px-3 sm:px-5 text-center">
//                   <button className="bg-gray-100 p-1 sm:p-1.5 rounded hover:bg-gray-200">
//                     <ChevronDown
//                       size={12}
//                       className="sm:w-[14px] sm:h-[14px] text-gray-600"
//                     />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssignmentsTable;
"use client";

import React, { useState, useEffect } from "react";
import { Menu, ChevronDown, Loader2 } from "lucide-react";
import { EducatorAPI } from "@/lib/api";

const TypePill: React.FC<{ type: string }> = ({ type }) => {
  let bgClass = "bg-gray-100 text-gray-800";

  if (type === "Webinar") bgClass = "bg-[#EBF6EB] text-[#31AA27]";
  else if (type === "1:1 Mentorship") bgClass = "bg-[#E6EAFF] text-[#0325D7]";
  else if (type === "Cohort") bgClass = "bg-[#FCE4EC] text-[#CB30E0]";

  return (
    <span
      className={`inline-flex items-center py-[2px] justify-center
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
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [assignments, setAssignments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPendingAssignments = async () => {
      try {
        setIsLoading(true);
        const res = await EducatorAPI.getOverview();
        
        const pendingList = res?.data?.pending?.list || [];
        
        const formattedData = pendingList.map((item: any) => {
          const dateObj = new Date(item.submittedAt);
          const formattedDate = !isNaN(dateObj.getTime()) 
            ? dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
            : "N/A";

          return {
            id: item.id || "N/A",
            name: item.assignment?.title || "Untitled Assignment",
            type: "Webinar", // Defaulting as type is not explicitly provided in pending list schema
            deadline: formattedDate,
            studentName: item.student?.name || "Unknown Student"
          };
        });

        setAssignments(formattedData);
      } catch (error) {
        console.error("Failed to fetch pending assignments", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingAssignments();
  }, []);

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 flex flex-col">
      <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-blue-600 rounded-full hidden"></div>
          <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-1" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">
            Pending assignments {assignments.length > 0 && `(${assignments.length})`}
          </h3>
        </div>
        <button className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-500 hover:text-gray-800">
          View All <ChevronDown size={14} className="-rotate-90" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-center py-3 sm:py-4 px-3 sm:px-5 w-10 sm:w-12 align-middle">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                />
              </th>

              <th
                className="
                  text-left py-3 sm:py-4 px-3 sm:px-5 w-1/2
                  font-inter text-[12px] sm:text-[16px] font-bold
                  leading-[20px] tracking-[0]
                  text-gray-900 align-middle
                "
              >
                Webinar/Cohort
              </th>

              <th
                className="
                  text-left py-3 sm:py-4 px-3 sm:px-5
                  font-inter text-[12px] sm:text-[16px] font-bold
                  leading-[20px] tracking-[0]
                  text-gray-900 align-middle
                  hidden sm:table-cell
                "
              >
                Type
              </th>

              <th
                className="
                  text-left py-3 sm:py-4 px-3 sm:px-5
                  font-inter text-[12px] sm:text-[16px] font-bold
                  leading-[20px] tracking-[0]
                  text-gray-900 align-middle
                "
              >
                Submitted At
              </th>

              <th className="w-10 sm:w-12"></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <div className="flex justify-center items-center gap-2 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="text-sm font-medium">Loading assignments...</span>
                  </div>
                </td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-gray-500 font-medium">
                  No pending assignments found.
                </td>
              </tr>
            ) : (
              assignments.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 sm:py-3 px-3 sm:px-5 text-center">
                    <input
                      type="checkbox"
                      checked={checkedItems.has(index)}
                      onChange={() => toggleCheck(index)}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-5">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-gray-900 font-normal truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-400 font-normal mt-0.5 truncate">
                        Student: {item.studentName} | ID: {item.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-5 hidden sm:table-cell">
                    <TypePill type={item.type} />
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-5">
                    <span className="text-xs sm:text-sm text-gray-900">
                      {item.deadline}
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-5 text-center">
                    <button className="bg-gray-100 p-1 sm:p-1.5 rounded hover:bg-gray-200">
                      <ChevronDown
                        size={12}
                        className="sm:w-[14px] sm:h-[14px] text-gray-600"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentsTable;