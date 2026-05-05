import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function CoursesHeroEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Courses Hero</h3>
        <TextField label="Heading" value="Choose your Ideal Course" onChange={() => {}} multiline />
        <TextField label="Highlighted Words (comma-separated)" value="Ideal, Course" onChange={() => {}} />
        <TextField label="Subheading" value="Explore courses tailored to your level and goals." onChange={() => {}} multiline />
        <TextField label="Button 1 Text" value="Medical" onChange={() => {}} />
        <TextField label="Button 2 Text" value="Engineering" onChange={() => {}} />
        <ImageUpload label="Hero Image" dimensions="600 x 450" />
      </section>
    </div>
  );
}
