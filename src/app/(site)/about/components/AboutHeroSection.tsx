"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

const heroImages = [
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
];

export default function AboutHeroSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden lg:min-h-[calc(100vh-68px)]">
      {/* Main Content Container */}
      <div className="w-full h-full flex flex-col items-center lg:justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-6 md:py-14 lg:py-16">
        {/* Headings and Buttons Container */}
        <div className="w-full max-w-[884px] mx-auto mb-6 sm:mb-8 lg:mb-10">
          {/* Headings Section */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-7 lg:mb-8">
            <h1
              className="font-semibold text-center w-full"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(32px, 5vw, 68px)",
                lineHeight: "clamp(40px, 6vw, 84px)",
                letterSpacing: "-0.04em",
                color: "#000000",
              }}
            >
              Meet the <span style={{ color: "#042BFD" }}>Brains</span> Behind
              Yetzu
            </h1>

            <p
              className="text-center w-full max-w-[560px] mx-auto px-4"
              style={{
                fontFamily:
                  "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 2vw, 18px)",
                lineHeight: "clamp(18px, 2.5vw, 21px)",
                letterSpacing: "-0.03em",
                color: "#000000",
              }}
            >
              Our approach is simple- partner with passionate people, chase
              excellence, and make learning unforgettable.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-[18px] flex-wrap">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none !w-auto !h-[44px] !border-2 !border-black"
            >
              Get in Touch
            </Button>

            <Button
              variant="primary"
              className="flex-1 sm:flex-none !w-auto !h-[44px]"
            >
              Join Us
            </Button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="w-full max-w-full lg:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden lg:overflow-visible">
          <div className="flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-x-visible gap-4 sm:gap-5 lg:gap-7 pb-6 lg:pb-0 scrollbar-hide snap-x snap-mandatory">
            {heroImages.map((img, index) => {
              const isBlue = index === 1 || index === 3 || index === 5;

              return (
                <div
                  key={index}
                  className="relative flex flex-col justify-end overflow-hidden flex-shrink-0 w-[calc((100vw-64px)/2.25)] sm:w-[calc((100vw-108px)/3.25)] lg:w-full snap-start"
                  style={{
                    aspectRatio: "208 / 268.34",
                    boxShadow:
                      "0px 11.3584px 22.7167px -8.51877px rgba(31, 30, 130, 0.1)",
                  }}
                >
                  {/* Image with gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.048) 0%, rgba(0, 0, 0, 0.1464) 36.07%, rgba(0, 0, 0, 0.24) 91.36%), url('${img}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Info Card */}
                  <div
                    className="relative z-10 flex flex-row justify-center items-center translate-y-[-20px]" // moved slightly up
                    style={{
                      width: "100%",
                      minHeight: "44px",
                      padding: "10px 8px", // slight increase for breathing space
                      background: isBlue ? "#042BFD" : "#FFFFFF",
                    }}
                  >
                    <div className="flex flex-col justify-center items-center gap-[4px]">
                      <p
                        className="whitespace-nowrap"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 700,
                          fontSize: "clamp(10px, 1.2vw, 12.78px)",
                          lineHeight: "clamp(12px, 1.4vw, 15px)",
                          letterSpacing: "-0.03em",
                          color: isBlue ? "#FFFFFF" : "#021165",
                        }}
                      >
                        Dr. Yetinder
                      </p>
                      <p
                        className="whitespace-nowrap"
                        style={{
                          fontFamily:
                            "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 400,
                          fontSize: "clamp(9px, 1.1vw, 11.36px)",
                          lineHeight: "clamp(11px, 1.3vw, 14px)",
                          letterSpacing: "-0.03em",
                          color: isBlue ? "#FFFFFF" : "#021165",
                        }}
                      >
                        Expertise in subject
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
