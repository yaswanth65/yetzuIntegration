import { api } from "@/lib/axios";
import { Course } from "./types";

export const coursesService = {
  getCourses: async (params?: { search?: string; minCost?: number; maxCost?: number }) => {
    const res = await api.get("course/v1/courselist", { params });
    return res?.data?.courses as Course[];
  },
  getCourseById: async (id: string) => {
    const res = await api.get(`course/v1/get/${id}`);
    return res?.data?.course as Course;
  },
};
