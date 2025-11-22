"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export interface AccordionItem {
    id: number;
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
    firstExpanded?: boolean;
}

export default function Accordion({ items, firstExpanded = false }: AccordionProps) {
    const [openId, setOpenId] = useState<number | null>(firstExpanded && items.length > 0 ? items[0].id : null);

    const toggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="flex flex-col space-y-4">
            {items.map((item) => {
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
                            <span className="font-semibold">{item.title}</span>
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
                                        {item.content}
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
