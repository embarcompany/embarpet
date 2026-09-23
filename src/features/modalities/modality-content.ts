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
  whatTitle: string;
  whatTitleHighlight: string;
  whatCards: Array<{ title: string; copy: string }>;
  whatImage: string;
  whatImageAlt: string;
  howItWorks: Array<{ number: string; title: string; copy: string }>;
  decisionTitle: string;
  decisionPoints: Array<{ title: string; copy: string }>;
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
    heroImage: "/embarpet-compartimento-cargas-hero.png",
    heroAlt: "Cachorro dentro de uma caixa de transporte aprovada sendo posicionada na pista, com o avião ao fundo",
    whatTitle: "Não é um plano B: é uma",
    whatTitleHighlight: "operação própria.",
    whatCards: [
      { title: "Como funciona", copy: "Caixa de transporte própria para carga viva, em área do porão com a mesma pressurização e climatização da cabine." },
      { title: "Quando é usada", copy: "Planejada com antecedência quando o porte, a raça ou a rota do pet não permitem cabine ou bagagem acompanhada." },
      { title: "O que entra na análise", copy: "Rota completa, inclusive conexões, companhia aérea, porte, raça, peso e documentação sanitária exigida." },
    ],
    whatImage: "/embarpet-compartimento-cargas-cutout.png",
    whatImageAlt: "Cachorro de grande porte sentado dentro de uma caixa de transporte aprovada para o compartimento de cargas",
    howItWorks: [
      { number: "01", title: "Lemos a rota", copy: "Origem, destino, conexão, prazo e regras atualizadas orientam a primeira decisão." },
      { number: "02", title: "Validamos o perfil do pet", copy: "Espécie, porte, raça, caixa de transporte e condição da viagem entram na análise." },
      { number: "03", title: "Organizamos a operação", copy: "Reserva, documentação, cronograma e orientações são conectados para o embarque." },
      { number: "04", title: "Acompanhamos os marcos", copy: "A família recebe clareza sobre os próximos passos conforme o serviço contratado." },
    ],
    decisionTitle: "Quando essa modalidade pode fazer sentido?",
    decisionPoints: [
      { title: "Pets de portes diversos", copy: "Do pequeno ao grande porte, conforme os critérios aceitos pela companhia aérea." },
      { title: "Restrição para raças braquicefálicas", copy: "Cães e gatos de focinho curto têm restrição ou avaliação adicional pelo maior risco respiratório." },
      { title: "Fora de janelas de calor extremo", copy: "Companhias evitam voar pets em temperaturas muito altas; a data entra no planejamento da rota." },
    ],
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
    slug: "viagem-na-cabine", label: "Viagem na cabine", eyebrow: "Pet próximo ao tutor", title: "Quando o seu pet pode viajar", titleHighlight: "na cabine com você.", intro: "A viagem na cabine mantém pet e tutor próximos durante o voo, mas depende dos limites de porte, peso, rota e regras da companhia aérea.", heroImage: "/embarpet-viagem-cabine-hero.png", heroAlt: "Cachorro pequeno dentro de uma bolsa de transporte na cabine do avião, olhando para a janela", whatTitle: "Proximidade funciona quando a", whatTitleHighlight: "rota permite.", whatCards: [{ title: "Como funciona", copy: "Bolsa ou caixa rígida aprovada pela companhia aérea, acomodada sob o assento à frente do tutor durante todo o voo." }, { title: "Quando é usada", copy: "Indicada quando o peso do pet somado à bolsa fica dentro do limite da companhia, geralmente entre 8kg e 10kg, e a rota aceita essa modalidade." }, { title: "O que entra na análise", copy: "Porte, peso, espécie, medidas da bolsa, rota, conexões e a política específica da companhia aérea escolhida." }], whatImage: "/embarpet-viagem-cabine-cutout.png", whatImageAlt: "Cachorro pequeno acomodado dentro de uma bolsa de transporte aprovada para cabine", howItWorks: [{ number:"01", title:"Analisamos os critérios", copy:"Porte, peso, espécie, rota e companhia aérea." }, { number:"02", title:"Definimos a bolsa ou caixa", copy:"A escolha precisa respeitar medidas e regras aplicáveis." }, { number:"03", title:"Organizamos documentos", copy:"A documentação acompanha o destino e o período da viagem." }, { number:"04", title:"Preparamos o embarque", copy:"A família recebe as orientações para o dia do voo." }], decisionTitle:"Quando a cabine pode ser a melhor alternativa?", decisionPoints:[{ title: "Pets dentro dos limites da companhia", copy: "O peso do pet somado à bolsa geralmente precisa ficar entre 8kg e 10kg, conforme a companhia." }, { title: "Rotas e conexões compatíveis", copy: "Nem toda rota ou conexão aceita cabine para pets; isso é conferido antes de reservar." }, { title: "Bolsa ou caixa aprovada", copy: "A bolsa precisa respeitar as medidas de espaço sob o assento definidas pela companhia." }], benefitTitle:"Perto do tutor, com critérios que protegem a jornada.", benefitCopy:"A cabine é desejada pela proximidade, mas a melhor decisão continua sendo a que respeita o porte, a bolsa, o voo e o bem-estar do pet do início ao fim.", benefits:["Pet e tutor compartilham o mesmo ambiente de voo", "Validação de medidas, peso e disponibilidade", "Orientações para uma acomodação adequada"], faqs:[{ question:"Todo pet pequeno pode viajar na cabine?", answer:"Não. Além de porte e peso, cada companhia define critérios de bolsa, espécie, rota e disponibilidade." }, ...sharedFaqs], seo:{ title:"Viagem de Pet na Cabine | Embarpet", description:"Saiba quando um pet pode viajar na cabine e entenda os critérios de porte, rota, caixa de transporte e documentação internacional." },
  },
  "bagagem-acompanhada": {
    slug:"bagagem-acompanhada", label:"Bagagem acompanhada", eyebrow:"No mesmo voo da família", title:"Na bagagem acompanhada, pet e tutor seguem no mesmo itinerário,", titleHighlight:"com uma operação própria.", intro:"Uma alternativa para famílias que querem manter o planejamento do voo conectado ao embarque do pet. A Embarpet analisa rota, companhia, caixa e documentação antes de indicar se essa modalidade faz sentido.", heroImage:"/embarpet-bagagem-acompanhada-hero.png", heroAlt:"Cachorro dentro de uma caixa de transporte rígida em um saguão de check-in de aeroporto", whatTitle:"Mesmo voo, com uma", whatTitleHighlight:"operação coordenada.", whatCards: [{ title: "Como funciona", copy: "Caixa de transporte aprovada, despachada na área do porão pressurizada e climatizada, no mesmo voo do tutor." }, { title: "Quando é usada", copy: "Quando a família viaja no mesmo itinerário, mas o porte, o peso ou a raça do pet não atendem aos critérios de cabine." }, { title: "O que entra na análise", copy: "Companhia aérea, rota, conexões, porte, raça, peso e o cronograma de documentação exigido para o destino." }], whatImage: "/embarpet-bagagem-acompanhada-cutout.png", whatImageAlt: "Cachorro ao lado de uma caixa de transporte rígida aprovada para viagem", howItWorks:[{ number:"01", title:"Conferimos a rota", copy:"Avaliamos companhia, conexões e disponibilidade." },{ number:"02", title:"Validamos o pet e a caixa", copy:"Porte, espécie e especificações da caixa orientam a reserva." },{ number:"03", title:"Coordenamos a documentação", copy:"Cada exigência é organizada dentro do cronograma." },{ number:"04", title:"Alinhamos o dia do voo", copy:"A família entende horários, entrega e retirada do pet." }], decisionTitle:"Quando essa modalidade pode fazer sentido?", decisionPoints:[{ title: "Tutor e pet no mesmo voo", copy: "A família viaja junto, mas o pet segue em compartimento próprio, fora da cabine." }, { title: "Cabine indisponível", copy: "Quando o porte ou a raça do pet não atende aos critérios de cabine, essa modalidade mantém a família no mesmo itinerário." }, { title: "Sem restrição de focinho curto", copy: "Raças braquicefálicas exigem avaliação adicional antes de confirmar essa modalidade." }], benefitTitle:"O mesmo itinerário, com coordenação em cada ponto.", benefitCopy:"Aqui, a segurança está na conexão entre o roteiro da família e os requisitos da operação. A preparação evita que detalhes de reserva, caixa ou documentos virem surpresa no aeroporto.", benefits:["Tutor e pet seguem o mesmo planejamento de voo", "Reserva e caixa analisadas de forma conectada", "Orientação para entrega e retirada no aeroporto"], faqs:[{ question:"Meu pet ficará perto de mim no avião?", answer:"O pet não viaja na cabine nesta modalidade. Ele segue em compartimento apropriado, no mesmo itinerário quando a rota e a reserva permitem, fisicamente separado do tutor, mas no mesmo voo." }, { question:"É seguro meu pet viajar no porão enquanto eu estou na cabine?", answer:"A área de animais vivos do porão é pressurizada e climatizada, dentro de padrões internacionais de temperatura, diferente de uma área de carga comum. Dados públicos do setor mostram taxas de incidente muito baixas, concentradas principalmente na operação em solo (embarque, desembarque, espera na pista), por isso rota, horário e época do ano entram na análise." }, { question:"Cães de focinho curto podem viajar na bagagem acompanhada?", answer:"Raças braquicefálicas (buldogue, pug, shih tzu, persa) têm restrição ou exigem avaliação adicional na maioria das companhias aéreas, pela maior sensibilidade respiratória ao estresse e ao calor. Isso é conferido antes de confirmar a modalidade." }, ...sharedFaqs], seo:{ title:"Bagagem Acompanhada para Pets | Embarpet", description:"Entenda como funciona a bagagem acompanhada para transporte internacional de pets no mesmo voo do tutor." },
  },
  "suporte-emocional": {
    slug:"suporte-emocional", label:"Suporte emocional", eyebrow:"Orientação responsável", title:"Uma análise responsável para casos de", titleHighlight:"suporte emocional.", intro:"O suporte emocional exige uma leitura cuidadosa da documentação, da rota e das regras aplicáveis. Não há promessa de aceitação: existe orientação para entender o que pode ser considerado.", heroImage:"/embarpet-suporte-emocional-hero.png", heroAlt:"Cachorro usando colete de suporte emocional sendo acariciado em uma sala de embarque", whatTitle:"Clareza para decidir", whatTitleHighlight:"antes de criar expectativa.", whatCards: [{ title: "Como funciona", copy: "Análise do contexto apresentado pela família, cruzada com os documentos disponíveis e as regras da companhia aérea ou do destino." }, { title: "Quando é usada", copy: "Quando a família busca clareza sobre elegibilidade antes de comprar a passagem ou assumir compromissos com a viagem." }, { title: "O que entra na análise", copy: "Documentação apresentada, política vigente da companhia aérea, regras do país de destino e o histórico do caso." }], whatImage: "/embarpet-suporte-emocional-cutout.png", whatImageAlt: "Gato usando colete de identificação de suporte emocional", howItWorks:[{ number:"01", title:"Entendemos o contexto", copy:"A necessidade e a rota são consideradas com cuidado." },{ number:"02", title:"Lemos as regras vigentes", copy:"Companhia, destino e tipo de documento importam." },{ number:"03", title:"Orientamos os documentos", copy:"Explicamos o que precisa ser confirmado antes da viagem." },{ number:"04", title:"Indicamos próximos passos", copy:"A análise pode apontar alternativas quando necessário." }], decisionTitle:"O que precisa ser confirmado antes de seguir?", decisionPoints:[{ title: "Critérios da companhia aérea", copy: "Cada companhia define suas próprias regras de aceitação, sem padrão único entre elas." }, { title: "Documentação aplicável ao contexto", copy: "Os documentos exigidos variam conforme o tipo de necessidade e o destino da viagem." }, { title: "Alternativas quando necessário", copy: "Se a modalidade não se aplicar, orientamos o próximo passo viável para a sua viagem." }], benefitTitle:"Acolher a necessidade também é orientar com verdade.", benefitCopy:"O papel da Embarpet é verificar o cenário com responsabilidade e mostrar o próximo passo possível, inclusive quando a modalidade não se aplica e outra solução protege melhor a viagem.", benefits:["Leitura das políticas e documentos aplicáveis", "Expectativa alinhada antes da compra ou reserva", "Alternativas avaliadas quando necessário"], faqs:[{ question:"Suporte emocional garante que meu pet viaje na cabine?", answer:"Não. A aceitação depende das políticas vigentes, documentação e análise da companhia aérea. A Embarpet não promete aprovação antes dessa verificação." }, ...sharedFaqs], seo:{ title:"Suporte Emocional e Viagem com Pets | Embarpet", description:"Entenda como a Embarpet orienta casos de suporte emocional em viagens internacionais com pets, sem promessas de aprovação." },
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
  reassuranceImage: string;
  reassuranceImageAlt: string;
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
    reassuranceImage: "/embarpet-mosaico-cabine.jpeg",
    reassuranceImageAlt: "Pet em viagem internacional na cabine",
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
    reassuranceImage: "/embarpet-bagagem-operacao-cutout.png",
    reassuranceImageAlt: "Operação de bagagem acompanhada organizada",
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
    reassuranceImage: "/embarpet-crate-preparation.png",
    reassuranceImageAlt: "Preparação de caixa de transporte para pet",
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
    reassuranceImage: "/embarpet-mosaico-familia.jpg",
    reassuranceImageAlt: "Família e pet em momento de cuidado",
  },
};
