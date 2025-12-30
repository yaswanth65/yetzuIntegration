"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Settings,
    BookOpen,
    FileText,
    Calendar,
    GraduationCap,
    LogOut,
    X,
    HelpCircle,
    ArrowLeft,
    Home,
    MonitorPlay,
    Award,
    DollarSign,
    Activity
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    { label: "Dashboard", href: `${basePath}/dashboard`, icon: LayoutDashboard },
    { label: "Users", href: `${basePath}/users`, icon: Users },
    { label: "Settings", href: `${basePath}/settings`, icon: Settings },
];

const getStudentNav = (basePath: string): NavItem[] => [
    { label: "Overview", href: `${basePath}/overview`, icon: Home },
    { label: "Webinars & Cohorts", href: `${basePath}/webinars`, icon: MonitorPlay },
    { label: "Assignments & Reports", href: `${basePath}/assignments`, icon: BookOpen },
    { label: "Certificate", href: `${basePath}/certificate`, icon: Award },
    { label: "Payments", href: `${basePath}/payments`, icon: DollarSign },
];

const getEducatorNav = (basePath: string): NavItem[] => [
    { label: "Dashboard", href: `${basePath}/dashboard`, icon: LayoutDashboard },
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
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-20 flex items-center px-6 justify-between">
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

                    {/* Nav Links */}
                    <div className="flex-1 overflow-y-auto pb-4 px-4">
                        <p className="text-sm font-medium text-gray-400 mb-4 pl-2">Menu</p>
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                                            flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200
                                            ${isActive
                                                ? "bg-[#EBF0FF] text-[#2F327D] font-semibold border-l-3 border-[#2F327D]"
                                                : "text-[#5F6388] font-medium hover:text-[#2F327D] hover:bg-gray-50"}
                                        `}
                                    >
                                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        <span className="text-[14px]">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer / Bottom Actions */}
                    <div className="p-4 space-y-1">
                        <button className="flex items-center gap-2 px-4 py-2 text-[#5F6388] hover:text-[#2F327D] font-medium transition-colors w-full">
                            <Activity size={20} />
                            <span className="text-[14px]">Help & Support</span>
                        </button>

                        <Link
                            href={role === "admin" ? "/a/settings" : role === "educator" ? "/e/settings" : "/s/settings"}
                            className="flex items-center gap-2 px-4 py-2 text-[#5F6388] hover:text-[#2F327D] font-medium transition-colors w-full"
                        >
                            <Settings size={20} />
                            <span className="text-[14px]">Settings</span>
                        </Link>

                        <div className="pt-4 border-t border-gray-100 mt-2">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 px-4 py-2 text-[#5F6388] hover:text-[#2F327D] font-medium transition-colors w-full"
                            >
                                <ArrowLeft size={20} />
                                <span className="text-[14px]">Go Back</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
