// axios.ts

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { getApiBaseUrl } from "@/lib/getApiBaseUrl";

const BASE_URL = getApiBaseUrl();

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
    if (data?.user?.id) {
      Cookies.set("userId", data.user.id, { secure: true, sameSite: "strict" });
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw error;
  }
};

authApi.interceptors.request.use(async (config) => {
  const jwtToken = Cookies.get("jwtToken");
  const userId = Cookies.get("userId");

  if (jwtToken && config.headers) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  
  // if (userId && config.headers) {
  //   config.headers['x-user-id'] = userId;
  // }

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

        const newAccessToken = data?.data?.access_token;
        if (!newAccessToken) throw new Error("No new access token received");

        Cookies.set("jwtToken", newAccessToken, {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("isUserLoggedIn", "true", { expires: 1 });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch (err) {
        console.error("Token refresh failed → redirecting to login", err);

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