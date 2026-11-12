"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n";

const LANGUAGES = [
  { code: "pt-BR", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English (US)", flag: "🇺🇸" },
] as const;

function setLocaleCookie(next: Locale) {
  document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
  window.location.reload();
}

export function LanguageSwitcher({
  locale,
  label,
}: {
  readonly locale: Locale;
  readonly label: string;
  readonly options?: unknown;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleSelect(nextLocale: Locale) {
    if (nextLocale !== locale) {
      setLocaleCookie(nextLocale);
    }
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        id="lang-switch-btn"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className="inline-flex items-center gap-1.5 rounded-xl border border-outline/30 bg-surface px-3 py-1.5 font-label-sm text-label-sm font-bold text-on-surface shadow-[2px_2px_0px_#1b1b1c] transition-all hover:bg-surface-variant hover:shadow-[3px_3px_0px_#1b1b1c] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#1b1b1c]"
      >
        <span aria-hidden="true" className="material-icons-outlined text-base text-primary">
          translate
        </span>
        <span>{locale === "pt-BR" ? "PT-BR" : "EN"}</span>
        <span
          aria-hidden="true"
          className={`material-icons-outlined text-sm text-on-surface-variant transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute right-0 z-50 mt-2 flex w-48 flex-col gap-1 rounded-xl border-2 border-on-surface bg-surface p-1.5 shadow-[4px_4px_0px_#1b1b1c]"
        >
          <div className="border-b border-outline-variant/40 px-2.5 pb-1.5 pt-1 font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">
            Idioma / Language
          </div>

          {LANGUAGES.map((item) => {
            const isSelected = item.code === locale;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 font-label-sm text-label-sm transition-all ${
                  isSelected
                    ? "bg-primary font-bold text-on-primary shadow-[1px_1px_0px_#1b1b1c]"
                    : "bg-surface text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">{item.flag}</span>
                  <span>{item.name}</span>
                </div>
                {isSelected && (
                  <span aria-hidden="true" className="material-icons-outlined text-sm font-bold">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
