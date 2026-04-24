import Image from "next/image";
import React from "react";
import { Menu } from "lucide-react";

interface EducatorHeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: EducatorHeaderProps) {
    return (
        <div className="w-full border-b border-gray-100 flex items-center justify-between p-4 px-4 md:px-8 bg-white z-40 relative">
            <div>
                <Image width={110} height={32} src="/logo-Yetzu.svg" alt="logo" className="w-[100px] md:w-[120px]" />
            </div>
            
            <div className="flex items-center gap-3 md:gap-6">
                <button className="hidden sm:flex p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">
                    <Image
                        width={20}
                        height={20}
                        src="/admin-dashboard/ad-bell-icon.svg"
                        alt="bell-icon"
                    />
                </button>
                
                <span className="hidden sm:inline-block w-px h-6 bg-gray-200"></span>

                <div className="hidden md:flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-1.5 px-2 rounded-xl transition-all">
                    <div className="flex flex-col items-end">
                        <h1 className="text-sm font-bold text-gray-900">Natalia Sam</h1>
                        <p className="text-[10px] text-gray-400 font-medium">naatt@gmail.com</p>
                    </div>
                    <Image
                        width={36}
                        height={36}
                        src="/admin-dashboard/profile-NataliaSam.svg" 
                        alt="icon"
                        className="rounded-lg shadow-sm"
                    />
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                  onClick={onMenuClick}
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl active:bg-gray-200 transition-all"
                >
                  <Menu size={24} />
                </button>
            </div>
        </div>
    );
}
