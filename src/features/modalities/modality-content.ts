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
  whatTitleHighlight: string;
  whatCards: Array<{ title: string; copy: string }>;
  whatImage: string;
  whatImageAlt: string;
  howItWorks: Array<{ number: string; title: string; copy: string }>;
  decisionTitle: string;
  decisionCopy: string;
  decisionPoints: string[];
  benefitTitle: string;
  benefitCopy: string;
  benefits: string[];
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
    title: "No compartimento de cargas, uma operação especializada para o seu pet viajar",
    titleHighlight: "com contexto.",
    intro: "O compartimento de cargas é uma modalidade aérea própria para animais vivos, em área pressurizada e climatizada da aeronave. Em muitas rotas, portes e perfis de viagem, ele pode ser a alternativa mais adequada para organizar o embarque do seu pet.",
    heroImage: "/embarpet-compartimento-cargas.jpg",
    heroAlt: "Pet em caixa de transporte na esteira operacional de um aeroporto",
    heroFacts: ["Operação de carga viva pressurizada", "Reserva e documentação próprias", "Análise individual por raça e porte"],
    whatTitle: "Não é um plano B: é uma",
    whatTitleHighlight: "operação própria.",
    whatCards: [
      { title: "Como funciona", copy: "Caixa adequada, na área do porão pressurizada e climatizada para animais vivos, com a mesma pressurização da cabine." },
      { title: "Quando é usada", copy: "Não é solução de última hora: é planejada com antecedência conforme o perfil do pet e a rota." },
      { title: "O que entra na análise", copy: "Rota, companhia aérea, porte, raça e documentação." },
    ],
    whatImage: "/embarpet-carga-viva-operacao.jpeg",
    whatImageAlt: "Equipe Embarpet com caixas de transporte no aeroporto",
    howItWorks: [
      { number: "01", title: "Lemos a rota", copy: "Origem, destino, conexão, prazo e regras atualizadas orientam a primeira decisão." },
      { number: "02", title: "Validamos o perfil do pet", copy: "Espécie, porte, raça, caixa de transporte e condição da viagem entram na análise." },
      { number: "03", title: "Organizamos a operação", copy: "Reserva, documentação, cronograma e orientações são conectados para o embarque." },
      { number: "04", title: "Acompanhamos os marcos", copy: "A família recebe clareza sobre os próximos passos conforme o serviço contratado." },
    ],
    decisionTitle: "Quando essa modalidade pode fazer sentido?",
    decisionCopy: "Ela costuma ser considerada quando o porte do pet, a rota, a companhia aérea ou a configuração da viagem não permitem a cabine. Também pode ser uma alternativa mais viável para famílias que precisam conciliar conexões, prazos e uma operação internacional completa.",
    decisionPoints: ["Pets de portes diversos, conforme critérios da companhia", "Cães e gatos sem focinho curto (raças braquicefálicas) têm restrição ou análise adicional", "Rotas e datas fora de janelas de calor extremo, quando aplicável"],
    benefitTitle: "Uma alternativa técnica, sem escolhas por medo.",
    benefitCopy: "O compartimento de cargas não deve ser tratado como um plano B automático. Quando a rota e o perfil do pet apontam para essa operação, o valor está em organizar cada requisito com antecedência e clareza.",
    benefits: ["Mais possibilidades para diferentes portes", "Planejamento da caixa e da reserva com antecedência", "Leitura da rota completa, inclusive conexões"],
    faqs: [
      { question: "O porão do avião é seguro para o meu pet?", answer: "A área reservada a animais vivos no porão é pressurizada e mantida em temperatura controlada, seguindo padrões internacionais de transporte de animais vivos. Não é a mesma coisa que uma área de carga comum. Dados públicos do setor nos EUA mostram taxas de incidente muito baixas nos últimos anos, mas o risco real está concentrado na operação em solo (embarque, desembarque, tempo de espera na pista), por isso rota, horário e época do ano fazem parte da análise." },
      { question: "Meu pet pode viajar no compartimento de cargas se for de focinho curto (braquicefálico)?", answer: "Raças como buldogue, pug, shih tzu e persa têm maior risco respiratório sob estresse e calor, e a maioria das companhias aéreas restringe ou proíbe essas raças no porão. Cada caso é avaliado individualmente antes de indicar essa modalidade." },
      { question: "Meu pet viaja no mesmo avião que eu?", answer: "Isso depende da reserva, da rota e do serviço disponível. Em alguns casos o tutor segue no mesmo voo; em outros, a operação precisa ser planejada de outra forma." },
      { question: "Como é escolhida a caixa de transporte?", answer: "A caixa precisa respeitar o porte do pet, ventilação, posição natural, modalidade e especificações da companhia aérea. A orientação é feita dentro da análise da viagem." },
      ...sharedFaqs,
    ],
    seo: { title: "Compartimento de Cargas para Pets | Embarpet", description: "Entenda como funciona o transporte internacional de pets em compartimento de cargas e receba uma análise da rota, do pet e da documentação." },
  },
  "viagem-na-cabine": {
    slug: "viagem-na-cabine", label: "Viagem na cabine", eyebrow: "Pet próximo ao tutor", title: "Quando o seu pet pode viajar", titleHighlight: "na cabine com você.", intro: "A viagem na cabine mantém pet e tutor próximos durante o voo, mas depende dos limites de porte, peso, rota e regras da companhia aérea.", heroImage: "/embarpet-modalidade-viagem-cabine.jpg", heroAlt: "Cachorro observando a janela durante uma viagem na cabine", heroFacts: ["Proximidade com o tutor", "Algumas companhias aceitam até 8–10kg com bolsa", "Regras variam por companhia"], whatTitle: "Proximidade funciona quando a", whatTitleHighlight: "rota permite.", whatCards: [{ title: "Como funciona", copy: "Bolsa ou caixa aprovada, acomodada junto ao tutor conforme as regras da companhia." }, { title: "Quando é usada", copy: "Desejada por muitas famílias, mas só indicada quando o perfil do pet atende aos critérios vigentes." }, { title: "O que entra na análise", copy: "Porte, peso, espécie, rota e política da companhia aérea." }], whatImage: "/embarpet-pet-na-cabine.jpeg", whatImageAlt: "Pet em uma bolsa de transporte dentro da aeronave", howItWorks: [{ number:"01", title:"Analisamos os critérios", copy:"Porte, peso, espécie, rota e companhia aérea." }, { number:"02", title:"Definimos a bolsa ou caixa", copy:"A escolha precisa respeitar medidas e regras aplicáveis." }, { number:"03", title:"Organizamos documentos", copy:"A documentação acompanha o destino e o período da viagem." }, { number:"04", title:"Preparamos o embarque", copy:"A família recebe as orientações para o dia do voo." }], decisionTitle:"Quando a cabine pode ser a melhor alternativa?", decisionCopy:"Quando o pet se enquadra nos critérios e a rota permite, a cabine pode preservar a proximidade com o tutor. A análise verifica se essa preferência também é viável para a jornada inteira.", decisionPoints:["Pets dentro dos limites da companhia", "Rotas e conexões compatíveis", "Bolsa ou caixa aprovada para a cabine"], benefitTitle:"Perto do tutor, com critérios que protegem a jornada.", benefitCopy:"A cabine é desejada pela proximidade, mas a melhor decisão continua sendo a que respeita o porte, a bolsa, o voo e o bem-estar do pet do início ao fim.", benefits:["Pet e tutor compartilham o mesmo ambiente de voo", "Validação de medidas, peso e disponibilidade", "Orientações para uma acomodação adequada"], faqs:[{ question:"Todo pet pequeno pode viajar na cabine?", answer:"Não. Além de porte e peso, cada companhia define critérios de bolsa, espécie, rota e disponibilidade." }, ...sharedFaqs], seo:{ title:"Viagem de Pet na Cabine | Embarpet", description:"Saiba quando um pet pode viajar na cabine e entenda os critérios de porte, rota, caixa de transporte e documentação internacional." },
  },
  "bagagem-acompanhada": {
    slug:"bagagem-acompanhada", label:"Bagagem acompanhada", eyebrow:"No mesmo voo da família", title:"Na bagagem acompanhada, pet e tutor seguem no mesmo itinerário,", titleHighlight:"com uma operação própria.", intro:"Uma alternativa para famílias que querem manter o planejamento do voo conectado ao embarque do pet. A Embarpet analisa rota, companhia, caixa e documentação antes de indicar se essa modalidade faz sentido.", heroImage:"/embarpet-bagagem-acompanhada.webp", heroAlt:"Consultora Embarpet com pets em aeroporto", heroFacts:["Mesmo voo do tutor", "Porão pressurizado e climatizado", "Operação coordenada"], whatTitle:"Mesmo voo, com uma", whatTitleHighlight:"operação coordenada.", whatCards: [{ title: "Como funciona", copy: "Caixa apropriada, na área do porão pressurizada e climatizada, no mesmo itinerário do tutor." }, { title: "Quando é usada", copy: "Quando a família viaja junto, mas a cabine não está disponível ou não se aplica ao pet." }, { title: "O que entra na análise", copy: "Companhia aérea, rota, conexões, porte, raça e cronograma documental." }], whatImage: "/embarpet-mosaico-encontro.jpg", whatImageAlt: "Tutora com pet após uma jornada acompanhada", howItWorks:[{ number:"01", title:"Conferimos a rota", copy:"Avaliamos companhia, conexões e disponibilidade." },{ number:"02", title:"Validamos o pet e a caixa", copy:"Porte, espécie e especificações da caixa orientam a reserva." },{ number:"03", title:"Coordenamos a documentação", copy:"Cada exigência é organizada dentro do cronograma." },{ number:"04", title:"Alinhamos o dia do voo", copy:"A família entende horários, entrega e retirada do pet." }], decisionTitle:"Quando essa modalidade pode fazer sentido?", decisionCopy:"Ela pode entrar quando a família viaja junto, mas a cabine não atende ao perfil do pet ou não está disponível. O ponto central é descobrir se o voo do tutor também comporta a operação do animal com segurança, regra e prazo.", decisionPoints:["Tutor e pet no mesmo voo", "Cabine indisponível pelo porte ou pela raça do pet", "Raça sem restrição de focinho curto, ou avaliação específica para braquicefálicos"], benefitTitle:"O mesmo itinerário, com coordenação em cada ponto.", benefitCopy:"Aqui, a segurança está na conexão entre o roteiro da família e os requisitos da operação. A preparação evita que detalhes de reserva, caixa ou documentos virem surpresa no aeroporto.", benefits:["Tutor e pet seguem o mesmo planejamento de voo", "Reserva e caixa analisadas de forma conectada", "Orientação para entrega e retirada no aeroporto"], faqs:[{ question:"Meu pet ficará perto de mim no avião?", answer:"O pet não viaja na cabine nesta modalidade. Ele segue em compartimento apropriado, no mesmo itinerário quando a rota e a reserva permitem, fisicamente separado do tutor, mas no mesmo voo." }, { question:"É seguro meu pet viajar no porão enquanto eu estou na cabine?", answer:"A área de animais vivos do porão é pressurizada e climatizada, dentro de padrões internacionais de temperatura, diferente de uma área de carga comum. Dados públicos do setor mostram taxas de incidente muito baixas, concentradas principalmente na operação em solo (embarque, desembarque, espera na pista), por isso rota, horário e época do ano entram na análise." }, { question:"Cães de focinho curto podem viajar na bagagem acompanhada?", answer:"Raças braquicefálicas (buldogue, pug, shih tzu, persa) têm restrição ou exigem avaliação adicional na maioria das companhias aéreas, pela maior sensibilidade respiratória ao estresse e ao calor. Isso é conferido antes de confirmar a modalidade." }, ...sharedFaqs], seo:{ title:"Bagagem Acompanhada para Pets | Embarpet", description:"Entenda como funciona a bagagem acompanhada para transporte internacional de pets no mesmo voo do tutor." },
  },
  "suporte-emocional": {
    slug:"suporte-emocional", label:"Suporte emocional", eyebrow:"Orientação responsável", title:"Uma análise responsável para casos de", titleHighlight:"suporte emocional.", intro:"O suporte emocional exige uma leitura cuidadosa da documentação, da rota e das regras aplicáveis. Não há promessa de aceitação: existe orientação para entender o que pode ser considerado.", heroImage:"/embarpet-suporte-emocional.jpg", heroAlt:"Família e pet dentro de uma aeronave", heroFacts:["Avaliação individual do caso", "Documentação é decisiva", "Sem promessa de aprovação automática"], whatTitle:"Clareza para decidir", whatTitleHighlight:"antes de criar expectativa.", whatCards: [{ title: "Como funciona", copy: "Análise do contexto apresentado, dos documentos e das regras da companhia aérea ou do destino." }, { title: "Quando é usada", copy: "Quando não se aplica, a conversa evolui para alternativas de transporte viáveis." }, { title: "O que entra na análise", copy: "Documentação, política da companhia aérea e regras do destino." }], whatImage: "/embarpet-mosaico-cuidado.jpg", whatImageAlt: "Tutor com pet em momento de cuidado", howItWorks:[{ number:"01", title:"Entendemos o contexto", copy:"A necessidade e a rota são consideradas com cuidado." },{ number:"02", title:"Lemos as regras vigentes", copy:"Companhia, destino e tipo de documento importam." },{ number:"03", title:"Orientamos os documentos", copy:"Explicamos o que precisa ser confirmado antes da viagem." },{ number:"04", title:"Indicamos próximos passos", copy:"A análise pode apontar alternativas quando necessário." }], decisionTitle:"O que precisa ser confirmado antes de seguir?", decisionCopy:"A aceitação depende de regras que podem variar entre companhias, destinos e tipos de documento. Por isso, a orientação responsável evita promessas e começa pela análise do caso.", decisionPoints:["Critérios e políticas da companhia aérea", "Documentação aplicável ao contexto", "Alternativas de embarque quando necessário"], benefitTitle:"Acolher a necessidade também é orientar com verdade.", benefitCopy:"O papel da Embarpet é verificar o cenário com responsabilidade e mostrar o próximo passo possível, inclusive quando a modalidade não se aplica e outra solução protege melhor a viagem.", benefits:["Leitura das políticas e documentos aplicáveis", "Expectativa alinhada antes da compra ou reserva", "Alternativas avaliadas quando necessário"], faqs:[{ question:"Suporte emocional garante que meu pet viaje na cabine?", answer:"Não. A aceitação depende das políticas vigentes, documentação e análise da companhia aérea. A Embarpet não promete aprovação antes dessa verificação." }, ...sharedFaqs], seo:{ title:"Suporte Emocional e Viagem com Pets | Embarpet", description:"Entenda como a Embarpet orienta casos de suporte emocional em viagens internacionais com pets, sem promessas de aprovação." },
  },
};

/** Conteúdo de tensão e resolução: evita uma LP técnica demais e faz cada
 * modalidade responder à dúvida que a família realmente traz para a conversa. */
export const modalityStorytelling: Record<ModalitySlug, {
  painTitle: string;
  painCopy: string;
  painPoints: string[];
  painImage: string;
  painImageAlt: string;
  reassuranceTitle: string;
  reassuranceCopy: string;
  reassurancePoints: string[];
}> = {
  "viagem-na-cabine": {
    painTitle: "Querer o pet perto não elimina as dúvidas da viagem.",
    painCopy: "Muitas famílias chegam com a cabine como primeira preferência, com receio de descobrir tarde demais que peso, bolsa, conexão ou companhia mudam o plano. A ansiedade não está só no voo: está em não saber o que é realmente possível.",
    painPoints: ["Medo de criar expectativa antes de validar a rota", "Insegurança sobre peso, medidas e acomodação", "Receio de uma regra mudar perto do embarque"],
    painImage: "/embarpet-pet-na-cabine.jpeg",
    painImageAlt: "Pet em uma bolsa de transporte dentro da aeronave",
    reassuranceTitle: "A proximidade é considerada. O contexto decide.",
    reassuranceCopy: "Em vez de prometer cabine, a Embarpet verifica os critérios que sustentam essa possibilidade e apresenta alternativas quando a jornada pede outra escolha.",
    reassurancePoints: ["Preferência da família considerada desde o início", "Critérios conferidos antes de reservar", "Alternativas explicadas sem perder a clareza"],
  },
  "bagagem-acompanhada": {
    painTitle: "Estar no mesmo avião não é o mesmo que estar com ele.",
    painCopy: "É comum imaginar que, por estar no mesmo voo, o tutor tem algum controle sobre o que acontece com o pet. Na prática, ele fica no porão, fora de vista, e essa sensação de impotência costuma pesar mais do que a logística de reserva e caixa.",
    painPoints: ["Medo de que o pet fique exposto a frio, calor ou falta de ar sem o tutor perceber", "Ansiedade de ouvir o avião e não saber o que está acontecendo lá embaixo", "Insegurança sobre se a raça ou o porte do pet é adequado para essa modalidade"],
    painImage: "/embarpet-mosaico-encontro.jpg",
    painImageAlt: "Tutora com pet após uma jornada acompanhada",
    reassuranceTitle: "Saber como a área funciona é o que devolve a sensação de controle.",
    reassuranceCopy: "A área de animais vivos do porão é pressurizada e climatizada dentro de padrões internacionais. Não é uma área de carga comum. O ponto mais sensível não é o voo em si, mas a operação em solo, por isso rota, horário e raça do pet entram na análise antes da reserva do mesmo voo.",
    reassurancePoints: ["Área pressurizada e climatizada, separada da carga comum", "Horário e rota avaliados para evitar temperaturas extremas", "Restrição avaliada para raças de focinho curto (braquicefálicas)"],
  },
  "compartimento-de-cargas": {
    painTitle: "O medo real não é a burocracia. É não saber se o porão é seguro.",
    painCopy: "Histórias soltas de internet fazem parecer que o porão é uma área escura e sem controle. Isso não ajuda a decidir nada: o que protege o seu pet é entender de verdade como essa área funciona, onde está o risco de fato e o que muda esse risco.",
    painPoints: ["Medo de que a caixa fique exposta a frio, calor ou falta de ar", "Insegurança sobre o que acontece com o pet fora da vista do tutor", "Não saber se a raça ou o porte do pet pode ser um problema"],
    painImage: "/embarpet-carga-viva-operacao.jpeg",
    painImageAlt: "Equipe Embarpet com caixas de transporte no aeroporto",
    reassuranceTitle: "Entender o risco real é o que permite reduzi-lo.",
    reassuranceCopy: "A área de animais vivos do porão é pressurizada e climatizada, dentro de faixas de temperatura seguras. Não é a mesma coisa que a área de carga comum. Isso não elimina risco: o ponto mais sensível é a operação em solo (embarque, desembarque, espera na pista), por isso data, horário, rota e a raça do pet entram na análise antes de qualquer reserva.",
    reassurancePoints: ["Área pressurizada e climatizada, dentro de padrões internacionais", "Datas e horários avaliados para evitar calor ou frio extremos", "Restrição avaliada para raças de focinho curto (braquicefálicas)"],
  },
  "suporte-emocional": {
    painTitle: "A necessidade da família merece acolhimento, não promessa vazia.",
    painCopy: "Em casos de suporte emocional, as regras variam e as informações disponíveis nem sempre são claras. A maior frustração é descobrir uma limitação depois de comprar a passagem ou organizar toda a viagem em torno de uma expectativa que não foi validada.",
    painPoints: ["Insegurança sobre aceitação pela companhia", "Documentos sem confirmação de aplicabilidade", "Receio de perder tempo ou tomar decisões irreversíveis"],
    painImage: "/embarpet-mosaico-cuidado.jpg",
    painImageAlt: "Tutor com pet em momento de cuidado",
    reassuranceTitle: "A resposta responsável também protege a sua viagem.",
    reassuranceCopy: "Lemos o caso com cuidado, explicamos o que precisa ser confirmado e indicamos o próximo caminho viável, mesmo que ele seja diferente da expectativa inicial.",
    reassurancePoints: ["Orientação honesta antes de qualquer compromisso", "Critérios e documentos avaliados com contexto", "Alternativas quando a modalidade não se aplica"],
  },
};
