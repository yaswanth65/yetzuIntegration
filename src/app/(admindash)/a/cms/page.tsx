"use client";

import { useState } from "react";
import { Search, ChevronDown, Bell } from "lucide-react";
import { CMSSidebar } from "./components/CMSSidebar";

import { HeroSectionEditor } from "./components/HeroSectionEditor";
import { VideoSectionEditor } from "./components/VideoSectionEditor";
import { MentorshipSectionEditor } from "./components/MentorshipSectionEditor";
import { AssignmentSupportSectionEditor } from "./components/AssignmentSupportSectionEditor";
import { ResourcesSectionEditor } from "./components/ResourcesSectionEditor";
import { WebinarsSectionEditor } from "./components/WebinarsSectionEditor";
import { TestimonialsSectionEditor } from "./components/TestimonialsSectionEditor";
import { JoinCommunitySectionEditor } from "./components/JoinCommunitySectionEditor";
import { ProgramsWebinarsSectionEditor } from "./components/ProgramsWebinarsSectionEditor";
import { TrustedByLeadersEditor } from "./components/TrustedByLeadersEditor";

import { AboutHeroSectionEditor } from "./components/AboutHeroSectionEditor";
import { FounderStoryEditor } from "./components/FounderStoryEditor";
import { TeamSectionEditor } from "./components/TeamSectionEditor";
import { MissionVisionSectionEditor } from "./components/MissionVisionSectionEditor";
import { InitiativesSectionEditor } from "./components/InitiativesSectionEditor";
import { PurposeBeliefSectionEditor } from "./components/PurposeBeliefSectionEditor";
import { OurImpactSectionEditor } from "./components/OurImpactSectionEditor";

import { CoursesHeroEditor } from "./components/CoursesHeroEditor";
import { CourseFiltersEditor } from "./components/CourseFiltersEditor";
import { CourseCardsEditor } from "./components/CourseCardsEditor";
import { CertificationSectionEditor } from "./components/CertificationSectionEditor";
import { PromoCardsEditor } from "./components/PromoCardsEditor";
import { BookSlotSectionEditor } from "./components/BookSlotSectionEditor";
import { FAQSectionEditor } from "./components/FAQSectionEditor";

import { MeetTheBrainsEditor } from "./components/MeetTheBrainsEditor";
import { AssignmentWorkflowsEditor } from "./components/AssignmentWorkflowsEditor";
import { AssignmentWorkflowEditor } from "./components/AssignmentWorkflowEditor";

import { ContactFormEditor } from "./components/ContactFormEditor";
import { OurOfficesEditor } from "./components/OurOfficesEditor";
import { ContactResourceCardsEditor } from "./components/ContactResourceCardsEditor";

type EditorComponent = React.FC<{}>;

const SECTION_EDITORS: Record<string, Record<string, EditorComponent>> = {
  home: {
    "Hero Section": HeroSectionEditor,
    "Video Section": VideoSectionEditor,
    "Webinars Section": WebinarsSectionEditor,
    "1:1 Mentorship": MentorshipSectionEditor,
    "Assignment Support": AssignmentSupportSectionEditor,
    "Testimonials": TestimonialsSectionEditor,
    "Join Community": JoinCommunitySectionEditor,
    "Programs & Webinars": ProgramsWebinarsSectionEditor,
    "Resources": ResourcesSectionEditor,
    "FAQs": FAQSectionEditor,
    "Trusted By Leaders": TrustedByLeadersEditor,
  },
  about: {
    "About Hero": AboutHeroSectionEditor,
    "Founder Story": FounderStoryEditor,
    "Team Section": TeamSectionEditor,
    "Mission & Vision": MissionVisionSectionEditor,
    "Initiatives": InitiativesSectionEditor,
    "Purpose & Belief": PurposeBeliefSectionEditor,
    "Our Impact": OurImpactSectionEditor,
    "Trusted By Leaders": TrustedByLeadersEditor,
  },
  courses: {
    "Courses Hero": CoursesHeroEditor,
    "Course Filters": CourseFiltersEditor,
    "Course Cards": CourseCardsEditor,
    "Testimonials": TestimonialsSectionEditor,
    "Certification": CertificationSectionEditor,
    "FAQs": FAQSectionEditor,
    "Promo Cards": PromoCardsEditor,
    "Book Slot": BookSlotSectionEditor,
  },
  assignments: {
    "Meet The Brains": MeetTheBrainsEditor,
    "Assignment Workflow Steps": AssignmentWorkflowsEditor,
    "Assignment Workflow": AssignmentWorkflowEditor,
    "FAQs": FAQSectionEditor,
  },
  contact: {
    "Contact Form": ContactFormEditor,
    "Our Offices": OurOfficesEditor,
    "Resource Cards": ContactResourceCardsEditor,
    "FAQs": FAQSectionEditor,
    "Book Slot": BookSlotSectionEditor,
  },
};

export default function CMSPage() {
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState("Hero Section");

  const pageEditors = SECTION_EDITORS[activePage];
  const EditorComponent = pageEditors ? pageEditors[activeSection] : null;

  const handlePageSelect = (page: string) => {
    setActivePage(page);
    const firstSection = Object.keys(SECTION_EDITORS[page] || {})[0] || "";
    setActiveSection(firstSection);
  };

  return (
    <div className="w-full flex-1 p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-medium text-[#021165] sm:text-3xl md:text-4xl">
            Content Management System
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Edit and manage content for all public pages. Changes are static for now — backend integration coming later.
          </p>
        </div>
        <button className="px-6 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
          Update CMS
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        {/* Page Selector */}
        <div className="relative w-56">
          <select
            value={activePage}
            onChange={(e) => handlePageSelect(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 font-medium"
          >
            <option value="home">Home</option>
            <option value="about">About Us</option>
            <option value="courses">Courses</option>
            <option value="assignments">Assignments</option>
            <option value="contact">Contact Us</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            placeholder="Search sections..."
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-10">
        <CMSSidebar
          activePage={activePage}
          activeSection={activeSection}
          onPageSelect={handlePageSelect}
          onSectionSelect={setActiveSection}
        />

        <div className="flex-1 max-w-4xl pt-2">
          {EditorComponent ? (
            <EditorComponent />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 p-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              Select a section to edit from the sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
