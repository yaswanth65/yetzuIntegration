import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function AboutHeroSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">About Hero Section</h3>
        <TextField
          label="Heading (with highlighted word)"
          value="Meet the Brains Behind Yetzu"
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Highlighted Word (e.g. 'Brains')"
          value="Brains"
          onChange={() => {}}
        />
        <TextField
          label="Subheading"
          value="Our approach is simple- partner with passionate people, chase excellence, and make learning unforgettable."
          onChange={() => {}}
          multiline
        />
        <TextField label="Button 1 Text" value="Get in Touch" onChange={() => {}} />
        <TextField label="Button 2 Text" value="Join Us" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Hero Cards (6 cards)</h3>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Card {i}</h4>
            <ImageUpload label="Card Image" dimensions="208 x 268" />
            <TextField label="Name" value="Dr. Yetinder" onChange={() => {}} />
            <TextField label="Expertise" value="Expertise in subject" onChange={() => {}} />
          </div>
        ))}
      </section>
    </div>
  );
}
