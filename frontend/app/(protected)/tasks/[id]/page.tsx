"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PriorityBadge,
  StatusBadge,
} from "@/features/tasks/components/task-badges";
import { useTask, useTaskMutations } from "@/features/tasks/hooks/use-tasks";
function fmt(v?: string | null) {
  return v
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date(v))
    : "Not set";
}
export default function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useTask(id);
  const m = useTaskMutations();
  if (isLoading) return <Skeleton className="h-96" />;
  if (isError || !data) return <ErrorState message="Task not found." />;
  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-3xl">{data.title}</CardTitle>
          <div className="mt-3 flex gap-2">
            <StatusBadge status={data.status} />
            <PriorityBadge priority={data.priority} />
          </div>
        </div>
        <Button asChild>
          <Link href={`/tasks/${id}/edit`}>Edit</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="whitespace-pre-wrap text-muted-foreground">
          {data.description || "No description provided."}
        </p>
        <dl className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Due date</dt>
            <dd>{fmt(data.dueDate)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Category</dt>
            <dd>{data.category || "Uncategorized"}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Created</dt>
            <dd>{fmt(data.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Updated</dt>
            <dd>{fmt(data.updatedAt)}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              data.status === "COMPLETED"
                ? m.pending.mutate(data.id)
                : m.complete.mutate(data.id)
            }
          >
            {data.status === "COMPLETED" ? "Mark pending" : "Mark complete"}
          </Button>
          <Button variant="outline" onClick={() => m.duplicate.mutate(data.id)}>
            Duplicate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
