"use client";

import { AdminAPI } from "@/lib/api";
import { useEffect, useState } from "react";

const statsCards = [
  { title: "Active Students", value: "0" },
  { title: "Active Educators", value: "0" },
  { title: "Sessions Today", value: "0" },
  { title: "Certificates", value: "0" },
];

export default function OverViewStats() {
  const [stats, setStats] = useState(statsCards);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response: any = await AdminAPI.getOverview();
        const data = response?.data || response;
        const cards = data?.cards || data;
        
        if (data) {
          setStats([
            { title: "Active Students", value: String(cards.activeStudents ?? cards.totalStudents ?? 0) },
            { title: "Active Educators", value: String(cards.activeEducators ?? cards.totalEducators ?? 0) },
            { title: "Sessions Today", value: String(cards.sessionsToday ?? cards.upcomingSessions?.length ?? 0) },
            { title: "Certificates", value: String(cards.certificatesIssued ?? 0) },
          ]);
        }
      } catch {
        setStats(statsCards);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-xl border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">{card.title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
