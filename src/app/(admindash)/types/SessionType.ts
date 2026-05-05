export type SessionStatus = 'Scheduled' | 'Live' | 'Completed' | 'Missed' | 'draft';
export type SessionTypeName = 'Webinar' | 'Cohort' | '1:1' | 'Workshop';
export type Status = "Live" | "Scheduled" | "Completed" | "Missed" | "draft";
export type Tab = "All" | "Upcoming" | "Completed" | "Missed" | "Draft";
export type ViewMode = "list" | 'calendar'

export interface Session {
  id: string;
  title?: string;
  type: string;
  attendees?: number;
  date: string;
  dateTime?: Date | string;
  startTime?: string;
  endTime?: string;
  status: string;
  educator: string;
  students: number;
  sessionCode?: string;
  mode?: string;
}