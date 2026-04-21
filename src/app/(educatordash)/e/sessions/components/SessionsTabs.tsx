import React from 'react';
import { CalendarDays, List, Settings, Hourglass } from 'lucide-react';

interface SessionsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SessionsTabs({ activeTab, onTabChange }: SessionsTabsProps) {
  const tabs = [
    { name: 'Calendar View', icon: CalendarDays },
    { name: 'Sessions List', icon: List },
    { name: 'Availability Settings', icon: Settings },
    { name: 'Blocked Time', icon: Hourglass },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-transparent">
      {/* Container holding the tabs to match the UI row */}
      <div className="flex flex-wrap p-1 gap-2 bg-white rounded-xl shadow-sm border border-gray-100 w-full md:w-auto overflow-hidden">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={idx}
              onClick={() => onTabChange(tab.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${
                isActive 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
