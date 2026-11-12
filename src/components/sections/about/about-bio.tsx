import { Card } from "@/components/ui/card";
import type { ShowcaseCertification } from "@/features/showcase/models/showcase.model";

interface AboutBioProps {
  readonly title: string;
  readonly summary: string;
  readonly coursesTitle: string;
  readonly coursesDescription: string;
  readonly professionalCertifications?: readonly ShowcaseCertification[];
  readonly className?: string;
}

export function AboutBio({
  title,
  summary,
  coursesTitle,
  coursesDescription,
  professionalCertifications = [],
  className = "",
}: AboutBioProps) {
  return (
    <Card variant="low" className={`flex flex-col gap-6 p-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-[2px_2px_0px_#1b1b1c]">
          <span aria-hidden="true" className="material-icons-outlined text-2xl">
            person
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">
          {title}
        </h3>
      </div>

      <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
        {summary}
      </p>

      <div className="flex flex-col gap-3 pt-2 border-t border-outline-variant/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="material-icons-outlined text-xl text-primary"
            >
              menu_book
            </span>
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">
              {coursesTitle}
            </span>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {coursesDescription}
        </p>

        {professionalCertifications.length > 0 && (
          <div className="flex flex-col gap-2 pt-1">
            {professionalCertifications.map((certification) => (
              <div
                key={certification.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-outline/30 bg-surface-container p-3 shadow-[2px_2px_0px_#1b1b1c]"
              >
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">
                    {certification.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {certification.issuer}
                  </span>
                </div>
                <span className="rounded-full bg-secondary-fixed px-2.5 py-0.5 font-label-sm text-label-sm font-bold text-on-secondary-fixed">
                  {new Date(certification.issueDate).getUTCFullYear()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
