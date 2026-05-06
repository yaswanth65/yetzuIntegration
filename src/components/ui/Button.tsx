import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "black" | "legacy";
  size?: "sm" | "md" | "lg";
  rounded?: "md" | "lg" | "xl" | "full";
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
  size = "md",
  rounded = "xl",
  trailingIcon,
  loading,
  disabled,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading;

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-2.5 text-base",
  };

  const roundeds = {
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const base =
    "flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 gap-2 select-none w-full";

  const styles = {
    primary:
      "bg-[#042BFD] text-white hover:bg-[#021DC0] active:scale-[0.98] shadow-none cursor-pointer",
    secondary:
      "bg-transparent text-[#042BFD] border border-[#042BFD] hover:bg-[#042BFD] hover:text-white active:scale-[0.98] cursor-pointer transition-all duration-300",
    outline:
      "bg-transparent text-[#000000] border border-[#000000] hover:bg-gray-50 active:scale-[0.98] cursor-pointer transition-all duration-300",
    black:
      "bg-[#111111] text-white hover:bg-black active:scale-[0.98] cursor-pointer",
    legacy:
      "bg-[#003fc7] text-white hover:bg-[#0033a8] active:scale-[0.98] cursor-pointer",
    disabled: "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed",
  };

  const variantClass = isDisabled
    ? styles.disabled
    : variant === "primary"
      ? styles.primary
      : variant === "secondary"
        ? styles.secondary
        : variant === "outline"
          ? styles.outline
          : variant === "black"
            ? styles.black
            : styles.legacy;

  return (
    <button
      disabled={isDisabled}
      className={`${base} ${sizes[size]} ${roundeds[rounded]} ${variantClass} ${className}`}
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
