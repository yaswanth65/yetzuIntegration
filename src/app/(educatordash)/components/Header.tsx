import Image from "next/image";
import React from "react";
import { Menu } from "lucide-react";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: AdminHeaderProps) {
    return (
        <div className="w-full border-b border-gray-200 flex items-center justify-between p-4 bg-white z-20 relative">
            <div>
                <Image width={100} height={100} src="/logo-Yetzu.svg" alt="logo" className="md:w-[120px]" />
            </div>
            <div className="flex items-center gap-3 md:gap-5 px-2 md:px-5 ">
                <button className="hidden sm:block">
                    <Image
                        width={20}
                        height={20}
                        src="/admin-dashboard/ad-bell-icon.svg"
                        alt="bell-icon"
                    />
                </button>
                <span className="hidden md:inline-block w-[2px] h-6 bg-gray-300"></span>

                <div className="hidden md:flex items-center gap-5 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <Image
                            width={35}
                            height={35}
                            src="/admin-dashboard/profile-NataliaSam.svg" 
                            alt="icon"/>
                        <div>
                            <h1 className="text-sm font-medium">Natalia Sam</h1>
                            <p className="text-xs text-gray-400">naatt@gmail.com</p>
                        </div>
                    </div>

                    <img src="/admin-dashboard/ad-drop-down.svg" alt="dropdown-icon" />
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                  onClick={onMenuClick}
                  className="md:hidden p-1 text-gray-600 hover:bg-gray-100 rounded-md active:bg-gray-200 transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
