"use client";

import Button from "@/components/ui/Button";

export default function TeamSection() {
  return (
    <div className="w-full bg-gradient-to-b from-white via-[#E2E7FF] to-white">
      {/* First Section - Takes full viewport with navbar consideration */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] pt-12 md:pt-14 lg:pt-16 pb-0 md:pb-2 lg:pb-4 flex flex-col">
        <div className="max-w-[1224px] mx-auto w-full flex flex-col h-full">
          {/* Header and Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-6 lg:mb-12 gap-4 md:gap-6">
            <div className="max-w-full md:max-w-[658px]">
              <h2 className="font-inter font-medium text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] capitalize">
                Meet the Minds Behind Your Success
              </h2>
              <p className="font-sfpro font-normal text-[16px] md:text-[18px] leading-[150%] md:leading-[21px] tracking-[-0.03em] text-[#252525] mt-4">
                Our team of expert educators, doctors, and mentors bring years
                of clinical experience and teaching excellence to help you
                master every concept with clarity.
              </p>
            </div>

            <Button
              variant="primary"
              className="!w-fit px-8 !h-[48px] whitespace-nowrap"
            >
              View All
            </Button>
          </div>

          {/* First Row of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18.44px] gap-y-3 lg:gap-y-[10px] flex-1">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative w-full h-[380px] sm:h-[420px] lg:h-[501.123px] rounded-[15.734px] overflow-hidden shadow-[0_12.587px_25.174px_-9.44px_rgba(31,30,130,0.1)] transition-all duration-500 ease-in-out cursor-pointer group"
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
                        className="text-white text-[22px] lg:text-[26px] font-medium leading-[1.2] lg:leading-[31px] tracking-[-0.05em]"
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
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] pb-12 md:pb-14 lg:pb-16 pt-0 flex items-center">
        <div className="max-w-[1224px] mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18.44px] gap-y-3 lg:gap-y-[10px]">
            {[4, 5, 6].map((index) => (
              <div
                key={index}
                className="relative w-full h-[380px] sm:h-[420px] lg:h-[501.123px] rounded-[15.734px] overflow-hidden shadow-[0_12.587px_25.174px_-9.44px_rgba(31,30,130,0.1)] transition-all duration-500 ease-in-out cursor-pointer group"
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
                        className="text-white text-[22px] lg:text-[26px] font-medium leading-[1.2] lg:leading-[31px] tracking-[-0.05em]"
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
