import React from "react";
import { TextField } from "./CMSField";

export function FAQSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">FAQ Section</h3>
        <TextField label="Heading" value="FAQ" onChange={() => {}} />
        <TextField label="Subheading" value="Know answers to all of your questions" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Still Have Questions Box</h3>
        <TextField label="Title" value="Still have questions?" onChange={() => {}} />
        <TextField
          label="Description"
          value="Can't find the answer to your questions? Send us an email and we'll get back to you as soon as possible."
          onChange={() => {}}
          multiline
        />
        <TextField label="Button Text" value="Ask Here" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">FAQ Items (5 items)</h3>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">FAQ {i}</h4>
            <TextField label="Question" value="Your Question goes here?" onChange={() => {}} />
            <TextField
              label="Answer"
              value="Accordion description goes here. Try to keep it under 2 lines so it looks good and minimal."
              onChange={() => {}}
              multiline
            />
          </div>
        ))}
      </section>
    </div>
  );
}
