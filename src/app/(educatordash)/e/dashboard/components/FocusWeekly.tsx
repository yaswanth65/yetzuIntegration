"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
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

export default function FocusWeekly() {
  const [items, setItems] = useState<FocusItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FocusItem | null>(null);
  const router = useRouter();

  const fetchFocusData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch from working APIs (not broken getOverview)
      const [sessionsRes, assignmentsRes] = await Promise.allSettled([
        EducatorAPI.getSessions(),
        EducatorAPI.getAssignments()
      ]);

      const sessions = sessionsRes.status === 'fulfilled' ? asArray(sessionsRes.value) : [];
      const assignments = assignmentsRes.status === 'fulfilled' ? asArray(assignmentsRes.value) : [];
      
      // Get upcoming sessions (future dates)
      const now = new Date();
      const upcomingSessions = sessions
        .filter((s: any) => {
          const date = new Date(s.date || s.startDateTime || s.createdAt);
          return date > now;
        })
        .slice(0, 2);

      // Get pending assignments
      const pendingAssignments = assignments
        .filter((a: any) => a.status === 'pending' || a.status === 'Pending' || !a.status)
        .slice(0, 2);
      
      const nextItems: any[] = [
        ...upcomingSessions.map((session: any, index: number) => ({
          id: `session-${session.id || session._id || index}`,
          title: session.title || session.sessionTitle || session.courseTitle || "Upcoming Session",
          badgeLabel: index === 0 ? "TODAY" : null,
          badgeColor: "bg-[#7C3AED] text-white",
          watermarkIcon: "/images/video-chat.svg",
          watermarkColor: "text-[#7C3AED]/10",
          date: new Date(session.date || session.startDateTime || Date.now()).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
          time: session.time || session.startTime || null,
          buttonText: "View Details",
          buttonType: "outline" as const,
          gradientFrom: "from-[#F3E8FF]",
          type: "session" as const,
          sessionId: session.id || session._id,
        })),
        ...pendingAssignments.map((assignment: any) => ({
          id: `assignment-${assignment.id || assignment._id}`,
          title: assignment.title || assignment.assignmentTitle || "Pending Assignment",
          badgeLabel: "DUE SOON",
          badgeColor: "bg-[#FEF3C7] text-[#D97706]",
          watermarkIcon: "/images/file-format-orange.svg",
          watermarkColor: "text-[#10B981]/10",
          date: `Due: ${assignment.deadline || assignment.dueDate || "TBD"}`,
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
  }, [fetchFocusData]);

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
