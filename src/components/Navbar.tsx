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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useSession from "@/hooks/useSession";
import { useLogoutMutation } from "@/lib/queries/identityService/useIdentityService";

const Navbar = () => {
  const { user: { name, email, id = '' } = {} } = useSession();
  const { mutateAsync: logout } = useLogoutMutation();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const coursesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        coursesMenuRef.current &&
        !coursesMenuRef.current.contains(event.target as Node)
      ) {
        setIsCoursesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    { href: "/assignments", label: "Assignments" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const coursesDropdown = [
    { href: "/courses/medical", label: "Course 1" },
    { href: "/courses/engineering", label: "Course 2" },
    { href: "/courses/commerce", label: "Course 3" },
  ];

  const userMenuItems = [
    { href: "/profile/courses", label: "My Courses", icon: FileText },
    { href: "/profile/submissions", label: "My Submissions", icon: FileText },
    { href: "/profile/awards", label: "Awards", icon: Award },
    { href: "/profile/notifications", label: "Notifications", icon: Bell },
    { href: "/profile", label: "My Profile", icon: User },
    { href: "/profile/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16 h-[68px]">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Logo.png"
                alt="Yetzu Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8 text-gray-800">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#2563eb] font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Courses Dropdown */}
            <div className="relative" ref={coursesMenuRef}>
              <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="flex items-center gap-1 hover:text-[#2563eb] font-medium transition-colors duration-200"
              >
                Courses
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isCoursesOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border border-gray-100 rounded-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {coursesDropdown.map((course) => (
                    <Link
                      key={course.href}
                      href={course.href}
                      className="block px-4 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-[#2563eb] transition-colors duration-150 font-medium"
                      onClick={() => setIsCoursesOpen(false)}
                    >
                      {course.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Bell (Desktop - only when logged in) */}
            {name && (
              <button className="hidden lg:flex relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Bell size={20} className="text-gray-700" />
                {hasUnreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            )}

            {/* User Menu or Login Button (Desktop) */}
            {name ? (
              <div className="hidden lg:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-600 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""
                      }`}
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
                      {userMenuItems.map((item) => {
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
                      <button onClick={async () => await logout({ userId: id })} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors duration-150 mt-1 border-t border-gray-100">
                        <LogOut size={18} />
                        <span className="font-medium">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:block bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                Log In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-gray-700" />
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
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
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
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563eb] rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Bell size={18} />
                  {link.label}
                </Link>
              ))}

              {/* Courses Section */}
              <div className="pt-2">
                <button
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563eb] rounded-lg transition-all duration-200 font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Bell size={18} />
                    Courses
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isCoursesOpen && (
                  <div className="mt-1 ml-6 space-y-1">
                    {coursesDropdown.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        className="block px-4 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-[#2563eb] rounded-lg transition-all duration-200"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {course.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* User Menu Items (Mobile - only when logged in) */}
              {name && (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-1">
                  {userMenuItems.map((item) => {
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
                <button onClick={async () => await logout({ userId: id })} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200 font-medium">
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
