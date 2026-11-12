export function AboutSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 animate-pulse"
      aria-busy="true"
      aria-label="Loading experiences"
    >
      <div className="h-28 rounded-xl border border-outline/30 bg-surface/60 shadow-[2px_2px_0px_#1b1b1c]" />
      <div className="h-28 rounded-xl border border-outline/30 bg-surface/60 shadow-[2px_2px_0px_#1b1b1c]" />
    </div>
  );
}
