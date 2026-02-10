"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { ADMIN_MENU_ITEMS, ADMIN_BOTTOM_MENU_ITEMS } from "../constants";
import { usePathname } from "next/navigation";

interface SidebarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  activeView = "dashboard",
  onNavigate,
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();

  const getHref = (id: string) => {
    const routes: { [key: string]: string } = {
      users: "/a/dashboard",
      sessions: "/a/sessions",
      security: "/a/security",
      content: "/a/content-management",
    };
    return routes[id] || "/a/dashboard";
  };

  const isActive = (id: string) => {
    if (pathname) {
      const routes: { [key: string]: string } = {
        users: "/a/dashboard",
        sessions: "/a/sessions",
        security: "/a/security",
        content: "/a/content-management",
      };
      return pathname === routes[id] || pathname.startsWith(routes[id]);
    }
    return activeView === id;
  };

  return (
    <aside
      className={`w-64 bg-gray-50 h-screen flex flex-col justify-between fixed left-0 top-0 border-r border-gray-200/70 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div>
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
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <nav className="px-3 space-y-1">
          {ADMIN_MENU_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={getHref(item.id)}
              onClick={() => {
                onNavigate && onNavigate(item.id);
                onClose && onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.id)
                  ? "bg-blue-50 text-black"
                  : "text-gray-500 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${isActive(item.id) ? "text-black" : "text-gray-900"}`}
                strokeWidth={1.5}
              />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-3 py-6">
        {ADMIN_BOTTOM_MENU_ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            className="
            flex items-center gap-3
            px-4 py-3 rounded-lg text-sm font-medium
            text-gray-500 hover:bg-gray-100 hover:text-black transition-colors
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

export default AdminSidebar;
