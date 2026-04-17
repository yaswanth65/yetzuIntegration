import React from "react";
import { UploadBox } from "./UploadBox";

export function HeroSectionEditor() {
  return (
    <div className="flex flex-col space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Top Message */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Message</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600"
            defaultValue="150+ Students Enrolled"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
            <UploadBox />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
            <UploadBox />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
            <UploadBox />
          </div>
        </div>
      </section>

      {/* Main Message */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Main Message</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Heading</label>
          <textarea 
            className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 min-h-[80px] resize-none"
            defaultValue="Your Ultimate Academic Mentorship & Learning Ecosystem"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Sub-heading</label>
          <textarea 
            className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 min-h-[80px] resize-none"
            defaultValue="Unlock Your Potential with Personalized Mentorship, Milestone-Based Assignments, and Expert Academic Support—All in One Intuitive Platform."
          />
        </div>
      </section>
    </div>
  );
}
