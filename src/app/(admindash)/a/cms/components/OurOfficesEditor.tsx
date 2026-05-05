import React from "react";
import { TextField } from "./CMSField";

export function OurOfficesEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Our Offices</h3>
        <TextField
          label="Heading"
          value="Our Offices"
          onChange={() => {}}
        />
        <TextField
          label="Subheading"
          value="Join a Thriving Community Dedicated to Academic Excellence Supported by Cutting-Edge Technology and Expert Mentorship."
          onChange={() => {}}
          multiline
        />
        <TextField
          label="Contact Title"
          value="Contact us"
          onChange={() => {}}
        />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Contact Info (6 items)</h3>
        {[
          { title: "Phone Number", detail: "+91 8747398748", icon: "Phone" },
          { title: "Email", detail: "hello@gmail.com", icon: "Mail" },
          { title: "Location", detail: "Lorem ipsum is free text to use", icon: "MapPin" },
          { title: "WhatsApp", detail: "+91 652365756", icon: "MessageCircle" },
          { title: "Youtube", detail: "Lorem ipsum is free text to use", icon: "Youtube" },
          { title: "Instagram", detail: "+91 652365756", icon: "Instagram" },
        ].map((item, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-lg mb-3 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">{item.title}</h4>
            <TextField label="Icon" value={item.icon} onChange={() => {}} />
            <TextField label="Detail" value={item.detail} onChange={() => {}} />
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Map</h3>
        <TextField
          label="Google Maps Embed URL"
          value="https://www.google.com/maps/embed?pb=..."
          onChange={() => {}}
          multiline
        />
      </section>
    </div>
  );
}
