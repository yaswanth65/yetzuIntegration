"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { X, LayoutDashboard, Calendar, FileText, MessageSquare, LogOut } from "lucide-react";
import { useLogoutMutation } from "@/lib/queries/identityService/useIdentityService";
import useSession from "@/hooks/useSession";

const menuItems = [
  { name: "Overview", path: "/e/dashboard", icon: LayoutDashboard },
  { name: "Sessions", path: "/e/sessions", icon: Calendar },
  { name: "Assignments", path: "/e/assignments", icon: FileText },
  { name: "Chat", path: "/e/chat", icon: MessageSquare },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EducatorSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSession();
  const { mutateAsync: logout } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      if (user?.id) {
        await logout({ userId: user.id });
        router.push("/");
        window.location.reload();
      }
    } catch {
    }
  };

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
          {/* Logo Section */}

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1 mt-4">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  onClick={onClose}
                  href={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-medium text-[15px] ${
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
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-[15px]"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
