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
  about: {
    badge: "01 / Sobre",
    headline: "Sobre & Trajetória Profissional",
    bioTitle: "Sobre Mim",
    coursesTitle: "Cursos & Workshops",
    coursesDescription: "Aperfeiçoamentos práticos e especializações imersivas.",
    trajectoryTitle: "Trajetória & Conquistas",
    trajectorySubtitle: "Carreira e certificações acadêmicas validadas",
    currentLabel: "Presente",
    credentialLabel: "Credencial",
    emptyExperiences: "Nenhum registro de experiência profissional encontrado.",
    emptyCertifications: "Nenhum certificado acadêmico encontrado.",
    fallback: {
      title: "Experiências temporariamente indisponíveis",
      description:
        "Não foi possível sincronizar a trajetória do banco de dados. Você pode acessar meu currículo completo e canais abaixo:",
      downloadResume: "Baixar Currículo PDF",
      viewGithub: "Acessar GitHub",
      contact: "Entrar em Contato",
    },
  },
} as const;
