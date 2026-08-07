import { http } from "@/services/http";
import type { Task, TaskQuery, TaskStats } from "@/types/task";

const clean = (query?: TaskQuery) =>
  Object.fromEntries(
    Object.entries(query ?? {}).filter(([, v]) => v && v !== "ALL"),
  );
const payload = (data: Partial<Task>) =>
  Object.fromEntries(Object.entries(data).filter(([, value]) => value !== ""));

export const tasksApi = {
  list: async (query?: TaskQuery) =>
    (await http.get<Task[]>("/tasks", { params: clean(query) })).data,
  stats: async () => (await http.get<TaskStats>("/tasks/stats")).data,
  get: async (id: string) => (await http.get<Task>(`/tasks/${id}`)).data,
  create: async (data: Partial<Task>) =>
    (await http.post<Task>("/tasks", payload(data))).data,
  update: async (id: string, data: Partial<Task>) =>
    (await http.patch<Task>(`/tasks/${id}`, payload(data))).data,
  remove: async (id: string) => (await http.delete(`/tasks/${id}`)).data,
  complete: async (id: string) =>
    (await http.patch<Task>(`/tasks/${id}/complete`)).data,
  pending: async (id: string) =>
    (await http.patch<Task>(`/tasks/${id}/pending`)).data,
  duplicate: async (id: string) =>
    (await http.post<Task>(`/tasks/${id}/duplicate`)).data,
};
