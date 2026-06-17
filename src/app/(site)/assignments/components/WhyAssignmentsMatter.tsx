"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const schoolTasks = [
  "Write comprehensive reports",
  "Read the entire chapter",
  "Write an extensive essay",
  "Read course material",
  "Memorize the entire textbook",
];

const yetzuTasks = [
  "Write an abstract in under 200 words",
  "Find the root cause of heart failure",
  "Analyze two contrasting reports",
  "Answer specific open-ended questions",
  "Synthesize research on cell membranes",
];

export default function WhyAssignmentsMatter() {
  const [activeSchoolStep, setActiveSchoolStep] = useState(0);
  const [activeYetzuStep, setActiveYetzuStep] = useState(0);

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] flex flex-col items-center">
      <div className="w-full max-w-[1224px] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-full md:max-w-[700px]">
          <h2 className="font-inter font-medium text-[28px] md:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] mb-4 capitalize">
            Why Assignments Matter
          </h2>
          <p className="font-sfpro font-normal text-[15px] md:text-[18px] leading-[100%] tracking-[-0.03em] text-gray-600">
            Discover why our assignments are designed to focus on real learning, critical thinking, and structured feedback over simple completion.
          </p>
        </div>
        <Button variant="primary" className="!w-fit px-8 !h-[48px] whitespace-nowrap bg-[#042BFD] hover:bg-[#021DC0] text-white rounded-xl">
          Try it out!
        </Button>
      </div>

      <div className="w-full max-w-[1224px] grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Schools */}
        <div className="bg-[#FFF8FA] rounded-[24px] p-8 md:p-12 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="w-4 h-4 rounded-full bg-[#E51616]" />
            <h3 className="font-semibold text-lg md:text-xl text-[#021165]">Schools ask of assignments</h3>
          </div>

          <div className="relative pl-6">
            {/* The vertical line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gray-200" />
            
            {/* The animated dot */}
            <motion.div
              className="absolute left-[3px] w-[10px] h-[10px] rounded-full bg-[#E51616] z-10 shadow-[0_0_8px_rgba(229,22,22,0.6)]"
              animate={{ top: `${(activeSchoolStep * 44) + 12}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <ul className="flex flex-col relative z-10 gap-0">
              {schoolTasks.map((task, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => setActiveSchoolStep(idx)}
                  className={`h-[44px] flex items-center cursor-pointer transition-colors duration-300 ${activeSchoolStep === idx ? "text-gray-900 font-medium" : "text-gray-500"}`}
                >
                  <span className="text-[15px] md:text-[16px]">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Yetzu */}
        <div className="bg-[#F6F8FF] rounded-[24px] p-8 md:p-12 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="w-4 h-4 rounded-full bg-[#00C45C]" />
            <h3 className="font-semibold text-lg md:text-xl text-[#021165]">At <span className="text-[#042BFD]">Yetzu</span> we create assignments</h3>
          </div>

          <div className="relative pl-6">
            {/* The vertical line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gray-200" />
            
            {/* The animated dot */}
            <motion.div
              className="absolute left-[3px] w-[10px] h-[10px] rounded-full bg-[#00C45C] z-10 shadow-[0_0_8px_rgba(0,196,92,0.6)]"
              animate={{ top: `${(activeYetzuStep * 44) + 12}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <ul className="flex flex-col relative z-10 gap-0">
              {yetzuTasks.map((task, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => setActiveYetzuStep(idx)}
                  className={`h-[44px] flex items-center cursor-pointer transition-colors duration-300 ${activeYetzuStep === idx ? "text-gray-900 font-medium" : "text-gray-500"}`}
                >
                  <span className="text-[15px] md:text-[16px]">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
