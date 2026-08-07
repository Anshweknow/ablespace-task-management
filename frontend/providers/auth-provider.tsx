"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  authApi,
  type LoginPayload,
  type RegisterPayload,
} from "@/services/auth-api";
import { tokenStorage } from "@/lib/token-storage";
import type { User } from "@/types/auth";
interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (p: LoginPayload) => Promise<void>;
  register: (p: RegisterPayload) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!tokenStorage.get()) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then(setUser)
      .catch(() => tokenStorage.clear())
      .finally(() => setLoading(false));
  }, []);
  const persist = (r: { accessToken: string; user: User }) => {
    tokenStorage.set(r.accessToken);
    setUser(r.user);
    router.push("/");
  };
  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: async (p: LoginPayload) => persist(await authApi.login(p)),
      register: async (p: RegisterPayload) =>
        persist(await authApi.register(p)),
      guestLogin: async () => persist(await authApi.guestLogin()),
      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          tokenStorage.clear();
          setUser(null);
          router.push("/login");
        }
      },
    }),
    [user, isLoading, router],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
