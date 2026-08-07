"use client";
import Link from "next/link";
import { Copy, Eye, Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { PriorityBadge, StatusBadge } from "./task-badges";
import { TaskForm } from "./task-form";
import { useTaskMutations } from "../hooks/use-tasks";
import type { TaskFormInput } from "@/features/tasks/schemas/task.schemas";
import type { Task } from "@/types/task";
function fmt(value?: string | null) {
  return value
    ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
        new Date(value),
      )
    : "No due date";
}
export function TaskList({
  tasks,
  isLoading,
  isError,
}: {
  tasks?: Task[];
  isLoading: boolean;
  isError: boolean;
}) {
  const m = useTaskMutations();
  const editTask = (task: Task) => async (data: TaskFormInput) => {
    await m.update.mutateAsync({ id: task.id, data });
  };
  if (isLoading)
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  if (isError) return <ErrorState message="Unable to load tasks." />;
  if (!tasks?.length)
    return (
      <EmptyState
        title="No tasks found"
        description="Create a task or adjust the current filters."
      />
    );
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{task.title}</h3>
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {task.description || "No description"}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>Due: {fmt(task.dueDate)}</span>
                <span>Created: {fmt(task.createdAt)}</span>
                {task.category && <span>Category: {task.category}</span>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  task.status === "COMPLETED"
                    ? m.pending.mutate(task.id)
                    : m.complete.mutate(task.id)
                }
              >
                {task.status === "COMPLETED" ? (
                  <Circle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/tasks/${task.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" aria-label="Edit task">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                  </DialogHeader>
                  <TaskForm
                    task={task}
                    onSubmit={editTask(task)}
                    isSubmitting={m.update.isPending}
                  />
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                variant="outline"
                onClick={() => m.duplicate.mutate(task.id)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete task?</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone.
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => m.remove.mutate(task.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
