import { gitHubRepository } from "../api/github.repository";
import { supabase } from "@/infrastructure/supabase/client";

export interface AiSummarizer {
  generateSummary(repoName: string, language: string | null, readmeContent: string): Promise<string>;
}

export class ShowcaseSyncService {
  constructor(
    private readonly githubRepo = gitHubRepository,
    private readonly aiSummarizer?: AiSummarizer
  ) {}

  async syncRepositories(username: string, githubToken?: string): Promise<void> {
    const repos = await this.githubRepo.fetchRepositories(username, githubToken);

    for (const repo of repos) {
      const readme = await this.githubRepo.fetchReadme(repo.owner.login, repo.name, githubToken);
      
      let summary = repo.description;
      if (this.aiSummarizer && readme) {
        try {
          summary = await this.aiSummarizer.generateSummary(repo.name, repo.language, readme);
        } catch {
          console.error(`Failed to generate summary for ${repo.name}, using default description.`);
        }
      }

      await supabase.from("project_summaries").upsert({
        repository_owner: repo.owner.login,
        repository_name: repo.name,
        repository_url: repo.html_url,
        source_description: repo.description,
        summary,
        primary_language: repo.language,
        stars_count: repo.stargazers_count,
        topics: repo.topics || [],
        source_updated_at: repo.updated_at,
        sync_status: "published",
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "repository_owner,repository_name",
      });
    }
  }
}

export const showcaseSyncService = new ShowcaseSyncService();
