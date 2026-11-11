import { Suspense } from "react";
import { en } from "@/i18n/en";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Fallback } from "@/components/fallback/fallback";
import { showcaseController } from "@/features/showcase/controllers/showcase.controller";
import type { SkillTrack } from "@/features/showcase/models/showcase.model";
import { siteConfig } from "@/config/site";

function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-64 animate-pulse rounded-[24px] bg-surface-container-high"
        />
      ))}
    </div>
  );
}

async function SkillsContent({
  empty,
  fallback,
}: {
  readonly empty: string;
  readonly fallback: typeof en.fallback;
}) {
  const result = await showcaseController.loadSkills();

  if (result.hasError) {
    return (
      <Fallback
        title={fallback.title}
        description={fallback.description}
        downloadResumeText={fallback.downloadResume}
        viewGithubText={fallback.viewGithub}
        contactText={fallback.contact}
        githubHref={siteConfig.socialLinks.github}
        contactHref={siteConfig.contactEmail}
      />
    );
  }

  if (result.tracks.length === 0) {
    return (
      <div className="rounded-2xl bg-surface-container-low p-6 text-body-md text-on-surface-variant">
        {empty}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
      {result.tracks
        .filter((track) => track.skills.length > 0)
        .map((track, index) => (
          <SkillTrackCard key={track.id} track={track} index={index} />
        ))}
    </div>
  );
}

function SkillTrackCard({
  track,
  index,
}: {
  readonly track: SkillTrack;
  readonly index: number;
}) {
  const headerStyles = [
    "bg-primary text-on-primary",
    "bg-secondary text-on-secondary",
    "bg-tertiary text-on-tertiary",
    "bg-inverse-surface text-inverse-on-surface",
  ];

  return (
    <Card variant="low" className="overflow-hidden p-0">
      <div className={`flex items-center justify-between gap-3 p-4 ${headerStyles[index % headerStyles.length]}`}>
        <h3 className="font-headline-sm text-headline-sm">{track.name}</h3>
        <span aria-hidden="true" className="material-icons-outlined text-xl">
          {track.icon}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 p-5">
        {track.skills.map((skill) => (
          <Badge key={skill} variant="surface">
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export function SkillsSection() {
  const { skills, header } = en;

  return (
    <section
      id={header.navigation[2].id}
      aria-label={header.navigation[2].label}
      className="flex flex-col gap-10 pt-12 lg:pt-16"
    >
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2">
          <Badge variant="primary-fixed" size="sm">
            {skills.badge}
          </Badge>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          {skills.headline}
        </h2>
      </div>
      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsContent empty={skills.empty} fallback={en.fallback} />
      </Suspense>
    </section>
  );
}
