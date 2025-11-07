"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SubHeading from "@/components/Typography/SubHeading";
import Paragraph from "@/components/Typography/Paragraph";

const steps = [
    {
        id: 1,
        title: "Upload",
        description:
            "Upload your assignment and share your specific requirements with ease.",
        image: "https://placehold.co/600x550",
    },
    {
        id: 2,
        title: "Completion / Download",
        description:
            "Our approach is simple — partner with passionate people, chase excellence, and make learning unforgettable.",
        image: "https://placehold.co/600x550",
    },
    {
        id: 3,
        title: "In Review",
        description:
            "Your assignment is being carefully reviewed by our expert mentors for quality and accuracy.",
        image: "https://placehold.co/600x550",
    },
    {
        id: 4,
        title: "Feedback And Revision",
        description:
            "Receive detailed feedback and request revisions to ensure it meets your expectations perfectly.",
        image: "https://placehold.co/600x550",
    },
];

export default function AssignmentWorkflowWithSteps() {
    const [activeStep, setActiveStep] = useState(2);

    return (
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-10 flex flex-col items-center overflow-hidden">
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
                <div className="max-w-2xl">
                    <SubHeading text="Assignments Workflow" />
                    <Paragraph text="Experience personalized coaching and strategic academic support that
                        adapts to your unique goals and challenges for measurable growth and
                        confidence."/>
                </div>
                <button className="mt-6 md:mt-0 bg-[#164CFF] hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg text-sm sm:text-base transition">
                    Try it out!
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-7xl w-full">
                <div className="flex flex-col gap-8 pl-0 sm:pl-0 md:pl-5 w-full">
                    {steps.map((step) => {
                        const isActive = activeStep === step.id;
                        return (
                            <div
                                key={step.id}
                                className="cursor-pointer group flex items-center gap-4"
                                onClick={() => setActiveStep(step.id)}
                            >
                                <div
                                    className={`w-1 sm:w-1 transition-all duration-300 ${isActive ? "bg-blue-600 h-30" : "bg-gray-300 h-12"}`}
                                ></div>

                                <div className="flex flex-col justify-center">
                                    <h3
                                        className={`font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 ${isActive ? "text-[#021165]" : "text-gray-600"
                                            }`}
                                    >
                                        {step.title}
                                    </h3>

                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.p
                                                key={step.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{
                                                    duration: 0.25,
                                                    ease: "easeInOut",
                                                }}
                                                className="text-gray-700 text-sm sm:text-base mt-1 max-w-md leading-snug"
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

                <div className="flex justify-center md:justify-start">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className="rounded-2xl overflow-hidden w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
                        >
                            <Image
                                src={steps.find((s) => s.id === activeStep)?.image || ""}
                                alt="Workflow step"
                                width={600}
                                height={600}
                                className="w-full h-auto object-cover rounded-xl"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
