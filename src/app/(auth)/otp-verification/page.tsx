"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useOtpVerificationMutation } from "@/lib/queries/identityService/useIdentityService";

export default function OTPVerification() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const { mutateAsync: verifyOtp, isPending } = useOtpVerificationMutation();

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<string>("");
    const [shake, setShake] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) router.push("/forgot-password");
    }, [email, router]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");
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
            setError("Please enter all 6 digits of the OTP.");
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }

        try {
            const response = await verifyOtp({ email: email || "", otp: otpCode });

            if (response.success) {
                toast.success(response?.message || "OTP verified successfully!");
                router.push(
                    `/reset-password?email=${encodeURIComponent(email!)}&otp=${encodeURIComponent(otpCode!)}`
                );
            }
        } catch (err: any) {
            const message =
                err.response?.data?.message || "OTP verification failed. Please try again.";
            setError(message);
            toast.error(message);
            setShake(true);
            setTimeout(() => setShake(false), 600);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-[#021165] mb-2">OTP Verification</h1>
            <p className="text-gray-600 text-sm mb-6">
                Enter the 6-digit OTP sent to <br />
                <span className="font-medium">{email}</span>
            </p>

            <div
                className={`flex justify-between mb-2 transition-all duration-300 ${shake ? "animate-shake" : ""
                    }`}
            >
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        disabled={isPending}
                        value={digit}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`w-12 h-12 text-center text-lg rounded-lg border 
              focus:outline-none focus:ring-2 
              ${error
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                    />
                ))}
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button onClick={handleSubmit} disabled={isPending} loading={isPending}>
                {isPending ? "Verifying..." : "Verify"}
            </Button>
        </div>
    );
}
