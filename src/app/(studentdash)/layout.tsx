"use client";

import DashLayout from "@/app/(studentdash)/components/DashLayout";

export default function StudentDashLayout({ children }: { children: React.ReactNode }) {
    return <DashLayout role="student">{children}</DashLayout>;
}
