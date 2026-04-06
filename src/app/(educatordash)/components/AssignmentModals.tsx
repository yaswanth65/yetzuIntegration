"use client";

import React, { useState, useRef } from "react";
import { X, Upload, ChevronDown, Loader2 } from "lucide-react";
import { WEBINARS_LIST } from "../constants";
import { EducatorAPI } from "@/lib/api";
import useSession from "@/hooks/useSession";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateAssignmentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user, accessToken } = useSession();
  const [selectedWebinar, setSelectedWebinar] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 500 * 1024) {
        toast.error("File size must be less than 500KB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!accessToken || !user?.id) {
      toast.error("Please login to create assignment");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (dueDate) {
        formData.append("dueDate", new Date(dueDate).toISOString());
      }
      if (selectedWebinar) {
        formData.append("courseId", String(selectedWebinar));
      }
      if (file) {
        formData.append("file", file);
      }

      await EducatorAPI.createAssignment(  formData);
      toast.success("Assignment created successfully!");
      onSuccess?.();
      onClose();
      setTitle("");
      setDescription("");
      setDueDate("");
      setFile(null);
      setSelectedWebinar(null);
    } catch (error: any) {
      console.error("Failed to create assignment:", error);
      toast.error(error.message || "Failed to create assignment");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 p-3 sm:p-4">
      <div className="bg-white rounded-xl w-full max-w-[600px] max-h-[calc(100vh-24px)] sm:max-h-[calc(100vh-40px)] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4 sm:mb-6 px-4 sm:px-8 pt-4 sm:pt-8 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Create Assignment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-8 overflow-y-auto flex-1">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-sm sm:text-base font-bold text-gray-900">
              Select Webinar
            </label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-gray-700 text-xs sm:text-sm placeholder:text-gray-400 bg-white flex items-center justify-between hover:border-gray-300"
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
                  size={16}
                  className={`text-gray-400 transition-transform sm:w-[18px] sm:h-[18px] ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-none z-10 max-h-[240px] sm:max-h-[320px] overflow-y-auto">
                  {WEBINARS_LIST.map((webinar) => (
                    <button
                      key={webinar.id}
                      onClick={() => {
                        setSelectedWebinar(webinar.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 flex items-center justify-between group"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {webinar.name}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-500">
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

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-sm sm:text-base font-bold text-gray-900">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-gray-700 text-xs sm:text-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-sm sm:text-base font-bold text-gray-900">
              Description
            </label>
            <textarea
              placeholder="Enter your Message"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-gray-700 min-h-[100px] sm:min-h-[140px] resize-none text-xs sm:text-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-sm sm:text-base font-bold text-gray-900">
              Due Date
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-gray-700 text-xs sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-sm sm:text-base font-bold text-gray-900">
              Add Attachment
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border border-gray-200 rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors border-dashed bg-white"
            >
              <Upload
                size={20}
                className="sm:w-6 sm:h-6 text-gray-900 mb-2 sm:mb-3"
                strokeWidth={2}
              />
              {file ? (
                <p className="text-sm sm:text-base font-bold text-green-600 mb-1">
                  {file.name}
                </p>
              ) : (
                <>
                  <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                    Drop your file here
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    or{" "}
                    <span className="text-blue-600 font-bold hover:underline">
                      browse file
                    </span>{" "}
                    in your computer
                  </p>
                </>
              )}
              <p className="text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4">
                Supports PDF up to 500kb
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-4 sm:px-8 pb-4 sm:pb-8 pt-4 sm:pt-6 border-t border-gray-200 flex-shrink-0 bg-white">
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#042BFD] hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-lg transition-colors shadow-none shadow-blue-600/20 text-xs sm:text-sm w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 p-3 sm:p-4">
      <div className="bg-white rounded-xl w-full max-w-[500px] p-4 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Upload Feedbacks
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="border-[1.5px] border-blue-600 rounded-xl p-6 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/30 transition-colors border-dashed mb-4 sm:mb-8 bg-white">
          <Upload
            size={24}
            className="sm:w-8 sm:h-8 text-gray-900 mb-3 sm:mb-4"
            strokeWidth={2}
          />
          <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">
            Drop your file here
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            or{" "}
            <span className="text-blue-600 font-bold hover:underline">
              browse file
            </span>{" "}
            in your computer
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-4 sm:mt-6">
            Supports PDF up to 500kb
          </p>
        </div>

        <button className="w-full bg-[#042BFD] hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3.5 rounded-lg transition-colors shadow-none shadow-blue-600/20 text-xs sm:text-sm">
          Upload
        </button>
      </div>
    </div>
  );
};
