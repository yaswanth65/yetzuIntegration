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
          // Handle date - API uses scheduleDate
          const rawDate = item.scheduleDate || item.date || item.scheduledDate || item.startDateTime || item.createdAt;
          const date = rawDate ? new Date(rawDate).toLocaleDateString() : "TBD";
          
          // Handle status
          const status = item.status || item.Status || "Scheduled";

          // Handle educator - API returns object {id, name, email}
          let educatorName = "Educator";
          const edu = item.educator;
          if (typeof edu === 'string') {
            educatorName = edu;
          } else if (edu && typeof edu === 'object' && edu !== null) {
            educatorName = String(edu.name || edu.full_name || edu.displayName || edu.id || "Educator");
          } else if (item.educatorName) {
            educatorName = String(item.educatorName);
          } else if (item.mentorName) {
            educatorName = String(item.mentorName);
          }

          // Handle session type - API uses sessionType
          let sessionType = "Webinar";
          if (typeof item.sessionType === 'string') {
            sessionType = item.sessionType;
          } else if (typeof item.type === 'string') {
            sessionType = item.type;
          } else if (item.type && typeof item.type === 'object' && item.type !== null) {
            sessionType = String(item.type.name || item.type.type || item.type.displayName || "Webinar");
          }

          // Handle students count
          let studentsCount = 0;
          if (typeof item.students === 'number' && !isNaN(item.students)) {
            studentsCount = item.students;
          } else if (Array.isArray(item.students)) {
            studentsCount = item.students.length;
          } else if (typeof item.attendees === 'number' && !isNaN(item.attendees)) {
            studentsCount = item.attendees;
          } else if (typeof item.enrolledCount === 'number' && !isNaN(item.enrolledCount)) {
            studentsCount = item.enrolledCount;
          }

          return {
            id: String(item.id || item._id || item.sessionId || item.sessionCode || `SESSION-${index + 1}`),
            title: String(item.title || item.name || item.courseTitle || "Untitled Session"),
            type: String(sessionType || "Webinar"),
            educator: educatorName,
            students: Number(studentsCount) || 0,
            date: String(date || "TBD"),
            status: String(status === "Upcoming" ? "Scheduled" : status),
            sessionCode: String(item.sessionCode || ""),
            startTime: String(item.startTime || ""),
            endTime: String(item.endTime || ""),
            mode: String(item.mode || ""),
          };
        });
        setSessions(apiSessions as Session[]);
      } catch {
        setSessions([]);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="p-6">
      <AllSessions data={sessions} />
    </div>
  )
}
