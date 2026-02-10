"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import ContentEditor from "./components/ContentEditor";

const pages = [
  "Home",
  "About Us",
  "Courses",
  "Assignments",
  "Blog",
  "Contact Us",
];

const ContentManagementPage = () => {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span>Content Management</span>
                <span>&gt;</span>
                <span className="text-gray-900 font-medium">
                  {selectedPage}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back Alan!
              </h1>
              <p className="text-gray-500 mt-1">
                Here you can edit all public pages
              </p>
            </div>
            <button className="px-6 py-2.5 bg-[#042BFD] text-white rounded-lg text-sm font-medium hover:bg-[#021DC0] transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-gray-50 min-h-screen p-4">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 mb-3">
              Menu
            </h3>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPage === page
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-5xl">
            {/* Page Selector and Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-64">
                <button
                  type="button"
                  onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 flex items-center justify-between hover:border-gray-300 transition-colors"
                >
                  <span>{selectedPage}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform ${
                      isPageDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isPageDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {pages.map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => {
                          setSelectedPage(page);
                          setIsPageDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>

            {/* Content Editor */}
            <ContentEditor selectedPage={selectedPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
