"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link2, Send, MessageSquareMore, ArrowLeft } from "lucide-react";
import { StudentAPI, asArray } from "@/lib/api";
import Cookies from "js-cookie";

export default function ChatPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [showMobileList, setShowMobileList] = useState(true);
  const [educators, setEducators] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserId(Cookies.get("userId") || null);
  }, []);

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const response = await StudentAPI.getChatEducators();
        const educatorList = Array.isArray(response) ? response : (response.data || response.educators || []);
        const apiEducators = asArray(educatorList).map((item: any) => {
          const id = item.id || item._id || item.educatorId;
          const name = item.name || item.educatorName || "Educator";
          return {
            id,
            name,
            avatar: item.avatar || item.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            preview: item.lastMessage || item.message || "Start a conversation...",
            time: item.time || "",
            unread: Boolean(item.unread || item.isUnread),
            title: item.title || item.designation || "Mentor",
            webinar: item.webinar || item.sessionName || "",
          };
        });
        setEducators(apiEducators);
        if (apiEducators.length > 0 && !activeContactId) {
          setActiveContactId(apiEducators[0].id);
        }
      } catch (error) {
        console.error("Failed to load educators:", error);
      }
    };

    fetchEducators();
  }, []);

  useEffect(() => {
    if (!activeContactId) return;

    const fetchMessages = async () => {
      try {
        const response = await StudentAPI.getChatMessages(activeContactId);
        const msgs = Array.isArray(response) ? response : (response.data || response.messages || []);
        setMessages(asArray(msgs));
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();
  }, [activeContactId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeContactId) return;

    try {
      await StudentAPI.sendChatMessage(activeContactId, inputText);
      setInputText("");
      const response = await StudentAPI.getChatMessages(activeContactId);
      const msgs = Array.isArray(response) ? response : (response.data || response.messages || []);
      setMessages(asArray(msgs));
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const displayContacts = educators;
  const activeContact = displayContacts.find((c) => c.id === activeContactId);
  const isTyping = inputText.trim().length > 0;
  const isEmptyChat = messages.length === 0;

  const displayMessages = messages.map((m: any, index: number, arr: any[]) => {
    const isMe = m.from === userId || m.senderId === userId || m.sender === "student" || m.role === "student";

    const nextMsg = arr[index + 1];
    const nextIsMe = nextMsg
      ? nextMsg.from === userId || nextMsg.senderId === userId || nextMsg.sender === "student" || nextMsg.role === "student"
      : null;

    const showAvatar = !isMe && (!nextMsg || nextIsMe !== isMe);

    let timeStr = m.time || "";
    if (m.createdAt || m.timestamp) {
      const dateObj = new Date(m.createdAt || m.timestamp);
      timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    return {
      id: m.id || m._id || `msg-${index}`,
      sender: isMe ? "me" : "them",
      text: m.content || m.text || "",
      time: timeStr,
      showAvatar,
    };
  });

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-white font-sans mx-auto overflow-hidden">
      <div className={`bg-white px-4 md:px-10 md:py-3 md:border-b border-gray-100 ${!showMobileList ? "hidden md:block" : "block"}`}>
        <h1 className="text-[22px] hidden md:block font-bold text-gray-900 mb-1 md:mb-2">Chat</h1>
        <p className="text-sm text-gray-500 hidden md:block">Engage directly with your 1:1 mentors.</p>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        <div className={`w-full md:w-[350px] md:border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full ${showMobileList ? "flex" : "hidden md:flex"}`}>
          {displayContacts.length > 0 ? (
            displayContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setActiveContactId(contact.id);
                  setShowMobileList(false);
                }}
                className={`flex items-center md:items-start gap-3 p-4 cursor-pointer transition-colors border-b border-gray-200 md:border-b-0 md:border-l-4 ${
                  activeContactId === contact.id
                    ? "md:bg-gray-50 md:border-[#042BFD]"
                    : "hover:bg-gray-50/50 border-b border-gray-200"
                }`}
              >
                <div className="w-2 h-full flex items-center md:items-start md:mt-4 justify-center shrink-0">
                  {contact.unread && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#042BFD] rounded-full" />}
                </div>

                <img src={contact.avatar} alt={contact.name} className="w-11 h-11 rounded-full object-cover shrink-0" />

                <div className="flex-1 min-w-0 pt-0 md:pt-0.5">
                  <div className="flex justify-between items-center mb-0.5 md:mb-1">
                    <h3 className="text-[15px] font-semibold text-gray-900 truncate">{contact.name}</h3>
                    {contact.time && (
                      <span className={`text-[11px] md:text-xs ${contact.unread ? "text-[#042BFD] font-medium" : "text-gray-400"}`}>
                        {contact.time}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-500 truncate">{contact.preview}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400 text-sm">No educators found.</div>
          )}
        </div>

        <div className={`flex-1 flex flex-col min-w-0 bg-white h-full relative ${!showMobileList ? "flex" : "hidden md:flex"}`}>
          {activeContact && (
            <div className="px-4 md:px-6 py-8 md:py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
              <div className="flex items-center gap-3 md:gap-3">
                <button onClick={() => setShowMobileList(true)} className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>

                <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0" />
                <div>
                  <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">{activeContact.name}</h2>
                  {activeContact.title && <p className="text-[12px] md:text-[13px] text-gray-500">{activeContact.title}</p>}
                </div>
              </div>

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

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col custom-scrollbar">
            {!activeContact ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-[15px] text-gray-500">Select an educator to start chatting</p>
              </div>
            ) : isEmptyChat ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#EBF0FF] rounded-2xl flex items-center justify-center mb-4">
                  <MessageSquareMore color="#042BFD" />
                </div>
                <p className="text-[14px] md:text-[15px] text-gray-500">Start a conversation with {activeContact?.name}</p>
              </div>
            ) : (
              <div className="flex flex-col max-w-3xl mx-auto w-full pb-4">
                <div className="text-center mb-4 md:mb-6">
                  <span className="text-[11px] md:text-xs font-medium text-gray-500">Today</span>
                </div>

                <div className="flex flex-col gap-1.5 md:gap-2">
                  {displayMessages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "me" ? "justify-end mt-3 md:mt-4" : "justify-start"}`}>
                      {msg.sender === "them" && (
                        <div className="w-7 h-7 md:w-8 md:h-8 shrink-0">
                          {msg.showAvatar && (
                            <img src={activeContact?.avatar} alt="Avatar" className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover" />
                          )}
                        </div>
                      )}

                      <div className="flex flex-col gap-1 max-w-[75%] md:max-w-[70%]">
                        {msg.sender === "me" && msg.time && (
                          <div className="text-[10px] md:text-xs text-gray-400 text-right mb-0.5 md:mb-1">{msg.time}</div>
                        )}
                        <div
                          className={`px-3.5 py-2 md:px-4 md:py-2.5 rounded-[20px] text-[14px] md:text-[15px] leading-relaxed ${
                            msg.sender === "me"
                              ? "bg-[#EAEBFC] text-[#111827] rounded-br-sm"
                              : "bg-[#F3F4F6] text-[#111827] rounded-bl-sm"
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
                {isTyping && (
                  <button onClick={handleSendMessage} className="absolute right-1.5 md:right-2.5 p-1.5 md:p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center">
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
