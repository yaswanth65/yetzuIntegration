import { authApi } from "@/lib/axios";
import { StudentOverviewResponse } from "./types";

export const dashboardService = {
    getStudentOverview: async () => {
        const res = await authApi.get("/dashboard/studentOverview");
        console.log("Student Overview API Response:", res);
        const data = res.data?.data || {};

        // Transform recentSessions to match Webinar interface partially
        const mappedWebinars = (data.recentSessions || []).map((session: any) => ({
            id: session.id,
            title: session.title,
            educatorName: "Educator", // Placeholder
            description: "Live Session - " + session.status,
            scheduledDate: session.attendedAt,
            time: new Date(session.attendedAt).toLocaleTimeString(),
            thumbnail: "/images/placeholder.png"
        }));

        return {
            webinars: mappedWebinars,
            assignments: data.dueAssignments || [],
            dueAssignments: data.dueAssignments || [],
            submittedAssignments: []
        } as StudentOverviewResponse;
    },
};
