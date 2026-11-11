import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "surface";
  children: React.ReactNode;
  icon?: string;
  asAnchor?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

export function Button({
  variant = "primary",
  children,
  icon,
  asAnchor = false,
  href,
  target,
  rel,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-display text-label-md transition-all disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses = {
    primary:
      "bg-primary text-on-primary shadow-[4px_4px_0px_var(--color-on-surface)] hover:shadow-[6px_6px_0px_var(--color-on-surface)] hover:-translate-y-0.5 active:shadow-[0px_0px_0px_var(--color-on-surface)] active:translate-x-1 active:translate-y-1",
    secondary:
      "bg-surface-container text-on-surface shadow-[4px_4px_0px_var(--color-on-surface)] hover:bg-primary-fixed hover:text-on-primary-fixed hover:shadow-[6px_6px_0px_var(--color-on-surface)] hover:-translate-y-0.5 active:shadow-[0px_0px_0px_var(--color-on-surface)] active:translate-x-1 active:translate-y-1",
    surface:
      "bg-surface text-on-surface shadow-[3px_3px_0px_var(--color-on-surface)] hover:bg-surface-variant hover:shadow-[4px_4px_0px_var(--color-on-surface)] transition-all",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (asAnchor && href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        <span>{children}</span>
        {icon && (
          <span aria-hidden="true" className="material-icons-outlined text-lg">
            {icon}
          </span>
        )}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span>{children}</span>
      {icon && (
        <span aria-hidden="true" className="material-icons-outlined text-lg">
          {icon}
        </span>
      )}
    </button>
  );
}
