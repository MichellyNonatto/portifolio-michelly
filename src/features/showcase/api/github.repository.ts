export interface GitHubRawRepository {
  name: string;
  owner: { login: string };
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  updated_at: string;
}

export class GitHubRepository {
  private readonly baseUrl = "https://api.github.com";

  async fetchAuthenticatedUsername(token: string): Promise<string> {
    const response = await this.fetchWithRetry(`${this.baseUrl}/user`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "michelly-portfolio-pipeline",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await response.json() as { login?: unknown };

    if (typeof user.login !== "string" || !user.login) {
      throw new Error("GitHub API returned no authenticated username.");
    }

    return user.login;
  }

  async fetchRepositories(username: string, token?: string): Promise<GitHubRawRepository[]> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "michelly-portfolio-pipeline",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const repositories: GitHubRawRepository[] = [];
    for (let page = 1; ; page += 1) {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/users/${username}/repos?per_page=100&page=${page}&sort=updated`,
        { headers }
      );

      const pageRepositories: GitHubRawRepository[] = await response.json();
      repositories.push(...pageRepositories);
      if (pageRepositories.length < 100) return repositories;
    }
  }

  async fetchReadme(owner: string, repo: string, token?: string): Promise<string | null> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "michelly-portfolio-pipeline",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await this.fetchWithRetry(`${this.baseUrl}/repos/${owner}/${repo}/readme`, { headers }, true);

    return response.status === 404 ? null : response.text();
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    allowNotFound = false
  ): Promise<Response> {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30_000);
      let response: Response;
      try {
        response = await fetch(url, { ...options, signal: controller.signal });
      } finally {
        clearTimeout(timeout);
      }
      if (response.ok || (allowNotFound && response.status === 404)) {
        return response;
      }
      if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 2) {
        throw new Error(`GitHub API error (${response.status}): ${response.statusText}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 500));
    }
    throw new Error("GitHub API request failed after retries.");
  }
}

export const gitHubRepository = new GitHubRepository();
