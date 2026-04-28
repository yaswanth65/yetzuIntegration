import React from 'react';
import Image from 'next/image';
import { Contact } from '../types';
import { Loader2, MessageSquare } from 'lucide-react';

interface ChatContactsProps {
  contacts: Contact[];
  activeContactId: string | null;
  onSelectContact: (id: string) => void;
  loading?: boolean;
}

export default function ChatContacts({ contacts, activeContactId, onSelectContact, loading }: ChatContactsProps) {
  if (loading) {
    return (
      <div className="w-full md:w-[380px] border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto h-full bg-white">
        <div className="flex flex-col items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="text-sm text-gray-500 mt-2">Loading students...</span>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="w-full md:w-[380px] border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto h-full bg-white">
        <div className="flex flex-col items-center justify-center h-48">
          <MessageSquare className="w-8 h-8 text-gray-300" />
          <span className="text-sm text-gray-500 mt-2">No students yet</span>
          <span className="text-xs text-gray-400">Students will appear here once they enroll</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[380px] border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full bg-white">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectContact(contact.id)}
          className={`flex flex-col p-4 cursor-pointer transition-colors border-l-4 ${
            activeContactId === contact.id
              ? "bg-[#FAFAFA] border-blue-600"
              : "border-transparent hover:bg-gray-50/50"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-4 shrink-0 flex items-center justify-center">
              {contact.unread && (
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </div>

            <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden border border-gray-100">
              <Image
                src={contact.avatar}
                alt={contact.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[14px] font-bold text-gray-900 truncate">
                  {contact.name}
                </h3>
                {contact.time && (
                  <span
                    className={`text-[11px] font-bold ${
                      contact.unread ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {contact.time}
                  </span>
                )}
              </div>
              <p className="text-[13px] font-medium text-gray-500 truncate pr-4">
                {contact.lastMessage}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}