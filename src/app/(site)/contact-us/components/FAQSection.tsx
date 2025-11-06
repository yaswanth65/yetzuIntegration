"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        id: 1,
        question: "Your Question goes here?",
        answer:
            "Accordion description goes here. Try to keep it under 2 lines so it looks good and minimal.",
    },
    {
        id: 2,
        question: "Your Question goes here?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut erat id nunc convallis facilisis.",
    },
    {
        id: 3,
        question: "Your Question goes here?",
        answer:
            "Accordion description goes here. Try to keep it under 2 lines so it looks good and minimal.",
    },
    {
        id: 4,
        question: "Your Question goes here?",
        answer:
            "This can be any short piece of information your users frequently ask.",
    },
    {
        id: 5,
        question: "Your Question goes here?",
        answer:
            "Make sure to provide clear and concise answers for best user experience.",
    },
];

export default function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="w-full bg-white px-4 sm:px-6 lg:px-10 flex flex-col items-center">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                {/* LEFT SIDE */}
                <div className="flex flex-col justify-between space-y-8">
                    <div>
                        <h2 className="text-4xl font-bold text-blue-900 mb-2">FAQ</h2>
                        <p className="text-gray-600 text-sm sm:text-base max-w-sm">
                            Know answers to all of your questions
                        </p>
                    </div>

                    {/* Still Have Questions Box */}
                    <div className="bg-blue-50 p-6 rounded-2xl shadow-sm max-w-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Still have questions?
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Can’t find the answer to your questions? Send us an email and
                            we’ll get back to you as soon as possible.
                        </p>
                        <button className="bg-[#164CFF] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                            Ask Here
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE - FAQ ACCORDION */}
                <div className="flex flex-col space-y-4">
                    {faqs.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`bg-[#D0D7FF] rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-md" : "shadow-sm"
                                    }`}
                            >
                                <button
                                    className="w-full flex justify-between items-center text-left px-5 py-4 text-gray-900 focus:outline-none cursor-pointer"
                                    onClick={() => toggle(item.id)}
                                >
                                    <span>{item.question}</span>
                                    <span className="ml-4 text-blue-600">
                                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-5 pb-4 text-sm text-gray-600">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
