"use client";

import React, { useState } from 'react';
import AssignmentsHeader from './components/AssignmentsHeader';
import AssignmentsStats from './components/AssignmentsStats';
import WebinarCards from './components/WebinarCards';
import CreateAssignmentFlow from './components/CreateAssignmentFlow';

export default function EducatorAssignmentsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState<{ title: string, subtitle: string } | null>(null);

  const handleCreateAssignment = (webinar: { title: string, subtitle: string }) => {
    setSelectedWebinar(webinar);
    setIsCreating(true);
  };

  const handleBackToOverview = () => {
    setIsCreating(false);
    setSelectedWebinar(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        {!isCreating ? (
          <>
            <AssignmentsHeader />
            <div className="mt-6">
              <AssignmentsStats />
            </div>
            <div className="mt-8">
              <WebinarCards onCreateAssignment={handleCreateAssignment} />
            </div>
          </>
        ) : (
          <CreateAssignmentFlow 
            webinar={selectedWebinar!} 
            onBack={handleBackToOverview} 
          />
        )}
      </div>
    </div>
  );
}
