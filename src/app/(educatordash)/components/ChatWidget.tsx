// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { 
//   X, Search, Filter, Edit, Paperclip, Smile, 
//   Image as ImageIcon, Send, ChevronDown, UserPlus,
//   ArrowLeft, Loader2
// } from "lucide-react";
// import { CHAT_LIST, MOCK_MESSAGES } from "../constants";
// import { EducatorChatAPI } from "@/lib/api";
// import useSession from "@/hooks/useSession";

// interface ChatWidgetProps {
//   onClose: () => void;
// }

// interface Student {
//   id: string;
//   name: string;
//   avatar?: string;
//   lastMessage?: string;
//   lastMessageTime?: string;
//   isOnline?: boolean;
// }

// interface Message {
//   id: string;
//   text: string;
//   sender: "me" | "them";
//   timestamp?: string;
// }

// const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
//   const { user, accessToken } = useSession();
//   const [students, setStudents] = useState<Student[]>([]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
//   const [mobileView, setMobileView] = useState<"list" | "chat">("list");
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [loadingMessages, setLoadingMessages] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const activeStudent = students.find((s) => s.id === selectedStudentId);

//   // Fetch students list
//   useEffect(() => {
//     const fetchStudents = async () => {
//       if (!accessToken || !user?.id) {
//         // Fall back to mock data
//         setStudents(CHAT_LIST.map(c => ({
//           id: String(c.id),
//           name: c.name,
//           avatar: c.avatar,
//           lastMessage: c.message,
//           lastMessageTime: c.time,
//           isOnline: true
//         })));
//         if (CHAT_LIST.length > 0) {
//           setSelectedStudentId(String(CHAT_LIST[0].id));
//         }
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await EducatorChatAPI.getStudents( );
//         if (response?.data && Array.isArray(response.data)) {
//           const mappedStudents = response.data.map((s: any) => ({
//             id: s.id || s._id || s.studentId,
//             name: s.name || s.studentName || "Unknown",
//             avatar: s.avatar || s.profileImage || `https://picsum.photos/40/40?random=${s.id}`,
//             lastMessage: s.lastMessage || "No messages yet",
//             lastMessageTime: s.lastMessageTime || "",
//             isOnline: s.isOnline ?? true
//           }));
//           setStudents(mappedStudents);
//           if (mappedStudents.length > 0) {
//             setSelectedStudentId(mappedStudents[0].id);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch students:", error);
//         // Fall back to mock data
//         setStudents(CHAT_LIST.map(c => ({
//           id: String(c.id),
//           name: c.name,
//           avatar: c.avatar,
//           lastMessage: c.message,
//           lastMessageTime: c.time,
//           isOnline: true
//         })));
//         if (CHAT_LIST.length > 0) {
//           setSelectedStudentId(String(CHAT_LIST[0].id));
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, [accessToken, user?.id]);

//   // Fetch messages when student is selected
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedStudentId || !accessToken || !user?.id) {
//         // Fall back to mock messages
//         setMessages(MOCK_MESSAGES.map(m => ({
//           id: String(m.id),
//           text: m.text,
//           sender: m.sender as "me" | "them",
//           timestamp: "13:34"
//         })));
//         return;
//       }

//       setLoadingMessages(true);
//       try {
//         const response = await EducatorChatAPI.getMessages(  selectedStudentId);
//         if (response?.data && Array.isArray(response.data)) {
//           const mappedMessages = response.data.map((m: any) => ({
//             id: m.id || m._id || String(Math.random()),
//             text: m.content || m.message || m.text,
//             sender: m.from === user.id ? "me" : "them", 
//             timestamp: m.timestamp || m.createdAt || ""
//           }));
//           setMessages(mappedMessages);
//         }
//       } catch (error) {
//         console.error("Failed to fetch messages:", error);
//         setMessages(MOCK_MESSAGES.map(m => ({
//           id: String(m.id),
//           text: m.text,
//           sender: m.sender as "me" | "them",
//           timestamp: "13:34"
//         })));
//       } finally {
//         setLoadingMessages(false);
//       }
//     };

//     fetchMessages();
//   }, [selectedStudentId, accessToken, user?.id]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSelectChat = (id: string) => {
//     setSelectedStudentId(id);
//     setMobileView("chat");
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedStudentId) return;

//     const messageText = newMessage.trim();
//     setNewMessage("");

//     // Optimistic update
//     const tempMessage: Message = {
//       id: `temp-${Date.now()}`,
//       text: messageText,
//       sender: "me",
//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     };
//     setMessages(prev => [...prev, tempMessage]);

//     if (!accessToken || !user?.id) return;

//     setSendingMessage(true);
//     try {
//       await EducatorChatAPI.sendMessage(  selectedStudentId, messageText);
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       // Remove optimistic message on error
//       setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
//     } finally {
//       setSendingMessage(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="relative w-full h-full bg-white flex overflow-hidden font-inter border-t border-gray-100">
      
//       {/* 1. LEFT SIDEBAR: Chat List */}
//       <div className={`
//         ${mobileView === "chat" ? "hidden" : "flex"} 
//         md:flex w-full md:w-[320px] border-r border-gray-100 flex-col bg-white shrink-0
//       `}>
//         <div className="p-5 flex flex-col gap-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-gray-900">Chats</h2>
//             <button onClick={onClose} className="md:hidden p-1">
//               <X size={24} />
//             </button>
//           </div>
          
//           <div className="flex gap-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Search" 
//                 className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             <button className="p-2 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50"><Filter size={18}/></button>
//           </div>

//           <div className="flex gap-2">
//             <button className="px-4 py-1.5 bg-blue-50 text-[#003FC7] rounded-lg text-xs font-bold border border-blue-100">Open</button>
//             <button className="px-4 py-1.5 text-gray-500 rounded-lg text-xs font-bold border border-gray-100 hover:bg-gray-50">Newest</button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto custom-scrollbar">
//           {loading ? (
//             <div className="flex items-center justify-center py-10">
//               <Loader2 className="animate-spin text-blue-600" size={24} />
//             </div>
//           ) : (
//             students.map((student) => (
//               <div
//                 key={student.id}
//                 onClick={() => handleSelectChat(student.id)}
//                 className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-all border-b border-gray-50 ${selectedStudentId === student.id ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
//               >
//                 <div className="relative shrink-0">
//                   <img src={student.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
//                   {student.isOnline && (
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-baseline">
//                     <h4 className="text-sm font-bold text-gray-900 truncate">{student.name}</h4>
//                     <span className="text-[10px] text-gray-400 font-medium">{student.lastMessageTime}</span>
//                   </div>
//                   <p className="text-xs text-gray-500 truncate mt-0.5">{student.lastMessage}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* 2. CENTER: Main Chat Window */}
//       <div className={`
//         ${mobileView === "list" ? "hidden" : "flex"} 
//         md:flex flex-1 flex flex-col bg-[#F9FAFB]
//       `}>
//         {/* Chat Header */}
//         <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setMobileView("list")} className="md:hidden mr-1">
//               <ArrowLeft size={24} className="text-gray-600" />
//             </button>
//             <img src={activeStudent?.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" alt="" />
//             <div>
//               <h3 className="font-bold text-sm md:text-base text-gray-900 leading-tight">{activeStudent?.name}</h3>
//               <p className="text-[10px] md:text-[11px] text-green-500 font-bold">
//                 {activeStudent?.isOnline ? "Online" : "Offline"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 md:gap-3">
//              <button 
//                 onClick={onClose}
//                 className="hidden md:flex px-4 py-2 bg-[#1e1e1e] text-white rounded-lg items-center gap-2 text-xs font-bold hover:bg-black transition-colors"
//              >
//                <X size={14} className="rotate-45" /> Close
//              </button>
//              <button className="p-2 text-gray-400 border border-gray-200 rounded-lg hover:bg-gray-50">
//                 <ChevronDown size={18}/>
//              </button>
//           </div>
//         </div>

//         {/* Messages Body */}
//         <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
//           {loadingMessages ? (
//             <div className="flex items-center justify-center h-full">
//               <Loader2 className="animate-spin text-blue-600" size={24} />
//             </div>
//           ) : (
//             messages.map((msg) => (
//               <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
//                  <div className="max-w-[85%] md:max-w-[70%] relative">
//                     <div className={`px-4 py-2 md:px-5 md:py-3 rounded-2xl text-[12px] md:text-[13px] font-medium leading-relaxed shadow-sm ${
//                       msg.sender === "me" 
//                         ? "bg-[#003FC7] text-white rounded-tr-none" 
//                         : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
//                     }`}>
//                       {msg.text}
//                     </div>
//                     <span className={`absolute -bottom-5 text-[10px] font-bold text-gray-400 ${msg.sender === "me" ? "right-0" : "left-0"}`}>
//                       {msg.timestamp || ""}
//                     </span>
//                  </div>
//               </div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0">
//           <div className="bg-white border border-gray-200 rounded-2xl p-2 md:p-3 shadow-sm focus-within:ring-1 focus-within:ring-blue-100 transition-all">
//              <textarea 
//                 placeholder="Type message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full px-2 py-1 bg-transparent text-sm resize-none outline-none min-h-[60px] md:min-h-[80px]"
//              />
//              <div className="flex items-center justify-between mt-2">
//                 <div className="flex items-center gap-3 md:gap-4 text-gray-400">
//                   <Paperclip size={18} className="cursor-pointer hover:text-[#003FC7]" />
//                   <Smile size={18} className="cursor-pointer hover:text-[#003FC7]" />
//                   <ImageIcon size={18} className="cursor-pointer hover:text-[#003FC7] hidden sm:block" />
//                 </div>
//                 <button 
//                   onClick={handleSendMessage}
//                   disabled={sendingMessage || !newMessage.trim()}
//                   className="bg-[#fb5e44] hover:bg-[#e4543d] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold transition-all shadow-md disabled:opacity-50"
//                 >
//                    {sendingMessage ? <Loader2 size={14} className="animate-spin" /> : "Send"} <Send size={14} />
//                 </button>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* 3. RIGHT PANEL: Contact Details */}
//       <div className="w-[300px] border-l border-gray-100 bg-white hidden xl:flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
//         <div className="p-6 flex flex-col gap-8">
//            <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                  <img src={activeStudent?.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
//                  <h4 className="font-bold text-sm text-gray-900">{activeStudent?.name}</h4>
//               </div>
//               <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all">
//                 <Edit size={16}/>
//               </button>
//            </div>

//            <div className="space-y-4">
//               <div className="flex justify-between items-center text-[12px]">
//                  <span className="text-gray-400 font-semibold">Channel</span>
//                  <span className="text-gray-900 font-bold">Chat</span>
//               </div>
//               <div className="flex justify-between items-center text-[12px]">
//                  <span className="text-gray-400 font-semibold">ID</span>
//                  <span className="text-gray-900 font-bold">{activeStudent?.id?.slice(0, 15) || "N/A"}</span>
//               </div>
//            </div>

//            <button className="flex items-center gap-2 text-[#003FC7] font-bold text-xs hover:underline underline-offset-4">
//              <UserPlus size={16}/> Add new attribute
//            </button>

//            <div className="pt-8 border-t border-gray-50">
//               <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Notes</h5>
//               <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 group focus-within:bg-white transition-all">
//                  <textarea placeholder="Write a note..." className="w-full bg-transparent text-xs outline-none h-24 resize-none" />
//                  <div className="flex gap-3 text-gray-300 mt-2">
//                     <Paperclip size={16} className="cursor-pointer hover:text-gray-500" />
//                     <Smile size={16} className="cursor-pointer hover:text-gray-500" />
//                  </div>
//               </div>
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWidget;
"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  X, Search, Filter, Edit, Paperclip, Smile, 
  Image as ImageIcon, Send, ChevronDown, UserPlus,
  ArrowLeft, Loader2
} from "lucide-react";
import { EducatorChatAPI } from "@/lib/api";
import useSession from "@/hooks/useSession";

interface ChatWidgetProps {
  onClose: () => void;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const { user, accessToken } = useSession();
  const [students, setStudents] = useState<Student[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeStudent = students.find((s) => s.id === selectedStudentId);

  // Fetch students list using the Educator Overview structure
  useEffect(() => {
    const fetchStudents = async () => {
      if (!accessToken) return;

      try {
        const response = await EducatorChatAPI.getStudents();
        // Mapping based on: data.activeStudent.list
        if (response?.data?.activeStudent?.list) {
          const mappedStudents = response.data.activeStudent.list.map((s: any) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            // Using a consistent placeholder if avatar isn't in API yet
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=random`,
            lastMessage: "Click to view conversation",
            lastMessageTime: "",
            isOnline: true // Defaulting to true as per API presence
          }));
          
          setStudents(mappedStudents);
          if (mappedStudents.length > 0 && !selectedStudentId) {
            setSelectedStudentId(mappedStudents[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [accessToken]);

  // Fetch messages - strict API only
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedStudentId || !accessToken) {
        setMessages([]);
        return;
      }

      setLoadingMessages(true);
      try {
        const response = await EducatorChatAPI.getMessages(selectedStudentId);
        if (response?.data && Array.isArray(response.data)) {
          const mappedMessages = response.data.map((m: any) => ({
            id: m.id || m._id,
            text: m.content || m.text,
            sender: m.senderId === user?.id ? "me" : "them", 
            timestamp: m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""
          }));
          setMessages(mappedMessages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedStudentId, accessToken, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectChat = (id: string) => {
    setSelectedStudentId(id);
    setMobileView("chat");
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedStudentId || !accessToken) return;

    const messageText = newMessage.trim();
    setNewMessage("");

    // Optimistic UI Update
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      text: messageText,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(prev => [...prev, tempMessage]);

    setSendingMessage(true);
    try {
      await EducatorChatAPI.sendMessage(selectedStudentId, messageText);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative w-full h-full bg-white flex overflow-hidden font-inter border-t border-gray-100">
      
      {/* 1. LEFT SIDEBAR: Chat List */}
      <div className={`
        ${mobileView === "chat" ? "hidden" : "flex"} 
        md:flex w-full md:w-[320px] border-r border-gray-100 flex-col bg-white shrink-0
      `}>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Chats</h2>
            <button onClick={onClose} className="md:hidden p-1"><X size={24} /></button>
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search students..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="animate-spin text-blue-600" size={24} />
              <span className="text-xs text-gray-400">Loading Students...</span>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No active students found.</div>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                onClick={() => handleSelectChat(student.id)}
                className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-all border-b border-gray-50 ${selectedStudentId === student.id ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
              >
                <div className="relative shrink-0">
                  <img src={student.avatar} className="w-10 h-10 rounded-full bg-gray-200" alt="" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{student.name}</h4>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{student.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. CENTER: Main Chat Window */}
      <div className={`
        ${mobileView === "list" ? "hidden" : "flex"} 
        md:flex flex-1 flex flex-col bg-[#F9FAFB]
      `}>
        {/* Chat Header */}
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          {activeStudent ? (
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileView("list")} className="md:hidden mr-1"><ArrowLeft size={24} /></button>
              <img src={activeStudent.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full" alt="" />
              <div>
                <h3 className="font-bold text-sm md:text-base text-gray-900 leading-tight">{activeStudent.name}</h3>
                <p className="text-[10px] text-green-500 font-bold">Active</p>
              </div>
            </div>
          ) : <div className="h-10" />}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          {loadingMessages ? (
            <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">No messages in this thread.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                 <div className="max-w-[85%] md:max-w-[70%] relative">
                    <div className={`px-4 py-2 rounded-2xl text-[13px] shadow-sm ${
                      msg.sender === "me" ? "bg-[#003FC7] text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                    <span className={`absolute -bottom-5 text-[10px] text-gray-400 ${msg.sender === "me" ? "right-0" : "left-0"}`}>
                      {msg.timestamp}
                    </span>
                 </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100">
          <div className="bg-white border border-gray-200 rounded-2xl p-2 flex flex-col gap-2">
             <textarea 
                placeholder="Type message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-2 py-1 text-sm resize-none outline-none min-h-[60px]"
             />
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400">
                  <Paperclip size={18} className="cursor-pointer hover:text-blue-600" />
                  <Smile size={18} className="cursor-pointer hover:text-blue-600" />
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !newMessage.trim() || !selectedStudentId}
                  className="bg-[#fb5e44] text-white px-5 py-2 rounded-xl flex items-center gap-2 text-xs font-bold disabled:opacity-50"
                >
                   {sendingMessage ? <Loader2 size={14} className="animate-spin" /> : "Send"} <Send size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT PANEL: Info Card */}
      <div className="w-[300px] border-l border-gray-100 bg-white hidden xl:flex flex-col p-6 gap-6 shrink-0">
         {activeStudent && (
           <>
            <div className="flex flex-col items-center text-center gap-2">
              <img src={activeStudent.avatar} className="w-20 h-20 rounded-full border-4 border-gray-50" alt="" />
              <h4 className="font-bold text-lg text-gray-900">{activeStudent.name}</h4>
              <p className="text-xs text-gray-400">{activeStudent.email}</p>
            </div>
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-medium">Student ID</span>
                <span className="text-gray-900 font-bold">{activeStudent.id.slice(0, 8)}...</span>
              </div>
            </div>
           </>
         )}
      </div>
    </div>
  );
};

export default ChatWidget;