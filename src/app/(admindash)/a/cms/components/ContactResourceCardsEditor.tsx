import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function ContactResourceCardsEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Resource Cards Section</h3>
        <TextField label="Heading" value="Explore our Resources" onChange={() => {}} />
        <TextField
          label="Subheading"
          value="Learn from our curated collection of materials and guides. These resources can help you master new concepts or explore advanced topics with ease."
          onChange={() => {}}
          multiline
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Resource Cards (3 cards)</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Card {i}</h4>
            <ImageUpload label="Image" dimensions="600 x 400" />
            <TextField label="Title" value="Loren ipsym, can be used for free any where" onChange={() => {}} multiline />
            <TextField label="Description" value="Loren ipsym, can be used for free any where for anything. It is effective tool to solve our text relate problems..." onChange={() => {}} multiline />
          </div>
        ))}
      </section>
    </div>
  );
}
