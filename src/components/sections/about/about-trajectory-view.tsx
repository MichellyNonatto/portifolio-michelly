import type {
  ShowcaseExperience,
  ShowcaseCertification,
} from "@/features/showcase/models/showcase.model";
import { AboutExperienceCard } from "./about-experience-card";
import { AboutCertificateCard } from "./about-certificate-card";

interface AboutTrajectoryViewProps {
  readonly experiences: readonly ShowcaseExperience[];
  readonly certifications: readonly ShowcaseCertification[];
  readonly labels: {
    readonly trajectoryTitle: string;
    readonly trajectorySubtitle: string;
    readonly currentLabel: string;
    readonly credentialLabel: string;
    readonly emptyExperiences: string;
    readonly emptyCertifications: string;
  };
}

export function AboutTrajectoryView({
  experiences,
  certifications,
  labels,
}: AboutTrajectoryViewProps) {

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-xl bg-primary text-on-primary shadow-[2px_2px_0px_#1b1b1c] sm:h-12 sm:w-12">
            <span
              aria-hidden="true"
              className="material-icons-outlined text-xl sm:text-2xl"
            >
              timeline
            </span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {labels.trajectoryTitle}
            </h3>
            <span className="font-body-sm text-body-sm text-on-tertiary-fixed-variant">
              {labels.trajectorySubtitle}
            </span>
          </div>
        </div>
      </div>

     
        <div className="flex flex-col gap-4">
          {experiences.length === 0 ? (
            <div className="rounded-xl border border-outline/30 bg-surface p-6 text-center font-body-sm text-body-sm text-on-surface-variant shadow-[2px_2px_0px_#1b1b1c]">
              {labels.emptyExperiences}
            </div>
          ) : (
            experiences.map((experience, index) => (
              <AboutExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                currentLabel={labels.currentLabel}
              />
            ))
          )}
        </div>
        <div className="flex flex-col gap-4">
          {certifications.length === 0 ? (
            <div className="rounded-xl border border-outline/30 bg-secondary-container p-6 text-center font-body-sm text-body-sm text-on-secondary-container shadow-[2px_2px_0px_#1b1b1c]">
              {labels.emptyCertifications}
            </div>
          ) : (
            certifications.map((certification) => (
              <AboutCertificateCard
                key={certification.id}
                certificate={certification}
                credentialLabel={labels.credentialLabel}
              />
            ))
          )}
        </div>
    </div>
  );
}
