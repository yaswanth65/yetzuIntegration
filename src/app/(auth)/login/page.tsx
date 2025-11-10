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
import Cookies from "js-cookie";
import { useGoogleLoginMutation, useLoginMutation } from "@/lib/queries/identityService/useIdentityService";
import SubHeading from "@/components/Typography/SubHeading";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function LoginForm() {
  const router = useRouter();
  const { setUser, setIsUserLoggedIn } = useSession();
  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation();
  const { mutateAsync: googleSignIn, isPending: isGoogleSignInPending } = useGoogleLoginMutation();
  const isPending = isLoginPending || isGoogleSignInPending;
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
              router.push("/");
            } else {
              toast.error("Invalid credentials!");
            }
          } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error("Login error:", error);
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

            <Button variant="primary" disabled={!isValid || !dirty || isPending} loading={isPending}>
              Log In
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-300" />
              <span className="text-gray-500 text-xs lg:text-sm">or</span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <div id="google-login" className="w-full"></div>

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
