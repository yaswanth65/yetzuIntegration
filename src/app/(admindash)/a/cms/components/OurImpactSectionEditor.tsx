import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function OurImpactSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Our Impact</h3>
        <TextField label="Heading" value="Our Impact" onChange={() => {}} />
        <TextField label="Subheading" value="Loren ipsum is a free text to use whenever you want content for your deogn it , is is a perferct placeholder" onChange={() => {}} multiline />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Impact Cards (4 cards)</h3>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Card {i}</h4>
            <ImageUpload label="Card Image" dimensions="260 x 250" />
          </div>
        ))}
      </section>
    </div>
  );
}
