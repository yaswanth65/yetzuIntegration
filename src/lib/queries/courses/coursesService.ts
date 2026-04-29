import { CourseAPI, asArray } from "@/lib/api";

export const coursesService = {
  getCourses: async (params?: { search?: string; minCost?: number; maxCost?: number }) => {
    try {
      const res = await CourseAPI.getAllCourses(params);
      return asArray(res?.courses || res);
    } catch {
      return [];
    }
  },
  getCourseById: async (id: string) => {
    try {
      const res = await CourseAPI.getCourseById(id);
      return res?.course || res;
    } catch {
      return null;
    }
  },
};
