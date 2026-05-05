import React from "react";
import { TextField } from "./CMSField";

export function BookSlotSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Book Slot Section</h3>
        <TextField
          label="Heading"
          value="Book Your Slot Today"
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Highlighted Words (comma-separated)"
          value="Book, Today"
          onChange={() => {}}
        />
        <TextField
          label="Subheading"
          value="Join a Thriving Community Dedicated to Academic Excellence Supported by Cutting-Edge Technology and Expert Mentorship."
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Button Text"
          value="Get Invested in Your Academic Success"
          onChange={() => {}}
        />
      </section>
    </div>
  );
}
