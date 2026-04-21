"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Award, CreditCard, Settings, HeadphonesIcon } from "lucide-react";
import { MENU_ITEMS } from "../constants";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
    const pathname = usePathname();

    // Extend menu items here with paths if not present in constants.
    const extendedMenuItems = MENU_ITEMS.map(item => ({
        ...item,
        path: `/e/${item.id}`,
        label: item.label === 'Dashboard' ? 'Overview' : item.label,
    })).concat([
        { id: 'certificate', label: 'Certificate', icon: Award, path: '/e/certificate' },
        { id: 'payments', label: 'Payments', icon: CreditCard, path: '/e/payments' },
    ]);

    const bottomItems = [
        { label: 'Settings', icon: Settings },
        { label: 'Support', icon: HeadphonesIcon },
    ];

    return (
        <aside
            className={`w-64 h-screen flex flex-col justify-between fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                } bg-[#1D4ED8] text-white`}
        >
            <div>
                {/* Header / Logo text */}
                <div className="h-[72px] px-6 flex items-center justify-between mb-4 mt-2">
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

                <nav className="px-3 space-y-1">
                    {extendedMenuItems.map((item) => {
                        const isActive = pathname?.includes(`/${item.id}`) || (item.id === 'dashboard' && pathname === '/e');
                        return (
                            <Link
                                key={item.id}
                                href={item.path}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors ${isActive
                                        ? "bg-white/10 text-white"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon
                                    className={`w-5 h-5 ${isActive ? "text-white" : "text-white/70"}`}
                                    strokeWidth={isActive ? 2 : 1.5}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
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
    );
};

export default Sidebar;
