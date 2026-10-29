import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const GITHUB_USERNAME = process.env.GITHUB_REPOSITORY_OWNER ?? process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;
const AI_PROVIDER = process.env.AI_PROVIDER;

function getSupabaseClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function createGithubHeaders(acceptHeader = "application/vnd.github.v3+json") {
  const headers = {
    Accept: acceptHeader,
    "User-Agent": "michelly-portfolio-pipeline-test",
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  return headers;
}

describe("Supabase Integration", () => {
  it("validates environment configuration", () => {
    assert.ok(SUPABASE_URL, "[Supabase] NEXT_PUBLIC_SUPABASE_URL is required");
    assert.ok(SUPABASE_ANON_KEY, "[Supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
    assert.ok(SUPABASE_URL.startsWith("https://"), "[Supabase] NEXT_PUBLIC_SUPABASE_URL must use HTTPS protocol");
  });

  it("fetches experiences table records", async () => {
    const supabase = getSupabaseClient();

    const { data, error, status } = await supabase
      .from("experiences")
      .select("id, title, company, start_date, is_current")
      .order("start_date", { ascending: false });

    assert.equal(error, null, `[Supabase] Query error: ${error?.message}`);
    assert.equal(status, 200, `[Supabase] Expected status 200, received ${status}`);
    assert.ok(Array.isArray(data), "[Supabase] Response data must be an array");

    if (data.length > 0) {
      const [firstRecord] = data;
      assert.ok(firstRecord.id, "[Supabase] Record missing 'id'");
      assert.ok(firstRecord.title, "[Supabase] Record missing 'title'");
      assert.ok(firstRecord.company, "[Supabase] Record missing 'company'");
    }
  });

  it("fetches certifications table records", async () => {
    const supabase = getSupabaseClient();

    const { data, error, status } = await supabase
      .from("certifications")
      .select("id, title, issuer, issue_date");

    assert.equal(error, null, `[Supabase] Query error: ${error?.message}`);
    assert.equal(status, 200, `[Supabase] Expected status 200, received ${status}`);
    assert.ok(Array.isArray(data), "[Supabase] Response data must be an array");
  });

  it("fetches project_summaries table records", async () => {
    const supabase = getSupabaseClient();

    const { data, error, status } = await supabase
      .from("project_summaries")
      .select("id, repository_name, summary, stars_count, sync_status");

    assert.equal(error, null, `[Supabase] Query error: ${error?.message}`);
    assert.equal(status, 200, `[Supabase] Expected status 200, received ${status}`);
    assert.ok(Array.isArray(data), "[Supabase] Response data must be an array");
  });
});

describe("GitHub API Integration", () => {
  it("validates environment configuration", () => {
    assert.ok(GITHUB_USERNAME, "[GitHub] GitHub username is required");
  });

  it("fetches user public repositories", async () => {
    const headers = createGithubHeaders();
    const endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=10&sort=updated`;

    const response = await fetch(endpoint, { headers });
    const repos = await response.json();

    assert.equal(response.ok, true, `[GitHub] Request failed with status ${response.status}: ${response.statusText}`);
    assert.ok(Array.isArray(repos), "[GitHub] Response payload must be an array");

    if (repos.length > 0) {
      const [firstRepo] = repos;
      assert.ok(firstRepo.name, "[GitHub] Repository missing 'name'");
      assert.ok(firstRepo.html_url, "[GitHub] Repository missing 'html_url'");
      assert.ok(firstRepo.owner?.login, "[GitHub] Repository missing 'owner.login'");
    }
  });

  it("handles non-existent repository readme gracefully (404 response)", async () => {
    const headers = createGithubHeaders("application/vnd.github.v3.raw");
    const endpoint = `https://api.github.com/repos/${GITHUB_USERNAME}/non-existent-repo-testing-12345/readme`;

    const response = await fetch(endpoint, { headers });

    assert.equal(response.status, 404, `[GitHub] Expected status 404 for missing repository, received ${response.status}`);
  });
});

describe("Gemini API Integration", () => {
  it("validates environment configuration", () => {
    assert.ok(GEMINI_API_KEY, "[Gemini] GEMINI_API_KEY is required");
    assert.ok(GEMINI_MODEL, "[Gemini] GEMINI_MODEL is required");
  });

  it("generates content with Gemini API", async () => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
      contents: [
        {
          parts: [{ text: "Respond only with 'OK'." }],
        },
      ],
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    assert.equal(
      response.ok,
      true,
      `[Gemini] Request failed with status ${response.status}: ${data.error?.message || response.statusText}`
    );
    assert.ok(data.candidates?.[0]?.content?.parts?.[0]?.text, "[Gemini] Response missing generated text candidate");
  });

  it("throws error when GeminiSummarizerConfig is missing required values", async () => {
    const { GeminiSummarizerService } = await import(
      "../src/features/showcase/services/gemini-summarizer.service.ts"
    );

    assert.throws(() => new GeminiSummarizerService(), /Missing 'apiKey' in GeminiSummarizerConfig/);
    assert.throws(() => new GeminiSummarizerService({ apiKey: "test" }), /Missing 'model' in GeminiSummarizerConfig/);
  });

  it("generates structured repository summary using GeminiSummarizerService", async () => {
    const { GeminiSummarizerService } = await import(
      "../src/features/showcase/services/gemini-summarizer.service.ts"
    );
    const summarizer = new GeminiSummarizerService({
      apiKey: GEMINI_API_KEY,
      model: GEMINI_MODEL,
    });

    const summary = await summarizer.generateSummary(
      "sample-service",
      "TypeScript",
      "# Sample Service\nAPI gateway and microservice pipeline built with Node.js."
    );

    assert.ok(typeof summary === "string" && summary.length > 20, "[Gemini] Expected valid non-empty summary string");
  });
});
