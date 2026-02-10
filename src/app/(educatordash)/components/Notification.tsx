"use client";

import React from "react";
import { X, Video } from "lucide-react";
import Image from "next/image";

const NOTIFICATIONS = [
  {
    id: 1,
    user: "Amit Bhat",
    action: "has uploaded a Document",
    time: "about 15 s ago",
    avatar: "/Images/amit-avatar.png", // Replace with actual path
    type: "upload",
  },
  {
    id: 2,
    title: "Morning Standup",
    message: "Please join the meeting at 9AM",
    avatar: null,
    type: "meeting",
  },
  {
    id: 3,
    user: "Jatin Singhal",
    action: "has uploaded a Document",
    time: "about 15 s ago",
    avatar: "/Images/jatin-avatar.png", // Replace with actual path
    type: "upload",
  },
];

const NotificationsPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 font-inter">
          Notifications
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-black stroke-[3]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {NOTIFICATIONS.map((note) => (
          <div
            key={note.id}
            className="px-6 py-5 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              {/* Icon / Avatar Section */}
              <div className="relative flex-shrink-0">
                {note.type === "meeting" ? (
                  <div className="w-10 h-10 rounded-full bg-[#003fc7] flex items-center justify-center shadow-lg shadow-blue-100">
                    <Video size={18} className="text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative">
                    <Image
                      src={note.avatar || "/Images/placeholder-avatar.png"}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Text Section */}
              <div className="flex-1">
                {note.type === "meeting" ? (
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">
                      {note.title}
                    </h4>
                    <p className="text-[13px] text-gray-500 font-medium">
                      {note.message}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[14px] leading-snug">
                      <span className="font-bold text-gray-900">{note.user}</span>{" "}
                      <span className="text-gray-500 font-medium">{note.action}</span>
                    </p>
                    <span className="text-[12px] text-gray-400 mt-1 block">
                      {note.time}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPopup;