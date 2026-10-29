## Task Context & Objectives

You are operating as a Senior Full-Stack Engineer and UI Architect. Your goal in Phase 1 is to establish the baseline configuration for a resilient Next.js portfolio application without generating visual components yet.

Key objectives:
1. Generate the required environment configuration file containing all database, AI service, and platform integration keys.
2. Analyze and extract exact design tokens from the provided Figma file using the Figma MCP (Model Context Protocol).
3. Read and incorporate UI/UX standards from the local reference guidelines at `C:\Users\smart\OneDrive\Documentos\developer\apple-design-skill-main\AGENTS.md`.
4. Produce the initial SQL database schema migration script for Supabase.
5. Configure `tailwind.config.js` using the extracted color palette, typography scale, and layout tokens.

---

## Input Requirements & System Variables

### Environment Configuration (.env.local)

Generate an `.env.local` template with the following exact key structure:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# AI Pipeline Integration
GEMINI_API_KEY=your_gemini_api_key_here

# GitHub API Integration
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username_her
```

---

## Execution Directives

### Directival Analysis 1: Figma MCP Data Extraction
- Extract color variables (Hex, HSL), typography specs (font families, weights, line heights), spacing system, and border radii.
- Map these values directly into the Tailwind CSS configuration file.

### Directival Analysis 2: Local Reference Audit
- Read the reference file located at: `C:\Users\smart\OneDrive\Documentos\developer\apple-design-skill-main\AGENTS.md`.
- Extract code quality rules, micro-interaction parameters, animation curve guidelines, and architectural patterns.
- Ensure strict compliance with these rules across all setup files.

---

## Database Architecture (Supabase SQL Migration)

Create `supabase/migrations/01_initial_schema.sql` defining the following schema:

1. `experiences` Table:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `title` (text, non-nullable)
   - `company` (text, non-nullable)
   - `location` (text)
   - `start_date` (date, non-nullable)
   - `end_date` (date, nullable)
   - `description` (text)
   - `is_current` (boolean, default false)
   - `created_at` (timestamp with time zone, default now())

2. `certifications` Table:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `title` (text, non-nullable)
   - `issuer` (text, non-nullable)
   - `issue_date` (date, non-nullable)
   - `credential_url` (text)
   - `created_at` (timestamp with time zone, default now())

3. `project_summaries` Table:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `repository_name` (text, non-nullable, unique)
   - `summary` (text, non-nullable)
   - `primary_language` (text)
   - `stars_count` (integer)
   - `updated_at` (timestamp with time zone, default now())

4. `site_analytics` Table:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `visited_at` (timestamp with time zone, default now())
   - `user_agent` (text)
   - `anonymized_ip` (text)

---

## Output Standards & Constraints

- Do not use decorative unicode icons or emojis in output documentation or code comments.
- Adhere strictly to clean architecture principles.
- Ensure all Tailwind tokens map to semantic names (`brand-primary`, `brand-background`, `brand-accent`).