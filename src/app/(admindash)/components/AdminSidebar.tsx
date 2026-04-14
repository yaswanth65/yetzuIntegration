"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const menuItems = [
    { name: "Overview", path: "/a/dashboard", icon: "/admin-dashboard/ad-overview-icon.svg"},
    { name: "Session", path: "/a/sessions", icon: "/admin-dashboard/ad-sessions-icon.svg"},
    { name: "Analytics", path: "/a/analytics", icon: "/admin-dashboard/ad-analytics-icon.svg"},
    { name: "User Management", path: "/a/users", icon: "/admin-dashboard/ad-user-management-icon.svg"},
    { name: "CMS", path: "/a/cms", icon: "/admin-dashboard/ad-cms-icon.svg"},
    { name: "Blogs", path: "/a/blogs", icon: "/admin-dashboard/ad-blogs-icon.svg"},
    { name: "Contact Submissions", path: "/a/contacts", icon: "/admin-dashboard/ad-contact-submissions-icon.svg"},
    { name: "Coupon Management", path: "/a/coupons", icon: "/admin-dashboard/ad-coupon-management-icon.svg"}
]

export default function AdminSidebar() {

    const pathname = usePathname();

    
    return (
        <div className='w-62 h-screen bg-white border-r p-5 border-gray-200'>

        <div className='flex flex-col items-start gap-4 '>
            
            {menuItems.map((item)=>{
                
                const isActive = pathname === item.path
                return(
                    <Link className={`flex items-center gap-3 px-4 py-2 text-[14px] ${ isActive ? "bg-gray-200 w-full font-medium rounded-lg" : "text-[#404040] hover:bg-gray-200 w-full rounded-lg"} `} href={item.path} key={item.name}> <Image width={20} height={20} src={item.icon} alt="drop"/> {item.name}</Link>
                )
            })}
        </div>
    </div>
  )


}
