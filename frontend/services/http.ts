import axios from "axios";
import { env } from "@/lib/env";
import { tokenStorage } from "@/lib/token-storage";

const missingApiUrlMessage =
  "API URL is not configured. Set NEXT_PUBLIC_API_URL and redeploy the frontend.";

export const http = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && !env.apiUrl) {
    throw new Error(missingApiUrlMessage);
  }

  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      tokenStorage.clear();
      window.dispatchEvent(new Event("ablespace:unauthorized"));
    }

    return Promise.reject(error.response?.data ?? error);
  },
);
