import type { ShowcaseExperience } from "@/features/showcase/models/showcase.model";

interface AboutExperienceCardProps {
  readonly experience: ShowcaseExperience;
  readonly index: number;
  readonly currentLabel?: string;
}

const BADGE_VARIANTS = [
  "bg-primary text-on-primary",
  "bg-secondary text-on-secondary",
  "bg-tertiary text-on-tertiary",
] as const;

function formatExperiencePeriod(
  startDateStr: string,
  endDateStr: string | null,
  isCurrent: boolean,
  currentLabel: string
): string {
  const startYear = new Date(startDateStr).getUTCFullYear();
  if (isCurrent || !endDateStr) {
    return `${startYear} — ${currentLabel}`;
  }
  const endYear = new Date(endDateStr).getUTCFullYear();
  return startYear === endYear ? `${startYear}` : `${startYear} — ${endYear}`;
}

export function AboutExperienceCard({
  experience,
  index,
  currentLabel = "Present",
}: AboutExperienceCardProps) {
  const badgeClass = BADGE_VARIANTS[index % BADGE_VARIANTS.length];
  const period = formatExperiencePeriod(
    experience.startDate,
    experience.endDate,
    experience.isCurrent,
    currentLabel
  );

  return (
    <article className="flex flex-col gap-2 rounded-xl bg-surface p-5 text-on-surface shadow-[3px_3px_0px_var(--color-on-surface)] transition-all hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 font-label-sm text-label-sm font-bold ${badgeClass}`}
          >
            {period}
          </span>
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {experience.title}
          </h4>
        </div>
        <div className="flex items-center gap-2 font-label-sm text-label-sm font-medium text-on-surface-variant">
          <span>{experience.company}</span>
          {experience.location && (
            <span className="text-outline">· {experience.location}</span>
          )}
        </div>
      </div>

      {experience.description && (
        <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
          {experience.description}
        </p>
      )}
    </article>
  );
}
