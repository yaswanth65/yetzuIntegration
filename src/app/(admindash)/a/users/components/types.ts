export type Role = "Student" | "Educator" | "Admin" | "Editor" | "Institution" | "Translator";
export type Status = "Active" | "Suspended";
export type TabType = "All Users" | "Students" | "Educators";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string | Role; // Using string | Role to avoid strict type issues with mock data
  status: Status;
  joined: string;
  sessions: number;
}
