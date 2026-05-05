import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function AssignmentWorkflowsEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Assignment Workflow Steps</h3>
        <TextField
          label="Heading"
          value="Assignments Workflow"
          onChange={() => {}}
        />
        <TextField
          label="Subheading"
          value="Experience personalized coaching and strategic academic support that adapts to your unique goals and challenges for measurable growth and confidence."
          onChange={() => {}}
          multiline
        />
        <TextField label="Button Text" value="Try it out!" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Steps (4 steps)</h3>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Step {i}</h4>
            <TextField label="Title" value={i === 1 ? "Upload" : i === 2 ? "Completion / Download" : i === 3 ? "In Review" : "Feedback And Revision"} onChange={() => {}} />
            <TextField
              label="Description"
              value={i === 1 ? "Upload your assignment and share your specific requirements with ease." : i === 2 ? "Our approach is simple — partner with passionate people, chase excellence, and make learning unforgettable." : i === 3 ? "Your assignment is being carefully reviewed by our expert mentors for quality and accuracy." : "Receive detailed feedback and request revisions to ensure it meets your expectations perfectly."}
              onChange={() => {}}
              multiline
            />
            <ImageUpload label="Image" dimensions="600 x 550" />
          </div>
        ))}
      </section>
    </div>
  );
}
