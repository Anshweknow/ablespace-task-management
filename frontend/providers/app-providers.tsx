"use client";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import { AppToastProvider } from "@/providers/toast-provider";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppToastProvider>
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
