import { authApi } from "@/lib/axios";
import { StudentAssignmentListResponse } from "./types";

export const assignmentService = {
    getStudentAssignments: async () => {
        const res = await authApi.get("/api/assignment/studentList");
        return res.data;
    },
    uploadAssignment: async (formData: FormData) => {
        const res = await authApi.post("/api/assignment/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    }
};
