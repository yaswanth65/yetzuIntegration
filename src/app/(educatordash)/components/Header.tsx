"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Menu, LogOut, Loader2, ChevronDown, Bell, FileText, Video, Award, Calendar, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { identityService } from "@/lib/queries/identityService/identityService";
import { EducatorAPI, asArray } from "@/lib/api";

interface EducatorHeaderProps {
  onMenuClick: () => void;
}

interface UserProfile {
  name?: string;
  email?: string;
  profileImage?: string;
  avatar?: string;
}

const notificationIconFor = (type?: string) => {
  const normalized = String(type || "").toLowerCase();
  if (normalized.includes("assignment")) return FileText;
  if (normalized.includes("session")) return Video;
  if (normalized.includes("certificate")) return Award;
  return Calendar;
};

export default function Header({ onMenuClick }: EducatorHeaderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const unreadCount = notifications.filter(n => n.unread).length;
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await identityService.getUserProfile();
        const userData = response?.user || response?.data || response;
        setUser({
          name: userData?.name || userData?.Name || "Educator",
          email: userData?.email || userData?.Email || "",
          profileImage: userData?.profileImage || userData?.avatar || "",
        });
      } catch {
        const cookieName = Cookies.get("userName");
        if (cookieName) {
          setUser({ name: cookieName, email: "" });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

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
        const response = await EducatorAPI.getNotifications();
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

  const handleLogout = async () => {
    try {
      const userId = Cookies.get("userId");
      if (userId) {
        await identityService.logout(userId);
      }
    } catch {
    } finally {
      // Clear all auth cookies
      Cookies.remove("jwtToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userId");
      Cookies.remove("userName");
      router.push("/");
    }
  };

  const userInitials = user?.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "E";
  const userImage = user?.profileImage || user?.avatar;

  return (
    <div className="w-full border-b border-gray-100 flex items-center justify-between p-4 px-4 md:px-8 bg-white z-40 relative">
      <div>
        <Image width={110} height={32} src="/logo-Yetzu.svg" alt="logo" className="w-[100px] md:w-[120px]" />
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setShowDropdown(false);
            }}
            className={`hidden sm:flex p-2 rounded-xl transition-all relative ${
              isNotifOpen ? 'bg-gray-50 text-gray-700' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Bell size={20} strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#042BFD] rounded-full border border-white"></span>
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
        
        <span className="hidden sm:inline-block w-px h-6 bg-gray-200"></span>

        {loading ? (
          <div className="hidden md:flex items-center gap-4">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4 relative">
            <button 
              onClick={() => {
                setShowDropdown(!showDropdown);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 px-2 rounded-xl transition-all"
            >
              <div className="flex flex-col items-end">
                <h1 className="text-sm font-bold text-gray-900">{user?.name || "Educator"}</h1>
                {user?.email && <p className="text-[10px] text-gray-400 font-medium">{user.email}</p>}
              </div>
              {userImage ? (
                <Image
                  width={36}
                  height={36}
                  src={userImage}
                  alt={user?.name || "User"}
                  className="rounded-lg shadow-sm object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {userInitials}
                </div>
              )}
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

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
