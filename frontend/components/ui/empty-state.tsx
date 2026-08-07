import { Inbox } from "lucide-react";
export function EmptyState({
  title = "No data yet",
  description = "Content will appear here when available.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
      <Inbox className="mb-3 h-10 w-10 text-muted-foreground" />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
