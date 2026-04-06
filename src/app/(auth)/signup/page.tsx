"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSession from "@/hooks/useSession";
import { api } from "@/lib/axios";
import { useGoogleLoginMutation, useSignUpMutation } from "@/lib/queries/identityService/useIdentityService";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignupForm() {
  const router = useRouter();
  const { setIsUserLoggedIn } = useSession();
  const { mutateAsync: googleSignIn, isPending: isGoogleSignInPending } = useGoogleLoginMutation();
  const { mutateAsync: signUp, isPending: isSignupPending } = useSignUpMutation();
  const isPending = isGoogleSignInPending || isSignupPending
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const initializeGoogleButtons = () => {
    if (typeof window === "undefined" || !(window as any).google || !googleClientId) return;
    const google = (window as any).google;
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleGoogleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "outline",
      size: "large",
      width: "full",
      shape: "rectangular",
      text: "sign_up_with",
    });
  };

  useEffect(() => {
    initializeGoogleButtons();
  }, [googleClientId]);

  const handleGoogleCredentialResponse = async (response: any) => {
    try {
      const data = await googleSignIn({ idToken: response.credential });
      if (data?.userData && data?.userProfileData) {
        setIsUserLoggedIn(true);
        toast.success("Google sign-in successful!");
        router.push("/");
      } else {
        toast.error("Google sign-in failed!");
      }
    } catch (error) {
      toast.error("Google sign-in failed");
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[38px] tracking-tighter text-[#021165] font-semibold font-inter w-full text-left">
        Sign Up
      </h1>

      <Formik
        initialValues={{ name: "", email: "", phone: "", password: "", confirmPassword: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const payload = { ...values, mobileno: values.phone, role: "student" };
            const data = await signUp(payload);
            if (data.message === "User created") {
              toast.success("Signup successful! Redirecting...");
              router.push('/')
            } else {
              toast.error(data.message || "Something went wrong!");
            }
          } catch (error: any) {
            console.error("Signup error:", error);
            toast.error(error.response?.data?.message || "Signup failed.");
          }
        }}
      >
        {({ values, errors, touched, dirty, isValid, handleChange, handleBlur }) => (
          <Form className="flex flex-col gap-2 w-full">
            <Input
              name="name"
              label="Name"
              required
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
              placeholder="Enter your name"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name ? errors.name : ""}
            />

            <Input
              name="email"
              label="Email"
              required
              value={values.email}
              onChange={handleChange}
              disabled={isPending}
              onBlur={handleBlur}
              placeholder="Enter your email"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email ? errors.email : ""}
            />

            <Input
              name="phone"
              label="Phone Number"
              required
              value={values.phone}
              onChange={handleChange}
              disabled={isPending}
              onBlur={handleBlur}
              placeholder="Enter your phone number"
              error={touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone ? errors.phone : ""}
            />

            <Input
              name="password"
              type="password"
              label="Create Password"
              required
              value={values.password}
              onChange={handleChange}
              disabled={isPending}
              onBlur={handleBlur}
              placeholder="Enter your password"
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password ? errors.password : ""}
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              required
              value={values.confirmPassword}
              disabled={isPending}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
            />

            <Button variant="primary" disabled={!isValid || !dirty || isPending} loading={isPending}>
              {isPending ? "Signing up..." : "Sign Up"}
            </Button>

            <div className="flex items-center gap-3 my-2">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div id="google-login"></div>

            <p className="text-sm text-center text-gray-600 mt-2">
              Have an account?{" "}
              <Link href="/login" className={`text-xs lg:text-sm ${isPending ? "bg-gray-100 text-gray-400" : "text-[#0047FF] hover:underline"} font-medium`}>
                Log in here
              </Link>
            </p>
          </Form>
        )}
      </Formik>

    </div>
  );
}
