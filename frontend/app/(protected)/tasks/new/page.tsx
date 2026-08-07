"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from "@/features/tasks/components/task-form";
import { useTaskMutations } from "@/features/tasks/hooks/use-tasks";
import type { TaskFormInput } from "@/features/tasks/schemas/task.schemas";
export default function NewTaskPage() {
  const router = useRouter();
  const { create } = useTaskMutations();
  async function submit(data: TaskFormInput) {
    await create.mutateAsync(data);
    router.push("/tasks");
  }
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm onSubmit={submit} isSubmitting={create.isPending} />
      </CardContent>
    </Card>
  );
}
