"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-6 md:px-12 gap-10">
            <div className="relative w-[250px] h-[200px] sm:w-[300px] sm:h-[240px] md:w-[360px] md:h-[300px]">
                <Image
                    src='/Images/404-tv.png'
                    alt="404 Error TV"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                    Oops!
                </h1>
                <p className="text-gray-500 text-lg sm:text-xl mb-8">
                    We couldn’t find the page you were looking for
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                    Go home
                </Link>
            </div>
        </div>
    );
}
