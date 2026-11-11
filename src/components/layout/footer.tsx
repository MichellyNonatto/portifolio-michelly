
import Link from "next/link";
import { en } from "@/i18n/en";

export function Footer() {
  return (
    <footer className="relative mt-space-xl w-full bg-surface-container-low py-space-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-space-md px-margin-mobile lg:flex-row lg:px-margin">

        <div className="flex min-w-0 items-center justify-center gap-space-sm animate-fade-right animate-delay-100 animate-duration-[300ms] motion-reduce:animate-none">
          <Link
            href="/"
            className="flex min-w-0 flex-col justify-center leading-none text-on-surface"
          >
            <span className="truncate text-base font-semibold tracking-[-0.03em] sm:text-lg">
              {en.header.brand.name}
            </span>

            <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[-0.01em] text-primary">
              {en.header.brand.role}
            </span>
          </Link>
        </div>

        <p className="min-w-0 max-w-2xl text-center font-body-sm text-body-sm text-on-surface-variant lg:text-left">
          {en.header.brand.description}
        </p>

        <nav
          aria-label="Footer navigation"
          className="flex shrink-0 items-center justify-center gap-space-md"
        >
          <a
            href="#"
            className="flex min-h-12 items-center gap-1 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary motion-reduce:animate-none animate-fade-down animate-duration-[250ms]"
          >
            {en.header.brand.returnToTop}

            <span
              aria-hidden="true"
              className="material-icons-outlined text-xs"
            >
              arrow_upward
            </span>
          </a>
        </nav>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
      >
        <div className="h-full w-[35%] animate-header-border-sweep bg-gradient-to-r from-surface to-primary motion-reduce:animate-none motion-reduce:translate-x-0" />
      </div>
    </footer>
  );
}
