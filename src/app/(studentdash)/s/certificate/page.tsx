"use client";

import React from "react";
import { Search, Clock, User, Download, Lock, Award, ExternalLink } from "lucide-react";

const BronzeMedal = () => (
<Award color="#fcb51d" />
);

const GreyMedal = () => (
  <Award color="#a1a1a1" />
);

export default function CertificatesPage() {
  const CERTIFICATES_DATA = [
    {
      id: 1,
      title: "Certificate of Completion - Advanced Insights into Cardiac Arrhythmias",
      hours: "1.5",
      mentor: "Dr. Sofiya Tyler",
      status: "unlocked",
    },
    {
      id: 2,
      title: "Certificate of Completion - Mastering Data Visualization Techniques",
      hours: "2",
      mentor: "Mr. Kevin Chen",
      status: "unlocked",
    },
    {
      id: 3,
      title: "Certificate of Completion - Fundamentals of User Experience Design",
      hours: "2.5",
      mentor: "Ms. Laura Martinez",
      status: "locked",
    },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans flex flex-col">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#021165]">Certificates</h1>
            <p className="text-gray-500 text-sm mt-1">View and download your earned certifications</p>
          </div>
          
          <div className="relative w-full md:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search by session or mentor..."
              className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/10 focus:border-[#042BFD] transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 min-h-[340px] relative overflow-hidden"
            >
              {cert.status === "unlocked" && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-yellow-400/10 transition-colors"></div>
              )}

              {/* Medal Icon */}
              <div className="mb-6 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cert.status === "unlocked" ? "bg-yellow-50 text-yellow-600" : "bg-gray-50 text-gray-400"}`}>
                  <Award size={28} strokeWidth={cert.status === "unlocked" ? 2.5 : 1.5} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-6 relative z-10 group-hover:text-[#042BFD] transition-colors">
                {cert.title}
              </h3>

              {/* Details Box */}
              <div className="bg-gray-50 rounded-2xl p-5 flex gap-4 mb-8 mt-auto relative z-10 border border-gray-100">
                <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 gap-1.5 px-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider text-center">
                    {cert.hours} Hours
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider text-center truncate w-full">
                    {cert.mentor}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="relative z-10">
                {cert.status === "unlocked" ? (
                  <div className="flex items-center gap-3">
                    <button className="flex-1 px-4 py-3 rounded-xl border-2 border-[#042BFD] text-[#042BFD] text-xs font-bold hover:bg-blue-50 transition-all active:scale-95">
                      Add to LinkedIn
                    </button>
                    <div className="relative group/download shrink-0">
                      <button className="p-3 rounded-xl bg-[#021165] text-white hover:bg-[#031a9c] transition-all active:scale-95 shadow-lg shadow-blue-900/10">
                        <Download size={20} strokeWidth={2} />
                      </button>
                      <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover/download:opacity-100 group-hover/download:visible transition-all duration-200 z-50">
                        <div className="bg-[#1a1a1a] text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap uppercase tracking-widest">
                          Download PDF
                          <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-[#1a1a1a] rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2 text-gray-400 py-3 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <Lock size={16} strokeWidth={2} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Session Locked
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Banner Section */}
          <div className="relative w-full bg-gradient-to-br from-[#E5E9FF] via-[#f2f3fa] to-white rounded-[32px] p-8 md:p-10 overflow-hidden shadow-sm border border-white flex flex-col min-h-[380px]">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
            <img
              src="/images/empty-state.svg" 
              alt="Learning Graphic"
              className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 object-contain pointer-events-none z-0 opacity-40 md:opacity-100"
            />

            <div className="relative z-10 flex flex-col h-full flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#021165] leading-tight mb-4 max-w-[240px]">
                Ready to keep learning?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-[320px] mb-10 font-medium">
                Continue your journey by exploring our latest webinars and cohorts designed for your academic excellence.
              </p>

              <button className="mt-auto w-full sm:w-fit flex items-center justify-center gap-2 bg-[#042BFD] hover:bg-[#0325D7] text-white px-8 py-4 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-xl shadow-blue-600/20">
                Explore Webinars
                <ExternalLink size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}