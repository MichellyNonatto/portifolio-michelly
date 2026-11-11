import { cache } from "react";
import { supabaseShowcaseRepository } from "../api/supabase.repository";
import { gitHubRepository } from "../api/github.repository";
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
      const username =
        process.env.GITHUB_REPOSITORY_OWNER ?? process.env.GITHUB_USERNAME;
      if (!username) {
        throw new Error(
          "Missing GitHub username. Set GITHUB_REPOSITORY_OWNER or GITHUB_USERNAME."
        );
      }

      const [summaries, repositories] = await Promise.all([
        supabaseShowcaseRepository.getPublishedProjects(),
        gitHubRepository.fetchRepositories(username, process.env.GITHUB_TOKEN),
      ]);
      const summariesByRepository = new Map(
        summaries.map((summary) => [
          `${summary.repository_owner}/${summary.repository_name}`,
          {
            en: summary.summary_en,
            pt: summary.summary_pt,
          },
        ])
      );
      const projects = repositories
        .filter((repository) =>
          summariesByRepository.has(
            `${repository.owner.login}/${repository.name}`
          )
        )
        .map((repository) => ({
          id: `${repository.owner.login}/${repository.name}`,
          repositoryOwner: repository.owner.login,
          repositoryName: repository.name,
          repositoryUrl: repository.html_url,
          websiteUrl: repository.homepage,
          sourceDescription: repository.description,
          summary: summariesByRepository.get(
            `${repository.owner.login}/${repository.name}`
          )?.en ?? "",
          summaryEn: summariesByRepository.get(
            `${repository.owner.login}/${repository.name}`
          )?.en ?? "",
          summaryPt: summariesByRepository.get(
            `${repository.owner.login}/${repository.name}`
          )?.pt ?? "",
          primaryLanguage: repository.language,
          starsCount: repository.stargazers_count,
          topics: repository.topics ?? [],
          sourceUpdatedAt: repository.updated_at,
          updatedAt: repository.updated_at,
        }));
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
