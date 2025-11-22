import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { coursesService } from "./coursesService";
import { Course } from "./types";

const { getCourses, getCourseById } = coursesService;

const useGetCourses = (params?: { search?: string; minCost?: number; maxCost?: number }): UseQueryResult<Course[], unknown> => {
  return useQuery<Course[]>({
    queryKey: ["getCourses", params],
    queryFn: () => getCourses(params),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const useGetCourseById = (id: string): UseQueryResult<Course, unknown> => {
  return useQuery<Course>({
    queryKey: ["getCourseById", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export { useGetCourses, useGetCourseById };
