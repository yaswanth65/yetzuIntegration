"use client";

import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import SubHeading from "@/components/Typography/SubHeading";
import Paragraph from "@/components/Typography/Paragraph";

const assignments = [
    {
        id: 1,
        title: "Customized Mentorship Sessions",
        description:
            "One-on-one sessions focused on your personal academic needs and growth",
    },
    {
        id: 2,
        title: "Customized Mentorship Sessions",
        description:
            "One-on-one sessions focused on your personal academic needs and growth",
    },
    {
        id: 3,
        title: "Customized Mentorship Sessions",
        description:
            "One-on-one sessions focused on your personal academic needs and growth",
    },
    {
        id: 4,
        title: "Customized Mentorship Sessions",
        description:
            "One-on-one sessions focused on your personal academic needs and growth",
    }
];

const chipData = Array(10).fill("Medical Students");

export default function AssignmentWorkflow() {
    return (
        <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-10 flex flex-col items-center overflow-hidden">
            <div className="w-full max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
                <div>
                    <SubHeading text="Assignments Workflow" />
                    <Paragraph text="Experience Personalized Coaching and Strategic Academic Support
                        that Adapts to your Unique Goals and Challenges for Measurable
                        Growth and Confidence."/>
                </div>
                <button className="mt-6 sm:mt-0 bg-[#164CFF] hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg text-sm sm:text-base transition">
                    Try it out!
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
                {assignments.map((session, idx) => (
                    <div
                        key={idx}
                        className="bg-[#E6EAFF] rounded-xl shadow-sm p-6 flex flex-col justify-between h-[300px] hover:shadow-md transition-all duration-200"
                    >
                        <h3 className="text-gray-900 font-semibold text-lg mb-3 leading-tight">
                            {session.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-snug">
                            {session.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="relative w-full overflow-hidden mt-5 py-6">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex items-center gap-6 w-max mb-5"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                >
                    {[...chipData, ...chipData].map((label, index) => (
                        <div
                            key={`row1-${index}`}
                            className={`flex items-center gap-2 px-6 md:px-7 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium shadow-sm border transition min-w-max ${index % 2 === 1
                                ? "bg-[#164CFF] text-white"
                                : "bg-white text-gray-700 hover:bg-blue-50"
                                }`}
                        >
                            <Activity
                                size={18}
                                className={`${index % 2 === 1 ? "text-white" : "text-blue-600"
                                    } transition-colors`}
                            />
                            {label}
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex items-center gap-6 w-max"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {[...chipData, ...chipData].map((label, index) => (
                        <div
                            key={`row2-${index}`}
                            className={`flex items-center gap-2 px-6 md:px-7 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium shadow-sm border transition min-w-max ${index % 2 === 1
                                ? "bg-[#164CFF] text-white"
                                : "bg-white text-gray-700 hover:bg-blue-50"
                                }`}
                        >
                            <Activity
                                size={18}
                                className={`${index % 2 === 1 ? "text-white" : "text-blue-600"
                                    } transition-colors`}
                            />
                            {label}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
