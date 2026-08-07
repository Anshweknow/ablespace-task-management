export type UserRole = "USER" | "GUEST" | "ADMIN";
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
export interface AuthResponse {
  accessToken: string;
  user: User;
}
