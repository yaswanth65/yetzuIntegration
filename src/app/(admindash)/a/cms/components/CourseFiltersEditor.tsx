import React from "react";
import { TextField } from "./CMSField";

export function CourseFiltersEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Course Filters</h3>
        <p className="text-sm text-slate-500 mb-4">Dynamic section with search, min cost, max cost filters. Pricing fetched from backend.</p>
        <TextField label="Search Placeholder" value="Search courses..." onChange={() => {}} />
        <TextField label="Min Cost Label" value="Min Price" onChange={() => {}} />
        <TextField label="Max Cost Label" value="Max Price" onChange={() => {}} />
      </section>
    </div>
  );
}
