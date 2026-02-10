 
"use client";

import NotificationsPopup from "@/app/(educatordash)/components/Notification";
import useSession from "@/hooks/useSession";
import { User, Bell, Menu, Search, HelpCircle, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

interface DashNavbarProps {
    role: string | null;
    onMenuClick: () => void;
    onChatToggle: () => void; // Add this
    isChatActive: boolean;    // Add this
    onNotificationToggle: ()=>void;
    isNotificationActive : boolean;
}

export default function DashNavbar({ role, onMenuClick, onChatToggle, isChatActive ,onNotificationToggle , isNotificationActive  }: DashNavbarProps) {
    const { user } = useSession();
    const pathname = usePathname();

    
    const getPageTitle = (path: string) => {
        if (path.includes("/overview")) return "Overview";
        if (path.includes("/dashboard")) return "Welcome Back!"
        if (path.includes("/webinars")) return "Webinar & Cohorts";
        if (path.includes("/settings")) return "Settings";
        if (path.includes("/courses")) return "My Courses";
        if (path.includes("/assignments")) return "Assignments";
        if (path.includes("/schedule")) return "Schedule";
        if (path.includes("/classes")) return "My Classes";
        if (path.includes("/students")) return "Students";
        return "Overview";
    };

    const title = getPageTitle(pathname || "");

    return (
        <nav className="bg-white border-b border-gray-200 h-20 fixed w-full top-0 z-40 lg:pl-64 transition-all duration-300">
            <div className="h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-base font-medium text-gray-800">{title}</h1>
                </div>

                <div className="flex items-center gap-6">
                    {/* REPLACED SEARCH WITH CHAT ICON */}
                    <button
                        onClick={onChatToggle}
                        className={`p-2.5 rounded-full transition-colors relative ${
                            isChatActive 
                                ? "bg-blue-100 text-[#003fc7]" 
                                : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                        <MessageCircle size={22} strokeWidth={2} />
                        {!isChatActive && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        )}
                    </button>

                    <div className="relative"> {/* Wrapper for positioning */}
    <button
        onClick={onNotificationToggle}
        className={`p-2.5 rounded-full transition-colors relative ${
            isNotificationActive 
                ? "bg-blue-100 text-[#003fc7]" 
                : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
        }`}
    >
        <Bell size={22} strokeWidth={2} />
        {!isNotificationActive && (
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        )}
    </button>

    {/* Render Popup OUTSIDE the button */}
    {isNotificationActive && (
        <NotificationsPopup onClose={onNotificationToggle} />
    )}
</div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-gray-900 leading-none">{user?.name || "User"}</p>
                            <p className="text-xs text-gray-500 mt-1">{user?.email || role}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-cover bg-center border border-gray-200"
                            style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=${user?.name})` }}>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}