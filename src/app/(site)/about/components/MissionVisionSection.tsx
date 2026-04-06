"use client";

import Image from "next/image";

export default function MissionVisionSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-12 lg:gap-14">
          {/* Title */}
          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.2] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#021165] text-center">
            Mission & Vision
          </h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left Image */}
            <div className="w-full h-[300px] sm:h-[380px] lg:h-[455px] rounded-[20px] overflow-hidden shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
              <Image
                src="/images/Hero Section.png"
                alt="Mission left"
                width={400}
                height={455}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle Cards */}
            <div className="flex flex-col justify-center gap-6">
              {/* Mission Card */}
              <div className="flex flex-col justify-center items-center p-8 pb-6 bg-[#E6EAFF] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                <div className="flex gap-6 w-full">
                  <div className="w-[52px] h-[52px] flex items-center justify-center flex-shrink-0 bg-white rounded-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="#252525"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="#252525"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="#252525"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[32px] leading-[39px] font-bold text-[#252525]">
                      Mission
                    </h3>
                    <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] font-normal">
                      Loren ipsum is a free text to use whenever you want
                      content for your deogn it , is is a perferct placeholder
                      text for you
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision Card */}
              <div className="flex flex-col justify-center items-center p-8 pb-6 bg-[#E6EAFF] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
                <div className="flex gap-6 w-full">
                  <div className="w-[52px] h-[52px] flex items-center justify-center flex-shrink-0 bg-white rounded-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="#252525"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#252525"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[32px] leading-[39px] font-bold text-[#252525]">
                      Vision
                    </h3>
                    <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] font-normal">
                      Loren ipsum is a free text to use whenever you want
                      content for your deogn it , is is a perferct placeholder
                      text for you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full h-[300px] sm:h-[380px] lg:h-[455px] rounded-[20px] overflow-hidden shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]">
              <Image
                src="/images/Hero Section.png"
                alt="Mission right"
                width={400}
                height={455}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
