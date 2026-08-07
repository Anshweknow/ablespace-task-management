export type TaskStatus = "PENDING" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  category?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
export interface TaskQuery {
  search?: string;
  status?: TaskStatus | "ALL";
  priority?: TaskPriority | "ALL";
  sortBy?: "dueDate" | "createdAt";
  sortOrder?: "asc" | "desc";
}
export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  upcoming: number;
  recent: Task[];
}
