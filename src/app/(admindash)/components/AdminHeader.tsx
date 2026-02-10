"use client";

import React, { useState } from "react";
import { MessageCircle, Bell, Menu, Plus, Upload } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:pl-64 lg:pr-6 h-[72px] bg-gray-50 sticky top-0 z-30 border-b border-gray-200/70">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {/* Action Buttons specific to Admin Header in screenshot */}
        <div className="hidden sm:flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
            Upload Users <Upload size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            Add Users <Plus size={16} />
          </button>
        </div>

        <div className="flex items-center gap-4 relative ml-2 border-l border-gray-200 pl-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-gray-700 hover:bg-blue-100 transition-colors">
            <MessageCircle size={18} strokeWidth={2} />
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-gray-700 hover:bg-blue-100 transition-colors relative">
            <Bell size={18} strokeWidth={2} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden relative">
              <img
                src="https://i.pravatar.cc/100?u=admin"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                Alan Wake
              </p>
              <p className="text-xs text-gray-500 leading-tight">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
