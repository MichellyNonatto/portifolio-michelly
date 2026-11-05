export const ptBr = {
  header: {
    brand: {
      name: "Michelly Coelho",
      role: "Engenharia & AI",
    },
    navigation: [
      { label: "Sobre", id: "about" },
      { label: "Experiência", id: "experience" },
      { label: "Projetos", id: "projects" },
      { label: "Habilidades", id: "skills" },
      { label: "Contato", id: "contact" },
    ],
  },
  profile: {
    headline: {
      pre: "Construindo Experiências Web ",
      highlight: "Inteligentes",
      post: " & Resilientes",
    },
    summary:
      "Engenheira de software full-stack conectando front-ends modernos e reativos a arquiteturas de backend resilientes e integrações práticas de IA/LLMs. Transformando fluxos computacionais complexos em produtos digitais acessíveis e fluidos.",
    profileActions: {
      viewProjects: "Ver Projetos",
      downloadResume: "Baixar Currículo PDF",
    },
    stats: [
      {
        value: "5+",
        label: "Anos de Experiência",
        variant: "surface" as const,
      },
      {
        value: "99.9%",
        label: "Arquitetura Uptime",
        variant: "secondary" as const,
      },
      {
        value: "24+",
        label: "Deploys de IA",
        variant: "tertiary" as const,
      },
    ],
    badge: {
      role: "Engenheira de Software",
      icon: "code",
    },
    imageAlt: "Michelly Coelho - Engenheira de Software & Integradora de IA",
  },
} as const;
