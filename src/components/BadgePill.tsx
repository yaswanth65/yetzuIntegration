import { ReactNode } from "react";

interface BadgePillProps {
    text: string;
    icon?: ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
}

export default function BadgePill({ text, icon, variant = "primary", className }: BadgePillProps) {
    const bgColor = variant === "primary" ? "bg-[#E6EAFF]" : "bg-gray-100";
    const textColor = variant === "primary" ? "text-[#021165]" : "text-gray-700";
    const iconColor = variant === "primary" ? "text-[#042BFD]" : "text-gray-600";

    return (
        <div className={`flex items-center gap-2 w-fit ${bgColor} px-5 py-2 rounded-full ${className}`}>
            {icon && <span className={iconColor}>{icon}</span>}
            <span className={`text-sm ${textColor}`}>{text}</span>
        </div>
    );
}
