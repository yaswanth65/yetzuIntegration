import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function PurposeBeliefSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Purpose & Belief</h3>
        <TextField label="Heading" value="Purpose & Belief" onChange={() => {}} />
        <TextField label="Subheading" value="Lorem ipsum is a free text to use whenever you want content for your design." onChange={() => {}} multiline />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Our Purpose</h3>
        <TextField label="Title" value="Our Purpose" onChange={() => {}} />
        <TextField label="Description" value="Lorem ipsum is a free text to use whenever you want content for your design." onChange={() => {}} multiline />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Core Belief</h3>
        <TextField label="Title" value="Core Belief" onChange={() => {}} />
        <TextField label="Description" value="Lorem ipsum is a free text to use whenever you want content for your design." onChange={() => {}} multiline />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Large Image</h3>
        <ImageUpload label="Image" dimensions="1440 x 400" />
      </section>
    </div>
  );
}
