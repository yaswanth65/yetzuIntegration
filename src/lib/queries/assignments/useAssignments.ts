import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentService } from "./assignmentService";
import { StudentAssignmentListResponse } from "./types";
import toast from "react-hot-toast";

export const useGetStudentAssignments = () => {
    return useQuery<StudentAssignmentListResponse>({
        queryKey: ["studentAssignments"],
        queryFn: async () => {
            try {
                return await assignmentService.getStudentAssignments();
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Failed to load assignments");
                throw error;
            }
        }
    });
};

export const useUploadAssignment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => assignmentService.uploadAssignment(formData),
        onSuccess: () => {
            toast.success("Assignment uploaded successfully!");
            queryClient.invalidateQueries({ queryKey: ["studentAssignments"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to upload assignment");
        }
    });
};
