import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, CalendarDays, Check, CheckCircle2, ClipboardCheck, MessageCircle, PawPrint, Pencil, Route, ShieldCheck, Smartphone, UsersRound, X } from "lucide-react";
import { AnalysisButton } from "../../components/ui/buttons";
import { SiteFooter } from "../../components/ui/footer";
import { ScrollFlyIn } from "../../components/ui/hero-section-3";
import { SiteHeader } from "../../components/ui/navigation";
import { FAQItem } from "../../components/ui/system";
import { useLocale } from "../../i18n/locale";
import { setPageMetadata } from "../../lib/seo";

const painPoints = [
  { icon: X, title: "Seu pet pode não embarcar", copy: "Um documento incompatível, uma exigência sanitária fora do prazo ou uma regra da operação ignorada podem interromper a viagem no aeroporto." },
  { icon: X, title: "Prazo perdido não se recupera no dia do voo", copy: "Vacina, exame, certificado e validação têm datas próprias. Descobrir isso quando a viagem está perto pode mudar todo o plano da sua família." },
  { icon: X, title: "A passagem não garante o transporte do seu pet", copy: "Companhia, conexão, porte, caixa de transporte e destino precisam funcionar juntos antes de o seu pet chegar ao aeroporto." },
  { icon: X, title: "Uma conexão pode comprometer todo o plano", copy: "Seu pet não pode ser incluído no roteiro no último momento. Cada trecho precisa estar compatível com a operação da viagem." },
];

export default function DestinationUnitedStatesPage() {
  const { path } = useLocale();
  const [period, setPeriod] = useState("");
  const [routeInverted, setRouteInverted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => setPageMetadata({
    title: "Levar Pet para os Estados Unidos | Embarpet",
    description: "Comece a planejar a viagem do seu pet para os Estados Unidos com uma análise da rota, do perfil do animal e dos próximos passos.",
    canonicalPath: "/destinos/estados-unidos",
  }), []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const startPlanning = () => {
    const query = new URLSearchParams(routeInverted
      ? { origin: "Estados Unidos", destination: "Brasil" }
      : { origin: "Brasil", destination: "Estados Unidos" });
    if (period) query.set("period", period);
    window.location.assign(`${path("/viajar")}?${query.toString()}`);
  };

  const pageNavigation = [
    { label: "Por que a Embarpet", href: "#autoridade" },
    { label: "Como ajudamos", href: "#plano" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return <><SiteHeader logoSrc="/logo-embarpet-dark.png" items={pageNavigation} cta={{ label: "Começar o planejamento", href: "#planejar" }} />
    <main className="ep-destination-lp">
    <section ref={heroRef} className={heroVisible ? "ep-us-hero is-in-view" : "ep-us-hero"} id="planejar">
      <div className="ep-container ep-us-hero__grid">
        <div className="ep-us-hero__copy">
          <div className="ep-us-proof" aria-label="Mais de dois mil embarques realizados e avaliação 4,9 no Google"><div className="ep-us-proof__seal"><strong>+2.000</strong><span>embarques realizados</span><i aria-hidden="true" /><img src="/logo-google.svg" alt="Google" /><strong>4,9</strong><span>avaliação no Google</span></div></div>
          <h1>Leve seu pet para os <em>Estados Unidos</em><br />com segurança.</h1>
          <p className="ep-us-hero__intro">Você não precisa entender de regras, documentos ou companhia aérea. <strong>Conte sobre seu pet e a sua viagem.</strong> Nós organizamos o que precisa ser visto antes do embarque.</p>
        </div>
        <div className="ep-us-hero__planner-wrap">
          <img className="ep-us-planner__pet-documents" src="/embarpet-pet-documentos-formulario.png" alt="Cachorro com documentos internacionais de viagem e visto aprovado" />
          <div className="ep-us-hero__planner">
          <div className="ep-us-planner__heading"><div><h2>Comece sua análise em menos de 2 minutos.</h2></div></div>
          <div className="ep-us-planner__route"><span><img src={routeInverted ? "/flags/us.svg" : "/flags/br.svg"} alt={routeInverted ? "Bandeira dos Estados Unidos" : "Bandeira do Brasil"} /><span><small>Origem</small><b>{routeInverted ? "Estados Unidos" : "Brasil"}</b></span></span><span><img src={routeInverted ? "/flags/br.svg" : "/flags/us.svg"} alt={routeInverted ? "Bandeira do Brasil" : "Bandeira dos Estados Unidos"} /><span><small>Destino</small><b>{routeInverted ? "Brasil" : "Estados Unidos"}</b></span><button className="ep-us-planner__route-edit" type="button" onClick={() => window.location.assign(path("/viajar"))} aria-label="Editar destino" title="Editar destino"><Pencil size={14} aria-hidden="true" /></button></span><button className="ep-us-planner__route-swap" type="button" onClick={() => setRouteInverted((current) => !current)} aria-label="Inverter origem e destino" title="Inverter origem e destino" aria-pressed={routeInverted}><ArrowLeftRight size={16} aria-hidden="true" /></button></div>
          <fieldset className="ep-us-planner__field"><legend><span><CalendarDays size={16} aria-hidden="true" /></span>Quando vocês pretendem viajar?</legend><div className="ep-us-choice-row">{["1 a 3 meses", "3 a 6 meses", "Mais de 6 meses", "Ainda não sei"].map((item) => <button type="button" key={item} className={period === item ? "is-selected" : ""} aria-pressed={period === item} onClick={() => setPeriod(item)}>{period === item ? <Check size={14} aria-hidden="true" /> : null}{item}</button>)}</div></fieldset>
          <AnalysisButton size="lg" fullWidth onClick={startPlanning}>Continuar minha análise</AnalysisButton>
            <p className="ep-us-planner__note">Leva menos de 2 minutos. Você não precisa ter tudo definido agora.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="ep-us-authority" id="autoridade">
      <div className="ep-container ep-us-authority__grid"><div className="ep-us-authority__copy"><p className="ep-us-kicker">Seu pet em mãos seguras</p><h2>Seu pet vai viajar com uma equipe especialista em <em>transporte internacional.</em></h2><p>A Embarpet trabalha com importação e exportação de pets. Você recebe suporte de quem conhece a operação e sabe onde a viagem do seu pet exige atenção.</p><div className="ep-us-authority__proof"><strong>+2.000 <span>pets embarcados</span></strong><div className="ep-us-authority__credentials" aria-label="Membro IPATA e IATA"><span><img src="/logo-ipata.png" alt="IPATA" /><small>Membro credenciado</small></span><i aria-hidden="true" /><span><img src="/logo-iata.png" alt="IATA" /><small>Membro credenciado</small></span></div></div><div className="ep-us-section-cta"><AnalysisButton onClick={startPlanning}>Quero falar sobre o meu pet</AnalysisButton></div></div><div className="ep-us-authority__bento" aria-label="Momentos de pets e famílias atendidos pela Embarpet"><figure><img src="/case-leandro-hassum.jpeg" alt="Tutor com a equipe Embarpet no aeroporto" loading="lazy" /></figure><figure><img src="/case-talles-magno.jpg" alt="Tutor e pet em Nova York" loading="lazy" /></figure><figure><img src="/embarpet-marquee-welcome-family.webp" alt="Família reencontrando seu pet" loading="lazy" /></figure></div></div>
    </section>

    <section className="ep-us-doubt">
      <div className="ep-container"><div className="ep-us-doubt__heading"><p className="ep-us-kicker">UM ERRO PODE PARAR O EMBARQUE</p><h2>Sem suporte especializado, seu pet <em>pode não embarcar.</em></h2></div><div className="ep-us-doubt__content"><figure className="ep-us-doubt__visual"><img src="/embarpet-pet-caixa-bagagem-dor.png" alt="Pet ao lado da caixa de transporte e bagagem para viagem" loading="lazy" /></figure><div className="ep-us-doubt__questions">{painPoints.map(({ icon: Icon, title, copy }) => <article key={title}><Icon size={30} aria-hidden="true" /><p><b>{title}</b><small>{copy}</small></p></article>)}</div></div></div>
    </section>

    <section className="ep-us-ai-warning" aria-label="Limite de informações isoladas para planejar uma viagem com pet"><div className="ep-container"><div className="ep-us-ai-warning__logos" aria-label="ChatGPT, Claude e Gemini"><img src="/logo-openai-isotype.svg" alt="ChatGPT" /><img src="/logo-claude-isotype.svg" alt="Claude" /><img src="/logo-gemini-isotype.svg" alt="Gemini" /></div><h2>Uma informação isolada do ChatGPT pode fazer seu pet <em>não embarcar.</em></h2></div></section>

    <section className="ep-us-method" id="plano">
      <div className="ep-container"><div className="ep-us-section-heading"><p className="ep-us-kicker">Como a Embarpet ajuda</p><h2>Você cuida do seu pet. <em>Nós cuidamos da operação.</em></h2><p>Em vez de deixar você sozinho diante de informações soltas, transformamos a viagem do seu pet em <strong>próximos passos que fazem sentido para a rota.</strong></p></div><ol className="ep-us-steps">{[
        { icon: UsersRound, title: "Você fala sobre seu pet", copy: "Destino, período e informações básicas já mostram por onde começar." },
        { icon: Route, title: "Nós avaliamos a viagem", copy: "Rota, exigências e operação são lidas juntas antes de qualquer decisão." },
        { icon: ShieldCheck, title: "Seu pet embarca com segurança", copy: "A Embarpet coordena cada etapa da viagem para que o seu pet chegue aos Estados Unidos com você." },
      ].map(({ icon: Icon, title, copy }, index) => <li key={title}><span>0{index + 1}</span><Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></li>)}</ol><div className="ep-us-method__cta"><AnalysisButton onClick={startPlanning}>Quero ajuda para a viagem do meu pet</AnalysisButton></div></div>
    </section>

    <section className="ep-us-support"><div className="ep-container ep-us-support__grid"><figure className="ep-us-support__visual"><img src="/embarpet-whatsapp-suporte-pet.png" alt="Conversa pelo WhatsApp com a equipe Embarpet acompanhada por um pet" loading="lazy" /></figure><div className="ep-us-support__copy"><p className="ep-us-kicker">Suporte pelo WhatsApp</p><h2>Da sua primeira dúvida ao embarque, <em>tudo pelo WhatsApp.</em></h2><p>Você tem uma <strong>equipe especialista</strong> para orientar cada decisão da viagem do seu pet.</p><ul>{[{ icon: Smartphone, label: "Atendimento 100% digital-first" }, { icon: MessageCircle, label: "Direto do seu WhatsApp" }, { icon: PawPrint, label: "Orientação até o embarque do seu pet" }].map(({ icon: Icon, label }) => <li key={label}><Icon size={19} aria-hidden="true" />{label}</li>)}</ul><AnalysisButton onClick={startPlanning}>Quero falar com a Embarpet</AnalysisButton></div></div></section>

    <section className="ep-us-comparison"><div className="ep-container"><div className="ep-us-comparison__heading"><p className="ep-us-kicker">Planejamento com suporte</p><h2>Por que planejar com a <em>Embarpet?</em></h2></div><div className="ep-us-comparison__table" role="table" aria-label="Comparação entre fazer a viagem sozinho e contar com a Embarpet"><div className="ep-us-comparison__row ep-us-comparison__row--head" role="row"><b role="columnheader">O que a viagem do seu pet exige</b><b role="columnheader"><span className="ep-us-comparison__alone-heading">Fazer sozinho</span></b><b role="columnheader"><img src="/logo-embarpet-light.png" alt="Embarpet" /></b></div>{[["Entender o que a rota pede", "Informações soltas e difíceis de confirmar", "Análise personalizada da viagem"],["Organizar documentos e prazos", "Risco de deixar algo importante passar", "Checklist e orientação por etapa"],["Escolher uma operação compatível", "Decisão sem leitura da rota completa", "Rota, pet e operação avaliados juntos"],["Preparar o seu pet para o dia do voo", "Orientações genéricas, sem olhar para a viagem", "Orientações adequadas ao seu caso"],["Acompanhar cada etapa", "Dúvidas e mudanças resolvidas por conta própria", "Equipe especialista ao seu lado"],["Ajustar o plano quando algo muda", "Imprevistos tratados sem apoio especializado", "Suporte para reorganizar os próximos passos"],["Chegar ao embarque com segurança", "Preocupação até o último momento", "Planejamento para o pet embarcar com você"]].map(([need, alone, withUs]) => <div className="ep-us-comparison__row" role="row" key={need}><b role="cell">{need}</b><span role="cell"><X size={15} aria-hidden="true" />{alone}</span><span role="cell"><CheckCircle2 size={15} aria-hidden="true" />{withUs}</span></div>)}</div><div className="ep-us-comparison__cta"><AnalysisButton onClick={startPlanning}>Quero planejar com a Embarpet</AnalysisButton></div></div></section>

    <section className="ep-us-mosaic">
      <div className="ep-container"><div className="ep-us-mosaic__heading"><p className="ep-us-kicker">Embarques reais</p><h2>Seu pet também pode chegar <em>com você.</em></h2><p><strong>Mais de 2.000 pets já embarcaram com a Embarpet</strong> para encontrar suas famílias do outro lado da viagem.</p></div><div className="ep-us-mosaic__grid" aria-label="Momentos reais de embarques internacionais realizados pela Embarpet"><figure className="is-main"><img src="/case-leandro-hassum.jpeg" alt="Tutor com a equipe Embarpet no aeroporto" loading="lazy" /></figure><figure className="is-wide"><img src="/case-talles-magno.jpg" alt="Tutor e pet em Nova York" loading="lazy" /></figure><figure><img src="/embarpet-mosaico-cabine.jpeg" alt="Pet viajando na cabine de um avião" loading="lazy" /></figure><figure><img src="/embarpet-mosaico-cuidado.jpg" alt="Tutor em momento de cuidado com seu pet" loading="lazy" /></figure><figure className="is-tall"><img src="/embarpet-mosaico-encontro.jpg" alt="Tutora reencontrando seu pet" loading="lazy" /></figure></div><div className="ep-us-mosaic__cta"><AnalysisButton onClick={startPlanning}>Quero planejar a viagem do meu pet</AnalysisButton></div></div>
    </section>

    <section className="ep-us-faq" id="faq">
      <div className="ep-container ep-us-faq__grid"><div><p className="ep-us-kicker">Dúvidas comuns</p><h2>A viagem do seu pet não precisa estar <em>toda resolvida.</em></h2><p className="ep-us-faq__intro">Você pode começar <strong>mesmo sem data fechada ou todos os documentos em mãos.</strong></p><div className="ep-us-section-cta"><AnalysisButton onClick={startPlanning}>Quero falar sobre o meu pet</AnalysisButton></div></div><div className="ep-us-faq__list"><FAQItem question="Ainda não tenho todos os documentos. Posso começar?">Pode. Conte o que já sabe sobre seu pet e a viagem.</FAQItem><FAQItem question="Ainda não sei a data exata. Isso atrapalha?">Não. Um período aproximado já permite começar a análise.</FAQItem><FAQItem question="Meu pet é grande ou tem uma condição específica. Vocês podem ajudar?">Sim. É por isso que avaliamos seu pet, a rota e o período antes de indicar os próximos passos.</FAQItem><FAQItem question="O que preciso informar para começar?">Origem, destino, período aproximado e informações básicas sobre o seu pet.</FAQItem></div></div>
    </section>

    <ScrollFlyIn className="ep-final-fly-in" imageUrl="/embarpet-cta-plane-top.webp" imageAlt="Avião Embarpet cruzando a tela"><div className="mx-auto max-w-3xl px-4 text-center"><div className="ep-final-impact" aria-label="Mais de dois mil embarques realizados"><span className="ep-final-impact__avatars" aria-hidden="true"><i /><i /><i /><i /></span><strong>+2.000</strong><small>embarques<br />realizados</small></div><h2 className="mt-2 text-5xl font-bold leading-tight text-white md:text-7xl">Seu pet vai com você. <em>Vamos planejar essa viagem?</em></h2><p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">Conte o que você já sabe. A equipe Embarpet começa pela <strong>rota, pelo período e pelas informações do seu pet.</strong></p><button type="button" onClick={startPlanning} className="ep-button ep-button--primary mt-8">Quero planejar a viagem do meu pet</button><small className="mt-3 block text-xs text-white/65">Você não precisa ter tudo definido para começar.</small></div></ScrollFlyIn>
  </main><SiteFooter logoSrc="/logo-embarpet-dark.png" note="Planejamento individual para a viagem do seu pet aos Estados Unidos." brandCta={{ label: "Começar o planejamento", href: "#planejar" }} quickLinks={[
    { label: "Começar o planejamento", description: "Conte o básico da viagem", href: "#planejar", icon: ClipboardCheck },
    { label: "Como ajudamos seu pet", description: "Veja como funciona o suporte", href: "#plano", icon: Route },
    { label: "Tirar dúvidas da viagem", description: "Respostas antes de começar", href: "#faq", icon: ShieldCheck },
  ]} groups={[
    { title: "Sua viagem", links: [{ label: "Começar o planejamento", href: "#planejar" }, { label: "Como ajudamos", href: "#plano" }] },
    { title: "Embarpet", links: [{ label: "Por que a Embarpet", href: "#autoridade" }, { label: "Falar sobre meu pet", href: "#planejar" }] },
    { title: "Dúvidas", links: [{ label: "Perguntas frequentes", href: "#faq" }, { label: "Voltar ao início", href: "#planejar" }] },
  ]} showLanguageLink={false} /></>;
}
