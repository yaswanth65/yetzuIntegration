export type Type = "Webinar" | "Cohort" | "1:1" | "Workshop";
export type Status = "Live" | "Scheduled" | "Completed" | "Missed";

export type Tab = "All" | "Upcoming" | "Completed" | "Missed";
export type ViewMode = "list" | 'calender'

export interface Session {
    id: string;
    type: Type;
    educator: string;
    students: number,
    date: string;
    status: Status;
}