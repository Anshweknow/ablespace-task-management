"use client";

import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { AppToastProvider } from "@/providers/toast-provider";

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
