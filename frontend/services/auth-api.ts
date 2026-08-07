import { http } from "@/services/http";
import type { AuthResponse, User } from "@/types/auth";
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export const authApi = {
  register: async (data: RegisterPayload) =>
    (await http.post<AuthResponse>("/auth/register", data)).data,
  login: async (data: LoginPayload) =>
    (await http.post<AuthResponse>("/auth/login", data)).data,
  guestLogin: async () => (await http.post<AuthResponse>("/auth/guest")).data,
  me: async () => (await http.get<User>("/auth/me")).data,
  logout: async () => {
    await http.post("/auth/logout");
  },
};
