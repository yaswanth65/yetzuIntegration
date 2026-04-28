import { authApi } from "@/lib/axios";
import { getApiBaseUrl } from "@/lib/getApiBaseUrl";
import { StudentOverviewResponse } from "./types";

const BASE_URL = getApiBaseUrl();

export const dashboardService = {
    getStudentOverview: async () => {
        const res = await authApi.post("/api/student/dashboard/overview", {});
        const data = res.data?.data || {};

        const mappedWebinars = (data.upcomingSessions || []).map((session: any) => ({
            id: session.courseId,
            title: session.courseTitle,
            educatorName: session.educator?.name || "Educator",
            description: session.description,
            scheduledDate: session.sessionTime,
            time: new Date(session.sessionTime).toLocaleTimeString(),
            thumbnail: session.thumbnail
        }));

        return {
            webinars: mappedWebinars,
            assignments: data.dueAssignments || data.pendingAssignments || [],
            dueAssignments: data.dueAssignments || data.pendingAssignments || [],
            submittedAssignments: data.completedAssignments || []
        } as StudentOverviewResponse;
    },
};
