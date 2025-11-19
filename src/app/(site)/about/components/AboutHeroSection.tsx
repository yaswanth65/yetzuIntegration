"use client";

import Image from "next/image";

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
    <section
      className="relative w-full bg-white overflow-hidden"
      style={{
        minHeight: "calc(100vh - 68px)",
      }}
    >
      {/* Main Content Container */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-14 lg:py-16">
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
              Our approach is simple — partner with passionate people, chase
              excellence, and make learning unforgettable.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-[18px] flex-wrap">
            <button
              className="flex-1 sm:flex-none transition-all hover:bg-gray-50"
              style={{
                minWidth: "auto",
                height: "44px",
                padding: "10px 20px",
                background: "#FFFFFF",
                border: "2px solid #000000",
                boxShadow: "0px 2px 4px rgba(31, 30, 130, 0.04)",
                borderRadius: "12px",
                fontFamily:
                  "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 2vw, 18px)",
                lineHeight: "21px",
                letterSpacing: "-0.03em",
                color: "#021165",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Get in Touch
            </button>

            <button
              className="flex-1 sm:flex-none transition-all hover:opacity-90"
              style={{
                minWidth: "auto",
                height: "44px",
                padding: "10px 20px",
                background: "#042BFD",
                boxShadow: "0px 2px 4px rgba(31, 30, 130, 0.04)",
                borderRadius: "12px",
                border: "none",
                fontFamily:
                  "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 2vw, 18px)",
                lineHeight: "21px",
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Join Us
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-7">
            {heroImages.map((img, index) => {
              const isBlue = index === 1 || index === 3 || index === 5;
              const isHidden = index > 1; // Hide cards 3-6 on mobile (only show first 2)

              return (
                <div
                  key={index}
                  className={`relative flex flex-col justify-end overflow-hidden ${
                    isHidden ? "hidden sm:hidden lg:flex" : ""
                  }`}
                  style={{
                    aspectRatio: "208 / 268.34",
                    width: "100%",
                    minHeight: "200px",
                    maxHeight: "400px",
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
