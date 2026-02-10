import { Users, Calendar, Shield, FileText, HelpCircle, Settings } from 'lucide-react';

export const ADMIN_MENU_ITEMS = [
  { id: 'users', label: 'Users', icon: Users },
  { id: 'sessions', label: 'Sessions', icon: Calendar },
  { id: 'security', label: 'Security & Compliance', icon: Shield },
  { id: 'content', label: 'Content Management', icon: FileText },
];

export const ADMIN_BOTTOM_MENU_ITEMS = [
  { label: 'Setting', icon: Settings },
];

export const ADMIN_STATS_DATA = [
  { label: 'Total Users', value: '1,234' },
  { label: 'Active Students', value: '890' },
  { label: 'Verified Educators', value: '56' },
  { label: 'Pending Approvals', value: '12' },
];

export const MOCK_USERS = [
  {
    id: "3443345345",
    name: "John Michael",
    email: "john@mail.com",
    role: "Student",
    status: "Active",
    created: "14-01-2026",
  },
  {
    id: "3443345345",
    name: "Emma Roberts",
    email: "emma@mail.com",
    role: "Educator",
    status: "Suspended",
    created: "14-01-2026",
  },
  {
    id: "3443345345",
    name: "Emma Roberts",
    email: "ananyabisht62@gmail.com",
    role: "Editor",
    status: "Pending",
    created: "14-01-2026",
  },
  {
    id: "3443345345",
    name: "Emma Roberts",
    email: "alan@figr.design",
    role: "Admin",
    status: "Pending",
    created: "14-01-2026",
  },
  {
    id: "3443345345",
    name: "Emma Roberts",
    email: "emma@mail.com",
    role: "Student",
    status: "Pending",
    created: "14-01-2026",
  },
];
