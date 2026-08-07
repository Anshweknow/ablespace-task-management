"use client";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskForm } from "@/features/tasks/components/task-form";
import { useTask, useTaskMutations } from "@/features/tasks/hooks/use-tasks";
import type { TaskFormInput } from "@/features/tasks/schemas/task.schemas";
export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, isError } = useTask(id);
  const { update } = useTaskMutations();
  async function submit(form: TaskFormInput) {
    await update.mutateAsync({ id, data: form });
    router.push(`/tasks/${id}`);
  }
  if (isLoading) return <Skeleton className="h-96" />;
  if (isError || !data) return <ErrorState message="Task not found." />;
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Edit Task</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm
          task={data}
          onSubmit={submit}
          isSubmitting={update.isPending}
        />
      </CardContent>
    </Card>
  );
}
