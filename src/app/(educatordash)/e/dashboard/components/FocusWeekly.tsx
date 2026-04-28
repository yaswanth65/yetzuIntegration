"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Video,
  FileText,
  User,
  Users,
  Calendar,
  Clock,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EducatorAPI, asArray } from "@/lib/api";

interface FocusItem {
  id: string;
  title: string;
  badgeLabel: string | null;
  badgeColor: string;
  watermarkIcon: string;
  watermarkColor: string;
  date: string;
  time: string | null;
  buttonText: string;
  buttonType: "solid" | "outline";
  gradientFrom: string;
  type: "session" | "assignment";
  sessionId?: string;
  assignmentId?: string;
}

const defaultItems: FocusItem[] = [
  {
    id: "session-1",
    title: "Webinar: Major Insights on Human Nervous System with Dr. Rao",
    badgeLabel: "TODAY",
    badgeColor: "bg-[#7C3AED] text-white",
    watermarkIcon: "/admin-dashboard/cam.svg",
    watermarkColor: "text-[#7C3AED]/10",
    date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
    time: "3:00 PM",
    buttonText: "Join Now",
    buttonType: "solid",
    gradientFrom: "from-[#F3E8FF]",
    type: "session",
    sessionId: "WEB-001",
  },
  {
    id: "assignment-1",
    title: "Research Methodology Paper Review",
    badgeLabel: "DUE IN 2 DAYS",
    badgeColor: "bg-[#FEF3C7] text-[#D97706]",
    watermarkIcon: "/admin-dashboard/file-edit-line.svg",
    watermarkColor: "text-[#10B981]/10",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
    time: null,
    buttonText: "View Details",
    buttonType: "outline",
    gradientFrom: "from-[#D1FAE5]",
    type: "assignment",
  },
  {
    id: "session-2",
    title: "Cohort Session - Research Paper Draft",
    badgeLabel: null,
    badgeColor: "",
    watermarkIcon: "/admin-dashboard/user-2-line.svg",
    watermarkColor: "text-[#F97316]/10",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
    time: "7:00 PM",
    buttonText: "View Details",
    buttonType: "outline",
    gradientFrom: "from-[#FFEDD5]",
    type: "session",
  },
  {
    id: "session-3",
    title: "Mentorship Session - Career Strategy",
    badgeLabel: null,
    badgeColor: "",
    watermarkIcon: "/admin-dashboard/team-line.svg",
    watermarkColor: "text-[#0EA5E9]/10",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
    time: "7:00 PM",
    buttonText: "View Details",
    buttonType: "outline",
    gradientFrom: "from-[#E0F2FE]",
    type: "session",
  },
];

export default function FocusWeekly() {
  const [items, setItems] = useState<FocusItem[]>(defaultItems);
  const [weekOffset, setWeekOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FocusItem | null>(null);
  const router = useRouter();

  const fetchFocusData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await EducatorAPI.getOverview();
      const data = response?.data || response;
      const sessions = asArray(data?.todaySessions || data?.upcomingSessions || data?.sessions);
      const assignments = asArray(data?.pendingAssignments || data?.pendingSubmissions || data?.assignments);
      
      const nextItems: any[] = [
        ...sessions.slice(0, 2).map((session: any, index: number) => ({
          id: `session-${session.id || session._id || index}`,
          title: session.title || session.sessionTitle || "Upcoming Session",
          badgeLabel: index === 0 ? "TODAY" : null,
          badgeColor: "bg-[#7C3AED] text-white",
          watermarkIcon: "/admin-dashboard/cam.svg",
          watermarkColor: "text-[#7C3AED]/10",
          date: session.date || session.scheduledDate || new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
          time: session.time || session.startTime || null,
          buttonText: session.joinUrl ? "Join Now" : "View Details",
          buttonType: session.joinUrl ? "solid" : "outline",
          gradientFrom: "from-[#F3E8FF]",
          type: "session" as const,
          sessionId: session.id || session._id,
        })),
        ...assignments.slice(0, 2).map((assignment: any, index: number) => ({
          id: `assignment-${assignment.id || assignment._id || index}`,
          title: assignment.title || assignment.assignmentTitle || "Pending Assignment",
          badgeLabel: "DUE SOON",
          badgeColor: "bg-[#FEF3C7] text-[#D97706]",
          watermarkIcon: "/admin-dashboard/file-edit-line.svg",
          watermarkColor: "text-[#10B981]/10",
          date: `Due on: ${assignment.dueDate || "TBD"}`,
          time: null,
          buttonText: "View Details",
          buttonType: "outline" as const,
          gradientFrom: "from-[#D1FAE5]",
          type: "assignment" as const,
          assignmentId: assignment.id || assignment._id,
        })),
      ];
      if (nextItems.length > 0) setItems(nextItems);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFocusData();
  }, [fetchFocusData, weekOffset]);

  const handlePrevWeek = () => setWeekOffset(prev => prev - 1);
  const handleNextWeek = () => setWeekOffset(prev => prev + 1);

  const handleCardClick = (item: FocusItem) => {
    if (item.type === "session") {
      router.push(`/e/sessions`);
    } else {
      router.push(`/e/assignments`);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, item: FocusItem) => {
    e.stopPropagation();
    handleCardClick(item);
  };

  return (
    <>
      <div className="mt-8 mb-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
            Focus for this week
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevWeek}
              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNextWeek}
              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-[240px] animate-pulse">
                <div className="p-5">
                  <div className="h-4 w-16 bg-gray-100 rounded mb-4"></div>
                  <div className="h-6 bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-white rounded-2xl border border-gray-100 flex flex-col h-[240px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group cursor-pointer"
              >
                <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${item.gradientFrom} to-white opacity-60 pointer-events-none`}></div>
                <div className={`absolute top-1 left-3 ${item.watermarkColor} pointer-events-none`}>
                  <Image src={item.watermarkIcon} alt="icon" width={80} height={80} />
                </div>

                <div className="p-5 flex flex-col justify-between h-full relative z-10">
                  <div>
                    <div className="flex justify-end items-start mb-6 h-6">
                      {item.badgeLabel && (
                        <span className={`text-[9px] font-bold px-2.5 py-1 uppercase rounded-full ${item.badgeColor}`}>
                          {item.badgeLabel}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-[15px] mb-2 leading-snug h-[44px] overflow-hidden line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium mb-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.date}</span>
                      </div>
                      {item.time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{item.time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    {item.buttonType === "solid" ? (
                      <button 
                        onClick={(e) => handleButtonClick(e, item)}
                        className="w-full bg-[#111827] text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-black transition-colors"
                      >
                        {item.buttonText}
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => handleButtonClick(e, item)}
                        className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors"
                      >
                        {item.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
