import { api } from "@/lib/axios";
import { Course } from "./types";

export const coursesService = {
  getCourses: async (params?: { search?: string; minCost?: number; maxCost?: number }) => {
    try {
      const res = await api.get("/api/course/v1/courselist", { params });
      return res?.data?.courses || [];
    } catch {
      return [];
    }
  },
  getCourseById: async (id: string) => {
    try {
      const res = await api.get(`/api/courses/${id}`);
      return res?.data;
    } catch {
      return null;
    }
  },
};
