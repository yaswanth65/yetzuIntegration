"use client";

import { useState } from "react";

interface BlogContentSectionProps {
  content: {
    overview: string;
    procedure: string;
    explanation: string;
    conclusion: string;
  };
}

export default function BlogContentSection({
  content,
}: BlogContentSectionProps) {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "procedure", label: "Procedure" },
    { id: "explanation", label: "Explanation" },
    { id: "conclusion", label: "Conclusion" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 md:py-12">
      <div className="w-full max-w-[1224px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Table of Contents */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white border border-[#E0E0E0] rounded-[16px] p-6">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-[#042BFD] text-white font-semibold"
                          : "text-[#252525] hover:bg-[#E6EAFF] font-medium"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-[#E0E0E0] rounded-[16px] p-8 md:p-12">
              {/* Overview Section */}
              <div id="overview" className="mb-12 scroll-mt-24">
                <h2 className="font-inter font-bold text-[28px] md:text-[36px] leading-[1.3] tracking-[-0.03em] text-[#252525] mb-6 text-center">
                  Overview
                </h2>
                <p className="text-[#252525] text-[14px] md:text-[16px] leading-[1.8] tracking-[-0.02em] whitespace-pre-line">
                  {content.overview}
                </p>
              </div>

              {/* Procedure Section */}
              <div id="procedure" className="mb-12 scroll-mt-24">
                <h2 className="font-inter font-bold text-[28px] md:text-[36px] leading-[1.3] tracking-[-0.03em] text-[#252525] mb-6 text-center">
                  Procedure
                </h2>
                <div className="text-[#252525] text-[14px] md:text-[16px] leading-[1.8] tracking-[-0.02em] space-y-4">
                  {content.procedure.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="mb-12">
                <div className="w-full h-[400px] bg-gradient-to-br from-[#E6EAFF] to-[#F5F7FF] rounded-[16px] flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="mx-auto mb-4 w-16 h-16 text-[#042BFD]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-[#7C7C7C] text-[14px]">
                      Image Placeholder
                    </p>
                  </div>
                </div>
              </div>

              {/* Explanation Section */}
              <div id="explanation" className="mb-12 scroll-mt-24">
                <h2 className="font-inter font-bold text-[28px] md:text-[36px] leading-[1.3] tracking-[-0.03em] text-[#252525] mb-6 text-center">
                  Explanation
                </h2>
                <p className="text-[#252525] text-[14px] md:text-[16px] leading-[1.8] tracking-[-0.02em] whitespace-pre-line">
                  {content.explanation}
                </p>
              </div>

              {/* Conclusion Section */}
              <div id="conclusion" className="scroll-mt-24">
                <h2 className="font-inter font-bold text-[28px] md:text-[36px] leading-[1.3] tracking-[-0.03em] text-[#252525] mb-6 text-center">
                  Conclusion
                </h2>
                <p className="text-[#252525] text-[14px] md:text-[16px] leading-[1.8] tracking-[-0.02em] whitespace-pre-line">
                  {content.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
