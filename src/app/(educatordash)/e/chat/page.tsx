"use client";

import React, { useState } from 'react';
import ChatContacts from './components/ChatContacts';
import ChatWindow from './components/ChatWindow';
import { MOCK_STUDENTS, MOCK_MESSAGES } from './mockData';

export default function EducatorChatPage() {
  const [activeContactId, setActiveContactId] = useState<string | null>(MOCK_STUDENTS[0].id);
  const [messages, setMessages] = useState<Record<string, any[]>>(MOCK_MESSAGES);

  const activeContact = MOCK_STUDENTS.find(c => c.id === activeContactId) || null;
  const activeMessages = activeContactId ? messages[activeContactId] || [] : [];

  const handleSendMessage = (text: string) => {
    if (!activeContactId) return;
    
    const newMessage = {
      id: `m${Date.now()}`,
      sender: "me",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [activeContactId]: [...(messages[activeContactId] || []), newMessage]
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh)] bg-white font-sans max-w-[1600px] mx-auto overflow-hidden rounded-tl-[30px] border border-gray-100">
      
      {/* Top Header */}
      <div className="bg-white px-8 py-5 border-b border-gray-100">
        <h1 className="text-[20px] font-bold text-gray-900 mb-1">
          Chat
        </h1>
        <p className="text-[13px] font-medium text-gray-500">
          Engage directly with your 1:1 students.
        </p>
      </div>
      
      {/* Main Chat Container */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Contact List) */}
        <ChatContacts 
          contacts={MOCK_STUDENTS} 
          activeContactId={activeContactId} 
          onSelectContact={setActiveContactId} 
        />

        {/* Right Area (Chat Window) */}
        <ChatWindow 
          contact={activeContact} 
          messages={activeMessages} 
          onSendMessage={handleSendMessage}
        />
        
      </div>
    </div>
  );
}
