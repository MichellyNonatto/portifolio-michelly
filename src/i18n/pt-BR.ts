
const currentYear = new Date().getFullYear();

export const ptBr = {
  header: {
    brand: {
      name: "Michelly Coelho",
      role: "Engenheira de Software",
      description: `© ${currentYear} Michelly Coelho. Portfólio profissional.`,
      returnToTop: "Voltar ao topo",
    },
    navigation: [
      { label: "Sobre", id: "about" },
      { label: "Projetos", id: "projects" },
      { label: "Habilidades", id: "skills" },
      { label: "Contato", id: "contact" },
    ],
  },
  profile: {
    headline: {
      pre: "Criando",
      highlight: " tecnologia ",
      post: "para desafios do mundo real",
    },
    resume: "Engenheira de Software Full-stack que conecta interfaces modernas e reativas a arquiteturas de backend resilientes e integrações práticas com LLMs e Inteligência Artificial. Transformando fluxos computacionais complexos em produtos digitais acessíveis e intuitivos.",
    summary: `
    Sou formada em Análise e Desenvolvimento de Sistemas e tenho 2 anos e 10 meses de experiência em uma das maiores empresas de foodtech da América Latina, onde evoluí de Estagiária de Engenharia de Software a Engenheira de Software Júnior.

    Minha experiência em desenvolvimento iOS me proporcionou contato com os desafios de construir e escalar produtos de alto impacto, fortalecendo minhas habilidades em arquitetura de software, testes, qualidade de código e desenvolvimento orientado ao produto.

    Além da engenharia de software, concentro meus esforços na orquestração estratégica de tecnologias de IA, combinando LLMs, agentes e automações para desenvolver soluções práticas, funcionais e economicamente eficientes.

    Atualmente, estou cursando uma pós-graduação em Inteligência Artificial, aprofundando meus conhecimentos na construção de produtos inteligentes potencializados por IA.
    `,
    profileActions: {
      viewProjects: "Ver projetos",
      downloadResume: "Baixar currículo em PDF",
    },
    stats: [
      {
        value: "2+",
        label: "Anos de experiência",
        variant: "surface" as const,
      },
      {
        value: "B2C",
        label: "Operações de negócio",
        variant: "secondary" as const,
      },
      {
        value: "IA",
        label: "Soluções inteligentes",
        variant: "tertiary" as const,
      },
    ],
    badge: {
      role: "Engenheira de Software Jr.",
      icon: "terminal",
    },
    imageAlt: "Michelly Coelho - Engenheira de Software e Integradora de IA",
  },
  fallback: {
    title: "Experiências temporariamente indisponíveis",
    description:
      "Não foi possível carregar minha trajetória profissional diretamente do banco de dados. Consulte meu currículo ou utilize um dos canais de contato abaixo:",
    downloadResume: "Baixar currículo em PDF",
    viewGithub: "Ver GitHub",
    contact: "Entre em contato",
  },
  about: {
    badge: "01 / Sobre",
    headline: "Sobre mim e trajetória profissional",
    bioTitle: "Sobre mim",
    coursesTitle: "Cursos e workshops",
    coursesDescription:
      "Especializações práticas e desenvolvimento técnico contínuo.",
    trajectoryTitle: "Trajetória e conquistas",
    trajectorySubtitle: "Experiência profissional e certificações acadêmicas",
    currentLabel: "Atual",
    credentialLabel: "Certificado",
    emptyExperiences: "Nenhum registro de experiência profissional encontrado.",
    emptyCertifications: "Nenhum certificado acadêmico encontrado.",
  },
  projects: {
    badge: "02 / Projetos",
    headline: "Projetos e criações",
    projectBreakdown: "Análise técnica do projeto",
    problemSolved: "Problema solucionado",
    primaryLanguage: "Principal linguagem",
    projectLabel: "Projeto",
    starsLabel: "Estrelas no GitHub",
    github: "GitHub",
    liveDemo: "Demonstração",
    empty: "Nenhum projeto publicado encontrado.",
    previous: "Anterior",
    next: "Próximo",
    paginationLabel: "Paginação de projetos",
  },
  skills: {
    badge: "03 / Habilidades",
    headline: "Tecnologias e competências",
    empty: "Nenhuma habilidade publicada até o momento.",
  },
  contact: {
    badge: "04 / Contato",
    headline: "Vamos construir algo resiliente juntos",
    form: {
      nameLabel: "Seu nome",
      namePlaceholder: "Digite seu nome",
      emailLabel: "Endereço de e-mail",
      emailPlaceholder: "voce@empresa.com",
      inquiryLabel: "Tipo de contato / oportunidade",
      inquiryPlaceholder: "Selecione o tipo de contato",
      inquiryOptions: [
        "Oportunidade de trabalho em período integral",
        "Contrato ou consultoria",
        "Colaboração em projetos",
        "Outro",
      ],
      messageLabel: "Mensagem",
      messagePlaceholder:
        "Conte-me sobre a visão do seu produto, desafios de engenharia ou necessidades da sua equipe...",
      submit: "Enviar mensagem",
      sending: "Enviando mensagem...",
      success: "Mensagem enviada com sucesso.",
      error:
        "Não foi possível enviar a mensagem. Tente novamente ou utilize o link de e-mail.",
      directCoordinates: "Contato direto",
      directEmail: "E-mail direto",
      basedIn: "Localização",
      location: "Brasil (ou remoto)",
      availability: "Disponível para oportunidades em período integral e contratos de alto impacto",
      connectOnline: "Conecte-se comigo",
      linkedIn: "LinkedIn",
      github: "GitHub",
      x: "X / Twitter",
      resume: "Currículo em PDF",
    },
  },
} as const;
