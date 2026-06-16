import {
  Shield,
  BookOpen,
  User as UserIcon,
} from "lucide-react";
import { User } from "./types";

export const permissionsRoles = [
  {
    role: "Admin",
    users: 2,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    Icon: Shield,
    permissions: [true, true, true, true, true, true],
  },
  {
    role: "Educator",
    users: 4,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    Icon: BookOpen,
    permissions: [false, true, true, true, false, false],
  },
  {
    role: "Student",
    users: 5,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    Icon: UserIcon,
    permissions: [false, false, false, false, false, false],
  },
];

