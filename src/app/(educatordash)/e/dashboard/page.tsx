import React from 'react';
import StatCards from './components/StatCards';
import FocusWeekly from './components/FocusWeekly';
import AssignmentsTable from './components/AssignmentsTable';

export default function EducatorDashboardPage() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <StatCards />
        <FocusWeekly />
        <AssignmentsTable />
      </div>
    </div>
  );
}
