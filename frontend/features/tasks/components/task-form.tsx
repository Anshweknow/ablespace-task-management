"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  taskSchema,
  type TaskFormInput,
} from "@/features/tasks/schemas/task.schemas";
import type { Task } from "@/types/task";
export function TaskForm({
  task,
  onSubmit,
  isSubmitting = false,
}: {
  task?: Task;
  onSubmit: (data: TaskFormInput) => void | Promise<void>;
  isSubmitting?: boolean;
}) {
  const form = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "PENDING",
      priority: task?.priority ?? "MEDIUM",
      dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : "",
      category: task?.category ?? "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Write project proposal" {...field} />
              <FormMessage name="title" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Add useful details" {...field} />
              <FormMessage name="description" />
            </FormItem>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  {...field}
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  {...field}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due date</FormLabel>
                <Input type="date" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Input placeholder="Engineering" {...field} />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Saving..." : "Save task"}
        </Button>
      </form>
    </Form>
  );
}
