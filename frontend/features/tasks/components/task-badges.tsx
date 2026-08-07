import { Badge } from "@/components/ui/badge";
import type { TaskPriority, TaskStatus } from "@/types/task";
export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge
      className={
        status === "COMPLETED"
          ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300"
          : "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }
    >
      {status === "COMPLETED" ? "Completed" : "Pending"}
    </Badge>
  );
}
export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const cls = {
    HIGH: "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300",
    MEDIUM: "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    LOW: "border-slate-500 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  }[priority];
  return (
    <Badge className={cls}>
      {priority[0] + priority.slice(1).toLowerCase()}
    </Badge>
  );
}
