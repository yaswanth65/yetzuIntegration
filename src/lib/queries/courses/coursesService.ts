import { api } from "@/lib/axios";
import { Course } from "./types";

export const coursesService = {
  getCourses: async (params?: { search?: string; minCost?: number; maxCost?: number }) => {
    try {
      const res = await api.get("/api/course/v1/courselist", { params });
      return res?.data?.courses || [];
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  },
  getCourseById: async (id: string) => {
    try {
      const res = await api.get(`/api/course/v1/get/${id}`);
      return res?.data?.course;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  },
};
