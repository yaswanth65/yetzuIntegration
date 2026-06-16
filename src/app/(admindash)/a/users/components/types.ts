export type Role = "Student" | "Educator" | "Admin";
export type Status = "Active" | "Suspended";
export type TabType = "All Users" | "Students" | "Educators";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string | Role;
  status: Status;
  joined: string;
  sessions: number;
  mobileno?: string;
  permissions?: Record<string, boolean>;
}
