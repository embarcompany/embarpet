export type DestinationFaq = readonly [question: string, answer: string];

export type DestinationLandingContent = {
  slug: string;
  analyticsKey: string;
  country: string;
  countryCode: string;
  flag: string;
  meta: { title: string; description: string };
  hero: {
    titleLead: string;
    titleHighlight: string;
    intro: string;
    introHighlight: string;
  };
  methodArrivalCopy: string;
  footerNote: string;
  faq: readonly DestinationFaq[];
  context: {
    title: string;
    titleHighlight: string;
    intro: string;
    introHighlight: string;
    cards: readonly {
      place: string;
      label: string;
      image: string;
      imageAlt: string;
      copy: string;
      route: string;
      tone: string;
    }[];
  };
};

/**
 * Fonte única de conteúdo de cada LP de destino. Novas rotas reutilizam a
 * mesma página e somente adicionam uma configuração aqui.
 */
export const unitedStatesDestination: DestinationLandingContent = {
  slug: "estados-unidos",
  analyticsKey: "us",
  country: "Estados Unidos",
  countryCode: "US",
  flag: "/flags/us.svg",
  meta: {
    title: "Transporte Internacional de Pets para os Estados Unidos | Embarpet",
    description: "Planeje o transporte internacional do seu pet para os Estados Unidos com análise de rota, documentação, CVI e operação de embarque.",
  },
  hero: {
    titleLead: "Leve seu pet para os",
    titleHighlight: "Estados Unidos",
    intro: "Planeje o transporte internacional do seu pet com análise da rota, documentação, CVI e operação de embarque.",
    introHighlight: "Conte sobre seu pet e a sua viagem.",
  },
  methodArrivalCopy: "A Embarpet coordena cada etapa da viagem para que o seu pet chegue aos Estados Unidos com você.",
  footerNote: "Planejamento individual para a viagem do seu pet aos Estados Unidos.",
  faq: [
    ["Quais documentos meu pet precisa para viajar para os Estados Unidos?", "A documentação para levar um pet aos Estados Unidos depende do perfil do animal, da rota e das exigências aplicáveis no momento da viagem. A análise considera vacinas, certificados, prazos e a operação escolhida antes do embarque."],
    ["Preciso de CVI para viajar com meu pet para os Estados Unidos?", "O CVI, ou Certificado Veterinário Internacional, pode fazer parte do processo de saída do Brasil com um animal de estimação. A necessidade e o fluxo correto são confirmados conforme a rota e as exigências vigentes para a viagem."],
  ],
  context: {
    title: "O lugar onde sua família vai viver",
    titleHighlight: "também faz parte do plano.",
    intro: "Uma viagem para os Estados Unidos não é uma rota genérica.",
    introHighlight: "O destino final ajuda a definir como o seu pet chega com você.",
    cards: [
      { place: "Flórida", label: "Rota muito procurada", image: "https://images.unsplash.com/photo-1661135650005-943711eef1e7?auto=format&fit=crop&w=1400&q=85", imageAlt: "Arquitetura tropical e palmeiras em Miami, Flórida", copy: "Muitas famílias brasileiras escolhem a Flórida para começar uma nova fase perto de quem amam.", route: "A rota é lida de acordo com o aeroporto, o período e o perfil do seu pet.", tone: "sun" },
      { place: "Nova York e Nordeste", label: "Conexões importam", image: "https://images.unsplash.com/photo-1629570772056-6344e30d3592?auto=format&fit=crop&w=1400&q=85", imageAlt: "Skyline de Manhattan visto da água", copy: "Quando a família chega ao Nordeste, cada trecho da viagem precisa fazer sentido até o destino final.", route: "Origem, conexão e operação são avaliadas juntas antes de decidir.", tone: "city" },
      { place: "Califórnia e Costa Oeste", label: "Uma jornada mais longa", image: "https://images.unsplash.com/photo-1446038236174-69712e24d137?auto=format&fit=crop&w=1400&q=85", imageAlt: "Falésias e Oceano Pacífico na costa da Califórnia", copy: "Para chegar mais longe com o seu pet, o planejamento começa antes de definir o dia do voo.", route: "A viagem é construída olhando a rota completa, não apenas a passagem.", tone: "coast" },
    ],
  },
};

export const destinationLandingPages: Record<string, DestinationLandingContent> = {
  [unitedStatesDestination.slug]: unitedStatesDestination,
};

export const getDestinationLanding = (slug: string) => destinationLandingPages[slug];
