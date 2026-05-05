import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function CertificationSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Certification Section</h3>
        <TextField label="Heading" value="Get certified by Yetzu" onChange={() => {}} />
        <TextField label="Button Text" value="Learn More" onChange={() => {}} />
        <ImageUpload label="Certification Image" dimensions="600 x 400" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Steps (3 items)</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Step {i}</h4>
            <TextField label="Title" value={`Lorem ipsum is a good way to start your design Loren`} onChange={() => {}} multiline />
            <TextField label="Description" value={`Lorem ipsum is a good way to start your design Loren ipsum is a good way to start your design...`} onChange={() => {}} multiline />
          </div>
        ))}
      </section>
    </div>
  );
}
