import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";
export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-4">
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link className="text-primary" href="/register">
          Register
        </Link>
      </p>
    </div>
  );
}
