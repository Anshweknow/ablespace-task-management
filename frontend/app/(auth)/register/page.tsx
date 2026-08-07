import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";
export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-4">
      <RegisterForm />
      <p className="text-center text-sm text-muted-foreground">
        Have an account?{" "}
        <Link className="text-primary" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
