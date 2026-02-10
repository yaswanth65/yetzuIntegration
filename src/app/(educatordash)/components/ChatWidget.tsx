 "use client";

import React, { useState } from "react";
import { 
  X, Search, Filter, Edit, Paperclip, Smile, 
  Image as ImageIcon, Type, Send, ChevronDown, UserPlus,
  ArrowLeft 
} from "lucide-react";
import { CHAT_LIST, MOCK_MESSAGES } from "../constants";

interface ChatWidgetProps {
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(CHAT_LIST[0]?.id || null);
  // NEW: State to toggle between list and chat window on mobile
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const activeChat = CHAT_LIST.find((c) => c.id === selectedChatId);

  const handleSelectChat = (id: number) => {
    setSelectedChatId(id);
    setMobileView("chat");
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
            {/* Mobile close button */}
            <button onClick={onClose} className="md:hidden p-1">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50"><Filter size={18}/></button>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-blue-50 text-[#003FC7] rounded-lg text-xs font-bold border border-blue-100">Open</button>
            <button className="px-4 py-1.5 text-gray-500 rounded-lg text-xs font-bold border border-gray-100 hover:bg-gray-50">Newest</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {CHAT_LIST.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-all border-b border-gray-50 ${selectedChatId === chat.id ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{chat.name}</h4>
                  <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CENTER: Main Chat Window */}
      <div className={`
        ${mobileView === "list" ? "hidden" : "flex"} 
        md:flex flex-1 flex flex-col bg-[#F9FAFB]
      `}>
        {/* Chat Header */}
        <div className="px-4 md:px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Back Arrow for Mobile */}
            <button onClick={() => setMobileView("list")} className="md:hidden mr-1">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <img src={activeChat?.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" alt="" />
            <div>
              <h3 className="font-bold text-sm md:text-base text-gray-900 leading-tight">{activeChat?.name}</h3>
              <p className="text-[10px] md:text-[11px] text-green-500 font-bold">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
             <button 
                onClick={onClose}
                className="hidden md:flex px-4 py-2 bg-[#1e1e1e] text-white rounded-lg items-center gap-2 text-xs font-bold hover:bg-black transition-colors"
             >
               <X size={14} className="rotate-45" /> Close
             </button>
             <button className="p-2 text-gray-400 border border-gray-200 rounded-lg hover:bg-gray-50">
                <ChevronDown size={18}/>
             </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          {MOCK_MESSAGES.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
               <div className="max-w-[85%] md:max-w-[70%] relative">
                  <div className={`px-4 py-2 md:px-5 md:py-3 rounded-2xl text-[12px] md:text-[13px] font-medium leading-relaxed shadow-sm ${
                    msg.sender === "me" 
                      ? "bg-[#003FC7] text-white rounded-tr-none" 
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                  <span className={`absolute -bottom-5 text-[10px] font-bold text-gray-400 ${msg.sender === "me" ? "right-0" : "left-0"}`}>
                    13:34
                  </span>
               </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0">
          <div className="bg-white border border-gray-200 rounded-2xl p-2 md:p-3 shadow-sm focus-within:ring-1 focus-within:ring-blue-100 transition-all">
             <textarea 
                placeholder="Type message..."
                className="w-full px-2 py-1 bg-transparent text-sm resize-none outline-none min-h-[60px] md:min-h-[80px]"
             />
             <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                  <Paperclip size={18} className="cursor-pointer hover:text-[#003FC7]" />
                  <Smile size={18} className="cursor-pointer hover:text-[#003FC7]" />
                  <ImageIcon size={18} className="cursor-pointer hover:text-[#003FC7] hidden sm:block" />
                </div>
                <button className="bg-[#fb5e44] hover:bg-[#e4543d] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold transition-all shadow-md">
                   Send <Send size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT PANEL: Contact Details (Hidden on mobile and small tablets) */}
      <div className="w-[300px] border-l border-gray-100 bg-white hidden xl:flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 flex flex-col gap-8">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <img src={activeChat?.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                 <h4 className="font-bold text-sm text-gray-900">{activeChat?.name}</h4>
              </div>
              <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all">
                <Edit size={16}/>
              </button>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center text-[12px]">
                 <span className="text-gray-400 font-semibold">Channel</span>
                 <span className="text-gray-900 font-bold">WhatsAppB2B</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                 <span className="text-gray-400 font-semibold">ID</span>
                 <span className="text-gray-900 font-bold">2023113142356</span>
              </div>
              <div className="flex justify-between items-start text-[12px]">
                 <span className="text-gray-400 font-semibold">Address</span>
                 <span className="text-gray-900 font-bold text-right max-w-[150px]">5467 Richmond View, Kentucky, 43546-6636</span>
              </div>
           </div>

           <button className="flex items-center gap-2 text-[#003FC7] font-bold text-xs hover:underline underline-offset-4">
             <UserPlus size={16}/> Add new attribute
           </button>

           <div className="pt-8 border-t border-gray-50">
              <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Notes</h5>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 group focus-within:bg-white transition-all">
                 <textarea placeholder="Write a note..." className="w-full bg-transparent text-xs outline-none h-24 resize-none" />
                 <div className="flex gap-3 text-gray-300 mt-2">
                    <Paperclip size={16} className="cursor-pointer hover:text-gray-500" />
                    <Smile size={16} className="cursor-pointer hover:text-gray-500" />
                 </div>
              </div>
           </div>

           <div className="space-y-6 pt-2">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3 pb-6 border-b border-gray-50 last:border-0">
                  <img src={activeChat?.avatar} className="w-8 h-8 rounded-full flex-shrink-0" alt="" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-900 block mb-1">Justin Hickle</span>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Send Sarah an update by email by 4PM tomorrow.</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;