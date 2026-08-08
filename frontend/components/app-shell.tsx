"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ListTodo,
  Menu,
  PanelLeft,
  Settings,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/features/theme/theme-switcher";
import { useAuth } from "@/providers/auth-provider";

const navItems: {
  href: string;
  label: string;
  Icon: LucideIcon;
}[] = [
  { href: "/", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", Icon: ListTodo },
  { href: "/profile", label: "Profile", Icon: User },
  { href: "/settings", label: "Settings", Icon: Settings },
];

function Sidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-72 border-r bg-background p-4 transition-transform md:static md:translate-x-0`}
    >
      <div className="flex h-full flex-col">
        <div className="mb-6 flex items-center gap-2 px-3">
          <ShieldCheck className="h-6 w-6" />
          <span className="text-lg font-semibold">AbleSpace</span>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <div className="rounded-md bg-muted px-3 py-2 font-medium">
            Workspace
          </div>
        </nav>
      </div>
    </aside>
  );
}

export function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {open && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <div className="flex min-h-screen">
        <Sidebar open={open} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2">
                <PanelLeft className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Task Management</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />

              {user ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
