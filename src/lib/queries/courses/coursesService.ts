import { PublicSessionsAPI, asArray } from "@/lib/api";

const mapSessionToCourse = (item: any): any => {
  const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
  return {
    _id: item.id || item._id || item.sessionId,
    title: item.title || item.name || item.sessionTitle || "Session",
    subtitle: item.subtitle || item.shortDescription || "",
    description: item.description || item.longDescription || "",
    thumbnail: item.thumbnail || item.image || item.banner || "",
    benefits: item.benefits || [],
    syllabus: item.syllabus || [],
    duration: item.duration || item.durationInHours || "",
    cost: typeof item.finalPrice === "number" ? item.finalPrice : (item.price || item.cost || 0),
    pricingType: item.pricingType || "free",
    finalPrice: typeof item.finalPrice === "number" ? item.finalPrice : (item.price || item.cost || 0),
    outcomes: item.outcomes || item.learningOutcomes || [],
    certificate: item.certificate || "",
    educator: typeof item.educator === "string" ? item.educator : (item.educator?.name || item.educatorName || item.mentorName || "Educator"),
    educatorId: item.educatorId || "",
    enrolledStudentIds: item.students || item.enrolledStudentIds || [],
    enrolledCount: typeof item.studentsCount === "number" ? item.studentsCount : (typeof item.students === "number" ? item.students : (Array.isArray(item.students) ? item.students.length : 0)),
    startDateTime: rawDate || item.startDateTime || "",
    sessionType: item.sessionType || item.type || "",
    category: item.category || "",
    mode: item.mode || "",
    scheduleDate: item.scheduleDate || "",
    startTime: item.startTime || "",
    endTime: item.endTime || "",
    capacity: item.capacity || 0,
    sessionLink: item.sessionLink || "",
    status: item.status || "",
    isActive: item.isActive != null ? item.isActive : true,
    createdAt: item.createdAt || rawDate || "",
    updatedAt: item.updatedAt || "",
    __v: item.__v || 0,
  };
};

export const coursesService = {
  getCourses: async (_params?: { search?: string; minCost?: number; maxCost?: number }) => {
    try {
      const res = await PublicSessionsAPI.getAll();
      const list = asArray(res?.sessions || res?.data || res);
      return list.map(mapSessionToCourse);
    } catch {
      return [];
    }
  },
  getCourseById: async (id: string) => {
    try {
      const res = await PublicSessionsAPI.getById(id);
      const item = res?.session || res?.data || res;
      return item ? mapSessionToCourse(item) : null;
    } catch {
      return null;
    }
  },
};
