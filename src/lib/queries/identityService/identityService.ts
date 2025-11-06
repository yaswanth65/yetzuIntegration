import { api, authApi } from "@/lib/axios";
import { LoginPayload, SignupPayload } from "./types";
import Cookies from "js-cookie";

export const identityService = {
  getAccessToken: async () => {
    const refreshToken = Cookies.get("refreshToken") || "";
    const res = await authApi.post("/identityapi/v1/auth/refresh", {
      refreshToken,
    });
    return res?.data;
  },
  getUserProfile: async () => {
    const res = await authApi.get("/identityapi/v1/auth/me");
    return res?.data;
  },
  signup: async ({ email, password, name, role }: SignupPayload) => {
    const res = await api.post("/identityapi/v1/auth/signup", {
      email,
      password,
      name,
      role,
    });
    return res?.data;
  },
  login: async ({ email, password }: LoginPayload) => {
    const res = await api.post("/identityapi/v1/auth/signin", {
      email,
      password,
    });
    return res?.data;
  },
  googleLogin: async (idToken: string) => {
    const res = await api.post("/identityapi/v1/auth/google-signin", {
      id_token: idToken,
    });
    return res?.data;
  },
  logout: async (userId: string) => {
    const res = await authApi.post("/identityapi/v1/auth/signout", {
      userId,
    });
    return res?.data;
  },
  forgotPassword: async (email: string) => {
    const res = await api.post("/identityapi/v1/auth/forgot-password", {
      email,
    });
    return res.data;
  },
  verifyOtp: async (email: string, otp: string) => {
    const res = await api.post("/identityapi/v1/auth/verify-otp", {
      email,
      otp,
    });
    return res.data;
  },
  resetPassowrd: async (email: string, otp: string, newPassword: string) => {
    const res = await api.post("/identityapi/v1/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return res.data;
  },
};
