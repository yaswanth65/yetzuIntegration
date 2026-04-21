"use client";

import React, { useState } from 'react';
import SessionsHeader from './components/SessionsHeader';
import SessionsTabs from './components/SessionsTabs';
import CalendarView from './components/CalendarView';
import SessionsList from './components/SessionsList';
import AvailabilitySettings from './components/AvailabilitySettings';
import BlockedTime from './components/BlockedTime';

export default function EducatorSessionsPage() {
  const [activeTab, setActiveTab] = useState('Sessions List'); // Set to default 'Sessions List' based on user image, or standard first tab.

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Calendar View':
        return <CalendarView />;
      case 'Sessions List':
        return <SessionsList />;
      case 'Availability Settings':
        return <AvailabilitySettings />;
      case 'Blocked Time':
        return <BlockedTime />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <SessionsHeader />
        <SessionsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
}
