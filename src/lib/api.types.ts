// ── Analytics ────────────────────────────────────────────────────────────────

export interface AnalyticsOverview {
  totalStudents: number;
  totalEducators: number;
  totalSessions: number;
  totalRevenue: number;
  totalOrganizations: number;
  activeStudents: number;
  activeEducators: number;
  liveSessions: number;
  pendingAssignments: number;
  unresolvedTickets: number;
  completionRate: number;
  studentGrowth: number;
  revenueGrowth: number;
  sessionGrowth: number;
  certificatesIssued: number;
  avgRating: number;
  newStudentsThisMonth: number;
  newEducatorsThisMonth: number;
  newSessionsThisMonth: number;
  activeStudentsChange: number;
  activeEducatorsChange: number;
  liveSessionsChange: number;
}

export interface MonthlyDataPoint {
  month: string;
  revenue?: number;
  students?: number;
  sessions?: number;
}

export interface StatusSegment {
  name: string;
  value: number;
}

export interface EducatorBrief {
  id: string;
  name: string;
  email: string;
  rating: number;
  status: string;
}

export interface TicketBrief {
  id: string;
  ticket_code: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  raised_on: string;
  raised_by: string;
  created_at: string;
}

export interface OrgBrief {
  id: string;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsResponse {
  overview: AnalyticsOverview;
  revenueData: MonthlyDataPoint[];
  enrollmentData: MonthlyDataPoint[];
  sessionData: MonthlyDataPoint[];
  studentStatusData: StatusSegment[];
  educatorStatusData: StatusSegment[];
  topEducators: EducatorBrief[];
  sessions: any[];
  assignments: any[];
  submissions: any[];
  activities: ActivityItem[];
  tickets: TicketBrief[];
  organizations: OrgBrief[];
  monthlyRevenueMap: Record<string, any>;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  source: string;
  actor_id: string;
  activity_time: string;
  metadata: Record<string, any>;
  created_at: string;
}

// ── User Detail (admin) ──────────────────────────────────────────────────────

export interface AdminUserDetail {
  id: string;
  draftId: string;
  name: string;
  email: string;
  mobileno: string | null;
  role: string;
  status: string;
  organizationId: string | null;
  organization: OrgBrief | null;
  qualification: string | null;
  specialization: string | null;
  rating: number | null;
  availabilityStatus: string | null;
  onboardingStatus: string;
  permissions: Record<string, boolean>;
  metadata: Record<string, any>;
  loginsCount: number;
  lastLogin: string | null;
  lastIp: string | null;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  lastSessionTotalTime: number;
  joinedAt: string;
  lastActiveAt: string;
  joinedLabel: string;
  lastActiveLabel: string;
  profileCompletion: number;
  user: AdminUserDetail;
  availableActions: string[];
  summary: UserSummary;
  engagementOverview: EngagementOverview;
  activeCohort: ActiveCohort | null;
  programsAndSessions: ProgramWithSession[];
  assignmentsAndDocuments: AssignmentDocument[];
  billingAndPayments: BillingInfo;
  certificates: any[];
  paymentHistory: any[];
  sessionAttendance: SessionAttendance[];
  assignments: any[];
  dueAssignments: DueAssignment[];
  enrolledCourses: EnrolledCourse[];
  programsAndSessionsSummary: {
    totalPrograms: number;
    activePrograms: number;
    upcomingSessions: number;
    activeCohort: number;
  };
  assignmentsAndDocumentsSummary: {
    totalAssignments: number;
    completedAssignments: number;
    pendingAssignments: number;
    submittedAssignments: number;
  };
  enrollmentHistory: EnrollmentRecord[];
  relatedUsers: Record<string, RelatedUser>;
  assistantUsers: Record<string, any>;
  raw: {
    meetings: any[];
    progress: Record<string, any>;
    rescheduleRequests: any[];
    lastSessionTotalTime: number;
  };
}

export interface UserSummary {
  upcomingSessions: number;
  sessionsAttended: number;
  activeEnrollments: number;
  assignmentCompletion: number;
  certificatesEarned: number;
  totalSpend: number;
  totalSpendLabel: string;
  activePrograms: number;
  pendingAssignments: number;
  usageHours: number;
}

export interface EngagementOverview {
  labels: string[];
  series: EngagementSeries[];
}

export interface EngagementSeries {
  month: string;
  sessionsEnrolled: number;
  assignmentsSubmitted: number;
}

export interface ActiveCohort {
  id: string;
  title: string;
  type: string | null;
  educator: EducatorBrief;
  startDateTime: string;
  status: string;
  progress: number;
}

export interface ProgramWithSession {
  id: string;
  programName: string;
  type: string;
  educator: EducatorBrief;
  sessions: number;
  attendance: string;
  status: string;
  startDate: string;
  course: CourseData;
  enrollment: EnrollmentRecord;
}

export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  benefits: string[];
  syllabus: SyllabusItem[];
  duration: string;
  cost: number;
  outcomes: string[];
  certificate: string;
  educator: string;
  enrolledStudentIds: string[];
  enrolledCount: number;
  startDateTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  mentorshipLink: string;
  cohortLink: string;
  webinerLink: string;
  assignments: any[];
  resources: any[];
  rescheduleRequests: any[];
  educatorData: EducatorBrief;
}

export interface SyllabusItem {
  title: string;
  desc: string;
}

export interface AssignmentDocument {
  id: string;
  assignmentId: string;
  title: string;
  relatedSessionId: string | null;
  relatedSessionTitle: string;
  type: string;
  status: string;
  dueDate: string;
  lastUpdated: string;
  reviewer: string;
  reviewerId: string;
  documentUrl: string | null;
  documentPath: string | null;
  comments: string | null;
  submittedUrl: string | null;
  submittedDoc: string | null;
  feedbackUrl: string | null;
  dueDateLabel: string;
  lastUpdatedLabel: string;
}

export interface BillingInfo {
  totalPaid: number;
  totalPaidLabel: string;
  lastPaymentDate: string | null;
  lastPaymentAmount: number | null;
  transactions: any[];
}

export interface SessionAttendance {
  id: string;
  sessionId: string;
  courseId: string | null;
  title: string | null;
  attendedAt: string | null;
  startedAt: string | null;
  endedAt: string | null;
  durationMinutes: number;
  durationHours: number;
  platform: string | null;
  status: string;
}

export interface DueAssignment {
  id: string;
  assignmentId: string;
  title: string;
  description: string | null;
  dueDate: string;
  status: string;
  documentUrl: string | null;
  documentPath: string | null;
  submitted: boolean;
  submittedAt: string | null;
  reviewedAt: string | null;
  comments: string | null;
  feedbackUrl: string | null;
  educatorRemark: string | null;
  courseId: string;
  sessionId: string | null;
  educatorId: string | null;
  assignedStudents: any[];
  createdAt: string | null;
  updatedAt: string | null;
}

export interface EnrolledCourse {
  courseId: string;
  enrolledAt: string;
  sessionId: string | null;
  progress: number;
  course: CourseData;
  courseTitle: string;
  courseSubtitle: string;
  courseThumbnail: string;
  duration: string;
  cost: number;
  startDateTime: string;
  isActive: boolean;
  educatorData: EducatorBrief;
}

export interface EnrollmentRecord {
  courseId: string;
  enrolledAt: string;
  sessionId: string | null;
  progress: number;
}

export interface RelatedUser {
  id: string;
  name: string;
  email: string;
  mobileno: string | null;
  role: string;
}

// ── Assignments (admin) ──────────────────────────────────────────────────────

export interface AdminAssignment {
  id: string;
  educator: string;
  courseId: string;
  sessionId: string | null;
  title: string;
  description: string | null;
  documentUrl: string | null;
  documentPath: string | null;
  dueDate: string;
  status: string;
  isCourseLinked: boolean;
  isSessionLinked: boolean;
  assignedStudents: AssignedStudent[];
  course: AssignmentCourse | null;
  session: any | null;
  submissions: AssignmentSubmission[];
  submission: any | null;
  studentStatuses: StudentStatus[];
  submissionStats: SubmissionStats;
  createdAt: string;
  updatedAt: string;
}

export interface AssignedStudent {
  id: string;
  name: string;
  email: string;
  mobileno: string | null;
}

export interface AssignmentCourse {
  id: string;
  title: string;
  subtitle: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  educatorId: string;
  courseId: string;
  sessionId: string | null;
  comments: string | null;
  submitted_doc: string | null;
  submitted_url: string | null;
  feedbackUrl: string | null;
  educatorRemark: string | null;
  status: string;
  submittedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  student: null;
}

export interface StudentStatus {
  student: AssignedStudent;
  studentId: string;
  status: string;
  submissionId: string | null;
  comments: string | null;
  submitted_doc: string | null;
  submitted_url: string | null;
  feedbackUrl: string | null;
  educatorRemark: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  updatedAt: string | null;
}

export interface SubmissionStats {
  totalAssigned: number;
  totalSubmitted: number;
  totalReviewed: number;
  totalPending: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ── CMS ──────────────────────────────────────────────────────────────────────

export interface CmsPage {
  id: string;
  pageKey: string;
  pageTitle: string;
  status: string;
  sortOrder: number;
  schemaVersion: number;
  version: number;
  metadata: Record<string, any>;
  sections: CmsSection[];
  createdAt: string;
  updatedAt: string;
}

export interface CmsSection {
  id: string;
  pageId: string;
  sectionKey: string;
  sectionTitle: string;
  sectionType: string;
  data: Record<string, any>;
  sortOrder: number;
  version: number;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// ── Contacts ─────────────────────────────────────────────────────────────────

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  mobile: string | null;
  medical_school_affiliation: string | null;
  description: string | null;
  sender_ip: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: string | null;
  contact_code: string;
  reply_subject: string | null;
  reply_message: string | null;
  reply_sent_at: string | null;
  reply_sent_by: string | null;
}

// ── User Notifications (admin) ───────────────────────────────────────────────

export interface UserNotificationSummary {
  total: number;
  upcomingSessions: number;
  dueAssignments: number;
  paymentUpdates: number;
  unreadMessages: number;
}

export interface UserNotification {
  type: string;
  id: string;
  createdAt: string | null;
  priority: string;
  assignment: UserNotificationAssignment;
}

export interface UserNotificationAssignment {
  title: string;
  dueDate: string;
  courseId: string;
  priority: string;
  submitted: boolean;
  daysOverdue: number;
  lastUpdated: string;
  submittedAt: string | null;
  assignmentId: string;
}

// ── API Response Wrapper ─────────────────────────────────────────────────────

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ListResponse<T = any> {
  list: T[];
  pagination?: Pagination;
  count?: number;
}

export interface UserNotificationsData {
  summary: UserNotificationSummary;
  notifications: UserNotification[];
}

export interface AnalyticsExportResponse {
  success: boolean;
  message: string;
  data: any[];
}
