import React from "react";
import { TextField } from "./CMSField";

export function ContactFormEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Contact Form (Left Side)</h3>
        <TextField label="Button Text" value="Contact us" onChange={() => {}} />
        <TextField
          label="Heading"
          value="Get in touch with us"
          onChange={() => {}}
        />
        <TextField
          label="Subheading with Email"
          value="Or just reach out manually to email@yetzu.com"
          onChange={() => {}}
          multiline
        />
        <TextField label="Support Title" value="Customer Support" onChange={() => {}} />
        <TextField
          label="Support Description"
          value="Our support team is available 24/7 to help you with any questions or issues you might face."
          onChange={() => {}}
          multiline
        />
        <TextField label="Phone Number" value="+91 98765 43210" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Form Fields</h3>
        <TextField label="Full Name Placeholder" value="Enter your name" onChange={() => {}} />
        <TextField label="Email Placeholder" value="Enter your email" onChange={() => {}} />
        <TextField label="Mobile Placeholder" value="Enter your number" onChange={() => {}} />
        <TextField label="Medical School Placeholder" value="Enter your institution" onChange={() => {}} />
        <TextField label="Research Focus Options (comma-separated)" value="Cardiology, Neurology, Oncology, Public Health" onChange={() => {}} />
        <TextField label="Mentorship Needs Label" value="Describe Your Mentorship Needs *" onChange={() => {}} />
        <TextField label="Submit Button Text" value="Submit" onChange={() => {}} />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Thank You Message</h3>
        <TextField label="Success Title" value="Thank you!" onChange={() => {}} />
        <TextField label="Success Message" value="Your submission has been received successfully. Our team will contact you soon!" onChange={() => {}} multiline />
        <TextField label="Submit Another Button" value="Submit Another Response" onChange={() => {}} />
      </section>
    </div>
  );
}
