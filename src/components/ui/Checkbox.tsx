import React, { useEffect, useRef } from "react";

interface CheckboxProps {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    large?: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    indeterminate = false,
    disabled = false,
    large = false,
    onChange,
}) => {
    const sizeCn = large
        ? "w-6 h-6 text-md rounded-md"
        : "w-4 h-4 text-sm rounded-sm";

    const ref = useRef<HTMLButtonElement>(null);

    // handle keyboard toggle
    const handleToggle = () => {
        if (disabled) return;
        onChange?.(!checked);
    };

    const mark = indeterminate ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4 mx-auto">
            <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
        </svg>
    ) : checked ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4 mx-auto">
            <polyline
                points="5 13 10 18 19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ) : null;

    return (
        <button
            ref={ref}
            type="button"
            onClick={handleToggle}
            onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleToggle();
                }
            }}
            className={`flex items-center justify-center transition-all duration-200 ease-in-out ${sizeCn} 
        ${checked || indeterminate ? "bg-[#0047FF] text-white" : "bg-white border border-gray-300"}
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
        shadow-sm`}
            disabled={disabled}
            style={{ outline: "none" }}
            aria-checked={checked}
        >
            <span
                className={`transition-all duration-200 transform ${checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
            >
                {mark}
            </span>
        </button>
    );
};

export default Checkbox;
