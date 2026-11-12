const currentYear = new Date().getFullYear();

export const en = {
  header: {
    brand: {
      name: "Michelly Coelho",
      role: "Software Engineer",
      description: `© ${currentYear} Michelly Coelho. Professional portfolio.`,
      returnToTop: "Top",
    },
    languageLabel: "Language",
    languageOptions: {
      en: "English",
      ptBr: "Português (Brasil)",
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
      pre: "Create smart",
      highlight: " Technology ",
      post: "for real world challenges",
    },
    resume: "Full-stack software engineer bridging modern, reactive front-ends with resilient backend architectures and practical LLM/AI integrations. Transforming complex computational workflows into accessible, joyful digital products.",
    summary: `
    I hold a degree in Systems Analysis and Development and have 2 years and 10 months of experience at one of Latin America's largest foodtech companies, progressing from Software Engineering Intern to Junior Software Engineer.

    My experience in iOS development exposed me to the challenges of building and scaling high-impact products, strengthening my skills in software architecture, testing, code quality, and product-driven development.

    Beyond software engineering, I focus on strategically orchestrating AI technologies, combining LLMs, agents, and automation to create practical, cost-effective, and functional solutions.

    Currently pursuing a postgraduate degree in Artificial Intelligence, I am deepening my expertise in building intelligent, AI-powered products.
    `,
    profileActions: {
      viewProjects: "View Projects",
      downloadResume: "Download Resume PDF",
    },
    stats: [
      {
        value: "2+",
        label: "Years Experience",
        variant: "surface" as const,
      },
      {
        value: "B2C",
        label: "Business Operations",
        variant: "secondary" as const,
      },
      {
        value: "AI",
        label: "Intelligent Solutions",
        variant: "tertiary" as const,
      },
    ],
    badge: {
      role: "Software Engineer Jr.",
      icon: "terminal",
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
    headline: "Code & Creations",
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
  skills: {
    badge: "03 / Skills",
    headline: "Technologies & Expertise",
    empty: "No skills have been published yet.",
  },
  contact: {
    badge: "04 / Contact",
    headline: "Let's Build Something Resilient Together",
    form: {
      nameLabel: "Your name",
      namePlaceholder: "Your name",
      emailLabel: "Email address",
      emailPlaceholder: "you@company.com",
      inquiryLabel: "Inquiry type / role",
      inquiryPlaceholder: "Select an inquiry type",
      inquiryOptions: [
        "Full-time engineering role",
        "Contract or consulting",
        "Project collaboration",
        "Other",
      ],
      messageLabel: "Message",
      messagePlaceholder:
        "Tell me about your product vision, engineering challenges, or team needs...",
      submit: "Send message",
      sending: "Sending message...",
      success: "Message sent successfully.",
      error:
        "Unable to send the message. Please try again or use the email link.",
      directCoordinates: "Direct coordinates",
      directEmail: "Direct email",
      basedIn: "Based in",
      location: "Hybrid in São Paulo and Campinas | On-site in Bragança Paulista and surrounding areas | Open to Remote",
      availability: "Open to full-time and high-impact contracts",
      connectOnline: "Connect online",
      linkedIn: "LinkedIn",
      github: "GitHub",
      x: "X / Twitter",
      resume: "Resume PDF",
    },
  },
} as const;
