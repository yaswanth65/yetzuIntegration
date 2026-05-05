"use client";

import { useState, useEffect, useRef } from "react";

interface Section {
  img?: string;
  title: string;
  description: string;
  button?: { label: string; link: string };
}

interface BlogContentSectionProps {
  sections?: Section[];
  content?: string;
}

export default function BlogContentSection({
  sections,
  content,
}: BlogContentSectionProps) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // If no sections, fall back to rendering content only
  const hasSections = sections && sections.length > 0;

  useEffect(() => {
    if (!hasSections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0.1,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [hasSections, sections]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
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

  // If no sections, render simple content view
  if (!hasSections) {
    return (
      <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 md:py-12">
        <div className="w-full max-w-[1224px] mx-auto">
          <div className="bg-white border border-[#E0E0E0] rounded-[16px] p-8 md:p-12">
            <p className="text-[#252525] text-[14px] md:text-[16px] leading-[1.8] tracking-[-0.02em] whitespace-pre-line">
              {content}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 md:py-12">
      <div className="w-full max-w-[1224px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Table of Contents */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white border border-[#E0E0E0] rounded-[16px] p-6">
                <nav className="space-y-2">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(index)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeSection === index
                          ? "bg-[#042BFD] text-white font-semibold"
                          : "text-[#252525] hover:bg-[#E6EAFF] font-medium"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-[#E0E0E0] rounded-[16px] p-8 md:p-12">
              {sections.map((section, index) => (
                <div
                  key={index}
                  id={`section-${index}`}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className="mb-12 scroll-mt-24"
                >
                  {section.img && (
                    <div className="w-full h-[400px] relative mb-6 rounded-[16px] overflow-hidden">
                      <img
                        src={section.img}
                        alt={section.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <h2 className="font-inter font-bold text-[28px] md:text-[36px] leading-[1.3] tracking-[-0.03em] text-[#252525] mb-6">
                    {section.title}
                  </h2>
                  <p className="text-[#252525] text-[14px] md:text-[16px] leading-[1.8] tracking-[-0.02em]">
                    {section.description}
                  </p>
                  {section.button && section.button.label && (
                    <div className="mt-4">
                      <a
                        href={section.button.link || "#"}
                        className="inline-block px-6 py-3 bg-[#042BFD] text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {section.button.label}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
