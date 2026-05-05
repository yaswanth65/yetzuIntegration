import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function CourseCardsEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Course Cards</h3>
        <p className="text-sm text-slate-500 mb-4">Course data is fetched from backend. These are static fields for UI labels.</p>
        <TextField label="Button 1 Text" value="Button" onChange={() => {}} />
        <TextField label="Button 2 Text" value="Button" onChange={() => {}} />
        <TextField label="Empty State Title" value="Failed to load courses" onChange={() => {}} />
        <TextField label="Empty State Message" value="We couldn't fetch the courses at this time. Please try again later." onChange={() => {}} multiline />
        <TextField label="Empty State Button" value="Retry" onChange={() => {}} />
        <TextField label="No Results Message" value="No courses found" onChange={() => {}} />
      </section>
    </div>
  );
}
