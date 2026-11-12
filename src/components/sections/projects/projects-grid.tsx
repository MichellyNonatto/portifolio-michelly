"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ShowcaseProject } from "@/features/showcase/models/showcase.model";
import type { Locale } from "@/i18n";

const PROJECTS_PER_PAGE = 3;

interface ProjectsGridProps {
  readonly projects: ShowcaseProject[];
  readonly labels: {
    readonly projectBreakdown: string;
    readonly problemSolved: string;
    readonly primaryLanguage: string;
    readonly github: string;
    readonly liveDemo: string;
    readonly previous: string;
    readonly next: string;
    readonly paginationLabel: string;
  };
  readonly locale: Locale;
}

export function ProjectsGrid({ projects, labels, locale }: ProjectsGridProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const visibleProjects = projects.slice(
    page * PROJECTS_PER_PAGE,
    (page + 1) * PROJECTS_PER_PAGE
  );

  return (
    <div className="flex flex-col gap-8">
      {pageCount > 1 && (
        <nav
          className="flex items-center justify-center gap-3"
          aria-label={labels.paginationLabel}
        >
          <Button
            variant="surface"
            onClick={() => setPage((currentPage) => currentPage - 1)}
            disabled={page === 0}
            className="min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {labels.previous}
          </Button>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {page + 1} / {pageCount}
          </span>
          <Button
            variant="surface"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={page === pageCount - 1}
            className="min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {labels.next}
          </Button>
        </nav>
      )}
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <Card
            key={project.id}
            variant="low"
            hoverable
            className="flex h-full flex-col gap-5 p-5 sm:p-6"
          >
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {project.repositoryName}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <Badge key={topic} variant="surface">
                    {topic}
                  </Badge>
                ))}
              </div>

              <div
                className={`mt-auto rounded-2xl border border-outline/30 p-4 shadow-[2px_2px_0px_#1b1b1c] ${
                  index % 3 === 1
                    ? "bg-tertiary-container text-on-tertiary-container"
                    : index % 3 === 2
                      ? "bg-surface-container-highest text-on-surface"
                      : "bg-secondary-container text-on-secondary-container"
                }`}
              >
                <p className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-bold uppercase tracking-wide opacity-80">
                  <span aria-hidden="true" className="material-icons-outlined font-label-sm text-label-sm">
                    auto_awesome
                  </span>
                  {labels.projectBreakdown}
                </p>
                <p className="mt-3 flex-1 font-body-sm text-body-sm leading-relaxed">
                  {locale === "pt-BR" ? project.summaryPt : project.summaryEn}
                </p>
                <p className="mt-3 font-body-sm text-body-sm leading-relaxed">
                  <strong>{labels.primaryLanguage}:</strong>{" "}
                  {project.primaryLanguage || "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {project.websiteUrl && (
                <Button
                  asAnchor
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="min-h-11 flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {labels.liveDemo}
                </Button>
              )}
              <Button
                asAnchor
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon="link"
                className="min-h-11 flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {labels.github}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
