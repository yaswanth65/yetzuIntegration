// "use client";

// import useSession from "@/hooks/useSession";
// import { 
//   Bell, 
//   Menu, 
//   Search, 
//   ChevronDown, 
//   User, 
//   Mail, 
//   Phone, 
//   Edit2, 
//   FastForward, 
//   CreditCard, 
//   Globe,
//   Video,
//   FileText,
//   Calendar,
//   Award,
//   CheckCircle2,
//   Send
// } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { StudentAPI } from "@/lib/api"; 
// import Link from "next/link";
// import Image from "next/image";

// interface DashNavbarProps {
//   role: string | null;
//   onMenuClick: () => void;
//   onChatToggle: () => void;
//   isChatActive: boolean;
//   onNotificationToggle: () => void;
//   isNotificationActive: boolean;
// }

// export default function DashNavbar({
//   onMenuClick,
//   onChatToggle,
//   isChatActive,
//   onNotificationToggle,
// }: DashNavbarProps) {
//   const { user: sessionUser } = useSession();
  
// const profileRef = useRef<HTMLDivElement>(null);
// const notifRef = useRef<HTMLDivElement>(null);

// // --- Refs for swipe-to-close (notif sheet) ---
// const notifSheetRef = useRef<HTMLDivElement>(null);
// const notifTouchStartY = useRef(0);
// const notifCurrentTranslate = useRef(0);
// const notifIsDragging = useRef(false);

//   // Profile & UI States
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<"personal" | "payment">("personal");
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
  
//   // API Data States
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
  
//   const [autoPayout, setAutoPayout] = useState(true);
//   const [notifyPayments, setNotifyPayments] = useState(false);
  
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: ""
//   });

//   const [paymentData, setPaymentData] = useState({
//     cardNumber: "9978 1128 1558 1978",
//     cardHolder: "",
//     country: "United Kingdom"
//   });

//   const profileRef = useRef<HTMLDivElement>(null);
//   const notifRef = useRef<HTMLDivElement>(null);

//   // Touch handlers for mobile swipe-to-close
//   const [touchY, setTouchY] = useState(0);
//   const [touchEndY, setTouchEndY] = useState(0);

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchY(e.touches[0].clientY);
//     setTouchEndY(e.touches[0].clientY);
//   };
//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEndY(e.touches[0].clientY);
//   };
//   const handleTouchEndNotif = () => {
//     if (touchEndY > touchY + 50) setIsNotifOpen(false); // Swiped down
//   };
//   const handleTouchEndProfile = () => {
//     if (touchEndY > touchY + 50) {
//       setIsProfileOpen(false);
//       setIsEditing(false);
//     }
//   };

//   // --- 1. FETCH API DATA ON MOUNT ---
//   useEffect(() => {
//     const fetchNavbarData = async () => {
//       try {
//         const token = localStorage.getItem("token") ||  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGIwYWE1My1mNzlhLTQxZDUtODdmZi05YTM3NGJmOWZjNmYiLCJlbWFpbCI6ImFiaGlyYW10ZW1wQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzczNTcyOTM4LCJleHAiOjE3NzM2MTYxMzh9.3MdH1osbDpAVbSrj7PNOp35Fvp1v-JnsgJ0L-4fN9TI";
//         const userId = localStorage.getItem("userId") || "b8b0aa53-f79a-41d5-87ff-9a374bf9fc6f";

//         if (token && userId) {
//           const overviewRes = await StudentAPI.getOverview(token, userId);
//           if (overviewRes?.success && overviewRes?.data?.userInfo) {
//             const userInfo = overviewRes.data.userInfo;
//             setFormData({
//               fullName: userInfo.name || "",
//               email: userInfo.email || "",
//               phone: userInfo.mobileno || ""
//             });
//             setPaymentData(prev => ({ ...prev, cardHolder: userInfo.name || "" }));
//           }

//           const notifRes = await StudentAPI.getNotifications(token, userId);
//           if (notifRes?.success) {
//             setNotifications(notifRes.data.notifications || []);
//             setUnreadCount(notifRes.data.summary?.newMessages || 0);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch navbar data:", error);
//       }
//     };

//     fetchNavbarData();
//   }, []);

//   // --- 2. HANDLE EDIT PROFILE SUBMISSION ---
//   const handleSaveProfile = async () => {
//     setIsSaving(true);
//     try {
//       const token = localStorage.getItem("token") || "";
//       const userId = localStorage.getItem("userId") || "";

//       const response = await StudentAPI.editProfile(token, userId, {
//         name: formData.fullName,
//         email: formData.email,
//         mobileno: formData.phone
//       });

//       if (response.success) {
//         setIsEditing(false); 
//       } else {
//         console.error("Failed to update profile details:", response.message);
//       }
//     } catch (error) {
//       console.error("Error saving profile:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Close Modals on click outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setIsProfileOpen(false);
//         setIsEditing(false);
//       }
//       if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
//         setIsNotifOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const markAllAsRead = () => {
//     setUnreadCount(0);
//     const updatedNotifications = notifications.map(n => ({ ...n, unread: false }));
//     setNotifications(updatedNotifications);
//   };

//   const displayAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName || sessionUser?.name || 'Student')}&background=random`;

//   return (
//     <nav className="bg-white border-b border-gray-100 h-20 fixed w-full top-0 z-40 lg:pl-64 transition-all duration-300">
//       <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
//         {/* --- LEFT: MENU & MOBILE LOGO --- */}
//         <div className="flex items-center flex-1 max-w-md gap-3">
          
          
//           {/* Mobile Logo View */}
//           <div className="lg:hidden flex items-center">
//           <Link href="/" className="flex items-center">
//                         {/* Assuming you have a dark blue logo for the sidebar */}
//                         <Image
//                              src="/images/Logo.png"
//                             alt="Yetzu Logo"
//                              width={120}
//                              height={30}
//                              className="object-contain"
//                          />
//                     </Link>
//           </div>
//         </div>

//         {/* --- RIGHT: NOTIFICATIONS, CHAT & PROFILE --- */}
//         <div className="flex items-center gap-2 sm:gap-4 relative">
          
//           {/* Notifications Container */}
//           <div className="relative" ref={notifRef}>
            
//             {/* Mobile Backdrop Overlay */}
//             {isNotifOpen && (
//               <div className="fixed inset-0 bg-black/20 z-[45] sm:hidden" onClick={() => setIsNotifOpen(false)} />
//             )}

//             <button
//               onClick={() => {
//                 setIsNotifOpen(!isNotifOpen);
//                 setIsProfileOpen(false);
//                 onNotificationToggle();
//               }}
//               className={`p-2 rounded-xl border transition-colors relative ${
//                 isNotifOpen ? 'bg-gray-50 border-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-50 border-gray-100'
//               }`}
//             >
//               <Bell className="h-5 w-5" strokeWidth={1.5} />
//               {unreadCount > 0 && (
//                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#042BFD] rounded-full border border-white"></span>
//               )}
//             </button>

//             {/* Notifications Modal (Responsive: Bottom Sheet on Mobile, Dropdown on Desktop) */}
//             {isNotifOpen && (
//               <div 
//                 className="fixed bottom-0 left-0 w-full sm:absolute sm:top-[calc(100%+12px)] sm:bottom-auto sm:left-auto sm:right-0 sm:w-[380px] md:w-[420px] bg-white rounded-t-[24px] sm:rounded-[20px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden cursor-default animate-in slide-in-from-bottom-full sm:slide-in-from-top-2 fade-in duration-300"
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEndNotif}
//               >
//                 {/* Mobile Drag Handle */}
//                 <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

//                 {/* Modal Header */}
//                 <div className="flex items-center justify-between p-5 border-b border-gray-100">
//                   <div className="flex items-center gap-2.5">
//                     <h2 className="text-[16px] font-bold text-gray-900">Notifications</h2>
//                     {unreadCount > 0 && (
//                       <span className="bg-[#E0E7FF] text-[#4F39F6] text-[11px] font-bold px-2 py-0.5 rounded-full">
//                         {unreadCount} new
//                       </span>
//                     )}
//                   </div>
//                   {unreadCount > 0 && (
//                     <button 
//                       onClick={markAllAsRead}
//                       className="text-[12px] font-semibold text-[#042BFD] hover:text-blue-800 transition-colors"
//                     >
//                       Mark all as read
//                     </button>
//                   )}
//                 </div>

//                 {/* Modal Body */}
//                 <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto custom-scrollbar pb-6 sm:pb-2">
//                   {notifications.length > 0 ? (
//                     <div className="flex flex-col">
//                       {notifications.map((notif, idx) => (
//                         <div key={notif.id || idx} className="flex items-start gap-4 p-4 sm:p-3 hover:bg-gray-50/80 transition-colors border-b border-gray-50 cursor-pointer">
                          
//                           <div className={`w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-[#E0E7FF] text-[#4F39F6]' : 'bg-[#F8FAFC] text-gray-500'}`}>
//                             <Bell size={18} className="sm:w-4 sm:h-4" strokeWidth={1.5} />
//                           </div>
                          
//                           <div className="flex-1 min-w-0 pr-2">
//                             <h4 className={`text-[14px] sm:text-[13px] mb-1 leading-snug ${notif.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
//                               {notif.title || "Notification"}
//                             </h4>
//                             <p className="text-[13px] sm:text-[12px] text-gray-500 mb-2 truncate">
//                               {notif.subtitle || notif.message}
//                             </p>
//                             <p className="text-[12px] sm:text-[11px] text-gray-400 font-medium">
//                               {notif.time || notif.createdAt || "Just now"}
//                             </p>
//                           </div>
                          
//                           <div className="w-2 pt-1.5 shrink-0 flex justify-center">
//                             {notif.unread && <div className="w-[7px] h-[7px] bg-[#042BFD] rounded-full"></div>}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
//                       <div className="w-12 h-12 rounded-full bg-[#EBF0FF] text-[#042BFD] flex items-center justify-center mb-5">
//                         <CheckCircle2 size={24} strokeWidth={1.5} />
//                       </div>
//                       <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">
//                         You're all caught up 🎉
//                       </h3>
//                       <p className="text-[13px] text-gray-500">
//                         We'll notify you when something new happens.
//                       </p>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             )}
//           </div>

//           {/* Send / Chat Toggle Button */}
//           <Link
//             // onClick={onChatToggle}
//             href={'/s/chat'}
//             className={`p-2 rounded-xl border transition-colors ${
//               isChatActive ? 'bg-gray-50 border-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-50 border-gray-100'
//             }`}
//           >
//             <Send className="h-5 w-5" strokeWidth={1.5} />
//           </Link>

//           <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

//           {/* Profile Dropdown Container */}
//           <div className="relative" ref={profileRef}>
            
//             {/* Mobile Backdrop Overlay */}
//             {isProfileOpen && (
//               <div className="fixed inset-0 bg-black/20 z-[45] sm:hidden" onClick={() => setIsProfileOpen(false)} />
//             )}

//             <div 
//               className="flex items-center gap-2.5 group cursor-pointer select-none"
//               onClick={() => {
//                 setIsProfileOpen(!isProfileOpen);
//                 setIsNotifOpen(false);
//               }}
//             >
//               <div 
//                 className="h-9 w-9 rounded-full bg-cover bg-center border border-gray-100 shrink-0"
//                 style={{ backgroundImage: `url(${displayAvatarUrl})` }}
//               />
//               <div className="hidden sm:block text-left">
//                 <p className="text-[13px] font-semibold text-gray-900 leading-none">
//                   {formData.fullName || "Student"}
//                 </p>
//                 <p className="text-[11px] text-gray-400 mt-1">
//                   {formData.email || "student@example.com"}
//                 </p>
//               </div>
//               <ChevronDown className={`h-4 w-4 text-gray-400 ml-0.5 transition-transform duration-200 hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
//             </div>

//             {/* Profile Modal (Responsive: Bottom Sheet on Mobile, Dropdown on Desktop) */}
//             {isProfileOpen && (
//               <div 
//                 className="fixed bottom-0 left-0 w-full sm:absolute sm:top-[calc(100%+12px)] sm:bottom-auto sm:left-auto sm:right-0 sm:w-[360px] bg-white rounded-t-[24px] sm:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-5 z-50 cursor-default animate-in slide-in-from-bottom-full sm:slide-in-from-top-2 fade-in duration-300 max-h-[85vh] sm:max-h-none overflow-y-auto custom-scrollbar"
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEndProfile}
//               >
//                 {/* Mobile Drag Handle */}
//                 <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 sm:hidden shrink-0" />
                
//                 <div className="flex items-center justify-between mb-5">
//                   <div className="flex items-center gap-3">
//                     <div 
//                       className="h-[48px] w-[48px] rounded-full bg-cover bg-center border border-gray-100 shrink-0"
//                       style={{ backgroundImage: `url(${displayAvatarUrl})` }}
//                     />
//                     <h2 className="text-[18px] font-bold text-gray-900 truncate max-w-[140px]">
//                       {formData.fullName || "Student"}
//                     </h2>
//                   </div>
                  
//                   <div>
//                     {!isEditing ? (
//                       <button 
//                         onClick={() => setIsEditing(true)}
//                         className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-[13px] font-medium transition-colors"
//                       >
//                         <Edit2 size={14} /> Edit
//                       </button>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <button 
//                           onClick={() => setIsEditing(false)}
//                           disabled={isSaving}
//                           className="px-3 py-1.5 bg-white border border-[#042BFD] text-[#042BFD] rounded-lg hover:bg-blue-50 text-[13px] font-medium transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button 
//                           onClick={handleSaveProfile}
//                           disabled={isSaving}
//                           className="px-3 py-1.5 bg-[#042BFD] text-white rounded-lg hover:bg-blue-700 text-[13px] font-medium transition-colors flex items-center justify-center min-w-[56px]"
//                         >
//                           {isSaving ? "Saving..." : "Save"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex border-b border-gray-200 mb-5 relative">
//                   <button
//                     onClick={() => { setActiveTab("personal"); setIsEditing(false); }}
//                     className={`pb-2.5 px-1 text-[13px] font-medium transition-colors relative ${
//                       activeTab === "personal" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     Personal Info
//                     {activeTab === "personal" && (
//                       <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#042BFD]" />
//                     )}
//                   </button>
//                   <button
//                     onClick={() => { setActiveTab("payment"); setIsEditing(false); }}
//                     className={`pb-2.5 px-5 text-[13px] font-medium transition-colors relative ${
//                       activeTab === "payment" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     Payment Info
//                     {activeTab === "payment" && (
//                       <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#042BFD]" />
//                     )}
//                   </button>
//                 </div>

//                 <div className="overflow-hidden pb-4 sm:pb-0">
//                   {activeTab === "personal" ? (
//                     <div className="border border-gray-200 rounded-xl p-1.5 bg-white">
//                       <div className="flex items-center gap-3 p-3 border-b border-gray-100">
//                         <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                           <User size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-[12px] text-gray-400 mb-0.5">Full Name</p>
//                           {isEditing ? (
//                             <input 
//                               type="text" 
//                               value={formData.fullName}
//                               onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                               className="w-full text-[14px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-1 bg-transparent"
//                             />
//                           ) : (
//                             <p className="text-[14px] font-medium text-gray-900">{formData.fullName}</p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3 p-3 border-b border-gray-100">
//                         <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                           <Mail size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-[12px] text-gray-400 mb-0.5">Email</p>
//                           {isEditing ? (
//                             <input 
//                               type="email" 
//                               value={formData.email}
//                               onChange={(e) => setFormData({...formData, email: e.target.value})}
//                               className="w-full text-[14px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-1 bg-transparent"
//                             />
//                           ) : (
//                             <p className="text-[14px] font-medium text-gray-900">{formData.email}</p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3 p-3">
//                         <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                           <Phone size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-[12px] text-gray-400 mb-0.5">Phone Number</p>
//                           {isEditing ? (
//                             <input 
//                               type="tel" 
//                               value={formData.phone}
//                               onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                               className="w-full text-[14px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-1 bg-transparent"
//                             />
//                           ) : (
//                             <p className="text-[14px] font-medium text-gray-900">{formData.phone}</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-2">
//                       <div>
//                         <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">PREFERENCE</h3>
//                         <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                          
//                           <div className="flex items-center justify-between p-3 border-b border-gray-100">
//                             <div className="flex items-center gap-3 pr-4">
//                               <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                                 <FastForward size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                               </div>
//                               <div>
//                                 <p className="text-[13px] font-medium text-gray-900">Enable Auto Payout</p>
//                                 <p className="text-[11px] text-gray-500">Autopayout occurs at the end of each month.</p>
//                               </div>
//                             </div>
                            
//                             {isEditing ? (
//                               <div 
//                                 onClick={() => setAutoPayout(!autoPayout)}
//                                 className={`w-10 h-[22px] rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${autoPayout ? 'bg-[#042BFD]' : 'bg-gray-200'}`}
//                               >
//                                 <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${autoPayout ? 'translate-x-[18px]' : 'translate-x-0'}`} />
//                               </div>
//                             ) : (
//                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center shrink-0 ${
//                                 autoPayout ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F1F5F9] text-[#64748B]'
//                               }`}>
//                                 {autoPayout ? 'ON' : 'OFF'}
//                               </span>
//                             )}
//                           </div>

//                           <div className="flex items-center justify-between p-3">
//                             <div className="flex items-center gap-3 pr-4">
//                               <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                                 <Bell size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                               </div>
//                               <div>
//                                 <p className="text-[13px] font-medium text-gray-900">Notify New Payments</p>
//                                 <p className="text-[11px] text-gray-500">You will be notified when a payment has been made.</p>
//                               </div>
//                             </div>
                            
//                             {isEditing ? (
//                               <div 
//                                 onClick={() => setNotifyPayments(!notifyPayments)}
//                                 className={`w-10 h-[22px] rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${notifyPayments ? 'bg-[#042BFD]' : 'bg-gray-200'}`}
//                               >
//                                 <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${notifyPayments ? 'translate-x-[18px]' : 'translate-x-0'}`} />
//                               </div>
//                             ) : (
//                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center shrink-0 ${
//                                 notifyPayments ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F1F5F9] text-[#64748B]'
//                               }`}>
//                                 {notifyPayments ? 'ON' : 'OFF'}
//                               </span>
//                             )}
//                           </div>

//                         </div>
//                       </div>

//                       <div>
//                         <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">CARD DETAILS</h3>
//                         <div className="border border-gray-200 rounded-xl bg-white overflow-hidden p-1.5">
                          
//                           <div className="flex items-center gap-3 p-2.5 border-b border-gray-100">
//                             <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                               <CreditCard size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-[11px] text-gray-400 mb-0.5">Credit Card</p>
//                               {isEditing ? (
//                                 <input 
//                                   type="text" 
//                                   value={paymentData.cardNumber}
//                                   onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
//                                   className="w-full text-[13px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-0.5 bg-transparent"
//                                 />
//                               ) : (
//                                 <p className="text-[13px] font-medium text-gray-900">{paymentData.cardNumber}</p>
//                               )}
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-3 p-2.5 border-b border-gray-100">
//                             <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                               <User size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-[11px] text-gray-400 mb-0.5">Card Holder</p>
//                               {isEditing ? (
//                                 <input 
//                                   type="text" 
//                                   value={paymentData.cardHolder}
//                                   onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
//                                   className="w-full text-[13px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-0.5 bg-transparent"
//                                 />
//                               ) : (
//                                 <p className="text-[13px] font-medium text-gray-900">{paymentData.cardHolder}</p>
//                               )}
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-3 p-2.5">
//                             <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
//                               <Globe size={18} className="text-[#042BFD]" strokeWidth={1.5} />
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-[11px] text-gray-400 mb-0.5">Country</p>
//                               {isEditing ? (
//                                 <div className="flex items-center gap-1.5 border-b border-gray-300 focus-within:border-[#042BFD] pb-0.5">
//                                   <span>🇬🇧</span>
//                                   <input 
//                                     type="text" 
//                                     value={paymentData.country}
//                                     onChange={(e) => setPaymentData({...paymentData, country: e.target.value})}
//                                     className="w-full text-[13px] font-medium text-gray-900 outline-none bg-transparent"
//                                   />
//                                 </div>
//                               ) : (
//                                 <p className="text-[13px] font-medium text-gray-900 flex items-center gap-1.5">
//                                   <span>🇬🇧</span> {paymentData.country}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
            
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";
import { usePathname } from "next/navigation";
import useSession from "@/hooks/useSession";
import { 
  Bell, 
  Menu, 
  Search, 
  ChevronDown, 
  User, 
  Mail, 
  Phone, 
  Edit2, 
  FastForward, 
  CreditCard, 
  Globe,
  Video,
  FileText,
  Calendar,
  Award,
  CheckCircle2,
  Send
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { StudentAPI } from "@/lib/api"; 
import Link from "next/link";
import Image from "next/image";

interface DashNavbarProps {
  role: string | null;
  onMenuClick: () => void;
  onChatToggle: () => void;
  isChatActive: boolean;
  onNotificationToggle: () => void;
  isNotificationActive: boolean;
}

export default function DashNavbar({
  onMenuClick,
  onChatToggle,
  isChatActive,
  onNotificationToggle,
}: DashNavbarProps) {
  const { user: sessionUser } = useSession();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "payment">("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [autoPayout, setAutoPayout] = useState(true);
  const [notifyPayments, setNotifyPayments] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "9978 1128 1558 1978",
    cardHolder: "",
    country: "United Kingdom"
  });

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // --- Refs for swipe-to-close (notif sheet) ---
  const notifSheetRef = useRef<HTMLDivElement>(null);
  const notifTouchStartY = useRef(0);
  const notifCurrentTranslate = useRef(0);
  const notifIsDragging = useRef(false);

  // --- Refs for swipe-to-close (profile sheet) ---
  const profileSheetRef = useRef<HTMLDivElement>(null);
  const profileTouchStartY = useRef(0);
  const profileCurrentTranslate = useRef(0);
  const profileIsDragging = useRef(false);

  // Reset transforms when sheets open
  useEffect(() => {
    if (isNotifOpen && notifSheetRef.current) {
      notifSheetRef.current.style.transform = "translateY(0)";
      notifSheetRef.current.style.transition = "";
    }
  }, [isNotifOpen]);

  useEffect(() => {
    if (isProfileOpen && profileSheetRef.current) {
      profileSheetRef.current.style.transform = "translateY(0)";
      profileSheetRef.current.style.transition = "";
    }
  }, [isProfileOpen]);

  // ── Notif swipe handlers ──────────────────────────────────────
  const handleNotifTouchStart = (e: React.TouchEvent) => {
    notifTouchStartY.current = e.touches[0].clientY;
    notifCurrentTranslate.current = 0;
    notifIsDragging.current = true;
    if (notifSheetRef.current) notifSheetRef.current.style.transition = "none";
  };

  const handleNotifTouchMove = (e: React.TouchEvent) => {
    if (!notifIsDragging.current) return;
    const delta = e.touches[0].clientY - notifTouchStartY.current;
    if (delta < 0) return; // block upward drag
    notifCurrentTranslate.current = delta;
    if (notifSheetRef.current) {
      notifSheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleNotifTouchEnd = () => {
    notifIsDragging.current = false;
    if (notifCurrentTranslate.current > 100) {
      if (notifSheetRef.current) {
        notifSheetRef.current.style.transition = "transform 0.3s ease";
        notifSheetRef.current.style.transform = "translateY(100%)";
      }
      setTimeout(() => setIsNotifOpen(false), 280);
    } else {
      if (notifSheetRef.current) {
        notifSheetRef.current.style.transition = "transform 0.3s ease";
        notifSheetRef.current.style.transform = "translateY(0)";
      }
    }
    notifCurrentTranslate.current = 0;
  };

  // ── Profile swipe handlers ────────────────────────────────────
  const handleProfileTouchStart = (e: React.TouchEvent) => {
    profileTouchStartY.current = e.touches[0].clientY;
    profileCurrentTranslate.current = 0;
    profileIsDragging.current = true;
    if (profileSheetRef.current) profileSheetRef.current.style.transition = "none";
  };

  const handleProfileTouchMove = (e: React.TouchEvent) => {
    if (!profileIsDragging.current) return;
    const delta = e.touches[0].clientY - profileTouchStartY.current;
    if (delta < 0) return;
    profileCurrentTranslate.current = delta;
    if (profileSheetRef.current) {
      profileSheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleProfileTouchEnd = () => {
    profileIsDragging.current = false;
    if (profileCurrentTranslate.current > 100) {
      if (profileSheetRef.current) {
        profileSheetRef.current.style.transition = "transform 0.3s ease";
        profileSheetRef.current.style.transform = "translateY(100%)";
      }
      setTimeout(() => {
        setIsProfileOpen(false);
        setIsEditing(false);
      }, 280);
    } else {
      if (profileSheetRef.current) {
        profileSheetRef.current.style.transition = "transform 0.3s ease";
        profileSheetRef.current.style.transform = "translateY(0)";
      }
    }
    profileCurrentTranslate.current = 0;
  };

  // ── Fetch data on mount ───────────────────────────────────────
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGIwYWE1My1mNzlhLTQxZDUtODdmZi05YTM3NGJmOWZjNmYiLCJlbWFpbCI6ImFiaGlyYW10ZW1wQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzczNTcyOTM4LCJleHAiOjE3NzM2MTYxMzh9.3MdH1osbDpAVbSrj7PNOp35Fvp1v-JnsgJ0L-4fN9TI";
        const userId = localStorage.getItem("userId") || "b8b0aa53-f79a-41d5-87ff-9a374bf9fc6f";

        if (token && userId) {
          const overviewRes = await StudentAPI.getOverview( );
          if (overviewRes?.success && overviewRes?.data?.userInfo) {
            const userInfo = overviewRes.data.userInfo;
            setFormData({
              fullName: userInfo.name || "",
              email: userInfo.email || "",
              phone: userInfo.mobileno || ""
            });
            setPaymentData(prev => ({ ...prev, cardHolder: userInfo.name || "" }));
          }

          const notifRes = await StudentAPI.getNotifications( );
          if (notifRes?.success) {
            setNotifications(notifRes.data.notifications || []);
            setUnreadCount(notifRes.data.summary?.newMessages || 0);
          }
        }
      } catch (error) {
        console.error("Failed to fetch navbar data:", error);
      }
    };
    fetchNavbarData();
  }, []);

  // ── Save profile ──────────────────────────────────────────────
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token") || "";
      const userId = localStorage.getItem("userId") || "";
      const response = await StudentAPI.editProfile(  {
        name: formData.fullName,
        email: formData.email,
        mobileno: formData.phone
      });
      if (response.success) setIsEditing(false);
      else console.error("Failed to update profile details:", response.message);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Click outside to close ────────────────────────────────────
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setIsEditing(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const displayAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName || sessionUser?.name || 'Student')}&background=random`;

  return (
    <nav className="bg-white border-b border-gray-100 h-20 fixed w-full top-0 z-40 lg:pl-64 transition-all duration-300">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LEFT: Mobile Logo */}
        <div className="flex items-center flex-1 max-w-md gap-3">
          <div className="lg:hidden flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Logo.png"
                alt="Yetzu Logo"
                width={120}
                height={30}
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* RIGHT: Notifications, Chat, Profile */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          
          {/* ── Notifications ── */}
          <div className="relative" ref={notifRef}>
            
            {/* Mobile backdrop */}
            {isNotifOpen && (
              <div
                className="fixed inset-0 bg-black/20 z-[45] sm:hidden"
                onClick={() => setIsNotifOpen(false)}
              />
            )}

            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
                onNotificationToggle();
              }}
              className={`p-2 rounded-xl border transition-colors relative ${
                isNotifOpen
                  ? "bg-gray-50 border-gray-200 text-gray-700"
                  : "text-gray-500 hover:bg-gray-50 border-gray-100"
              }`}
            >
              <Bell className="h-5 w-5" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#042BFD] rounded-full border border-white" />
              )}
            </button>

            {isNotifOpen && (
              <div
                ref={notifSheetRef}
                className="fixed bottom-0 left-0 w-full sm:absolute sm:top-[calc(100%+12px)] sm:bottom-auto sm:left-auto sm:right-0 sm:w-[380px] md:w-[420px] bg-white rounded-t-[24px] sm:rounded-[20px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden cursor-default animate-in slide-in-from-bottom-full sm:slide-in-from-top-2 fade-in duration-300"
                onTouchStart={handleNotifTouchStart}
                onTouchMove={handleNotifTouchMove}
                onTouchEnd={handleNotifTouchEnd}
              >
                {/* Drag handle — mobile only */}
                <div className="flex justify-center pt-3 pb-1 sm:hidden touch-none">
                  <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    {/* Major heading → font-semibold */}
                    <h2 className="text-[16px] font-semibold text-gray-900">Notifications</h2>
                    {unreadCount > 0 && (
                      <span className="bg-[#E0E7FF] text-[#4F39F6] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[12px] font-medium text-[#042BFD] hover:text-blue-800 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Body */}
                <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto custom-scrollbar pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-2">
                  {notifications.length > 0 ? (
                    <div className="flex flex-col">
                      {notifications.map((notif, idx) => (
                        <div
                          key={notif.id || idx}
                          className="flex items-start gap-4 px-5 py-4 sm:px-4 sm:py-3 hover:bg-gray-50/80 transition-colors border-b border-gray-50 cursor-pointer"
                        >
                          <div className={`w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? "bg-[#E0E7FF] text-[#4F39F6]" : "bg-[#F8FAFC] text-gray-400"}`}>
                            <Bell size={17} strokeWidth={1.5} />
                          </div>

                          <div className="flex-1 min-w-0 pr-2">
                            {/* Moderate heading → font-medium */}
                            <h4 className={`text-[14px] sm:text-[13px] leading-snug mb-0.5 ${notif.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                              {notif.title || "Notification"}
                            </h4>
                            {/* Body → normal weight */}
                            <p className="text-[13px] sm:text-[12px] text-gray-500 mb-1.5 truncate font-normal">
                              {notif.subtitle || notif.message}
                            </p>
                            <p className="text-[11px] text-gray-400 font-normal">
                              {notif.time || notif.createdAt || "Just now"}
                            </p>
                          </div>

                          <div className="w-2 pt-1.5 shrink-0 flex justify-center">
                            {notif.unread && (
                              <div className="w-[7px] h-[7px] bg-[#042BFD] rounded-full" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#EBF0FF] text-[#042BFD] flex items-center justify-center mb-4">
                        <CheckCircle2 size={24} strokeWidth={1.5} />
                      </div>
                      {/* Major heading → font-semibold */}
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">
                        You're all caught up 🎉
                      </h3>
                      <p className="text-[13px] text-gray-500 font-normal">
                        We'll notify you when something new happens.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Chat ── */}
        
          <Link
            href="/s/chat"
            className={`p-2 rounded-xl border transition-colors ${
              isChatActive || pathname?.includes("/s/chat")
                ? "bg-white border-[#042BFD] text-[#042BFD]"
                : "text-gray-500 hover:bg-gray-50 border-gray-100"
            }`}
          >
            <Send className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block" />

          {/* ── Profile ── */}
          <div className="relative" ref={profileRef}>

            {isProfileOpen && (
              <div
                className="fixed inset-0 bg-black/20 z-[45] sm:hidden"
                onClick={() => setIsProfileOpen(false)}
              />
            )}

            <div
              className="flex items-center gap-2.5 cursor-pointer select-none"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
            >
              <div
                className="h-9 w-9 rounded-full bg-cover bg-center border border-gray-100 shrink-0"
                style={{ backgroundImage: `url(${displayAvatarUrl})` }}
              />
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-semibold text-gray-900 leading-none">
                  {formData.fullName || "Student"}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 font-normal">
                  {formData.email || "student@example.com"}
                </p>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 ml-0.5 transition-transform duration-200 hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`} />
            </div>

            {isProfileOpen && (
              <div
                ref={profileSheetRef}
                className="fixed bottom-0 left-0 w-full sm:absolute sm:top-[calc(100%+12px)] sm:bottom-auto sm:left-auto sm:right-0 sm:w-[360px] bg-white rounded-t-[24px] sm:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-5 z-50 cursor-default animate-in slide-in-from-bottom-full sm:slide-in-from-top-2 fade-in duration-300 max-h-[85vh] sm:max-h-none overflow-y-auto custom-scrollbar"
                onTouchStart={handleProfileTouchStart}
                onTouchMove={handleProfileTouchMove}
                onTouchEnd={handleProfileTouchEnd}
              >
                {/* Drag handle */}
                <div className="flex justify-center mb-4 sm:hidden touch-none">
                  <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-[48px] w-[48px] rounded-full bg-cover bg-center border border-gray-100 shrink-0"
                      style={{ backgroundImage: `url(${displayAvatarUrl})` }}
                    />
                    {/* Major heading → font-semibold */}
                    <h2 className="text-[18px] font-semibold text-gray-900 truncate max-w-[140px]">
                      {formData.fullName || "Student"}
                    </h2>
                  </div>

                  <div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-[13px] font-medium transition-colors"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          disabled={isSaving}
                          className="px-3 py-1.5 bg-white border border-[#042BFD] text-[#042BFD] rounded-lg hover:bg-blue-50 text-[13px] font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="px-3 py-1.5 bg-[#042BFD] text-white rounded-lg hover:bg-blue-700 text-[13px] font-medium transition-colors flex items-center justify-center min-w-[56px]"
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-5 relative">
                  <button
                    onClick={() => { setActiveTab("personal"); setIsEditing(false); }}
                    className={`pb-2.5 px-1 text-[13px] transition-colors relative ${
                      activeTab === "personal" ? "font-semibold text-gray-900" : "font-medium text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Personal Info
                    {activeTab === "personal" && (
                      <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#042BFD]" />
                    )}
                  </button>
                  <button
                    onClick={() => { setActiveTab("payment"); setIsEditing(false); }}
                    className={`pb-2.5 px-5 text-[13px] transition-colors relative ${
                      activeTab === "payment" ? "font-semibold text-gray-900" : "font-medium text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Payment Info
                    {activeTab === "payment" && (
                      <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#042BFD]" />
                    )}
                  </button>
                </div>

                <div className="overflow-hidden pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-0">
                  {activeTab === "personal" ? (
                    <div className="border border-gray-200 rounded-xl p-1.5 bg-white">
                      {[
                        { icon: <User size={18} className="text-[#042BFD]" strokeWidth={1.5} />, label: "Full Name", field: "fullName" as const, type: "text" },
                        { icon: <Mail size={18} className="text-[#042BFD]" strokeWidth={1.5} />, label: "Email", field: "email" as const, type: "email" },
                        { icon: <Phone size={18} className="text-[#042BFD]" strokeWidth={1.5} />, label: "Phone Number", field: "phone" as const, type: "tel" },
                      ].map((item, idx, arr) => (
                        <div key={item.field} className={`flex items-center gap-3 p-3 ${idx < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                          <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            {/* Label → normal */}
                            <p className="text-[12px] text-gray-400 mb-0.5 font-normal">{item.label}</p>
                            {isEditing ? (
                              <input
                                type={item.type}
                                value={formData[item.field]}
                                onChange={(e) => setFormData({ ...formData, [item.field]: e.target.value })}
                                className="w-full text-[14px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-1 bg-transparent"
                              />
                            ) : (
                              <p className="text-[14px] font-medium text-gray-900">{formData[item.field]}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">PREFERENCE</h3>
                        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                          {[
                            {
                              icon: <FastForward size={18} className="text-[#042BFD]" strokeWidth={1.5} />,
                              label: "Enable Auto Payout",
                              sub: "Autopayout occurs at the end of each month.",
                              value: autoPayout,
                              toggle: () => setAutoPayout(!autoPayout),
                            },
                            {
                              icon: <Bell size={18} className="text-[#042BFD]" strokeWidth={1.5} />,
                              label: "Notify New Payments",
                              sub: "You will be notified when a payment has been made.",
                              value: notifyPayments,
                              toggle: () => setNotifyPayments(!notifyPayments),
                            },
                          ].map((item, idx, arr) => (
                            <div key={item.label} className={`flex items-center justify-between p-3 ${idx < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                              <div className="flex items-center gap-3 pr-4">
                                <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                                  {item.icon}
                                </div>
                                <div>
                                  <p className="text-[13px] font-medium text-gray-900">{item.label}</p>
                                  <p className="text-[11px] text-gray-500 font-normal">{item.sub}</p>
                                </div>
                              </div>
                              {isEditing ? (
                                <div
                                  onClick={item.toggle}
                                  className={`w-10 h-[22px] rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${item.value ? "bg-[#042BFD]" : "bg-gray-200"}`}
                                >
                                  <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ${item.value ? "translate-x-[18px]" : "translate-x-0"}`} />
                                </div>
                              ) : (
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 ${item.value ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                                  {item.value ? "ON" : "OFF"}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">CARD DETAILS</h3>
                        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden p-1.5">
                          {[
                            { icon: <CreditCard size={18} className="text-[#042BFD]" strokeWidth={1.5} />, label: "Credit Card", field: "cardNumber" as const, type: "text" },
                            { icon: <User size={18} className="text-[#042BFD]" strokeWidth={1.5} />, label: "Card Holder", field: "cardHolder" as const, type: "text" },
                          ].map((item, idx) => (
                            <div key={item.field} className="flex items-center gap-3 p-2.5 border-b border-gray-100">
                              <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <p className="text-[11px] text-gray-400 mb-0.5 font-normal">{item.label}</p>
                                {isEditing ? (
                                  <input
                                    type={item.type}
                                    value={paymentData[item.field]}
                                    onChange={(e) => setPaymentData({ ...paymentData, [item.field]: e.target.value })}
                                    className="w-full text-[13px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-0.5 bg-transparent"
                                  />
                                ) : (
                                  <p className="text-[13px] font-medium text-gray-900">{paymentData[item.field]}</p>
                                )}
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center gap-3 p-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                              <Globe size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] text-gray-400 mb-0.5 font-normal">Country</p>
                              {isEditing ? (
                                <div className="flex items-center gap-1.5 border-b border-gray-300 focus-within:border-[#042BFD] pb-0.5">
                                  <span>🇬🇧</span>
                                  <input
                                    type="text"
                                    value={paymentData.country}
                                    onChange={(e) => setPaymentData({ ...paymentData, country: e.target.value })}
                                    className="w-full text-[13px] font-medium text-gray-900 outline-none bg-transparent"
                                  />
                                </div>
                              ) : (
                                <p className="text-[13px] font-medium text-gray-900 flex items-center gap-1.5">
                                  <span>🇬🇧</span> {paymentData.country}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}