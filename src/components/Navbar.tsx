"use client";

import Link from "next/link";
import {
  ChevronDown,
  Bell,
  Menu,
  X,
  Search,
  Award,
  FileText,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  ShoppingCart,
  LayoutGrid,
  Calendar,
  Send,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useSession from "@/hooks/useSession";
import { useLogoutMutation } from "@/lib/queries/identityService/useIdentityService";
import Button from "./ui/Button";
import { useCart } from "@/providers/CartProvider";
import { StudentAPI, asArray } from "@/lib/api";
import { getTimeAgo } from "@/lib/utils/dateUtils";

const Navbar = () => {
  const pathname = usePathname() || "";
  const isContactPage = pathname === "/contact-us";

  const { user } = useSession();
  const contextName = user?.name || "";
  const contextEmail = user?.email || "";
  const id = user?.id || "";
  const role = user?.role || "";

  const [studentProfile, setStudentProfile] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (role?.toLowerCase() === "student") {
        try {
          const res = await StudentAPI.me();
          const userData = res?.user || res?.data?.user || res?.data || res;
          if (userData) {
            setStudentProfile({
              name: userData.name || userData.Name || "",
              email: userData.email || userData.Email || "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch student profile in Navbar:", error);
        }
      }
    };
    fetchProfile();
  }, [role]);

  const name = studentProfile?.name || contextName;
  const email = studentProfile?.email || contextEmail;
  const { mutateAsync: logout } = useLogoutMutation();
  const { cartCount } = useCart();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch student notifications on mount and when role changes
  useEffect(() => {
    const fetchNotifications = async () => {
      if (role?.toLowerCase() === "student") {
        try {
          const notifRes = await StudentAPI.getNotifications();
          const apiNotifications = asArray(
            notifRes?.data?.notifications ||
            notifRes?.notifications ||
            notifRes?.data ||
            notifRes
          );
          setNotifications(apiNotifications);
          setUnreadCount(
            notifRes?.data?.summary?.newMessages ??
            notifRes?.summary?.newMessages ??
            apiNotifications.filter((item: any) => item.unread || item.isUnread || !item.read).length
          );
        } catch (error) {
          console.error("Failed to fetch student notifications in Navbar:", error);
          setNotifications([]);
          setUnreadCount(0);
        }
      }
    };

    fetchNotifications();
  }, [role]);

  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/courses", label: "Courses" },
    { href: "/assignments", label: "Assignments" },
    { href: "/blog", label: "Blog" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const getDashboardLink = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "/a/dashboard";
      case "educator":
        return "/e/dashboard";
      case "student":
        return "/s/dashboard";
      default:
        return "/s/dashboard";
    }
  };

  const getUserMenuItems = () => {
    if (role?.toLowerCase() === "student") {
      return [
        { href: "/s/dashboard", label: "Overview", icon: LayoutGrid },
        { href: "/s/sessions", label: "Sessions", icon: Calendar },
        { href: "/s/assignments", label: "Assignments", icon: FileText },
        { href: "/s/certificate", label: "Certificates", icon: Award },
        { href: "/s/chat", label: "Chat", icon: Send },
        { href: "/s/tickets", label: "Tickets", icon: Ticket },
      ];
    }
    return [
      { href: getDashboardLink(), label: "Dashboard", icon: LayoutDashboard },
      { href: "/profile/courses", label: "My Courses", icon: FileText },
      { href: "/profile/submissions", label: "My Submissions", icon: FileText },
      { href: "/profile/awards", label: "Awards", icon: Award },
      { href: "/profile/notifications", label: "Notifications", icon: Bell },
      { href: "/profile", label: "My Profile", icon: User },
      { href: "/profile/settings", label: "Settings", icon: Settings },
    ];
  };

  const menuItemsToUse = getUserMenuItems();
  const isNavActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Top Navbar */}
      <nav className={`w-full fixed top-0 left-0 z-50 transition-colors duration-200 ${
        isContactPage ? "bg-[#164CFF] shadow-none" : "bg-white shadow-md"
      }`}>
        <div className="max-w-[1224px] mx-auto flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] h-[68px]">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Logo.png"
                alt="Yetzu Logo"
                width={120}
                height={40}
                className={`object-contain transition-all duration-200 ${
                  isContactPage ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className={`hidden lg:flex items-center space-x-8 ${
            isContactPage ? "text-white/90" : "text-gray-800"
          }`}>
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-200 ${
                  isNavActive(link.href)
                    ? "text-[#042BFD]"
                    : isContactPage
                      ? "hover:text-white"
                      : "hover:text-[#2563eb]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-4">
            {/* Shopping Cart */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-full transition-colors duration-200 flex items-center justify-center ${
                isContactPage ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#042BFD] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Notification Bell (Desktop - only when logged in) */}
            {name && role?.toLowerCase() === "student" ? (
              <div className="hidden lg:block relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className={`p-2 rounded-full transition-colors duration-200 relative ${
                    isNotifOpen ? (isContactPage ? "bg-white/10" : "bg-gray-100") : ""
                  } ${
                    isContactPage ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }`}
                >
                  <Bell size={20} className={isContactPage ? "text-white" : "text-gray-700"} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                  )}
                </button>

                {isNotifOpen && (
                  <div
                    className="absolute right-0 mt-2 w-[380px] md:w-[420px] bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden cursor-default animate-in slide-in-from-top-2 duration-200"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-[16px] font-semibold text-gray-900">Notifications</h2>
                        {unreadCount > 0 && (
                          <span className="bg-[#E0E7FF] text-[#4F39F6] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[12px] font-medium text-[#042BFD] hover:text-blue-800 transition-colors"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {/* Body */}
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar pb-2">
                      {notifications.length > 0 ? (
                        <div className="flex flex-col">
                          {notifications.map((notif, idx) => (
                            <div
                              key={notif.id || idx}
                              className="flex items-start gap-4 px-5 py-4 sm:px-4 sm:py-3 hover:bg-gray-50/80 transition-colors border-b border-gray-50 cursor-pointer"
                            >
                              <div className={`w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? "bg-[#E0E7FF] text-[#4F39F6]" : "bg-[#F8FAFC] text-gray-400"}`}>
                                <Bell size={17} strokeWidth={1.5} />
                              </div>

                              <div className="flex-1 min-w-0 pr-2">
                                <h4 className={`text-[14px] sm:text-[13px] leading-snug mb-0.5 ${notif.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                                  {notif.title || "Notification"}
                                </h4>
                                <p className="text-[13px] sm:text-[12px] text-gray-500 mb-1.5 truncate font-normal">
                                  {notif.subtitle || notif.message}
                                </p>
                                <p className="text-[11px] text-gray-400 font-normal">
                                  {getTimeAgo(notif.createdAt || notif.time)}
                                </p>
                              </div>

                              <div className="w-2 pt-1.5 shrink-0 flex justify-center">
                                {notif.unread && (
                                  <div className="w-[7px] h-[7px] bg-[#042BFD] rounded-full" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                          <div className="w-12 h-12 rounded-full bg-[#EBF0FF] text-[#042BFD] flex items-center justify-center mb-4">
                            <CheckCircle2 size={24} strokeWidth={1.5} />
                          </div>
                          <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">
                            You're all caught up 🎉
                          </h3>
                          <p className="text-[13px] text-gray-500 font-normal">
                            We'll notify you when something new happens.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : name ? (
              <button
                className={`hidden lg:flex relative p-2 rounded-full transition-colors duration-200 ${
                  isContactPage ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Bell size={20} className={isContactPage ? "text-white" : "text-gray-700"} />
                {hasUnreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            ) : null}

            {/* User Menu or Login Button (Desktop) */}
            {name ? (
              <div className="hidden lg:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 p-1.5 rounded-full transition-colors duration-200 ${
                    isContactPage ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    } ${isContactPage ? "text-white" : "text-gray-600"}`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl border border-gray-100 rounded-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{name}</p>
                      {email && (
                        <p className="text-sm text-gray-500">{email}</p>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {menuItemsToUse.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-[#2563eb] transition-colors duration-150"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Icon size={18} />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        );
                      })}

                      {/* Logout */}
                      <button
                        onClick={async () => await logout({ userId: id })}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors duration-150 mt-1 border-t border-gray-100"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden lg:block">
                <Button
                  variant={isContactPage ? "outline" : "primary"}
                  className={`!w-fit !h-[38px] px-6 ${
                    isContactPage ? "!bg-white !text-[#164CFF] hover:!bg-blue-50 !border-white" : ""
                  }`}
                >
                  Log In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                isContactPage ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Open menu"
            >
              <Menu size={24} className={isContactPage ? "text-white" : "text-gray-700"} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Image
              src="/images/Logo.png"
              alt="Yetzu Logo"
              width={100}
              height={32}
              className="object-contain"
            />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    isNavActive(link.href)
                      ? "text-[#042BFD] bg-blue-50"
                      : "text-gray-700 hover:bg-blue-50 hover:text-[#2563eb]"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Bell size={18} />
                  {link.label}
                </Link>
              ))}

              {/* User Menu Items (Mobile - only when logged in) */}
              {name && (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-1">
                  {menuItemsToUse.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563eb] rounded-lg transition-all duration-200 font-medium"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <Icon size={18} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            {name ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center text-white font-semibold">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {name}
                    </p>
                    {email && (
                      <p className="text-sm text-gray-500 truncate">{email}</p>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={async () => await logout({ userId: id })}
                  variant="secondary"
                  className="!w-full !h-[44px] text-red-600 !bg-red-50 hover:!bg-red-100 border-none"
                >
                  <LogOut size={18} />
                  Log Out
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Button variant="primary" className="!w-full !h-[48px]">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
