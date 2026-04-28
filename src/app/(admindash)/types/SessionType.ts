export type SessionStatus = 'Scheduled' | 'Live' | 'Completed' | 'Missed';
export type SessionTypeName = 'Webinar' | 'Cohort' | '1:1' | 'Workshop';
export type Status = "Live" | "Scheduled" | "Completed" | "Missed";
export type Tab = "All" | "Upcoming" | "Completed" | "Missed";
export type ViewMode = "list" | 'calender'

export interface Session {
  id: string;
  title?: string;
  type: string;
  attendees?: number;
  date: string;
  dateTime?: string;
  startTime?: string;
  endTime?: string;
  status: string;
  educator: string;
  students: number;
}