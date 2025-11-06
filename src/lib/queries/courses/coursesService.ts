import { api } from "@/lib/axios";
import { Course } from "./types";

export const coursesService = {
  getCourses: async () => {
    const res = await api.get("course/v1/courselist");
    return res?.data?.courses as Course[];
  },
};
