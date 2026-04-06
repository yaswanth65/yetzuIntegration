"use client";

import { useGetUserProfile, useLogoutMutation } from "@/lib/queries/identityService/useIdentityService";
import React, {
    createContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export type UserType = {
    id: string;
    name: string;
    email: string
    role: string
    createdAt: string
    updatedAt: string
    lastLogin: string
    lastIp: string
}

const DEFAULT_USER: UserType = {
    id: "",
    name: "",
    email: "",
    role: "",
    createdAt: "",
    updatedAt: "",
    lastLogin: "",
    lastIp: ""
};

type UserContextType = {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => Promise<void>;
    refershSession: boolean;
    accessToken: string;
    refreshToken: string;
    isUserLoggedIn: boolean;
};

export const SessionContext = createContext<UserContextType | undefined>(
    undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType>(DEFAULT_USER);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const { mutateAsync: logoutUser } = useLogoutMutation();

    const accessToken = Cookies.get("jwtToken") || "";
    const refreshToken = Cookies.get("refreshToken") || "";

    const { data, isSuccess } = useGetUserProfile();

    useEffect(() => {
        if (isSuccess && data) {
            setUser(data?.user);
            setIsUserLoggedIn(true);
            Cookies.set('isUserLoggedIn', "true", { expires: 1 });
        }
    }, [data, isSuccess]);

    const logout = async () => {
        if (!user) return;
        try {
            const data = await logoutUser({ userId: user.id });
            if (data.success) {
                toast.success("Logged out successfully!");
                setUser(DEFAULT_USER);
                setIsUserLoggedIn(false);
            } else {
                toast.error(`Logout failed: ${data.message || data?.success}`);
                console.error("Logout failed:", data.message);
            }
        } catch (error: any) {
            toast.error(`Logout error: ${error?.message || "Something went wrong"}`);
            console.error("Logout error:", error);
        }
    };

    return (
        <SessionContext.Provider
            value={{
                user,
                setUser,
                logout,
                accessToken,
                refreshToken,
                refershSession: false,
                isUserLoggedIn,
                setIsUserLoggedIn,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};