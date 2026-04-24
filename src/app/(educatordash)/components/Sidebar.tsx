"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Home, Monitor, BookOpen, MessageCircle, LogOut } from "lucide-react";

const menuItems = [
  { name: "Overview", path: "/e/dashboard", icon: Home },
  { name: "My Sessions", path: "/e/sessions", icon: Monitor },
  { name: "Assignments", path: "/e/assignments", icon: BookOpen },
  { name: "Chat", path: "/e/chat", icon: MessageCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EducatorSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[#021165]/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`
                fixed md:static inset-y-0 right-0 z-50
                w-[280px] h-screen bg-white md:bg-transparent
                flex flex-col
                transform transition-all duration-500 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
                p-4 md:pl-0
            `}
      >
        <div className="bg-white md:rounded-[32px] md:border border-gray-100 shadow-xl md:shadow-sm h-full flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden p-6 border-b border-gray-50">
            <Image width={100} height={32} src="/logo-Yetzu.svg" alt="logo" />
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-[#042BFD] hover:bg-blue-50 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2 mt-4 md:mt-2">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  onClick={onClose}
                  href={item.path}
                  className={`group flex items-center gap-3.5 px-5 py-3 rounded-2xl transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-[#021165] text-white shadow-lg shadow-blue-900/20"
                      : "text-gray-500 hover:text-[#021165] hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-[#042BFD]" />
                  )}
                  <Icon
                    size={20}
                    className={`shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-[#042BFD]"
                    }`}
                  />
                  <span className={`text-sm font-bold tracking-tight ${isActive ? "text-white" : "text-gray-600"}`}>
                    {item.name}
                  </span>
                  
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#042BFD] shadow-[0_0_8px_#042BFD]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-50">
            <button className="w-full flex items-center gap-3.5 px-5 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}