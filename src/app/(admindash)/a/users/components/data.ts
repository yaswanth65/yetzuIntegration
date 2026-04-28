import {
  Shield,
  BookOpen,
  User as UserIcon,
  Edit2,
  Building2,
  Languages,
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
  {
    role: "Editor",
    users: 1,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
    Icon: Edit2,
    permissions: [false, false, true, false, false, false],
  },
  {
    role: "Institution",
    users: 1,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
    Icon: Building2,
    permissions: [true, true, false, true, true, false],
  },
  {
    role: "Translator",
    users: 1,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-50",
    Icon: Languages,
    permissions: [false, false, false, false, false, false],
  },
];

