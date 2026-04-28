// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/compat/router";
// import {
//     LayoutGrid,
//     Users,
//     Settings,
//     FileText,
//     Calendar,
//     GraduationCap,
//     X,
//     ArrowLeft,
//     Award,
//     DollarSign,
//     Send,
//     ChevronDown,
//     Headphones,
//     Menu,
//     RefreshCw
// } from "lucide-react";
// import Image from "next/image";
// import { useLogoutMutation } from "@/lib/queries/identityService/useIdentityService";
// import useSession from "@/hooks/useSession";
// import DiscoverCoursesPromo from "@/components/ui/DiscoverCoursesPromo";

// interface DashSidebarProps {
//     role: string | null;
//     isOpen: boolean;
//     onClose: () => void;
// }

// interface NavItem {
//     label: string;
//     href: string;
//     icon: any;
// }

// const getAdminNav = (basePath: string): NavItem[] => [
//     { label: "Overview", href: `${basePath}/dashboard`, icon: LayoutGrid },
//     { label: "Users", href: `${basePath}/users`, icon: Users },
//     { label: "Settings", href: `${basePath}/settings`, icon: Settings },
// ];

// const getStudentNav = (basePath: string): NavItem[] => [
//     { label: "Overview", href: `${basePath}/dashboard`, icon: LayoutGrid },
//     { label: "Sessions", href: `${basePath}/sessions`, icon: Calendar },
//     { label: "Assignments", href: `${basePath}/assignments`, icon: FileText },
//     { label: "Certificates", href: `${basePath}/certificate`, icon: Award },
//     { label: "Chat", href: `${basePath}/chat`, icon: Send },
// ];

// const getEducatorNav = (basePath: string): NavItem[] => [
//     { label: "Overview", href: `${basePath}/dashboard`, icon: LayoutGrid },
//     { label: "My Classes", href: `${basePath}/classes`, icon: GraduationCap },
//     { label: "Assignments", href: `${basePath}/assignments`, icon: FileText },
//     { label: "Students", href: `${basePath}/students`, icon: Users },
// ];

// export default function DashSidebar({ role, isOpen, onClose }: DashSidebarProps) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { mutateAsync: logout } = useLogoutMutation();
//     const { user } = useSession();

//     // State to handle the Billing Sub-menu toggle
//     const [isBillingOpen, setIsBillingOpen] = useState(false);

//     const getNavItems = () => {
//         switch (role) {
//             case "admin":
//                 return getAdminNav("/a");
//             case "student":
//                 return getStudentNav("/s");
//             case "educator":
//                 return getEducatorNav("/e");
//             default:
//                 return [];
//         }
//     };

//     const navItems = getNavItems();
    
//     // Determine base path for dynamic links in the footer
//     const basePath = role === "admin" ? "/a" : role === "educator" ? "/e" : "/s";

//     return (
//         <>
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                     onClick={onClose}
//                 />
//             )}

//             <aside className={`
//                 fixed top-0 left-0 z-50 h-full w-[260px] bg-white border-r border-gray-200 
//                 transform transition-transform duration-300 ease-in-out flex flex-col
//                 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//             `}>
//                 <div className="h-[80px] flex items-center px-6 justify-between border-b border-gray-100 shrink-0">
//                     <Link href="/" className="flex items-center">
//                         <Image
//                             src="/images/Logo.png"
//                             alt="Yetzu Logo"
//                             width={120}
//                             height={30}
//                             className="object-contain"
//                         />
//                     </Link>
//                     <button
//                         onClick={onClose}
//                         className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-md"
//                     >
//                         <X size={20} />
//                     </button>
//                 </div>

//                 <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col">
//                     <div className="space-y-1.5 flex-1">
//                         {navItems.map((item) => {
//                             const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
//                             return (
//                                 <Link
//                                     key={item.href}
//                                     href={item.href}
//                                     className={`
//                                         flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200
//                                         ${isActive
//                                             ? "bg-[#F3F4F6] text-black font-medium"
//                                             : "text-[#4B5563] hover:text-black hover:bg-gray-50"}
//                                     `}
//                                 >
//                                     <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
//                                     <span className="text-[15px]">{item.label}</span>
//                                 </Link>
//                             );
//                         })}
//                     </div>

//                     {/* Bottom Actions Section */}
//                     <div className="pt-6 mt-6 space-y-1.5 border-t border-transparent">
//                     <div className="mt-auto px-1 pb-6">
//                         <DiscoverCoursesPromo />
//                         </div>
//                         {/* Billing & Payments with Sub-menu */}
//                         <div>
//                             <button 
//                                 onClick={() => setIsBillingOpen(!isBillingOpen)}
//                                 className="flex whitespace-nowrap items-center justify-between px-4 py-3.5 text-[#4B5563] hover:text-black hover:bg-gray-50 rounded-xl transition-colors w-full group"
//                             >
//                                 <div className="flex items-center gap-4">
//                                     <DollarSign size={22} strokeWidth={1.5} />
//                                     <span className="text-[14px]">Billing & Payments</span>
//                                 </div>
//                                 <ChevronDown 
//                                     size={18} 
//                                     strokeWidth={1.5} 
//                                     className={`text-gray-400 group-hover:text-black transition-transform duration-200 ${isBillingOpen ? "rotate-180" : ""}`} 
//                                 />
//                             </button>

//                             {/* Sub-menu items */}
//                             {isBillingOpen && (
//                                 <div className="ml-[27px] pl-3 border-l border-gray-200 flex flex-col gap-1 mt-1 mb-2">
//                                     <Link 
//                                         href={`${basePath}/billing/overview`} 
//                                         className="flex items-center gap-3 px-3 py-2.5 bg-[#F3F4F6] text-black font-medium rounded-xl transition-colors"
//                                     >
//                                         <Menu size={18} strokeWidth={1.5} />
//                                         <span className="text-[14px]">Overview</span>
//                                     </Link>
                                    
//                                     <Link 
//                                         href={`${basePath}/billing/invoices`} 
//                                         className="flex items-center gap-3 px-3 py-2.5 text-[#4B5563] hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
//                                     >
//                                         <FileText size={18} strokeWidth={1.5} />
//                                         <span className="text-[14px]">Invoices</span>
//                                     </Link>

//                                     <Link 
//                                         href={`${basePath}/billing/subscriptions`} 
//                                         className="flex items-center gap-3 px-3 py-2.5 text-[#4B5563] hover:text-black hover:bg-gray-50 rounded-xl transition-colors"
//                                     >
//                                         <RefreshCw size={18} strokeWidth={1.5} />
//                                         <span className="text-[14px]">Subscriptions</span>
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>

//                         <Link  href={`${basePath}/help`}  className="flex whitespace-nowrap items-center gap-4 px-4 py-3.5 text-[#4B5563] hover:text-black hover:bg-gray-50 rounded-xl transition-colors w-full">
//                             <Headphones size={22} strokeWidth={1.5} />
//                             <span className="text-[15px]">Help & Support</span>
//                         </Link>
 
//                     </div>
//                 </div>
//             </aside>
//         </>
//     );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Users,
    Settings,
    FileText,
    Calendar,
    GraduationCap,
    X,
    Award,
    DollarSign,
    Send,
    ChevronDown,
    Headphones,
    Menu,
    RefreshCw,
    LogOut
} from "lucide-react";
import Image from "next/image";
import { useLogoutMutation } from "@/lib/queries/identityService/useIdentityService";
import useSession from "@/hooks/useSession";
import DiscoverCoursesPromo from "@/components/ui/DiscoverCoursesPromo";

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
    const pathname = usePathname();
    const { mutateAsync: logout } = useLogoutMutation();
    const { user } = useSession();

    const handleLogout = async () => {
        try {
            if (user?.id) {
                await logout({ userId: user.id });
                window.location.href = "/";
            }
        } catch {
            window.location.href = "/";
        }
    };

    // State to handle the Billing Sub-menu toggle
    const [isBillingOpen, setIsBillingOpen] = useState(false);

    const navItems = role === "admin" ? getAdminNav("/a") : role === "educator" ? getEducatorNav("/e") : getStudentNav("/s");
    
    // Determine base path for dynamic links in the footer
    const basePath = role === "admin" ? "/a" : role === "educator" ? "/e" : "/s";

    // Extract core nav items for the mobile bottom bar (first 4 items usually make sense for mobile)
    const mobileNavItems = navItems.slice(0, 4);

    return (
        <>
            {/* --- DESKTOP SIDEBAR & MOBILE OVERLAY --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* --- SIDEBAR (Hidden on Mobile, Visible on Desktop) --- */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-[260px] bg-[#F8F9FA] lg:bg-white lg:border-r border-gray-200 
                transform transition-transform duration-300 ease-in-out flex flex-col
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="h-[80px] flex items-center px-6 justify-between border-b border-gray-100 shrink-0">
                    <Link href="/" className="flex items-center">
                        {/* Assuming you have a dark blue logo for the sidebar */}
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
                        className="lg:hidden p-2 text-gray-400 hover:bg-gray-200 rounded-md"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col custom-scrollbar">
                    
                    {/* Desktop Navigation Links */}
                    <div className="space-y-1.5 flex-1 hidden lg:block">
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
                                            : "text-[#4B5563] hover:text-black hover:bg-gray-100"}
                                    `}
                                >
                                    <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                                    <span className="text-[15px]">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Navigation Links (Inside Hamburger Menu) */}
                    <div className="space-y-1.5 flex-1 lg:hidden">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={`mobile-${item.href}`}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`
                                        flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200
                                        ${isActive
                                            ? "bg-white text-[#042BFD] font-bold shadow-sm"
                                            : "text-[#4B5563] hover:text-black hover:bg-gray-100 font-medium"}
                                    `}
                                >
                                    <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                                    <span className="text-[15px]">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Bottom Actions Section */}
                    <div className="pt-6 mt-6 space-y-1.5 border-t border-transparent">
                        
                        <div className="mt-auto px-1 pb-6 hidden lg:block">
                            <DiscoverCoursesPromo />
                        </div>
                        
                        {/* Billing & Payments with Sub-menu */}
                        <div>
                            <button 
                                onClick={() => setIsBillingOpen(!isBillingOpen)}
                                className="flex whitespace-nowrap items-center justify-between px-4 py-3.5 text-[#4B5563] hover:text-black hover:bg-gray-100 rounded-xl transition-colors w-full group"
                            >
                                <div className="flex items-center gap-4">
                                    <DollarSign size={22} strokeWidth={1.5} />
                                    <span className="text-[14px]">Billing & Payments</span>
                                </div>
                                <ChevronDown 
                                    size={18} 
                                    strokeWidth={1.5} 
                                    className={`text-gray-400 group-hover:text-black transition-transform duration-200 ${isBillingOpen ? "rotate-180" : ""}`} 
                                />
                            </button>

{/* Sub-menu items */}
                            {isBillingOpen && (
                                <div className="ml-[27px] pl-3 border-l border-gray-300 flex flex-col gap-1 mt-1 mb-2">
                                    <Link  
                                        href={`${basePath}/billing/overview`}  
                                        onClick={() => window.innerWidth < 1024 && onClose()}
                                        className="flex items-center gap-3 px-3 py-2.5 bg-[#F3F4F6] lg:bg-gray-100 text-black font-medium rounded-xl transition-colors"
                                    >
                                        <Menu size={18} strokeWidth={1.5} />
                                        <span className="text-[14px]">Overview</span>
                                    </Link>
                                    
                                    <Link  
                                        href={`${basePath}/billing/invoices`}  
                                        onClick={() => window.innerWidth < 1024 && onClose()}
                                        className="flex items-center gap-3 px-3 py-2.5 text-[#4B5563] hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        <FileText size={18} strokeWidth={1.5} />
                                        <span className="text-[14px]">Invoices</span>
                                    </Link>

                                    <Link  
                                        href={`${basePath}/billing/subscriptions`}  
                                        onClick={() => window.innerWidth < 1024 && onClose()}
                                        className="flex items-center gap-3 px-3 py-2.5 text-[#4B5563] hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        <RefreshCw size={18} strokeWidth={1.5} />
                                        <span className="text-[14px]">Subscriptions</span>
                                    </Link>
                                </div>
                            )}
                        </div>

<button
                            onClick={handleLogout}
                            className="flex whitespace-nowrap items-center gap-4 px-4 py-3.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors w-full"
                        >
                            <LogOut size={22} strokeWidth={1.5} />
                            <span className="text-[15px]">Sign Out</span>
                        </button>

                        <Link
                            href={`${basePath}/help`}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className="flex whitespace-nowrap items-center gap-4 px-4 py-3.5 text-[#4B5563] hover:text-black hover:bg-gray-100 rounded-xl transition-colors w-full"
                        >
                            <Headphones size={22} strokeWidth={1.5} />
                            <span className="text-[15px]">Help & Support</span>
                        </Link>

                    </div>
                </div>
            </aside>

            {/* --- MOBILE BOTTOM NAVIGATION BAR --- */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 pb-safe pt-2 px-2 flex justify-around items-end h-[72px]">
                {mobileNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                    return (
                        <Link
                            key={`bottom-nav-${item.href}`}
                            href={item.href}
                            className="flex flex-col items-center justify-center w-full relative h-full group"
                        >
                            {/* Active Top Line Indicator */}
                            {isActive && (
                                <div className="absolute top-[-8px] w-12 h-1 bg-[#042BFD] rounded-b-md" />
                            )}
                            
                            <div className={`p-1.5 rounded-xl transition-colors ${isActive ? "text-[#042BFD]" : "text-gray-500 group-hover:text-gray-900"}`}>
                                <item.icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                            </div>
                            
                            <span className={`text-[11px] font-medium mt-0.5 ${isActive ? "text-[#042BFD] font-bold" : "text-gray-500"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
            
            {/* Add bottom padding to main layout content on mobile so the nav doesn't hide content */}
            <style jsx global>{`
                @media (max-width: 1024px) {
                    main {
                        padding-bottom: 90px !important;
                    }
                }
            `}</style>
        </>
    );
}
