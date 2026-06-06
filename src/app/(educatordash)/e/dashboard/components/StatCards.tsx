"use client";

import { useEffect, useState } from "react";
import { Play, ClipboardList, BookOpen, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { EducatorAPI, asArray } from "@/lib/api";

const statCards = [
  {
    title: "Scheduled Sessions",
    value: "00",
    icon: Play,
    color: "indigo",
    trend: "+8%",
    isUp: true,
  },
  {
    title: "Pending Assignments",
    value: "0",
    icon: ClipboardList,
    color: "emerald",
    trend: "+3%",
    isUp: true,
  },
  {
    title: "Active Students",
    value: "0",
    icon: BookOpen,
    color: "amber",
    trend: "+12%",
    isUp: true,
  },
  {
    title: "Hours Taught",
    value: "0.0",
    icon: Clock,
    color: "sky",
    trend: "0%",
    isUp: true,
  },
];

export default function StatCards() {
  const [cards, setCards] = useState(statCards);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [assignmentsRes, sessionsRes] = await Promise.allSettled([
          EducatorAPI.getAssignments(),
          EducatorAPI.getSessions(),
        ]);

        const assignments = assignmentsRes.status === "fulfilled" ? asArray(assignmentsRes.value) : [];
        const sessions = sessionsRes.status === "fulfilled" ? asArray(sessionsRes.value) : [];

        const pendingAssignments = assignments.filter(
          (a: any) => a.status === "pending" || a.status === "Pending" || !a.status
        ).length;

        const scheduledSessions = sessions.filter((s: any) => {
          const date = new Date(s.date || s.startDateTime || s.createdAt);
          return date > new Date();
        }).length;

        const studentIds = new Set();
        assignments.forEach((a: any) => {
          if (a.studentId || a.assignedTo) studentIds.add(a.studentId || a.assignedTo);
        });

        setCards((prev) =>
          prev.map((card) => {
            const title = card.title.toLowerCase();
            let value = card.value;

            if (title.includes("scheduled")) value = String(scheduledSessions).padStart(2, "0");
            if (title.includes("pending")) value = String(pendingAssignments);
            if (title.includes("students")) value = String(studentIds.size || sessions.length);
            if (title.includes("hours")) value = "0.0";

            return { ...card, value };
          })
        );
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-6">
        {statCards.map((_, i) => (
          <div
            key={i}
            className="flex-1 min-w-[180px] bg-gray-100 animate-pulse border border-gray-100 shadow-sm"
            style={{ height: "116px", borderRadius: "10px", borderWidth: "1px" }}
          />
        ))}
      </div>
    );
  }

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    sky: "bg-sky-50 text-sky-600",
  };

  return (
    <div className="flex flex-wrap gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex-1 min-w-[180px] bg-white p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          style={{ height: "116px", borderRadius: "10px", borderWidth: "1px" }}
        >
          <div className="flex items-center justify-between">
            <div
              className={`p-2 rounded-2xl ${colorMap[card.color] || "bg-gray-50"} group-hover:scale-110 transition-transform`}
            >
              <card.icon size={20} />
            </div>
            <div
              className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${
                card.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              }`}
            >
              {card.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {card.trend}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{card.title}</p>
            <p className="text-2xl font-black text-[#021165] mt-1 leading-none">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
