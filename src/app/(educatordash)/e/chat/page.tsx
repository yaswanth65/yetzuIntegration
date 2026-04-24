"use client";

import React, { useState } from 'react';
import ChatContacts from './components/ChatContacts';
import ChatWindow from './components/ChatWindow';
import { MOCK_STUDENTS, MOCK_MESSAGES } from './mockData';
import { ChevronLeft } from 'lucide-react';

export default function EducatorChatPage() {
  const [activeContactId, setActiveContactId] = useState<string | null>(MOCK_STUDENTS[0].id);
  const [messages, setMessages] = useState<Record<string, any[]>>(MOCK_MESSAGES);
  const [showContacts, setShowContacts] = useState(true);

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

  const handleSelectContact = (id: string) => {
    setActiveContactId(id);
    setShowContacts(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(90vh)] bg-white font-sans w-full overflow-hidden md:rounded-tl-[30px] ">
      
      {/* Top Header */}
      <div className="bg-white px-4 md:px-8 py-4 md:py-5 border-b border-gray-100 flex items-center gap-3">
        {!showContacts && (
          <button 
            onClick={() => setShowContacts(true)}
            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <div>
          <h1 className="text-lg md:text-[20px] font-bold text-gray-900 leading-none md:mb-1">
            Chat
          </h1>
          <p className="hidden md:block text-[13px] font-medium text-gray-500">
            Engage directly with your 1:1 students.
          </p>
        </div>
      </div>
      
      {/* Main Chat Container */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Sidebar (Contact List) */}
        <div className={`${showContacts ? 'flex' : 'hidden'} md:flex w-full md:w-[380px] shrink-0 border-r border-gray-100`}>
          <ChatContacts 
            contacts={MOCK_STUDENTS} 
            activeContactId={activeContactId} 
            onSelectContact={handleSelectContact} 
          />
        </div>

        {/* Right Area (Chat Window) */}
        <div className={`${!showContacts ? 'flex' : 'hidden'} md:flex flex-1 h-full`}>
          <ChatWindow 
            contact={activeContact} 
            messages={activeMessages} 
            onSendMessage={handleSendMessage}
            onBack={() => setShowContacts(true)}
          />
        </div>
        
      </div>
    </div>
  );
}
