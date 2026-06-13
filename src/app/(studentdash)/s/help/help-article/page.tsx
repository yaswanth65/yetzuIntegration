"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { HelpArticlesAPI } from "@/lib/api";

interface Article {
  id: string;
  title: string;
  category: string;
  content?: string;
}

const ARTICLE_SECTIONS: Record<string, { title: string; items: { label: string; content: string }[] }> = {
  "getting-started": {
    title: "Getting Started",
    items: [
      {
        label: "How to create an account",
        content: "Sign up using your email address. Verify your OTP and complete your profile to get started with sessions and courses.",
      },
      {
        label: "Navigating the dashboard",
        content: "Use the sidebar to access Sessions, Assignments, Certificates, Billing, and Help & Support. The top navbar shows notifications and your profile.",
      },
      {
        label: "Understanding your profile",
        content: "Your profile displays personal info, enrolled courses, and payment settings. You can edit your name, email, and phone from the profile page.",
      },
    ],
  },
  sessions: {
    title: "Sessions & Courses",
    items: [
      {
        label: "How to enroll in a session",
        content: "Browse available sessions from the Sessions page. Click on a session to view details and enroll. Payment may be required for paid sessions.",
      },
      {
        label: "Session scheduling and rescheduling",
        content: "You can request a reschedule from the session detail page. Provide a reason and proposed date. The educator will review your request.",
      },
      {
        label: "Joining a live session",
        content: "Click the meeting link from your enrolled session to join. Make sure your microphone and camera are working before joining.",
      },
    ],
  },
  assignments: {
    title: "Assignments",
    items: [
      {
        label: "How to submit an assignment",
        content: "Go to the Assignments page, open the assignment, upload your file, add an optional comment, and click Submit.",
      },
      {
        label: "Assignment deadlines and extensions",
        content: "Deadlines are shown on each assignment. Contact your educator through chat if you need an extension.",
      },
      {
        label: "Viewing feedback on submissions",
        content: "Once reviewed, feedback appears on the assignment detail page. Notifications will alert you when feedback is available.",
      },
    ],
  },
  billing: {
    title: "Billing & Payments",
    items: [
      {
        label: "How to view invoices",
        content: "Go to Billing > Invoices to see all your invoices. You can view details, download PDFs, and pay pending invoices.",
      },
      {
        label: "Payment methods accepted",
        content: "We accept Credit/Debit Cards, UPI, Net Banking, and Razorpay. All transactions are encrypted and secure.",
      },
      {
        label: "Requesting a refund",
        content: "Contact support through the Help & Support page with your invoice ID and reason for the refund request.",
      },
    ],
  },
  support: {
    title: "Support & Tickets",
    items: [
      {
        label: "How to raise a support ticket",
        content: "Go to Help & Support, click 'Open Ticket', fill in subject, description, and priority. Our team will respond to your query.",
      },
      {
        label: "Tracking ticket status",
        content: "Your tickets are listed in the Help & Support page. Statuses include Open, In Review, Resolved, and Rejected.",
      },
      {
        label: "Contacting the management office",
        content: "Use the 'Contact Management Office' option for specific inquiries regarding manuscripts, editorial matters, or administrative concerns.",
      },
    ],
  },
};

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "getting-started": true,
    sessions: false,
    assignments: false,
    billing: false,
    support: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSections = Object.entries(ARTICLE_SECTIONS)
    .map(([key, section]) => ({
      key,
      ...section,
      items: section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0 || searchQuery === "");

  const currentArticle = activeArticle
    ? Object.values(ARTICLE_SECTIONS)
        .flatMap((s) => s.items)
        .find((a) => a.label === activeArticle)
    : null;

  return (
    <div className="font-sans flex flex-col">

      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 md:px-10 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Support Help Center</h1>
          <p className="text-[13px] text-gray-500">Find answers to common questions and learn how to use the platform</p>
        </div>

        <div className="relative w-full md:w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
          />
        </div>
      </header>

      <div className="flex flex-1 w-full">
        <aside className="w-[280px] shrink-0 border-r border-gray-100 hidden lg:block sticky top-[89px] h-[calc(100vh-89px)] overflow-y-auto custom-scrollbar py-6">
          <div className="px-4 flex flex-col gap-1.5">
            {Object.entries(ARTICLE_SECTIONS).map(([key, section]) => (
              <div key={key} className="mb-1">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between px-3 py-2 text-gray-900 font-bold text-[13px] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {section.title}
                  {openSections[key] ? (
                    <ChevronDown size={16} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500" />
                  )}
                </button>

                {openSections[key] && section.items.length > 0 && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setActiveArticle(item.label)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                          activeArticle === item.label
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

        <main className="flex-1 p-6 md:p-10 lg:pl-12 lg:pr-16 max-w-4xl">
          {currentArticle ? (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-2.5 text-[12px] mb-3">
                  <span className="bg-[#EBF0FF] text-[#042BFD] font-semibold px-2 py-0.5 rounded text-[11px]">
                    Help Article
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 font-medium">Last updated: June 2026</span>
                </div>
                <h1 className="text-[24px] font-bold text-gray-900 mb-1 leading-tight">
                  {currentArticle.label}
                </h1>
              </div>

              <div className="flex flex-col gap-6">
                <section className="border-t border-gray-200 pt-5">
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    {currentArticle.content}
                  </p>
                </section>

                <section className="border-t border-gray-200 pt-5 pb-16">
                  <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">Need more help?</h2>
                  <p className="text-[13px] text-gray-600">
                    If you couldn't find the answer you're looking for, please{" "}
                    <a href="/s/help" className="text-[#042BFD] font-semibold hover:underline">
                      raise a support ticket
                    </a>{" "}
                    and our team will get back to you.
                  </p>
                </section>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EBF0FF] text-[#042BFD] flex items-center justify-center mb-6">
                <Search size={28} strokeWidth={1.5} />
              </div>
              <h2 className="text-[18px] font-bold text-gray-900 mb-2">
                {searchQuery ? "No articles found" : "Select an article"}
              </h2>
              <p className="text-[13px] text-gray-500 max-w-md">
                {searchQuery
                  ? `No results match "${searchQuery}". Try different keywords.`
                  : "Choose a topic from the sidebar to view help articles."}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}