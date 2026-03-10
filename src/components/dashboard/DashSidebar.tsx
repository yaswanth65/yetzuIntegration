"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutGrid,
    Users,
    Settings,
    FileText,
    Calendar,
    GraduationCap,
    X,
    ArrowLeft,
    Award,
    DollarSign,
    Send,
    ChevronDown,
    Headphones
} from "lucide-react";
import Image from "next/image";
import { useLogoutMutation } from "@/lib/queries/identityService/useIdentityService";
import useSession from "@/hooks/useSession";

interface DashSidebarProps {
    role: string | null;
    isOpen: boolean;
    onClose: () => void;
}

interface NavItem {
    label: string;
    href: string;
    icon: any;
}

const getAdminNav = (basePath: string): NavItem[] => [
    { label: "Overview", href: `${basePath}/dashboard`, icon: LayoutGrid },
    { label: "Users", href: `${basePath}/users`, icon: Users },
    { label: "Settings", href: `${basePath}/settings`, icon: Settings },
];

const getStudentNav = (basePath: string): NavItem[] => [
    { label: "Overview", href: `${basePath}/dashboard`, icon: LayoutGrid },
    { label: "Sessions", href: `${basePath}/sessions`, icon: Calendar },
    { label: "Assignments", href: `${basePath}/assignments`, icon: FileText },
    { label: "Certificates", href: `${basePath}/certificate`, icon: Award },
    { label: "Chat", href: `${basePath}/chat`, icon: Send },
];

const getEducatorNav = (basePath: string): NavItem[] => [
    { label: "Overview", href: `${basePath}/dashboard`, icon: LayoutGrid },
    { label: "My Classes", href: `${basePath}/classes`, icon: GraduationCap },
    { label: "Assignments", href: `${basePath}/assignments`, icon: FileText },
    { label: "Students", href: `${basePath}/students`, icon: Users },
];

export default function DashSidebar({ role, isOpen, onClose }: DashSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { mutateAsync: logout } = useLogoutMutation();
    const { user } = useSession();

    const getNavItems = () => {
        switch (role) {
            case "admin":
                return getAdminNav("/a");
            case "student":
                return getStudentNav("/s");
            case "educator":
                return getEducatorNav("/e");
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-50 h-full w-[230px] bg-white border-r border-gray-200 
                transform transition-transform duration-300 ease-in-out flex flex-col
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="h-[80px] flex items-center px-6 justify-between border-b border-gray-100 shrink-0">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/Logo.png"
                            alt="Yetzu Logo"
                            width={120}
                            height={30}
                            className="object-contain"
                        />
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-md"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col">
                    <div className="space-y-1.5 flex-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200
                                        ${isActive
                                            ? "bg-[#F3F4F6] text-black font-medium"
                                            : "text-[#4B5563] hover:text-black hover:bg-gray-50"}
                                    `}
                                >
                                    <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                                    <span className="text-[15px]">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-6 mt-6 space-y-1.5 border-t border-transparent">
                        <button className="flex whitespace-nowrap items-center justify-between px-4 py-3.5 text-[#4B5563] hover:text-black hover:bg-gray-50 rounded-xl transition-colors w-full group">
                            <div className="flex items-center gap-4">
                                <DollarSign size={22} strokeWidth={1.5} />
                                <span className="text-[14px]">Billing & Payments</span>
                            </div>
                            <ChevronDown size={18} strokeWidth={1.5} className="text-gray-400 group-hover:text-black" />
                        </button>

                        <button className="flex whitespace-nowrap items-center gap-4 px-4 py-3.5 text-[#4B5563] hover:text-black hover:bg-gray-50 rounded-xl transition-colors w-full">
                            <Headphones size={22} strokeWidth={1.5} />
                            <span className="text-[15px]">Help & Support</span>
                        </button>
 
 
                    </div>
                </div>
            </aside>
        </>
    );
}