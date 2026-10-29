import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { gitHubRepository, type GitHubRepository } from "../api/github.repository.ts";

export interface AiSummarizer {
  readonly provider?: string;
  readonly model?: string;
  generateSummary(repoName: string, language: string | null, readmeContent: string): Promise<string>;
}

export class ShowcaseSyncService {
  private readonly supabase: SupabaseClient;
  private readonly githubRepo: GitHubRepository;
  private readonly aiSummarizer?: AiSummarizer;

  constructor(
    githubRepo: GitHubRepository = gitHubRepository,
    aiSummarizer?: AiSummarizer,
    customSupabaseClient?: SupabaseClient
  ) {
    this.githubRepo = githubRepo;
    this.aiSummarizer = aiSummarizer;

    if (customSupabaseClient) {
      this.supabase = customSupabaseClient;
    } else if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
    } else if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    } else {
      throw new Error(
        "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and a Supabase key."
      );
    }
  }

  async syncRepositories(username: string, githubToken?: string): Promise<void> {
    const repos = await this.githubRepo.fetchRepositories(username, githubToken);

    for (const repo of repos) {
      const readme = await this.githubRepo.fetchReadme(repo.owner.login, repo.name, githubToken);

      let summary = repo.description ?? "";
      let aiProvider: string | null = null;
      let aiModel: string | null = null;

      if (this.aiSummarizer && readme) {
        try {
          summary = await this.aiSummarizer.generateSummary(repo.name, repo.language, readme);
          aiProvider = this.aiSummarizer.provider ?? process.env.AI_PROVIDER ?? null;
          aiModel = this.aiSummarizer.model ?? process.env.GEMINI_MODEL ?? null;
        } catch (error) {
          console.error(`Failed to generate summary for ${repo.name}; using repository description.`, error);
        }
      }

      const { error } = await this.supabase.from("project_summaries").upsert({
        repository_owner: repo.owner.login,
        repository_name: repo.name,
        repository_url: repo.html_url,
        source_description: repo.description,
        summary,
        primary_language: repo.language,
        stars_count: repo.stargazers_count,
        topics: repo.topics ?? [],
        source_updated_at: repo.updated_at,
        ai_provider: aiProvider,
        ai_model: aiModel,
        sync_status: "published",
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "repository_owner,repository_name",
      });

      if (error) {
        throw new Error(`Failed to upsert repository '${repo.name}' into Supabase: ${error.message}`);
      }
    }
  }
}

export const showcaseSyncService = new ShowcaseSyncService();
