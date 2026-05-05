import React from "react";
import { TextField, CardField, ImageUpload } from "./CMSField";

export function MentorshipSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">1:1 Mentorship Section</h3>
        <TextField
          label="Heading"
          value="1:1 Mentorship & Expert Academic Guidance"
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Subtext"
          value="Experience Personalized Coaching and Strategic Academic Support that Adapts to your Unique Goals and Challenges for Measurable Growth and Confidence."
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Button Text"
          value="Learn More"
          onChange={() => {}}
        />
        <ImageUpload label="Feature Icon" dimensions="20 x 20" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Cards</h3>
        <CardField
          items={[
            {
              title: "Customized Mentorship Sessions",
              desc: "One-on-one sessions focused on your personal academic needs and growth",
              bgColor: "bg-[#E6EAFF]",
              iconBg: "bg-[#9BAAFE]",
              titleColor: "text-[#252525]",
              descColor: "text-[#252525]",
            },
            {
              title: "Milestone Based Progress Tracking",
              desc: "Regular feedback loops track your development and keep you motivated.",
              bgColor: "bg-[#506BFE]",
              iconBg: "bg-[#E6EAFF]",
              titleColor: "text-white",
              descColor: "text-white",
            },
            {
              title: "Direct Mentor Engagement",
              desc: "Seamless communication channels for real-time support and clarifications.",
              bgColor: "bg-[#E6EAFF]",
              iconBg: "bg-[#9BAAFE]",
              titleColor: "text-[#252525]",
              descColor: "text-[#252525]",
            },
            {
              title: "Comprehensive Academic Support",
              desc: "Including assignment reviews, proofreading, and publication readiness and assistance.",
              bgColor: "bg-[#506BFE]",
              iconBg: "bg-[#E6EAFF]",
              titleColor: "text-white",
              descColor: "text-white",
            },
          ]}
          onChange={() => {}}
        />
      </section>
    </div>
  );
}
