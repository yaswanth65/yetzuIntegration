import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function FounderStoryEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Founder Story</h3>
        <TextField label="Section Label" value="Founder story" onChange={() => {}} />
        <TextField
          label="Founder Name"
          value="Founder Name"
          onChange={() => {}}
        />
        <TextField
          label="Paragraph 1"
          value="Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text."
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Paragraph 2"
          value="Lorem ipsum is a free text to use whenever you want content for your design. It is a perfect placeholder text."
          onChange={() => {}}
          multiline
        />
        <ImageUpload label="Founder Image" dimensions="598 x 415" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Achievements (6 items)</h3>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <TextField label={`Achievement ${i}`} value="Achievements" onChange={() => {}} />
          </div>
        ))}
      </section>
    </div>
  );
}
