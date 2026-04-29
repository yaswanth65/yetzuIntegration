"use client";

import { useEffect, useState } from "react";
import AllSessions from "./components/AllSessions";
import { Session } from "@/app/(admindash)/types/SessionType";
import { AdminAPI, asArray } from "@/lib/api";


export default function page() {
  const [sessions, setSessions] = useState<Session[]>([]);

useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await AdminAPI.getSessions();
        const rawData = asArray(response);
        
        const apiSessions = rawData.map((item: any, index: number) => {
          const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
          const date = rawDate ? new Date(rawDate).toLocaleDateString() : "TBD";
          const status = item.status || item.Status || "Scheduled";

          let educatorName = "Educator";
          const edu = item.educator;
          if (typeof edu === 'string') {
            educatorName = edu;
          } else if (edu && typeof edu === 'object' && edu !== null) {
            educatorName = (edu.name || edu.full_name || edu.displayName || String(edu.id || ""));
          } else if (item.educatorName) {
            educatorName = item.educatorName;
          } else if (item.mentorName) {
            educatorName = item.mentorName;
          }

          let sessionType = "Webinar";
          const typ = item.type;
          if (typeof typ === 'string') {
            sessionType = typ;
          } else if (typ && typeof typ === 'object' && typ !== null) {
            sessionType = (typ.name || typ.type || typ.displayName || "");
          } else if (typeof item.sessionType === 'string') {
            sessionType = item.sessionType;
          }

          let studentsCount = 0;
          const stu = item.students;
          if (typeof stu === 'number') {
            studentsCount = stu;
          } else if (Array.isArray(stu)) {
            studentsCount = stu.length;
          } else if (item.attendees) {
            studentsCount = item.attendees;
          } else if (item.enrolledCount) {
            studentsCount = item.enrolledCount;
          }

          return {
            id: String(item.id || item._id || item.sessionId || item.sessionCode || `SESSION-${index + 1}`),
            type: String(sessionType || "Webinar"),
            educator: String(educatorName || "Educator"),
            students: Number(studentsCount) || 0,
            date: String(date || "TBD"),
            status: String(status === "Upcoming" ? "Scheduled" : status),
          };
        });
        if (apiSessions.length > 0) setSessions(apiSessions as Session[]);
      } catch {
        setSessions([]);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="bg-white p-6 min-h-screen">
      <AllSessions data={sessions} />
    </div>
  )
}
