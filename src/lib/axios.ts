import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Public Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2️⃣ Authenticated Axios instance
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request interceptor to attach access token
authApi.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const token = accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const user = localStorage.getItem("user") || null;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        if (!refreshToken) throw new Error("No refresh token available");

        // Refresh the access token
        const { data } = await api.post("/identityapi/v1/auth/refresh", {
          refreshToken,
        });

        // Save new token to session (you can also update next-auth session here)
        const newAccessToken = data?.accessToken;
        if (!newAccessToken) throw new Error("No new token received");

        // Update the Authorization header and retry the request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return authApi(originalRequest);
      } catch (err) {
        console.error("Token refresh failed, redirecting to login", err);
        if (user) {
          const res = await authApi.post("/api/signout", {
            userId: JSON.parse(user).user_id,
          });
          if (res.status === 200) {
            toast.success("Logged out successfully!");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("refreshToken");
          } else {
            toast.error("Logout failed!");
          }
        }
        toast.error("Session expired. Please log in again.");
      }
    }

    return Promise.reject(error);
  }
);
