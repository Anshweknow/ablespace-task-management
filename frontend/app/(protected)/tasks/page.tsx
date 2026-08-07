"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "@/features/tasks/components/task-form";
import { TaskFilters } from "@/features/tasks/components/task-filters";
import { TaskList } from "@/features/tasks/components/task-list";
import { useTaskMutations, useTasks } from "@/features/tasks/hooks/use-tasks";
import type { TaskFormInput } from "@/features/tasks/schemas/task.schemas";
import type { TaskQuery } from "@/types/task";
export default function TasksPage() {
  const [query, setQuery] = useState<TaskQuery>({
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const { data, isLoading, isError } = useTasks(query);
  const { create } = useTaskMutations();
  async function createTask(form: TaskFormInput) {
    await create.mutateAsync(form);
  }
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Search, filter, sort, and manage your tasks.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Create task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create task</DialogTitle>
            </DialogHeader>
            <TaskForm onSubmit={createTask} isSubmitting={create.isPending} />
          </DialogContent>
        </Dialog>
      </div>
      <TaskFilters query={query} setQuery={setQuery} />
      <TaskList tasks={data} isLoading={isLoading} isError={isError} />
    </section>
  );
}
