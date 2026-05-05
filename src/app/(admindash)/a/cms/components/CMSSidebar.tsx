import React from "react";

const PAGES = [
  { label: "Home", value: "home" },
  { label: "About Us", value: "about" },
  { label: "Courses", value: "courses" },
  { label: "Assignments", value: "assignments" },
  { label: "Contact Us", value: "contact" },
];

const SECTIONS: Record<string, string[]> = {
  home: [
    "Hero Section",
    "Video Section",
    "Webinars Section",
    "1:1 Mentorship",
    "Assignment Support",
    "Testimonials",
    "Join Community",
    "Programs & Webinars",
    "Resources",
    "FAQs",
    "Trusted By Leaders",
  ],
  about: [
    "About Hero",
    "Founder Story",
    "Team Section",
    "Mission & Vision",
    "Initiatives",
    "Purpose & Belief",
    "Our Impact",
    "Trusted By Leaders",
  ],
  courses: [
    "Courses Hero",
    "Course Filters",
    "Course Cards",
    "Testimonials",
    "Certification",
    "FAQs",
    "Promo Cards",
    "Book Slot",
  ],
  assignments: [
    "Meet The Brains",
    "Assignment Workflow Steps",
    "Assignment Workflow",
    "FAQs",
  ],
  contact: [
    "Contact Form",
    "Our Offices",
    "Resource Cards",
    "FAQs",
    "Book Slot",
  ],
};

interface CMSSidebarProps {
  activePage: string;
  activeSection: string;
  onPageSelect: (page: string) => void;
  onSectionSelect: (section: string) => void;
}

export function CMSSidebar({
  activePage,
  activeSection,
  onPageSelect,
  onSectionSelect,
}: CMSSidebarProps) {
  return (
    <div className="w-64 shrink-0 flex flex-col gap-1 pr-6 border-r border-slate-100 min-h-[600px] py-2">
      {/* Page Selector */}
      <div className="mb-4 px-2">
        <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
          Page
        </label>
        <select
          value={activePage}
          onChange={(e) => onPageSelect(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-medium"
        >
          {PAGES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sections */}
      <div className="flex-1">
        {SECTIONS[activePage]?.map((section) => (
          <button
            key={section}
            onClick={() => onSectionSelect(section)}
            className={`flex items-center w-full px-4 py-3 text-[13px] font-semibold text-left transition-colors relative rounded-md ${
              activeSection === section
                ? "text-blue-600 bg-blue-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {activeSection === section && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
            )}
            {section}
          </button>
        ))}
      </div>
    </div>
  );
}
