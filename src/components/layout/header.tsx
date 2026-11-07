import Link from "next/link";
import { en } from "@/i18n/en";

function NavigationLinks() {
  return (
    <>
      {en.header.navigation.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`flex min-h-12 items-center rounded-full px-4 py-2 text-xs font-medium text-on-surface transition-[background-color,color] duration-150 ease-material hover:text-primary motion-reduce:animate-none animate-fade-down animate-duration-[250ms]`}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-10 animate-fade-down animate-duration-[350ms] bg-surface shadow-xl motion-reduce:animate-none">
      <div className="mx-auto flex min-h-14 min-w-0 max-w-7xl items-center gap-3 px-4 sm:px-6 md:min-h-16 lg:px-12">
        <div className="min-w-0 shrink animate-fade-right animate-delay-100 animate-duration-[300ms] motion-reduce:animate-none">
          <Link
            href="/"
            className="flex min-h-12 min-w-0 w-fit flex-col justify-center leading-none text-on-surface"
          >
            <span className="truncate text-base font-semibold tracking-[-0.03em] sm:text-lg">
              {en.header.brand.name}
            </span>
            <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[-0.01em] text-primary">
              {en.header.brand.role}
            </span>
          </Link>
        </div>

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-1 md:flex lg:gap-2"
        >
          <NavigationLinks />
        </nav>

        <details className="group relative ml-auto md:hidden">
          <summary
            className="flex min-h-12 min-w-12 cursor-pointer list-none items-center justify-center rounded-full text-on-surface transition-colors duration-150 ease-material hover:bg-surface-container-low active:bg-outline [&::-webkit-details-marker]:hidden"
          >
            <span
              aria-hidden="true"
              className="material-icons-outlined text-2xl group-open:hidden"
            >
              menu
            </span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-full z-10 flex w-max min-w-52 max-w-[calc(100vw-2rem)] animate-fade-down animate-duration-150 flex-col gap-1 rounded-2xl border border-outline bg-surface p-2 shadow-lg motion-reduce:animate-none"
          >
            <NavigationLinks />
          </nav>
        </details>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
      >
        <div                 className="h-full w-[35%] animate-header-border-sweep bg-gradient-to-r from-surface to-primary motion-reduce:animate-none motion-reduce:translate-x-0" />
      </div>
    </header>
  );
}
