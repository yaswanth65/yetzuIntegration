export interface Student {
    _id: string;
    name: string;
    email: string;
    overdueCount: number;
    id: string;
}

export interface Educator {
    _id: string;
    name: string;
    email: string;
    overdueCount: number;
    id: string;
}

export interface Assignment {
    _id: string;
    student: Student;
    educator: Educator;
    title: string;
    description: string;
    documentUrl: string;
    courseId: string;
    status: "submitted" | "graded" | "pending" | "overdue";
    submittedAt: string;
    updatedAt: string;
    feedbackUrl?: string;
    comments?: string;
}

export interface StudentAssignmentListResponse {
    assignments: Assignment[];
}
