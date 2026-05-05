import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function TeamSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Team Section</h3>
        <TextField
          label="Heading"
          value="Meet the Minds Behind Your Success"
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Subheading"
          value="Our team of expert educators, doctors, and mentors bring years of clinical experience and teaching excellence to help you master every concept with clarity."
          onChange={() => {}}
          multiline
        />
        <TextField label="Button Text" value="View All" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Team Cards (6 cards)</h3>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Card {i}</h4>
            <ImageUpload label="Background Image" dimensions="395 x 501" />
            <TextField label="Badge (e.g. MBBS)" value="MBBS" onChange={() => {}} />
            <TextField label="Name" value="John Doe" onChange={() => {}} />
            <TextField label="Expertise" value="Expertise in Cardiology" onChange={() => {}} />
            <TextField
              label="Description"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              onChange={() => {}}
              multiline
            />
          </div>
        ))}
      </section>
    </div>
  );
}
