import { cn } from "@/lib/utils";
export function Alert({
  className,
  ...p
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={cn("rounded-lg border p-4 text-sm", className)}
      {...p}
    />
  );
}
