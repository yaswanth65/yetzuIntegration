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
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans">
      {/* Header Section */}
      <div className="sticky top-0 z-20 bg-white px-6 md:px-10 pt-8 border-b border-gray-200 md:static md:z-auto">
        <h1 className="text-[22px] font-semibold text-gray-900 mb-5">Certificates</h1>
        
        <div className="relative max-w-md my-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by session or mentor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Grid Section */}
      <div className="p-3 md:p-6 md:px-10 max-w-[1600px] mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500">Loading certificates...</p>
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-20 md:mb-0">
            <div className="relative w-full max-w-[540px] min-h-[380px] border-[3px] bg-gradient-to-b from-[#E5E9FF] via-[#f2f3fa] to-[#F8F9FF] rounded-[24px] p-7 overflow-hidden shadow-sm border-white font-sans flex flex-col">
              <img
                src="/images/empty-state.svg" 
                alt="Learning Graphic"
                className="absolute -top-20 -right-20 w-[280px] h-[280px] object-contain pointer-events-none z-0"
              />

              <div className="relative z-10 mt-12 flex flex-col h-full flex-1">
                <h2 className="text-[28px] font-bold text-[#0F172A] leading-[1.15] mb-6 max-w-[260px] tracking-tight">
                  Ready to keep learning?
                </h2>

                <p className="text-[16px] text-[#334155] leading-[1.6] max-w-[380px] mb-10 font-medium">
                  Continue your journey by exploring our latest webinars and cohorts designed for your academic excellence.
                </p>

                <Link href="/courses" className="mt-auto self-end flex items-center gap-2 border-[1.5px] border-[#042BFD] text-[#042BFD] bg-transparent hover:bg-blue-50/50 px-6 py-3 rounded-[12px] text-[15px] font-medium transition-colors">
                  Explore More Webinars
                  <ExternalLink size={18} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-20 md:mb-0">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-shadow duration-300 min-h-[280px]"
              >
                <div className="mb-4">
                  {cert.status === "issued" ? <Award color="#fcb51d" /> : <Award color="#a1a1a1" />}
                </div>

                <h3 className="text-[16px] font-semibold text-gray-900 leading-snug mb-5">
                  {cert.title}
                </h3>

                <div className="bg-[#F8F9FB] rounded-xl p-4 flex mb-6 mt-auto">
                  <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 gap-2">
                    <Clock size={16} className="text-gray-500" strokeWidth={1.5} />
                    <span className="text-[13px] text-gray-700 font-medium">
                      {formatDate(cert.issuedAt)}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center gap-2">
                    <User size={16} className="text-gray-500" strokeWidth={1.5} />
                    <span className="text-[13px] text-gray-700 font-medium text-center px-1">
                      {cert.educatorName}
                    </span>
                  </div>
                </div>

                {cert.status === "issued" && cert.certificateEnabled ? (
                  <div className="flex justify-end items-center gap-3">
                    <button
                      onClick={() => handleAddToLinkedIn(cert)}
                      className="px-5 py-2 rounded-lg border border-[#2563EB] text-[#2563EB] text-sm font-medium hover:bg-blue-50 transition-colors"
                    >
                      Add to LinkedIn
                    </button>
                    <div className="relative group shrink-0 flex items-center justify-center">
                      <button
                        onClick={() => handleDownload(cert)}
                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <Download size={18} strokeWidth={1.5} />
                      </button>
                      
                      <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-max">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#262626] rotate-45 rounded-sm"></div>
                        <div className="bg-[#262626] text-white text-[12px] font-medium px-3.5 py-2 rounded-[8px] shadow-xl relative">
                          Download Certificate
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2 text-gray-500 py-1">
                    <Lock size={16} strokeWidth={1.5} />
                    <span className="text-[13px] font-medium">
                      {cert.status === "pending" ? "Pending Issuance" : cert.status === "expired" ? "Expired" : "Complete the session to unlock"}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
