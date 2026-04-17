import React from "react";

const SECTIONS = [
  "Hero Section",
  "Introduction",
  "Programs",
  "1:1 Mentorship",
  "Testimonials",
  "Webinars",
  "Resources",
  "FAQs",
  "Join Now",
];

interface CMSSidebarProps {
  activeSection: string;
  onSectionSelect: (section: string) => void;
}

export function CMSSidebar({
  activeSection,
  onSectionSelect,
}: CMSSidebarProps) {
  return (
    <div className="w-56 shrink-0 flex flex-col gap-1 pr-6 border-r border-slate-100 min-h-[600px] py-2">
      {SECTIONS.map((section) => (
        <button
          key={section}
          onClick={() => onSectionSelect(section)}
          className={`flex items-center w-full px-4 py-3 text-[13px] font-semibold text-left transition-colors relative rounded-md ${
            activeSection === section
              ? "text-blue-600 bg-white"
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
  );
}
