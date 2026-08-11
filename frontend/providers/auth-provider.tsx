"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  authApi,
  type LoginPayload,
  type RegisterPayload,
} from "@/services/auth-api";
import { tokenStorage } from "@/lib/token-storage";
import { useToast } from "@/providers/toast-provider";
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
  const { toast } = useToast();
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      router.replace("/login");
    };

    window.addEventListener("ablespace:unauthorized", handleUnauthorized);

    if (!tokenStorage.get()) {
      setLoading(false);
      return () =>
        window.removeEventListener(
          "ablespace:unauthorized",
          handleUnauthorized,
        );
    }

    authApi
      .me()
      .then(setUser)
      .catch(() => tokenStorage.clear())
      .finally(() => setLoading(false));

    return () =>
      window.removeEventListener("ablespace:unauthorized", handleUnauthorized);
  }, [router]);
  const getErrorMessage = (error: unknown, fallback: string) => {
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      return error.message;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "error" in error &&
      typeof error.error === "object" &&
      error.error !== null &&
      "message" in error.error
    ) {
      const message = error.error.message;
      return Array.isArray(message) ? message.join(", ") : String(message);
    }

    return fallback;
  };
  const persist = useCallback(
    (r: { accessToken: string; user: User }) => {
      tokenStorage.set(r.accessToken);
      setUser(r.user);
      router.push("/");
    },
    [router],
  );
  const runAuthAction = useCallback(
    async (
      action: () => Promise<{ accessToken: string; user: User }>,
      fallback: string,
    ) => {
      setLoading(true);
      try {
        persist(await action());
      } catch (error) {
        tokenStorage.clear();
        setUser(null);
        toast({
          title: fallback,
          description: getErrorMessage(error, fallback),
          variant: "destructive",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [persist, toast],
  );
  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: async (p: LoginPayload) =>
        runAuthAction(() => authApi.login(p), "Unable to sign in"),
      register: async (p: RegisterPayload) =>
        runAuthAction(() => authApi.register(p), "Unable to register"),
      guestLogin: async () =>
        runAuthAction(
          () => authApi.guestLogin(),
          "Unable to continue as guest",
        ),
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
    [user, isLoading, router, runAuthAction],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
