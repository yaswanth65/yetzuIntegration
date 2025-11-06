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
    className,
    ...props
}) => {
    const isDisabled = disabled || loading;

    const base =
        "flex items-center justify-center px-4 py-2 rounded-xl h-[44px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 gap-4";
    const styles = {
        primary:
            "bg-[#0047FF] text-white hover:bg-[#003ed6] border-transparent cursor-pointer",
        secondary:
            "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#003ed6] cursor-pointer",
        disabled:
            "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed",
    };

    let variantClass =
        isDisabled
            ? styles.disabled
            : variant === "primary"
                ? styles.primary
                : styles.secondary;

    return (
        <button
            className={`${base} ${variantClass} ${className} cursor-pointer`}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <Spinner />
                    Loading...
                </span>
            ) : (
                <>
                    {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
                    <span>{children}</span>
                </>
            )}
        </button>
    );
};

export default Button;
