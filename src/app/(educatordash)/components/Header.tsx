"use client";

import React, { useState } from "react";
import { MessageCircle, Bell, ChevronDown, X } from "lucide-react";
import ChatWidget from "./ChatWidget";
import { NOTIFICATIONS } from "../constants";

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

const Header: React.FC = () => {
  const [activePopup, setActivePopup] = useState<
    "chat" | "notifications" | "status" | null
  >(null);
  const [currentStatus, setCurrentStatus] = useState<StatusType>("available");

  const togglePopup = (popup: "chat" | "notifications" | "status") => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const handleStatusChange = (status: StatusType) => {
    setCurrentStatus(status);
    setActivePopup(null);
  };

  const status = STATUS_CONFIG[currentStatus];

  return (
    <header className="flex items-center justify-between pl-64 pr-6 h-[72px] bg-gray-50 sticky top-0 z-30 border-b border-gray-200/70">
      <h1 className="font-inter text-[16px] font-medium px-4 leading-[24px] tracking-[0px] text-black align-middle">
        Welcome Back!
      </h1>

      <div className="flex items-center gap-6">
        {/* Icons */}
        <div className="flex items-center gap-4 relative">
          {/* Chat Button */}
          <button
            onClick={() => togglePopup("chat")}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${activePopup === "chat" ? "bg-blue-100 text-blue-600" : "bg-blue-50 text-gray-700 hover:bg-blue-100"}`}
          >
            <MessageCircle size={18} strokeWidth={2} />
          </button>

          {/* Chat Widget Popup */}
          {activePopup === "chat" && (
            <div className="absolute top-0 right-0 z-[100]">
              <ChatWidget onClose={() => setActivePopup(null)} />
            </div>
          )}

          {/* Notification Button */}
          <button
            onClick={() => togglePopup("notifications")}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors relative ${activePopup === "notifications" ? "bg-blue-100 text-blue-600" : "bg-blue-50 text-gray-700 hover:bg-blue-100"}`}
          >
            <Bell size={18} strokeWidth={2} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Notifications Popup */}
          {activePopup === "notifications" && (
            <div className="absolute top-14 right-[-80px] w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">
                  Notifications
                </h3>
                <button
                  onClick={() => setActivePopup(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {NOTIFICATIONS.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {note.title}
                      </h4>
                      <span className="text-xs text-gray-400">{note.time}</span>
                    </div>
                    <p className="text-sm text-gray-500">{note.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Available Toggle */}
        <div className="relative">
          <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-none h-9 overflow-hidden">
            <div
              className={`${status.bgColor} px-3 h-full flex items-center gap-2 border-r border-gray-200 transition-colors duration-200 min-w-[130px]`}
            >
              <div className={`w-2 h-2 rounded-full ${status.dotColor}`}></div>
              <span className={`text-xs font-medium ${status.textColor}`}>
                {status.label}
              </span>
            </div>
            <button
              onClick={() => togglePopup("status")}
              className={`px-1.5 h-full flex items-center justify-center hover:bg-gray-50 transition-colors ${activePopup === "status" ? "bg-gray-100" : ""}`}
            >
              <ChevronDown
                size={14}
                className={`text-black transition-transform duration-200 ${activePopup === "status" ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Status Dropdown */}
          {activePopup === "status" && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
              <button
                onClick={() => handleStatusChange("available")}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <div className="w-2 h-2 rounded-full bg-[#1FC16B]"></div>
                Online
              </button>
              <button
                onClick={() => handleStatusChange("away")}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <div className="w-2 h-2 rounded-full bg-[#F64E60]"></div>
                Away
              </button>
              <button
                onClick={() => handleStatusChange("leave")}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <div className="w-2 h-2 rounded-full bg-[#7E8299]"></div>
                On Leave
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <img
            src="https://picsum.photos/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden text-right sm:block">
            <p className="font-sfpro text-[14px] font-bold leading-[14px] tracking-[0] text-gray-900">
              Alan Wake
            </p>

            <p className="text-[12px] leading-[16px] text-gray-500">Educator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
