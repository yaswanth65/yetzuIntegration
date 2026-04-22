"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, Monitor, BookOpen, MessageCircle } from "lucide-react";

const menuItems = [
    { name: "Overview", path: "/e/dashboard", icon: Home },
    { name: "My Sessions", path: "/e/sessions", icon: Monitor },
    { name: "Assignments", path: "/e/assignments", icon: BookOpen },
    { name: "Chat", path: "/e/chat", icon: MessageCircle },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EducatorSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
          fixed md:static inset-y-0 left-0 z-50
          w-[260px] h-screen bg-white border-r border-gray-200
          flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
            >
                <div className="p-6 overflow-y-auto flex-1">

                    {/* Mobile Header */}
                    <div className="flex items-center justify-between md:hidden mb-6">
                        <h2 className="font-bold text-lg text-slate-800">
                            Educator Panel
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-md"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Menu */}
                    <div className="flex flex-col items-start gap-2">
                        {menuItems.map((item) => {
                            const isActive = pathname.startsWith(item.path);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 md:py-2.5 text-[14px] ${isActive
                                        ? "bg-slate-100 text-slate-900 w-full font-medium rounded-lg"
                                        : "text-[#404040] hover:bg-gray-50 hover:text-slate-900 w-full rounded-lg transition-colors"
                                        }`}
                                >
                                    <div className="w-5 flex justify-center shrink-0">
                                        <item.icon
                                            className={`w-5 h-5 ${isActive ? "text-slate-900" : "text-gray-500"
                                                }`}
                                            strokeWidth={isActive ? 2 : 1.5}
                                        />
                                    </div>
                                    <span className="truncate">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Profile */}
                <div className="md:hidden p-5 border-t border-gray-100 bg-slate-50 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300" />
                    <div>
                        <h1 className="text-sm font-semibold text-slate-900">
                            Educator Name
                        </h1>
                        <p className="text-xs text-slate-500 truncate max-w-[120px]">
                            educator@email.com
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}