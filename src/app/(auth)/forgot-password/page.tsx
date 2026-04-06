"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "@/lib/queries/identityService/useIdentityService";

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPasswordForm() {
    const router = useRouter();
    const { mutateAsync: forgotPassword, isPending } = useForgotPasswordMutation();

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-[38px] tracking-tighter text-[#021165] font-semibold font-inter">
                Forgot Password?
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed">
                A <span className="font-semibold">6 digit OTP</span> will be sent to this
                email address for the resetting of password
            </p>

            <Formik
                initialValues={{ email: "" }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={async (values) => {
                    try {
                        const response = await forgotPassword({ email: values.email });
                        if (response?.message && response?.success) {
                            toast.success("OTP sent successfully to your email.");
                            router.push(`/otp-verification?email=${encodeURIComponent(values.email)}`);
                        } else {
                            toast.error(response?.message || "Something went wrong!");
                        }
                    } catch (err: any) {
                        toast.error(err.response?.data?.message || "Failed to send OTP.");
                    }
                }}
            >
                {({ touched, isValid, errors, dirty, values: { email }, handleChange, handleBlur }) => (
                    <Form className="flex flex-col gap-3">
                        <Input name="email"
                            label="Enter your email"
                            placeholder="Enter Input"
                            required
                            disabled={isPending}
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email ? errors.email : ""}
                        />

                        <Button
                            variant="primary"
                            disabled={!isValid || !dirty || isPending}
                            loading={isPending}
                            type="submit"
                        >
                            {isPending ? "Sending..." : "Get OTP"}
                        </Button>

                        <div className="flex items-center gap-2 my-2">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <p className="text-sm text-center text-gray-600">
                            Don’t have an account?{" "}
                            <Link href="/signup" className={`text-xs lg:text-sm ${isPending ? "bg-gray-100 text-gray-400" : "text-[#0047FF] hover:underline"} font-medium`}>
                                Sign up here
                            </Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
