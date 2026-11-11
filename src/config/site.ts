export const siteConfig = {
  contactEmail: process.env.CONTACT_EMAIL ?? "",
  socialLinks: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
  },
} as const;
