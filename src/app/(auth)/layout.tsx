import React from "react";
import AuthWrapper from "./AuthWrapper";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <AuthWrapper>{children}</AuthWrapper>;
}
