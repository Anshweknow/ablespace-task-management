import { ThemeSwitcher } from "@/features/theme/theme-switcher";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute right-4 top-4">
        <ThemeSwitcher />
      </div>
      {children}
    </main>
  );
}
