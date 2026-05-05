import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function MeetTheBrainsEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Meet The Brains</h3>
        <TextField
          label="Heading (with highlighted word)"
          value="Meet the Brains Behind Yetzu"
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Highlighted Word (e.g. 'Brains')"
          value="Brains"
          onChange={() => {}}
        />
        <TextField
          label="Subheading"
          value="Our approach is simple — partner with passionate people, chase excellence, and make learning unforgettable."
          onChange={() => {}}
          multiline
        />
        <TextField label="Button 1 Text" value="Button" onChange={() => {}} />
        <TextField label="Button 2 Text" value="Button" onChange={() => {}} />
        <ImageUpload label="Team Image" dimensions="1200 x 700" />
      </section>
    </div>
  );
}
