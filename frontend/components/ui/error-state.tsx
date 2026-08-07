import { AlertTriangle } from "lucide-react";
export function ErrorState({
  message = "Something went wrong.",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-destructive">
      <AlertTriangle className="h-5 w-5" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
