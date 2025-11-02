"use client";
import React from "react";
import AuthBackground from "@/components/illustrations/AuthBackground";
import Image from "next/image";
import Logo from "@/components/illustrations/Yetzu.svg";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full bg-white flex items-center justify-center py-3.5">
            <div className="flex w-full h-full rounded-sm px-4">
                <div className="w-[55%] bg-[#f8f9ff] flex items-center justify-center">
                    <AuthBackground />
                </div>

                <div className="w-[45%] flex flex-col h-full justify-between px-28 mx-auto">
                    <div className="pt-10">
                        <Image src={Logo} alt="logo" width="126" height='26' />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div >
    );
}
