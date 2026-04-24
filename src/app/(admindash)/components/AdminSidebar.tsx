"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { X, LayoutDashboard, Calendar, BarChart3, Building2, Users, FileEdit, BookOpen, MessageSquare, Ticket, LogOut } from "lucide-react";

const menuItems = [
  { name: "Overview", path: "/a/dashboard", icon: LayoutDashboard },
  { name: "Sessions", path: "/a/sessions", icon: Calendar },
  { name: "Analytics", path: "/a/analytics", icon: BarChart3 },
  { name: "Organisations", path: "/a/organisation", icon: Building2 },
  { name: "User Management", path: "/a/users", icon: Users },
  { name: "CMS", path: "/a/cms", icon: FileEdit },
  { name: "Blogs", path: "/a/blogs", icon: BookOpen },
  { name: "Contact Submissions", path: "/a/contact", icon: MessageSquare },
  { name: "Coupon Management", path: "/a/coupons", icon: Ticket },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`
                fixed md:static inset-y-0 right-0 md:left-0 z-50
                w-[280px] h-full bg-white
                flex flex-col
                transform transition-all duration-500 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
            `}
      >
        <div className="bg-white border-r border-gray-100 h-full flex flex-col overflow-hidden">

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1 mt-4">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  onClick={onClose}
                  href={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-medium text-[14px] ${
                    isActive
                      ? "bg-[#F1F3F5] text-black"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`shrink-0 ${isActive ? "text-black" : "text-gray-500"}`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-50">
            <button className="w-full flex items-center gap-3.5 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-[15px]">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
