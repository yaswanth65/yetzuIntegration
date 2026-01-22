"use strict";
"use client";

import { useGetStudentOverview } from "@/lib/queries/dashboard/useDashboard";
import { Download, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Webinar } from "@/lib/queries/dashboard/types";

export default function CertificatesPage() {
  const { data, isLoading } = useGetStudentOverview();

  // Using filtered webinars or all webinars as per requirement.
  // Since API doesn't distinguish 'completed' explicitly in types provided,
  // we assume the list returned are the ones user has access to/completed.
  const webinars: Webinar[] = data?.webinars || [];

  // Fallback/Demo Data only if API is empty and loading is done (optional, but good for visualizing the layout without data)
  // Removed to stick to real data as per "cache and use it" instruction.

  return (
    <div className="p-1 bg-[#F9FAFB] min-h-screen font-['Inter']">
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button className="px-6 py-2 bg-[#042BFD] text-white rounded-lg text-sm font-medium shadow-none transition-colors">
          Certificates
        </button>
        <button className="px-6 py-2 bg-white text-gray-500 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
          Reports
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-10 h-auto lg:h-[300px]">
        {/* Hero Banner */}
        <div className="flex-[2] bg-gradient-to-r from-[#042BFD] to-[#2F54FF] rounded-[20px] p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10 max-w-lg">
            <h1 className="text-3xl font-bold mb-4">Ready to keep learning?</h1>
            <p className="text-blue-100 mb-8 max-w-md text-sm leading-relaxed">
              Loren Ipsum meta description is display here Loren Ipsum meta
              Loren Ipsum meta description is display here Loren Ipsum meta
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/s/webinars"
                className="bg-white text-[#042BFD] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                Explore more Webinars
              </Link>
              <Link
                href="/s/courses"
                className="flex items-center gap-2 font-medium text-sm hover:text-blue-100 transition-colors"
              >
                View courses <ChevronRight size={16} />
              </Link>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Stat Card */}
        <div className="flex-1 bg-[#EBF0FF] rounded-[20px] p-6 flex flex-col items-center justify-center text-center min-w-[280px]">
          <div className="mb-6 relative w-32 h-32">
            {/* Placeholder for the illustration */}
            <Image
              src="/images/placeholder.png"
              alt="Illustration"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-gray-600 font-medium text-sm">Total Webinar</p>
          <p className="text-gray-600 font-medium text-sm mb-2">Attended</p>
          <span className="text-[#021165] text-5xl font-bold">
            {webinars.length}
          </span>
        </div>
      </div>

      {/* Completed Webinars Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Completed Webinars
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[300px] bg-gray-200 rounded-[20px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : webinars.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[20px] border border-gray-100">
            <p className="text-gray-500">No completed webinars found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white p-4 rounded-[20px] border border-gray-100 shadow-none flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="h-40 rounded-xl bg-gray-200 relative overflow-hidden mb-4 group">
                  <Image
                    src={webinar.thumbnail || "/images/placeholder.png"}
                    alt={webinar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3
                  className="font-semibold text-gray-900 mb-2 truncate text-lg"
                  title={webinar.title}
                >
                  {webinar.title}
                </h3>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2 h-8">
                  {webinar.description}
                </p>

                <button className="mt-auto w-full bg-[#042BFD] text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#0325D7] transition-colors">
                  <Download size={16} />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
