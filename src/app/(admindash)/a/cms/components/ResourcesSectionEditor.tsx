import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function ResourcesSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Resources Section</h3>
        <TextField label="Heading" value="Resources" onChange={() => {}} />
        <TextField label="Subheading" value="Access comprehensive knowledge hubs featuring learning guides, research articles, and self-paced resources to support continuous academic growth." onChange={() => {}} multiline />
        <TextField label="Button Text" value="Check the Resource" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Featured Resource</h3>
        <TextField label="Badge" value="Our Latest" onChange={() => {}} />
        <TextField label="Title" value="Lorem ipsum, can be used for free any where for anything. It is effective tool so" onChange={() => {}} multiline />
        <TextField label="Excerpt" value="Lorem ipsum, can be used for free any where for anything. It is an effective tool to solve our text-related problems..." onChange={() => {}} multiline />
        <ImageUpload label="Featured Image" dimensions="600 x 400" />
        <TextField label="Author Name" value="John Doe" onChange={() => {}} />
        <TextField label="Date" value="Saturday 9:00PM" onChange={() => {}} />
        <ImageUpload label="Author Avatar" dimensions="32 x 32" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Resource Cards (3 cards)</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-4 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Card {i}</h4>
            <TextField label="Title" value="Lorem ipsum, can be used for free any where" onChange={() => {}} />
            <TextField label="Excerpt" value="Lorem ipsum, can be used for free any where for anything..." onChange={() => {}} multiline />
            <ImageUpload label="Image" dimensions="600 x 400" />
            <TextField label="Author" value="John Doe" onChange={() => {}} />
            <TextField label="Date" value="Saturday 9:00PM" onChange={() => {}} />
            <ImageUpload label="Avatar" dimensions="32 x 32" />
          </div>
        ))}
      </section>
    </div>
  );
}
