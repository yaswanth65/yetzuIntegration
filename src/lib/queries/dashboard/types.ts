export interface Webinar {
    id: string; // or _id
    title: string;
    educatorName: string;
    description: string;
    scheduledDate: string; // ISO string?
    time: string;
    thumbnail?: string;
}

export interface Assignment {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    daysOverdue: number;
    priority: string;
    submitted: boolean;
    isOverdue: boolean;
    thumbnail?: string; // Optional as it was used in UI but might not be in API
    description?: string; // Optional as it was used in UI
}

export interface SubmittedAssignment {
    id: string;
    title: string;
    uploadDate: string;
    status: "In-Review" | "Completed";
    remarks: string;
}

export interface StudentOverviewResponse {
    webinars: Webinar[]; // Note: API doesn't seem to have 'webinars' in the provided JSON, it has 'recentSessions' or 'enrolledCourses'. But keeping if strictly following previous logic or maybe need to map.
    // The user provided API response doesn't show 'webinars' array directly. It shows 'enrolledCourses', 'dueAssignments', 'recentSessions'.
    // I will add dueAssignments and keeping others for now to avoid breaking other parts, but ideally should align.
    dueAssignments: Assignment[];
    assignments: Assignment[]; // keeping for backward compat if needed, or alias
    submittedAssignments: SubmittedAssignment[];
}
