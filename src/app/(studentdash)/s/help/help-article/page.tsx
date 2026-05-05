"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

const SIDEBAR_MENU = [
  {
    title: "Editorial Policies",
    isOpen: true,
    items: [
      { label: "Peer review policy", isActive: true },
      { label: "Ethics and misconduct policy", isActive: false },
      { label: "Ethics and misconduct policy", isActive: false },
      { label: "Ethics and misconduct policy", isActive: false },
      { label: "Ethics and misconduct policy", isActive: false },
    ],
  },
  { title: "Editorial Policies", isOpen: false, items: [] },
  { title: "Editorial Policies", isOpen: false, items: [] },
  { title: "Editorial Policies", isOpen: false, items: [] },
  { title: "Editorial Policies", isOpen: false, items: [] },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="font-sans flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0  z-3 bg-white border-b border-gray-200 px-6 md:px-10 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Support Help Center</h1>
          <p className="text-[13px] text-gray-500">Complete record of all your sessions</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
          </div>
          <input
            type="text"
            placeholder="Search by Help Article"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
          />
        </div>
      </header>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-1 w-full">
        
        {/* LEFT SIDEBAR (STICKY) */}
        <aside className="w-[280px] shrink-0 border-r border-gray-100 hidden lg:block sticky top-[89px] h-[calc(100vh-89px)] overflow-y-auto custom-scrollbar py-6">
          <div className="px-4 flex flex-col gap-1.5">
            {SIDEBAR_MENU.map((section, idx) => (
              <div key={idx} className="mb-1">
                <button className="w-full flex items-center justify-between px-3 py-2 text-gray-900 font-bold text-[13px] hover:bg-gray-50 rounded-lg transition-colors">
                  {section.title}
                  {section.isOpen ? (
                    <ChevronDown size={16} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500" />
                  )}
                </button>
                
                {section.isOpen && section.items.length > 0 && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    {section.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                          item.isActive
                            ? "bg-[#F4F4F5] text-gray-900 font-medium"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 lg:pl-12 lg:pr-16 max-w-4xl">
          
          {/* Header / Meta */}
          <div className="mb-6">
            <div className="flex items-center gap-2.5 text-[12px] mb-3">
              <span className="bg-[#EBF0FF] text-[#042BFD] font-semibold px-2 py-0.5 rounded text-[11px]">
                Version: 3.2
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-medium">Last updated: January 15, 2026</span>
            </div>
            <h1 className="text-[24px] font-bold text-gray-900 mb-1 leading-tight">
              Peer Review Policy
            </h1>
            <p className="text-[12px] text-gray-500">
              Maintained by the Global Editorial Office
            </p>
          </div>

          {/* Sections Wrapper */}
          <div className="flex flex-col gap-6">
            
            {/* Section 1 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">1. Overview</h2>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>All original research articles, review articles, and case studies undergo rigorous peer review.</li>
                <li>
                  Purpose: ensure
                  <ul className="list-[circle] pl-5 mt-1.5 space-y-1 marker:text-gray-400">
                    <li>Scientific quality</li>
                    <li>Methodological soundness</li>
                    <li>Ethical compliance</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">2. Review Process — Single-Blind Review</h2>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>Reviewers know the identity of authors.</li>
                <li>Authors do not know reviewer identities.</li>
                <li>Maintains reviewer objectivity while allowing contextual assessment.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-3">3. Timeline Standards</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-y border-gray-200">
                      <th className="py-2.5 px-2 text-[12px] font-bold text-gray-900 w-1/2">Stage</th>
                      <th className="py-2.5 px-2 text-[12px] font-bold text-gray-900">Target Duration</th>
                      <th className="py-2.5 px-2 text-[12px] font-bold text-gray-900">Maximum Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-2 text-[13px] text-gray-600">Initial screening</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">3 days</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">5 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-2 text-[13px] text-gray-600">First reviewer assignment</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">7 days</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">10 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-2 text-[13px] text-gray-600">Reviewer response</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">14 days</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">21 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                      <td className="py-3 px-2 text-[13px] text-gray-600">Editor decision</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">7 days</td>
                      <td className="py-3 px-2 text-[13px] text-gray-600">10 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">4. Reviewer Selection Criteria</h2>
              <p className="text-[13px] text-gray-600 mb-2">Reviewers are selected based on:</p>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>Expertise match — direct subject knowledge.</li>
                <li>Publication record — peer-reviewed research experience.</li>
                <li>Geographic diversity — international representation when possible.</li>
                <li>Conflict screening — no conflicts with authors or institutions.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">5. Review Quality Standards</h2>
              <p className="text-[13px] text-gray-600 mb-2">Each review must evaluate:</p>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>Originality — novelty and contribution to literature.</li>
                <li>Methodology — research design and execution.</li>
                <li>Results — clarity, accuracy, statistical validity.</li>
                <li>Ethics — compliance with ethical and reporting standards.</li>
                <li>Presentation — clarity of writing and structure.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">6. Minimum Reviewer Requirements</h2>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>At least two independent reviewers per manuscript.</li>
                <li>
                  A third reviewer may be assigned if:
                  <ul className="list-[circle] pl-5 mt-1.5 space-y-1 marker:text-gray-400">
                    <li>Reviews conflict significantly</li>
                    <li>Specialized expertise is required</li>
                    <li>Editor-in-Chief (EiC) requests additional perspective</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">7. Confidentiality</h2>
              <p className="text-[13px] text-gray-600 mb-2">Reviewers must keep confidential:</p>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>Manuscript content and findings</li>
                <li>Author identities (even if known)</li>
                <li>Editorial discussions and decisions</li>
                <li>Any privileged information obtained during review</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="border-t border-gray-200 pt-5">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">8. Reviewer Responsibilities</h2>
              <p className="text-[13px] text-gray-600 mb-2">Reviewers must:</p>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>Respond to invitations within 48 hours.</li>
                <li>Complete reviews within agreed timeframe.</li>
                <li>Declare conflicts of interest immediately.</li>
                <li>Provide constructive, evidence-based feedback.</li>
                <li>Recommend acceptance, revision, or rejection with justification.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="border-t border-gray-200 pt-5 pb-16">
              <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">9. Appeals</h2>
              <p className="text-[13px] text-gray-600 mb-2">Authors may appeal decisions due to:</p>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 mb-4 marker:text-gray-400">
                <li>Reviewer error or misunderstanding</li>
                <li>New data or clarification</li>
                <li>Procedural concerns</li>
              </ul>
              <p className="text-[13px] text-gray-600 mb-2">Appeals are reviewed by the Editor-in-Chief (EiC) and may result in:</p>
              <ul className="list-disc pl-4 text-[13px] text-gray-600 space-y-1.5 marker:text-gray-400">
                <li>Re-review</li>
                <li>Decision override</li>
              </ul>
            </section>

          </div>

        </main>
      </div>
    </div>
  );
}