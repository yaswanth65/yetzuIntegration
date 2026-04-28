import { authApi } from "@/lib/axios";
import { getApiBaseUrl } from "@/lib/getApiBaseUrl";
import { StudentAssignmentListResponse } from "./types";

const BASE_URL = getApiBaseUrl();

export const assignmentService = {
    getStudentAssignments: async () => {
        const res = await authApi.get("/api/assignments/student");
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
