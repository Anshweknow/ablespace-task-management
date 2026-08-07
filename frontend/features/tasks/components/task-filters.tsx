"use client";
import { Input } from "@/components/ui/input";
import type { TaskQuery } from "@/types/task";
export function TaskFilters({
  query,
  setQuery,
}: {
  query: TaskQuery;
  setQuery: (q: TaskQuery) => void;
}) {
  return (
    <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_repeat(4,auto)]">
      <Input
        aria-label="Search tasks"
        placeholder="Search title, description, category"
        value={query.search ?? ""}
        onChange={(e) => setQuery({ ...query, search: e.target.value })}
      />
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={query.status ?? "ALL"}
        onChange={(e) =>
          setQuery({ ...query, status: e.target.value as TaskQuery["status"] })
        }
      >
        <option value="ALL">All status</option>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={query.priority ?? "ALL"}
        onChange={(e) =>
          setQuery({
            ...query,
            priority: e.target.value as TaskQuery["priority"],
          })
        }
      >
        <option value="ALL">All priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={query.sortBy ?? "createdAt"}
        onChange={(e) =>
          setQuery({ ...query, sortBy: e.target.value as TaskQuery["sortBy"] })
        }
      >
        <option value="createdAt">Created date</option>
        <option value="dueDate">Due date</option>
      </select>
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={query.sortOrder ?? "desc"}
        onChange={(e) =>
          setQuery({
            ...query,
            sortOrder: e.target.value as TaskQuery["sortOrder"],
          })
        }
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
