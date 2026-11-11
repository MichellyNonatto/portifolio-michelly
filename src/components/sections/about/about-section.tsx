import { Suspense } from "react";
import { en } from "@/i18n/en";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AboutBio } from "./about-bio";
import { AboutSkeleton } from "./about-skeleton";
import { AboutBioSkeleton } from "./about-bio-skeleton";
import { AboutTrajectoryView } from "./about-trajectory-view";
import { Fallback } from "@/components/fallback/fallback";
import { showcaseController } from "@/features/showcase/controllers/showcase.controller";
import { siteConfig } from "@/config/site";

function AboutSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <AboutBioSkeleton />
      <Card
        variant="tertiary"
        className="flex flex-col gap-6 p-8 lg:col-span-7"
      >
        <AboutSkeleton />
      </Card>
    </div>
  );
}

async function AboutContent({
  about,
  profile,
  fallback,
}: {
  readonly about: typeof en.about;
  readonly profile: typeof en.profile;
  readonly fallback: typeof en.fallback;
}) {
  const {
    experiences,
    academicCertifications,
    professionalCertifications,
    hasError,
  } = await showcaseController.loadExperiences();

  if (hasError) {
    return (
      <Fallback
        title={fallback.title}
        description={fallback.description}
        downloadResumeText={fallback.downloadResume}
        viewGithubText={fallback.viewGithub}
        contactText={fallback.contact}
        githubHref={siteConfig.socialLinks.github}
        contactHref={siteConfig.contactEmail}
        className="lg:col-span-12"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <AboutBio
        title={about.bioTitle}
        summary={profile.summary}
        coursesTitle={about.coursesTitle}
        coursesDescription={about.coursesDescription}
        professionalCertifications={professionalCertifications}
        className="lg:col-span-5"
      />
      <Card
        variant="tertiary"
        className="flex flex-col gap-6 p-8 lg:col-span-7"
      >
        <AboutTrajectoryView
          experiences={experiences}
          certifications={academicCertifications}
          labels={{
            trajectoryTitle: about.trajectoryTitle,
            trajectorySubtitle: about.trajectorySubtitle,
            currentLabel: about.currentLabel,
            credentialLabel: about.credentialLabel,
            emptyExperiences: about.emptyExperiences,
            emptyCertifications: about.emptyCertifications,
          }}
        />
      </Card>
    </div>
  );
}

export function AboutSection() {
  const { about, profile, header } = en;

  return (
    <section
      id={header.navigation[0].id}
      aria-label={header.navigation[0].label}
      className="flex flex-col gap-10 pt-12 lg:pt-16"
    >
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2">
          <Badge variant="primary-fixed" size="sm">
            {about.badge}
          </Badge>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          {about.headline}
        </h2>
      </div>

      <Suspense fallback={<AboutSectionSkeleton />}>
        <AboutContent about={about} profile={profile} fallback={en.fallback} />
      </Suspense>
    </section>
  );
}
