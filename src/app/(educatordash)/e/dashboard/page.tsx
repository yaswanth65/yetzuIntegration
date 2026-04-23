import React from 'react';
import StatCards from './components/StatCards';
import FocusWeekly from './components/FocusWeekly';
import AssignmentsTable from './components/AssignmentsTable';

export default function EducatorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 lg:p-6 font-sans">
      <div className="max-w-[1600px] mx-auto">
        <StatCards />
        <FocusWeekly />
        <AssignmentsTable />
      </div>
    </div>
  );
}
