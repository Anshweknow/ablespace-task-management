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
