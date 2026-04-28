"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link2, Send, MessageSquareMore, ArrowLeft, Search, Mic, MoreVertical } from "lucide-react";
import { StudentAPI, asArray } from "@/lib/api";
import Cookies from "js-cookie";

export default function ChatPage() {
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [showMobileList, setShowMobileList] = useState(true);
  const [educators, setEducators] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    setCurrentUserId(Cookies.get("userId") || "");
  }, []);

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const response = await StudentAPI.getChatEducators();
        const apiEducators = asArray(response).map((item: any, index: number) => {
          const id = item.id || item._id || item.userId || item.educatorId || String(index);
          const name = item.name || item.Name || item.educatorName || "Educator";
          return {
            id,
            name,
            avatar: item.avatar || item.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=042BFD&color=fff`,
            lastMessage: item.lastMessage || item.message || "Start a conversation",
            time: item.time || item.updatedAt || item.createdAt || "",
            unread: Boolean(item.unread || item.isUnread),
            title: item.title || item.designation || item.role || "Educator",
            sessionName: item.sessionName || item.courseTitle || "",
          };
        });
        if (apiEducators.length > 0) {
          setEducators(apiEducators);
          setActiveContactId(apiEducators[0].id);
          return;
        }
      } catch {
        setEducators([]);
      }
    };

    fetchEducators();
  }, []);

useEffect(() => {
    if (!activeContactId) return;

    const fetchMessages = async () => {
      try {
        const response = await StudentAPI.getChatMessages(activeContactId);
        const rawMessages = asArray(response);
        
        const apiMessages = rawMessages.map((item: any, index: number) => {
          const messageFrom = item.from || "";
          const isFromMe = messageFrom === currentUserId;
          return {
            id: item.id || item._id || "msg-" + index,
            from: isFromMe ? "me" : "educator",
            content: item.content || item.message || item.text || "",
            timestamp: item.timestamp || item.createdAt || item.time || new Date().toISOString(),
          };
        });
        setMessages(apiMessages);
      } catch {
        setMessages([]);
      }
    };

    fetchMessages();
  }, [activeContactId, currentUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeContactId) return;
    
    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      from: "me",
      content: inputText,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
    try {
      await StudentAPI.sendChatMessage(activeContactId, newMessage.content);
    } catch {
      setMessages((current) => current.filter((message) => message.id !== newMessage.id));
    }
  };

  const activeContact = educators.find((e) => e.id === activeContactId);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden font-['Inter']">
      <div className="flex h-full">
        {/* --- Sidebar: Contacts --- */}
        <div className={`w-full md:w-[380px] flex flex-col border-r border-gray-100 h-full ${showMobileList ? 'flex' : 'hidden md:flex'}`}>
          <div className="p-6 border-b border-gray-50 bg-white">
            <h1 className="text-2xl font-bold text-[#021165] mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search mentors..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {educators.map((educator) => (
              <button
                key={educator.id}
                onClick={() => {
                  setActiveContactId(educator.id);
                  setShowMobileList(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activeContactId === educator.id 
                    ? "bg-blue-50/50 shadow-sm" 
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={educator.avatar} alt={educator.name} className="w-full h-full object-cover" />
                  </div>
                  {educator.unread && (
                    <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className={`text-sm font-bold truncate ${activeContactId === educator.id ? "text-[#021165]" : "text-gray-900"}`}>
                      {educator.name}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium">{educator.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate leading-relaxed">
                    {educator.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* --- Chat Window --- */}
        <div className={`flex-1 flex flex-col bg-[#F9FAFB]/30 h-full relative ${!showMobileList ? 'flex' : 'hidden md:flex'}`}>
          {activeContact ? (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <button onClick={() => setShowMobileList(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-gray-600" />
                  </button>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                    <img src={activeContact.avatar} alt={activeContact.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-gray-900 truncate">{activeContact.name}</h2>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Now</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeContact.sessionName && (
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                      <Link2 size={14} className="text-blue-500" />
                      <span className="text-[11px] font-bold text-gray-500 truncate max-w-[200px]">{activeContact.sessionName}</span>
                    </div>
                  )}
                  <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 grayscale">
                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-4">
                      <MessageSquareMore size={32} className="text-blue-600" />
                    </div>
                    <p className="text-sm font-bold text-[#021165]">Start the conversation</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Send a message to Dr. {activeContact.name.split(' ')[1]}</p>
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const isMe = msg.from === "me";
                    const isLast = i === messages.length - 1;
                    return (
                      <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] px-4 py-3 shadow-sm ${
                          isMe 
                            ? "bg-[#021165] text-white rounded-[20px] rounded-tr-none" 
                            : "bg-white text-gray-800 rounded-[20px] rounded-tl-none border border-gray-100"
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        <span className={`text-[10px] text-gray-400 mt-1.5 font-bold px-1 uppercase tracking-tighter ${isMe ? "mr-1" : "ml-1"}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-50 shrink-0">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                  <div className="flex-1 bg-gray-50 rounded-2xl flex items-center px-4 py-2 border border-gray-100 group focus-within:border-blue-200 transition-all">
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <Mic size={20} />
                    </button>
                    <input 
                      type="text" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Share your thoughts..." 
                      className="w-full bg-transparent border-none outline-none text-sm py-2 px-2 text-gray-700 font-medium placeholder-gray-400"
                    />
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <Link2 size={20} />
                    </button>
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="w-12 h-12 bg-[#042BFD] text-white rounded-2xl flex items-center justify-center hover:bg-[#0325D7] active:scale-95 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gray-50/50">
              <div className="w-24 h-24 bg-white rounded-[40px] flex items-center justify-center mb-8 shadow-xl shadow-gray-200/50">
                <MessageSquareMore size={40} className="text-[#021165]/20" />
              </div>
              <h2 className="text-xl font-bold text-[#021165] mb-2">Your Conversations</h2>
              <p className="text-sm text-gray-500 max-w-sm">Select a mentor from the list to view your chat history and start collaborating.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
