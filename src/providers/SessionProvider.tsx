"use client";

import { api, authApi } from "@/lib/axios";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";

export type UserType = {
    created_at: string;
    email: string;
    email_verified: boolean;
    identities: {
        user_id: string;
        provider: string;
        connection: string;
        isSocial: boolean;
    };
    name: string;
    role: string;
    updated_at: string;
    user_id: string;
    last_ip: string;
    last_login: string;
    last_password_reset: string;
    logins_count: number;
};

const DEFAULT_USER: UserType = {
    created_at: '',
    email: '',
    email_verified: false,
    identities: {
        user_id: '',
        provider: '',
        connection: '',
        isSocial: false,
    },
    name: 'User',
    role: '',
    updated_at: '',
    user_id: '',
    last_ip: '',
    last_login: '',
    last_password_reset: '',
    logins_count: 0
};


type UserContextType = {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
    logout: () => Promise<void>;
    refershSession: boolean;
    accessToken: string;
    refreshToken: string;
};

export const SessionContext = createContext<UserContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType>(DEFAULT_USER);
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") || '' : '';
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") || '' : '';

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const logout = async () => {
        if (!user) return;
        try {
            const res = await authApi.post("/identityapi/v1/auth/signout", { userId: user.user_id });
            if (res.status === 200) {
                toast.success("Logged out successfully!");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                setUser(DEFAULT_USER);
            } else {
                toast.error(`Logout failed: ${res.statusText || res.status}`);
                console.error("Logout failed:", res.data);
            }
        } catch (error: any) {
            toast.error(`Logout error: ${error?.message || "Something went wrong"}`);
            console.error("Logout error:", error);
        }
    };

    return (
        <SessionContext.Provider value={{ user, setUser, logout, accessToken, refreshToken, refershSession: false }}>
            {children}
        </SessionContext.Provider>
    );
};