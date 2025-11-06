"use client";
import React from "react";
import AuthBackground from "@/components/illustrations/AuthBackground";
import Image from "next/image";
import Logo from "@/components/illustrations/Yetzu.svg";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full bg-white flex items-center justify-center py-3.5">
            <div className="flex w-full h-full rounded-sm px-4">
                <div className="hidden lg:flex w-[55%] bg-[#f8f9ff] items-center justify-center">
                    <AuthBackground />
                </div>
                <div className="w-full lg:w-[45%] flex flex-col h-full justify-between px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 mx-auto">
                    <div className="hidden lg:block pt-6 lg:pt-10">
                        <Image
                            src={Logo}
                            alt="logo"
                            width={100}
                            height={22}
                            className="lg:w-[126px] lg:h-[26px] w-[90px] h-auto"
                        />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        <div className="block lg:hidden w-full">
                            {children}
                        </div>
                        <div className="hidden lg:block">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
