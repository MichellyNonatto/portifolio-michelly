import type { ProjectSummary } from "@/types/portfolio";

export type ShowcaseProject = ProjectSummary;

export interface ShowcaseState {
  projects: ShowcaseProject[];
  isLoading: boolean;
  error: string | null;
}
