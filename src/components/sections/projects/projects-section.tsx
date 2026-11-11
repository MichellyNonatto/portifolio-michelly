import { Suspense } from "react";
import { en } from "@/i18n/en";
import { Badge } from "@/components/ui/badge";
import { Fallback } from "@/components/fallback/fallback";
import { showcaseController } from "@/features/showcase/controllers/showcase.controller";
import { ProjectsGrid } from "./projects-grid";

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((skeleton) => (
        <div
          key={`project-skeleton-${skeleton}`}
          className="h-[390px] animate-pulse rounded-[24px] bg-surface-container-high"
        />
      ))}
    </div>
  );
}

async function ProjectsContent({
  projects,
  fallback,
}: {
  readonly projects: typeof en.projects;
  readonly fallback: typeof en.fallback;
}) {
  const result = await showcaseController.loadProjects();

  if (result.hasError) {
    return (
      <Fallback
        title={fallback.title}
        description={fallback.description}
        downloadResumeText={fallback.downloadResume}
        viewGithubText={fallback.viewGithub}
        contactText={fallback.contact}
      />
    );
  }

  if (result.projects.length === 0) {
    return (
      <div className="rounded-2xl bg-surface-container-low p-6 text-body-md text-on-surface-variant">
        {projects.empty}
      </div>
    );
  }

  return (
    <ProjectsGrid
      projects={result.projects}
      labels={{
        projectBreakdown: projects.projectBreakdown,
        problemSolved: projects.problemSolved,
        primaryLanguage: projects.primaryLanguage,
        github: projects.github,
        liveDemo: projects.liveDemo,
        previous: projects.previous,
        next: projects.next,
        paginationLabel: projects.paginationLabel,
      }}
    />
  );
}

export function ProjectSection() {
  const { projects, header, fallback } = en;

  return (
    <section
      id={header.navigation[1].id}
      aria-label={header.navigation[1].label}
      className="flex flex-col gap-10 pt-12 lg:pt-16"
    >
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2">
          <Badge variant="primary-fixed" size="sm">
            {projects.badge}
          </Badge>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          {projects.headline}
        </h2>
      </div>
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent projects={projects} fallback={fallback} />
      </Suspense>
    </section>
  );
}
