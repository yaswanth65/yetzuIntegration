"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, Monitor, BookOpen, MessageCircle, Settings, HeadphonesIcon } from "lucide-react";

const menuItems = [
    { name: "Overview", path: "/e/dashboard", icon: Home },
    { name: "My Sessions", path: "/e/sessions", icon: Monitor },
    { name: "Assignments", path: "/e/assignments", icon: BookOpen },
    { name: "Chat", path: "/e/chat", icon: MessageCircle },
];

const bottomItems = [
    { label: 'Settings', icon: Settings },
    { label: 'Support', icon: HeadphonesIcon },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside
                className={`w-64 h-screen flex flex-col justify-between fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } bg-[#1D4ED8] text-white`}
            >
                <div className='p-6 overflow-y-auto flex-1'>
                    {/* Header / Logo text */}
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/e/dashboard" className="flex items-center">
                            <span className="text-[20px] font-bold tracking-wide">Educator Portal</span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        {menuItems.map((item) => {
                            const isActive = pathname?.startsWith(item.path);

                            return (
                                <Link
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 text-[14px] ${isActive ? "bg-white/10 text-white w-full font-medium rounded-lg" : "text-white/70 hover:bg-white/5 hover:text-white w-full rounded-lg transition-colors"} `}
                                    href={item.path}
                                    key={item.name}
                                >
                                    <div className="w-5 flex justify-center shrink-0">
                                        <item.icon
                                            className={`w-5 h-5 ${isActive ? "text-white" : "text-white/70"}`}
                                            strokeWidth={isActive ? 2 : 1.5}
                                        />
                                    </div>
                                    <span className="truncate">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="px-3 py-6 space-y-1">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.label}
                            href="#"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                        >
                            <item.icon className="w-5 h-5" strokeWidth={1.5} />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
