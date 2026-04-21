import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import StatCards from './components/StatCards';
import AgendaCalendar from './components/AgendaCalendar';
import AlertsNotifs from './components/AlertsNotifs';
import PendingAssignments from './components/PendingAssignments';

export default function EducatorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6 lg:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <DashboardHeader />
        
        <div className="border-t border-gray-100 mb-8 pt-8">
            <StatCards />
        </div>
        
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-[16px] font-bold text-gray-900 mb-4 px-1">Today's Agenda</h2>
            <AgendaCalendar />
          </div>
          
          <AlertsNotifs />
        </div>
        
        <PendingAssignments />
      </div>
    </div>
  );
}
