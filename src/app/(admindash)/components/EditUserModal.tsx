"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  user?: any;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "I'm an Educator",
    setPassword: "",
    confirmPassword: "",
    expertise: user?.expertise || "",
    availability: user?.availability || "First-half",
  });

  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  const roleOptions = [
    "I'm A student, Of {institution}",
    "I'm an Educator",
    "I'm an Admin",
    "I'm an Editor",
  ];

  const availabilityOptions = [
    "First-half",
    "Second-half",
    "Full-time",
    "Part-time",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
    setIsRoleOpen(false);
  };

  const handleAvailabilityChange = (availability: string) => {
    setFormData((prev) => ({
      ...prev,
      availability,
    }));
    setIsAvailabilityOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.setPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
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
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 19C4.10457 19 5 18.1046 5 17C5 15.8954 4.10457 15 3 15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">Edit Users</h2>
          <p className="text-sm text-gray-500 mb-6">
            Share where you've worked on your profile.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@gmail.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Role*
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsRoleOpen(!isRoleOpen)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 flex items-center justify-between hover:border-gray-300 transition-colors"
                >
                  <span>{formData.role}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform ${
                      isRoleOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isRoleOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {roleOptions.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleChange(role)}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Password Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Set Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Set Password
                </label>
                <input
                  type="password"
                  name="setPassword"
                  value={formData.setPassword}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Expertise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Expertise
              </label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="Human Anatomy"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Availability*
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 flex items-center justify-between hover:border-gray-300 transition-colors"
                >
                  <span>{formData.availability}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform ${
                      isAvailabilityOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isAvailabilityOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {availabilityOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAvailabilityChange(option)}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#042BFD] text-white rounded-lg text-sm font-medium hover:bg-[#021DC0] transition-colors"
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

export default EditUserModal;
