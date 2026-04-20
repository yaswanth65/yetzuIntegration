"use client";

import React, { useState } from 'react';
import ContactHeader from './components/ContactHeader';
import ContactTable from './components/ContactTable';
import ContactDetailsModal from './components/ContactDetailsModal';

export default function ContactPage() {
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#FDFDFD] p-4 md:p-8 relative">
      <div className="max-w-[1400px] mx-auto">
        <ContactHeader />
        <ContactTable onViewClick={(contact) => setSelectedContact(contact)} />
      </div>

      <ContactDetailsModal 
        isOpen={selectedContact !== null}
        contactData={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
}
