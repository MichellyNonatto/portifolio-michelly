## Task Context & Objectives

You are operating as an AI Systems Architect and Automation Engineer. Your goal in Phase 3 is to establish a zero-latency, zero-runtime-token-cost AI analysis system for Michelly Coelho's web development portfolio.

Key objectives:

1. Construct a Node.js ingestion script that fetches public repositories and their respective `README.md` files via the GitHub REST API.

2. Integrate the Google Gemini API (Gemini 1.5 Flash) or Groq API (Llama 3) to convert raw repository documentation into recruiter-friendly project summaries in plain language.

3. Automate database updates by persisting structured AI summaries directly into the Supabase `project_summaries` table.

4. Implement a scheduled GitHub Actions cron workflow (`.github/workflows/ai-summary.yml`) that executes automatically once every 24 hours at 00:00 UTC or upon push events.

## Input Requirements & System References

- Environment Variables: Read access tokens (`GEMINI_API_KEY`, `GITHUB_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) from `.env.local`.

- Quality Standards: Adhere to system design guidelines defined in `AGENTS.md`.

- Database Target Table: `project_summaries` (Columns: `id`, `repository_name`, `summary`, `primary_language`, `stars_count`, `updated_at`).

## Execution Directives

### Directival Analysis 1: GitHub Data Ingestion Script

- Develop `src/lib/github-ai-pipeline.ts` (or standalone script executable via Node.js CLI).

- Fetch repositories for `GITHUB_REPOSITORY_OWNER` in GitHub Actions, or the authenticated GitHub user outside Actions.

- Extract repository details: repository name, primary programming language, star count, and decode base64 `README.md` content.

- Handle missing or empty `README.md` files gracefully without terminating the execution loop.

### Directival Analysis 2: Structured LLM Prompting & Output Parsing

- Construct a deterministic system prompt for the Gemini API / Groq API:
  - Role: Senior Technical Recruiter & Software Architect.
  - Task: Analyze the raw repository name, language, and README text.
  - Required JSON Structure:
    ```json
    {
      "repository_name": "string",
      "summary": "Concise 2-3 sentence overview in Portuguese highlighting the core problem solved, main technology stack, and architectural key takeaway.",
      "primary_language": "string"
    }
    ```

- Parse and validate the returned JSON payload against structural schema definitions before database writing.

### Directival Analysis 3: Supabase Data Persistence

- Connect to Supabase using the elevated service role key (`SUPABASE_SERVICE_ROLE_KEY`) for secure backend operations.

- Perform upsert operations (`upsert`) on `project_summaries` matching `repository_name` as the primary key constraint to prevent duplicate rows.

- Update `updated_at` timestamp on every successful execution.

### Directival Analysis 4: GitHub Actions Workflow Automation

- Create `.github/workflows/ai-summary.yml`.

- Configure scheduled execution triggers:
  ```yaml
  on:
    schedule:
      - cron: '0 0 * * *'
    workflow_dispatch:
  ```

- Define runner environment with Node.js LTS, dependency installation, and environment secret injection (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, etc.).

## Output Standards & Constraints

- Do not execute LLM requests dynamically in client-side code; all AI processing must happen during pre-render or scheduled pipeline executions.

- Do not use decorative unicode icons or emojis in output documentation, terminal logs, or generated summaries.

- Ensure strict rate-limit handling and exponential backoff retry mechanisms for external API calls.