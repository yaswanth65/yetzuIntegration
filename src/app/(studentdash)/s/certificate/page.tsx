"use client";

import React, { useEffect, useState } from "react";
import { Search, Clock, User, Download, Lock, Award, ExternalLink, FileText } from "lucide-react";
import { CertificateAPI } from "@/lib/api";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Certificate {
  id: string;
  certificateId: string;
  certificateCode: string;
  title: string;
  sessionTitle: string;
  sessionId: string;
  educatorName: string;
  certificateUrl: string | null;
  issuedAt: string;
  completedAt: string;
  status: "issued" | "pending" | "expired";
  source: string;
  certificateEnabled: boolean;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        const response = await CertificateAPI.student.getCertificates();
        // API returns: { success, message, data: { count, generatedFromSessions, list: [...] } }
        const certData = response?.data?.list || response?.list || [];
        
        const mappedCerts: Certificate[] = certData.map((cert: any) => ({
          id: cert.id || cert.certificateId || "",
          certificateId: cert.certificateId || cert.id || "",
          certificateCode: cert.certificateCode || "",
          title: cert.title || "Certificate of Completion",
          sessionTitle: cert.sessionTitle || cert.courseName || "Session",
          sessionId: cert.sessionId || "",
          educatorName: cert.educatorName || "Educator",
          certificateUrl: cert.certificateUrl,
          issuedAt: cert.issuedAt || cert.issueDate || "",
          completedAt: cert.completedAt || "",
          status: cert.status === "issued" ? "issued" : cert.status === "pending" ? "pending" : "expired",
          source: cert.source || "session_completion",
          certificateEnabled: cert.certificateEnabled !== false,
        }));
        
        setCertificates(mappedCerts);
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
        setCertificates([]);
        toast.error("Failed to load certificates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const filteredCertificates = certificates.filter((cert) => {
    const search = searchTerm.toLowerCase();
    return (
      cert.title.toLowerCase().includes(search) ||
      cert.sessionTitle.toLowerCase().includes(search) ||
      cert.educatorName.toLowerCase().includes(search) ||
      cert.certificateCode.toLowerCase().includes(search)
    );
  });

  const handleDownload = async (cert: Certificate) => {
    if (!cert.certificateUrl) {
      toast.error("Download not available");
      return;
    }
    window.open(cert.certificateUrl, "_blank");
  };

  const handleAddToLinkedIn = (cert: Certificate) => {
    const issueDate = cert.issuedAt ? new Date(cert.issuedAt) : new Date();
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.title)}&organizationName=${encodeURIComponent("Yetzu")}&issueYear=${encodeURIComponent(issueDate.getFullYear().toString())}&issueMonth=${encodeURIComponent((issueDate.getMonth() + 1).toString())}&certUrl=${encodeURIComponent(window.location.origin + "/s/certificate/" + cert.id)}&certId=${encodeURIComponent(cert.certificateCode)}`;
    window.open(linkedInUrl, "_blank");
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="font-sans">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500">Loading certificates...</p>
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
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

                <Link href="/courses" className="mt-auto w-full sm:w-fit flex items-center justify-center gap-2 bg-[#042BFD] hover:bg-[#0325D7] text-white px-8 py-4 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-xl shadow-blue-600/20">
                  Explore Webinars
                  <ExternalLink size={18} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="group bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 min-h-[340px] relative overflow-hidden"
              >
                {cert.status === "issued" && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-yellow-400/10 transition-colors"></div>
                )}

                {/* Medal Icon */}
                <div className="mb-6 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cert.status === "issued" ? "bg-yellow-50 text-yellow-600" : "bg-gray-50 text-gray-400"}`}>
                    <Award size={28} strokeWidth={cert.status === "issued" ? 2.5 : 1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-6 relative z-10 group-hover:text-[#042BFD] transition-colors">
                  {cert.title}
                </h3>

                {/* Course Name */}
                <p className="text-sm text-gray-600 mb-2 relative z-10">
                  {cert.sessionTitle}
                </p>

                {/* Certificate Code */}
                {cert.certificateCode && (
                  <p className="text-xs text-gray-400 mb-4 relative z-10 font-mono">
                    {cert.certificateCode}
                  </p>
                )}

                {/* Details Box */}
                <div className="bg-gray-50 rounded-2xl p-5 flex gap-4 mb-8 mt-auto relative z-10 border border-gray-100">
                  <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 gap-1.5 px-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider text-center">
                      {formatDate(cert.issuedAt)}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider text-center truncate w-full">
                      {cert.educatorName}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative z-10">
                  {cert.status === "issued" && cert.certificateEnabled ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleAddToLinkedIn(cert)}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-[#042BFD] text-[#042BFD] text-xs font-bold hover:bg-blue-50 transition-all active:scale-95"
                      >
                        Add to LinkedIn
                      </button>
                      <div className="relative group/download shrink-0">
                        <button 
                          onClick={() => handleDownload(cert)}
                          className="p-3 rounded-xl bg-[#021165] text-white hover:bg-[#031a9c] transition-all active:scale-95 shadow-lg shadow-blue-900/10"
                        >
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
                        {cert.status === "pending" ? "Pending Issuance" : cert.status === "expired" ? "Expired" : "Unavailable"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
