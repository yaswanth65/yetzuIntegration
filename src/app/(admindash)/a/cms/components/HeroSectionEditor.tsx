import React from "react";
import { TextField, ImageUpload, StatsField } from "./CMSField";

interface HeroSectionData {
  topMessage: string;
  heading: string;
  subheading: string;
  heroImage: string;
  stats: Array<{ num: string; label: string }>;
  avatar1: string;
  avatar2: string;
  avatar3: string;
}

export function HeroSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Top Message */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Message</h3>
        <TextField label="Content" value="150+ Students Enrolled" onChange={() => {}} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ImageUpload label="Avatar 1" dimensions="32 x 32" />
          <ImageUpload label="Avatar 2" dimensions="32 x 32" />
          <ImageUpload label="Avatar 3" dimensions="32 x 32" />
        </div>
      </section>

      {/* Main Message */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Main Message</h3>
        <TextField
          label="Heading (Mobile & Desktop)"
          value="Your Ultimate Academic Mentorship & Learning Ecosystem"
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Sub-heading"
          value="Unlock Your Potential with Personalized Mentorship, Milestone Based Assignments, and Expert Academic Support-All in One Intuitive Platform."
          onChange={() => {}}
          multiline
        />
        <ImageUpload label="Hero Image" dimensions="1100 x 600" />
      </section>

      {/* Stats */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Stats Section</h3>
        <StatsField
          items={[
            { num: "200+", label: "Community Members" },
            { num: "24+", label: "Institutes Affiliated" },
            { num: "30k+", label: "Mentorship Hours" },
            { num: "100+", label: "Students Mentored" },
          ]}
          onChange={() => {}}
        />
      </section>
    </div>
  );
}
