import { cache } from "react";
import { supabaseShowcaseRepository } from "../api/supabase.repository";
import type {
  ShowcaseProject,
  ShowcaseExperience,
  ShowcaseCertification,
} from "../models/showcase.model";

export interface ShowcaseControllerResult {
  projects: ShowcaseProject[];
  hasError: boolean;
  errorMessage?: string;
}

const loadCertifications = cache(() =>
  supabaseShowcaseRepository.getCertifications()
);

export interface ShowcaseExperiencesResult {
  experiences: ShowcaseExperience[];
  academicCertifications: ShowcaseCertification[];
  professionalCertifications: ShowcaseCertification[];
  hasError: boolean;
}

export class ShowcaseController {
  async loadProjects(): Promise<ShowcaseControllerResult> {
    try {
      const projects = await supabaseShowcaseRepository.getPublishedProjects();
      return {
        projects,
        hasError: false,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return {
        projects: [],
        hasError: true,
        errorMessage: message,
      };
    }
  }

  async loadExperiences(): Promise<ShowcaseExperiencesResult> {
    const [experiencesResult, certificationsResult] = await Promise.allSettled([
      supabaseShowcaseRepository.getExperiences(),
      loadCertifications(),
    ]);

    const experiences =
      experiencesResult.status === "fulfilled" ? experiencesResult.value : [];
    const certifications =
      certificationsResult.status === "fulfilled"
        ? certificationsResult.value
        : [];

    return {
      experiences,
      academicCertifications: certifications.filter(
        (certification) => certification.isAcademic
      ),
      professionalCertifications: certifications.filter(
        (certification) => !certification.isAcademic
      ),
      hasError:
        experiencesResult.status === "rejected" &&
        certificationsResult.status === "rejected",
    };
  }
}

export const showcaseController = new ShowcaseController();
