"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface SocialButtonProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    bg: string;
    hoverBg: string;
}

export const SocialButton = ({
    href,
    icon,
    label,
    bg,
    hoverBg,
}: SocialButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={false}
            animate={{
                width: isHovered ? "auto" : 44,
                backgroundColor: isHovered ? hoverBg : bg
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
        flex items-center 
        text-white h-11 rounded-lg 
        overflow-hidden whitespace-nowrap
        cursor-pointer
        relative
      `}
            style={{ backgroundColor: bg, minWidth: "44px" }}
        >
            <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 absolute left-0 top-0">
                {icon}
            </div>

            <div className="flex items-center pl-11 h-full">
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            key="label"
                            initial={{ opacity: 0, width: 0, paddingRight: 16 }}
                            animate={{ opacity: 1, width: "auto", paddingRight: 16 }}
                            exit={{ opacity: 0, width: 0, paddingRight: 16 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm font-medium overflow-hidden whitespace-nowrap"
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </motion.a>
    );
};
