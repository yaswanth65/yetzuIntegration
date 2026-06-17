"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Paragraph from "@/components/Typography/Paragraph";
import Button from "@/components/ui/Button";

const steps = [
  {
    id: 1,
    title: "Attend the Session",
    description: "Join live or recorded sessions to gain foundational knowledge.",
    image: "https://placehold.co/600x550/f0f0f0/cccccc?text=Placeholder",
  },
  {
    id: 2,
    title: "Apply through Structured Assignments",
    description: "Our approach is simple — partner with passionate people, chase excellence, and make learning unforgettable.",
    image: "https://placehold.co/600x550/e0e0e0/bbbbbb?text=Placeholder",
  },
  {
    id: 3,
    title: "Expert Review & Feedback",
    description: "Your assignment is being carefully reviewed by our expert mentors for quality and accuracy.",
    image: "https://placehold.co/600x550/d0d0d0/aaaaaa?text=Placeholder",
  },
  {
    id: 4,
    title: "Refine & Improve",
    description: "Receive detailed feedback and request revisions to ensure it meets your expectations perfectly.",
    image: "https://placehold.co/600x550/c0c0c0/999999?text=Placeholder",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-[1224px] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 md:gap-6">
        <div className="max-w-full md:max-w-[658px]">
          <h2 className="font-inter font-medium text-[28px] md:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] capitalize mb-4">
            How It Works
          </h2>
          <Paragraph
            text="Experience personalized coaching and strategic academic support that
                        adapts to your unique goals and challenges for measurable growth and
                        confidence."
            className="font-normal text-[15px] md:text-[18px] leading-[100%] tracking-[-0.03em]"
          />
        </div>
        <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap bg-[#042BFD] hover:bg-[#021DC0] text-white rounded-xl">
          Try it out!
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[1224px] w-full">
        <div className="flex flex-col gap-4 pl-0 sm:pl-0 md:pl-5 w-full">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <div
                key={step.id}
                className="cursor-pointer group flex items-start gap-6 py-2"
                onMouseEnter={() => setActiveStep(step.id)}
              >
                {/* Vertical Blue Line Indicator */}
                <div
                  className={`w-1 rounded-full transition-all duration-300 ${isActive ? "bg-[#042BFD] h-full min-h-[48px]" : "bg-transparent h-8"}`}
                />

                <div className="flex flex-col justify-center">
                  <h3
                    className={`font-semibold text-lg sm:text-xl md:text-[22px] transition-all duration-300 ${
                      isActive ? "text-[#021165]" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.p
                        key={step.id}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="text-gray-500 text-[15px] sm:text-base max-w-md leading-relaxed overflow-hidden"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center md:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="rounded-[24px] overflow-hidden w-full max-w-[540px] aspect-square relative bg-gray-100"
            >
              <Image
                src={steps.find((s) => s.id === activeStep)?.image || steps[0].image}
                alt="Workflow step"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
