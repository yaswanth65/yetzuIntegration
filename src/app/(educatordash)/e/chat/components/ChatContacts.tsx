import React from 'react';
import Image from 'next/image';
import { Contact } from '../types';

interface ChatContactsProps {
  contacts: Contact[];
  activeContactId: string | null;
  onSelectContact: (id: string) => void;
}

export default function ChatContacts({ contacts, activeContactId, onSelectContact }: ChatContactsProps) {
  return (
    <div className="w-[380px] border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full bg-white">
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
            {/* Unread Indicator */}
            <div className="w-2 h-2 mt-4 shrink-0 flex items-center justify-center">
              {contact.unread && (
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </div>

            {/* Avatar */}
            <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden border border-gray-100">
              <Image
                src={contact.avatar}
                alt={contact.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Contact Info */}
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
