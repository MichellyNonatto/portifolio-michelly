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
    low: "bg-surface-container-low shadow-[6px_6px_0px_var(--color-on-surface)]",
    high: "bg-surface-container-high shadow-[6px_6px_0px_var(--color-on-surface)]",
    highest: "bg-surface-container-highest shadow-[3px_3px_0px_var(--color-on-surface)]",
    secondary: "bg-secondary-container text-on-secondary-container shadow-[6px_6px_0px_var(--color-on-surface)]",
    tertiary: "bg-tertiary-fixed text-on-tertiary-fixed shadow-[6px_6px_0px_var(--color-on-surface)]",
    surface: "bg-surface shadow-[3px_3px_0px_var(--color-on-surface)]",
  };

  const hoverClasses = hoverable ? "hover:-translate-y-1 transition-all duration-200" : "";

  return (
    <div
      className={`rounded-[24px] ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
