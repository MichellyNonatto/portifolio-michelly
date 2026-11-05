import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "surface" | "primary-fixed" | "secondary-fixed";
  size?: "sm" | "md";
  className?: string;
  icon?: string;
}

export function Badge({
  children,
  variant = "surface",
  size = "sm",
  className = "",
  icon,
}: BadgeProps) {
  const sizeClasses = {
    sm: "font-display text-xs px-2.5 py-1",
    md: "font-display text-sm px-3 py-1.5",
  };

  const variantClasses = {
    primary: "bg-primary text-on-primary font-bold shadow-[2px_2px_0px_var(--color-on-surface)]",
    secondary: "bg-secondary-container text-on-secondary-container font-bold shadow-[2px_2px_0px_var(--color-on-surface)]",
    tertiary: "bg-tertiary-fixed text-on-tertiary-fixed font-bold shadow-[2px_2px_0px_var(--color-on-surface)]",
    "primary-fixed": "bg-primary-fixed text-on-primary-fixed font-bold uppercase tracking-wider",
    "secondary-fixed": "bg-secondary-fixed text-on-secondary-fixed font-bold uppercase tracking-wider",
    surface: "bg-surface text-on-surface shadow-[2px_2px_0px_var(--color-on-surface)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && (
        <span aria-hidden="true" className="material-icons-outlined text-sm">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
