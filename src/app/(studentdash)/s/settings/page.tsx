"use strict";
"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Share2,
    Edit2,
    User,
    Mail,
    Phone,
    Globe,
    X,
    Check,
    Camera
} from "lucide-react";
import useSession from "@/hooks/useSession";

export default function SettingsPage() {
    const { user } = useSession();
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: user?.name || "Kushagra Bhuwalka",
        email: user?.email || "kushagrabhuwalka@gmail.com",
        phone: "+91 86300 40294",
        connection: "kushagra2005"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Logic to save data would go here
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset to original data (mock logic for now, in real app might need ref or separate state)
        setIsEditing(false);
    };

    return (
        <div className="p-1 bg-[#F9FAFB] min-h-screen font-['Inter']">
            <div className="mx-auto bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">

                {/* Header Banner */}
                <div className="h-48 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-400 relative">
                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <Edit2 size={16} />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    {/* Profile Header section with negative margin to overlap banner */}
                    <div className="relative -mt-16 flex flex-col gap-6 items-start mb-10">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 relative">
                                <Image
                                    src={"/images/placeholder.png"}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 p-2 bg-[#042BFD] text-white rounded-full border-2 border-white hover:bg-[#0325D7] transition-colors">
                                    <Camera size={16} />
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div className="">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-2xl font-bold text-gray-900">{formData.fullName}</h1>
                                        <span className="px-3 py-1 bg-blue-50 text-[#042BFD] text-xs font-medium rounded-full border border-blue-100">
                                            Student
                                        </span>
                                    </div>
                                    <p className="text-gray-500">{formData.email}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
                                    <Share2 size={16} />
                                    Share
                                </button>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#042BFD] text-white rounded-full font-medium hover:bg-[#0325D7] transition-colors text-sm"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 mb-10"></div>

                    {/* Personal Info Section */}
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Left Column: Description */}
                        <div className="lg:w-1/3">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">Personal Info</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                You can change your personal information settings here.
                            </p>
                        </div>

                        {/* Right Column: Form */}
                        <div className="lg:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                    <div className={`relative flex items-center transition-all ${isEditing ? "opacity-100" : "opacity-80"}`}>
                                        <div className="absolute left-3 text-gray-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${isEditing
                                                ? "border-gray-200 focus:border-[#042BFD] focus:ring-2 focus:ring-blue-50 bg-white"
                                                : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Email</label>
                                    <div className={`relative flex items-center transition-all ${isEditing ? "opacity-100" : "opacity-80"}`}>
                                        <div className="absolute left-3 text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${isEditing
                                                ? "border-gray-200 focus:border-[#042BFD] focus:ring-2 focus:ring-blue-50 bg-white"
                                                : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                    <div className={`relative flex items-center transition-all ${isEditing ? "opacity-100" : "opacity-80"}`}>
                                        <div className="absolute left-3 text-gray-400">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${isEditing
                                                ? "border-gray-200 focus:border-[#042BFD] focus:ring-2 focus:ring-blue-50 bg-white"
                                                : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Connections */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Connections</label>
                                    <div className={`relative flex items-center transition-all ${isEditing ? "opacity-100" : "opacity-80"}`}>
                                        <div className="absolute left-3 text-gray-400">
                                            <Globe size={18} />
                                        </div>
                                        <select
                                            name="connection"
                                            value={formData.connection}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none appearance-none transition-all ${isEditing
                                                ? "border-gray-200 focus:border-[#042BFD] focus:ring-2 focus:ring-blue-50 bg-white"
                                                : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                                                }`}
                                        >
                                            <option value="kushagra2005">kushagra2005</option>
                                            <option value="other">Other Connection</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions (Only visible when editing) */}
                {isEditing && (
                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 animate-in slide-in-from-bottom-2 duration-200">
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors text-sm bg-white"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#042BFD] text-white font-medium hover:bg-[#0325D7] transition-colors text-sm shadow-sm"
                        >
                            <Check size={16} />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
