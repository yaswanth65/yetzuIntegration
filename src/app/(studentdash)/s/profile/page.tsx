"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Mail, Phone, Globe, CreditCard, Edit3, Camera, ChevronDown } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <>
      {/* Banner Section */}
      <div className="relative w-full h-[180px] md:h-[220px] bg-gradient-to-r from-[#ffffff] via-[#94b9ff] to-[#042BFD]">
        
        {/* Profile Avatar & Info Overlap */}
        <div className="absolute -bottom-15 md:-bottom-20 left-6 md:left-12 flex items-center md:items-end gap-4 md:gap-6">
          {/* Profile Image - Smaller on mobile (80px), Original on desktop (160px) */}
          <div className="relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] shrink-0">
            <div className="w-full h-full rounded-full border-[4px] md:border-[6px] border-white overflow-hidden shadow-sm bg-gray-100">
              <Image
                src="/Images/kushagra-profile.png" 
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Name and Email - Side by side on mobile, Below on desktop */}
          <div className="mb-0 md:mb-4">
            <h1 className="text-[20px] md:text-[28px] mt-6 md:mb-0 font-bold text-[#1e1e1e] leading-tight">
              Kushagra Bhuwalka
            </h1>
            <p className="text-[#666666]  text-[14px] md:text-base">
              kushagrabhuwalka@gmail.com
            </p>
          </div>
        </div>
        
        {/* Edit Button - Top left icon on mobile, Bottom right button on desktop */}
        <button className="absolute top-4 right-4 md:top-auto md:-bottom-15  md:left-auto md:right-10 bg-[#003fc7] text-white p-2.5 md:px-6 md:py-2.5 rounded-full md:rounded-xl flex items-center gap-2 font-bold text-[14px] shadow-lg hover:bg-blue-800 transition-all">
          <Edit3 size={18} />
          <span className="hidden md:inline">Edit</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-20 md:mt-24 px-6 md:px-12 flex gap-2 md:gap-4">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 md:px-8 py-2 md:py-2.5 rounded-lg font-bold text-[12px] md:text-[14px] transition-all ${
            activeTab === "personal" ? "bg-[#003fc7] text-white shadow-md" : "text-[#666666] hover:bg-gray-50"
          }`}
        >
          Personal
        </button>
        <button
          onClick={() => setActiveTab("payment")}
          className={`px-4 md:px-8 py-2 md:py-2.5 rounded-lg font-bold text-[12px] md:text-[14px] transition-all ${
            activeTab === "payment" ? "bg-[#003fc7] text-white shadow-md" : "text-[#666666] hover:bg-gray-50"
          }`}
        >
          Payment
        </button>
      </div>

      <div className="mx-6 md:mx-12 mt-4 border-t border-[#f0f0f0]" />

      {/* Form Content */}
      <div className="px-6 md:px-12 py-6 md:py-10">
        {activeTab === "personal" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-8">
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                <input
                  type="text"
                  defaultValue="Kushagra Bhuwalka"
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-[#003fc7]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                <input
                  type="email"
                  defaultValue="kushagrabhuwalka@gmail.com"
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-[#003fc7]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                <input
                  type="text"
                  defaultValue="+91 8630040294"
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-[#003fc7]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-[#1e1e1e]">Connections</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                     <span className="text-[10px] font-bold text-gray-600">G</span>
                   </div>
                </div>
                <select className="w-full pl-12 pr-10 py-3 md:py-3.5 rounded-xl border border-[#e5e5e5] text-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#003fc7]">
                  <option>kushagra2005</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999]" size={18} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Toggles */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-20">
              <div className="flex items-start gap-4">
                <div className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" className="sr-only peer" defaultChecked  />
                  <div className="w-11 h-6 bg-[#e5e5e5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003fc7]"></div>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1e1e1e]">Enable Auto Payout</p>
                  <p className="text-[12px] text-[#999999]">Autopayout occurs at the end of each month.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" className="sr-only peer" defaultChecked  />
                  <div className="w-11 h-6 bg-[#e5e5e5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003fc7]"></div>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1e1e1e]">Notify New Payments</p>
                  <p className="text-[12px] text-[#999999]">You will be notified when a payment has been made.</p>
                </div>
              </div>
            </div>

            {/* Payment Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-[#1e1e1e]">Credit Card</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="9978 1128 1558 1978"
                    className="w-full px-4 py-3.5 rounded-full border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#cccccc]">VISA</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-[#1e1e1e]">Card Holder Name</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                  <input
                    type="text"
                    defaultValue="Kushagra Bhuwalka"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-[#1e1e1e]">Country</label>
                <div className="relative flex items-center w-full">
                   <div className="absolute left-4 flex items-center gap-1">
                     <span className="text-[18px]">🇬🇧</span>
                     <ChevronDown size={14} className="text-[#999999]" />
                   </div>
                   <input
                    type="text"
                    defaultValue="United Kingdom"
                    className="w-full pl-16 pr-4 py-3.5 rounded-full border border-[#e5e5e5] text-[#1e1e1e] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-16 flex justify-end gap-4">
          <button className="px-6 md:px-10 py-3 rounded-xl border border-[#e5e5e5] text-[#666666] font-bold text-[14px] hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button className="px-8 md:px-12 py-3 rounded-xl bg-[#003fc7] text-white font-bold text-[14px] shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;