"use client";

import React, { useEffect, useState } from 'react';
import ChatContacts from './components/ChatContacts';
import ChatWindow from './components/ChatWindow';
import { ChevronLeft, Search, Loader2, X } from 'lucide-react';
import { EducatorChatAPI, asArray } from '@/lib/api';
import { Contact, Message } from './types';

export default function EducatorChatPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [showContacts, setShowContacts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await EducatorChatAPI.getStudents();
        const apiStudents = asArray(response).map((item: any, index: number) => {
          const id = item.id || item._id || item.userId || item.studentId || String(index);
          const name = item.name || item.Name || item.studentName || "Student";
          return {
            id,
            name,
            studentId: item.studentId || item.userId || id,
            avatar: item.avatar || item.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=042BFD&color=fff`,
            lastMessage: item.lastMessage || item.message || "Start a conversation",
            time: item.time || item.updatedAt || "",
            unread: Boolean(item.unread || item.isUnread),
            sessionName: item.sessionName || item.courseTitle || "",
          };
        });
        
        if (apiStudents.length > 0) {
          setContacts(apiStudents);
          setFilteredContacts(apiStudents);
          setActiveContactId(apiStudents[0].id);
        }
      } catch {
        setContacts([]);
        setFilteredContacts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredContacts(contacts.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.lastMessage.toLowerCase().includes(query)
      ));
    }
  }, [searchQuery, contacts]);

  useEffect(() => {
    if (!activeContactId) return;
    const fetchMessages = async () => {
      try {
        const response = await EducatorChatAPI.getMessages(activeContactId);
        const apiMessages: Message[] = asArray(response).map((item: any, index: number) => ({
          id: item.id || item._id || `msg-${index}`,
          sender: item.sender === "me" || item.from === "me" || item.isMine ? "me" as const : "them" as const,
          content: item.content || item.message || item.text || "",
          time: item.time || item.createdAt || "",
          showAvatar: item.showAvatar ?? true,
        }));
        setMessages((prev) => ({ ...prev, [activeContactId]: apiMessages }));
      } catch {
        setMessages((prev) => ({ ...prev, [activeContactId]: [] }));
      }
    };
    fetchMessages();
  }, [activeContactId]);

  const activeContact = contacts.find(c => c.id === activeContactId) || null;
  const activeMessages = activeContactId ? messages[activeContactId] || [] : [];

  const handleSendMessage = async (text: string) => {
    if (!activeContactId || !text.trim() || sending) return;
    
    setSending(true);
    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: "me" as const,
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [activeContactId]: [...(messages[activeContactId] || []), newMessage]
    });
    
    try {
      await EducatorChatAPI.sendMessage(activeContactId, text);
    } catch {
      setMessages((prev) => ({
        ...prev,
        [activeContactId]: (prev[activeContactId] || []).filter((message) => message.id !== newMessage.id),
      }));
    } finally {
      setSending(false);
    }
  };

  const handleSelectContact = (id: string) => {
    setActiveContactId(id);
    setShowContacts(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(90vh)] bg-white font-sans w-full overflow-hidden md:rounded-tl-[30px] ">
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
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className={`${showContacts ? 'flex' : 'hidden'} md:flex w-full md:w-[380px] shrink-0 border-r border-gray-100`}>
          <div className="w-full flex flex-col h-full bg-white">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
            <ChatContacts 
              contacts={filteredContacts} 
              activeContactId={activeContactId} 
              onSelectContact={handleSelectContact}
              loading={loading}
            />
          </div>
        </div>

        <div className={`${!showContacts ? 'flex' : 'hidden'} md:flex flex-1 h-full`}>
          <ChatWindow 
            contact={activeContact} 
            messages={activeMessages} 
            onSendMessage={handleSendMessage}
            sending={sending}
            onBack={() => setShowContacts(true)}
          />
        </div>
      </div>
    </div>
  );
}
