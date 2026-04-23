import React, { useState } from 'react';
import Image from 'next/image';
import { Contact, Message } from '../types';
import { Link2, MessageSquareMore } from 'lucide-react';

interface ChatWindowProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({ contact, messages, onSendMessage }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');

  if (!contact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white text-center h-full">
        <p className="text-[15px] font-medium text-gray-500">Select an educator to start chatting</p>
      </div>
    );
  }

  const isEmptyChat = messages.length === 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim()) {
      e.preventDefault();
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full relative">
      
      {/* Chat Header */}
      <div className="px-6 py-4 flex items-center gap-6 shrink-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-100 shrink-0">
            <Image
              src={contact.avatar}
              alt={contact.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-gray-900 leading-tight">
              {contact.name}
            </h2>
            <p className="text-[12px] font-medium text-gray-500">
              {contact.studentId}
            </p>
          </div>
        </div>

        {/* Webinar Pill */}
        {contact.sessionName && (
          <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-[16px] px-4 py-2 border border-gray-100">
            <Link2 size={14} className="text-gray-400 shrink-0" />
            <p className="text-[12px] font-medium text-gray-600 truncate max-w-[300px]">
              {contact.sessionName}
            </p>
          </div>
        )}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {isEmptyChat ? (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#EAEAFF] rounded-[22px] flex items-center justify-center mb-5">
              <MessageSquareMore size={28} className="text-blue-600" />
            </div>
            <p className="text-[14px] font-medium text-gray-500">
              Start a conversation with {contact.name}
            </p>
          </div>
        ) : (
          // Active Chat State
          <div className="flex flex-col w-full pb-4 px-6 pt-2">
            <div className="text-center mb-8 mt-4">
              <span className="text-[11px] font-bold text-gray-900 bg-white px-2">
                Today
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.time && msg.sender !== "me" && (
                    <div className="text-[10px] font-bold text-gray-400 text-left mb-2 pl-11">
                      {msg.time}
                    </div>
                  )}

                  <div className={`flex items-end ${msg.sender === "me" ? "justify-end mb-4" : "justify-start mb-1"}`}>
                    
                    {/* Receiver Avatar */}
                    {msg.sender === "them" && (
                      <div className="shrink-0 flex items-end">
                        {msg.showAvatar ? (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                            <Image
                              src={contact.avatar}
                              alt="Avatar"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8" />
                        )}
                      </div>
                    )}

                    <div className={`flex flex-col gap-1 max-w-[70%]`}>
                      <div
                        className={`px-5 py-3 ${
                          msg.sender === "me"
                            ? "bg-[#EAEAFF] text-[#000520] rounded-[20px] rounded-br-sm"
                            : "bg-[#F8FAFC] text-gray-800 rounded-[20px] rounded-bl-sm"
                        } text-[13px] font-medium leading-[1.6]`}
                      >
                        {msg.content}
                      </div>

                      {msg.sender === "me" && msg.time && (
                        <div className="text-[10px] font-bold text-gray-400 text-right mt-1">
                          {msg.time}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="p-6 pt-2 shrink-0 bg-white z-10">
        <div className="relative flex items-center mx-auto">
          <input
            type="text"
            placeholder="Type a message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-6 pr-6 py-4 bg-white border border-gray-200 rounded-[24px] text-[13px] font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:font-medium"
          />
        </div>
      </div>

    </div>
  );
}
