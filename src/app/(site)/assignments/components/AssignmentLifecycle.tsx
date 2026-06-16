"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";

const lifecycleSteps = [
  {
    id: 1,
    title: "Upload",
    description: "Upload your assignment and share your specific requirements with ease.",
  },
  {
    id: 2,
    title: "Complete",
    description: "Our approach is simple — partner with passionate people, chase excellence, and make learning unforgettable.",
  },
  {
    id: 3,
    title: "Expert Review",
    description: "Your assignment is being carefully reviewed by our expert mentors for quality and accuracy.",
  },
  {
    id: 4,
    title: "Feedback And Revision",
    description: "Receive detailed feedback and request revisions to ensure it meets your expectations perfectly.",
  },
  {
    id: 5,
    title: "Refined Work",
    description: "Get the final polished assignment that meets all your expectations and academic standards.",
  },
];

export default function AssignmentLifecycle() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-[1224px] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-full md:max-w-[700px]">
          <h2 className="font-inter font-medium text-[28px] md:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] mb-4 capitalize">
            Assignment Lifecycle
          </h2>
          <p className="font-sfpro font-normal text-[15px] md:text-[18px] leading-[100%] tracking-[-0.03em] text-gray-600">
            A step-by-step process that ensures quality, clarity, and perfection in every submission.
          </p>
        </div>
        <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap bg-[#042BFD] hover:bg-[#021DC0] text-white rounded-xl">
          Try it out!
        </Button>
      </div>

      <div className="w-full max-w-[1224px] grid grid-cols-1 md:grid-cols-5 gap-4">
        {lifecycleSteps.map((step) => {
          const isHovered = hoveredStep === step.id;

          return (
            <div
              key={step.id}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`flex flex-col justify-between items-start p-4 w-full h-[315px] rounded-xl transition-all duration-300 cursor-pointer ${
                isHovered
                  ? "bg-gradient-to-b from-[#1B5ED5] via-[#4E89E3] to-[#356FD0] shadow-[0px_16px_32px_-12px_rgba(31,30,130,0.1)]"
                  : "bg-white"
              }`}
            >
              <span
                className={`font-inter font-medium text-[22px] leading-[27px] tracking-[-0.06em] mx-auto ${
                  isHovered ? "text-white" : "text-[#021165]"
                }`}
              >
                {step.title}
              </span>

              <div className="flex flex-col items-start gap-1 w-full">
                <span className="font-inter font-medium text-[68px] leading-[84px] tracking-[-0.04em] text-[#E6EAFF] opacity-50">
                  {step.id}
                </span>
                <p
                  className={`font-inter font-normal text-[10px] leading-[15px] w-full ${
                    isHovered ? "text-white" : "text-[#021165]"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
