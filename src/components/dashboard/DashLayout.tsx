 
"use client";

import { useState } from "react";
import DashSidebar from "./DashSidebar";
import DashNavbar from "./DashNavbar";
import ChatWidget from "@/app/(educatordash)/components/ChatWidget";

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

                <main className="lg:pl-64 pt-20 h-full overflow-hidden transition-all duration-300">
                    {isChatOpen ? (
                        <div className="h-[calc(100vh-80px)] w-full">
                            <ChatWidget onClose={() => setIsChatOpen(false)} />
                        </div>
                    ) : (
                        <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
                            {children}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}