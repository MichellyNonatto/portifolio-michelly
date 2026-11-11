import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { gitHubRepository, type GitHubRepository } from "../api/github.repository.ts";

export interface AiSummarizer {
  readonly provider?: string;
  readonly model?: string;
  generateSummary(repoName: string, language: string | null, readmeContent: string): Promise<string>;
  generateSummaries?(repoName: string, language: string | null, readmeContent: string): Promise<{
    summaryEn: string;
    summaryPt: string;
  }>;
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
    console.log(`Starting repository sync for ${repos.length} repositories.`);

    for (const [index, repo] of repos.entries()) {
      console.log(`[${index + 1}/${repos.length}] Syncing ${repo.name}...`);
      const readme = await this.githubRepo.fetchReadme(repo.owner.login, repo.name, githubToken);

      let summaryEn = repo.description ?? "";
      let summaryPt = repo.description ?? "";
      if (this.aiSummarizer && readme) {
        try {
          if (this.aiSummarizer.generateSummaries) {
            ({ summaryEn, summaryPt } = await this.aiSummarizer.generateSummaries(
              repo.name,
              repo.language,
              readme
            ));
          } else {
            summaryPt = await this.aiSummarizer.generateSummary(
              repo.name,
              repo.language,
              readme
            );
            summaryEn = summaryPt;
          }
        } catch (error) {
          console.error(`Failed to generate summary for ${repo.name}; using repository description.`, error);
        }
      }

      const { error } = await this.supabase.from("project_summaries").upsert({
        repository_owner: repo.owner.login,
        repository_name: repo.name,
        summary_en: summaryEn,
        summary_pt: summaryPt,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "repository_owner,repository_name",
      });

      if (error) {
        throw new Error(`Failed to upsert repository '${repo.name}' into Supabase: ${error.message}`);
      }
      console.log(`[${index + 1}/${repos.length}] Synced ${repo.name}.`);
    }
  }
}

export const showcaseSyncService = new ShowcaseSyncService();
