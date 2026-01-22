"use client";

import React, { useState } from "react";
import { X, Mic, Send, ChevronLeft, MoreHorizontal } from "lucide-react";
import { CHAT_LIST, MOCK_MESSAGES } from "../constants";

interface ChatWidgetProps {
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const activeChat = CHAT_LIST.find((c) => c.id === selectedChatId);

  return (
    <div className="absolute top-16 right-0 w-[380px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          {selectedChatId && (
            <button
              onClick={() => setSelectedChatId(null)}
              className="mr-1 p-1 -ml-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h3 className="text-lg font-medium text-gray-800">Chat Box</h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="h-[450px] overflow-y-auto bg-white no-scrollbar">
        {!selectedChatId ? (
          // List View
          <div className="py-2">
            {CHAT_LIST.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {chat.name}
                    </h4>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Detail View
          <div className="flex flex-col h-full">
            <div className="flex-1 p-5 space-y-6 overflow-y-auto no-scrollbar">
              {MOCK_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}
                >
                  {msg.sender === "them" && (
                    <img
                      src={msg.avatar}
                      alt="Sender"
                      className="w-8 h-8 rounded-full object-cover mb-1"
                    />
                  )}
                  {msg.sender === "me" && (
                    <img
                      src={msg.avatar}
                      alt="Me"
                      className="w-8 h-8 rounded-full object-cover mb-1"
                    />
                  )}

                  <div
                    className={`max-w-[75%] px-4 py-3 text-sm rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-gray-200 text-gray-900 rounded-br-none"
                        : "bg-[#E6EAFF] text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.isTyping ? (
                      <MoreHorizontal
                        size={16}
                        className="animate-pulse text-gray-500"
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                <input
                  type="text"
                  placeholder="Type here"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />
                <button className="text-gray-400 hover:text-gray-600">
                  <Mic size={18} />
                </button>
                <button className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors ml-1">
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
