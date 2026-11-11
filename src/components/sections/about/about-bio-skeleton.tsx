import { Card } from "@/components/ui/card";

export function AboutBioSkeleton() {
  return (
    <Card
      variant="low"
      className="flex flex-col gap-6 p-8 animate-pulse lg:col-span-5"
      aria-busy="true"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-surface-container" />
        <div className="h-6 w-32 rounded bg-surface-container" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-surface-container" />
        <div className="h-4 w-4/5 rounded bg-surface-container" />
        <div className="h-4 w-3/5 rounded bg-surface-container" />
      </div>
      <div className="flex flex-col gap-3 border-t border-outline-variant/40 pt-5">
        <div className="h-5 w-40 rounded bg-surface-container" />
        <div className="h-4 w-full rounded bg-surface-container" />
        <div className="h-14 w-full rounded-xl bg-surface-container" />
        <div className="h-14 w-full rounded-xl bg-surface-container" />
      </div>
    </Card>
  );
}
