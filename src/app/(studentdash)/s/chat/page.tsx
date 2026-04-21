// "use client";

// import React, { useState, useEffect } from "react";
// import { Link2, Send, MessageSquareMore } from "lucide-react";

// export default function ChatPage() {
//   // Application States
//   const [userId, setUserId] = useState<string | null>(null);
//   const [activeContactId, setActiveContactId] = useState<string | null>(null);
//   const [inputText, setInputText] = useState("");
  
//   // API Data States
//   const [educators, setEducators] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);

//   // 1. Fetch Educators on Mount
//   useEffect(() => {
//     const fetchEducators = async () => {
//       try {
//         const token = localStorage.getItem("token") || "";
//         const uid = localStorage.getItem("userId") || "";
//         setUserId(uid);

//         if (token && uid) {
//           const res = // await StudentAPI.getChatEducators(token, uid);
//           // Safely extract the array whether it's directly the response or wrapped in `data`
//           const educatorList = Array.isArray(res) ? res : (res.data || []);
//           setEducators(educatorList);

//           // Automatically select the first educator if none is selected
//           if (educatorList.length > 0 && !activeContactId) {
//             setActiveContactId(educatorList[0].id || educatorList[0]._id || educatorList[0].educatorId);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load educators:", error);
//       }
//     };

//     fetchEducators();
//   }, []);

//   // 2. Fetch Messages when activeContactId changes
//   const fetchMessages = async (educatorId: string) => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const uid = localStorage.getItem("userId") || "";
      
//       if (token && uid) {
//         const res = // await StudentAPI.getChatMessages(token, uid, educatorId);
//         const msgs = Array.isArray(res) ? res : (res.data || []);
//         setMessages(msgs);
//       }
//     } catch (error) {
//       console.error("Failed to load messages:", error);
//     }
//   };

//   useEffect(() => {
//     if (activeContactId) {
//       fetchMessages(activeContactId);
//     }
//   }, [activeContactId]);

//   // 3. Send Message
//   const handleSendMessage = async () => {
//     if (!inputText.trim() || !activeContactId) return;

//     try {
//       const token = localStorage.getItem("token") || "";
//       const uid = localStorage.getItem("userId") || "";

//       if (token && uid) {
//         // await StudentAPI.sendChatMessage(token, uid, activeContactId, inputText);
//         setInputText(""); // Clear input
//         fetchMessages(activeContactId); // Refresh messages
//       }
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   // Handle Enter key for sending
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // --- DATA MAPPING FOR UI ---
  
//   // Safely map API educators to UI format
//   const displayContacts = educators.map(e => ({
//     id: e.id || e._id || e.educatorId,
//     name: e.name || e.educatorName || "Educator",
//     avatar: e.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(e.name || e.educatorName || 'Educator')}&background=random`,
//     preview: e.lastMessage || e.preview || "Start a conversation...",
//     time: e.time || "",
//     unread: !!e.unread,
//     title: e.title || "Mentor",
//     webinar: e.webinar || e.sessionName || "",
//   }));

//   const activeContact = displayContacts.find((c) => c.id === activeContactId);
//   const isTyping = inputText.trim().length > 0;
  
//   // Empty state triggers if there are no messages in the array
//   const isEmptyChat = messages.length === 0;

//   // Safely map API messages to UI format
//   const displayMessages = messages.map((m, index, arr) => {
//     // Determine if sender is 'me' (student) or 'them' (educator)
//     // Uses fallback checks just in case your API uses different key names
//     const isMe = m.senderId === userId || m.sender === 'student' || m.isStudent;
    
//     // Avatar should show on the last message of a contiguous block from the educator
//     const nextMsg = arr[index + 1];
//     const isNextMe = nextMsg ? (nextMsg.senderId === userId || nextMsg.sender === 'student' || nextMsg.isStudent) : false;
//     const showAvatar = !isMe && (!nextMsg || isNextMe);

//     // Format time if timestamp exists
//     let timeStr = m.time || "";
//     if (m.createdAt) {
//       const dateObj = new Date(m.createdAt);
//       timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     }

//     return {
//       id: m.id || m._id || `msg-${index}`,
//       sender: isMe ? "me" : "them",
//       text: m.content || m.text || "",
//       time: timeStr,
//       showAvatar: showAvatar,
//     };
//   });

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] bg-white font-sans max-w-[1600px] mx-auto">
//       <div className="bg-white px-6 md:px-10 py-3 border-b border-gray-100">
//         <h1 className="text-[22px] font-bold text-gray-900 mb-2">
//           Chat
//         </h1>
//         <p className="text-sm text-gray-500">Engage directly with your 1:1 mentors.</p>
//       </div>
      
//       {/* Main Chat Container */}
//       <div className="flex flex-1 overflow-hidden h-full">
        
//         {/* Left Sidebar - Contacts List */}
//         <div className="w-[350px] border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full">
//           {displayContacts.length > 0 ? displayContacts.map((contact) => (
//             <div
//               key={contact.id}
//               onClick={() => setActiveContactId(contact.id)}
//               className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-l-4 ${
//                 activeContactId === contact.id
//                   ? "bg-gray-50 border-[#042BFD]"
//                   : "border-transparent hover:bg-gray-50/50"
//               }`}
//             >
//               {/* Unread Indicator */}
//               <div className="w-2 h-2 mt-4 shrink-0 flex items-center justify-center">
//                 {contact.unread && (
//                   <div className="w-1.5 h-1.5 bg-[#042BFD] rounded-full" />
//                 )}
//               </div>

//               {/* Avatar */}
//               <img
//                 src={contact.avatar}
//                 alt={contact.name}
//                 className="w-11 h-11 rounded-full object-cover shrink-0"
//               />

//               {/* Contact Info */}
//               <div className="flex-1 min-w-0 pt-0.5">
//                 <div className="flex justify-between items-center mb-1">
//                   <h3 className="text-[15px] font-semibold text-gray-900 truncate">
//                     {contact.name}
//                   </h3>
//                   {contact.time && (
//                     <span
//                       className={`text-xs ${
//                         contact.unread
//                           ? "text-[#042BFD] font-medium"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {contact.time}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-[13px] text-gray-500 truncate">
//                   {contact.preview}
//                 </p>
//               </div>
//             </div>
//           )) : (
//             <div className="p-6 text-center text-gray-400 text-sm">
//               No educators found.
//             </div>
//           )}
//         </div>

//         {/* Right Area - Chat Window */}
//         <div className="flex-1 flex flex-col min-w-0 bg-white h-full relative">
          
//           {/* Chat Header (Fixed at top) */}
//           {activeContact && (
//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={activeContact.avatar}
//                   alt={activeContact.name}
//                   className="w-11 h-11 rounded-full object-cover shrink-0"
//                 />
//                 <div>
//                   <h2 className="text-[16px] font-bold text-gray-900">
//                     {activeContact.name}
//                   </h2>
//                   {activeContact.title && (
//                     <p className="text-[13px] text-gray-500">
//                       {activeContact.title}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Webinar Pill */}
//               {activeContact.webinar && (
//                 <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 max-w-sm">
//                   <Link2 size={14} className="text-gray-400 shrink-0" />
//                   <p className="text-xs text-gray-600 truncate">
//                     <span className="text-gray-500">Webinar: </span>
//                     {activeContact.webinar}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Chat Messages Area (Scrollable) */}
//           <div className="flex-1 overflow-y-auto p-6 flex flex-col">
//             {!activeContact ? (
//                <div className="flex-1 flex flex-col items-center justify-center text-center">
//                  <p className="text-[15px] text-gray-500">Select an educator to start chatting</p>
//                </div>
//             ) : isEmptyChat ? (
//               // Empty State
//               <div className="flex-1 flex flex-col items-center justify-center text-center">
//                 <div className="w-16 h-16 bg-[#EBF0FF] rounded-2xl flex items-center justify-center mb-4">
//                   <MessageSquareMore color="#042BFD" />
//                 </div>
//                 <p className="text-[15px] text-gray-500">
//                   Start a conversation with {activeContact?.name}
//                 </p>
//               </div>
//             ) : (
//               // Active Chat State
//               <div className="flex flex-col max-w-3xl mx-auto w-full pb-4">
//                 <div className="text-center mb-6">
//                   <span className="text-xs font-medium text-gray-500">
//                     Today
//                   </span>
//                 </div>

//                 {/* API Message History */}
//                 <div className="flex flex-col gap-2">
//                   {displayMessages.map((msg) => (
//                     <div
//                       key={msg.id}
//                       className={`flex items-end gap-2 ${
//                         msg.sender === "me" ? "justify-end mt-4" : "justify-start"
//                       }`}
//                     >
//                       {/* Avatar Placeholder for alignment or actual Avatar */}
//                       {msg.sender === "them" && (
//                         <div className="w-8 h-8 shrink-0">
//                           {msg.showAvatar && (
//                             <img
//                               src={activeContact?.avatar}
//                               alt="Avatar"
//                               className="w-8 h-8 rounded-full object-cover"
//                             />
//                           )}
//                         </div>
//                       )}

//                       <div className="flex flex-col gap-1 max-w-[70%]">
//                         {msg.sender === "me" && msg.time && (
//                           <div className="text-xs text-gray-400 text-right mb-1">
//                             {msg.time}
//                           </div>
//                         )}
//                         <div
//                           className={`px-4 py-2.5 rounded-[20px] text-[15px] ${
//                             msg.sender === "me"
//                               ? "bg-[#EAEBFC] text-[#111827] rounded-br-sm"
//                               : "bg-[#F3F4F6] text-[#111827] rounded-bl-sm"
//                           }`}
//                         >
//                           {msg.text}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Chat Input Area (Fixed at bottom) */}
//           {activeContact && (
//             <div className="p-6 pt-2 shrink-0 bg-white z-10 border-t border-transparent">
//               <div className="relative flex items-center max-w-4xl mx-auto">
//                 <input
//                   type="text"
//                   placeholder="Type a message"
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="w-full pl-6 pr-14 py-4 bg-white border border-gray-200 rounded-full text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
//                 />
//                 {/* Send Button (Only visible when typing) */}
//                 {isTyping && (
//                   <button 
//                     onClick={handleSendMessage}
//                     className="absolute right-2.5 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
//                   >
//                     <Send size={16} className="ml-0.5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState, useEffect } from "react";
// import { Link2, Send, MessageSquareMore, ArrowLeft } from "lucide-react";

// export default function ChatPage() {
//   // Application States
//   const [userId, setUserId] = useState<string | null>(null);
//   const [activeContactId, setActiveContactId] = useState<string | null>(null);
//   const [inputText, setInputText] = useState("");
  
//   // Responsive State for Mobile View Toggling
//   const [showMobileList, setShowMobileList] = useState(true);
  
//   // API Data States
//   const [educators, setEducators] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);

//   // 1. Fetch Educators on Mount
//   useEffect(() => {
//     const fetchEducators = async () => {
//       try {
//         const token = localStorage.getItem("token") || "";
//         const uid = localStorage.getItem("userId") || "";
//         setUserId(uid);

//         if (token && uid) {
//           const res = // await StudentAPI.getChatEducators(token, uid);
//           // Safely extract the array whether it's directly the response or wrapped in `data`
//           const educatorList = Array.isArray(res) ? res : (res.data || []);
//           setEducators(educatorList);

//           // Automatically select the first educator if none is selected
//           if (educatorList.length > 0 && !activeContactId) {
//             setActiveContactId(educatorList[0].id || educatorList[0]._id || educatorList[0].educatorId);
//             // Notice: We do NOT change showMobileList to false here, 
//             // so mobile users still start by seeing the contact list.
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load educators:", error);
//       }
//     };

//     fetchEducators();
//   }, []);

//   // 2. Fetch Messages when activeContactId changes
//   const fetchMessages = async (educatorId: string) => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const uid = localStorage.getItem("userId") || "";
      
//       if (token && uid) {
//         const res = // await StudentAPI.getChatMessages(token, uid, educatorId);
//         const msgs = Array.isArray(res) ? res : (res.data || []);
//         setMessages(msgs);
//       }
//     } catch (error) {
//       console.error("Failed to load messages:", error);
//     }
//   };

//   useEffect(() => {
//     if (activeContactId) {
//       fetchMessages(activeContactId);
//     }
//   }, [activeContactId]);

//   // 3. Send Message
//   const handleSendMessage = async () => {
//     if (!inputText.trim() || !activeContactId) return;

//     try {
//       const token = localStorage.getItem("token") || "";
//       const uid = localStorage.getItem("userId") || "";

//       if (token && uid) {
//         // await StudentAPI.sendChatMessage(token, uid, activeContactId, inputText);
//         setInputText(""); // Clear input
//         fetchMessages(activeContactId); // Refresh messages
//       }
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   // Handle Enter key for sending
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // --- DATA MAPPING FOR UI ---
//   const displayContacts = educators.map(e => ({
//     id: e.id || e._id || e.educatorId,
//     name: e.name || e.educatorName || "Educator",
//     avatar: e.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(e.name || e.educatorName || 'Educator')}&background=random`,
//     preview: e.lastMessage || e.preview || "Start a conversation...",
//     time: e.time || "",
//     unread: !!e.unread,
//     title: e.title || "Mentor",
//     webinar: e.webinar || e.sessionName || "",
//   }));

//   const activeContact = displayContacts.find((c) => c.id === activeContactId);
//   const isTyping = inputText.trim().length > 0;
//   const isEmptyChat = messages.length === 0;

//   const displayMessages = messages.map((m, index, arr) => {
//     const isMe = m.senderId === userId || m.sender === 'student' || m.isStudent;
    
//     const nextMsg = arr[index + 1];
//     const isNextMe = nextMsg ? (nextMsg.senderId === userId || nextMsg.sender === 'student' || nextMsg.isStudent) : false;
//     const showAvatar = !isMe && (!nextMsg || isNextMe);

//     let timeStr = m.time || "";
//     if (m.createdAt) {
//       const dateObj = new Date(m.createdAt);
//       timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     }

//     return {
//       id: m.id || m._id || `msg-${index}`,
//       sender: isMe ? "me" : "them",
//       text: m.content || m.text || "",
//       time: timeStr,
//       showAvatar: showAvatar,
//     };
//   });

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-white font-sans max-w-[1600px] mx-auto overflow-hidden">
      
//       {/* Top Header - Hidden on mobile when viewing the chat window */}
//       <div className={`bg-white px-4 md:px-10 py-3 md:border-b border-gray-100 ${!showMobileList ? 'hidden md:block' : 'block'}`}>
//         <h1 className="text-[22px] font-bold text-gray-900 mb-1 md:mb-2">
//           Chat
//         </h1>
//         <p className="text-sm text-gray-500 hidden md:block">Engage directly with your 1:1 mentors.</p>
//       </div>
      
//       {/* Main Chat Container */}
//       <div className="flex flex-1 overflow-hidden h-full">
        
//         {/* ================= LEFT SIDEBAR (Contact List) ================= */}
//         {/* Mobile: Hidden when chatting. Desktop: Always visible */}
//         <div className={`w-full md:w-[350px] md:border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full ${showMobileList ? 'flex' : 'hidden md:flex'}`}>
//           {displayContacts.length > 0 ? displayContacts.map((contact) => (
//             <div
//               key={contact.id}
//               onClick={() => {
//                 setActiveContactId(contact.id);
//                 setShowMobileList(false); // Switch to Chat view on mobile
//               }}
//               className={`flex items-center md:items-start gap-3 p-4 cursor-pointer transition-colors border-b border-gray-100 md:border-b-0 md:border-l-4 ${
//                 activeContactId === contact.id
//                   ? "md:bg-gray-50 md:border-[#042BFD]"
//                   : "border-transparent hover:bg-gray-50/50"
//               }`}
//             >
//               {/* Unread Indicator (Centered vertically on mobile, slightly top on desktop) */}
//               <div className="w-2 h-full flex items-center md:items-start md:mt-4 justify-center shrink-0">
//                 {contact.unread && (
//                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#042BFD] rounded-full" />
//                 )}
//               </div>

//               {/* Avatar */}
//               <img
//                 src={contact.avatar}
//                 alt={contact.name}
//                 className="w-11 h-11 rounded-full object-cover shrink-0"
//               />

//               {/* Contact Info */}
//               <div className="flex-1 min-w-0 pt-0 md:pt-0.5">
//                 <div className="flex justify-between items-center mb-0.5 md:mb-1">
//                   <h3 className="text-[15px] font-semibold text-gray-900 truncate">
//                     {contact.name}
//                   </h3>
//                   {contact.time && (
//                     <span
//                       className={`text-[11px] md:text-xs ${
//                         contact.unread
//                           ? "text-[#042BFD] font-medium"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {contact.time}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-[13px] text-gray-500 truncate">
//                   {contact.preview}
//                 </p>
//               </div>
//             </div>
//           )) : (
//             <div className="p-6 text-center text-gray-400 text-sm">
//               No educators found.
//             </div>
//           )}
//         </div>

//         {/* ================= RIGHT AREA (Chat Window) ================= */}
//         {/* Mobile: Hidden when on list. Desktop: Always visible */}
//         <div className={`flex-1 flex flex-col min-w-0 bg-white h-full relative ${!showMobileList ? 'flex' : 'hidden md:flex'}`}>
          
//           {/* Chat Header (Fixed at top) */}
//           {activeContact && (
//             <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
//               <div className="flex items-center gap-3 md:gap-3">
//                 {/* Mobile Back Button */}
//                 <button 
//                   onClick={() => setShowMobileList(true)} 
//                   className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
//                 >
//                   <ArrowLeft size={20} />
//                 </button>
                
//                 <img
//                   src={activeContact.avatar}
//                   alt={activeContact.name}
//                   className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0"
//                 />
//                 <div>
//                   <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
//                     {activeContact.name}
//                   </h2>
//                   {activeContact.title && (
//                     <p className="text-[12px] md:text-[13px] text-gray-500">
//                       {activeContact.title}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Webinar Pill (Hidden on very small screens to save space) */}
//               {activeContact.webinar && (
//                 <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 max-w-sm">
//                   <Link2 size={14} className="text-gray-400 shrink-0" />
//                   <p className="text-xs text-gray-600 truncate">
//                     <span className="text-gray-500">Webinar: </span>
//                     {activeContact.webinar}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Chat Messages Area (Scrollable) */}
//           <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col custom-scrollbar">
//             {!activeContact ? (
//                <div className="flex-1 flex flex-col items-center justify-center text-center">
//                  <p className="text-[15px] text-gray-500">Select an educator to start chatting</p>
//                </div>
//             ) : isEmptyChat ? (
//               // Empty State
//               <div className="flex-1 flex flex-col items-center justify-center text-center">
//                 <div className="w-16 h-16 bg-[#EBF0FF] rounded-2xl flex items-center justify-center mb-4">
//                   <MessageSquareMore color="#042BFD" />
//                 </div>
//                 <p className="text-[14px] md:text-[15px] text-gray-500">
//                   Start a conversation with {activeContact?.name}
//                 </p>
//               </div>
//             ) : (
//               // Active Chat State
//               <div className="flex flex-col max-w-3xl mx-auto w-full pb-4">
//                 <div className="text-center mb-4 md:mb-6">
//                   <span className="text-[11px] md:text-xs font-medium text-gray-500">
//                     Today
//                   </span>
//                 </div>

//                 {/* API Message History */}
//                 <div className="flex flex-col gap-1.5 md:gap-2">
//                   {displayMessages.map((msg) => (
//                     <div
//                       key={msg.id}
//                       className={`flex items-end gap-2 ${
//                         msg.sender === "me" ? "justify-end mt-3 md:mt-4" : "justify-start"
//                       }`}
//                     >
//                       {/* Avatar Placeholder for alignment or actual Avatar */}
//                       {msg.sender === "them" && (
//                         <div className="w-7 h-7 md:w-8 md:h-8 shrink-0">
//                           {msg.showAvatar && (
//                             <img
//                               src={activeContact?.avatar}
//                               alt="Avatar"
//                               className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
//                             />
//                           )}
//                         </div>
//                       )}

//                       <div className="flex flex-col gap-1 max-w-[75%] md:max-w-[70%]">
//                         {msg.sender === "me" && msg.time && (
//                           <div className="text-[10px] md:text-xs text-gray-400 text-right mb-0.5 md:mb-1">
//                             {msg.time}
//                           </div>
//                         )}
//                         <div
//                           className={`px-3.5 py-2 md:px-4 md:py-2.5 rounded-[18px] md:rounded-[20px] text-[14px] md:text-[15px] leading-relaxed ${
//                             msg.sender === "me"
//                               ? "bg-[#EAEBFC] text-[#111827] rounded-br-sm md:rounded-br-sm"
//                               : "bg-[#F3F4F6] text-[#111827] rounded-bl-sm md:rounded-bl-sm"
//                           }`}
//                         >
//                           {msg.text}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Chat Input Area (Fixed at bottom) */}
//           {activeContact && (
//             <div className="p-4 md:p-6 pt-2 md:pt-2 shrink-0 bg-white z-10 border-t border-gray-50 md:border-transparent pb-safe">
//               <div className="relative flex items-center max-w-4xl mx-auto">
//                 <input
//                   type="text"
//                   placeholder="Type a message"
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="w-full pl-5 md:pl-6 pr-12 md:pr-14 py-3 md:py-4 bg-white border border-gray-200 rounded-full text-[14px] md:text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
//                 />
//                 {/* Send Button (Only visible when typing) */}
//                 {isTyping && (
//                   <button 
//                     onClick={handleSendMessage}
//                     className="absolute right-1.5 md:right-2.5 p-1.5 md:p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
//                   >
//                     <Send size={16} className="ml-0.5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import { Link2, Send, MessageSquareMore, ArrowLeft } from "lucide-react";

// // --- MOCK DATA ---
// const MOCK_EDUCATORS = [
//   {
//     id: "1",
//     educatorName: "Dr. Sophia Tyler",
//     avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
//     lastMessage: "We can reschedule to anytime that work...",
//     time: "2m",
//     unread: false,
//     title: "Associate Professor, Cambridge Institute",
//     sessionName: "Webinar: Management of Acute Coronary Syndromes"
//   },
//   {
//     id: "2",
//     educatorName: "Dr. Michael Chen",
//     avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=random",
//     lastMessage: "Start a conversation with Dr. Michael Chen",
//     time: "",
//     unread: false,
//     title: "Associate Professor, XYZ Institute",
//     sessionName: ""
//   },
//   {
//     id: "3",
//     educatorName: "Dr. Marygold Nuer",
//     avatar: "https://ui-avatars.com/api/?name=Marygold+Nuer&background=random",
//     lastMessage: "You: Can we plan this once I'm done with...",
//     time: "41m",
//     unread: false,
//     title: "Associate Professor, XYZ Institute",
//     sessionName: ""
//   },
//   {
//     id: "4",
//     educatorName: "Dr. Emily Nguyen",
//     avatar: "https://ui-avatars.com/api/?name=Emily+Nguyen&background=random",
//     lastMessage: "This is regarding the session we have pla...",
//     time: "2h",
//     unread: true,
//     title: "Associate Professor, XYZ Institute",
//     sessionName: ""
//   }
// ];

// const MOCK_MESSAGES: Record<string, any[]> = {
//   "1": [
//     { _id: "m1", senderId: "educator-1", sender: "educator", content: "Hi Natalia", time: "11:43 AM" },
//     { _id: "m2", senderId: "educator-1", sender: "educator", content: "I was thinking of rescheduling our session to anytime on monday...", time: "11:43 AM" },
//     { _id: "m3", senderId: "educator-1", sender: "educator", content: "Can you please share your availability?", time: "11:44 AM" },
//     { _id: "m4", senderId: "student-1", sender: "student", content: "We can reschedule to any time that works for you, I'm available all day on monday.", time: "12:03 PM" }
//   ],
//   "2": [],
//   "3": [
//      { _id: "m5", senderId: "student-1", sender: "student", content: "Can we plan this once I'm done with the exams?", time: "10:00 AM" }
//   ],
//   "4": [
//      { _id: "m6", senderId: "educator-4", sender: "educator", content: "This is regarding the session we have planned for tomorrow.", time: "09:00 AM" }
//   ]
// };

// export default function ChatPage() {
//   // Application States
//   const [userId, setUserId] = useState<string | null>("student-1");
//   const [activeContactId, setActiveContactId] = useState<string | null>(null);
//   const [inputText, setInputText] = useState("");
  
//   // Responsive State for Mobile View Toggling
//   const [showMobileList, setShowMobileList] = useState(true);
  
//   // API Data States
//   const [educators, setEducators] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);

//   // 1. Fetch Educators on Mount
//   useEffect(() => {
//     const fetchEducators = async () => {
//       try {
//         // --- API INTEGRATION (Commented out for mock testing) ---
     
        
//           const res = // await StudentAPI.getChatEducators( );
//           const educatorList = Array.isArray(res) ? res : (res.data || []);
//           setEducators(educatorList);

//           if (educatorList.length > 0 && !activeContactId) {
//             setActiveContactId(educatorList[0].id || educatorList[0]._id || educatorList[0].educatorId);
//           }
      
        

//         // --- MOCK DATA INJECTION ---
//         // setEducators(MOCK_EDUCATORS);
//         // if (MOCK_EDUCATORS.length > 0 && !activeContactId) {
//         //   setActiveContactId(MOCK_EDUCATORS[0].id);
//         // }

//       } catch (error) {
//         console.error("Failed to load educators:", error);
//       }
//     };

//     fetchEducators();
//   }, []);

//   // 2. Fetch Messages when activeContactId changes
//   const fetchMessages = async (educatorId: string) => {
//     try {
//       // --- API INTEGRATION (Commented out for mock testing) ---
//       /*
//       const token = localStorage.getItem("token") || "";
//       const uid = localStorage.getItem("userId") || "";
      
       
//         const res = // await StudentAPI.getChatMessages(  educatorId);
//         const msgs = Array.isArray(res) ? res : (res.data || []);
//         setMessages(msgs);
      
//       */

//       // --- MOCK DATA INJECTION ---
//       const msgs = MOCK_MESSAGES[educatorId] || [];
//       setMessages(msgs);

//     } catch (error) {
//       console.error("Failed to load messages:", error);
//     }
//   };

//   useEffect(() => {
//     if (activeContactId) {
//       fetchMessages(activeContactId);
//     }
//   }, [activeContactId]);

//   // 3. Send Message
//   const handleSendMessage = async () => {
//     if (!inputText.trim() || !activeContactId) return;

//     try {
//       // --- API INTEGRATION (Commented out for mock testing) ---
//       /*
//       const token = localStorage.getItem("token") || "";
//       const uid = localStorage.getItem("userId") || "";

//       if (token && uid) {
//         // await StudentAPI.sendChatMessage(token, uid, activeContactId, inputText);
//         setInputText(""); 
//         fetchMessages(activeContactId); 
//       }
//       */

//       // --- MOCK DATA INJECTION ---
//       const newMessage = {
//         _id: Math.random().toString(36).substr(2, 9),
//         senderId: userId,
//         sender: "student",
//         content: inputText,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
      
//       // Update mock state locally
//       if (!MOCK_MESSAGES[activeContactId]) MOCK_MESSAGES[activeContactId] = [];
//       MOCK_MESSAGES[activeContactId].push(newMessage);
      
//       setInputText("");
//       fetchMessages(activeContactId);

//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   // Handle Enter key for sending
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

  
//   // --- DATA MAPPING FOR UI ---
//   const displayContacts = educators.map(e => ({
//     id: e.id || e._id || e.educatorId,
//     name: e.name || e.educatorName || "Educator",
//     avatar: e.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(e.name || e.educatorName || 'Educator')}&background=random`,
//     preview: e.lastMessage || e.preview || "Start a conversation...",
//     time: e.time || "",
//     unread: !!e.unread,
//     title: e.title || "Mentor",
//     webinar: e.webinar || e.sessionName || "",
//   }));

//   const activeContact = displayContacts.find((c) => c.id === activeContactId);
//   const isTyping = inputText.trim().length > 0;
//   const isEmptyChat = messages.length === 0;

//   const displayMessages = messages.map((m, index, arr) => {
//     const isMe = m.senderId === userId || m.sender === 'student' || m.isStudent;
    
//     const prevMsg = arr[index - 1];
//     const nextMsg = arr[index + 1];
    
//     const prevIsMe = prevMsg ? (prevMsg.senderId === userId || prevMsg.sender === 'student' || prevMsg.isStudent) : null;
//     const nextIsMe = nextMsg ? (nextMsg.senderId === userId || nextMsg.sender === 'student' || nextMsg.isStudent) : null;
  
//     const isPrevSame = prevMsg && prevIsMe === isMe;
//     const isNextSame = nextMsg && nextIsMe === isMe;
  
//     const isFirstInGroup = !isPrevSame && isNextSame;
//     const isMiddleInGroup = isPrevSame && isNextSame;
//     const isLastInGroup = isPrevSame && !isNextSame;
//     const isOnlyInGroup = !isPrevSame && !isNextSame;
  
//     let radiusClass = "rounded-[15px]";
// if (isMe) {
//   if (isFirstInGroup) radiusClass = "rounded-[15px] rounded-br-none";
//   else if (isMiddleInGroup) radiusClass = "rounded-[15px]"; 
//   else if (isLastInGroup) radiusClass = "rounded-[15px] rounded-tr-none";
//   else if (isOnlyInGroup) radiusClass = "rounded-[15px] rounded-br-none";
// } else {
//   if (isFirstInGroup) radiusClass = "rounded-[15px] rounded-bl-none";
//   else if (isMiddleInGroup) radiusClass = "rounded-[15px]"; 
//   else if (isLastInGroup) radiusClass = "rounded-[15px] rounded-tl-none";
//   else if (isOnlyInGroup) radiusClass = "rounded-[15px] rounded-bl-none";
// }
  
//     const showAvatar = !isMe && (!nextMsg || nextIsMe !== isMe);
  
//     let timeStr = m.time || "";
//     if (m.createdAt) {
//       const dateObj = new Date(m.createdAt);
//       timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     }
  
//     return {
//       id: m.id || m._id || `msg-${index}`,
//       sender: isMe ? "me" : "them",
//       text: m.content || m.text || "",
//       time: timeStr,
//       showAvatar: showAvatar,
//       radiusClass: radiusClass
//     };
//   });

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-white font-sans  mx-auto overflow-hidden">
      
//       {/* Top Header - Hidden on mobile when viewing the chat window */}
//       <div className={`bg-white px-4 md:px-10 md:py-3 md:border-b border-gray-100 ${!showMobileList ? 'hidden md:block' : 'block'}`}>
//         <h1 className="text-[22px] hidden md:block font-bold text-gray-900 mb-1 md:mb-2">
//           Chat
//         </h1>
//         <p className="text-sm text-gray-500 hidden md:block">Engage directly with your 1:1 mentors.</p>
//       </div>
      
//       {/* Main Chat Container */}
//       <div className="flex flex-1 overflow-hidden h-full">
        
//         {/* ================= LEFT SIDEBAR (Contact List) ================= */}
//         {/* Mobile: Hidden when chatting. Desktop: Always visible */}
//         <div className={`w-full md:w-[350px] md:border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full ${showMobileList ? 'flex' : 'hidden md:flex'}`}>
//           {displayContacts.length > 0 ? displayContacts.map((contact) => (
//             <div
//               key={contact.id}
//               onClick={() => {
//                 setActiveContactId(contact.id);
//                 setShowMobileList(false); // Switch to Chat view on mobile
//               }}
//               className={`flex items-center md:items-start gap-3 p-4 cursor-pointer transition-colors border-b border-gray-200 md:border-b-0 md:border-l-4 ${
//                 activeContactId === contact.id
//                   ? "md:bg-gray-50 md:border-[#042BFD]"
//                   : "  hover:bg-gray-50/50 border-b border-gray-200 "
//               }`}
//             >
//               {/* Unread Indicator (Centered vertically on mobile, slightly top on desktop) */}
//               <div className="w-2 h-full flex items-center md:items-start md:mt-4 justify-center shrink-0">
//                 {contact.unread && (
//                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#042BFD] rounded-full" />
//                 )}
//               </div>

//               {/* Avatar */}
//               <img
//                 src={contact.avatar}
//                 alt={contact.name}
//                 className="w-11 h-11 rounded-full object-cover shrink-0"
//               />

//               {/* Contact Info */}
//               <div className="flex-1 min-w-0 pt-0 md:pt-0.5">
//                 <div className="flex justify-between items-center mb-0.5 md:mb-1">
//                   <h3 className="text-[15px] font-semibold text-gray-900 truncate">
//                     {contact.name}
//                   </h3>
//                   {contact.time && (
//                     <span
//                       className={`text-[11px] md:text-xs ${
//                         contact.unread
//                           ? "text-[#042BFD] font-medium"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {contact.time}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-[13px] text-gray-500 truncate">
//                   {contact.preview}
//                 </p>
//               </div>
//             </div>
//           )) : (
//             <div className="p-6 text-center text-gray-400 text-sm">
//               No educators found.
//             </div>
//           )}
//         </div>

//         {/* ================= RIGHT AREA (Chat Window) ================= */}
//         {/* Mobile: Hidden when on list. Desktop: Always visible */}
//         <div className={`flex-1 flex flex-col min-w-0 bg-white h-full relative ${!showMobileList ? 'flex' : 'hidden md:flex'}`}>
          
//           {/* Chat Header (Fixed at top) */}
//           {activeContact && (
//             <div className="px-4 md:px-6 py-8 md:py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
//               <div className="flex items-center gap-3 md:gap-3">
//                 {/* Mobile Back Button */}
//                 <button 
//                   onClick={() => setShowMobileList(true)} 
//                   className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
//                 >
//                   <ArrowLeft size={20} />
//                 </button>
                
//                 <img
//                   src={activeContact.avatar}
//                   alt={activeContact.name}
//                   className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0"
//                 />
//                 <div>
//                   <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
//                     {activeContact.name}
//                   </h2>
//                   {activeContact.title && (
//                     <p className="text-[12px] md:text-[13px] text-gray-500">
//                       {activeContact.title}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Webinar Pill (Hidden on very small screens to save space) */}
//               {activeContact.webinar && (
//                 <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 max-w-sm">
//                   <Link2 size={14} className="text-gray-400 shrink-0" />
//                   <p className="text-xs text-gray-600 truncate">
//                     <span className="text-gray-500">Webinar: </span>
//                     {activeContact.webinar}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Chat Messages Area (Scrollable) */}
//           <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col custom-scrollbar">
//             {!activeContact ? (
//                <div className="flex-1 flex flex-col items-center justify-center text-center">
//                  <p className="text-[15px] text-gray-500">Select an educator to start chatting</p>
//                </div>
//             ) : isEmptyChat ? (
//               // Empty State
//               <div className="flex-1 flex flex-col items-center justify-center text-center">
//                 <div className="w-16 h-16 bg-[#EBF0FF] rounded-2xl flex items-center justify-center mb-4">
//                   <MessageSquareMore color="#042BFD" />
//                 </div>
//                 <p className="text-[14px] md:text-[15px] text-gray-500">
//                   Start a conversation with {activeContact?.name}
//                 </p>
//               </div>
//             ) : (
//               // Active Chat State
//               <div className="flex flex-col max-w-3xl mx-auto w-full pb-4">
//                 <div className="text-center mb-4 md:mb-6">
//                   <span className="text-[11px] md:text-xs font-medium text-gray-500">
//                     Today
//                   </span>
//                 </div>

//                 {/* API Message History */}
//                 <div className="flex flex-col gap-1.5 md:gap-2">
//                   {displayMessages.map((msg) => (
//                     <div
//                       key={msg.id}
//                       className={`flex items-end gap-2 ${
//                         msg.sender === "me" ? "justify-end mt-3 md:mt-4" : "justify-start"
//                       }`}
//                     >
//                       {/* Avatar Placeholder for alignment or actual Avatar */}
//                       {msg.sender === "them" && (
//                         <div className="w-7 h-7 md:w-8 md:h-8 shrink-0">
//                           {msg.showAvatar && (
//                             <img
//                               src={activeContact?.avatar}
//                               alt="Avatar"
//                               className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
//                             />
//                           )}
//                         </div>
//                       )}

//                       <div className="flex flex-col gap-1 max-w-[75%] md:max-w-[70%]">
//                         {msg.sender === "me" && msg.time && (
//                           <div className="text-[10px] md:text-xs text-gray-400 text-right mb-0.5 md:mb-1">
//                             {msg.time}
//                           </div>
//                         )}
//                         <div
//                               className={`px-3.5 py-2 md:px-4 md:py-2.5 text-[14px] md:text-[15px] leading-relaxed ${msg.radiusClass} ${
//                                 msg.sender === "me"
//                                   ? "bg-[#EAEBFC] text-[#111827]"
//                                   : "bg-[#F3F4F6] text-[#111827]"
//                               }`}
//                             >
//                               {msg.text}
//                             </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Chat Input Area (Fixed at bottom) */}
//           {activeContact && (
//             <div className="p-4 mb-14 md:mb-0 md:p-6 pt-2 md:pt-2 shrink-0 bg-white z-10 border-t border-gray-50 md:border-transparent pb-safe">
//               <div className="relative flex items-center max-w-4xl mx-auto">
//                 <input
//                   type="text"
//                   placeholder="Type a message"
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   className="w-full pl-5 md:pl-6 pr-12 md:pr-14 py-3 md:py-4 bg-white border border-gray-200 rounded-full text-[14px] md:text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
//                 />
//                 {/* Send Button (Only visible when typing) */}
//                 {isTyping && (
//                   <button 
//                     onClick={handleSendMessage}
//                     className="absolute right-1.5 md:right-2.5 p-1.5 md:p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
//                   >
//                     <Send size={16} className="ml-0.5" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// } 
"use client";

import React, { useState, useEffect } from "react";
import { Link2, Send, MessageSquareMore, ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";

export default function ChatPage() {
  // Application States
  const [userId, setUserId] = useState<string | null>(null);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  
  // Responsive State for Mobile View Toggling
  const [showMobileList, setShowMobileList] = useState(true);
  
  // API Data States
  const [educators, setEducators] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Get User ID for message alignment
  useEffect(() => {
    setUserId(Cookies.get("userId") || null);
  }, []);

  // 1. Fetch Educators on Mount
  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const res = await StudentAPI.getChatEducators();
        const educatorList = Array.isArray(res) ? res : (res.data || res.educators || []);
        setEducators(educatorList);

        if (educatorList.length > 0 && !activeContactId) {
          setActiveContactId(educatorList[0].id || educatorList[0]._id || educatorList[0].educatorId);
        }
      } catch (error) {
        console.error("Failed to load educators:", error);
      }
    };

    fetchEducators();
  }, []);

  // 2. Fetch Messages when activeContactId changes
  const fetchMessages = async (educatorId: string) => {
    try {
      const res = // await StudentAPI.getChatMessages(educatorId);
      console.log( "Chat MEssages : " ,res);
      const msgs = Array.isArray(res) ? res : (res.data || res.messages || []);
      setMessages(msgs);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  useEffect(() => {
    if (activeContactId) {
      fetchMessages(activeContactId);
    }
  }, [activeContactId]);

  // 3. Send Message
  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeContactId) return;

    try {
      // await StudentAPI.sendChatMessage(activeContactId, inputText);
      setInputText(""); 
      fetchMessages(activeContactId); 
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Handle Enter key for sending
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // --- DATA MAPPING FOR UI ---
  const displayContacts = educators.map(e => ({
    id: e.id || e._id || e.educatorId,
    name: e.name || e.educatorName || "Educator",
    avatar: e.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(e.name || e.educatorName || 'Educator')}&background=random`,
    preview: e.lastMessage || e.preview || "Start a conversation...",
    time: e.time || "",
    unread: !!e.unread,
    title: e.title || "Mentor",
    webinar: e.webinar || e.sessionName || "",
  }));

  const activeContact = displayContacts.find((c) => c.id === activeContactId);
  const isTyping = inputText.trim().length > 0;
  const isEmptyChat = messages.length === 0;

  const displayMessages = messages.map((m, index, arr) => {
    const isMe = m.from === userId;

    const prevMsg = arr[index - 1];
    const nextMsg = arr[index + 1];
    
    const prevIsMe = prevMsg ? (prevMsg.senderId === userId || prevMsg.sender === 'student' || prevMsg.role === 'student' || prevMsg.isStudent) : null;
    const nextIsMe = nextMsg ? (nextMsg.senderId === userId || nextMsg.sender === 'student' || nextMsg.role === 'student' || nextMsg.isStudent) : null;
  
    const isPrevSame = prevMsg && prevIsMe === isMe;
    const isNextSame = nextMsg && nextIsMe === isMe;
  
    const isFirstInGroup = !isPrevSame && isNextSame;
    const isMiddleInGroup = isPrevSame && isNextSame;
    const isLastInGroup = isPrevSame && !isNextSame;
    const isOnlyInGroup = !isPrevSame && !isNextSame;
  
    let radiusClass = "rounded-[15px]";
    if (isMe) {
      if (isFirstInGroup) radiusClass = "rounded-[15px] rounded-br-none";
      else if (isMiddleInGroup) radiusClass = "rounded-[15px]"; 
      else if (isLastInGroup) radiusClass = "rounded-[15px] rounded-tr-none";
      else if (isOnlyInGroup) radiusClass = "rounded-[15px] rounded-br-none";
    } else {
      if (isFirstInGroup) radiusClass = "rounded-[15px] rounded-bl-none";
      else if (isMiddleInGroup) radiusClass = "rounded-[15px]"; 
      else if (isLastInGroup) radiusClass = "rounded-[15px] rounded-tl-none";
      else if (isOnlyInGroup) radiusClass = "rounded-[15px] rounded-bl-none";
    }
  
    const showAvatar = !isMe && (!nextMsg || nextIsMe !== isMe);
  
    let timeStr = m.time || "";
    if (m.createdAt || m.timestamp) {
      const dateObj = new Date(m.createdAt || m.timestamp);
      timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    return {
      id: m.id || m._id || `msg-${index}`,
      sender: isMe ? "me" : "them",
      text: m.content || m.text || "",
      time: timeStr,
      showAvatar: showAvatar,
      radiusClass: radiusClass
    };
  });

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-white font-sans mx-auto overflow-hidden">
      
      {/* Top Header - Hidden on mobile when viewing the chat window */}
      <div className={`bg-white px-4 md:px-10 md:py-3 md:border-b border-gray-100 ${!showMobileList ? 'hidden md:block' : 'block'}`}>
        <h1 className="text-[22px] hidden md:block font-bold text-gray-900 mb-1 md:mb-2">
          Chat
        </h1>
        <p className="text-sm text-gray-500 hidden md:block">Engage directly with your 1:1 mentors.</p>
      </div>
      
      {/* Main Chat Container */}
      <div className="flex flex-1 overflow-hidden h-full">
        
        {/* ================= LEFT SIDEBAR (Contact List) ================= */}
        {/* Mobile: Hidden when chatting. Desktop: Always visible */}
        <div className={`w-full md:w-[350px] md:border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full ${showMobileList ? 'flex' : 'hidden md:flex'}`}>
          {displayContacts.length > 0 ? displayContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setActiveContactId(contact.id);
                setShowMobileList(false); // Switch to Chat view on mobile
              }}
              className={`flex items-center md:items-start gap-3 p-4 cursor-pointer transition-colors border-b border-gray-200 md:border-b-0 md:border-l-4 ${
                activeContactId === contact.id
                  ? "md:bg-gray-50 md:border-[#042BFD]"
                  : " hover:bg-gray-50/50 border-b border-gray-200"
              }`}
            >
              {/* Unread Indicator */}
              <div className="w-2 h-full flex items-center md:items-start md:mt-4 justify-center shrink-0">
                {contact.unread && (
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#042BFD] rounded-full" />
                )}
              </div>

              {/* Avatar */}
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-11 h-11 rounded-full object-cover shrink-0"
              />

              {/* Contact Info */}
              <div className="flex-1 min-w-0 pt-0 md:pt-0.5">
                <div className="flex justify-between items-center mb-0.5 md:mb-1">
                  <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  {contact.time && (
                    <span
                      className={`text-[11px] md:text-xs ${
                        contact.unread
                          ? "text-[#042BFD] font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {contact.time}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-gray-500 truncate">
                  {contact.preview}
                </p>
              </div>
            </div>
          )) : (
            <div className="p-6 text-center text-gray-400 text-sm">
              No educators found.
            </div>
          )}
        </div>

        {/* ================= RIGHT AREA (Chat Window) ================= */}
        {/* Mobile: Hidden when on list. Desktop: Always visible */}
        <div className={`flex-1 flex flex-col min-w-0 bg-white h-full relative ${!showMobileList ? 'flex' : 'hidden md:flex'}`}>
          
          {/* Chat Header (Fixed at top) */}
          {activeContact && (
            <div className="px-4 md:px-6 py-8 md:py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
              <div className="flex items-center gap-3 md:gap-3">
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setShowMobileList(true)} 
                  className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <img
                  src={activeContact.avatar}
                  alt={activeContact.name}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0"
                />
                <div>
                  <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                    {activeContact.name}
                  </h2>
                  {activeContact.title && (
                    <p className="text-[12px] md:text-[13px] text-gray-500">
                      {activeContact.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Webinar Pill */}
              {activeContact.webinar && (
                <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 max-w-sm">
                  <Link2 size={14} className="text-gray-400 shrink-0" />
                  <p className="text-xs text-gray-600 truncate">
                    <span className="text-gray-500">Webinar: </span>
                    {activeContact.webinar}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Chat Messages Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col custom-scrollbar">
            {!activeContact ? (
               <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <p className="text-[15px] text-gray-500">Select an educator to start chatting</p>
               </div>
            ) : isEmptyChat ? (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#EBF0FF] rounded-2xl flex items-center justify-center mb-4">
                  <MessageSquareMore color="#042BFD" />
                </div>
                <p className="text-[14px] md:text-[15px] text-gray-500">
                  Start a conversation with {activeContact?.name}
                </p>
              </div>
            ) : (
              // Active Chat State
              <div className="flex flex-col max-w-3xl mx-auto w-full pb-4">
                <div className="text-center mb-4 md:mb-6">
                  <span className="text-[11px] md:text-xs font-medium text-gray-500">
                    Today
                  </span>
                </div>

                {/* API Message History */}
                <div className="flex flex-col gap-1.5 md:gap-2">
                  {displayMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${
                        msg.sender === "me" ? "justify-end mt-3 md:mt-4" : "justify-start"
                      }`}
                    >
                      {/* Avatar Placeholder for alignment or actual Avatar */}
                      {msg.sender === "them" && (
                        <div className="w-7 h-7 md:w-8 md:h-8 shrink-0">
                          {msg.showAvatar && (
                            <img
                              src={activeContact?.avatar}
                              alt="Avatar"
                              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
                            />
                          )}
                        </div>
                      )}

                      <div className="flex flex-col gap-1 max-w-[75%] md:max-w-[70%]">
                        {msg.sender === "me" && msg.time && (
                          <div className="text-[10px] md:text-xs text-gray-400 text-right mb-0.5 md:mb-1">
                            {msg.time}
                          </div>
                        )}
                        <div
                          className={`px-3.5 py-2 md:px-4 md:py-2.5 text-[14px] md:text-[15px] leading-relaxed ${msg.radiusClass} ${
                            msg.sender === "me"
                              ? "bg-[#EAEBFC] text-[#111827]"
                              : "bg-[#F3F4F6] text-[#111827]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Area (Fixed at bottom) */}
          {activeContact && (
            <div className="p-4 mb-14 md:mb-0 md:p-6 pt-2 md:pt-2 shrink-0 bg-white z-10 border-t border-gray-50 md:border-transparent pb-safe">
              <div className="relative flex items-center max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-5 md:pl-6 pr-12 md:pr-14 py-3 md:py-4 bg-white border border-gray-200 rounded-full text-[14px] md:text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
                />
                {/* Send Button (Only visible when typing) */}
                {isTyping && (
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-1.5 md:right-2.5 p-1.5 md:p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <Send size={16} className="ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}