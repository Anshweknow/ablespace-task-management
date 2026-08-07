"use client";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToastProvider>
          <AuthProvider>
            {children}
            <ToastViewport />
          </AuthProvider>
        </ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
