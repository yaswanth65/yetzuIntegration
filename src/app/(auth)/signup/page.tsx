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

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignupForm() {
  const router = useRouter();
  const { setUser } = useSession();
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
      const res = await api.post("/identityapi/v1/auth/google-signin", {
        id_token: response.credential
      });
      const { data } = res;
      if (data?.success && data?.userData && data?.userProfileData) {
        localStorage.setItem("accessToken", data.userData.access_token);
        localStorage.setItem("refreshToken", data.userData.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.userProfileData));
        setUser(data.userProfileData);
        toast.success("Google sign-up successful!");
        router.push("/");
      } else {
        toast.error("Google sign-up failed!");
      }
    } catch (error) {
      toast.error("Google sign-up failed");
      console.error("Google sign-up error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[38px] tracking-tighter text-[#021165] font-semibold font-inter w-full text-left">
        Sign Up
      </h1>

      <Formik
        initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = { ...values, role: "student" };
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/identityapi/v1/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (data.message === "User created") {
              toast.success("Signup successful! Redirecting...");

              // Automatically log in user after signup by calling signin API
              const res = await api.post("/identityapi/v1/auth/signin", {
                email: values.email, password: values.password,
              });
              const { data } = res;

              if (data?.success && data?.userData && data?.userProfileData) {
                localStorage.setItem("accessToken", data.userData.access_token);
                localStorage.setItem("refreshToken", data.userData.refresh_token);
                localStorage.setItem("user", JSON.stringify(data.userProfileData));
                setUser(data.userProfileData);
                router.push("/");
              } else {
                toast.error("Login after signup failed.");
              }
            } else {
              toast.error(data.message || "Something went wrong!");
            }
          } catch (error: any) {
            console.error("Signup error:", error);
            toast.error(error.response?.data?.message || "Signup failed.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, dirty, isValid, handleChange, handleBlur, isSubmitting }) => (
          <Form className="flex flex-col gap-2 w-full">
            <Input
              name="name"
              label="Name"
              required
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              onBlur={handleBlur}
              placeholder="Enter your email"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email ? errors.email : ""}
            />

            <Input
              name="password"
              type="password"
              label="Create Password"
              required
              value={values.password}
              onChange={handleChange}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
            />

            <Button variant="primary" disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>

            <div className="flex items-center gap-3 my-2">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div id="google-login"></div>

            <p className="text-sm text-center text-gray-600 mt-2">
              Have an account?{" "}
              <Link href="/login" className={`text-xs lg:text-sm ${isSubmitting ? "bg-gray-100 text-gray-400" : "text-[#0047FF] hover:underline"} font-medium`}>
                Log in here
              </Link>
            </p>
          </Form>
        )}
      </Formik>

    </div>
  );
}
