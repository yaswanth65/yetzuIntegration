"use client";

import Image from "next/image";

export default function FounderStory() {
  return (
    <section className="w-full flex justify-center px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
      <div className="max-w-[1440px] w-full mx-auto text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-[46%] flex flex-col gap-6 lg:gap-8">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <p
                className="text-base sm:text-lg font-normal tracking-[-0.03em] text-[#252525]"
                style={{
                  fontFamily:
                    "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Founder story
              </p>

              <h2
                className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[40px] sm:leading-[48px] md:leading-[60px] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#252525]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Founder Name
              </h2>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <p
                  className="text-sm sm:text-base font-normal leading-relaxed tracking-[-0.03em] text-[#252525]"
                  style={{
                    fontFamily:
                      "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Lorem ipsum is a free text to use whenever you want content
                  for your design. It is a perfect placeholder text.
                </p>

                <p
                  className="text-sm sm:text-base font-normal leading-relaxed tracking-[-0.03em] text-[#252525]"
                  style={{
                    fontFamily:
                      "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Lorem ipsum is a free text to use whenever you want content
                  for your design. It is a perfect placeholder text.
                </p>
              </div>

              {/* Achievement Box */}
              <div className="w-full sm:max-w-[350px] mx-auto lg:mx-0 p-4 bg-[#EDEDED] rounded-xl">
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 7L9 16L5 12"
                          stroke="#042BFD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="text-sm sm:text-base font-normal tracking-[-0.03em] text-[#021165]"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        Achievements
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[46%]">
            <div className="w-full aspect-[598/415] overflow-hidden rounded-[20px] bg-[#EDEDED]">
              <Image
                src="/images/Hero Section.png"
                alt="Founder"
                width={598}
                height={415}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
