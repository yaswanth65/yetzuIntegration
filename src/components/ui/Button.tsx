import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    trailingIcon?: React.ReactNode;
    loading?: boolean;
};

const Spinner = () => (
    <svg
        className="animate-spin h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.313 2.687 6 6 6v-1.709z"
        ></path>
    </svg>
);

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    trailingIcon,
    loading,
    disabled,
    className = "",
    ...props
}) => {
    const isDisabled = disabled || loading;

    const base =
        "flex items-center justify-center px-10 py-1 rounded-md text-sm sm:text-base font-medium h-[44px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 gap-2 select-none";

    const styles = {
        primary:
            "bg-[#0047FF] text-white hover:bg-[#0038cc] active:scale-[0.98] shadow-sm cursor-pointer",
        secondary:
            "bg-transparent text-[#0047FF] border border-[#0047FF] hover:bg-[#0047FF] hover:text-white active:scale-[0.98] cursor-pointer transition-all duration-300",
        disabled:
            "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed",
    };

    const variantClass = isDisabled
        ? styles.disabled
        : variant === "primary"
            ? styles.primary
            : styles.secondary;

    return (
        <button
            disabled={isDisabled}
            className={`${base} ${variantClass} ${className}`}
            {...props}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <Spinner />
                    Loading...
                </span>
            ) : (
                <>
                    <span>{children}</span>
                    {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
                </>
            )}
        </button>
    );
};

export default Button;
