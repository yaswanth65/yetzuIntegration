// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Calendar,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Paperclip,
//   ExternalLink
// } from "lucide-react";
// import { StudentAPI } from "@/lib/api"; // Importing your new API file

// // --- HELPER COMPONENTS & STYLES ---
// const ViewDetailsButton = ({ variant = "outline" }: { variant?: "solid" | "outline" }) => {
//   if (variant === "solid") {
//     return (
//       <button className="w-full bg-[#111111] hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
//         View Details
//       </button>
//     );
//   }
//   return (
//     <button className="w-full bg-white hover:bg-gray-50 text-[#111111] border border-gray-200 text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
//       View Details
//     </button>
//   );
// };

// const getFocusCardTheme = (type: string) => {
//   switch (type) {
//     case 'purple': return { border: "from-[#C4A9FF] via-transparent to-[#C4A9FF]", bg: "from-[#F3EDFF]", btn: "solid" as const };
//     case 'green': return { border: "from-[#A3DFB3] via-transparent to-[#A3DFB3]", bg: "from-[#E6F5EE]", btn: "outline" as const };
//     case 'orange': return { border: "from-[#FAD0A5] via-transparent to-[#FAD0A5]", bg: "from-[#FFF3E3]", btn: "outline" as const };
//     case 'blue': return { border: "from-[#9FE4EE] via-transparent to-[#9FE4EE]", bg: "from-[#E6F8FA]", btn: "outline" as const };
//     default: return { border: "from-gray-200 via-transparent to-gray-200", bg: "from-gray-50", btn: "outline" as const };
//   }
// };

// const getUpcomingTheme = (theme: string) => {
//   switch(theme) {
//     case 'teal': return { border: "border-teal-100", btnBg: "bg-[#F2FAFA] hover:bg-[#E5F5F5]", btnText: "text-[#2F9089]" , background : "bg-teal-50"  };
//     case 'orange': return { border: "border-orange-100", btnBg: "bg-[#FFF8F2] hover:bg-[#FFF0E5]", btnText: "text-[#D97706]",background : "bg-orange-50" };
//     case 'purple': return { border: "border-purple-100", btnBg: "bg-[#F9F6FF] hover:bg-[#F3EFFF]", btnText: "text-[#7B42F6]",background : "bg-purple-50" };
//     default: return { border: "border-gray-200", btnBg: "bg-gray-50 hover:bg-gray-100", btnText: "text-gray-600",background : "bg-gray-50" };
//   }
// };

// export default function OverviewPage() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [apiData, setApiData] = useState<any>(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // NOTE: Replace these with how you actually retrieve your token/userId (e.g., from cookies, context, or localStorage)
//         // const token = localStorage.getItem("token")  
//         // const userId = localStorage.getItem("userId") 
//         const token = localStorage.getItem("token") ||  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGIwYWE1My1mNzlhLTQxZDUtODdmZi05YTM3NGJmOWZjNmYiLCJlbWFpbCI6ImFiaGlyYW10ZW1wQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzczNTcyOTM4LCJleHAiOjE3NzM2MTYxMzh9.3MdH1osbDpAVbSrj7PNOp35Fvp1v-JnsgJ0L-4fN9TI";
//         const userId = localStorage.getItem("userId") || "b8b0aa53-f79a-41d5-87ff-9a374bf9fc6f";

//         if (token && userId) {
//           const response = await StudentAPI.getOverview(token, userId);
//           if (response.success) {
//             setApiData(response.data);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (isLoading) {
//     return (
//       <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-500 font-medium">Loading your dashboard...</p>
//       </main>
//     );
//   }

//   // Safe fallbacks based on API structure
//   const safeData = apiData || {};
//   const userInfo = safeData.userInfo || {};
  
//   // Derived State Logic from Real API Data
//   const isEmpty = (userInfo.totalEnrolledCourses === 0);
//   const isCompleted = (userInfo.totalCertificates > 0);
//   const ringProgress = isEmpty ? 0 : (isCompleted ? 100 : (userInfo.progress?.percentage || 25));

//   const userName = userInfo.name?.split(" ")[0] || "Student";
//   const courseName = userInfo.enrolledCourses?.[0]?.title || "your course";

//   const bannerTitle = isEmpty ? `Welcome ${userName} 👋🏼` : `Welcome ${userName}. You're on track...`;
//   const bannerSubtitle = isEmpty 
//     ? "Get your journey started with you with the varieties of sessions in Yetzu."
//     : `You're making great progress in your <span class="font-semibold text-gray-700">${courseName}</span> journey. Keep the momentum going!`;

//   const trackerSteps = [
//     { id: 1, label: "Signed up!", icon: "/images/shake-hand.svg", active: true },
//     { id: 2, label: "Sessions", icon: "/images/calander.svg", active: !isEmpty },
//     { id: 3, label: "Assignments", icon: "/images/assignment.svg", active: safeData.totalAssignment > 0 },
//     { id: 4, label: isCompleted ? "Completed" : "Certifications", icon: isCompleted ? "/images/flag.svg" : "/images/certificate.svg", active: isCompleted }
//   ];

//   // Map API Focus This Week
//   const focusThisWeek: any[] = [];
//   const upcomingFocusSessions = safeData.focusThisWeek?.contactThisWeek?.upcomingSessions || [];
//   const assignmentsDueThisWeek = safeData.focusThisWeek?.assignmentsDueThisWeek || [];

//   upcomingFocusSessions.forEach((s: any, idx: number) => {
//     focusThisWeek.push({
//       id: `fs-${idx}`, type: "purple", title: s.title || "Upcoming Session", 
//       date: s.date || "TBD", time: s.time || "TBD", badgeText: "Today", badgeClasses: "bg-[#7B42F6] text-white", icon: "/images/video-chat.svg" 
//     });
//   });

//   assignmentsDueThisWeek.forEach((a: any, idx: number) => {
//     focusThisWeek.push({
//       id: `fa-${idx}`, type: "green", title: a.title || "Pending Assignment", 
//       date: `Due on: ${a.dueDate || "TBD"}`, time: null, badgeText: "Due Soon", badgeClasses: "bg-[#FFF4E5] text-[#F58220] border border-[#FFE0B2]", icon: "/images/file-edit.svg" 
//     });
//   });

//   // Map API Bottom Layout Lists
//   const upcomingSessions = (safeData.upcomingSessions || []).map((s: any, i: number) => {
//     const themes = ['purple', 'teal', 'orange'];
//     return {
//       id: s.id || i, title: s.title || "Upcoming Session", date: s.date || "TBD", time: s.time || "TBD", theme: themes[i % themes.length]
//     };
//   });

//   const pendingAssignments = (safeData.pendingAssignments || []).map((a: any, i: number) => ({
//     id: a.id || i, title: a.title || "Pending Assignment", subtitle: a.sessionName || "Assignment", due: a.dueDate || "TBD"
//   }));

//   const feedbacks = (safeData.feedbacks || []).map((f: any, i: number) => ({
//     id: f.id || i, doctor: f.mentorName || "Mentor", subject: f.sessionName || "Feedback", text: f.comment || "No feedback provided."
//   }));

//   return (
//     <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto flex flex-col gap-5 bg-gray-50 min-h-screen overflow-x-hidden">
      
//       {/* =========================================
//           1. DYNAMIC TOP BANNER 
//           ========================================= */}
//      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between bg-white border border-gray-100 shadow-sm rounded-2xl p-6 gap-6 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-50 via-transparent to-transparent pointer-events-none"></div>
//         <img 
//           src="/images/clip-path.svg" 
//           alt="Background pattern" 
//           className="absolute left-[15%] top-1/2 -translate-y-1/2 h-[150%] min-w-[300px] object-cover pointer-events-none z-0 opacity-70" 
//         />

//         {/* --- Avatar and Text (Responsive Alignment) --- */}
//         <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-5 z-10 w-full xl:w-auto text-left">
//           <div 
//             className={`relative rounded-full flex items-center justify-center shrink-0 ${isEmpty ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px]' : 'w-[72px] h-[72px] xl:w-[76px] xl:h-[76px]'}`}
//             style={{ background: ringProgress > 0 ? `conic-gradient(#042BFD ${ringProgress}%, #f3f4f6 ${ringProgress}%)` : 'transparent' }}
//           >
//             <div className={`rounded-full overflow-hidden bg-white ${ringProgress > 0 ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px] border-[3px] border-white' : 'w-full h-full'}`}>
//               <img src={`https://ui-avatars.com/api/?name=${userInfo?.name || "Natalia"}&background=random`} alt="Avatar" className="w-full h-full object-cover" />
//             </div>
//           </div>
//           <div className="flex-1">
//             <h1 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-tight mb-1">{bannerTitle}</h1>
//             <p className="text-[13px] md:text-[14px] text-gray-500 mt-1.5 max-w-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: bannerSubtitle }} />
//           </div>
//         </div>

//         {!isEmpty && (
//           <>
//             {/* --- Tracker: DESKTOP VIEW (Hidden on Mobile) --- */}
//             <div className="hidden xl:flex items-center justify-end overflow-x-auto w-auto pb-0 z-10 no-scrollbar">
//               {trackerSteps.map((step, index) => {
//                 const isLast = index === trackerSteps.length - 1;
//                 return (
//                   <React.Fragment key={`desktop-${step.id}`}>
//                     <div className={`flex flex-col items-center gap-1.5 shrink-0 transition-opacity ${step.active ? 'opacity-100' : 'opacity-50'}`}>
//                       <div className="w-8 h-8 flex items-center justify-center">
//                         <img src={step.icon} alt={step.label} className="max-w-full max-h-full object-contain drop-shadow-sm" />
//                       </div>
//                       <span className={`text-[12px] font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
//                     </div>
//                     {!isLast && (
//                       index === 0 ? (
//                         <div className="w-16 h-[4px] bg-gray-200 rounded-full mb-6 mx-3 shrink-0 relative flex items-center">
//                           <div className="w-[60%] h-full rounded-full bg-[#10B981]"></div>
//                           <div className="absolute left-[60%] w-2.5 h-2.5 bg-[#10B981] rounded-full -ml-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
//                         </div>
//                       ) : (
//                         <div className="w-8 h-[2px] border-t-2 border-dashed border-gray-300 mb-6 mx-3 shrink-0 opacity-50"></div>
//                       )
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>

//             {/* --- Tracker: MOBILE VIEW (Hidden on Desktop) --- */}
//             <div className="flex xl:hidden w-full justify-between items-end z-10 mt-2 gap-1.5">
//               {trackerSteps.map((step, index) => {
//                 // Determine the green progress bar width for mobile (matches screenshot)
//                 let fillWidth = "w-0";
//                 if (index === 0) {
//                   fillWidth = "w-full"; // Signed up is always complete
//                 } else if (index === 1 && step.active) {
//                   fillWidth = isCompleted ? "w-full" : "w-[40%]"; // Partial progress for sessions
//                 } else if (index > 1 && step.active) {
//                   fillWidth = "w-full"; 
//                 }

//                 return (
//                   <div key={`mobile-${step.id}`} className="flex flex-col items-center flex-1 gap-2 overflow-hidden">
//                     <div className={`transition-opacity flex flex-col items-center gap-1.5 ${step.active ? 'opacity-100' : 'opacity-50'}`}>
//                       <div className="h-8 flex items-end justify-center">
//                         <img src={step.icon} alt={step.label} className="max-h-full object-contain drop-shadow-sm" />
//                       </div>
//                       <span className={`text-[11px] font-medium whitespace-nowrap ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
//                         {step.label}
//                       </span>
//                     </div>
                    
//                     {/* Bottom Progress Line */}
//                     <div className="w-[85%] h-[4px] bg-gray-200 rounded-full overflow-hidden mt-0.5">
//                       <div className={`h-full bg-[#22C55E] rounded-full transition-all duration-500 ${fillWidth}`}></div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>

//       {/* =========================================
//           2. EMPTY STATE VIEW
//           ========================================= */}
//       {isEmpty && (
//         <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-6 min-h-[500px] w-full">
//           {/* Simulated Central Graphic */}
//           <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 flex items-center justify-center">
//             <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-3xl"></div>
//             <img src="/images/empty-state.svg" alt="Learning Journey" className="relative z-10 w-full h-full object-contain" />
//           </div>
          
//           <h2 className="text-xl md:text-[24px] font-bold text-gray-900 mb-3 text-center">Your learning journey starts here</h2>
//           <p className="text-center text-sm text-gray-500 max-w-[550px] mb-8 leading-relaxed">
//             Explore webinars, cohorts, and 1:1 mentorships across a wide range of topics.<br className="hidden md:block" />
//             Start learning from expert educators and unlock exclusive resources and study materials.
//           </p>
          
//           <button className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
//             Explore Courses <ExternalLink size={16} />
//           </button>
//         </div>
//       )}

//       {/* =========================================
//           3. POPULATED DASHBOARD VIEW 
//           ========================================= */}
//       {!isEmpty && (
//         <>
//           {/* Focus For This Week */}
//           <div className="border border-gray-100 shadow-sm rounded-2xl p-6 bg-white w-full overflow-hidden">
           
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">FOCUS FOR THIS WEEK</h2>
//               <div className="flex gap-2 shrink-0">
//                 <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400 transition-colors"><ChevronLeft size={16} /></button>
//                 <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"><ChevronRight size={16} /></button>
//               </div>
//             </div>

//             {focusThisWeek.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
//                 {focusThisWeek.map((item) => {
//                   const theme = getFocusCardTheme(item.type);
//                   return (
//                     <div key={item.id} className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.border} flex flex-col min-h-[260px]`}>
//                       <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
//                         <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} via-white to-white pointer-events-none z-0`}></div>
                        
//                         <div className="absolute top-5 left-5 z-10">
//                           <img src={item.icon} alt="Icon" className="w-[68px] h-[68px]" />
//                         </div>

//                         {item.badgeText && (
//                           <div className="flex justify-end mb-8 relative z-20">
//                             <span className={`${item.badgeClasses} text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0`}>
//                               {item.badgeText}
//                             </span>
//                           </div>
//                         )}

//                         <div className={`relative z-20 flex-1 flex flex-col h-full justify-end ${!item.badgeText ? 'mt-18' : 'mt-3'}`}>
//                           <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">{item.title}</h3>
//                           <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
//                             <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> {item.date}</span>
//                             {item.time && <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> {item.time}</span>}
//                           </div>
//                           <ViewDetailsButton variant={theme.btn} />
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-[14px] text-gray-500 py-4">No specific focus items for this week.</p>
//             )}
//           </div>
          

//           {/* Bottom Layout Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            
//             {/* Upcoming Sessions */}
//             <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col">
//               <div className="flex items-center gap-2 mb-4">
//                 <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upcoming Sessions</h2>
//                 <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{upcomingSessions.length}</span>
//               </div>
//               <div className="space-y-4 flex-1">
//                 {upcomingSessions.length > 0 ? upcomingSessions.map((session : any) => {
//                   const theme = getUpcomingTheme(session.theme);
//                   return (
//                     <div key={session.id} className={`border ${theme.border} rounded-xl p-1 overflow-hidden flex flex-col ${theme.background} shadow-[0_2px_8px_rgba(0,0,0,0.02)]`}>
//                       <div className="p-4 bg-white rounded-xl flex-1">
//                         <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{session.title}</h3>
//                         <div className="flex flex-wrap items-center gap-2">
//                           <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
//                             <Calendar size={14} className="shrink-0 text-gray-400" /> {session.date}
//                           </span>
//                           <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
//                             <Clock size={14} className="shrink-0 text-gray-400" /> {session.time}
//                           </span>
//                         </div>
//                       </div>
//                       <button className={`w-full ${theme.btnBg} ${theme.btnText} text-[14px] font-medium py-3 transition-colors shrink-0`}>
//                         View Details
//                       </button>
//                     </div>
//                   );
//                 }) : (
//                   <p className="text-[14px] text-gray-500">No upcoming sessions.</p>
//                 )}
//               </div>
//             </div>

//             {/* Pending Assignments */}
//             <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col">
//               <div className="flex items-center gap-2 mb-4">
//                 <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pending Assignments</h2>
//                 <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingAssignments.length}</span>
//               </div>
//               <div className="space-y-4 flex-1">
//                 {pendingAssignments.length > 0 ? pendingAssignments.map((assignment :any ) => (
//                   <div key={assignment.id} className="border border-gray-200 rounded-xl overflow-hidden flex p-1 bg-[#F5F6FF] flex-col  shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
//                     <div className="p-4 bg-white rounded-xl mb-2 flex-1">
//                       <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{assignment.title}</h3>
//                       <div className="flex flex-col gap-2">
//                         <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white">
//                           <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
//                           <span className="leading-snug">{assignment.subtitle}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg whitespace-nowrap w-fit">
//                           <Calendar size={14} className="text-gray-400 shrink-0" /> Due on: {assignment.due}
//                         </div>
//                       </div>
//                     </div>
//                     <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
//                       Open Workspace
//                     </button>
//                   </div>
//                 )) : (
//                   <p className="text-[14px] text-gray-500">No pending assignments.</p>
//                 )}
//               </div>
//             </div>

//             {/* Feedbacks */}
//             <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden md:col-span-2 xl:col-span-1 flex flex-col">
//               <div className="flex items-center gap-2 mb-4">
//                 <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Feedbacks</h2>
//                 <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{feedbacks.length}</span>
//               </div>
//               <div className="space-y-4 flex-1">
//                 {feedbacks.length > 0 ? feedbacks.map((feedback :any) => (
//                   <div key={feedback.id} className="border border-gray-200 rounded-xl p-1 overflow-hidden flex flex-col bg-[#F5F6FF] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
//                     <div className="p-4 bg-white rounded-xl flex-1">
//                       <h3 className="text-[15px] font-bold text-gray-900 mb-4">{feedback.doctor}</h3>
//                       <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white mb-3">
//                         <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
//                         <span className="leading-snug">{feedback.subject}</span>
//                       </div>
//                       <div className="bg-[#F6F8FA] p-3 rounded-lg text-[13px] text-gray-700 italic leading-relaxed">
//                         {feedback.text}
//                       </div>
//                     </div>
//                     <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
//                       View Details
//                     </button>
//                   </div>
//                 )) : (
//                   <p className="text-[14px] text-gray-500">No new feedback.</p>
//                 )}
//               </div>
//             </div>

//           </div>
//         </>
//       )}

//     </main>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Calendar,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Paperclip,
//   ExternalLink
// } from "lucide-react";
// import { StudentAPI } from "@/lib/api";

// const MOCK_DASHBOARD_DATA = {
//   userInfo: {
//     name: "Natalia",
//     totalEnrolledCourses: 1, // Set to 1 to bypass the Empty State
//     totalCertificates: 0,
//     progress: { percentage: 25 },
//     enrolledCourses: [{ title: "Data Science" }]
//   },
//   focusThisWeek: [
//     { id: "fs-1", type: "purple", title: "Webinar: Major Insights on Human Nervous System with Dr. Rao", date: "22 Feb, 2026", time: "3:00 PM", badgeText: "TODAY", badgeClasses: "bg-[#7B42F6] text-white", icon: "/images/video-chat.svg" },
//     { id: "fa-1", type: "green", title: "Assignment: Obstetric Case- Third Trimester Bleeding", date: "Due on: 24 Feb, 2026", time: null, badgeText: "", badgeClasses: "", icon: "/images/file-edit.svg" }
//   ],
//   upcomingSessions: [
//     { id: 1, title: "Cohort: Major Insights on Human Nervous System with Dr. Rao", date: "21 Feb, 2026", time: "3:00 PM", theme: "purple" },
//     { id: 2, title: "Cohort: Major Insights on Human Nervous System with Dr. Rao", date: "23 Feb, 2026", time: "3:00 PM", theme: "teal" }
//   ],
//   pendingAssignments: [
//     { id: 1, title: "Obstetric Case- Third Trimester Bleeding", subtitle: "Drug Dose Calculation Exercise with Dr. Rao", due: "24 Feb, 2026" },
//     { id: 2, title: "Obstetric Case- Second Trimester Bleeding", subtitle: "Drug Dose Calculation Exercise with Dr. Rao", due: "28 Feb, 2026" }
//   ],
//   feedbacks: [
//     { id: 1, doctor: "Dr. Nikhil Nath", subject: "Drug Dose Calculation Exercise with Dr. Nikhil Nath", text: "Great effort, but remember to double-check your calculations for pediatric dosages. See attached notes for areas to improve." },
//     { id: 2, doctor: "Dr. Rao", subject: "Deep Dive in Human Nervous System with Dr. Rao", text: "Great understanding of the core concepts! Keep up the excellent work in the next modules." }
//   ]
// };
// // --- HELPER COMPONENTS & STYLES ---
// const ViewDetailsButton = ({ variant = "outline" }: { variant?: "solid" | "outline" }) => {
//   if (variant === "solid") {
//     return (
//       <button className="w-full bg-[#111111] hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
//         View Details
//       </button>
//     );
//   }
//   return (
//     <button className="w-full bg-white hover:bg-gray-50 text-[#111111] border border-gray-200 text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
//       View Details
//     </button>
//   );
// };

// const getFocusCardTheme = (type: string) => {
//   switch (type) {
//     case 'purple': return { border: "from-[#C4A9FF] via-transparent to-[#C4A9FF]", bg: "from-[#F3EDFF]", btn: "solid" as const };
//     case 'green': return { border: "from-[#A3DFB3] via-transparent to-[#A3DFB3]", bg: "from-[#E6F5EE]", btn: "outline" as const };
//     case 'orange': return { border: "from-[#FAD0A5] via-transparent to-[#FAD0A5]", bg: "from-[#FFF3E3]", btn: "outline" as const };
//     case 'blue': return { border: "from-[#9FE4EE] via-transparent to-[#9FE4EE]", bg: "from-[#E6F8FA]", btn: "outline" as const };
//     default: return { border: "from-gray-200 via-transparent to-gray-200", bg: "from-gray-50", btn: "outline" as const };
//   }
// };

// const getUpcomingTheme = (theme: string) => {
//   switch(theme) {
//     case 'teal': return { border: "border-teal-100", btnBg: "bg-[#F2FAFA] hover:bg-[#E5F5F5]", btnText: "text-[#2F9089]" , background : "bg-teal-50"  };
//     case 'orange': return { border: "border-orange-100", btnBg: "bg-[#FFF8F2] hover:bg-[#FFF0E5]", btnText: "text-[#D97706]",background : "bg-orange-50" };
//     case 'purple': return { border: "border-purple-100", btnBg: "bg-[#F9F6FF] hover:bg-[#F3EFFF]", btnText: "text-[#7B42F6]",background : "bg-purple-50" };
//     default: return { border: "border-gray-200", btnBg: "bg-gray-50 hover:bg-gray-100", btnText: "text-gray-600",background : "bg-gray-50" };
//   }
// };

// export default function OverviewPage() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [apiData, setApiData] = useState<any>(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("token") ||  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGIwYWE1My1mNzlhLTQxZDUtODdmZi05YTM3NGJmOWZjNmYiLCJlbWFpbCI6ImFiaGlyYW10ZW1wQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzczNTcyOTM4LCJleHAiOjE3NzM2MTYxMzh9.3MdH1osbDpAVbSrj7PNOp35Fvp1v-JnsgJ0L-4fN9TI";
//         const userId = localStorage.getItem("userId") || "b8b0aa53-f79a-41d5-87ff-9a374bf9fc6f";

//         if (token && userId) {
//           const response = await StudentAPI.getOverview(token, userId);
//           if (response.success) {
//             setApiData(response.data);
//             setIsLoading(false);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (isLoading) {
//     return (
//       <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-500 font-medium">Loading your dashboard...</p>
//       </main>
//     );
//   }

//   // --- PARSE API DATA ---
//   const safeData = apiData || {};
//   const userInfo = safeData.userInfo || {};
  
//   // Safe Data Mapping
//   const focusThisWeek: any[] = [];
//   const upcomingFocusSessions = safeData.focusThisWeek?.contactThisWeek?.upcomingSessions || [];
//   const assignmentsDueThisWeek = safeData.focusThisWeek?.assignmentsDueThisWeek || [];

//   upcomingFocusSessions.forEach((s: any, idx: number) => {
//     focusThisWeek.push({
//       id: `fs-${idx}`, type: "purple", title: s.title || "Upcoming Session", 
//       date: s.date || "TBD", time: s.time || "TBD", badgeText: "Today", badgeClasses: "bg-[#7B42F6] text-white", icon: "/images/video-chat.svg" 
//     });
//   });

//   assignmentsDueThisWeek.forEach((a: any, idx: number) => {
//     focusThisWeek.push({
//       id: `fa-${idx}`, type: "green", title: a.title || "Pending Assignment", 
//       date: `Due on: ${a.dueDate || "TBD"}`, time: null, badgeText: "Due Soon", badgeClasses: "bg-[#FFF4E5] text-[#F58220] border border-[#FFE0B2]", icon: "/images/file-edit.svg" 
//     });
//   });

//   const upcomingSessions = (safeData.upcomingSessions || []).map((s: any, i: number) => {
//     const themes = ['purple', 'teal', 'orange'];
//     return {
//       id: s.id || i, title: s.title || "Upcoming Session", date: s.date || "TBD", time: s.time || "TBD", theme: themes[i % themes.length]
//     };
//   });

//   const pendingAssignments = (safeData.pendingAssignments || []).map((a: any, i: number) => ({
//     id: a.id || i, title: a.title || "Pending Assignment", subtitle: a.sessionName || "Assignment", due: a.dueDate || "TBD"
//   }));

//   const feedbacks = (safeData.feedbacks || []).map((f: any, i: number) => ({
//     id: f.id || i, doctor: f.mentorName || "Mentor", subject: f.sessionName || "Feedback", text: f.comment || "No feedback provided."
//   }));

//   // --- DASHBOARD LOGIC ---
//   // Only show empty state if literally everything is empty.
//   const isActuallyEmpty = (
//     userInfo.totalEnrolledCourses === 0 && 
//     focusThisWeek.length === 0 &&
//     upcomingSessions.length === 0 &&
//     pendingAssignments.length === 0
//   );

//   const isCompleted = (userInfo.totalCertificates > 0);
//   const ringProgress = isActuallyEmpty ? 0 : (isCompleted ? 100 : (userInfo.progress?.percentage || 25));

//   const userName = userInfo.name?.split(" ")[0] || "Student";
//   const courseName = userInfo.enrolledCourses?.[0]?.title || "your courses";

//   const bannerTitle = isActuallyEmpty ? `Welcome ${userName} 👋🏼` : `Welcome ${userName}. You're on track...`;
//   const bannerSubtitle = isActuallyEmpty 
//     ? "Get your journey started with you with the varieties of sessions in Yetzu."
//     : `You're making great progress in your <span class="font-semibold text-gray-700">${courseName}</span> journey. Keep the momentum going!`;

//   const trackerSteps = [
//     { id: 1, label: "Signed up!", icon: "/images/shake-hand.svg", active: true },
//     { id: 2, label: "Sessions", icon: "/images/calander.svg", active: upcomingSessions.length > 0 },
//     { id: 3, label: "Assignments", icon: "/images/assignment.svg", active: pendingAssignments.length > 0 },
//     { id: 4, label: isCompleted ? "Completed" : "Certifications", icon: isCompleted ? "/images/flag.svg" : "/images/certificate.svg", active: isCompleted }
//   ];

//   return (
//     <div className="bg-white md:bg-transparent">
//       <main className="md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto flex flex-col gap-5 md:bg-gray-50 min-h-screen overflow-x-hidden pb-24 lg:pb-8">
      
//         {/* =========================================
//             1. DYNAMIC TOP BANNER 
//             ========================================= */}
//         <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between bg-white md:border md:border-gray-100 shadow-sm rounded-none md:rounded-2xl p-6 md:p-6 gap-6 relative overflow-hidden">
//           <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-50 via-transparent to-transparent pointer-events-none"></div>
//           <img 
//             src="/images/clip-path.svg" 
//             alt="Background pattern" 
//             className="absolute left-[15%] top-1/2 -translate-y-1/2 h-[150%] min-w-[300px] object-cover pointer-events-none z-0 opacity-70" 
//           />

//           {/* --- Avatar and Text (Stacked on Mobile, Row on Desktop) --- */}
//           <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-5 z-10 w-full xl:w-auto text-left">
//             <div 
//               className={`relative rounded-full flex items-center justify-center shrink-0 ${isActuallyEmpty ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px]' : 'w-[72px] h-[72px] xl:w-[76px] xl:h-[76px]'}`}
//               style={{ background: ringProgress > 0 ? `conic-gradient(#042BFD ${ringProgress}%, #f3f4f6 ${ringProgress}%)` : 'transparent' }}
//             >
//               <div className={`rounded-full overflow-hidden bg-white ${ringProgress > 0 ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px] border-[3px] border-white' : 'w-full h-full'}`}>
//                 <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || "Student")}&background=random`} alt="Avatar" className="w-full h-full object-cover" />
//               </div>
//             </div>
//             <div className="flex-1 mt-1 xl:mt-0">
//               <h1 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-tight mb-1.5">{bannerTitle}</h1>
//               <p className="text-[13px] md:text-[14px] text-gray-500 max-w-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: bannerSubtitle }} />
//             </div>
//           </div>

//           {!isActuallyEmpty && (
//             <>
//               {/* Tracker: DESKTOP VIEW (Hidden on Mobile) */}
//               <div className="hidden xl:flex items-center justify-end overflow-x-auto w-auto pb-0 z-10 no-scrollbar">
//                 {trackerSteps.map((step, index) => {
//                   const isLast = index === trackerSteps.length - 1;
//                   return (
//                     <React.Fragment key={`desktop-${step.id}`}>
//                       <div className={`flex flex-col items-center gap-1.5 shrink-0 transition-opacity ${step.active ? 'opacity-100' : 'opacity-50'}`}>
//                         <div className="w-8 h-8 flex items-center justify-center">
//                           <img src={step.icon} alt={step.label} className="max-w-full max-h-full object-contain drop-shadow-sm" />
//                         </div>
//                         <span className={`text-[12px] font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
//                       </div>
//                       {!isLast && (
//                         index === 0 ? (
//                           <div className="w-16 h-[4px] bg-gray-200 rounded-full mb-6 mx-3 shrink-0 relative flex items-center">
//                             <div className="w-[60%] h-full rounded-full bg-[#10B981]"></div>
//                             <div className="absolute left-[60%] w-2.5 h-2.5 bg-[#10B981] rounded-full -ml-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
//                           </div>
//                         ) : (
//                           <div className="w-8 h-[2px] border-t-2 border-dashed border-gray-300 mb-6 mx-3 shrink-0 opacity-50"></div>
//                         )
//                       )}
//                     </React.Fragment>
//                   );
//                 })}
//               </div>

//               {/* Tracker: MOBILE VIEW (Hidden on Desktop) */}
//               <div className="flex xl:hidden w-full justify-between items-end z-10 mt-3 gap-1.5">
//                 {trackerSteps.map((step, index) => {
//                   let fillWidth = "w-0";
//                   if (index === 0) fillWidth = "w-full"; 
//                   else if (index === 1 && step.active) fillWidth = isCompleted ? "w-full" : "w-[40%]"; 
//                   else if (index > 1 && step.active) fillWidth = "w-full"; 

//                   return (
//                     <div key={`mobile-${step.id}`} className="flex flex-col items-center flex-1 gap-2.5 overflow-hidden">
//                       <div className={`transition-opacity flex flex-col items-center gap-1.5 ${step.active ? 'opacity-100' : 'opacity-50'}`}>
//                         <div className="h-8 flex items-end justify-center">
//                           <img src={step.icon} alt={step.label} className="max-h-full object-contain drop-shadow-sm" />
//                         </div>
//                         <span className={`text-[11px] font-medium whitespace-nowrap ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
//                           {step.label}
//                         </span>
//                       </div>
//                       {/* Underline Progress Bar */}
//                       <div className="w-[85%] h-[4px] bg-gray-200 rounded-full overflow-hidden">
//                         <div className={`h-full bg-[#22C55E] rounded-full transition-all duration-500 ${fillWidth}`}></div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </div>

//         {/* =========================================
//             2. EMPTY STATE VIEW
//             ========================================= */}
//         {isActuallyEmpty && (
//           <div className="flex flex-col items-center justify-center bg-white rounded-none md:rounded-2xl md:border border-gray-100 shadow-sm py-20 px-6 min-h-[500px] w-full">
//             <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 flex items-center justify-center">
//               <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-3xl"></div>
//               <img src="/images/empty-state.svg" alt="Learning Journey" className="relative z-10 w-full h-full object-contain" />
//             </div>
//             <h2 className="text-xl md:text-[24px] font-bold text-gray-900 mb-3 text-center">Your learning journey starts here</h2>
//             <p className="text-center text-sm text-gray-500 max-w-[550px] mb-8 leading-relaxed">
//               Explore webinars, cohorts, and 1:1 mentorships across a wide range of topics.<br className="hidden md:block" />
//               Start learning from expert educators and unlock exclusive resources and study materials.
//             </p>
//             <button className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
//               Explore Courses <ExternalLink size={16} />
//             </button>
//           </div>
//         )}

//         {/* =========================================
//             3. POPULATED DASHBOARD VIEW 
//             ========================================= */}
//         {!isActuallyEmpty && (
//           <>
//             {/* Focus For This Week */}
//             <div className="md:border md:border-gray-100 md:shadow-sm md:rounded-2xl px-0 py-2 md:p-6 bg-white w-full overflow-hidden">
//               <div className="flex justify-between items-center mb-4 px-4 md:px-0">
//                 <h2 className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">FOCUS FOR THIS WEEK</h2>
//                 <div className="hidden md:flex gap-2 shrink-0">
//                   <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400 transition-colors"><ChevronLeft size={16} /></button>
//                   <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"><ChevronRight size={16} /></button>
//                 </div>
//               </div>

//               {focusThisWeek.length > 0 ? (
//                 // MOBILE HORIZONTAL SCROLL | DESKTOP GRID
//                 <div className="flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-4 px-4 md:px-0 gap-4 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                   {focusThisWeek.map((item: any) => {
//                     const theme = getFocusCardTheme(item.type);
//                     return (
//                       <div key={item.id} className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.border} flex flex-col min-h-[260px] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`}>
//                         <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
//                           <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} via-white to-white pointer-events-none z-0`}></div>
                          
//                           <div className="absolute top-5 left-5 z-10">
//                             <img src={item.icon} alt="Icon" className="w-[68px] h-[68px]" />
//                           </div>

//                           {item.badgeText && (
//                             <div className="flex justify-end mb-8 relative z-20">
//                               <span className={`${item.badgeClasses} text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0`}>
//                                 {item.badgeText}
//                               </span>
//                             </div>
//                           )}

//                           <div className={`relative z-20 flex-1 flex flex-col h-full justify-end ${!item.badgeText ? 'mt-18' : 'mt-3'}`}>
//                             <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">{item.title}</h3>
//                             <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
//                               <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> {item.date}</span>
//                               {item.time && <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> {item.time}</span>}
//                             </div>
//                             <ViewDetailsButton variant={theme.btn} />
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <p className="text-[14px] text-gray-500 py-4 px-4 md:px-0">No specific focus items for this week.</p>
//               )}
//             </div>
            
//             {/* Bottom Layout Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-4 w-full">
              
//               {/* Upcoming Sessions */}
//               <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden flex flex-col">
//                 <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
//                   <h2 className="text-[11px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">UPCOMING SESSIONS</h2>
//                   <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{upcomingSessions.length}</span>
//                 </div>
                
//                 {/* MOBILE HORIZONTAL SCROLL | DESKTOP VERTICAL STACK */}
//                 <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                   {upcomingSessions.length > 0 ? upcomingSessions.map((session : any) => {
//                     const theme = getUpcomingTheme(session.theme);
//                     return (
//                       <div key={session.id} className={`border ${theme.border} rounded-xl p-1 overflow-hidden flex flex-col ${theme.background} shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`}>
//                         <div className="p-4 bg-white rounded-xl flex-1">
//                           <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{session.title}</h3>
//                           <div className="flex flex-wrap items-center gap-2">
//                             <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
//                               <Calendar size={14} className="shrink-0 text-gray-400" /> {session.date}
//                             </span>
//                             <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
//                               <Clock size={14} className="shrink-0 text-gray-400" /> {session.time}
//                             </span>
//                           </div>
//                         </div>
//                         <button className={`w-full ${theme.btnBg} ${theme.btnText} text-[14px] font-medium py-3 transition-colors shrink-0`}>
//                           View Details
//                         </button>
//                       </div>
//                     );
//                   }) : (
//                     <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No upcoming sessions.</p>
//                   )}
//                 </div>
//               </div>

//               {/* Pending Assignments */}
//               <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden flex flex-col">
//                 <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
//                   <h2 className="text-[11px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">PENDING ASSIGNMENTS</h2>
//                   <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingAssignments.length}</span>
//                 </div>
                
//                 {/* MOBILE HORIZONTAL SCROLL | DESKTOP VERTICAL STACK */}
//                 <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                   {pendingAssignments.length > 0 ? pendingAssignments.map((assignment :any ) => (
//                     <div key={assignment.id} className="border border-gray-200 rounded-xl overflow-hidden flex p-1 bg-[#F5F6FF] flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none">
//                       <div className="p-4 bg-white rounded-xl mb-2 flex-1">
//                         <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{assignment.title}</h3>
//                         <div className="flex flex-col gap-2">
//                           <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white">
//                             <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
//                             <span className="leading-snug">{assignment.subtitle}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg whitespace-nowrap w-fit">
//                             <Calendar size={14} className="text-gray-400 shrink-0" /> Due on: {assignment.due}
//                           </div>
//                         </div>
//                       </div>
//                       <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
//                         Open Workspace
//                       </button>
//                     </div>
//                   )) : (
//                     <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No pending assignments.</p>
//                   )}
//                 </div>
//               </div>

//               {/* Feedbacks */}
//               <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden md:col-span-2 xl:col-span-1 flex flex-col">
//                 <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
//                   <h2 className="text-[11px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">FEEDBACKS</h2>
//                   <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{feedbacks.length}</span>
//                 </div>

//                 {/* MOBILE HORIZONTAL SCROLL | DESKTOP VERTICAL STACK */}
//                 <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                   {feedbacks.length > 0 ? feedbacks.map((feedback :any) => (
//                     <div key={feedback.id} className="border border-gray-200 rounded-xl p-1 overflow-hidden flex flex-col bg-[#F5F6FF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none">
//                       <div className="p-4 bg-white rounded-xl flex-1">
//                         <h3 className="text-[15px] font-bold text-gray-900 mb-4">{feedback.doctor}</h3>
//                         <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white mb-3">
//                           <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
//                           <span className="leading-snug">{feedback.subject}</span>
//                         </div>
//                         <div className="bg-[#F6F8FA] p-3 rounded-lg text-[13px] text-gray-700 italic leading-relaxed line-clamp-3">
//                           {feedback.text}
//                         </div>
//                       </div>
//                       <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
//                         View Details
//                       </button>
//                     </div>
//                   )) : (
//                     <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No new feedback.</p>
//                   )}
//                 </div>
//               </div>

//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  ExternalLink
} from "lucide-react";
import { StudentAPI } from "@/lib/api"; 

// --- HELPER COMPONENTS & STYLES ---
const ViewDetailsButton = ({ variant = "outline" }: { variant?: "solid" | "outline" }) => {
  if (variant === "solid") {
    return (
      <button className="w-full bg-[#111111] hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
        View Details
      </button>
    );
  }
  return (
    <button className="w-full bg-white hover:bg-gray-50 text-[#111111] border border-gray-200 text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
      View Details
    </button>
  );
};

const getFocusCardTheme = (type: string) => {
  switch (type) {
    case 'purple': return { border: "from-[#C4A9FF] via-transparent to-[#C4A9FF]", bg: "from-[#F3EDFF]", btn: "solid" as const };
    case 'green': return { border: "from-[#A3DFB3] via-transparent to-[#A3DFB3]", bg: "from-[#E6F5EE]", btn: "outline" as const };
    case 'orange': return { border: "from-[#FAD0A5] via-transparent to-[#FAD0A5]", bg: "from-[#FFF3E3]", btn: "outline" as const };
    case 'blue': return { border: "from-[#9FE4EE] via-transparent to-[#9FE4EE]", bg: "from-[#E6F8FA]", btn: "outline" as const };
    default: return { border: "from-gray-200 via-transparent to-gray-200", bg: "from-gray-50", btn: "outline" as const };
  }
};

const getUpcomingTheme = (theme: string) => {
  switch(theme) {
    case 'teal': return { border: "border-teal-100", btnBg: "bg-[#F2FAFA] hover:bg-[#E5F5F5]", btnText: "text-[#2F9089]" , background : "bg-teal-50"  };
    case 'orange': return { border: "border-orange-100", btnBg: "bg-[#FFF8F2] hover:bg-[#FFF0E5]", btnText: "text-[#D97706]",background : "bg-orange-50" };
    case 'purple': return { border: "border-purple-100", btnBg: "bg-[#F9F6FF] hover:bg-[#F3EFFF]", btnText: "text-[#7B42F6]",background : "bg-purple-50" };
    default: return { border: "border-gray-200", btnBg: "bg-gray-50 hover:bg-gray-100", btnText: "text-gray-600",background : "bg-gray-50" };
  }
};

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<any>(null);
  
  const MOCK_DASHBOARD_DATA = {
      userInfo: {
        name: "Natalia",
        totalEnrolledCourses: 1, 
        totalCertificates: 0,
        progress: { percentage: 25 },
        enrolledCourses: [{ title: "Data Science" }]
      },
      focusThisWeek: {
        contactThisWeek: {
          upcomingSessions: [
            { title: "Webinar: Major Insights on Human Nervous System with Dr. Rao", date: "22 Feb, 2026", time: "3:00 PM" }
          ]
        },
        assignmentsDueThisWeek: [
          { title: "Assignment: Obstetric Case- Third Trimester Bleeding", dueDate: "24 Feb, 2026" }
        ]
      },
      upcomingSessions: [
        { id: 1, title: "Cohort: Major Insights on Human Nervous System with Dr. Rao", date: "21 Feb, 2026", time: "3:00 PM" },
        { id: 2, title: "Cohort: Major Insights on Human Nervous System with Dr. Rao", date: "23 Feb, 2026", time: "3:00 PM" }
      ],
      pendingAssignments: [
        { id: 1, title: "Obstetric Case- Third Trimester Bleeding", sessionName: "Drug Dose Calculation Exercise with Dr. Rao", dueDate: "24 Feb, 2026" },
        { id: 2, title: "Obstetric Case- Second Trimester Bleeding", sessionName: "Drug Dose Calculation Exercise with Dr. Rao", dueDate: "28 Feb, 2026" }
      ],
      feedbacks: [
        { id: 1, mentorName: "Dr. Nikhil Nath", sessionName: "Drug Dose Calculation Exercise with Dr. Nikhil Nath", comment: "Great effort, but remember to double-check your calculations for pediatric dosages. See attached notes for areas to improve." },
        { id: 2, mentorName: "Dr. Rao", sessionName: "Deep Dive in Human Nervous System with Dr. Rao", comment: "Great understanding of the core concepts! Keep up the excellent work in the next modules." }
      ]
    };

  // --- FETCH DASHBOARD DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
         
        const response = await StudentAPI.getOverview( );
        if (response.success) {
          setApiData(response.data);
        } else {
          setApiData(MOCK_DASHBOARD_DATA);
        }       
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setApiData(MOCK_DASHBOARD_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading your dashboard...</p>
      </main>
    );
  }

  // --- PARSE API DATA ---
  const safeData = apiData || {};
  const userInfo = safeData.userInfo || {};
  
  // 1. Focus For This Week Logic
  const focusThisWeek: any[] = [];
  const upcomingFocusSessions = safeData.focusThisWeek?.contactThisWeek?.upcomingSessions || [];
  const assignmentsDueThisWeek = safeData.focusThisWeek?.assignmentsDueThisWeek || [];

  upcomingFocusSessions.forEach((s: any, idx: number) => {
    focusThisWeek.push({
      id: `fs-${idx}`, type: "purple", title: s.title || "Upcoming Session", 
      date: s.date || "TBD", time: s.time || "TBD", badgeText: "Today", badgeClasses: "bg-[#7B42F6] text-white", icon: "/images/video-chat.svg" 
    });
  });

  assignmentsDueThisWeek.forEach((a: any, idx: number) => {
    focusThisWeek.push({
      id: `fa-${idx}`, type: "green", title: a.title || "Pending Assignment", 
      date: `Due on: ${a.dueDate || "TBD"}`, time: null, badgeText: "Due Soon", badgeClasses: "bg-[#FFF4E5] text-[#F58220] border border-[#FFE0B2]", icon: "/images/file-edit.svg" 
    });
  });

  // 2. Upcoming Sessions Logic
  const upcomingSessions = (safeData.upcomingSessions || []).map((s: any, i: number) => {
    const themes = ['purple', 'teal', 'orange'];
    return {
      id: s.id || i, title: s.title || "Upcoming Session", date: s.date || "TBD", time: s.time || "TBD", theme: themes[i % themes.length]
    };
  });

  // 3. Pending Assignments Logic
  const pendingAssignments = (safeData.pendingAssignments || []).map((a: any, i: number) => ({
    id: a.id || i, title: a.title || "Pending Assignment", subtitle: a.sessionName || "Assignment", due: a.dueDate || "TBD"
  }));

  // 4. Feedbacks Logic
  const feedbacks = (safeData.feedbacks || []).map((f: any, i: number) => ({
    id: f.id || i, doctor: f.mentorName || "Mentor", subject: f.sessionName || "Feedback", text: f.comment || "No feedback provided."
  }));

  // --- DASHBOARD DISPLAY LOGIC ---
  // Only show the empty state if ALL sections are completely empty
  const isActuallyEmpty = (
    (!userInfo.totalEnrolledCourses || userInfo.totalEnrolledCourses === 0) && 
    focusThisWeek.length === 0 &&
    upcomingSessions.length === 0 &&
    pendingAssignments.length === 0
  );

  const isCompleted = (userInfo.totalCertificates > 0);
  const ringProgress = isActuallyEmpty ? 0 : (isCompleted ? 100 : (userInfo.progress?.percentage || 25));

  const userName = userInfo.name?.split(" ")[0] || "Student";
  const courseName = userInfo.enrolledCourses?.[0]?.title || "your courses";

  const bannerTitle = isActuallyEmpty ? `Welcome ${userName} 👋🏼` : `Welcome ${userName}. You're on track...`;
  const bannerSubtitle = isActuallyEmpty 
    ? "Get your journey started with you with the varieties of sessions in Yetzu."
    : `You're making great progress in your <span class="font-semibold text-gray-700">${courseName}</span> journey. Keep the momentum going!`;

  const trackerSteps = [
    { id: 1, label: "Signed up!", icon: "/images/shake-hand.svg", active: true },
    { id: 2, label: "Sessions", icon: "/images/calander.svg", active: upcomingSessions.length > 0 || focusThisWeek.length > 0 },
    { id: 3, label: "Assignments", icon: "/images/assignment.svg", active: pendingAssignments.length > 0 },
    { id: 4, label: isCompleted ? "Completed" : "Certifications", icon: isCompleted ? "/images/flag.svg" : "/images/certificate.svg", active: isCompleted }
  ];
  return (
    <div className="bg-white md:bg-transparent">
      <main className="md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto flex flex-col gap-5 md:bg-gray-50 min-h-screen overflow-x-hidden pb-24 lg:pb-8">
      
        {/* =========================================
            1. DYNAMIC TOP BANNER 
            ========================================= */}
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between bg-white md:border md:border-gray-100 shadow-sm rounded-none md:rounded-2xl p-6 md:p-6 gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-50 via-transparent to-transparent pointer-events-none"></div>
          <img 
            src="/images/clip-path.svg" 
            alt="Background pattern" 
            className="absolute left-[15%] top-1/2 -translate-y-1/2 h-[150%] min-w-[300px] object-cover pointer-events-none z-0 opacity-70" 
          />

          {/* --- Avatar and Text --- */}
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-5 z-10 w-full xl:w-auto text-left">
            <div 
              className={`relative rounded-full flex items-center justify-center shrink-0 ${isActuallyEmpty ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px]' : 'w-[72px] h-[72px] xl:w-[76px] xl:h-[76px]'}`}
              style={{ background: ringProgress > 0 ? `conic-gradient(#042BFD ${ringProgress}%, #f3f4f6 ${ringProgress}%)` : 'transparent' }}
            >
              <div className={`rounded-full overflow-hidden bg-white ${ringProgress > 0 ? 'w-[64px] h-[64px] xl:w-[68px] xl:h-[68px] border-[3px] border-white' : 'w-full h-full'}`}>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 mt-1 xl:mt-0">
              <h1 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-tight mb-1.5">{bannerTitle}</h1>
              <p className="text-[13px] md:text-[14px] text-gray-500 max-w-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: bannerSubtitle }} />
            </div>
          </div>

          {!isActuallyEmpty && (
            <>
              {/* Tracker: DESKTOP VIEW */}
              <div className="hidden xl:flex items-center justify-end overflow-x-auto w-auto pb-0 z-10 no-scrollbar">
                {trackerSteps.map((step, index) => {
                  const isLast = index === trackerSteps.length - 1;
                  return (
                    <React.Fragment key={`desktop-${step.id}`}>
                      <div className={`flex flex-col items-center gap-1.5 shrink-0 transition-opacity ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="w-8 h-8 flex items-center justify-center">
                          <img src={step.icon} alt={step.label} className="max-w-full max-h-full object-contain drop-shadow-sm" />
                        </div>
                        <span className={`text-[12px] font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                      </div>
                      {!isLast && (
                        index === 0 ? (
                          <div className="w-16 h-[4px] bg-gray-200 rounded-full mb-6 mx-3 shrink-0 relative flex items-center">
                            <div className="w-[60%] h-full rounded-full bg-[#10B981]"></div>
                            <div className="absolute left-[60%] w-2.5 h-2.5 bg-[#10B981] rounded-full -ml-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                          </div>
                        ) : (
                          <div className="w-8 h-[2px] border-t-2 border-dashed border-gray-300 mb-6 mx-3 shrink-0 opacity-50"></div>
                        )
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Tracker: MOBILE VIEW */}
              <div className="flex xl:hidden w-full justify-between items-end z-10 mt-3 gap-1.5">
                {trackerSteps.map((step, index) => {
                  let fillWidth = "w-0";
                  if (index === 0) fillWidth = "w-full"; 
                  else if (index === 1 && step.active) fillWidth = isCompleted ? "w-full" : "w-[40%]"; 
                  else if (index > 1 && step.active) fillWidth = "w-full"; 

                  return (
                    <div key={`mobile-${step.id}`} className="flex flex-col items-center flex-1 gap-2.5 overflow-hidden">
                      <div className={`transition-opacity flex flex-col items-center gap-1.5 ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="h-8 flex items-end justify-center">
                          <img src={step.icon} alt={step.label} className="max-h-full object-contain drop-shadow-sm" />
                        </div>
                        <span className={`text-[11px] font-medium whitespace-nowrap ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.label}
                        </span>
                      </div>
                      <div className="w-[85%] h-[4px] bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-[#22C55E] rounded-full transition-all duration-500 ${fillWidth}`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* =========================================
            2. EMPTY STATE VIEW (Exact block requested)
            ========================================= */}
        {isActuallyEmpty && (
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
        )}

        {/* =========================================
            3. POPULATED DASHBOARD VIEW 
            ========================================= */}
        {!isActuallyEmpty && (
          <>
            {/* Focus For This Week */}
            <div className="md:border md:border-gray-100 md:shadow-sm md:rounded-2xl px-0 py-2 md:p-6 bg-white w-full overflow-hidden">
              <div className="flex justify-between items-center mb-4 px-4 md:px-0">
                <h2 className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">FOCUS FOR THIS WEEK</h2>
                <div className="hidden md:flex gap-2 shrink-0">
                  <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400 transition-colors"><ChevronLeft size={16} /></button>
                  <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"><ChevronRight size={16} /></button>
                </div>
              </div>

              {focusThisWeek.length > 0 ? (
                // MOBILE HORIZONTAL SCROLL | DESKTOP GRID
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-4 px-4 md:px-0 gap-4 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {focusThisWeek.map((item: any) => {
                    const theme = getFocusCardTheme(item.type);
                    return (
                      <div key={item.id} className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.border} flex flex-col min-h-[260px] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`}>
                        <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} via-white to-white pointer-events-none z-0`}></div>
                          
                          <div className="absolute top-5 left-5 z-10">
                            <img src={item.icon} alt="Icon" className="w-[68px] h-[68px]" />
                          </div>

                          {item.badgeText && (
                            <div className="flex justify-end mb-8 relative z-20">
                              <span className={`${item.badgeClasses} text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0`}>
                                {item.badgeText}
                              </span>
                            </div>
                          )}

                          <div className={`relative z-20 flex-1 flex flex-col h-full justify-end ${!item.badgeText ? 'mt-18' : 'mt-3'}`}>
                            <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">{item.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
                              <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> {item.date}</span>
                              {item.time && <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> {item.time}</span>}
                            </div>
                            <ViewDetailsButton variant={theme.btn} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[14px] text-gray-500 py-4 px-4 md:px-0">No specific focus items for this week.</p>
              )}
            </div>
            
            {/* Bottom Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-4 w-full">
              
              {/* Upcoming Sessions */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">UPCOMING SESSIONS</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{upcomingSessions.length}</span>
                </div>
                
                {/* MOBILE HORIZONTAL SCROLL | DESKTOP VERTICAL STACK */}
                <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {upcomingSessions.length > 0 ? upcomingSessions.map((session : any) => {
                    const theme = getUpcomingTheme(session.theme);
                    return (
                      <div key={session.id} className={`border ${theme.border} rounded-xl p-1 overflow-hidden flex flex-col ${theme.background} shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none`}>
                        <div className="p-4 bg-white rounded-xl flex-1">
                          <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{session.title}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                              <Calendar size={14} className="shrink-0 text-gray-400" /> {session.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                              <Clock size={14} className="shrink-0 text-gray-400" /> {session.time}
                            </span>
                          </div>
                        </div>
                        <button className={`w-full ${theme.btnBg} ${theme.btnText} text-[14px] font-medium py-3 transition-colors shrink-0`}>
                          View Details
                        </button>
                      </div>
                    );
                  }) : (
                    <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No upcoming sessions.</p>
                  )}
                </div>
              </div>

              {/* Pending Assignments */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">PENDING ASSIGNMENTS</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingAssignments.length}</span>
                </div>
                
                {/* MOBILE HORIZONTAL SCROLL | DESKTOP VERTICAL STACK */}
                <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {pendingAssignments.length > 0 ? pendingAssignments.map((assignment :any ) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-xl overflow-hidden flex p-1 bg-[#F5F6FF] flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none">
                      <div className="p-4 bg-white rounded-xl mb-2 flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{assignment.title}</h3>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white">
                            <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{assignment.subtitle}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg whitespace-nowrap w-fit">
                            <Calendar size={14} className="text-gray-400 shrink-0" /> Due on: {assignment.due}
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
                        Open Workspace
                      </button>
                    </div>
                  )) : (
                    <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No pending assignments.</p>
                  )}
                </div>
              </div>

              {/* Feedbacks */}
              <div className="md:border md:border-gray-100 bg-white md:rounded-2xl py-2 md:p-5 md:shadow-sm overflow-hidden md:col-span-2 xl:col-span-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
                  <h2 className="text-[12px] md:text-xs font-bold text-gray-700 uppercase tracking-wider">FEEDBACKS</h2>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{feedbacks.length}</span>
                </div>

                {/* MOBILE HORIZONTAL SCROLL | DESKTOP VERTICAL STACK */}
                <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex-col md:space-y-4 flex-1 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {feedbacks.length > 0 ? feedbacks.map((feedback :any) => (
                    <div key={feedback.id} className="border border-gray-200 rounded-xl p-1 overflow-hidden flex flex-col bg-[#F5F6FF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-w-[280px] w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center md:snap-align-none">
                      <div className="p-4 bg-white rounded-xl flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-4">{feedback.doctor}</h3>
                        <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white mb-3">
                          <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feedback.subject}</span>
                        </div>
                        <div className="bg-[#F6F8FA] p-3 rounded-lg text-[13px] text-gray-700 italic leading-relaxed line-clamp-3">
                          {feedback.text}
                        </div>
                      </div>
                      <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
                        View Details
                      </button>
                    </div>
                  )) : (
                    <p className="text-[14px] text-gray-500 w-full text-center px-4 md:px-0">No new feedback.</p>
                  )}
                </div>
              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
}