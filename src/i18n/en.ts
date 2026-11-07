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
      }
    ],
    badge: {
      role: "Software Engineer",
      icon: "code",
    },
    imageAlt: "Michelly Coelho - Software Engineer & AI Integrator",
  },
} as const;
