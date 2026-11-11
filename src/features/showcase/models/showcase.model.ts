import type { ProjectSummary, Experience, Certification } from "@/types/portfolio";

export type ShowcaseProject = ProjectSummary;
export type ShowcaseExperience = Experience;
export type ShowcaseCertification = Certification;

export interface ShowcaseState {
  projects: ShowcaseProject[];
  isLoading: boolean;
  error: string | null;
}

export interface ExperienceDbRow {
  id: string;
  title: string;
  company: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
  is_current: boolean;
  created_at: string;
};

export interface CertificationDbRow {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string | null;
  is_academic: boolean;
  created_at: string;
}
