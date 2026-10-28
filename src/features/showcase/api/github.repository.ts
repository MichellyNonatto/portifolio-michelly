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

  async fetchRepositories(username: string, token?: string): Promise<GitHubRawRepository[]> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "michelly-portfolio-pipeline",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error (${response.status}): ${response.statusText}`);
    }

    return response.json();
  }

  async fetchReadme(owner: string, repo: string, token?: string): Promise<string | null> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "michelly-portfolio-pipeline",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/readme`, {
      headers,
    });

    if (!response.ok) {
      return null;
    }

    return response.text();
  }
}

export const gitHubRepository = new GitHubRepository();
