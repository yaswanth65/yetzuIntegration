import React from "react";
import { TextField } from "./CMSField";

export function VideoSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Video Section</h3>
        <TextField
          label="Heading"
          value="Lorem Ipsum Dolor Self Amet"
          onChange={() => {}}
        />
        <TextField
          label="YouTube Embed URL"
          value="https://www.youtube.com/embed/VCPGMjCW0is?rel=0&modestbranding=1"
          onChange={() => {}}
          placeholder="https://www.youtube.com/embed/..."
        />
      </section>
    </div>
  );
}
