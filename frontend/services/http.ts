import axios from "axios";
import { env } from "@/lib/env";
import { tokenStorage } from "@/lib/token-storage";
export const http = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
});
http.interceptors.request.use((config) => {
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
