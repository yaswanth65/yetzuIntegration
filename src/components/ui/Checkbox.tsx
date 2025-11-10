import React, { useRef } from "react";

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
    const ref = useRef<HTMLButtonElement>(null);

    const sizeCn = large
        ? "w-6 h-6 text-md rounded-md"
        : "w-4 h-4 text-sm rounded-sm";

    // toggle state
    const handleToggle = () => {
        if (disabled) return;
        onChange?.(!checked);
    };

    // mark: tick or indeterminate line
    const mark = indeterminate ? (
        <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 mx-auto pointer-events-none"
        >
            <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
        </svg>
    ) : checked ? (
        <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 mx-auto pointer-events-none"
        >
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
            disabled={disabled}
            aria-checked={checked}
            style={{ outline: "none" }}
            className={`flex items-center justify-center transition-all duration-200 ease-in-out ${sizeCn} 
        ${checked || indeterminate ? "bg-[#0047FF] text-white" : "bg-white border border-gray-300"}
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
        shadow-sm`}
        >
            <span
                className={`transition-all duration-200 transform pointer-events-none ${checked || indeterminate
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0"
                    }`}
            >
                {mark}
            </span>
        </button>
    );
};

export default Checkbox;
