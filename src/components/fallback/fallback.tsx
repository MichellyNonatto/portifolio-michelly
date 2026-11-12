import { Button } from "@/components/ui/button";

interface FallbackProps {
  readonly title: string;
  readonly description: string;
  readonly downloadResumeText: string;
  readonly viewGithubText: string;
  readonly contactText: string;
  readonly githubHref: string;
  readonly contactHref: string;
  readonly className?: string;
}

export function Fallback({
  title,
  description,
  downloadResumeText,
  viewGithubText,
  contactText,
  githubHref,
  contactHref,
  className = "",
}: FallbackProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col gap-5 rounded-2xl border border-dashed border-outline/40 bg-surface-container-low p-6 text-on-surface shadow-[2px_2px_0px_#1b1b1c] ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error text-on-error shadow-[2px_2px_0px_#1b1b1c]">
          <span aria-hidden="true" className="material-icons-outlined text-2xl">
            cloud_off
          </span>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {title}
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          asAnchor
          href="/curriculum.pdf"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          icon="description"
        >
          {downloadResumeText}
        </Button>
        {githubHref && <Button
          asAnchor
          href={githubHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          icon="open_in_new"
        >
          {viewGithubText}
        </Button>}
        {contactHref && <Button
          asAnchor
          href={`mailto:${contactHref}`}
          variant="surface"
          icon="mail"
        >
          {contactText}
        </Button>}
      </div>
    </div>
  );
}
