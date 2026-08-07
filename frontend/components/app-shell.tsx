"use client";
import Link from "next/link";
import { Menu, PanelLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/features/theme/theme-switcher";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
function Sidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-72 border-r bg-background p-4 transition-transform md:static md:translate-x-0`}
    >
      <Link href="/" className="flex items-center gap-2 font-bold">
        <ShieldCheck className="h-6 w-6 text-primary" />
        AbleSpace
      </Link>
      <nav className="mt-8 space-y-2 text-sm">
        <div className="rounded-md bg-muted px-3 py-2 font-medium">
          Workspace
        </div>
        <div className="px-3 py-2 text-muted-foreground">
          Task features arrive in Prompt 2.
        </div>
      </nav>
    </aside>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen md:grid md:grid-cols-[18rem_1fr]">
      <Sidebar open={open} />
      {open && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <PanelLeft className="hidden h-5 w-5 text-muted-foreground md:block" />
            <span className="font-semibold">Task Management</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            {user ? (
              <>
                <Avatar>
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
