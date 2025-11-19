"use client";

import Image from "next/image";

export default function PurposeBeliefSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
            <div className="flex-1 flex flex-col gap-4 lg:gap-6">
              <h2 className="text-[32px] text-[#021165] sm:text-[40px] lg:text-5xl font-semibold mb-4">
                Purpose & Belief
              </h2>
              <p className="text-sm sm:text-base max-w-md text-gray-600">
                Lorem ipsum is a free text to use whenever you want content for
                your design.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="flex gap-3 lg:gap-4 items-start">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center flex-shrink-0 shadow-sm rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="#042BFD"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2 text-[#021165]">
                    Our Purpose
                  </h3>
                  <p className="text-sm lg:text-base max-w-xs text-gray-600">
                    Lorem ipsum is a free text to use whenever you want content
                    for your design.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 lg:gap-4 items-start">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center flex-shrink-0 shadow-sm rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#042BFD"
                      strokeWidth="2"
                    />
                    <path d="M12 6v6l4 2" stroke="#042BFD" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2 text-[#021165]">
                    Core Belief
                  </h3>
                  <p className="text-sm lg:text-base max-w-xs text-gray-600">
                    Lorem ipsum is a free text to use whenever you want content
                    for your design.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[250px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl">
            <Image
              src="/images/Hero Section.png"
              alt="Purpose large"
              width={1440}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
