import Image from "next/image";
import React from "react";
import { Menu, Bell, Search, ChevronDown, Settings } from "lucide-react";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    return (
        <header className="w-full h-[72px] border-b border-gray-100 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40 transition-all">
            {/* Left: Logo & Search */}
            <div className="flex items-center gap-8 flex-1">
                <div className="shrink-0">
                    <Image width={100} height={32} src="/logo-Yetzu.svg" alt="logo" className="w-[90px] md:w-[110px]" />
                </div>
                
                {/* Desktop Search */}
                <div className="hidden lg:flex items-center max-w-md w-full relative group">
                    <Search className="absolute left-4 text-gray-400 group-focus-within:text-[#042BFD] transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search dashboard, users, sessions..." 
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-[#042BFD]/20 focus:ring-4 focus:ring-[#042BFD]/5 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-2 md:gap-6">
                {/* Notification Bell */}
                <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all group">
                    <Bell size={22} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>

                <div className="hidden sm:block w-px h-8 bg-gray-100 mx-1"></div>

                {/* Profile Section */}
                <div className="hidden md:flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all group border border-transparent hover:border-gray-100">
                    <div className="flex flex-col items-end mr-1">
                        <h1 className="text-sm font-bold text-gray-900 leading-tight">Natalia Sam</h1>
                        <p className="text-[10px] font-bold text-[#042BFD] uppercase tracking-widest">Super Admin</p>
                    </div>
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                        <Image
                            fill
                            src="/admin-dashboard/profile-NataliaSam.svg" 
                            alt="avatar"
                            className="object-cover"
                        />
                    </div>
                    <ChevronDown size={16} className="text-gray-400 group-hover:translate-y-0.5 transition-transform" />
                </div>

                {/* Mobile Icons */}
                <button className="md:hidden p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl">
                    <Search size={20} />
                </button>

                <button 
                  onClick={onMenuClick}
                  className="md:hidden p-2.5 text-[#021165] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors active:scale-95"
                >
                  <Menu size={22} strokeWidth={2.5} />
                </button>
            </div>
        </header>
    );
}
