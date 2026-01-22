"use client";

import React, { useState } from "react";
import { X, Upload, ChevronDown } from "lucide-react";
import { WEBINARS_LIST } from "../constants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAssignmentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedWebinar, setSelectedWebinar] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 p-4">
      <div className="bg-white rounded-xl w-full max-w-[600px] max-h-[calc(100vh-40px)] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6 px-8 pt-8 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Create Assignment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 px-8 overflow-y-auto flex-1">
          <div className="flex flex-col gap-2">
            <label className="text-base font-bold text-gray-900">
              Select Webinar
            </label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-gray-700 text-sm placeholder:text-gray-400 bg-white flex items-center justify-between hover:border-gray-300"
              >
                <span
                  className={
                    selectedWebinar ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {selectedWebinar
                    ? WEBINARS_LIST.find((w) => w.id === selectedWebinar)?.name
                    : "Choose a webinar"}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-[320px] overflow-y-auto">
                  {WEBINARS_LIST.map((webinar) => (
                    <button
                      key={webinar.id}
                      onClick={() => {
                        setSelectedWebinar(webinar.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 flex items-center justify-between group"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {webinar.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {webinar.type}
                        </span>
                      </div>
                      {selectedWebinar === webinar.id && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-bold text-gray-900">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-gray-700 text-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-bold text-gray-900">
              Description
            </label>
            <textarea
              placeholder="Enter your Message"
              className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-gray-700 min-h-[140px] resize-none text-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-bold text-gray-900">
              Add Attachment
            </label>
            <div className="border border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors border-dashed bg-white">
              <Upload
                size={24}
                className="text-gray-900 mb-3"
                strokeWidth={2}
              />
              <p className="text-base font-bold text-gray-900 mb-1">
                Drop your file here
              </p>
              <p className="text-sm text-gray-500">
                or{" "}
                <span className="text-blue-600 font-bold hover:underline">
                  browse file
                </span>{" "}
                in your computer
              </p>
              <p className="text-xs text-gray-400 mt-4">
                Supports PDF up to 500kb
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-8 pb-8 pt-6 border-t border-gray-200 flex-shrink-0 bg-white">
          <button className="bg-[#042BFD] hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-lg transition-colors shadow-lg shadow-blue-600/20 text-sm">
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export const UploadFeedbackModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-[500px] p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Upload Feedbacks</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="border-[1.5px] border-blue-600 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/30 transition-colors border-dashed mb-8 bg-white">
          <Upload size={32} className="text-gray-900 mb-4" strokeWidth={2} />
          <p className="text-lg font-bold text-gray-900 mb-1">
            Drop your file here
          </p>
          <p className="text-sm text-gray-500">
            or{" "}
            <span className="text-blue-600 font-bold hover:underline">
              browse file
            </span>{" "}
            in your computer
          </p>
          <p className="text-xs text-gray-400 mt-6">Supports PDF up to 500kb</p>
        </div>

        <button className="w-full bg-[#042BFD] hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-blue-600/20 text-sm">
          Upload
        </button>
      </div>
    </div>
  );
};
