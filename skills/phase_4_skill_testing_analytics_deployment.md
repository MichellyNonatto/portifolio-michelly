## Task Context & Objectives

You are operating as a QA Engineer, Security Lead, and DevOps Specialist. Your goal in Phase 4 is to verify application resilience, set up lightweight private analytics tracking, validate client/server isolation, and ensure a zero-downtime deployment.

Key objectives:

1. Construct automated unit tests covering API transformations, JSON output parsing, and resilient fallback states.

2. Implement a private access logging API route (`src/app/api/analytics/route.ts`) to log anonymized page visits directly to the Supabase `site_analytics` table.

3. Build and configure production environment settings and Docker container definitions for Vercel/Render deployment.

4. Conduct a full auditing pass verifying compliance with design guidelines, error boundary fallbacks, and security policies.

## Input Requirements & System References

* Environment Variables: Ensure production deployment secrets (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `GITHUB_TOKEN`) are bound.

* Database Target Table: `site_analytics` (Columns: `id`, `visited_at`, `user_agent`, `anonymized_ip`).

* Reference Rules: Validate final build quality against `AGENTS.md` and local guidelines in `C:\Users\smart\OneDrive\Documentos\developer\apple-design-skill-main\AGENTS.md`.

## Execution Directives

### Directival Analysis 1: Automated Unit Testing

* Implement test suites using Vitest or Jest.

* Test 1: Verify that `github-ai-pipeline.ts` gracefully handles repositories with missing or malformed `README.md` files.

* Test 2: Validate that data fetching components render `FallbackCard` when Supabase or external endpoints return HTTP 5xx or network timeouts.

* Test 3: Confirm that private service role keys are excluded from client-side JavaScript bundles.

### Directival Analysis 2: Private Access Logging API

* Create a Next.js App Router route handler at `src/app/api/analytics/route.ts`.

* On incoming request:

  1. Extract incoming request headers (`user-agent`, `x-forwarded-for`).

  2. Hash or anonymize IP address data to comply with privacy standards.

  3. Insert record into Supabase `site_analytics` using the server-side client.

* Ensure the route responds asynchronously without blocking client page load performance.

### Directival Analysis 3: Resilience & Fallback Audit

* Temporarily simulate complete network interruption and missing environment variables during pre-render checks.

* Ensure that all sections (Projects, Experience, Skills) fail gracefully to the `FallbackCard` UI.

* Confirm that the Fallback Card renders:
  1. Illustrative fallback asset.
  2. The required Portuguese error notification text.
  3. PDF Resume download link pointing to `/resume.pdf`.
  4. Direct social and email communication channels.

### Directival Analysis 4: Production Build & Deployment

* Configure `Dockerfile` and `next.config.js` for standalone output production optimization.

* Validate build passes without TypeScript errors or ESLint warnings (`npm run build`).

* Deploy to target hosting provider (Vercel or Render Free Tier).

## Output Standards & Constraints

* Do not expose raw IP addresses or identifiable user data in analytics logs.

* Do not use decorative unicode icons or emojis in output documentation, terminal logs, or test reports.

* Ensure all environment keys are safely scoped and validated prior to deployment.