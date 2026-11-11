import { Button } from "@/components/ui/button";

interface ProfileHeadline {
  pre: string;
  highlight: string;
  post: string;
}

interface ProfileActions {
  viewProjects: string;
  downloadResume: string;
}

interface ProfileContentProps {
  headline: ProfileHeadline;
  summary: string;
  profileActions: ProfileActions;
  className?: string;
}

export function ProfileContent({
  headline,
  summary,
  profileActions,
  className = "",
}: ProfileContentProps) {
  return (
    <div className={`flex flex-col items-start gap-6 ${className}`}>
      <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-on-surface">
        {headline.pre}
        <span className="text-primary italic font-bold">{headline.highlight}</span>
        {headline.post}
      </h1>
  
      <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl">
        {summary}
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
        <Button asAnchor href="#projects" variant="primary" icon="arrow_downward">
          {profileActions.viewProjects}
        </Button>
        <Button
          asAnchor
          href="/curriculum.pdf"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          icon="description"
        >
          {profileActions.downloadResume}
        </Button>
      </div>
    </div>
  );
}
