import React from 'react';
import OrganizationHeader from './components/OrganizationHeader';
import StatCards from './components/StatCards';
import OrganizationGrowthChart from './components/OrganizationGrowthChart';
import AlertsAndIssues from './components/AlertsAndIssues';
import TopOrganizationsTable from './components/TopOrganizationsTable';

export default function OrganizationPage() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <OrganizationHeader />
      
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <OrganizationGrowthChart />
        </div>
        <AlertsAndIssues />
      </div>
      
      <TopOrganizationsTable />
      
      <div className="pb-10" />
    </div>
  );
}
