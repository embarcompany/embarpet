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
  benefitTitle: string;
  benefitCopy: string;
  benefits: string[];
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
    benefitTitle: "Uma alternativa técnica, sem escolhas por medo.",
    benefitCopy: "O compartimento de cargas não deve ser tratado como um plano B automático. Quando a rota e o perfil do pet apontam para essa operação, o valor está em organizar cada requisito com antecedência e clareza.",
    benefits: ["Mais possibilidades para diferentes portes", "Planejamento da caixa e da reserva com antecedência", "Leitura da rota completa, inclusive conexões"],
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
    slug: "viagem-na-cabine", label: "Viagem na cabine", eyebrow: "Pet próximo ao tutor", title: "Quando o seu pet pode viajar", titleHighlight: "na cabine com você.", intro: "A viagem na cabine mantém pet e tutor próximos durante o voo, mas depende dos limites de porte, peso, rota e regras da companhia aérea.", heroImage: "/embarpet-modalidade-viagem-cabine.jpg", heroAlt: "Cachorro observando a janela durante uma viagem na cabine", heroFacts: ["Proximidade com o tutor", "Critérios de porte e peso", "Regras variam por companhia"], whatTitle: "Como funciona a viagem na cabine?", whatCopy: "O pet viaja em bolsa ou caixa aprovada, acomodado conforme as regras da companhia. É uma possibilidade desejada por muitas famílias, mas só é indicada quando o perfil do pet e a rota atendem aos critérios vigentes.", howItWorks: [{ number:"01", title:"Analisamos os critérios", copy:"Porte, peso, espécie, rota e companhia aérea." }, { number:"02", title:"Definimos a bolsa ou caixa", copy:"A escolha precisa respeitar medidas e regras aplicáveis." }, { number:"03", title:"Organizamos documentos", copy:"A documentação acompanha o destino e o período da viagem." }, { number:"04", title:"Preparamos o embarque", copy:"A família recebe as orientações para o dia do voo." }], decisionTitle:"Quando a cabine pode ser a melhor alternativa?", decisionCopy:"Quando o pet se enquadra nos critérios e a rota permite, a cabine pode preservar a proximidade com o tutor. A análise verifica se essa preferência também é viável para a jornada inteira.", decisionPoints:["Pets dentro dos limites da companhia", "Rotas e conexões compatíveis", "Bolsa ou caixa aprovada para a cabine"], benefitTitle:"Perto do tutor, com critérios que protegem a jornada.", benefitCopy:"A cabine é desejada pela proximidade, mas a melhor decisão continua sendo a que respeita o porte, a bolsa, o voo e o bem-estar do pet do início ao fim.", benefits:["Pet e tutor compartilham o mesmo ambiente de voo", "Validação de medidas, peso e disponibilidade", "Orientações para uma acomodação adequada"], proofImage:"/embarpet-pet-na-cabine.jpeg", proofAlt:"Pet em uma bolsa de transporte dentro da aeronave", proofTitle:"Proximidade é importante. Viabilidade também.", proofCopy:"A cabine não é uma promessa automática. É uma modalidade possível quando os critérios operacionais e o bem-estar do pet caminham juntos.", faqs:[{ question:"Todo pet pequeno pode viajar na cabine?", answer:"Não. Além de porte e peso, cada companhia define critérios de bolsa, espécie, rota e disponibilidade." }, ...sharedFaqs], seo:{ title:"Viagem de Pet na Cabine | Embarpet", description:"Saiba quando um pet pode viajar na cabine e entenda os critérios de porte, rota, caixa de transporte e documentação internacional." },
  },
  "bagagem-acompanhada": {
    slug:"bagagem-acompanhada", label:"Bagagem acompanhada", eyebrow:"No mesmo voo da família", title:"Pet e tutor no mesmo itinerário,", titleHighlight:"com uma operação própria.", intro:"Na bagagem acompanhada, o pet embarca no mesmo voo do tutor em compartimento apropriado. A modalidade pede coordenação entre reserva, caixa, documentação e jornada aérea.", heroImage:"/embarpet-bagagem-acompanhada.webp", heroAlt:"Consultora Embarpet com pets em aeroporto", heroFacts:["Mesmo voo do tutor", "Compartimento apropriado", "Operação coordenada"], whatTitle:"Como funciona a bagagem acompanhada?", whatCopy:"O pet segue no mesmo itinerário do tutor, em caixa de transporte adequada e em compartimento apropriado da aeronave. A aprovação depende das regras da companhia, da rota e do perfil do animal.", howItWorks:[{ number:"01", title:"Conferimos a rota", copy:"Avaliamos companhia, conexões e disponibilidade." },{ number:"02", title:"Validamos o pet e a caixa", copy:"Porte, espécie e especificações da caixa orientam a reserva." },{ number:"03", title:"Coordenamos a documentação", copy:"Cada exigência é organizada dentro do cronograma." },{ number:"04", title:"Alinhamos o dia do voo", copy:"A família entende horários, entrega e retirada do pet." }], decisionTitle:"Quando essa modalidade pode fazer sentido?", decisionCopy:"Pode ser considerada quando tutor e pet seguem no mesmo voo, mas a cabine não se aplica ou não está disponível. A leitura da rota define se a operação é compatível.", decisionPoints:["Tutor e pet no mesmo voo", "Cabine indisponível ou não aplicável", "Caixa e documentação conforme regras vigentes"], benefitTitle:"O mesmo itinerário, com coordenação em cada ponto.", benefitCopy:"Aqui, a segurança está na conexão entre o roteiro da família e os requisitos da operação. A preparação evita que detalhes de reserva, caixa ou documentos virem surpresa no aeroporto.", benefits:["Tutor e pet seguem o mesmo planejamento de voo", "Reserva e caixa analisadas de forma conectada", "Orientação para entrega e retirada no aeroporto"], proofImage:"/embarpet-bagagem-acompanhada.png", proofAlt:"Consultora Embarpet com bolsas de transporte no aeroporto", proofTitle:"Uma mesma viagem, etapas bem coordenadas.", proofCopy:"A bagagem acompanhada funciona melhor quando a família entende a operação inteira — antes, durante e depois do voo.", faqs:[{ question:"Meu pet ficará perto de mim no avião?", answer:"O pet não viaja na cabine nesta modalidade. Ele segue em compartimento apropriado, no mesmo itinerário quando a rota e a reserva permitem." }, ...sharedFaqs], seo:{ title:"Bagagem Acompanhada para Pets | Embarpet", description:"Entenda como funciona a bagagem acompanhada para transporte internacional de pets no mesmo voo do tutor." },
  },
  "suporte-emocional": {
    slug:"suporte-emocional", label:"Suporte emocional", eyebrow:"Orientação responsável", title:"Uma análise responsável para casos de", titleHighlight:"suporte emocional.", intro:"O suporte emocional exige uma leitura cuidadosa da documentação, da rota e das regras aplicáveis. Não há promessa de aceitação: existe orientação para entender o que pode ser considerado.", heroImage:"/embarpet-suporte-emocional.jpg", heroAlt:"Família e pet dentro de uma aeronave", heroFacts:["Regras variam por companhia", "Documentação é decisiva", "Alternativas também são avaliadas"], whatTitle:"Como funciona essa orientação?", whatCopy:"A Embarpet analisa o contexto apresentado, os documentos e as regras da companhia aérea ou do destino. Se a modalidade não se aplicar, a conversa evolui para possibilidades de transporte viáveis para a viagem.", howItWorks:[{ number:"01", title:"Entendemos o contexto", copy:"A necessidade e a rota são consideradas com cuidado." },{ number:"02", title:"Lemos as regras vigentes", copy:"Companhia, destino e tipo de documento importam." },{ number:"03", title:"Orientamos os documentos", copy:"Explicamos o que precisa ser confirmado antes da viagem." },{ number:"04", title:"Indicamos próximos passos", copy:"A análise pode apontar alternativas quando necessário." }], decisionTitle:"O que precisa ser confirmado antes de seguir?", decisionCopy:"A aceitação depende de regras que podem variar entre companhias, destinos e tipos de documento. Por isso, a orientação responsável evita promessas e começa pela análise do caso.", decisionPoints:["Critérios e políticas da companhia aérea", "Documentação aplicável ao contexto", "Alternativas de embarque quando necessário"], benefitTitle:"Acolher a necessidade também é orientar com verdade.", benefitCopy:"O papel da Embarpet é verificar o cenário com responsabilidade e mostrar o próximo passo possível — inclusive quando a modalidade não se aplica e outra solução protege melhor a viagem.", benefits:["Leitura das políticas e documentos aplicáveis", "Expectativa alinhada antes da compra ou reserva", "Alternativas avaliadas quando necessário"], proofImage:"/embarpet-suporte-emocional.jpg", proofAlt:"Tutor com pet em contexto de viagem aérea", proofTitle:"Clareza antes de criar expectativa.", proofCopy:"Quando se trata de suporte emocional, nossa função é traduzir o que as regras permitem e construir um próximo passo responsável para a família e o pet.", faqs:[{ question:"Suporte emocional garante que meu pet viaje na cabine?", answer:"Não. A aceitação depende das políticas vigentes, documentação e análise da companhia aérea. A Embarpet não promete aprovação antes dessa verificação." }, ...sharedFaqs], seo:{ title:"Suporte Emocional e Viagem com Pets | Embarpet", description:"Entenda como a Embarpet orienta casos de suporte emocional em viagens internacionais com pets, sem promessas de aprovação." },
  },
};

/** Conteúdo de tensão e resolução: evita uma LP técnica demais e faz cada
 * modalidade responder à dúvida que a família realmente traz para a conversa. */
export const modalityStorytelling: Record<ModalitySlug, {
  painTitle: string;
  painCopy: string;
  painPoints: string[];
  reassuranceTitle: string;
  reassuranceCopy: string;
  reassurancePoints: string[];
}> = {
  "viagem-na-cabine": {
    painTitle: "Querer o pet perto não elimina as dúvidas da viagem.",
    painCopy: "Muitas famílias chegam com a cabine como primeira preferência — e com receio de descobrir tarde demais que peso, bolsa, conexão ou companhia mudam o plano. A ansiedade não está só no voo: está em não saber o que é realmente possível.",
    painPoints: ["Medo de criar expectativa antes de validar a rota", "Insegurança sobre peso, medidas e acomodação", "Receio de uma regra mudar perto do embarque"],
    reassuranceTitle: "A proximidade é considerada. O contexto decide.",
    reassuranceCopy: "Em vez de prometer cabine, a Embarpet verifica os critérios que sustentam essa possibilidade e apresenta alternativas quando a jornada pede outra escolha.",
    reassurancePoints: ["Preferência da família considerada desde o início", "Critérios conferidos antes de reservar", "Alternativas explicadas sem perder a clareza"],
  },
  "bagagem-acompanhada": {
    painTitle: "O mesmo voo não significa que tudo já está resolvido.",
    painCopy: "Quando pet e tutor viajam no mesmo itinerário, a expectativa é de simplicidade. Mas reserva, caixa, conexão, horários de entrega e documentos precisam conversar entre si para que o dia do voo não vire uma sequência de improvisos.",
    painPoints: ["Dúvida sobre onde e quando entregar o pet", "Reserva do tutor sem a validação da operação do animal", "Documentos e caixa preparados fora do cronograma"],
    reassuranceTitle: "Uma viagem só funciona bem quando as etapas se encontram.",
    reassuranceCopy: "Acompanhamos a lógica do itinerário inteiro para alinhar o pet à viagem da família — não como um detalhe separado no fim da reserva.",
    reassurancePoints: ["Roteiro do tutor e do pet lidos juntos", "Orientação para os marcos do aeroporto", "Próximos passos objetivos antes do embarque"],
  },
  "compartimento-de-cargas": {
    painTitle: "A dúvida não deveria virar medo por falta de informação.",
    painCopy: "É comum ouvir relatos incompletos e imaginar que o compartimento de cargas é sempre a última opção. Na prática, a segurança está em entender a estrutura da operação, a rota, a caixa e o perfil do pet — antes de aceitar ou descartar qualquer possibilidade.",
    painPoints: ["Receio por informações genéricas ou contraditórias", "Preocupação com porte, caixa e conexões", "Medo de descobrir exigências perto da data da viagem"],
    reassuranceTitle: "Clareza técnica transforma receio em decisão possível.",
    reassuranceCopy: "Quando essa modalidade é compatível com a viagem, ela é planejada com os requisitos certos. Quando não é, a análise aponta outro caminho — sem forçar uma resposta pronta.",
    reassurancePoints: ["Leitura individual de porte, rota e espécie", "Planejamento antecipado da operação", "Decisão baseada em critérios, não em suposições"],
  },
  "suporte-emocional": {
    painTitle: "A necessidade da família merece acolhimento, não promessa vazia.",
    painCopy: "Em casos de suporte emocional, as regras variam e as informações disponíveis nem sempre são claras. A maior frustração é descobrir uma limitação depois de comprar a passagem ou organizar toda a viagem em torno de uma expectativa que não foi validada.",
    painPoints: ["Insegurança sobre aceitação pela companhia", "Documentos sem confirmação de aplicabilidade", "Receio de perder tempo ou tomar decisões irreversíveis"],
    reassuranceTitle: "A resposta responsável também protege a sua viagem.",
    reassuranceCopy: "Lemos o caso com cuidado, explicamos o que precisa ser confirmado e indicamos o próximo caminho viável — mesmo que ele seja diferente da expectativa inicial.",
    reassurancePoints: ["Orientação honesta antes de qualquer compromisso", "Critérios e documentos avaliados com contexto", "Alternativas quando a modalidade não se aplica"],
  },
};

/**
 * Mapa de fotografia para a próxima direção de arte. Enquanto a curadoria não
 * está fechada, a interface usa estes placeholders para validar escala e ritmo.
 */
export const modalityVisualPlan: Record<ModalitySlug, {
  label: string;
  title: string;
  description: string;
  direction: "cabin" | "luggage" | "cargo" | "support";
}> = {
  "viagem-na-cabine": {
    label: "Imagem de contexto",
    title: "O pet perto do tutor, antes do embarque.",
    description: "Foto real de pet, tutor e bolsa de transporte em ambiente de aeroporto ou aeronave. O foco é proximidade com responsabilidade — não uma promessa automática de cabine.",
    direction: "cabin",
  },
  "bagagem-acompanhada": {
    label: "Imagem de contexto",
    title: "O itinerário da família começa antes do portão.",
    description: "Foto real de tutor, pet e caixa ou bolsa no aeroporto. A cena precisa mostrar coordenação e preparação, não apenas um pet posando para a câmera.",
    direction: "luggage",
  },
  "compartimento-de-cargas": {
    label: "Imagem de contexto",
    title: "Operação real, explicada com clareza.",
    description: "Foto de caixa adequada, equipe ou área operacional do aeroporto. A imagem existe para desmistificar a modalidade com contexto técnico e humano.",
    direction: "cargo",
  },
  "suporte-emocional": {
    label: "Imagem de contexto",
    title: "A necessidade da família também faz parte da análise.",
    description: "Foto real de família com pet em contexto de viagem. A direção deve ser acolhedora e sóbria, sem sugerir que a aceitação é garantida.",
    direction: "support",
  },
};
