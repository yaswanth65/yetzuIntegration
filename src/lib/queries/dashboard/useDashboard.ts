import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "./dashboardService";
import { StudentOverviewResponse } from "./types";

export const useGetStudentOverview = () => {
    return useQuery<StudentOverviewResponse>({
        queryKey: ["studentOverview"],
        queryFn: dashboardService.getStudentOverview,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};
