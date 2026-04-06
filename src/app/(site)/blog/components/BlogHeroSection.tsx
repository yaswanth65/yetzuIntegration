"use client";

import MainHeading from "@/components/Typography/MainHeading";

export default function BlogHeroSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] pt-8 pb-8 md:pb-12">
      <div className="w-full max-w-[1224px] mx-auto">
        {/* Main Heading */}
        <div className="mb-3">
          <MainHeading
            text="Read Our Blogs"
            highlights={["Blogs"]}
            className="!text-left !mx-0 !max-w-none"
          />
        </div>

        {/* Subtitle */}
        <p className="text-[#7C7C7C] font-[SF Pro] text-[14px] md:text-[16px] leading-[150%] tracking-[-0.03em] text-left">
          All educational materials, course content, documentation, and tools
          and are protected by copyright.
        </p>
      </div>
    </section>
  );
}
