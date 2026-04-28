export type AssignmentStatus = 'Submitted' | 'Pending' | 'Review Done';
export type SessionType = 'Webinar' | 'Cohort' | 'Mentorship' | 'Workshop';

export interface Assignment {
  id: string;
  assignmentId: string;
  sessionTitle: string;
  studentName: string;
  sessionType: SessionType;
  dueDate: string;
  status: AssignmentStatus;
  submissionDate: string;
  hasDownload?: boolean;
}
