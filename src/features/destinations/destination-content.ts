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
  servicesHeading: string;
  servicesHeadingHighlight: string;
  servicesIntro: string;
  services: readonly {
    icon: "plane" | "document" | "takeoff" | "landing" | "stethoscope" | "box";
    title: string;
    copy: string;
    variant?: "luxury";
  }[];
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
 * Fonte única de conteúdo de cada LP de destino.
 * 7 países prioritários alinhados com o mega menu e rotas dedicadas.
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
  servicesHeading: "Nossos serviços para a",
  servicesHeadingHighlight: "viagem internacional do seu pet.",
  servicesIntro: "Do CVI à caixa de transporte, cada serviço é definido conforme seu pet, sua rota e as exigências do destino.",
  services: [
    { icon: "plane", title: "Embarque internacional", copy: "Planejamento da rota, companhia, modalidade, reservas e operação no aeroporto." },
    { icon: "document", title: "Documentação para embarque e CVI", copy: "Organização dos documentos conforme país, espécie e modalidade, incluindo CVI e Import Permit quando aplicáveis." },
    { icon: "takeoff", title: "Exportação de animais a partir do Brasil", copy: "Saída internacional alinhando exigências brasileiras, destino, companhia, cronograma documental e chegada no exterior." },
    { icon: "landing", title: "Importação de animais para o Brasil", copy: "Fluxo de retorno com documentação de origem, chegada, inspeção, liberação e conexão nacional quando necessária." },
    { icon: "stethoscope", title: "Processo veterinário", copy: "Coordenação com clínicas parceiras para microchip, vacinas, sorologia, atestado de saúde e exames exigidos." },
    { icon: "box", title: "Caixa, kennel ou bolsa de transporte", copy: "Orientação técnica conforme porte, medidas, rota, aeronave, modalidade e requisitos aplicáveis da companhia aérea." },
  ],
  faq: [
    ["Quais documentos meu pet precisa para viajar para os Estados Unidos?", "A documentação para levar um pet aos Estados Unidos depende do perfil do animal, da rota e das exigências sanitárias aplicáveis no momento da viagem (como as diretrizes do CDC para cães). A análise considera vacinas, microchip, certificados, prazos e a operação escolhida."],
    ["Preciso de CVI para viajar com meu pet para os Estados Unidos?", "O CVI (Certificado Veterinário Internacional) é o documento oficial obrigatório para a saída de animais de estimação do Brasil. O fluxo de solicitação e emissão é conduzido junto ao Vigiagro/MAPA."],
    ["O pet pode viajar na cabine em voos para os Estados Unidos?", "A viagem na cabine depende do peso do animal com a bolsa de transporte, das medidas aceitas pela companhia aérea e da disponibilidade no voo. Cães e gatos maiores viajam como bagagem acompanhada ou carga viva com total segurança."],
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

export const portugalDestination: DestinationLandingContent = {
  slug: "portugal",
  analyticsKey: "pt",
  country: "Portugal",
  countryCode: "PT",
  flag: "/flags/pt.svg",
  meta: {
    title: "Transporte Internacional de Pets para Portugal | Embarpet",
    description: "Planeje o transporte internacional do seu pet para Portugal com análise de rota, microchip ISO, vacina antirrábica, sorologia e CVI.",
  },
  hero: {
    titleLead: "Leve seu pet para",
    titleHighlight: "Portugal",
    intro: "Planeje a viagem do seu pet para Portugal com análise de rota, documentação da União Europeia, sorologia de raiva e emissão de CVI.",
    introHighlight: "Conte sobre seu pet e a sua viagem.",
  },
  methodArrivalCopy: "A Embarpet planeja e coordena cada etapa para que o seu pet desembarque com tranquilidade e segurança em Portugal.",
  footerNote: "Planejamento individual para a viagem do seu pet a Portugal.",
  servicesHeading: "Nossos serviços para a",
  servicesHeadingHighlight: "viagem do seu pet para Portugal.",
  servicesIntro: "Da sorologia de raiva ao CVI e caixa de transporte, organizamos cada detalhe da entrada na União Europeia.",
  services: [
    { icon: "plane", title: "Embarque internacional", copy: "Planejamento da rota aérea, reservas com a companhia e suporte no aeroporto de origem." },
    { icon: "document", title: "Documentação UE e CVI", copy: "Coordenação dos prazos de microchip, vacinas, laudo de sorologia e Certificado Veterinário Internacional." },
    { icon: "takeoff", title: "Exportação com conformidade europeia", copy: "Alinhamento com o regulamento sanitário da UE para entrada autorizada em território português." },
    { icon: "landing", title: "Importação e retorno ao Brasil", copy: "Orientação e despacho aduaneiro para pets retornando de Portugal ao território nacional." },
    { icon: "stethoscope", title: "Sorologia e protocolo veterinário", copy: "Acompanhamento de coleta e envio da amostra para laboratório credenciado internacionalmente." },
    { icon: "box", title: "Caixa de transporte padrão IATA", copy: "Adequação de medidas e ventilação para garantir conforto e conformidade com a companhia aérea." },
  ],
  faq: [
    ["Quais os requisitos sanitários para levar pet para Portugal?", "Para ingressar em Portugal, cães e gatos precisam de microchip padrão ISO 11784/11785 aplicado antes da vacina antirrábica, sorologia de anticorpos da raiva com título mínimo de 0,5 UI/ml em laboratório credenciado, cumprimento da quarentena de 90 dias após a coleta e CVI emitido pelo MAPA."],
    ["Com quanto tempo de antecedência devo iniciar o processo para Portugal?", "Recomenda-se iniciar entre 4 e 5 meses antes da data pretendida de viagem, principalmente devido ao tempo de espera obrigatório de 90 dias entre a coleta de sangue da sorologia e a emissão do CVI."],
    ["Meu pet precisa ficar de quarentena em Portugal?", "Não. Pets que viajam do Brasil com toda a documentação aprovada e dentro da validade (microchip, vacina, sorologia e CVI) são inspecionados no aeroporto de chegada e liberados imediatamente para seguir com a família."],
  ],
  context: {
    title: "As cidades e regiões de Portugal",
    titleHighlight: "com logística sob medida.",
    intro: "A entrada em Portugal exige planejamento rigoroso de rota e aeroporto de chegada.",
    introHighlight: "Conectamos sua origem no Brasil ao destino final português.",
    cards: [
      { place: "Lisboa e Região Central", label: "Porta de entrada principal", image: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1400&q=85", imageAlt: "Vista panorâmica dos telhados e rio Tejo em Lisboa", copy: "Principal hub aéreo com voos diretos de várias capitais brasileiras e posto de inspeção veterinária no aeroporto Humberto Delgado (LIS).", route: "Análise de voos diretos para minimizar o tempo de deslocamento do seu pet.", tone: "city" },
      { place: "Porto e Norte", label: "Conexão e conforto", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=85", imageAlt: "Ponte Dom Luís I e rio Douro no Porto", copy: "Excelente opção para famílias que vão residir no norte do país, com desembarque estruturado no aeroporto Francisco Sá Carneiro (OPO).", route: "Operação desenhada considerando a rota direta ou conexão otimizada.", tone: "sun" },
      { place: "Algarve e Ilhas", label: "Rotas integradas", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1400&q=85", imageAlt: "Falésias douradas e mar azul no litoral do Algarve", copy: "Para o sul ou regiões insulares (Madeira e Açores), planejamos a recepção e conexão aérea ou terrestre com total acolhimento.", route: "Planejamento estendido até a entrega na porta da sua nova residência.", tone: "coast" },
    ],
  },
};

export const spainDestination: DestinationLandingContent = {
  slug: "espanha",
  analyticsKey: "es",
  country: "Espanha",
  countryCode: "ES",
  flag: "/flags/es.svg",
  meta: {
    title: "Transporte Internacional de Pets para a Espanha | Embarpet",
    description: "Planeje a viagem do seu pet para a Espanha com análise de requisitos da União Europeia, sorologia de raiva, CVI e coordenação de voo.",
  },
  hero: {
    titleLead: "Leve seu pet para a",
    titleHighlight: "Espanha",
    intro: "Planeje o transporte internacional do seu pet para a Espanha com análise de rota, microchip ISO, sorologia e emissão de CVI.",
    introHighlight: "Conte sobre seu pet e a sua viagem.",
  },
  methodArrivalCopy: "A Embarpet cuida de toda a jornada técnica e documental para o desembarque seguro do seu pet na Espanha.",
  footerNote: "Planejamento individual para a viagem do seu pet à Espanha.",
  servicesHeading: "Nossos serviços para a",
  servicesHeadingHighlight: "viagem do seu pet para a Espanha.",
  servicesIntro: "Da preparação veterinária ao desembarque em Madrid, Barcelona ou outras províncias espanholas.",
  services: [
    { icon: "plane", title: "Embarque internacional", copy: "Seleção da rota e da companhia aérea com melhor política pet para a Espanha." },
    { icon: "document", title: "Documentação da União Europeia", copy: "Acompanhamento do microchip ISO, vacinação antirrábica, sorologia e emissão do CVI." },
    { icon: "takeoff", title: "Exportação segura", copy: "Conferência prévia no aeroporto de origem para assegurar conformidade total na saída." },
    { icon: "landing", title: "Importação para o Brasil", copy: "Atendimento completo para repatriamento ou mudança da Espanha para o Brasil." },
    { icon: "stethoscope", title: "Protocolo veterinário", copy: "Coordenação dos exames e laudos exigidos pelas autoridades sanitárias europeias." },
    { icon: "box", title: "Caixas e kennels homologados", copy: "Dimensionamento correto para atender aos padrões das companhias aéreas que voam para a Espanha." },
  ],
  faq: [
    ["Quais são as exigências para viajar com cachorro ou gato para a Espanha?", "A Espanha segue o regulamento da União Europeia: microchip padrão ISO 11784/11785, vacina de raiva aplicada após a microchipagem, teste de titulação de anticorpos (sorologia) com resultado igual ou superior a 0,5 UI/ml, quarentena de 90 dias após a coleta de sangue e CVI emitido pelo Vigiagro/MAPA."],
    ["Quanto tempo antes devo começar a preparar a viagem para a Espanha?", "É essencial começar pelo menos 4 a 5 meses antes da data prevista, respeitando o cronograma de vacina, sorologia laboratorial e o período regulatório de espera."],
    ["Posso levar meu pet na cabine do avião para a Espanha?", "Sim, desde que o peso total do pet somado à bolsa de transporte esteja dentro do limite da companhia aérea (geralmente até 8kg ou 10kg, dependendo da empresa) e haja vaga disponível no voo."],
  ],
  context: {
    title: "Principais rotas e regiões",
    titleHighlight: "na Espanha.",
    intro: "Madrid, Barcelona e outras províncias contam com exigências específicas de inspeção veterinária aeroportuária.",
    introHighlight: "Estruturamos o trajeto mais confortável para o seu companheiro.",
    cards: [
      { place: "Madrid e Centro", label: "Hub principal", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1400&q=85", imageAlt: "Palácio de Cibeles e praça iluminada em Madrid", copy: "O aeroporto de Madrid-Barajas (MAD) é a principal porta de entrada com voos diretos e posto alfandegário de controle veterinário (PIF).", route: "Rotas diretas que facilitam o desembaraço rápido na chegada.", tone: "city" },
      { place: "Barcelona e Catalunha", label: "Litoral mediterrâneo", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=85", imageAlt: "Parque Güell com vista de Barcelona e mar", copy: "Conexões estruturadas para o aeroporto El Prat (BCN) ou transfer rodoviário a partir de Madrid com total acompanhamento.", route: "Planejamento logístico adaptado ao destino final na Catalunha.", tone: "sun" },
      { place: "Valência e Andaluzia", label: "Sul e Levante", image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1400&q=85", imageAlt: "Arquitetura histórica e praças em Sevilha, Andaluzia", copy: "Atendimento coordenado para cidades como Sevilha, Málaga e Valência, assegurando bem-estar após o voo internacional.", route: "Conexão de voos internos ou transporte terrestre dedicado.", tone: "coast" },
    ],
  },
};

export const italyDestination: DestinationLandingContent = {
  slug: "italia",
  analyticsKey: "it",
  country: "Itália",
  countryCode: "IT",
  flag: "/flags/it.svg",
  meta: {
    title: "Transporte Internacional de Pets para a Itália | Embarpet",
    description: "Planeje o transporte do seu pet para a Itália com análise de rota, requisitos sanitários da União Europeia, sorologia e CVI.",
  },
  hero: {
    titleLead: "Leve seu pet para a",
    titleHighlight: "Itália",
    intro: "Planeje a viagem do seu pet para a Itália com suporte em documentação UE, sorologia de raiva, rotas e inspeção de desembarque.",
    introHighlight: "Conte sobre seu pet e a sua viagem.",
  },
  methodArrivalCopy: "A Embarpet planeja a melhor rota e cuida de todas as exigências sanitárias para seu pet chegar bem à Itália.",
  footerNote: "Planejamento individual para a viagem do seu pet à Itália.",
  servicesHeading: "Nossos serviços para a",
  servicesHeadingHighlight: "viagem do seu pet para a Itália.",
  servicesIntro: "Cuidamos de cada etapa burocrática e operacional para que a entrada do seu pet na Itália seja tranquila.",
  services: [
    { icon: "plane", title: "Embarque internacional", copy: "Análise de voos diretos e conexões com foco no conforto térmico e operacional do pet." },
    { icon: "document", title: "Documentação e CVI", copy: "Emissão de CVI em conformidade com o Ministério da Saúde italiano e União Europeia." },
    { icon: "takeoff", title: "Exportação planejada", copy: "Orientação detalhada sobre regras aeroportuárias e despacho de saída no Brasil." },
    { icon: "landing", title: "Importação e retorno", copy: "Suporte no retorno de animais da Itália para o Brasil com documentação internacional." },
    { icon: "stethoscope", title: "Sorologia e laudos veterinários", copy: "Acompanhamento do protocolo de vacinação e titulação de anticorpos em laboratório credenciado." },
    { icon: "box", title: "Kennel e caixa de transporte", copy: "Especificações e adaptação prévia para viagens de média e longa duração." },
  ],
  faq: [
    ["Quais os requisitos para entrar com animal de estimação na Itália?", "A Itália exige microchip padrão ISO 11784/11785, vacina antirrábica atualizada, teste de sorologia de anticorpos da raiva (mínimo de 0,5 UI/ml), quarentena de 90 dias após a coleta do sangue e Certificado Veterinário Internacional (CVI) emitido pelo MAPA."],
    ["Quanto tempo leva o processo para a Itália?", "O processo completo leva de 4 a 5 meses a partir da aplicação da vacina antirrábica e coleta de sorologia, respeitando o prazo legal de 90 dias exigido pela UE."],
    ["Animais braquicefálicos podem viajar para a Itália?", "Cães e gatos de focinho achatado (como Buldogues, Pugs e Persas) necessitam de análise especial da rota, clima e regras da companhia aérea, podendo viajar na cabine quando o peso permitir ou por companhias com estrutura adequada."],
  ],
  context: {
    title: "Rotas e destinos italianos",
    titleHighlight: "para a sua nova jornada.",
    intro: "Do norte ao sul da Itália, planejamos a logística ideal de chegada e acolhimento.",
    introHighlight: "Conforto e segurança para seu pet em cada etapa.",
    cards: [
      { place: "Roma e Região Central", label: "Conexão internacional", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=85", imageAlt: "Coliseu e paisagem histórica de Roma ao entardecer", copy: "O aeroporto Leonardo da Vinci / Fiumicino (FCO) conta com voos diretos e posto veterinário de fronteira para recepção.", route: "Rotas diretas que reduzem o estresse da viagem internacional.", tone: "city" },
      { place: "Milão e Norte", label: "Centro econômico", image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1400&q=85", imageAlt: "Duomo de Milão e arquitetura clássica italiana", copy: "O aeroporto de Malpensa (MXP) oferece ampla malha de conexões para quem vai residir na Lombardia, Piemonte ou Vêneto.", route: "Desembarque ágil e planejamento de conexão terrestre na Itália.", tone: "sun" },
      { place: "Sul da Itália e Ilhas", label: "Mediterrâneo", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85", imageAlt: "Costa Amalfitana com casas coloridas e mar azul", copy: "Para destinos no sul ou nas ilhas (Sicília e Sardenha), desenhamos conexões com intervalos seguros para descanso do animal.", route: "Acompanhamento contínuo até a chegada à sua nova casa.", tone: "coast" },
    ],
  },
};

export const argentinaDestination: DestinationLandingContent = {
  slug: "argentina",
  analyticsKey: "ar",
  country: "Argentina",
  countryCode: "AR",
  flag: "/flags/ar.svg",
  meta: {
    title: "Transporte Internacional de Pets para a Argentina | Embarpet",
    description: "Planeje a viagem do seu pet para a Argentina com regras Senasa / Mercosul, vacinação, atestado de saúde e CVI.",
  },
  hero: {
    titleLead: "Leve seu pet para a",
    titleHighlight: "Argentina",
    intro: "Planeje o transporte internacional do seu pet para a Argentina com análise de rota, normas do Mercosul, CVI e desembarque seguro.",
    introHighlight: "Conte sobre seu pet e a sua viagem.",
  },
  methodArrivalCopy: "A Embarpet orienta e coordena o transporte aéreo do seu pet para a Argentina com agilidade e total conformidade.",
  footerNote: "Planejamento individual para a viagem do seu pet à Argentina.",
  servicesHeading: "Nossos serviços para a",
  servicesHeadingHighlight: "viagem do seu pet para a Argentina.",
  servicesIntro: "Processo simplificado pelas normas do Mercosul, com planejamento ágil e suporte completo.",
  services: [
    { icon: "plane", title: "Embarque internacional", copy: "Rotas diretas para Buenos Aires e outras cidades argentinas com tempos de voo reduzidos." },
    { icon: "document", title: "CVI e normas Senasa / Mercosul", copy: "Emissão ágil de CVI com atestado de saúde, vacinas válidas e tratamentos antiparasitários." },
    { icon: "takeoff", title: "Exportação regional", copy: "Suporte no despacho aeroportuário nos principais aeroportos brasileiros." },
    { icon: "landing", title: "Importação e retorno", copy: "Trâmites de entrada e retorno entre Brasil e Argentina." },
    { icon: "stethoscope", title: "Protocolo veterinário Senasa", copy: "Orientação sobre desparasitação interna e externa nos prazos exigidos pelas autoridades argentinas." },
    { icon: "box", title: "Caixas e bolsas de viagem", copy: "Caixas adequadas para cabine ou bagagem acompanhada em voos da América do Sul." },
  ],
  faq: [
    ["Quais os requisitos para levar cachorro ou gato para a Argentina?", "A Argentina (via Senasa) exige vacina antirrábica válida, microchip implantado, atestado de saúde emitido por médico-veterinário particular, tratamento contra parasitas internos e externos realizado nos prazos regulamentares e o CVI emitido pelo MAPA."],
    ["Preciso fazer sorologia de raiva para a Argentina?", "Não. Cães e gatos originários do Brasil não precisam de teste de sorologia de anticorpos da raiva para ingressar na Argentina, o que torna o processo muito mais rápido."],
    ["Com quanto tempo de antecedência devo iniciar o processo para a Argentina?", "Como não há necessidade de quarentena de sorologia, o processo para a Argentina pode ser concluído em 30 a 45 dias, dependendo do agendamento veterinário e da emissão do CVI pelo MAPA."],
  ],
  context: {
    title: "Destinos e rotas",
    titleHighlight: "na Argentina.",
    intro: "Com voos curtos e regras integradas pelo Mercosul, viajar com seu pet para a Argentina é um processo seguro e ágil.",
    introHighlight: "Planejamos cada detalhe do embarque.",
    cards: [
      { place: "Buenos Aires e Grande Buenos Aires", label: "Capital e arredores", image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1400&q=85", imageAlt: "Obelisco e Avenida 9 de Julho em Buenos Aires", copy: "Entrada pelos aeroportos de Ezeiza (EZE) ou Aeroparque (AEP), com múltiplas opções de voos diretos diários saindo do Brasil.", route: "Voos rápidos de 3 horas com desembarque simples e acolhedor.", tone: "city" },
      { place: "Córdoba e Região Central", label: "Interior argentino", image: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=1400&q=85", imageAlt: "Serras e paisagem natural de Córdoba, Argentina", copy: "Atendimento para cidades universitárias e polos do interior, conectando voos com segurança e conforto térmico.", route: "Rotas diretas ou conexões curtas para minimizar o manuseio.", tone: "sun" },
      { place: "Mendoza e Patagônia", label: "Regiões sul e andina", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85", imageAlt: "Montanhas dos Andes com neve e vinhedos em Mendoza", copy: "Planejamento especial para rotas com variações climáticas, garantindo que o pet viaje protegido contra o frio ou calor.", route: "Cuidados térmicos e caixas preparadas para a altitude e clima.", tone: "coast" },
    ],
  },
};

export const uruguayDestination: DestinationLandingContent = {
  slug: "uruguai",
  analyticsKey: "uy",
  country: "Uruguai",
  countryCode: "UY",
  flag: "/flags/uy.svg",
  meta: {
    title: "Transporte Internacional de Pets para o Uruguai | Embarpet",
    description: "Planeje a viagem do seu pet para o Uruguai com análise de normas sanitárias MGAP, vacinas, CVI e logística de transporte.",
  },
  hero: {
    titleLead: "Leve seu pet para o",
    titleHighlight: "Uruguai",
    intro: "Planeje o transporte do seu pet para o Uruguai com suporte em documentação Mercosul/MGAP, CVI e operação de embarque.",
    introHighlight: "Conte sobre seu pet e a sua viagem.",
  },
  methodArrivalCopy: "A Embarpet coordena o planejamento e a documentação para a viagem do seu pet ao Uruguai com tranquilidade.",
  footerNote: "Planejamento individual para a viagem do seu pet ao Uruguai.",
  servicesHeading: "Nossos serviços para a",
  servicesHeadingHighlight: "viagem do seu pet para o Uruguai.",
  servicesIntro: "Documentação Mercosul, CVI e logística aérea para cães e gatos chegarem com segurança ao território uruguaio.",
  services: [
    { icon: "plane", title: "Embarque aéreo internacional", copy: "Voos rápidos conectando capitais brasileiras a Montevidéu." },
    { icon: "document", title: "Documentação MGAP e CVI", copy: "Cumprimento das regras do Ministério da Pecuária, Agricultura e Pesca do Uruguai." },
    { icon: "takeoff", title: "Exportação regional", copy: "Despacho ágil com menor tempo de espera no aeroporto." },
    { icon: "landing", title: "Importação e retorno", copy: "Suporte completo no retorno ou trânsito entre Uruguai e Brasil." },
    { icon: "stethoscope", title: "Tratamentos e atestados", copy: "Orientação para desparasitação interna e externa e atestado de saúde veterinário." },
    { icon: "box", title: "Caixas e adaptação", copy: "Orientação para transporte seguro em voos de curta duração." },
  ],
  faq: [
    ["Quais são as regras para entrar com pet no Uruguai?", "O Uruguai exige microchip padrão ISO 11784/11785, vacinação antirrábica em dia, atestado de saúde veterinário comprovando ausência de sinais clínicos de doenças infectocontagiosas, desparasitação interna e externa recente e o CVI emitido pelo MAPA."],
    ["Preciso de sorologia de raiva para o Uruguai?", "Não é necessária a sorologia de anticorpos da raiva para cães e gatos vindos do Brasil com destino ao Uruguai."],
    ["Quanto tempo antes devo organizar a viagem para o Uruguai?", "O processo costuma levar entre 30 e 45 dias para a realização das consultas, vacinas necessárias e emissão do CVI."],
  ],
  context: {
    title: "Cidades e regiões",
    titleHighlight: "no Uruguai.",
    intro: "Proximidade geográfica e regras unificadas facilitam a transição da sua família para o Uruguai.",
    introHighlight: "Organizamos a chegada do seu companheiro.",
    cards: [
      { place: "Montevidéu e Região Metropolitana", label: "Capital uruguaia", image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1400&q=85", imageAlt: "Rambla de Montevidéu e costa ao pôr do sol", copy: "Desembarque no moderno aeroporto internacional de Carrasco (MVD), com inspeção sanitária eficiente e rápida liberação.", route: "Rotas aéreas diretas com média de 2h30 de voo saindo de São Paulo.", tone: "city" },
      { place: "Punta del Este e Maldonado", label: "Litoral leste", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1400&q=85", imageAlt: "Praia e arquitetura litorânea em Punta del Este", copy: "Destino muito procurado por famílias brasileiras, com conexões sazonais ou transfer terrestre confortável a partir de Montevidéu.", route: "Logística integrada até a porta da residência no litoral.", tone: "sun" },
      { place: "Colônia e Interior", label: "Região histórica e oeste", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85", imageAlt: "Ruas históricas de pedra em Colonia del Sacramento", copy: "Planejamento logístico para regiões fluviais ou do interior do país, com foco no bem-estar durante todo o trajeto.", route: "Planejamento sob medida para viagens terrestres e fluviais complementares.", tone: "coast" },
    ],
  },
};

export const paraguayDestination: DestinationLandingContent = {
  slug: "paraguai",
  analyticsKey: "py",
  country: "Paraguai",
  countryCode: "PY",
  flag: "/flags/py.svg",
  meta: {
    title: "Transporte Internacional de Pets para o Paraguai | Embarpet",
    description: "Planeje o transporte internacional do seu pet para o Paraguai com suporte em documentação Mercosul, CVI e análise de rota.",
  },
  hero: {
    titleLead: "Leve seu pet para o",
    titleHighlight: "Paraguai",
    intro: "Planeje o transporte internacional do seu pet para o Paraguai com suporte em documentação Mercosul, CVI e análise de rota.",
    introHighlight: "Conte sobre seu pet e a sua viagem.",
  },
  methodArrivalCopy: "A Embarpet planeja cada etapa documental e de transporte para a chegada segura do seu pet ao Paraguai.",
  footerNote: "Planejamento individual para a viagem do seu pet ao Paraguai.",
  servicesHeading: "Nossos serviços para a",
  servicesHeadingHighlight: "viagem do seu pet para o Paraguai.",
  servicesIntro: "Do CVI às normas do Senacsa, cuidamos de toda a operação para uma viagem sem imprevistos.",
  services: [
    { icon: "plane", title: "Embarque internacional", copy: "Voos regulares para Assunção com tempo reduzido de viagem." },
    { icon: "document", title: "Documentação Senacsa e CVI", copy: "Orientação e emissão do CVI de acordo com as exigências sanitárias do Paraguai." },
    { icon: "takeoff", title: "Exportação simplificada", copy: "Fluxo ágil no aeroporto de saída no Brasil." },
    { icon: "landing", title: "Importação e retorno", copy: "Suporte aduaneiro e sanitário para viagens de retorno ao Brasil." },
    { icon: "stethoscope", title: "Protocolo veterinário", copy: "Controle de vacinação, atestado sanitário e desparasitação." },
    { icon: "box", title: "Caixa de transporte", copy: "Dimensionamento e orientação para a escolha da caixa adequada." },
  ],
  faq: [
    ["Quais os documentos necessários para levar pet para o Paraguai?", "O Paraguai exige microchip, vacina antirrábica em dia, atestado veterinário de saúde com validade de acordo com as normas vigentes, desparasitação interna e externa e o Certificado Veterinário Internacional (CVI) emitido pelo MAPA."],
    ["O Paraguai exige sorologia de raiva?", "Não. Cães e gatos provenientes do Brasil não precisam de laudo de sorologia de anticorpos da raiva para ingressar no Paraguai."],
    ["Quanto tempo antes devo planejar a viagem para o Paraguai?", "O planejamento pode ser iniciado cerca de 30 a 40 dias antes da data prevista para a viagem."],
  ],
  context: {
    title: "Rotas e cidades",
    titleHighlight: "no Paraguai.",
    intro: "Conectamos sua cidade de origem no Brasil ao Paraguai com segurança e agilidade.",
    introHighlight: "Transporte planejado para o bem-estar do seu pet.",
    cards: [
      { place: "Assunção e Grande Assunção", label: "Capital", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=85", imageAlt: "Vista urbana de Assunção, Paraguai", copy: "Chegada pelo aeroporto internacional Silvio Pettirossi (ASU), com suporte operacional para liberação aduaneira ágil.", route: "Voos curtos com conexões diretas a partir de São Paulo e Curitiba.", tone: "city" },
      { place: "Ciudad del Este e Tríplice Fronteira", label: "Região de fronteira", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=85", imageAlt: "Ponte da Amizade e trânsito fronteiriço", copy: "Logística especializada para a região de fronteira, alinhando transporte aéreo e transfer terrestre com toda a documentação legal.", route: "Planejamento para trânsito terrestre ou conexões pelo aeroporto Guaraní (AGT).", tone: "sun" },
      { place: "Encarnación e Interior", label: "Sul e polos agrícolas", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85", imageAlt: "Paisagens rurais e campos verdes no interior do Paraguai", copy: "Atendimento estendido para famílias e profissionais que se mudam para o interior e polos produtivos do Paraguai.", route: "Acompanhamento logístico completo até o destino final.", tone: "coast" },
    ],
  },
};

export const destinationLandingPages: Record<string, DestinationLandingContent> = {
  [unitedStatesDestination.slug]: unitedStatesDestination,
  [portugalDestination.slug]: portugalDestination,
  [spainDestination.slug]: spainDestination,
  [italyDestination.slug]: italyDestination,
  [argentinaDestination.slug]: argentinaDestination,
  [uruguayDestination.slug]: uruguayDestination,
  [paraguayDestination.slug]: paraguayDestination,
};

export const getDestinationLanding = (slug: string) => destinationLandingPages[slug];
