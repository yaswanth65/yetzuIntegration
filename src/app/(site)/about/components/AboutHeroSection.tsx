"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const heroImages = [
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
  "/images/Hero Section.png",
];

// Triple the images to allow seamless infinite scrolling in both directions
const displayImages = [...heroImages, ...heroImages, ...heroImages];

export default function AboutHeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef(false);

  // Initialize position to the middle set to allow scrolling left immediately
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    const timeout = setTimeout(() => {
      if (!container) return;
      const items = container.children;
      if (items.length >= heroImages.length * 2) {
        const firstItem = items[0] as HTMLElement;
        const set2FirstItem = items[heroImages.length] as HTMLElement;
        const jumpDistance = set2FirstItem.offsetLeft - firstItem.offsetLeft;
        
        container.style.scrollBehavior = "auto";
        container.scrollLeft = jumpDistance;
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 3000); // Auto scroll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isAutoScrolling.current) return;
    const container = scrollRef.current;
    const items = container.children;
    if (items.length < heroImages.length * 2) return;

    const firstItem = items[0] as HTMLElement;
    const set2FirstItem = items[heroImages.length] as HTMLElement;
    const jumpDistance = set2FirstItem.offsetLeft - firstItem.offsetLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // If we reach the very beginning, jump to the middle set
    if (container.scrollLeft <= 5) {
      isAutoScrolling.current = true;
      container.style.scrollBehavior = "auto";
      container.scrollLeft += jumpDistance;
      
      requestAnimationFrame(() => {
        isAutoScrolling.current = false;
      });
    } 
    // If we reach the end, jump back to the middle set
    else if (container.scrollLeft >= maxScroll - 5) {
      isAutoScrolling.current = true;
      container.style.scrollBehavior = "auto";
      container.scrollLeft -= jumpDistance;
      
      requestAnimationFrame(() => {
        isAutoScrolling.current = false;
      });
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // Calculate the width of one card + gap to scroll exactly one item at a time
    const items = container.children;
    if (items.length > 1) {
      const firstItem = items[0] as HTMLElement;
      const secondItem = items[1] as HTMLElement;
      const itemWidth = secondItem.offsetLeft - firstItem.offsetLeft;
      
      container.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth"
      });
    } else {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-white overflow-hidden lg:min-h-[calc(100vh-68px)]">
      {/* Main Content Container */}
      <div className="w-full h-full flex flex-col items-center lg:justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] pt-20 pb-6 md:py-14 lg:py-16">
        {/* Headings and Buttons Container */}
        <div className="w-full max-w-[884px] mx-auto mb-6 sm:mb-8 lg:mb-10">
          {/* Headings Section */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-7 lg:mb-8">
            <h1
              className="font-medium text-center w-full"
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
        <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8 relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 sm:gap-5 lg:gap-7 pb-6 scrollbar-hide snap-x snap-mandatory"
          >
            {displayImages.map((img, index) => {
              // The original colors are based on the original 6 items: indices 1, 3, 5 are blue
              const originalIndex = index % heroImages.length;
              const isBlue = originalIndex === 1 || originalIndex === 3 || originalIndex === 5;

              return (
                <div
                  key={index}
                  className="relative flex flex-col justify-end overflow-hidden flex-shrink-0 w-[calc((100vw-16px)/1.8)] sm:w-[calc((100vw-32px)/2.8)] md:w-[calc((100vw-48px)/3.8)] lg:w-[calc((100vw-64px)/4.8)] xl:w-[calc((100vw-80px)/5.8)] snap-start"
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
                    className="relative z-10 flex flex-row justify-center items-center translate-y-[-20px]"
                    style={{
                      width: "100%",
                      minHeight: "44px",
                      padding: "10px 8px",
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

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 mt-4 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Scroll left"
            >
              <FaArrowLeft className="text-gray-600 w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Scroll right"
            >
              <FaArrowRight className="text-gray-600 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
