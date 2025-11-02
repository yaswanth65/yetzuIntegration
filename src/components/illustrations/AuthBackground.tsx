import React from "react";

interface AuthBackgroundProps {
    className?: string;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ className = "" }) => {
    return (
        <div
            className={`w-full h-full ${className} rounded-2xl`}
            style={{
                background:
                    "linear-gradient(105.64deg, #E9E9FF 1.33%, #F9F9F9 45.46%, #E9E9FF 100%)",
            }}
        ></div>
    );
};

export default AuthBackground;
