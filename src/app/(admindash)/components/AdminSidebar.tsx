"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { X } from 'lucide-react';

const menuItems = [
    { name: "Overview", path: "/a/dashboard", icon: "/admin-dashboard/ad-overview-icon.svg" },
    { name: "Session", path: "/a/sessions", icon: "/admin-dashboard/ad-sessions-icon.svg" },
    { name: "Analytics", path: "/a/analytics", icon: "/admin-dashboard/ad-analytics-icon.svg" },
    { name: "Organisations", path: "/a/organisation", icon: "/admin-dashboard/organisation-icon.svg" },
    { name: "User Management", path: "/a/users", icon: "/admin-dashboard/ad-user-management-icon.svg" },
    { name: "CMS", path: "/a/cms", icon: "/admin-dashboard/cms-icon.svg" },
    { name: "Blogs", path: "/a/blogs", icon: "/admin-dashboard/ad-blogs-icon.svg" },
    { name: "Contact Submissions", path: "/a/contact", icon: "/admin-dashboard/ad-contact-submissions-icon.svg" },
    { name: "Coupon Management", path: "/a/coupons", icon: "/admin-dashboard/ad-coupon-management-icon.svg" }
]

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
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

            {/* Sidebar Content */}
            <div className={`
                fixed md:static inset-y-0 right-0 z-50
                w-[260px] h-screen bg-white border-l md:border-l-0 md:border-r border-gray-200 
                flex flex-col justify-between
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
            `}>
                <div className='p-6 overflow-y-auto flex-1'>
                    {/* Mobile Close Button */}
                    <div className="flex items-center justify-between md:hidden mb-6">
                        <h2 className="font-bold text-lg text-slate-800">Menu</h2>
                        <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-md">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        {menuItems.map((item) => {
                            const isActive = pathname.startsWith(item.path);

                            return (
                                <Link
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 md:py-2.5 text-[14px] ${isActive ? "bg-slate-100 text-slate-900 w-full font-medium rounded-lg" : "text-[#404040] hover:bg-gray-50 hover:text-slate-900 w-full rounded-lg transition-colors"} `}
                                    href={item.path}
                                    key={item.name}
                                >
                                    <div className="w-5 flex justify-center shrink-0">
                                        <Image width={20} height={20} src={item.icon} alt="icon" />
                                    </div>
                                    <span className="truncate">{item.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile Profile Block */}
                <div className="md:hidden p-5 border-t border-gray-100 bg-slate-50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <Image
                            width={36}
                            height={36}
                            src="/admin-dashboard/profile-NataliaSam.svg"
                            alt="avatar"
                            className="rounded-full"
                        />
                        <div>
                            <h1 className="text-sm font-semibold text-slate-900">Natalia Sam</h1>
                            <p className="text-xs text-slate-500 truncate max-w-[120px]">naatt@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
