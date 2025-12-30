"use client";

import { useState } from "react";
import DashSidebar from "./DashSidebar";
import DashNavbar from "./DashNavbar";

interface DashLayoutProps {
    children: React.ReactNode;
    role: string | null;
}

export default function DashLayout({ children, role }: DashLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <DashSidebar role={role} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <DashNavbar role={role} onMenuClick={() => setSidebarOpen(true)} />
            <main className="lg:pl-64 pt-20 h-full transition-all duration-300">
                <div className="p-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
