import { GeminiSummarizerService } from "../src/features/showcase/services/gemini-summarizer.service.ts";
import { ShowcaseSyncService } from "../src/features/showcase/services/showcase-sync.service.ts";

async function runPipeline() {
  const username = process.env.GITHUB_USERNAME;
  const githubToken = process.env.GITHUB_TOKEN;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!username) {
    throw new Error("Missing required environment variable: GITHUB_USERNAME");
  }
  if (!geminiApiKey) {
    throw new Error("Missing required environment variable: GEMINI_API_KEY");
  }
  if (!geminiModel) {
    throw new Error("Missing required environment variable: GEMINI_MODEL");
  }
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing required Supabase credentials: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }

  const summarizer = new GeminiSummarizerService({
    apiKey: geminiApiKey,
    model: geminiModel,
  });

  const syncService = new ShowcaseSyncService(undefined, summarizer);
  await syncService.syncRepositories(username, githubToken);
}

runPipeline().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Pipeline execution failed: ${message}\n`);
  process.exit(1);
});
