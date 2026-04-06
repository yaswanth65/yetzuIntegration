"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { MENU_ITEMS, BOTTOM_MENU_ITEMS } from "../constants";

/**
 * Props for the Sidebar component
 * @property activeView - The currently active view identifier (default: "dashboard")
 * @property onNavigate - Callback function triggered when a menu item is clicked
 * @property isOpen - Controls mobile sidebar visibility
 * @property onClose - Callback to close mobile sidebar
 */
interface SidebarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Sidebar component for the educator dashboard
 * Displays navigation menu items at the top and additional menu items at the bottom
 * Responsive: Hidden on mobile with slide-in animation when opened
 */
const Sidebar: React.FC<SidebarProps> = ({
  activeView = "dashboard",
  onNavigate,
  isOpen = false,
  onClose,
}) => {
  return (
    // Fixed sidebar container - left side, full height, gray background
    // Mobile: transforms off-screen by default, slides in when isOpen is true
    <aside
      className={`w-64 bg-gray-50 h-screen flex flex-col justify-between fixed left-0 top-0 border-r border-gray-200/70 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Top section: Logo and main navigation */}
      <div>
        {/* Logo Area - displays Yetzu branding */}
        <div className="h-[72px] px-5 flex items-center justify-between bg-gray-50 mb-4 border-b border-gray-200/70">
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
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Main navigation menu - renders items from MENU_ITEMS constant */}
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
              {/* Menu item icon - changes color based on active state */}
              <item.icon
                className={`w-5 h-5 ${activeView === item.id ? "text-black" : "text-gray-900"}`}
                strokeWidth={1.5}
              />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Menu - additional navigation items (Help, Settings, etc.) */}
      <div className="px-3 py-6">
        {BOTTOM_MENU_ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            className="
        flex items-center gap-3
        px-4 rounded-lg
        font-inter text-[16px] font-normal
        leading-tight tracking-[0]
        text-black align-middle
        hover:bg-gray-100 transition-colors
      "
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
