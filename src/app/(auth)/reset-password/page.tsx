"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import { api } from "@/lib/axios";
import Button from "@/components/ui/Button";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    useEffect(() => {
        if (!email || !otp) {
            router.push("/login");
        }
    }, [email, otp, router]);

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const handleSubmit = async (values: { password: string }) => {
        try {
            const res = await api.post(
                "/identityapi/v1/auth/reset-password",
                {
                    email,
                    otp,
                    newPassword: values.password,
                }
            );

            if (res?.data?.message) {
                toast.success(res.data.message || "Password reset successful!");
            }

            if (res.status === 200) {
                toast.success("Password reset successful! Please log in.");
                router.push("/login");
            }
        } catch (error: any) {
            const msg =
                error.response?.data?.message ||
                "Failed to reset password. Please try again.";
            toast.error(msg);
        }
    };

    return (
        <div className="flex flex-col mx-auto gap-6">
            <h1 className="text-3xl font-bold text-[#001e6c]">
                Reset password
            </h1>

            <p className="text-sm text-gray-600 text-center mt-2 max-w-md">
                A great password should be unique, at least <strong>8 characters</strong> long,
                and mix uppercase and lowercase letters, numbers, and symbols (like !@#$%).
            </p>

            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, touched, dirty, errors, isValid, values, handleBlur, handleChange }) => (
                    <Form className="flex flex-col gap-6">
                        <Input
                            type="password"
                            name="password"
                            label="Enter New Password"
                            placeholder="Enter New Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password ? errors.password : ""}
                        />

                        <Input
                            type="password"
                            name="confirmPassword"
                            label="Confirm New Password"
                            placeholder="Confirm New Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && !!errors.confirmPassword}
                            helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!isValid || !dirty || isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Done"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;
