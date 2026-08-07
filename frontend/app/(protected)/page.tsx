
"use client";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  Flame,
  ListTodo,
  Plus,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskList } from "@/features/tasks/components/task-list";
import { useTaskStats } from "@/features/tasks/hooks/use-tasks";
export default function DashboardPage() {
  const { data, isLoading, isError } = useTaskStats();
  const cards = [
    ["Total Tasks", data?.total ?? 0, ListTodo],
    ["Completed", data?.completed ?? 0, CheckCircle2],
    ["Pending", data?.pending ?? 0, Timer],
    ["High Priority", data?.highPriority ?? 0, Flame],
    ["Upcoming", data?.upcoming ?? 0, CalendarClock],
  ];
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Plan, prioritize, and track your work.
          </p>
        </div>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="h-4 w-4" />
            Create task
          </Link>
        </Button>
      </div>
      {isError && <ErrorState message="Unable to load dashboard statistics." />}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([title, value, Icon]) => (
          <Card key={String(title)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {title as string}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{value as number}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h2 className="mb-3 text-xl font-semibold">Recent tasks</h2>
        <TaskList
          tasks={data?.recent}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

import { EmptyState } from "@/components/ui/empty-state";
export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Foundation Ready</h1>
        <p className="mt-2 text-muted-foreground">
          Authentication, theming, responsive shell, and service infrastructure
          are ready for Prompt 2.
        </p>
      </div>
      <EmptyState
        title="No dashboard yet"
        description="Task management business features will be implemented in Prompt 2."
      />

    </section>
  );
}
