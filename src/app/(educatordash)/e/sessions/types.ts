export type SessionStatus = 'Scheduled' | 'Live' | 'Completed' | 'Missed';
export type SessionType = 'Webinar' | 'Cohort' | 'Workshop';

export interface Session {
  id: string;
  title: string;
  type: SessionType;
  attendees: number;
  date: string; // e.g., "Mar 16, 2026"
  dateTime: Date; // actual date object for calendar/sorting
  startTime: string; // e.g., "09:00 AM"
  endTime: string; // e.g., "10:30 AM"
  status: SessionStatus;
  educator: string;
}
