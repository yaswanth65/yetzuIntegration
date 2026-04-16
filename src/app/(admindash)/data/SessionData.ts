import {Session} from "@/app/(admindash)/types/SessionType" 

export const sessionsData: Session[] = [
  {
    id: "WEB_204",
    type: "Webinar",
    educator: "Dr. Sarah Chen",
    students: 45,
    date: "Mar 16, 2026",
    status: "Live",
  },
  {
    id: "COH-112",
    type: "Cohort",
    educator: "Prof. James W.",
    students: 28,
    date: "Mar 16, 2026",
    status: "Scheduled",
  },
  {
    id: "MTR-089",
    type: "1:1",
    educator: "Dr. Anita Roy",
    students: 1,
    date: "Mar 16, 2026",
    status: "Completed",
  },
  {
    id: "WRK-056",
    type: "Workshop",
    educator: "Dr. Liu Wei",
    students: 32,
    date: "Mar 15, 2026",
    status: "Completed",
  },
  {
    id: "WEB-203",
    type: "Webinar",
    educator: "Prof. Brown",
    students: 67,
    date: "Mar 15, 2026",
    status: "Completed",
  },
];
