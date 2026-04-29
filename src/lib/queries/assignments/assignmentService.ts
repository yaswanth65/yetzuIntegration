import { StudentAPI, asArray } from "@/lib/api";
import { StudentAssignmentListResponse } from "./types";

const mapStudentAssignment = (item: any, index: number) => ({
    _id: String(item._id || item.id || item.assignmentId || index),
    id: String(item.id || item._id || item.assignmentId || index),
    title: item.title || item.assignmentTitle || item.sessionTitle || "Untitled Assignment",
    description: item.description || item.details || "",
    documentUrl: item.documentUrl || item.fileUrl || item.submissionUrl || "",
    courseId: item.courseId || item.sessionId || item.sessionTitle || item.courseTitle || "",
    status: (item.status || "pending").toLowerCase(),
    submittedAt: item.submittedAt || item.updatedAt || item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
    feedbackUrl: item.feedbackUrl || "",
    comments: item.comments || item.comment || "",
    student: {
        _id: String(item.student?._id || item.student?.id || ""),
        id: String(item.student?.id || item.student?._id || ""),
        name: item.student?.name || "Student",
        email: item.student?.email || "",
        overdueCount: item.student?.overdueCount || 0,
    },
    educator: {
        _id: String(item.educator?._id || item.educator?.id || ""),
        id: String(item.educator?.id || item.educator?._id || ""),
        name: item.educator?.name || item.educatorName || item.mentorName || "Educator",
        email: item.educator?.email || "",
        overdueCount: item.educator?.overdueCount || 0,
    },
});

export const assignmentService = {
    getStudentAssignments: async () => {
        const res = await StudentAPI.getAssignments();
        const items = asArray(res?.data || res);
        return {
            assignments: items.map(mapStudentAssignment),
        } as StudentAssignmentListResponse;
    },
    uploadAssignment: async (formData: FormData) => {
        return StudentAPI.uploadAssignment(formData);
    }
};
