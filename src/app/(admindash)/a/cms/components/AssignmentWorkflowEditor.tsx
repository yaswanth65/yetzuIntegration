import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function AssignmentWorkflowEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Assignment Workflow Cards</h3>
        <TextField
          label="Heading"
          value="Assignments Workflow"
          onChange={() => {}}
        />
        <TextField
          label="Subheading"
          value="Experience Personalized Coaching and Strategic Academic Support that Adapts to your Unique Goals and Challenges for Measurable Growth and Confidence."
          onChange={() => {}}
          multiline
        />
        <TextField label="Button Text" value="Try it out!" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Workflow Cards (4 cards)</h3>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Card {i}</h4>
            <TextField label="Title" value="Customized Mentorship Sessions" onChange={() => {}} />
            <TextField label="Description" value="One-on-one sessions focused on your personal academic needs and growth" onChange={() => {}} multiline />
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Chip/Tags (10 items)</h3>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="inline-block mr-2 mb-2">
            <TextField label={`Tag ${i}`} value="Medical Students" onChange={() => {}} />
          </div>
        ))}
      </section>
    </div>
  );
}
