// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Search, Calendar, Clock, MoreVertical, Link2 } from "lucide-react";
// import Link from "next/link"; 
// import RescheduleModal from "../../components/Reschedule";

// // Mock Data
// const MOCK_SESSIONS = [
//   // --- FOCUS FOR TODAY ---
//   {
//     id: "1",
//     slug: "major-insights-human-nervous-system",
//     title: "Webinar: Major Insights on Human Nervous System",
//     type: "webinar",
//     mentor: {
//       name: "Dr. Sophia Tyler",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
//     },
//     date: "22 Feb, 2026",
//     time: "3:00 PM - 4:30 PM",
//     badge: "STARTS IN 12 MINS",
//     badgeType: "purple",
//     tab: "upcoming",
//     isFocusToday: true,
//   },
//   {
//     id: "2",
//     slug: "1-1-mentorship-future-renewable-energy",
//     title: "1:1 Mentorship: The Future of Renewable Energy",
//     type: "mentorship",
//     mentor: {
//       name: "Dr. Mathew Thomas",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Mathew+Thomas&background=random",
//     },
//     date: "22 Feb, 2026",
//     time: "6:15 AM - 7:15 PM",
//     badge: "TODAY • 6:15 PM",
//     badgeType: "orange",
//     tab: "upcoming",
//     isFocusToday: true,
//   },
//   // --- UPCOMING SESSIONS ---
//   {
//     id: "3",
//     slug: "cohort-advanced-methods-data-viz",
//     title: "Cohort: Advanced Methods in Data Visualization",
//     type: "cohort",
//     mentor: {
//       name: "Dr. Elf Manie",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
//     },
//     date: "23 Feb, 2026",
//     time: "4:15 PM - 6:15 PM",
//     tab: "upcoming",
//     isFocusToday: false,
//   },
//   {
//     id: "4",
//     slug: "webinar-breakthroughs-cognitive-neuroscience",
//     title: "Webinar: Breakthroughs in Cognitive Neuroscience",
//     type: "webinar",
//     mentor: {
//       name: "Dr. Elf Manie",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
//     },
//     date: "24 Feb, 2026",
//     time: "4:15 PM - 6:15 PM",
//     tab: "upcoming",
//     isFocusToday: false,
//   },
//   {
//     id: "5",
//     slug: "1-1-mentorship-future-renewable-energy-2",
//     title: "1:1 Mentorship: The Future of Renewable Energy",
//     type: "mentorship",
//     mentor: {
//       name: "Dr. Mathew Thomas",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Mathew+Thomas&background=random",
//     },
//     date: "26 Feb, 2026",
//     time: "11:15 AM - 1:15 PM",
//     tab: "upcoming",
//     isFocusToday: false,
//   },
//   // --- COMPLETED ---
//   {
//     id: "6",
//     slug: "webinar-completed-1",
//     title: "Webinar: Major Insights on Human Nervous System",
//     type: "webinar",
//     mentor: {
//       name: "Dr. Sophia Tyler",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
//     },
//     date: "22 Feb, 2026",
//     time: "3:00 PM - 4:30 PM",
//     tab: "completed",
//     isFocusToday: false,
//   },
//   {
//     id: "7",
//     slug: "webinar-completed-2",
//     title: "Webinar: Breakthroughs in Cognitive Neuroscience",
//     type: "webinar",
//     mentor: {
//       name: "Dr. Elf Manie",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
//     },
//     date: "23 Feb, 2026",
//     time: "4:15 PM - 6:15 PM",
//     tab: "completed",
//     isFocusToday: false,
//   },
//   // --- MISSED ---
//   {
//     id: "8",
//     slug: "webinar-missed-1",
//     title: "Webinar: Major Insights on Human Nervous System",
//     type: "missed", 
//     mentor: {
//       name: "Dr. Sophia Tyler",
//       role: "Associate Professor, XYZ Institute",
//       avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
//     },
//     date: "22 Feb, 2026",
//     time: "3:00 PM - 4:30 PM",
//     tab: "missed",
//     isFocusToday: false,
//   },
// ];

// const getThemeStyles = (type: string, badgeType?: string) => {
//   let badgeClasses = "";
//   if (badgeType === "purple") badgeClasses = "bg-[#E0D4F5] text-[#7B42F6]";
//   else if (badgeType === "orange") badgeClasses = "bg-[#FFEDD5] text-[#EA580C]";
//   else badgeClasses = "bg-gray-100 text-gray-600"; 

//   switch (type) {
//     case "webinar":
//       return {
//         wrapperBorder: "from-[#C4A9FF] via-transparent to-[#C4A9FF]",
//         bgGradient: "from-[#F3EDFF] via-white via-40% to-white",
//         icon: "/images/video-chat.svg",
//         badgeClasses,
//       };
//     case "mentorship":
//       return {
//         wrapperBorder: "from-[#FAD0A5] via-transparent to-[#FAD0A5]",
//         bgGradient: "from-[#FFF3E3] via-white via-40% to-white",
//         icon: "/images/User2.svg",
//         badgeClasses,
//       };
//     case "cohort":
//       return {
//         wrapperBorder: "from-[#9FE4EE] via-transparent to-[#9FE4EE]",
//         bgGradient: "from-[#E6F8FA] via-white via-40% to-white",
//         icon: "/images/team.svg",
//         badgeClasses,
//       };
//     case "missed":
//       return {
//         wrapperBorder: "from-[#FECDD3] via-transparent to-[#FECDD3]",
//         bgGradient: "from-[#FFF0F2] via-white via-40% to-white",
//         icon: "/images/video-chat.svg", 
//         badgeClasses,
//       };
//     default:
//       return {
//         wrapperBorder: "from-gray-200 via-transparent to-gray-200",
//         bgGradient: "from-gray-50 via-white via-40% to-white",
//         icon: "/images/video-chat.svg",
//         badgeClasses,
//       };
//   }
// };

// export default function SessionsPage() {
//   const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "missed">("upcoming");
//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

//   const filteredSessions = MOCK_SESSIONS.filter((s) => s.tab === activeTab);
//   const focusTodaySessions = filteredSessions.filter((s) => s.isFocusToday);
//   const otherSessions = filteredSessions.filter((s) => !s.isFocusToday);
//   const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdownId(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const renderCard = (session: any, isFocus: boolean) => {
//     const theme = getThemeStyles(session.type, session.badgeType);
//     const isDropdownOpen = openDropdownId === session.id;

//     return (
//       <div
//         key={session.id}
//         className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.wrapperBorder} flex flex-col min-h-[300px]`}
//       >
//         <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-4 h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/50">
          
//           <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-b ${theme.bgGradient} pointer-events-none z-0`}></div>

//           <div className="flex justify-between items-start mb-6 relative z-10">
//             <img src={theme.icon} alt="Icon" className="w-[64px] h-[64px] object-contain opacity-90" />
//             {session.badge && (
//               <span className={`${theme.badgeClasses} text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5 shadow-sm`}>
//                 {session.badge === "STARTS IN 12 MINS" && <Clock size={14} />}
//                 {session.badge}
//               </span>
//             )}
//           </div>

//           <div className="relative z-10 flex-1 flex flex-col">
//             <Link href={`sessions/${session.slug}`} className="hover:underline">
//               <h3 className="text-[18px] font-bold text-gray-900 mb-5 leading-snug pr-2 line-clamp-2">
//                 {session.title}
//               </h3>
//             </Link>

//             <div className="flex items-center gap-3 mb-6 mt-auto">
//               <img src={session.mentor.avatar} alt="Mentor" className="w-11 h-11 rounded-full object-cover shrink-0" />
//               <div>
//                 <p className="text-[14px] font-semibold text-gray-900 leading-none mb-1">{session.mentor.name}</p>
//                 <p className="text-[12px] text-gray-500">{session.mentor.role}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 bg-[#F8FAFC] rounded-[10px] px-4 py-3 mb-6 w-full border border-gray-50">
//               <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
//                 <Calendar size={16} className="text-gray-400" /> {session.date}
//               </div>
//               <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
//                 <Clock size={16} className="text-gray-400" /> {session.time}
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 relative">
//               {isFocus && activeTab === "upcoming" ? (
//                 <Link href={`sessions/${session.slug}`}>
//                   <button className="px-6 bg-[#111111] hover:bg-black text-white rounded-[10px] py-2.5 text-[14px] font-medium transition-colors h-11">
//                     Join Session
//                   </button>
//                 </Link>
//               ) : (
//                 <Link href={`sessions/${session.slug}`}>
//                   <button className="px-6 border border-[#042BFD] text-[#042BFD] bg-white rounded-[10px] py-2.5 text-[14px] font-medium hover:bg-blue-50 transition-colors h-11">
//                     View Details
//                   </button>
//                 </Link>
//               )}
              
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setOpenDropdownId(isDropdownOpen ? null : session.id);
//                 }}
//                 className="w-11 h-11 border border-gray-200 rounded-[10px] text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center shrink-0"
//               >
//                 <MoreVertical size={20} />
//               </button>

//               {isDropdownOpen && (
//                 <div 
//                   ref={dropdownRef}
//                   className="absolute right-0 bottom-[110%] mb-2 w-48 bg-white border border-gray-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
//                 >
//                   <button 
//                     className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                     onClick={() => {
//                       setOpenDropdownId(null);   // 1. Close the dropdown menu
//                       setIsRescheduleOpen(true); // 2. Open the Reschedule modal
//                     }}
//                   >
//                     Reschedule
//                   </button>
                
//                   <button 
//                     className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                     onClick={() => setOpenDropdownId(null)}
//                   >
//                     Copy Link to Interview
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#F8F9FA] font-sans">
      
//       {/* --- HEADER --- */}
//       <div className="bg-white px-6 md:px-10 pt-4 border-b border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//           <h1 className="text-[22px] font-bold text-gray-900">Sessions</h1>
          
//           <div className="relative w-full md:w-[320px]">
//             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//               <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
//             </div>
//             <input
//               type="text"
//               placeholder="Search by session, mentor or topic"
//               className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
//             />
//           </div>
//         </div>
        
//         {/* Tabs */}
//         <div className="flex items-center gap-8">
//           {(["upcoming", "completed", "missed"] as const).map((tab) => {
//             const isActive = activeTab === tab;
//             let count = MOCK_SESSIONS.filter((s) => s.tab === tab).length;

//             return (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[2px] capitalize ${
//                   isActive
//                     ? "border-[#042BFD] text-gray-900 font-semibold"
//                     : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
//                 }`}
//               >
//                 {tab}
//                 <span 
//                   className={`flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium ${
//                     isActive 
//                       ? tab === "missed" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600" 
//                       : "bg-gray-100 text-gray-500"
//                   }`}
//                 >
//                   {count}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- MAIN CONTENT AREA --- */}
//       <div className="p-6 md:px-10 max-w-[1600px] mx-auto mt-2">
        
//         {activeTab === "upcoming" ? (
//           <>
//             {/* Focus For Today */}
//             {focusTodaySessions.length > 0 && (
//               <div className="mb-10">
//                 <div className="flex items-center gap-4 mb-6">
//                   <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                     FOCUS FOR TODAY
//                   </span>
//                   <div className="flex-1 h-px bg-gray-200"></div>
//                 </div>
//                 {/* Fixed to max 3 columns */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {focusTodaySessions.map((session) => renderCard(session, true))}
//                 </div>
//               </div>
//             )}

//             {/* Upcoming Sessions */}
//             {otherSessions.length > 0 && (
//               <div>
//                 <div className="flex items-center gap-4 mb-6">
//                   <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                     UPCOMING SESSIONS
//                   </span>
//                   <div className="flex-1 h-px bg-gray-200"></div>
//                 </div>
//                 {/* Fixed to max 3 columns */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {otherSessions.map((session) => renderCard(session, false))}
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           /* Completed / Missed Tab View */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//             {filteredSessions.map((session) => renderCard(session, false))}
            
//             {filteredSessions.length === 0 && (
//               <div className="col-span-full py-20 text-center text-gray-500">
//                 No sessions found in this category.
//               </div>
//             )}
//           </div>
//         )}

//       </div>
//       <RescheduleModal 
//                       isOpen={isRescheduleOpen} 
//                       onClose={() => setIsRescheduleOpen(false)} 
//                     />
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Calendar, Clock, MoreVertical, Link2, ExternalLink } from "lucide-react";
import Link from "next/link"; 
import RescheduleModal from "../../components/Reschedule";
import { CourseAPI } from "@/lib/api"; 

const getThemeStyles = (type: string, badgeType?: string) => {
  let badgeClasses = "";
  if (badgeType === "purple") badgeClasses = "bg-[#E0D4F5] text-[#7B42F6]";
  else if (badgeType === "orange") badgeClasses = "bg-[#FFEDD5] text-[#EA580C]";
  else badgeClasses = "bg-gray-100 text-gray-600"; 

  switch (type) {
    case "webinar":
      return {
        wrapperBorder: "from-[#C4A9FF] via-transparent to-[#C4A9FF]",
        bgGradient: "from-[#F3EDFF] via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
    case "mentorship":
      return {
        wrapperBorder: "from-[#FAD0A5] via-transparent to-[#FAD0A5]",
        bgGradient: "from-[#FFF3E3] via-white via-40% to-white",
        icon: "/images/User2.svg",
        badgeClasses,
      };
    case "cohort":
      return {
        wrapperBorder: "from-[#9FE4EE] via-transparent to-[#9FE4EE]",
        bgGradient: "from-[#E6F8FA] via-white via-40% to-white",
        icon: "/images/team.svg",
        badgeClasses,
      };
    case "missed":
      return {
        wrapperBorder: "from-[#FECDD3] via-transparent to-[#FECDD3]",
        bgGradient: "from-[#FFF0F2] via-white via-40% to-white",
        icon: "/images/video-chat.svg", 
        badgeClasses,
      };
    default:
      return {
        wrapperBorder: "from-gray-200 via-transparent to-gray-200",
        bgGradient: "from-gray-50 via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
  }
};

export default function SessionsPage() {
  // Initialize as empty array, no mock data
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "missed">("upcoming");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


const MOCK_SESSIONS = [
  // --- FOCUS FOR TODAY ---
  {
    id: "1",
    slug: "major-insights-human-nervous-system",
    title: "Webinar: Major Insights on Human Nervous System",
    type: "webinar",
    mentor: {
      name: "Dr. Sophia Tyler",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
    },
    date: "22 Feb, 2026",
    time: "3:00 PM - 4:30 PM",
    badge: "STARTS IN 12 MINS",
    badgeType: "purple",
    tab: "upcoming",
    isFocusToday: true,
  },
  {
    id: "2",
    slug: "1-1-mentorship-future-renewable-energy",
    title: "1:1 Mentorship: The Future of Renewable Energy",
    type: "mentorship",
    mentor: {
      name: "Dr. Mathew Thomas",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Mathew+Thomas&background=random",
    },
    date: "22 Feb, 2026",
    time: "6:15 AM - 7:15 PM",
    badge: "TODAY • 6:15 PM",
    badgeType: "orange",
    tab: "upcoming",
    isFocusToday: true,
  },
  // --- UPCOMING SESSIONS ---
  {
    id: "3",
    slug: "cohort-advanced-methods-data-viz",
    title: "Cohort: Advanced Methods in Data Visualization",
    type: "cohort",
    mentor: {
      name: "Dr. Elf Manie",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
    },
    date: "23 Feb, 2026",
    time: "4:15 PM - 6:15 PM",
    tab: "upcoming",
    isFocusToday: false,
  },
  {
    id: "4",
    slug: "webinar-breakthroughs-cognitive-neuroscience",
    title: "Webinar: Breakthroughs in Cognitive Neuroscience",
    type: "webinar",
    mentor: {
      name: "Dr. Elf Manie",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
    },
    date: "24 Feb, 2026",
    time: "4:15 PM - 6:15 PM",
    tab: "upcoming",
    isFocusToday: false,
  },
  {
    id: "5",
    slug: "1-1-mentorship-future-renewable-energy-2",
    title: "1:1 Mentorship: The Future of Renewable Energy",
    type: "mentorship",
    mentor: {
      name: "Dr. Mathew Thomas",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Mathew+Thomas&background=random",
    },
    date: "26 Feb, 2026",
    time: "11:15 AM - 1:15 PM",
    tab: "upcoming",
    isFocusToday: false,
  },
  // --- COMPLETED ---
  {
    id: "6",
    slug: "webinar-completed-1",
    title: "Webinar: Major Insights on Human Nervous System",
    type: "webinar",
    mentor: {
      name: "Dr. Sophia Tyler",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
    },
    date: "22 Feb, 2026",
    time: "3:00 PM - 4:30 PM",
    tab: "completed",
    isFocusToday: false,
  },
  {
    id: "7",
    slug: "webinar-completed-2",
    title: "Webinar: Breakthroughs in Cognitive Neuroscience",
    type: "webinar",
    mentor: {
      name: "Dr. Elf Manie",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
    },
    date: "23 Feb, 2026",
    time: "4:15 PM - 6:15 PM",
    tab: "completed",
    isFocusToday: false,
  },
  // --- MISSED ---
  {
    id: "8",
    slug: "webinar-missed-1",
    title: "Webinar: Major Insights on Human Nervous System",
    type: "missed", 
    mentor: {
      name: "Dr. Sophia Tyler",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
    },
    date: "22 Feb, 2026",
    time: "3:00 PM - 4:30 PM",
    tab: "missed",
    isFocusToday: false,
  },
];

  // --- FETCH COURSES FROM API ---
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await CourseAPI.getAllCourses();
        if (res.courses && Array.isArray(res.courses)) {
          const mappedCourses = res.courses.map((course: any) => {
            // Parse Dates & Times
            const startDate = new Date(course.startDateTime);
            const durationHours = parseInt(course.duration) || 1; 
            const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

            // Format UI Strings
            const dateStr = startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
            const formatTime = (d: Date) => d.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });
            const timeStr = `${formatTime(startDate)} - ${formatTime(endDate)}`;

            // Tab & Focus Logic
            const today = new Date();
            const isToday = startDate.toDateString() === today.toDateString();
            const isPast = endDate < today;
            
            let tab = "upcoming";
            if (isPast) tab = "completed";

            let badge = null;
            let badgeType = "gray";
            if (isToday && !isPast) {
              badge = `STARTS IN 12 MINS`; // Using explicit string from UI or dynamic logic later
              badgeType = "purple";
            }

            return {
              id: course._id,
              slug: course._id, 
              title: course.title || "Untitled Session",
              type: course.title?.toLowerCase().includes('cohort') ? 'cohort' : 'webinar', // dynamic fallback
              mentor: {
                name: "Dr. Sophia Tyler", // API doesn't return name directly yet, fallback to UI mockup name
                role: course.subtitle || "Associate Professor, XYZ Institute",
                avatar: `https://ui-avatars.com/api/?name=Sophia+Tyler&background=random`,
              },
              date: dateStr,
              time: timeStr,
              badge,
              badgeType,
              tab,
              isFocusToday: isToday && !isPast,
            };
          });

          setSessions(mappedCourses);
        }
      } catch (error) {
        console.error("Failed to fetch sessions/courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);
  // useEffect(() => {
  //   const fetchSessions = async () => {
  //     try {
  //       const res = await CourseAPI.getAllCourses();
  //       if (res && res.courses && Array.isArray(res.courses) && res.courses.length > 0) {
  //         const mappedCourses = res.courses.map((course: any) => {
  //           // Parse Dates & Times
  //           const startDate = new Date(course.startDateTime);
  //           const durationHours = parseInt(course.duration) || 1; 
  //           const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  //           // Format UI Strings
  //           const dateStr = startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  //           const formatTime = (d: Date) => d.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });
  //           const timeStr = `${formatTime(startDate)} - ${formatTime(endDate)}`;

  //           // Tab & Focus Logic
  //           const today = new Date();
  //           const isToday = startDate.toDateString() === today.toDateString();
  //           const isPast = endDate < today;
            
  //           let tab = "upcoming";
  //           if (isPast) tab = "completed";

  //           let badge = null;
  //           let badgeType = "gray";
  //           if (isToday && !isPast) {
  //             badge = `STARTS IN 12 MINS`; // Using explicit string from UI or dynamic logic later
  //             badgeType = "purple";
  //           }

  //           return {
  //             id: course._id,
  //             slug: course._id, 
  //             title: course.title || "Untitled Session",
  //             type: course.title?.toLowerCase().includes('cohort') ? 'cohort' : 'webinar', // dynamic fallback
  //             mentor: {
  //               name: "Dr. Sophia Tyler", // API doesn't return name directly yet, fallback to UI mockup name
  //               role: course.subtitle || "Associate Professor, XYZ Institute",
  //               avatar: `https://ui-avatars.com/api/?name=Sophia+Tyler&background=random`,
  //             },
  //             date: dateStr,
  //             time: timeStr,
  //             badge,
  //             badgeType,
  //             tab,
  //             isFocusToday: isToday && !isPast,
  //           };
  //         });

  //         setSessions(mappedCourses);
  //       } else {
  //         setSessions(MOCK_SESSIONS);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch sessions/courses:", error);
  //       setSessions(MOCK_SESSIONS);
  //     } finally {
  //       setIsLoading(false);
  //       setSessions(MOCK_SESSIONS);
  //     }
  //   };

  //   fetchSessions();
  // }, []);

  // Filter Logic
  const filteredSessions = sessions.filter((s) => s.tab === activeTab);
  const focusTodaySessions = filteredSessions.filter((s) => s.isFocusToday);
  const otherSessions = filteredSessions.filter((s) => !s.isFocusToday);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCard = (session: any, isFocus: boolean) => {
    const theme = getThemeStyles(session.type, session.badgeType);
    const isDropdownOpen = openDropdownId === session.id;

    return (
      <div
        key={session.id}
        // Responsive sizing and horizontal snap for mobile
        className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.wrapperBorder} flex flex-col min-h-[300px] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`}
      >
        <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-4 h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/50">
          
          <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-b ${theme.bgGradient} pointer-events-none z-0`}></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
            <img src={theme.icon} alt="Icon" className="w-[64px] h-[64px] object-contain opacity-90" />
            {session.badge && (
              <span className={`${theme.badgeClasses} text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5 shadow-sm`}>
                {session.badge.includes("STARTS") && <Clock size={14} />}
                {session.badge}
              </span>
            )}
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            <Link href={`sessions/${session.slug}`} className="hover:underline">
              <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-900 mb-5 leading-snug pr-2 line-clamp-2">
                {session.title}
              </h3>
            </Link>

            <div className="flex items-center gap-3 mb-3 md:mb-6 mt-auto">
              <img src={session.mentor.avatar} alt="Mentor" className="w-11 h-11 rounded-full object-cover shrink-0" />
              <div>
                <p className="text-[14px] font-medium text-gray-900 leading-none mb-1">{session.mentor.name}</p>
                <p className="text-[12px] text-gray-500 line-clamp-1">{session.mentor.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#F8FAFC] rounded-[10px] px-4 py-3 mb-3 md:mb-6 w-full border border-gray-50">
              <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-medium text-gray-600">
                <Calendar size={16} className="text-gray-400 shrink-0" /> <span className="truncate">{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-medium text-gray-600">
                <Clock size={16} className="text-gray-400 shrink-0" /> <span className="truncate">{session.time}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 relative">
              {isFocus && activeTab === "upcoming" ? (
                <Link href={`sessions/${session.slug}`} className="flex-1 md:flex-none">
                  <button className="w-full md:px-6 bg-[#111111] hover:bg-black text-white rounded-[10px] py-2.5 text-[14px] font-medium transition-colors h-11">
                    Join Session
                  </button>
                </Link>
              ) : (
                <Link href={`sessions/${session.slug}`} className="flex-1 md:flex-none">
                  <button className="w-full md:px-6 border border-[#042BFD] text-[#042BFD] bg-white rounded-[10px] py-2.5 text-[14px] font-medium hover:bg-blue-50 transition-colors h-11">
                    View Details
                  </button>
                </Link>
              )}
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdownId(isDropdownOpen ? null : session.id);
                }}
                className="w-11 h-11 border border-gray-200 rounded-[10px] text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center shrink-0"
              >
                <MoreVertical size={20} />
              </button>

              {isDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 bottom-[110%] mb-2 w-48 bg-white border border-gray-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                  <button 
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setOpenDropdownId(null);   
                      setIsRescheduleOpen(true); 
                    }}
                  >
                    Reschedule
                  </button>
                
                  <button 
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenDropdownId(null)}
                  >
                    Copy Link to Interview
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white md:bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="w-full   bg-white md:bg-[#F8F9FA] font-sans pb-18 lg:pb-8">
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-20 md:static md:z-auto bg-white pt-4 md:pt-6 md:px-10 border-b border-gray-100 md:border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6 px-4 md:px-0">
          <h1 className="md:text-[24px] text-[22px] font-semibold text-gray-900">Sessions</h1>
          
         <div className=" mb-4 md:mb-6 max-w-[360px]">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by assignment, session or mentor"
                      className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>
                </div>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center px-4 md:px-0 gap-6 md:gap-8 overflow-x-auto no-scrollbar">
          {(["upcoming", "completed", "missed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            let count = sessions.filter((s) => s.tab === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[1px] md:-mb-[2px] capitalize whitespace-nowrap ${
                  isActive
                    ? "border-[#042BFD] text-gray-900 font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
                }`}
              >
                <span className="text-[14px] md:text-[15px]">{tab}</span>
                <span 
                  className={`flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium ${
                    isActive 
                      ? tab === "missed" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600" 
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="md:p-6 md:px-10 max-w-[1600px] mx-auto mt-4 md:mt-2">
        
        {sessions.length === 0 ? (
          /* =========================================
             EMPTY STATE VIEW (API returned 0 courses)
             ========================================= */
          <div className="flex flex-col items-center justify-center bg-white rounded-none md:rounded-2xl md:border border-gray-100 shadow-sm py-20 px-6 min-h-[500px] w-full">
            <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-3xl"></div>
              <img src="/images/empty-state.svg" alt="Learning Journey" className="relative z-10 w-full h-full object-contain" />
            </div>
            <h2 className="text-xl md:text-[24px] font-bold text-gray-900 mb-3 text-center">Your learning journey starts here</h2>
            <p className="text-center text-sm text-gray-500 max-w-[550px] mb-8 leading-relaxed">
              Explore webinars, cohorts, and 1:1 mentorships across a wide range of topics.<br className="hidden md:block" />
              Start learning from expert educators and unlock exclusive resources and study materials.
            </p>
            <button className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
              Explore Courses <ExternalLink size={16} />
            </button>
          </div>
        ) : activeTab === "upcoming" ? (
          <>
            {/* Focus For Today */}
            {focusTodaySessions.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4 px-4 md:px-0">
                  <span className="text-[12px] md:text-[12px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    FOCUS FOR TODAY
                  </span>
                  <div className="hidden md:block flex-1 h-px bg-gray-200"></div>
                </div>
                
                {/* Mobile Horizontal Scroll | Desktop Grid */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {focusTodaySessions.map((session) => renderCard(session, true))}
                </div>
              </div>
            )}

            {/* Upcoming Sessions */}
            {otherSessions.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-4 px-4 md:px-0">
                  <span className="text-[12px] md:text-[12px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    UPCOMING SESSIONS
                  </span>
                  <div className="hidden md:block flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Mobile Horizontal Scroll | Desktop Grid */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {otherSessions.map((session) => renderCard(session, false))}
                </div>
              </div>
            )}

            {focusTodaySessions.length === 0 && otherSessions.length === 0 && (
              <div className="py-20 text-center text-gray-500 px-4">
                No upcoming sessions found.
              </div>
            )}
          </>
        ) : (
          /* Completed / Missed Tab View */
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredSessions.map((session) => renderCard(session, false))}
            
            {filteredSessions.length === 0 && ( < >
              <p className=" hidden md:block py-20 text-center text-gray-500 px-4">
               No upcoming sessions found.

               </p>
               <div className=" md:hidden flex flex-col items-center justify-center bg-white rounded-none md:rounded-2xl md:border border-gray-100 shadow-sm py-16 px-6 min-h-[500px] w-full">
               <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 flex items-center justify-center">
                 <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-3xl"></div>
                 <img src="/images/empty-state.svg" alt="Learning Journey" className="relative z-10 w-full h-full object-contain" />
               </div>
               <h2 className="text-xl md:text-[24px] font-bold text-gray-900 mb-3 text-center">Your learning journey starts here</h2>
               <p className="text-center text-sm text-gray-500 max-w-[550px] mb-8 leading-relaxed">
               No upcoming sessions found.

               </p>
               <button className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
                 Explore Courses <ExternalLink size={16} />
               </button>
             </div></>
            )}
          </div>
        )}

      </div>
      <RescheduleModal 
        isOpen={isRescheduleOpen} 
        onClose={() => setIsRescheduleOpen(false)} 
      />
    </div>
  );
}