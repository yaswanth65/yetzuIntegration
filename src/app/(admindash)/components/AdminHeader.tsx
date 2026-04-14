import Image from "next/image";
import React from "react";

export default function AdminHeader() {
    return (
        <div className="w-full border-b border-gray-200 flex items-center justify-between p-4">
            <div>
                <Image width={120} height={120} src="/logo-Yetzu.svg" alt="logo" />
            </div>
            <div className="flex items-center gap-3 px-5 ">
                <button>
                    <Image
                        width={20}
                        height={20}
                        src="/admin-dashboard/ad-bell-icon.svg"
                        alt="bell-icon"
                    />
                </button>
                <span className="w-[2px] h-6 bg-gray-300 inline-block"></span>

                <div className="flex items-center gap-5 ">
                    <div className="flex items-center gap-2">
                        <Image
                            width={35}
                            height={35}
                            src="/admin-dashboard/profile-NataliaSam.svg" 
                            alt="icon"/>
                        <div>
                            <h1 className="text-base">Natalia Sam</h1>
                            <p className="text-xs text-gray-400">naatt@gmail.com</p>
                        </div>
                    </div>

                    <img src="/admin-dashboard/ad-drop-down.svg" alt="dropdown-icon" />
                </div>
            </div>
        </div>
    );
}
