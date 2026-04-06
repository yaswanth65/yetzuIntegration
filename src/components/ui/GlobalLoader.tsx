"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GlobalLoader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 99) {
                    clearInterval(timer);
                    return 99;
                }
                // Random increment between 1 and 10
                const increment = Math.floor(Math.random() * 10) + 1;
                return Math.min(prev + increment, 99);
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-[#F8FAFF] flex flex-col items-center justify-center font-mono">
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(#042BFD 1px, transparent 1px),
            linear-gradient(90deg, #042BFD 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo or Icon */}
                <div className="w-20 h-20 relative animate-pulse">
                    <Image
                        src="/images/Logo.png"
                        alt="Loading..."
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Counter */}
                <div className="flex flex-col items-center">
                    <span className="text-6xl font-bold text-[#021165] tracking-tighter">
                        {progress.toString().padStart(2, '0')}%
                    </span>
                    <span className="text-sm text-[#042BFD] mt-2 font-medium tracking-widest uppercase">
                        Loading Education Modules
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-blue-100 rounded-full overflow-hidden mt-4">
                    <div
                        className="h-full bg-[#042BFD] transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
