interface StatItem {
  value: string;
  label: string;
  variant: "surface" | "secondary" | "tertiary";
}

interface ProfileStatsProps {
  stats: readonly StatItem[];
  className?: string;
}

export function ProfileStats({ stats, className = "" }: ProfileStatsProps) {
  const variantStyles = {
    surface: "bg-surface-container-low text-on-surface",
    secondary: "bg-secondary-container text-on-secondary-container",
    tertiary: "bg-tertiary-fixed text-on-tertiary-fixed",
  };

  const labelStyles = {
    surface: "text-on-surface-variant",
    secondary: "text-on-secondary-fixed-variant",
    tertiary: "text-on-tertiary-fixed-variant",
  };

  const valueStyles = {
    surface: "text-primary",
    secondary: "text-on-secondary-fixed",
    tertiary: "text-primary",
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 w-full ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col p-4 rounded-xl border border-outline/30 shadow-[2px_2px_0px_#1b1b1c] ${variantStyles[stat.variant]}`}
        >
          <span
            className={`font-display text-3xl sm:text-4xl font-bold leading-none ${valueStyles[stat.variant]}`}
          >
            {stat.value}
          </span>
          <span
            className={`font-display text-xs mt-1.5 uppercase font-semibold tracking-wide ${labelStyles[stat.variant]}`}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
