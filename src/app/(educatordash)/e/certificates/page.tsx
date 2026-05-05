"use client";

import React, { useEffect, useState } from "react";
import { Award, Search, Loader2, Download, ExternalLink, Plus, RefreshCw } from "lucide-react";
import { CertificateAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface Certificate {
  id: string;
  certificateId: string;
  certificateCode: string;
  title: string;
  sessionTitle: string;
  sessionId: string;
  studentId: string;
  studentName?: string;
  certificateUrl: string | null;
  issuedAt: string;
  completedAt: string;
  status: string;
  source: string;
  certificateEnabled: boolean;
}

export default function EducatorCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await CertificateAPI.educator.getCertificates();
      const certData = response?.data?.list || response?.list || response || [];
      setCertificates(certData);
    } catch (error) {
      console.error("Failed to load certificates:", error);
      toast.error("Failed to load certificates");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const filteredCertificates = certificates.filter((cert) => {
    const search = searchTerm.toLowerCase();
    return (
      cert.title?.toLowerCase().includes(search) ||
      cert.sessionTitle?.toLowerCase().includes(search) ||
      cert.certificateCode?.toLowerCase().includes(search) ||
      cert.studentName?.toLowerCase().includes(search)
    );
  });

  const handleDownload = (cert: Certificate) => {
    if (!cert.certificateUrl) {
      toast.error("Download not available");
      return;
    }
    window.open(cert.certificateUrl, "_blank");
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
      {/* HEADER */}
      <div className="bg-white px-6 md:px-10 py-4 border-b border-gray-200 shrink-0">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-[26px] font-bold text-gray-900 mb-1">Certificates</h1>
              <p className="text-[14px] text-gray-500">View and manage student certificates</p>
            </div>
            <div className="relative w-full md:w-[320px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-10 max-w-[1600px] mx-auto w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[#6366F1]" />
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Award size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No certificates found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-[16px] font-bold text-gray-900">All Certificates ({filteredCertificates.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Certificate</th>
                    <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Session</th>
                    <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Student</th>
                    <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Code</th>
                    <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Issued</th>
                    <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Status</th>
                    <th className="py-4 px-6 text-[14px] font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCertificates.map((cert) => (
                    <tr key={cert.certificateId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cert.status === "issued" ? "bg-yellow-50 text-yellow-600" : "bg-gray-50 text-gray-400"}`}>
                            <Award size={20} strokeWidth={cert.status === "issued" ? 2 : 1.5} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{cert.title}</p>
                            <p className="text-xs text-gray-500">{cert.source}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{cert.sessionTitle || "N/A"}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{cert.studentName || cert.studentId || "N/A"}</td>
                      <td className="py-4 px-6 text-xs text-gray-500 font-mono">{cert.certificateCode}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{formatDate(cert.issuedAt)}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${cert.status === "issued" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {cert.certificateUrl ? (
                          <button
                            onClick={() => handleDownload(cert)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                          >
                            <Download size={12} /> Download
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
