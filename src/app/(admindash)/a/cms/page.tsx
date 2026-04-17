"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Bell } from "lucide-react";
import { CMSSidebar } from "./components/CMSSidebar";
import { HeroSectionEditor } from "./components/HeroSectionEditor";
import Image from "next/image";

export default function CMSPage() {
  const [activeSection, setActiveSection] = useState("Hero Section");

  return (
    <div className="w-full flex-1 p-8 bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 mb-1">
            Content Management System
          </h1>
          <p className="text-[13px] text-slate-500">
            Review, approve, or reject new registrations from researchers, medical professionals, and organizations.
          </p>
        </div>
        <button className="px-6 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
          Update CMS
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        {/* Dropdown */}
        <div className="relative w-56">
          <select className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 font-medium">
            <option>Landing Page</option>
            <option>About Us</option>
            <option>Contact</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-10">
        <CMSSidebar 
          activeSection={activeSection} 
          onSectionSelect={setActiveSection} 
        />
        
        <div className="flex-1 max-w-4xl pt-2">
          {activeSection === "Hero Section" ? (
            <HeroSectionEditor />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 p-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              Select or build {activeSection} editor
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
