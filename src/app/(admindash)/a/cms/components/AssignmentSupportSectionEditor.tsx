import React from "react";
import { TextField, ImageUpload } from "./CMSField";

export function AssignmentSupportSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Assignment Support Section</h3>
        <TextField
          label="Heading"
          value="How Yetzu Supports Your Academic Assignments"
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Button Text"
          value="Submit Now"
          onChange={() => {}}
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Card 1: Assignment Submission & Reception</h3>
        <TextField label="Title" value="Assignment Submission & Reception" onChange={() => {}} />
        <TextField label="Description" value="Students submit their assignments directly on Yetzu, initiating their academic task journey." onChange={() => {}} multiline />
        <ImageUpload label="Image" dimensions="360 x 360" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Card 2: Structured Feedback & Mentorship</h3>
        <TextField label="Title" value="Structured Feedback & Mentorship" onChange={() => {}} />
        <TextField label="Description" value="Assignments undergo detailed review including proofreading, with students engaging mentors for clarifications and targeted guidance." onChange={() => {}} multiline />
        <ImageUpload label="Image" dimensions="260 x 330" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Card 3: Progress Tracking & Finalization</h3>
        <TextField label="Title" value="Progress Tracking & Finalization" onChange={() => {}} />
        <TextField label="Description" value="Students track their assignment progress transparently, refining their work based on feedback until ready for submission." onChange={() => {}} multiline />
        <ImageUpload label="Image" dimensions="260 x 330" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Card 4: Certification & Recognition</h3>
        <TextField label="Title" value="Certification & Recognition" onChange={() => {}} />
        <TextField label="Description" value="Upon final approval, students receive official recognition or certification from Yetzu, validating their academic achievement." onChange={() => {}} multiline />
        <ImageUpload label="Image" dimensions="340 x 330" />
      </section>
    </div>
  );
}
