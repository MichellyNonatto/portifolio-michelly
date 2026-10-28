import { supabaseShowcaseRepository } from "../api/supabase.repository";
import type { ShowcaseProject } from "../models/showcase.model";

export interface ShowcaseControllerResult {
  projects: ShowcaseProject[];
  hasError: boolean;
  errorMessage?: string;
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
}

export const showcaseController = new ShowcaseController();
