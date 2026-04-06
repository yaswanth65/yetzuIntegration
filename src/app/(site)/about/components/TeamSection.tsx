"use client";

import Button from "@/components/ui/Button";

export default function TeamSection() {
  return (
    <div className="w-full bg-gradient-to-b from-white via-[#E2E7FF] to-white">
      {/* First Section - Takes full viewport with navbar consideration */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16 flex flex-col">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col h-full">
          {/* Header and Button */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-4 lg:gap-12 mb-6 lg:mb-12 w-full">
            <div className="w-full lg:w-[60%] flex flex-col gap-3 lg:gap-4">
              <h2
                className="text-[#021165] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.2] lg:leading-[68px] tracking-[-0.02em]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Meet the Minds Behind Your Success
              </h2>
              <p
                className="text-[#252525] text-base sm:text-[18px] font-normal leading-relaxed lg:leading-[21px] tracking-[-0.03em]"
                style={{
                  fontFamily:
                    "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Our team of expert educators, doctors, and mentors bring years
                of clinical experience and teaching excellence to help you
                master every concept with clarity.
              </p>
            </div>

            <Button
              variant="primary"
              className="!w-fit !h-[40px] px-6 !rounded-[8px] mt-4 lg:mt-0"
            >
              View All
            </Button>
          </div>

          {/* First Row of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18.44px] flex-1">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative w-full max-w-[395.706px] h-[380px] sm:h-[420px] lg:h-[501.123px] rounded-[15.734px] overflow-hidden shadow-[0_12.587px_25.174px_-9.44px_rgba(31,30,130,0.1)] transition-all duration-500 ease-in-out cursor-pointer group mx-auto"
              >
                {/* Background Image with gradient overlay - always visible */}
                <div
                  className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:opacity-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.29) 36.07%, rgba(0, 0, 0, 0.48) 91.36%), url('/images/Hero Section.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Blue overlay - fully opaque on hover */}
                <div className="absolute inset-0 bg-[#294BFD] transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-[22px] lg:p-[31px]">
                  {/* Badge */}
                  <div className="flex">
                    <div className="bg-[#294BFD] transition-all duration-500 rounded-[7px] px-[10px] py-[10px] inline-flex items-center justify-center">
                      <span
                        className="text-white text-[16px] lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        MBBS
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="flex flex-col gap-[18.881px]">
                    {/* Name and Expertise */}
                    <div className="flex flex-col gap-[1.57px]">
                      <h3
                        className="text-white text-[22px] lg:text-[26px] font-semibold leading-[1.2] lg:leading-[31px] tracking-[-0.05em]"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        John Doe
                      </h3>
                      <p
                        className="text-white text-base lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        Expertise in Cardiology
                      </p>
                    </div>

                    {/* Description - only visible on hover with subtle fade */}
                    <p
                      className="text-white text-sm lg:text-[16px] font-normal leading-[1.3] lg:leading-[19px] tracking-[-0.03em] max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden"
                      style={{
                        fontFamily:
                          "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Section - Second Row of Cards */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-[108px] pb-12 md:pb-14 lg:pb-16 pt-6 flex items-center">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18.44px]">
            {[4, 5, 6].map((index) => (
              <div
                key={index}
                className="relative w-full max-w-[395.706px] h-[380px] sm:h-[420px] lg:h-[501.123px] rounded-[15.734px] overflow-hidden shadow-[0_12.587px_25.174px_-9.44px_rgba(31,30,130,0.1)] transition-all duration-500 ease-in-out cursor-pointer group mx-auto"
              >
                {/* Background Image with gradient overlay - always visible */}
                <div
                  className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:opacity-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.29) 36.07%, rgba(0, 0, 0, 0.48) 91.36%), url('/images/Hero Section.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Blue overlay - fully opaque on hover */}
                <div className="absolute inset-0 bg-[#294BFD] transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-[22px] lg:p-[31px]">
                  {/* Badge */}
                  <div className="flex">
                    <div className="bg-[#294BFD] transition-all duration-500 rounded-[7px] px-[10px] py-[10px] inline-flex items-center justify-center">
                      <span
                        className="text-white text-[16px] lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        MBBS
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="flex flex-col gap-[18.881px]">
                    {/* Name and Expertise */}
                    <div className="flex flex-col gap-[1.57px]">
                      <h3
                        className="text-white text-[22px] lg:text-[26px] font-semibold leading-[1.2] lg:leading-[31px] tracking-[-0.05em]"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        John Doe
                      </h3>
                      <p
                        className="text-white text-base lg:text-[18px] font-normal leading-[21px] tracking-[-0.03em]"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        Expertise in Cardiology
                      </p>
                    </div>

                    {/* Description - only visible on hover with subtle fade */}
                    <p
                      className="text-white text-sm lg:text-[16px] font-normal leading-[1.3] lg:leading-[19px] tracking-[-0.03em] max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden"
                      style={{
                        fontFamily:
                          "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
