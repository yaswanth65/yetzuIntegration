// axios.ts

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { getApiBaseUrl } from "@/lib/getApiBaseUrl";

const BASE_URL = getApiBaseUrl();

const decodeJwtPayload = (token?: string): Record<string, any> | null => {
  if (!token || typeof window === "undefined") return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(normalized));
  } catch {
    return null;
  }
};

export const getJwtUserId = (token?: string): string => {
  const payload = decodeJwtPayload(token || Cookies.get("jwtToken"));
  return payload?.userId || payload?.id || payload?.sub || "";
};

const getAccessTokenFromResponse = (data: any): string =>
  data?.userData?.jwtToken ||
  data?.data?.accessToken ||
  data?.data?.access_token ||
  data?.accessToken ||
  data?.access_token ||
  "";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAndSetUserProfile = async () => {
  try {
    const { data } = await authApi.get('/api/identityapi/v1/auth/me');
    const userId = data?.user?.id || data?.data?.user?.id || getJwtUserId();
    if (userId) {
      Cookies.set("userId", userId, { secure: true, sameSite: "strict" });
    }
    return data;
  } catch (error) {
    throw error;
  }
};

authApi.interceptors.request.use(async (config) => {
  const jwtToken = Cookies.get("jwtToken");
  const tokenUserId = getJwtUserId(jwtToken);
  const userId = tokenUserId || Cookies.get("userId");
  
  if (jwtToken && config.headers) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  
  if (userId && config.headers) {
    config.headers["x-user-id"] = userId;
    config.headers.userid = userId;
  }

  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      try {
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await api.post("/api/identityapi/v1/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = getAccessTokenFromResponse(data);
        if (!newAccessToken) throw new Error("No new access token received");

        Cookies.set("jwtToken", newAccessToken, {
          secure: true,
          sameSite: "strict",
        });
        const refreshedUserId = getJwtUserId(newAccessToken);
        if (refreshedUserId) {
          Cookies.set("userId", refreshedUserId, { secure: true, sameSite: "strict" });
        }
        Cookies.set("isUserLoggedIn", "true", { expires: 1 });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch {
        Cookies.remove("jwtToken");
        Cookies.remove("refreshToken");
        Cookies.remove("isUserLoggedIn");
        Cookies.remove("userId");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);
