"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/services/tasks-api";
import type { Task, TaskQuery } from "@/types/task";
import { useToast } from "@/providers/toast-provider";
export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  list: (q: TaskQuery) => [...taskKeys.lists(), q] as const,
  detail: (id: string) => [...taskKeys.all, "detail", id] as const,
  stats: () => [...taskKeys.all, "stats"] as const,
};
export function useTasks(query: TaskQuery) {
  return useQuery({
    queryKey: taskKeys.list(query),
    queryFn: () => tasksApi.list(query),
  });
}
export function useTask(id: string) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => tasksApi.get(id),
  });
}
export function useTaskStats() {
  return useQuery({ queryKey: taskKeys.stats(), queryFn: tasksApi.stats });
}
export function useTaskMutations() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: taskKeys.all });
  };
  return {
    create: useMutation({
      mutationFn: tasksApi.create,
      onSuccess: () => {
        invalidate();
        toast({ title: "Task created" });
      },
    }),
    update: useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
        tasksApi.update(id, data),
      onSuccess: invalidate,
    }),
    remove: useMutation({
      mutationFn: tasksApi.remove,
      onMutate: async (id) => {
        await qc.cancelQueries({ queryKey: taskKeys.lists() });
        const snapshots = qc.getQueriesData<Task[]>({
          queryKey: taskKeys.lists(),
        });
        snapshots.forEach(
          ([key, data]) =>
            data &&
            qc.setQueryData(
              key,
              data.filter((task) => task.id !== id),
            ),
        );
        return { snapshots };
      },
      onError: (_e, _id, ctx) =>
        ctx?.snapshots.forEach(([key, data]) => qc.setQueryData(key, data)),
      onSettled: () => {
        invalidate();
        toast({ title: "Task deleted" });
      },
    }),
    complete: useMutation({
      mutationFn: tasksApi.complete,
      onSuccess: () => {
        invalidate();
        toast({ title: "Task completed" });
      },
    }),
    pending: useMutation({
      mutationFn: tasksApi.pending,
      onSuccess: () => {
        invalidate();
        toast({ title: "Task marked pending" });
      },
    }),
    duplicate: useMutation({
      mutationFn: tasksApi.duplicate,
      onSuccess: () => {
        invalidate();
        toast({ title: "Task duplicated" });
      },
    }),
  };
}
