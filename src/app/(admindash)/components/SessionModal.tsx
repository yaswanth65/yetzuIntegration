"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, ChevronDown } from "lucide-react";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

const SessionModal: React.FC<SessionModalProps> = ({
  isOpen,
  onClose,
  isEdit = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {isEdit ? "Edit Session" : "Add Session"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Share where you've worked on your profile.
          </p>

          {/* Form */}
          <form className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Title*
              </label>
              <input
                type="text"
                defaultValue={isEdit ? "Importance of Medical Ethics" : ""}
                placeholder="Enter title"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Description*
              </label>
              <textarea
                rows={3}
                defaultValue={isEdit ? "Importance of Medical Ethics" : ""}
                placeholder="Enter description"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Type & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Type*
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-500">
                    <option>Type of Session</option>
                    <option>Webinar</option>
                    <option>Cohort</option>
                    <option>Mentorship</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Date*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={isEdit ? "26-01-26" : ""}
                    placeholder="Select Date"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                  />
                  <Calendar
                    className="absolute right-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            </div>

            {/* Educator */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex justify-between">
                <span>Add Educator*</span>
                <span className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  +
                </span>
              </label>
              <div className="relative">
                <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white flex items-center justify-between">
                  <span className="text-gray-500">Educator Name</span>
                  <ChevronDown className="text-gray-400" size={16} />
                </div>
              </div>
              {/* Selected Educator Chip */}
              {isEdit && (
                <div className="mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between w-full">
                  <span>John Michael</span>
                  <X size={14} className="cursor-pointer text-gray-500" />
                </div>
              )}
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Start Time*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="12:30 PM"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
                  />
                  <Clock
                    className="absolute right-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  End Time*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="12:30 PM"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
                  />
                  <Clock
                    className="absolute right-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-0">
              Session should be 60 mins long
            </p>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Price*
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-gray-500">₹</span>
                <input
                  type="text"
                  defaultValue={isEdit ? "230" : ""}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-blue-600 rounded-lg text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
