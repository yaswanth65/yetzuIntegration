"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, Search, ChevronDown, Settings, FileText, Video, Award, Calendar, CheckCircle2 } from "lucide-react";
import { AdminAPI, asArray } from "@/lib/api";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

const notificationIconFor = (type?: string) => {
  const normalized = String(type || "").toLowerCase();
  if (normalized.includes("assignment")) return FileText;
  if (normalized.includes("session")) return Video;
  if (normalized.includes("certificate")) return Award;
  return Calendar;
};

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const unreadCount = notifications.filter(n => n.unread).length;
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
          setIsNotifOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await AdminAPI.getNotifications();
          setNotifications(asArray(response).map((item: any, index: number) => ({
            id: item.id || index,
            icon: notificationIconFor(item.type || item.category),
            title: item.title || item.message || "Notification",
            subtitle: item.subtitle || item.description || "",
            time: item.timeAgo || item.createdAt || item.time || "",
            unread: Boolean(item.unread || item.isUnread || item.status === "unread"),
          })));
        } catch {
          setNotifications([]);
        }
      };
      fetchNotifications();
    }, []);

    const markAllAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

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
                <div className="relative" ref={notifRef}>
                  <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className={`relative p-2.5 rounded-xl transition-all group ${
                      isNotifOpen ? 'bg-gray-50 text-gray-700' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Bell size={22} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#042BFD] border-2 border-white rounded-full"></span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {isNotifOpen && (
                    <div className="absolute top-[calc(100%+12px)] right-0 w-[380px] bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-[16px] font-bold text-gray-900">Notifications</h2>
                          {unreadCount > 0 && (
                            <span className="bg-[#E0E7FF] text-[#4F39F6] text-[11px] font-bold px-2 py-0.5 rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-[12px] font-semibold text-[#042BFD] hover:text-blue-800 transition-colors"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          <div className="flex flex-col">
                            {notifications.map((notif) => (
                              <div key={notif.id} className="flex items-start gap-4 p-3 hover:bg-gray-50/80 transition-colors border-b border-gray-50 cursor-pointer">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-[#E0E7FF] text-[#4F39F6]' : 'bg-[#F8FAFC] text-gray-500'}`}>
                                  <notif.icon size={16} strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 min-w-0 pr-2">
                                  <h4 className={`text-[13px] mb-1 leading-snug ${notif.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                    {notif.title}
                                  </h4>
                                  <p className="text-[12px] text-gray-500 mb-2 truncate">{notif.subtitle}</p>
                                  <p className="text-[11px] text-gray-400 font-medium">{notif.time}</p>
                                </div>
                                <div className="w-2 pt-1.5 shrink-0 flex justify-center">
                                  {notif.unread && <div className="w-[7px] h-[7px] bg-[#042BFD] rounded-full"></div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-[#EBF0FF] text-[#042BFD] flex items-center justify-center mb-5">
                              <CheckCircle2 size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">You're all caught up 🎉</h3>
                            <p className="text-[13px] text-gray-500">We'll notify you when something new happens.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

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
