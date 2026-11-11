export const en = {
  header: {
    brand: {
      name: "Michelly Coelho",
      role: "Engineer & AI",
    },
    navigation: [
      { label: "About", id: "about" },
      { label: "Projects", id: "projects" },
      { label: "Skills", id: "skills" },
      { label: "Contact", id: "contact" },
    ],
  },
  profile: {
    headline: {
      pre: "Building ",
      highlight: "Intelligent",
      post: " & Resilient Web Experiences",
    },
    summary:
      "Full-stack software engineer bridging modern, reactive front-ends with resilient backend architectures and practical LLM/AI integrations. Transforming complex computational workflows into accessible, joyful digital products.",
    profileActions: {
      viewProjects: "View Projects",
      downloadResume: "Download Resume PDF",
    },
    stats: [
      {
        value: "5+",
        label: "Years Experience",
        variant: "surface" as const,
      },
      {
        value: "99.9%",
        label: "Uptime Architecture",
        variant: "secondary" as const,
      },
      {
        value: "24+",
        label: "AI Deployments",
        variant: "tertiary" as const,
      },
    ],
    badge: {
      role: "Software Engineer",
      icon: "code",
    },
    imageAlt: "Michelly Coelho - Software Engineer & AI Integrator",
  },
  fallback: {
    title: "Experiences temporarily unavailable",
    description:
      "Could not load live trajectory from database. Please refer to my resume or contact channels below:",
    downloadResume: "Download Resume PDF",
    viewGithub: "View GitHub",
    contact: "Get in Touch",
  },
  about: {
    badge: "01 / About",
    headline: "About & Professional Journey",
    bioTitle: "About Me",
    coursesTitle: "Courses & Workshops",
    coursesDescription:
      "Hands-on specializations and ongoing technical training.",
    trajectoryTitle: "Trajectory & Achievements",
    trajectorySubtitle: "Career and validated academic certifications",
    currentLabel: "Present",
    credentialLabel: "Credential",
    emptyExperiences: "No professional experience records found.",
    emptyCertifications: "No academic certificates found.",
  },
  projects: {
    badge: "02 / Projects",
    headline: "Architectural Toolkit & Disciplines",
    projectBreakdown: "AI project breakdown",
    problemSolved: "Problem solved",
    primaryLanguage: "Primary language",
    projectLabel: "Project",
    starsLabel: "GitHub stars",
    github: "GitHub",
    liveDemo: "Live Demo",
    empty: "No published projects found.",
    previous: "Previous",
    next: "Next",
    paginationLabel: "Project pagination",
  },
} as const;
