export type ProjectSummary = {
  id: string;
  repositoryOwner: string;
  repositoryName: string;
  repositoryUrl: string;
  sourceDescription: string | null;
  summary: string;
  primaryLanguage: string | null;
  starsCount: number;
  topics: string[];
  sourceUpdatedAt: string | null;
  updatedAt: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  isCurrent: boolean;
  createdAt: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  createdAt: string;
};
