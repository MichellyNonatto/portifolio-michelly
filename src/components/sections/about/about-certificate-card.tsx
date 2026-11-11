import type { ShowcaseCertification } from "@/features/showcase/models/showcase.model";

interface AboutCertificateCardProps {
  readonly certificate: ShowcaseCertification;
  readonly credentialLabel: string;
}

export function AboutCertificateCard({
  certificate,
  credentialLabel,
}: AboutCertificateCardProps) {
  const year = new Date(certificate.issueDate).getUTCFullYear();

  return (
    <article className="group flex gap-3 rounded-2xl bg-secondary-container p-4 text-on-secondary-container shadow-[4px_4px_0px_var(--color-on-surface)] transition-all hover:-translate-y-0.5 sm:gap-4 sm:p-5">
      <div
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-xl bg-surface-container-lowest text-on-surface-variant sm:h-12 sm:w-12"
      >
        <span className="material-icons-outlined text-xl sm:text-2xl">school</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="min-w-0">
            <h4 className="font-headline-sm text-headline-sm font-bold leading-tight text-on-secondary-container">
              {certificate.title}
            </h4>
            <p className="mt-1 font-body-sm text-body-sm text-on-secondary-fixed-variant">
              {certificate.issuer}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full bg-surface-container-lowest px-3 py-1 font-label-sm text-label-sm font-bold text-on-surface shadow-[2px_2px_0px_var(--color-on-surface)]"
          >
            {year}
          </span>
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-label-sm text-label-sm font-bold text-on-primary transition-colors hover:bg-primary-container"
            >
              <span>{credentialLabel}</span>
              <span aria-hidden="true" className="material-icons-outlined text-sm">
                link
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
