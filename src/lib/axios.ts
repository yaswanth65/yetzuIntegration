import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 🔹 Public Axios instance (no auth)
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Authenticated Axios instance
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(async (config) => {
  const jwtToken = Cookies.get("jwtToken");

  if (jwtToken && config.headers) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
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

        const { data } = await api.post("/identityapi/v1/auth/refresh", {
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

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);
