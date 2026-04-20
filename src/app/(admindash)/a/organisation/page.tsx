import React from 'react';
import OrganizationHeader from './components/OrganizationHeader';
import StatCards from './components/StatCards';
import OrganizationGrowthChart from './components/OrganizationGrowthChart';
import AlertsAndIssues from './components/AlertsAndIssues';
import TopOrganizationsTable from './components/TopOrganizationsTable';

export default function OrganizationPage() {
  return (
    <div className="bg-gray-200 p-4 md:p-6 min-h-[calc(100vh-64px)] w-full">
      <div className="max-w-[1600px] mx-auto">
        <OrganizationHeader />
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OrganizationGrowthChart />
          <AlertsAndIssues />
        </div>
        
        <TopOrganizationsTable />
      </div>
    </div>
  );
}
