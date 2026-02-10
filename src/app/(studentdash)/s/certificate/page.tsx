"use strict";
"use client";
import React from "react"; 
import Image from "next/image";
import Link from "next/link";
 import { Award } from "lucide-react";
export default function CertificatesPage() {
 
  const CERTIFICATES_DATA = [
    { id: 1, title: "The Trending AI skills" },
    { id: 2, title: "The Trending AI skills" },
    { id: 3, title: "The Trending AI skills" },
    { id: 4, title: "The Trending AI skills" },
  ];
  return (
    <>
    <div className="w-full max-w-[1000px] mx-6 font-inter">
      {/* Section Header */}
      <h2 className="text-xl font-medium text-black mb-4">Your Certificates</h2>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-300 mb-6" />

      {/* Certificates List */}
      <div className="flex flex-col gap-4">
        {CERTIFICATES_DATA.map((cert) => (
          <div
            key={cert.id}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-[16px] p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Left Side: Icon and Title */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <Award size={20} className="text-[#003fc7]" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {cert.title}
              </span>
            </div>

            {/* Right Side: Action Button */}
            <button 
              className="bg-[#042BFD] hover:bg-blue-800 text-white text-[10px] md:text-xs font-bold px-6 py-3 rounded-full transition-all active:scale-95"
            >
              Download Now
            </button>
          </div>
        ))}
      </div>
      <div className="relative hidden md:flex w-full rounded-[20px] overflow-hidden bg-gradient-to-r from-[#1F3CFF] to-[#003FC7] p-4 my-4 items-center justify-between">
  
  {/* LEFT CONTENT */}
  <div className="max-w-xl mx-4 z-10">
    <h2 className="text-2xl   font-semibold text-white mb-4">
      Ready to keep learning?
    </h2>

    <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-6">
      Lorem Ipsum meta description is display here Lorem Ipsum meta
      Lorem Ipsum meta description is display here Lorem Ipsum meta
    </p>

    <div className="flex items-center gap-6">
      <button className="bg-white text-[#003FC7] font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition">
        Explore more Webinars
      </button>

      <button className="text-white font-medium flex items-center gap-2 group">
        View courses
        <span className="transform group-hover:translate-x-1 transition">
          →
        </span>
      </button>
    </div>
  </div>

  {/* RIGHT IMAGE */}
  <div className="relative hidden md:flex justify-end items-end   w-[320px] h-[220px]">
    <Image
      src="/Images/cert-banner.png" // Fixed: Removed 'public/'
      alt="Certificate Banner"
      fill // Use fill for relative parent containers
      className="object-contain"
    />
  </div>

  {/* Glow Effect */}
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-white/10 blur-[120px] rounded-full pointer-events-none"></div>
</div>
    </div>





    </>
  );
}
