export type ModalitySlug = "viagem-na-cabine" | "bagagem-acompanhada" | "compartimento-de-cargas" | "suporte-emocional";

export type ModalityContent = {
  slug: ModalitySlug;
  label: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  heroFacts: string[];
  whatTitle: string;
  whatCopy: string;
  howItWorks: Array<{ number: string; title: string; copy: string }>;
  decisionTitle: string;
  decisionCopy: string;
  decisionPoints: string[];
  proofImage: string;
  proofAlt: string;
  proofTitle: string;
  proofCopy: string;
  faqs: Array<{ question: string; answer: string }>;
  seo: { title: string; description: string };
};
const sharedFaqs = [
  {
    question: "Como saber qual modalidade é adequada para meu pet?",
    answer: "A decisão depende da rota, espécie, porte, caixa de transporte, prazo, companhia aérea e regras vigentes. A análise da Embarpet organiza essas variáveis antes de indicar os próximos passos.",
  },
  {
    question: "A documentação é a mesma para todos os destinos?",
    answer: "Não. Cada destino pode exigir documentos, prazos e validações próprios. Por isso a rota precisa ser lida junto com o perfil do pet e a modalidade possível.",
  },
];

/**
 * Contrato editorial da família de LPs. A composição é única; somente a
 * estratégia, a prova e as ressalvas mudam por modalidade.
 */
export const modalityContent: Record<ModalitySlug, ModalityContent> = {
  "compartimento-de-cargas": {
    slug: "compartimento-de-cargas",
    label: "Compartimento de cargas",
    eyebrow: "Transporte de animais vivos por avião",
    title: "Uma operação especializada para o seu pet viajar",
    titleHighlight: "com contexto.",
    intro: "O compartimento de cargas é uma modalidade aérea própria para animais vivos. Em muitas rotas, portes e perfis de viagem, ele pode ser a alternativa mais adequada para organizar o embarque do seu pet.",
    heroImage: "/embarpet-compartimento-cargas.jpg",
    heroAlt: "Pet em caixa de transporte na esteira operacional de um aeroporto",
    heroFacts: ["Diferentes portes e rotas", "Reserva e documentação próprias", "Análise individual antes da decisão"],
    whatTitle: "O que é o compartimento de cargas?",
    whatCopy: "É a modalidade em que o pet viaja em uma caixa de transporte adequada, em área apropriada da aeronave e dentro de uma operação específica para animais vivos. Não é uma solução de última hora: é uma possibilidade planejada com critérios de rota, companhia aérea, porte e documentação.",
    howItWorks: [
      { number: "01", title: "Lemos a rota", copy: "Origem, destino, conexão, prazo e regras atualizadas orientam a primeira decisão." },
      { number: "02", title: "Validamos o perfil do pet", copy: "Espécie, porte, raça, caixa de transporte e condição da viagem entram na análise." },
      { number: "03", title: "Organizamos a operação", copy: "Reserva, documentação, cronograma e orientações são conectados para o embarque." },
      { number: "04", title: "Acompanhamos os marcos", copy: "A família recebe clareza sobre os próximos passos conforme o serviço contratado." },
    ],
    decisionTitle: "Quando essa modalidade pode fazer sentido?",
    decisionCopy: "Ela costuma ser considerada quando o porte do pet, a rota, a companhia aérea ou a configuração da viagem não permitem a cabine. Também pode ser uma alternativa mais viável para famílias que precisam conciliar conexões, prazos e uma operação internacional completa.",
    decisionPoints: ["Pets de portes diversos, conforme critérios da companhia", "Rotas internacionais com exigências operacionais específicas", "Viagens em que tutor e pet podem seguir itinerários diferentes"],
    proofImage: "/embarpet-carga-viva-operacao.jpeg",
    proofAlt: "Equipe Embarpet com caixas de transporte no aeroporto",
    proofTitle: "A escolha não é sobre rótulo. É sobre a jornada possível.",
    proofCopy: "Falamos abertamente sobre compartimento de cargas porque confiança exige clareza. A modalidade é avaliada com responsabilidade, sem promessas prontas, para encontrar a alternativa coerente com a viagem de cada família.",
    faqs: [
      { question: "Meu pet viaja no mesmo avião que eu?", answer: "Isso depende da reserva, da rota e do serviço disponível. Em alguns casos o tutor segue no mesmo voo; em outros, a operação precisa ser planejada de outra forma." },
      { question: "Como é escolhida a caixa de transporte?", answer: "A caixa precisa respeitar o porte do pet, ventilação, posição natural, modalidade e especificações da companhia aérea. A orientação é feita dentro da análise da viagem." },
      ...sharedFaqs,
    ],
    seo: { title: "Compartimento de Cargas para Pets | Embarpet", description: "Entenda como funciona o transporte internacional de pets em compartimento de cargas e receba uma análise da rota, do pet e da documentação." },
  },
  "viagem-na-cabine": {
    slug: "viagem-na-cabine", label: "Viagem na cabine", eyebrow: "Pet próximo ao tutor", title: "Quando o seu pet pode viajar", titleHighlight: "na cabine com você.", intro: "A viagem na cabine mantém pet e tutor próximos durante o voo, mas depende dos limites de porte, peso, rota e regras da companhia aérea.", heroImage: "/embarpet-modalidade-viagem-cabine.jpg", heroAlt: "Cachorro observando a janela durante uma viagem na cabine", heroFacts: ["Proximidade com o tutor", "Critérios de porte e peso", "Regras variam por companhia"], whatTitle: "Como funciona a viagem na cabine?", whatCopy: "O pet viaja em bolsa ou caixa aprovada, acomodado conforme as regras da companhia. É uma possibilidade desejada por muitas famílias, mas só é indicada quando o perfil do pet e a rota atendem aos critérios vigentes.", howItWorks: [{ number:"01", title:"Analisamos os critérios", copy:"Porte, peso, espécie, rota e companhia aérea." }, { number:"02", title:"Definimos a bolsa ou caixa", copy:"A escolha precisa respeitar medidas e regras aplicáveis." }, { number:"03", title:"Organizamos documentos", copy:"A documentação acompanha o destino e o período da viagem." }, { number:"04", title:"Preparamos o embarque", copy:"A família recebe as orientações para o dia do voo." }], decisionTitle:"Quando a cabine pode ser a melhor alternativa?", decisionCopy:"Quando o pet se enquadra nos critérios e a rota permite, a cabine pode preservar a proximidade com o tutor. A análise verifica se essa preferência também é viável para a jornada inteira.", decisionPoints:["Pets dentro dos limites da companhia", "Rotas e conexões compatíveis", "Bolsa ou caixa aprovada para a cabine"], proofImage:"/embarpet-pet-na-cabine.jpeg", proofAlt:"Pet em uma bolsa de transporte dentro da aeronave", proofTitle:"Proximidade é importante. Viabilidade também.", proofCopy:"A cabine não é uma promessa automática. É uma modalidade possível quando os critérios operacionais e o bem-estar do pet caminham juntos.", faqs:[{ question:"Todo pet pequeno pode viajar na cabine?", answer:"Não. Além de porte e peso, cada companhia define critérios de bolsa, espécie, rota e disponibilidade." }, ...sharedFaqs], seo:{ title:"Viagem de Pet na Cabine | Embarpet", description:"Saiba quando um pet pode viajar na cabine e entenda os critérios de porte, rota, caixa de transporte e documentação internacional." },
  },
  "bagagem-acompanhada": {
    slug:"bagagem-acompanhada", label:"Bagagem acompanhada", eyebrow:"No mesmo voo da família", title:"Pet e tutor no mesmo itinerário,", titleHighlight:"com uma operação própria.", intro:"Na bagagem acompanhada, o pet embarca no mesmo voo do tutor em compartimento apropriado. A modalidade pede coordenação entre reserva, caixa, documentação e jornada aérea.", heroImage:"/embarpet-bagagem-acompanhada.webp", heroAlt:"Consultora Embarpet com pets em aeroporto", heroFacts:["Mesmo voo do tutor", "Compartimento apropriado", "Operação coordenada"], whatTitle:"Como funciona a bagagem acompanhada?", whatCopy:"O pet segue no mesmo itinerário do tutor, em caixa de transporte adequada e em compartimento apropriado da aeronave. A aprovação depende das regras da companhia, da rota e do perfil do animal.", howItWorks:[{ number:"01", title:"Conferimos a rota", copy:"Avaliamos companhia, conexões e disponibilidade." },{ number:"02", title:"Validamos o pet e a caixa", copy:"Porte, espécie e especificações da caixa orientam a reserva." },{ number:"03", title:"Coordenamos a documentação", copy:"Cada exigência é organizada dentro do cronograma." },{ number:"04", title:"Alinhamos o dia do voo", copy:"A família entende horários, entrega e retirada do pet." }], decisionTitle:"Quando essa modalidade pode fazer sentido?", decisionCopy:"Pode ser considerada quando tutor e pet seguem no mesmo voo, mas a cabine não se aplica ou não está disponível. A leitura da rota define se a operação é compatível.", decisionPoints:["Tutor e pet no mesmo voo", "Cabine indisponível ou não aplicável", "Caixa e documentação conforme regras vigentes"], proofImage:"/embarpet-bagagem-acompanhada.png", proofAlt:"Consultora Embarpet com bolsas de transporte no aeroporto", proofTitle:"Uma mesma viagem, etapas bem coordenadas.", proofCopy:"A bagagem acompanhada funciona melhor quando a família entende a operação inteira — antes, durante e depois do voo.", faqs:[{ question:"Meu pet ficará perto de mim no avião?", answer:"O pet não viaja na cabine nesta modalidade. Ele segue em compartimento apropriado, no mesmo itinerário quando a rota e a reserva permitem." }, ...sharedFaqs], seo:{ title:"Bagagem Acompanhada para Pets | Embarpet", description:"Entenda como funciona a bagagem acompanhada para transporte internacional de pets no mesmo voo do tutor." },
  },
  "suporte-emocional": {
    slug:"suporte-emocional", label:"Suporte emocional", eyebrow:"Orientação responsável", title:"Uma análise responsável para casos de", titleHighlight:"suporte emocional.", intro:"O suporte emocional exige uma leitura cuidadosa da documentação, da rota e das regras aplicáveis. Não há promessa de aceitação: existe orientação para entender o que pode ser considerado.", heroImage:"/embarpet-suporte-emocional.jpg", heroAlt:"Família e pet dentro de uma aeronave", heroFacts:["Regras variam por companhia", "Documentação é decisiva", "Alternativas também são avaliadas"], whatTitle:"Como funciona essa orientação?", whatCopy:"A Embarpet analisa o contexto apresentado, os documentos e as regras da companhia aérea ou do destino. Se a modalidade não se aplicar, a conversa evolui para possibilidades de transporte viáveis para a viagem.", howItWorks:[{ number:"01", title:"Entendemos o contexto", copy:"A necessidade e a rota são consideradas com cuidado." },{ number:"02", title:"Lemos as regras vigentes", copy:"Companhia, destino e tipo de documento importam." },{ number:"03", title:"Orientamos os documentos", copy:"Explicamos o que precisa ser confirmado antes da viagem." },{ number:"04", title:"Indicamos próximos passos", copy:"A análise pode apontar alternativas quando necessário." }], decisionTitle:"O que precisa ser confirmado antes de seguir?", decisionCopy:"A aceitação depende de regras que podem variar entre companhias, destinos e tipos de documento. Por isso, a orientação responsável evita promessas e começa pela análise do caso.", decisionPoints:["Critérios e políticas da companhia aérea", "Documentação aplicável ao contexto", "Alternativas de embarque quando necessário"], proofImage:"/embarpet-suporte-emocional.jpg", proofAlt:"Tutor com pet em contexto de viagem aérea", proofTitle:"Clareza antes de criar expectativa.", proofCopy:"Quando se trata de suporte emocional, nossa função é traduzir o que as regras permitem e construir um próximo passo responsável para a família e o pet.", faqs:[{ question:"Suporte emocional garante que meu pet viaje na cabine?", answer:"Não. A aceitação depende das políticas vigentes, documentação e análise da companhia aérea. A Embarpet não promete aprovação antes dessa verificação." }, ...sharedFaqs], seo:{ title:"Suporte Emocional e Viagem com Pets | Embarpet", description:"Entenda como a Embarpet orienta casos de suporte emocional em viagens internacionais com pets, sem promessas de aprovação." },
  },
};
