"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/axios";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function OTPVerification() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!email) router.push("/forgot-password");
    }, [email, router]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post(
                "/identityapi/v1/auth/verify-otp",
                { email, otp: otpCode }
            );

            if (response.status === 200) {
                toast.success(response?.data?.message || "OTP verified successfully!");
                router.push(
                    `/reset-password?email=${encodeURIComponent(email!)}&otp=${encodeURIComponent(otpCode!)}`
                );
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "OTP verification failed. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-[#021165] mb-2">
                OTP Verification
            </h1>
            <p className="text-gray-600 text-sm mb-6">
                Enter the 6-digit OTP sent to <br />
                <span className="font-medium">{email}</span>
            </p>

            <div className="flex justify-between mb-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        disabled={isLoading}
                        value={digit}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>

            <Button
                onClick={handleSubmit}
                disabled={isLoading}
                loading={isLoading}
            >
                {isLoading ? "Verifying..." : "Verify"}
            </Button>
        </div>
    );
}
