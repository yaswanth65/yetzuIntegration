import React from "react";
import { TextField } from "./CMSField";

export function InitiativesSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Initiatives Section</h3>
        <TextField label="Heading" value="Initiatives" onChange={() => {}} />
        <TextField
          label="Subheading"
          value="Lorem ipsum is a free text to use whenever you want content for your design."
          onChange={() => {}}
          multiline
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Initiative Cards (4 cards)</h3>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Card {i}</h4>
            <TextField label="Year" value={`Year ${i}`} onChange={() => {}} />
            <TextField label="Title" value="Lorem ipsum dolor" onChange={() => {}} />
          </div>
        ))}
      </section>
    </div>
  );
}
