export function AboutSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 animate-pulse"
      aria-busy="true"
      aria-label="Loading experiences"
    >
      <div className="h-28 rounded-xl bg-surface/60 shadow-[3px_3px_0px_var(--color-on-surface)]" />
      <div className="h-28 rounded-xl bg-surface/60 shadow-[3px_3px_0px_var(--color-on-surface)]" />
    </div>
  );
}
