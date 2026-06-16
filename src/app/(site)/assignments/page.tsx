import React from "react";
import PageFAQSection from "@/components/shared/PageFAQSection";
import AssignmentsHero from "./components/MeetTheBrains";
import WhyAssignmentsMatter from "./components/WhyAssignmentsMatter";
import HowItWorks from "./components/HowItWorks";
import AssignmentLifecycle from "./components/AssignmentLifecycle";
import WhatYouReceive from "./components/WhatYouReceive";
import AcademicImpact from "./components/AcademicImpact";
import RealUseCases from "./components/RealUseCases";

const page = () => {
  return (
    <div className="flex flex-col gap-4 mb-5 font-inter">
      <AssignmentsHero />
      <WhyAssignmentsMatter />
      <HowItWorks />
      <AssignmentLifecycle />
      <WhatYouReceive />
      <AcademicImpact />
      <RealUseCases />
      <PageFAQSection pageKey="assignments" />
    </div>
  );
};

export default page;
