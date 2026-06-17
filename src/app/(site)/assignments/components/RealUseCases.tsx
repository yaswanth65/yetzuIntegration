"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const useCases = [
  {
    title: "Build Your Portfolio",
    description: "Every assignment contributes directly to a professional portfolio you can show to recruiters.",
    image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Portfolio",
  },
  {
    title: "Real-world Projects",
    description: "Tackle the same challenges faced by industry professionals every day.",
    image: "https://placehold.co/600x400/2a2a2a/ffffff?text=Projects",
  },
  {
    title: "Technical Writing",
    description: "Master the art of communicating complex technical concepts clearly and effectively.",
    image: "https://placehold.co/600x400/3a3a3a/ffffff?text=Writing",
  },
  {
    title: "Research Methodology",
    description: "Learn to conduct thorough research and synthesize findings into actionable insights.",
    image: "https://placehold.co/600x400/4a4a4a/ffffff?text=Research",
  },
];

export default function RealUseCases() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex flex-col items-center">
      <div className="w-full max-w-[1224px] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-full md:max-w-[700px]">
          <h2 className="font-inter font-medium text-[28px] md:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] mb-4 capitalize">
            Real Use Cases
          </h2>
          <p className="font-sfpro font-normal text-[15px] md:text-[18px] leading-[100%] tracking-[-0.03em] text-gray-600">
            Explore practical ways our assignment-driven learning empowers you to achieve real results.
          </p>
        </div>
        <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap bg-[#042BFD] hover:bg-[#021DC0] text-white rounded-xl">
          Try it out!
        </Button>
      </div>

      <div className="w-full max-w-[1224px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between items-start pt-4 px-4 pb-6 gap-4 w-full h-[361px] bg-[radial-gradient(95.98%_95.98%_at_50%_50%,#FFFFFF_0%,#F2F4FF_100%)] border border-[#E4E4E4] rounded-xl"
          >
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="relative w-full h-[200px] rounded-xl overflow-hidden">
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <h3 className="font-inter font-medium text-[18px] leading-[22px] tracking-[-0.06em] text-[#021165]">
                  {useCase.title}
                </h3>
                <p className="font-sfpro font-normal text-[13px] leading-[16px] tracking-[-0.03em] text-[#021165]">
                  {useCase.description}
                </p>
              </div>
            </div>
            <span className="font-inter font-normal text-[14px] leading-[20px] text-[#042BFD]">
              Learn more
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
