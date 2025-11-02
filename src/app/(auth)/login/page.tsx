"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Script from "next/script";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import useSession from "@/hooks/useSession";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function LoginForm() {
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
      text: "continue_with",
    });
  };

  useEffect(() => {
    initializeGoogleButtons();
  }, [googleClientId]);

  const handleGoogleCredentialResponse = async (response: any) => {
    try {
      // Post Google token to your backend API for validation and get user data + tokens back
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/identityapi/v1/auth/google-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });
      const data = await res.json();
      if (data?.success && data?.userData && data?.userProfileData) {
        // Store tokens and user info in localStorage
        localStorage.setItem("accessToken", data.userData.access_token);
        localStorage.setItem("refreshToken", data.userData.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.userProfileData));
        setUser(data.userProfileData);
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
    <div className="flex flex-col gap-6 mx-auto">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initializeGoogleButtons} />

      <h1 className="text-[28px] lg:text-[30px] xl:text-[34px] tracking-tight text-[#021165] font-semibold font-inter">
        Log In
      </h1>

      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await api.post("/identityapi/v1/auth/signin", {
              email: values.email, password: values.password,
            });
            const { data } = res;
            if (data?.userData && data?.userProfileData) {
              // Store tokens and user info in localStorage
              localStorage.setItem("accessToken", data.userData.access_token);
              localStorage.setItem("refreshToken", data.userData.refresh_token);
              localStorage.setItem("user", JSON.stringify(data.userProfileData));
              setUser(data.userProfileData);
              toast.success("Login successful!");
              router.push("/");
            } else {
              toast.error("Invalid credentials!");
            }
          } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error("Login error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          isSubmitting,
          setFieldValue,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form className="flex flex-col gap-2">
            <Input
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              disabled={isSubmitting}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email ? errors.email : ""}
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              disabled={isSubmitting}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password ? errors.password : ""}
            />

            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center text-xs lg:text-sm text-gray-700 cursor-pointer select-none">
                <Checkbox
                  checked={values.rememberMe}
                  onChange={(value) => setFieldValue("rememberMe", value)}
                  large
                  disabled={false}
                />
                <span className="ml-3 text-sm font-medium">Remember me</span>
              </label>

              <Link href="/forgot-password" className={`text-xs lg:text-sm ${isSubmitting ? "bg-gray-100 text-gray-400" : "text-[#0047FF] hover:underline"} font-medium`}>
                Forgot password?
              </Link>
            </div>

            <Button variant="primary" disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting}>
              Log In
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-300" />
              <span className="text-gray-500 text-xs lg:text-sm">or</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {!isSubmitting && <div id="google-login" className="w-full"></div>}

            <p className="text-xs lg:text-sm text-center mt-2 text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className={`text-xs lg:text-sm ${isSubmitting ? "bg-gray-100 text-gray-400" : "text-[#0047FF] hover:underline"} font-medium`}>
                Sign up here
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
