"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MENU_ITEMS, BOTTOM_MENU_ITEMS } from "../constants";

interface SidebarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeView = "dashboard",
  onNavigate,
}) => {
  return (
    <aside className="w-64 bg-gray-50  h-screen flex flex-col justify-between fixed left-0 top-0 border-r border-gray-200/70 z-50">
      <div>
        {/* Logo Area */}
        <div className="h-[72px] px-5 flex items-center bg-gray-50 mb-4 border-b border-gray-200/70">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logo.png"
              alt="Yetzu Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="px-3 space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.id
                  ? "bg-blue-50 text-black"
                  : "text-gray-500 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${activeView === item.id ? "text-black" : "text-gray-900"}`}
                strokeWidth={1.5}
              />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="px-3 py-6">
        {BOTTOM_MENU_ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-black hover:bg-gray-100 transition-colors"
          >
            <item.icon className="w-5 h-5" strokeWidth={1.5} />
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
