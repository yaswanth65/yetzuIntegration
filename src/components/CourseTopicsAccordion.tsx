"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface TopicItem {
    _id: string;
    title: string;
    desc: string;
}

interface CourseTopicsAccordionProps {
    items: TopicItem[];
    firstExpanded?: boolean;
}

export default function CourseTopicsAccordion({ items, firstExpanded = false }: CourseTopicsAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(firstExpanded && items.length > 0 ? items[0]._id : null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="flex flex-col space-y-3">
            {items.map((item) => {
                const isOpen = openId === item._id;
                return (
                    <div
                        key={item._id}
                        className={`rounded-lg border border-[#e5e7eb] overflow-hidden transition-all duration-300 ${isOpen ? "bg-[#F8FAFF]" : "bg-[#f5f5f5]"}`}
                    >
                        <button
                            className="w-full flex justify-between items-center text-left px-4 py-4 text-gray-900 focus:outline-none cursor-pointer"
                            onClick={() => toggle(item._id)}
                        >
                            <span className="font-semibold text-lg text-black">{item.title}</span>
                            <ChevronDown
                                className={`w-5 h-5 text-[#042BFD] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-4 pb-4 text-lg">
                                        {item.desc}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
