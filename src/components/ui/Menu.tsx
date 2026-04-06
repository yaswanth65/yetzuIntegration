"use client";
import { ChevronDown } from "lucide-react";
import React from "react";

interface StyledSelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const Menu: React.FC<StyledSelectProps> = ({
    label,
    options,
    value,
    onChange,
}) => {
    return (
        <div className="relative w-full sm:w-56 md:w-64 lg:w-72">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
          w-full
          appearance-none
          bg-[#F5F5F5]
          border
          border-gray-300
          rounded-md
          py-2.5
          px-4
          pr-8
          text-gray-700
          focus:outline-none
          cursor-pointer
        "
            >
                <option value="" disabled hidden>
                    {label}
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>

            <ChevronDown
                className="
          absolute 
          top-1/2 
          right-2 
          transform 
          -translate-y-1/2
          pointer-events-none
        "
            />
        </div>
    );
};

export default Menu;
