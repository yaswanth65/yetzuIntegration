 
"use client";

import React, { useState } from "react";
import { MessageCircle, Bell, ChevronDown, Menu } from "lucide-react";
import { NOTIFICATIONS } from "../constants";
import NotificationsPopup from "./Notification";

type StatusType = "available" | "away" | "leave";

interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  available: {
    label: "Available Now",
    bgColor: "bg-[#CEF7E1]",
    textColor: "text-[#1FC16B]",
    dotColor: "bg-[#1FC16B]",
  },
  away: {
    label: "Away",
    bgColor: "bg-[#FFE2E5]",
    textColor: "text-[#F64E60]",
    dotColor: "bg-[#F64E60]",
  },
  leave: {
    label: "On leave",
    bgColor: "bg-[#E4E6EF]",
    textColor: "text-[#7E8299]",
    dotColor: "bg-[#7E8299]",
  },
};

interface HeaderProps {
  onMenuClick?: () => void;
  onChatToggle: () => void;
  isChatActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onChatToggle, 
  isChatActive 
}) => {
  const [activePopup, setActivePopup] = useState<"notifications" | "status" | null>(null);
  const [currentStatus, setCurrentStatus] = useState<StatusType>("available");

  const togglePopup = (popup: "notifications" | "status") => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const handleStatusChange = (status: StatusType) => {
    setCurrentStatus(status);
    setActivePopup(null);
  };

  const status = STATUS_CONFIG[currentStatus];

  return (
    <header className="flex items-center justify-between px-4 sm:px-6   lg:px-6 h-[72px] bg-gray-50 sticky top-0 z-30 border-b border-gray-200/70 font-inter">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        <h1 className="text-[14px] sm:text-[16px] font-medium lg:px-7 leading-[24px] text-black">
          Welcome Back!
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <div className="flex items-center gap-4 relative">
          {/* Chat Button - Integrated with Layout Toggle */}
          <button
            onClick={onChatToggle}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              isChatActive 
                ? "bg-blue-100 text-[#003fc7]" 
                : "bg-blue-50 text-gray-700 hover:bg-blue-100"
            }`}
          >
            <MessageCircle size={18} strokeWidth={2} />
          </button>

          {/* Notification Button */}
          <button
            onClick={() => togglePopup("notifications")}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors relative ${
              activePopup === "notifications" ? "bg-blue-100 text-[#003fc7]" : "bg-blue-50 text-gray-700 hover:bg-blue-100"
            }`}
          >
            <Bell size={18} strokeWidth={2} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Notifications Drawer */}
          {activePopup === "notifications" && (
            <NotificationsPopup onClose={() => setActivePopup(null)}  />
          )}
        </div>

        {/* Status Toggle */}
        <div className="relative hidden sm:block">
          <div className="flex items-center bg-white rounded-lg border border-gray-200 h-9 overflow-hidden">
            <div
              className={`${status.bgColor} px-3 h-full flex items-center gap-2 border-r border-gray-200 min-w-[130px]`}
            >
              <div className={`w-2 h-2 rounded-full ${status.dotColor}`}></div>
              <span className={`text-xs font-medium ${status.textColor}`}>
                {status.label}
              </span>
            </div>
            <button
              onClick={() => togglePopup("status")}
              className={`px-1.5 h-full flex items-center justify-center hover:bg-gray-50 transition-colors ${
                activePopup === "status" ? "bg-gray-100" : ""
              }`}
            >
              <ChevronDown
                size={14}
                className={`text-black transition-transform duration-200 ${
                  activePopup === "status" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Status Dropdown */}
          {activePopup === "status" && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
              {(Object.keys(STATUS_CONFIG) as StatusType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <div className={`w-2 h-2 rounded-full ${STATUS_CONFIG[key].dotColor}`}></div>
                  {STATUS_CONFIG[key].label.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden relative">
            <img
              src="https://picsum.photos/40/40"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden text-right md:block">
            <p className="text-[14px] font-bold leading-none text-gray-900 mb-1">
              Alan Wake
            </p>
            <p className="text-[12px] leading-none text-gray-500">Educator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;