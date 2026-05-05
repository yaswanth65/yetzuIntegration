import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function WebinarsSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Webinars Section</h3>
        <p className="text-sm text-slate-500 mb-4">Section uses shared WebinarsSection component from components folder.</p>
        <TextField label="Heading (if any)" value="" onChange={() => {}} placeholder="Optional heading" />
      </section>
    </div>
  );
}
