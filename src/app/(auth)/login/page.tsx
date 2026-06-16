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
import { useEffect, useRef, useState } from "react";
import { fetchAndSetUserProfile } from "@/lib/axios";
import useSession from "@/hooks/useSession";
import Cookies from "js-cookie";
import { useGoogleLoginMutation, useLoginMutation } from "@/lib/queries/identityService/useIdentityService";
import SubHeading from "@/components/Typography/SubHeading";
import { useSearchParams } from "next/navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const [googleButtonReady, setGoogleButtonReady] = useState(false);
  const { setUser, setIsUserLoggedIn } = useSession();
  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation();
  const { mutateAsync: googleSignIn, isPending: isGoogleSignInPending } = useGoogleLoginMutation();
  const isPending = isLoginPending || isGoogleSignInPending;
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const callback = searchParams?.get("callback");

  const resolveRedirect = (fallback: string) => {
    if (callback && callback.startsWith("/")) {
      router.push(callback);
      return;
    }
    router.push(fallback);
  };

  const initializeGoogleButtons = () => {
    if (typeof window === "undefined" || !(window as any).google || !googleClientId || !googleButtonRef.current) return;
    const google = (window as any).google;
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleGoogleCredentialResponse,
    });
    google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      width: 320,
      shape: "rectangular",
      text: "continue_with",
    });
    setGoogleButtonReady(true);
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
        const userRole = data.userProfileData.role;
        if (userRole === "admin") {
          resolveRedirect("/a/dashboard");
        } else if (userRole === "educator") {
          resolveRedirect("/e/dashboard");
        } else if (userRole === "student") {
          resolveRedirect("/s/dashboard");
        } else {
          resolveRedirect("/");
        }
      } else {
        toast.error("Google sign-in failed!");
      }
    } catch (error) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="flex flex-col gap-6 mx-auto">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initializeGoogleButtons} />

      <SubHeading text="Log In" />

      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={LoginSchema}
onSubmit={async (values) => {
          try {
            const data = await login({ email: values.email, password: values.password, rememberMe: values.rememberMe })
            if (data?.userData && data?.userProfileData) {
              setIsUserLoggedIn(true)
              toast.success("Login successful!");
              fetchAndSetUserProfile()
              
              const userRole = data.userProfileData.role;
              if (userRole === "admin") {
                resolveRedirect("/a/dashboard");
              } else if (userRole === "educator") {
                resolveRedirect("/e/dashboard");
              } else if (userRole === "student") {
                resolveRedirect("/s/dashboard");
              } else {
                resolveRedirect("/");
              }
            } else {
              toast.error("Invalid credentials!");
            }
          } catch (error) {
            toast.error("Login failed. Please try again.");
          }
        }}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
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
              disabled={isPending}
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
              disabled={isPending}
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

              <Link href="/forgot-password" className={`text-xs lg:text-sm ${isPending ? "bg-gray-100 text-gray-400" : "text-[#0047FF] hover:underline"} font-medium`}>
                Forgot password?
              </Link>
            </div>

            <Button variant="primary" type="submit" disabled={!isValid || !dirty || isPending} loading={isPending}>
              Log In
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-300" />
              <span className="text-gray-500 text-xs lg:text-sm">or</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <div className="w-full min-h-[44px] flex items-center justify-center">
              <div ref={googleButtonRef} id="google-login" className="w-full flex items-center justify-center" />
              {!googleButtonReady && (
                <button
                  type="button"
                  onClick={() => {
                    const google = typeof window !== "undefined" ? (window as any).google : null;
                    if (google?.accounts?.id) {
                      google.accounts.id.prompt();
                    } else {
                      toast.error("Google sign-in is still loading. Please try again in a moment.");
                    }
                  }}
                  className="w-full max-w-[320px] h-[44px] flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[12px] font-semibold text-[#4285F4]">
                    G
                  </span>
                  Continue with Google
                </button>
              )}
            </div>

            <p className="text-xs lg:text-sm text-center mt-2 text-gray-600">
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
