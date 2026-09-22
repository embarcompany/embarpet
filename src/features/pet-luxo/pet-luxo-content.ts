export type PetLuxoFaq = readonly [question: string, answer: string];

/**
 * Fonte única de conteúdo da página PetLuxo. Oferta premium condicionada à
 * análise — não promete preço nem elegibilidade automática (docs/strategy-audit).
 */
export const petLuxoContent = {
  seo: {
    title: "PetLuxo | Acompanhamento Dedicado para a Viagem do seu Pet | Embarpet",
    description: "Conheça o PetLuxo: um consultor especializado acompanha o seu pet do planejamento até o encontro com a família, em cada marco da viagem internacional.",
  },
  hero: {
    eyebrow: "Acompanhamento especializado",
    titleLead: "Alguém acompanha o seu pet",
    titleHighlight: "como você acompanharia.",
    copy: "PetLuxo é o acompanhamento dedicado da Embarpet: um consultor especializado conduz o seu pet com presença física em cada marco da jornada, do planejamento até o encontro com a família.",
    heroFacts: ["Consultor dedicado", "Coordenação ponta a ponta", "Elegibilidade condicionada à análise"],
  },
  pain: {
    eyebrow: "Antes de decidir",
    title: "Delegar a jornada não pode significar perder a presença.",
    copy: "Quando a família não pode acompanhar o pet no mesmo voo, a maior ansiedade não é documental — é não saber quem está com ele em cada etapa, ou sentir que ele virou apenas mais uma caixa dentro de uma operação.",
    points: [
      "Medo de o pet ficar sem uma pessoa de referência durante a viagem",
      "Insegurança sobre o que acontece entre a coleta e o embarque",
      "Receio de que uma operação genérica não note o que é específico do seu pet",
    ],
  },
  process: {
    eyebrow: "Como funciona o acompanhamento",
    title: "Presença combinada em cada etapa da jornada.",
    copy: "O consultor não substitui a documentação e a operação já validadas — ele soma presença física nos marcos que mais geram ansiedade à distância.",
    steps: [
      { number: "01", title: "Planejamento individual", copy: "Uma leitura própria da rota, do pet e da rotina da família antes de qualquer coleta." },
      { number: "02", title: "Presença especializada", copy: "O consultor acompanha o pet nos marcos combinados: coleta, check-in e conexões." },
      { number: "03", title: "Coordenação até o encontro", copy: "Atualizações nos marcos definidos até a entrega planejada com a família." },
    ],
  },
  eligibility: {
    eyebrow: "Para quem é",
    title: "Uma oferta condicionada, não universal.",
    copy: "O PetLuxo é indicado hoje para pets de porte pequeno e depende da leitura da rota, da companhia aérea e da análise do caso. Não é a modalidade padrão de embarque — é um serviço adicional de acompanhamento.",
    points: [
      "Pets de porte pequeno, conforme critérios avaliados na análise",
      "Famílias que não podem viajar no mesmo voo do pet",
      "Rotas em que a presença de um consultor faz diferença real na operação",
    ],
  },
  faqs: [
    ["O PetLuxo substitui a documentação e a análise de rota?", "Não. O PetLuxo soma um consultor presente fisicamente nos marcos da viagem; a documentação, elegibilidade e modalidade de embarque continuam sendo definidas pela análise do caso."],
    ["Qual o valor do PetLuxo?", "O escopo e o investimento do PetLuxo são definidos após a análise da rota, do porte do pet e da disponibilidade operacional — não há valor fechado sem essa avaliação."],
    ["O PetLuxo está disponível para qualquer rota?", "A disponibilidade depende da rota, da companhia aérea e da agenda de consultores. Isso é confirmado durante a análise, junto com a elegibilidade do pet."],
    ["Meu pet precisa ser pequeno para usar o PetLuxo?", "Hoje a elegibilidade prioriza pets de porte pequeno. Casos diferentes podem ser avaliados individualmente durante a análise."],
  ] satisfies PetLuxoFaq[],
  cases: [
    { image: "/case-leandro-hassum.jpeg", alt: "Leandro Hassum e equipe Embarpet no aeroporto", label: "Acompanhamento real" },
    { image: "/case-talles-magno.jpg", alt: "Tutor com pet em Nova York", label: "Encontro planejado" },
    { image: "/case-renato-paiva.jpeg", alt: "Família atendida pela Embarpet durante uma jornada internacional", label: "Presença em cada etapa" },
  ],
};
