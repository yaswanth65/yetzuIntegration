import React, { useState, InputHTMLAttributes, ReactNode } from "react";
import eye from "@/components/icons/eye.svg";
import eyeoff from "@/components/icons/eyeoff.svg";
import Image from "next/image";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    icon?: ReactNode;
    rightIcon?: ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    required,
    icon,
    error,
    helperText,
    type,
    disabled,
    placeholder,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputType =
        type === "password" ? (showPassword ? "text" : "password") : type;

    // Responsive styles for container and input
    const border = error
        ? "border-red-500"
        : "border-gray-200 focus-within:border-blue-600";
    const bg = disabled ? "bg-gray-100 text-gray-400" : "bg-white";
    const textColor = error ? "text-red-600" : "text-gray-900";
    const containerStyle = disabled
        ? "opacity-60 cursor-not-allowed"
        : "cursor-text";

    return (
        <div className={containerStyle + " w-full"}>
            {/* Label */}
            {label && (
                <label className="block text-gray-600 text-base sm:text-[14px] mb-1 select-none">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* Input wrapper */}
            <div
                className={`flex items-center rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border transition-all duration-150 ${bg} ${border} w-full`}
            >
                {icon && <span className="mr-2 sm:mr-3">{icon}</span>}

                {/* Input */}
                <input
                    {...props}
                    type={inputType}
                    disabled={disabled}
                    placeholder={isFocused ? "" : placeholder}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    className={`flex-1 bg-transparent border-0 outline-none text-[15px] sm:text-[14px] ${textColor} placeholder-gray-400 ${disabled ? "cursor-not-allowed" : ""
                        }`}
                />

                {/* Eye toggle (for password fields) */}
                {type === "password" && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => !disabled && setShowPassword((v) => !v)}
                        disabled={disabled}
                        className={`ml-2 sm:ml-3 focus:outline-none ${disabled ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                    >
                        <Image
                            src={showPassword ? eyeoff : eye}
                            alt="toggle password"
                            width={18}
                            height={18}
                            className="sm:w-[22px] sm:h-[22px]"
                        />
                    </button>
                )}
            </div>

            {/* Helper text */}
            <div
                className={`text-xs sm:text-sm mt-1 ${error ? "text-red-600" : "text-gray-400"
                    }`}
            >
                {helperText}
            </div>
        </div>
    );
};

export default Input;
