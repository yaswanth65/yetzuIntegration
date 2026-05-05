 
"use client";

import { useState } from "react";
import DashSidebar from "./DashSidebar";
import DashNavbar from "./DashNavbar";
// import // ChatWidget from "@/app/(educatordash)/components/ChatWidget";

interface DashLayoutProps {
    children: React.ReactNode;
    role: string | null;
}

export default function DashLayout({ children, role }: DashLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Handlers to ensure only one "major" overlay/view is active
    const handleChatToggle = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) setIsNotificationOpen(false); // Close notifications if opening chat
    };

    const handleNotificationToggle = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <DashSidebar 
                role={role} 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
            />
            
            <div className="flex-1 flex flex-col min-w-0">
                <DashNavbar 
                    role={role} 
                    onMenuClick={() => setSidebarOpen(true)} 
                    onChatToggle={handleChatToggle}
                    isChatActive={isChatOpen}
                    onNotificationToggle={handleNotificationToggle}
                    isNotificationActive={isNotificationOpen} 
                />

                <main className="pt-20 lg:ml-[260px] h-full overflow-hidden transition-all duration-300">
                    {isChatOpen ? (
                        <div className="h-[calc(100vh-80px)] w-full">
                            {/* <ChatWidget onClose={() => setIsChatOpen(false)} /> */}
                        </div>
                    ) : (
                        <div className="px-4 sm:px-6 lg:px-8 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
                            <div className="max-w-[1600px] py-4 sm:py-6 lg:py-8">
                                {children}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}