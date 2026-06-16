export type AnalyticsRangeDays = 7 | 15 | 30 | 60 | 90 | 180;

export interface AnalyticsOverview {
  totalUsers?: number;
  activeUsers?: number;
  totalStudents?: number;
  totalEducators?: number;
  totalOrganizations?: number;
  totalSessions?: number;
  totalAssignments?: number;
  monthlyRevenue?: number;
  avgSessionRating?: number;
  avgSessionDurationMinutes?: number;
  churnRate?: number;
}

export interface AnalyticsSeriesPoint {
  month?: string;
  label?: string;
  key?: string;
  value?: number;
}

export interface AnalyticsChartBlock {
  labels?: string[];
  series?: AnalyticsSeriesPoint[];
}

export interface AnalyticsCharts {
  userGrowth?: AnalyticsChartBlock;
  revenue?: AnalyticsChartBlock;
  revenueBreakdown?: AnalyticsChartBlock;
  assignmentPerformance?: AnalyticsChartBlock;
}

export interface AnalyticsActivityItem {
  id: string;
  title: string;
  description?: string;
  source?: string;
  actorId?: string;
  activityTime?: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsEngagement {
  sessionsJoined?: number;
  assignmentsSubmitted?: number;
  certificatesIssued?: number;
  supportTickets?: number;
}

export interface AnalyticsTicket {
  id: string;
  ticketCode?: string;
  subject?: string;
  status?: string;
  priority?: string;
  raisedOn?: string;
}

export interface AnalyticsResponseData {
  rangeDays?: number;
  overview?: AnalyticsOverview;
  charts?: AnalyticsCharts;
  activityFeed?: AnalyticsActivityItem[];
  engagement?: AnalyticsEngagement;
  tickets?: AnalyticsTicket[];
  raw?: Record<string, any>;
}

export interface AnalyticsApiResponse {
  success?: boolean;
  message?: string;
  data?: AnalyticsResponseData;
}
