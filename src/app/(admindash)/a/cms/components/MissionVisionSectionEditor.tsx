import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function MissionVisionSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Mission & Vision</h3>
        <TextField label="Heading" value="Mission & Vision" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Left Image</h3>
        <ImageUpload label="Left Image" dimensions="400 x 455" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Mission Card</h3>
        <TextField label="Title" value="Mission" onChange={() => {}} />
        <TextField
          label="Description"
          value="Loren ipsum is a free text to use whenever you want content for your deogn it , is is a perferct placeholder text for you"
          onChange={() => {}}
          multiline
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Vision Card</h3>
        <TextField label="Title" value="Vision" onChange={() => {}} />
        <TextField
          label="Description"
          value="Loren ipsum is a free text to use whenever you want content for your deogn it , is is a perferct placeholder text for you"
          onChange={() => {}}
          multiline
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Right Image</h3>
        <ImageUpload label="Right Image" dimensions="400 x 455" />
      </section>
    </div>
  );
}
