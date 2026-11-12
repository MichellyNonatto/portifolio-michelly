import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "low" | "high" | "highest" | "secondary" | "tertiary" | "surface";
  hoverable?: boolean;
}

export function Card({
  children,
  variant = "low",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const variantClasses = {
    low: "bg-surface-container-low",
    high: "bg-surface-container-high",
    highest: "bg-surface-container-highest",
    secondary: "bg-secondary-container text-on-secondary-container",
    tertiary: "bg-tertiary-fixed text-on-tertiary-fixed",
    surface: "bg-surface",
  };

  const hoverClasses = hoverable
    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-[3px_3px_0px_#1b1b1c]"
    : "";

  return (
    <div
      className={`rounded-[24px] border border-outline/30 shadow-[2px_2px_0px_#1b1b1c] ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
