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
        console.log('Raw API sessions data:', rawData.slice(0, 2)); 
        
        const apiSessions = rawData.map((item: any, index: number) => {
          const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
          const date = rawDate ? new Date(rawDate).toLocaleDateString() : "TBD";
          const dateTime = rawDate ? new Date(rawDate) : new Date();
          const status = item.status || item.Status || "Scheduled";

          let educatorName = "Educator";
          const edu = item.educator;
          if (typeof edu === 'string') {
            educatorName = edu;
          } else if (edu && typeof edu === 'object' && edu !== null) {
            educatorName = edu.name || edu.full_name || edu.displayName || String(edu.id || "Educator");
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
            sessionType = typ.name || typ.type || typ.displayName || "Webinar";
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

          const session = {
            id: String(item.id || item._id || item.sessionId || item.sessionCode || `SESSION-${index + 1}`),
            title: item.title || sessionType,
            type: String(sessionType),
            educator: String(educatorName),
            students: Number(studentsCount),
            attendees: Number(studentsCount),
            date,
            startTime: item.startTime || "09:00 AM",
            endTime: item.endTime || "10:00 AM",
            status: String(status === "Upcoming" ? "Scheduled" : status),
          };
          
          Object.keys(session).forEach(key => {
            if (typeof (session as any)[key] === 'object') {
              console.error(`Session field ${key} is still an object:`, (session as any)[key]);
              (session as any)[key] = String((session as any)[key]);
            }
          });
          
          return session;
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
