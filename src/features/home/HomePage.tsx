import { useEffect, useRef, useState } from "react";
import { ConversionHero } from "../../design-system/patterns";
import { ModalityRail, type RouteData } from "../../design-system/components";
import { Button, Notice, SectionHeading } from "../../design-system/primitives";
import { InternationalTransfer, type Region } from "../../components/ui/country-accordion";
import { ScrollFlyIn } from "../../components/ui/hero-section-3";
import { FAQItem } from "../../components/ui/system";
import { ArrowRight, ClipboardCheck, FileText, Globe2, Headset, MapPin, Pause, Play } from "lucide-react";
import { SiteHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { WhatsAppFloat, type LeadContext } from "../../components/ui/whatsapp-float";
import { HeroRouteStarter } from "../../components/ui/hero-route-starter";
import { CaseDragCards } from "../../components/ui/case-drag-cards";
import { AnalysisModal } from "../../components/ui/analysis-modal";
import { InternalLink } from "../../components/ui/buttons";
import { PetLuxoSection } from "../../components/ui/pet-luxo-section";
import { useLocale } from "../../i18n/locale";
import { countryFlagSvg } from "../../lib/country-flag";

const images = {
  planning: "/embarpet-trip-planning.png",
  crate: "/embarpet-crate-preparation.png",
  documents: "/embarpet-autoridade-destino-real.jpeg",
  service: "/embarpet-service-management.webp",
  luxury: "/embarpet-pet-luxo.png",
};

const teamMembers = [
  { name: "Fernando", role: "Atendimento inicial" }, { name: "Juliane", role: "Planejamento de rota" }, { name: "Kimberlie", role: "Documentação" }, { name: "Ystefani", role: "Operações" }, { name: "Luiz", role: "Atendimento" },
  { name: "Daiane", role: "Planejamento" }, { name: "Suzaine", role: "Documentação" }, { name: "Flora", role: "Operações" }, { name: "Igor", role: "Atendimento" }, { name: "Celida", role: "Planejamento" },
  { name: "Evelyn", role: "Documentação" }, { name: "Rafael", role: "Operações" }, { name: "Ednilton", role: "Atendimento" }, { name: "Thamires", role: "Planejamento" }, { name: "Elizabeth", role: "Operações" },
];

const regions: Region[] = [
  { id:"eua", label:"Estados Unidos", countries:[{ code:"us", name:"Estados Unidos" }] },
  { id:"ue", label:"União Europeia", countries:[{ code:"pt", name:"Portugal" },{ code:"es", name:"Espanha" },{ code:"it", name:"Itália" },{ code:"fr", name:"França" },{ code:"de", name:"Alemanha" },{ code:"nl", name:"Países Baixos" }] },
  { id:"mercosul", label:"Mercosul", countries:[{ code:"ar", name:"Argentina" },{ code:"uy", name:"Uruguai" },{ code:"py", name:"Paraguai" }] },
];

const embarkationGalleryAll = [
  { src:"/embarpet-viagem-cabine.jpg", alt:"Pet em contexto de viagem na cabine", destination:"Estados Unidos" },
  { src:"/embarpet-bagagem-acompanhada.webp", alt:"Consultora Embarpet acompanhando pets no aeroporto", destination:"Portugal" },
  { src:"/embarpet-compartimento-cargas.jpg", alt:"Pet em caixa de transporte no processo operacional", destination:"Espanha" },
  { src:"/embarpet-pet-luxo-real.jpeg", alt:"Acompanhamento de pet em aeroporto", destination:"Itália" },
  { src:"/embarpet-mosaico-familia.jpg", alt:"Família em contexto de viagem com pet", destination:"Estados Unidos" },
  { src:"/embarpet-mosaico-cabine.jpeg", alt:"Pet viajando em cabine aérea", destination:"França" },
  { src:"/embarpet-mosaico-encontro.jpg", alt:"Encontro de família e pet após a jornada", destination:"Argentina" },
  { src:"/embarpet-carga-viva-operacao.jpeg", alt:"Operação de embarque internacional de pet", destination:"Uruguai" },
  { src:"/embarpet-marquee-welcome-family.webp", alt:"Família reencontrando seu pet no aeroporto", destination:"Estados Unidos" },
  { src:"/embarpet-marquee-airport-crate.webp", alt:"Pet e caixa de transporte prontos para o embarque", destination:"Canadá" },
  { src:"/embarpet-marquee-road-trip.webp", alt:"Pet em deslocamento para o aeroporto", destination:"Portugal" },
  { src:"/embarpet-marquee-cockatiel.webp", alt:"Ave em transporte especializado", destination:"Espanha" },
  { src:"/embarpet-marquee-carrier-car.webp", alt:"Pet em caixa de transporte durante o deslocamento", destination:"França" },
  { src:"/embarpet-marquee-window-flight.webp", alt:"Pet contemplando a vista pela janela do avião", destination:"Itália" },
  { src:"/embarpet-marquee-cabin-pomeranian.webp", alt:"Pet viajando confortavelmente na cabine", destination:"Argentina" },
  { src:"/embarpet-marquee-family-airport.webp", alt:"Família e pet em momento de embarque", destination:"Estados Unidos" },
  { src:"/embarpet-marquee-cabin-dog.webp", alt:"Cão viajando dentro da cabine do avião", destination:"Uruguai" },
];

// Apenas pets em deslocamento, embarque ou cabine entram na sequência editorial.
const embarkationGallery = embarkationGalleryAll.filter(({ src }) => [
  "/embarpet-marquee-airport-crate.webp",
  "/embarpet-marquee-road-trip.webp",
  "/embarpet-marquee-cockatiel.webp",
  "/embarpet-marquee-carrier-car.webp",
  "/embarpet-marquee-window-flight.webp",
  "/embarpet-marquee-cabin-pomeranian.webp",
  "/embarpet-marquee-cabin-dog.webp",
  "/embarpet-viagem-cabine.jpg",
].includes(src));

function EmbarkationMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // A segunda trilha é a cópia técnica do loop. A sequência-base é longa o
  // bastante para que as fotos não se repitam visualmente durante a navegação.
  const rails = [0, 1];
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const rail = track?.querySelector<HTMLElement>(".ep-embarkation-marquee__rail");
    if (!viewport || !track || !rail) return;

    let frame = 0;
    let offset = 0;
    let lastFrame = performance.now();
    let railWidth = rail.getBoundingClientRect().width;
    let isVisible = true;
    let isDragging = false;
    let dragPointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let velocity = 0;
    let resumeAt = 0;
    const speed = 46;
    const normalizeOffset = () => {
      if (railWidth <= 0) return;
      while (offset <= -railWidth) offset += railWidth;
      while (offset > 0) offset -= railWidth;
    };
    const render = (now: number) => {
      const elapsed = Math.min(now - lastFrame, 40);
      lastFrame = now;
      if (isVisible && !document.hidden && railWidth > 0 && !isDragging) {
        if (Math.abs(velocity) > .015) {
          offset += velocity * elapsed;
          velocity *= Math.pow(.9, elapsed / 16.67);
        } else if (now >= resumeAt) {
          velocity = 0;
          offset -= (elapsed / 1000) * speed;
        }
        normalizeOffset();
        track.style.transform = `translate3d(${offset}px,0,0)`;
      }
      frame = window.requestAnimationFrame(render);
    };
    const resizeObserver = new ResizeObserver(() => {
      railWidth = rail.getBoundingClientRect().width;
      if (railWidth > 0) offset = -(Math.abs(offset) % railWidth);
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      lastFrame = performance.now();
    }, { threshold: 0.01 });
    const resetFrameTime = () => { lastFrame = performance.now(); };
    const startDrag = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      isDragging = true;
      dragPointerId = event.pointerId;
      lastPointerX = event.clientX;
      lastPointerTime = performance.now();
      velocity = 0;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(event.pointerId);
    };
    const moveDrag = (event: PointerEvent) => {
      if (!isDragging || dragPointerId !== event.pointerId) return;
      const now = performance.now();
      const delta = event.clientX - lastPointerX;
      const elapsed = Math.max(now - lastPointerTime, 1);
      offset += delta;
      normalizeOffset();
      velocity = delta / elapsed;
      lastPointerX = event.clientX;
      lastPointerTime = now;
      track.style.transform = `translate3d(${offset}px,0,0)`;
      event.preventDefault();
    };
    const endDrag = (event: PointerEvent) => {
      if (!isDragging || dragPointerId !== event.pointerId) return;
      isDragging = false;
      dragPointerId = null;
      resumeAt = performance.now() + 650;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    };

    resizeObserver.observe(rail);
    intersectionObserver.observe(viewport);
    document.addEventListener("visibilitychange", resetFrameTime);
    viewport.addEventListener("pointerdown", startDrag);
    viewport.addEventListener("pointermove", moveDrag);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    frame = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", resetFrameTime);
      viewport.removeEventListener("pointerdown", startDrag);
      viewport.removeEventListener("pointermove", moveDrag);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return <section className="ep-embarkation-marquee" aria-label="Embarques realizados pela Embarpet"><div className="ep-embarkation-marquee__viewport" ref={viewportRef}><div className="ep-embarkation-marquee__track" ref={trackRef}>{rails.map((rail) => <div className="ep-embarkation-marquee__rail" key={rail} aria-hidden={rail ? "true" : undefined}>{embarkationGallery.map(({ src, alt }) => <figure className="ep-embarkation-marquee__item" key={`${src}-${rail}`}><img src={src} alt={rail ? "" : alt} loading="lazy" decoding="async" draggable="false" /></figure>)}</div>)}</div></div></section>;
}

export default function EmbarpetHome() {
  const { text, path } = useLocale();
  const routeFromUrl = () => {
    const query = new URLSearchParams(window.location.search);
    return { origin: query.get("origin") ?? "", destination: query.get("destination") ?? "", period: query.get("period") ?? "" };
  };
  const [route, setRoute] = useState<RouteData>({ origin:"", destination:"", period:"" });
  const [message, setMessage] = useState("");
  const [heroVideoFullLoaded, setHeroVideoFullLoaded] = useState(false);
  const [heroVideoPaused, setHeroVideoPaused] = useState(false);
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisRoute, setAnalysisRoute] = useState<Partial<RouteData>>({});
  const openAnalysis = (initialRoute: Partial<RouteData> = {}) => {
    const nextRoute = { origin: initialRoute.origin ?? "", destination: initialRoute.destination ?? "", period: initialRoute.period ?? "" };
    const query = new URLSearchParams();
    if (nextRoute.origin) query.set("origin", nextRoute.origin);
    if (nextRoute.destination) query.set("destination", nextRoute.destination);
    if (nextRoute.period) query.set("period", nextRoute.period);
    setAnalysisRoute(nextRoute);
    setAnalysisOpen(true);
    const analysisPath = path("/analise");
    if (window.location.pathname !== analysisPath) window.history.pushState({ embarpetAnalysis: true }, "", `${analysisPath}${query.size ? `?${query.toString()}` : ""}`);
  };
  const closeAnalysis = () => {
    if (window.location.pathname !== path("/analise")) { setAnalysisOpen(false); return; }
    if (window.history.state?.embarpetAnalysis) window.history.back();
    else {
      window.history.replaceState({}, "", path("/"));
      setAnalysisOpen(false);
    }
  };
  useEffect(() => {
    const handleOpen = (event: Event) => openAnalysis((event as CustomEvent<Partial<RouteData>>).detail ?? {});
    const handlePopState = () => {
      const shouldOpen = window.location.pathname === path("/analise");
      setAnalysisOpen(shouldOpen);
      if (shouldOpen) setAnalysisRoute(routeFromUrl());
    };
    handlePopState();
    window.addEventListener("embarp:open-analysis", handleOpen);
    window.addEventListener("popstate", handlePopState);
    return () => { window.removeEventListener("embarp:open-analysis", handleOpen); window.removeEventListener("popstate", handlePopState); };
  }, [path]);
  const startFromDestination = (destination = "") => {
    setRoute((current) => ({ ...current, destination }));
    openAnalysis({ destination });
  };
  const leadContext: LeadContext = { source:"home", page:"/", origin:route.origin, destination:route.destination, period:route.period };

  return <><AnalysisModal open={analysisOpen} onClose={closeAnalysis} initialRoute={analysisRoute} analyticsSource="index_modal" /><SiteHeader overlay logoSrc="/brand/embarpet_full_logo_word-white_support-cyan_tagline-cyan.svg" /><main>
    <ConversionHero aside={<aside className="ep-hero-showcase" aria-label="Embarpet em operação"><img className="ep-hero-showcase__pet" src="/embarpet-hero-pets-air-travel.webp" alt="Cachorro, gato, coelho, hamster e ave em uma composição sobre viagem internacional de pets" /><section className="ep-hero-showcase__vsl"><div className="ep-hero-showcase__video">{heroVideoFullLoaded ? <><video ref={heroVideoRef} src="/embarpet-hero-vsl.mp4" poster="/embarpet-hero-vsl-poster.jpg" aria-label="Acompanhamento Embarpet em contexto de viagem" autoPlay playsInline preload="auto" onPause={() => setHeroVideoPaused(true)} onPlay={() => setHeroVideoPaused(false)} /><button type="button" aria-label={heroVideoPaused ? "Reproduzir vídeo" : "Pausar vídeo"} className="ep-hero-video__sound is-playing" onClick={() => { if (heroVideoRef.current?.paused) void heroVideoRef.current.play(); else heroVideoRef.current?.pause(); }}>{heroVideoPaused ? <Play size={14} /> : <Pause size={14} />}</button></> : <button type="button" className="ep-hero-showcase__poster" aria-label="Reproduzir vídeo sobre a Embarpet" onClick={() => { setHeroVideoFullLoaded(true); setHeroVideoPaused(false); }}><img src="/embarpet-hero-vsl-poster.jpg" alt="Thamires Félix apresentando a operação da Embarpet" fetchPriority="high" decoding="async" /><span><Play size={18} fill="currentColor" /></span></button>}</div></section></aside>}>
      <div className="ep-hero-proof" aria-label="Mais de dois mil embarques realizados e avaliação 4,9 no Google"><div className="ep-hero-proof__metric"><span className="ep-team-avatars" aria-hidden="true"><i /><i /><i /><i /></span><strong>+2.000</strong><small>embarques<br />realizados</small></div><div className="ep-hero-proof__metric"><img src="/logo-google.svg" alt="Google" /><strong>4,9</strong><small>avaliação<br />no Google</small></div></div>
      <h1 className="ep-title-xl">{text.heroTitleBefore}<span className="ep-hero-highlight">{text.heroTitleHighlight}</span><span className="ep-hero-flags" aria-hidden="true">{["BR", "US", "PT", "ES", "IT"].map((code) => <img key={code} src={countryFlagSvg(code)} alt="" />)}</span></h1>
      <p className="ep-hero-route-intro">{text.heroIntro}<strong>{text.heroIntroStrong}</strong>{text.heroIntroAfter}</p>
      <button type="button" className="ep-hero-mobile-analysis" onClick={() => openAnalysis()}><span>Iniciar análise</span><ArrowRight size={18} aria-hidden="true" /></button>
      <div className="ep-conversion-hero__form"><HeroRouteStarter /></div>
    </ConversionHero>
    {message ? <div className="ep-container ep-home-notice"><Notice kind="success">{message}</Notice></div> : null}
    <EmbarkationMarquee />

    <section className="ep-home-modalities" id="modalidades"><div className="ep-container"><div className="ep-home-modalities__intro"><div><p className="ep-eyebrow">Modalidades de embarque</p><h2 className="ep-title-lg">Entenda como seu pet pode <em>viajar de avião.</em></h2></div><p className="ep-copy">Cabine, bagagem acompanhada, compartimento de cargas e suporte emocional funcionam de maneiras diferentes. Conheça cada modalidade antes de avaliarmos qual pode fazer sentido para o seu pet, a sua rota e a sua família.</p></div>
      <ModalityRail items={[
        { icon:"plane", title:"Viagem na cabine", copy:"Seu pet viaja com você dentro da cabine, acomodado em uma bolsa ou caixa aprovada pela companhia aérea. É a alternativa que mantém vocês mais próximos durante o voo quando porte, peso e rota atendem aos critérios.", ctaLabel:"Saiba mais", detailHref:path("/modalidades/viagem-na-cabine"), imageSrc:"/embarpet-modalidade-viagem-cabine.jpg", imageAlt:"Cachorro observando a paisagem pela janela durante uma viagem na cabine" },
        { icon:"document", title:"Bagagem acompanhada", copy:"Seu pet embarca no mesmo voo que você, em uma caixa de transporte adequada, e segue no compartimento apropriado da aeronave. Organizamos os requisitos para que pet e família cumpram o itinerário de forma coordenada.", ctaLabel:"Saiba mais", detailHref:path("/modalidades/bagagem-acompanhada"), imageSrc:"/embarpet-bagagem-acompanhada.webp", imageAlt:"Consultora Embarpet acompanhando pets em aeroporto" },
        { icon:"home", title:"Compartimento de cargas", copy:"Uma operação aérea dedicada ao transporte de animais vivos, com reserva, documentação e logística próprias. É uma alternativa flexível para diferentes portes e rotas e pode tornar a jornada mais prática e econômica.", ctaLabel:"Saiba mais", detailHref:path("/modalidades/compartimento-de-cargas"), imageSrc:"/embarpet-compartimento-cargas.jpg", imageAlt:"Pet em caixa de transporte na esteira operacional do aeroporto" },
        { icon:"shield", title:"Suporte emocional", copy:"Uma possibilidade para casos com necessidade comprovada de apoio emocional, sujeita às regras da companhia e às autorizações aplicáveis. Avaliamos a documentação e orientamos cada etapa para um embarque responsável.", ctaLabel:"Saiba mais", detailHref:path("/modalidades/suporte-emocional"), imageSrc:"/embarpet-suporte-emocional.jpg", imageAlt:"Família com pet em voo durante uma viagem" },
      ]} />
    </div></section>

    <section className="ep-home-service" id="servicos"><div className="ep-container ep-home-service__grid"><figure className="ep-home-ceo" aria-label="Thamires Félix, cofundadora da Embarpet"><div className="ep-home-ceo__glow" aria-hidden="true" /><img className="ep-home-ceo__portrait" src="/embarpet-thamires-felix.webp" alt="Thamires Félix, cofundadora da Embarpet" /><span className="ep-home-ceo__fade" aria-hidden="true" /><figcaption className="ep-home-service__identity"><strong>Thamires Félix</strong><span>Cofundadora da Embarpet</span></figcaption></figure><div className="ep-home-service__content"><p className="ep-eyebrow">Quem cuida da viagem</p><h2 className="ep-title-lg">Sua viagem internacional merece <em>clareza antes de cada decisão.</em></h2><p className="ep-copy">À frente da Embarpet, Thamires conecta <strong>atendimento, documentação e operação</strong> para transformar uma jornada complexa em próximos passos claros. Hoje, lidera uma equipe de <strong>mais de 30 especialistas</strong> dedicada a planejar cada embarque com o cuidado que o seu pet merece.</p><InternalLink className="ep-ds-button--on-dark" href="/equipe-e-credenciais">Conhecer a equipe Embarpet</InternalLink></div></div></section>

    <section className="ep-home-process-section" id="como-funciona"><div className="ep-container ep-home-process ep-home-process--framework"><div className="ep-home-process__intro"><p className="ep-eyebrow">Nosso processo</p><h2 className="ep-title-lg">Transformamos complexidade em <em>caminho.</em></h2><p className="ep-copy">Conectamos rota, perfil do pet, exigências e operação para que cada decisão tenha contexto antes de virar próximo passo.</p><a className="ep-home-process__cta" href="#analise"><span>Começar minha análise</span><ArrowRight size={18} aria-hidden="true" /></a></div><div className="ep-home-process__framework" aria-label="As quatro etapas da metodologia Embarpet"><ol>{[
      { icon:Globe2, title:"Entendemos a viagem", copy:"Origem, destino, prazo e o perfil do pet.", number:"01" },
      { icon:ClipboardCheck, title:"Desenhamos o plano", copy:"Possibilidades e cronograma para a família.", number:"02" },
      { icon:FileText, title:"Preparamos as etapas", copy:"Documentação e orientações do seu caso.", number:"03" },
      { icon:Headset, title:"Acompanhamos a operação", copy:"Marcos definidos até o próximo encontro.", number:"04" },
    ].map(({ icon: Icon, title, copy, number }) => <li key={title}><a href="#analise"><span className="ep-home-process__framework-number">{number}</span><span className="ep-home-process__framework-icon"><Icon size={21} strokeWidth={1.8} /></span><span className="ep-home-process__framework-copy"><strong>{title}</strong><small>{copy}</small></span><ArrowRight className="ep-home-process__framework-arrow" size={18} aria-hidden="true" /></a></li>)}</ol></div></div></section>

    <section className="ep-home-press" id="midia"><div className="ep-container"><div className="ep-home-press__heading"><p className="ep-eyebrow">Embarpet na mídia</p><h2 className="ep-title-lg">Quem vive a operação também ajuda a <em>explicar o setor.</em></h2><p className="ep-copy">Reportagens e conversas que traduzem, para famílias e para o mercado, o que muda em cada jornada internacional.</p></div><div className="ep-home-press__feature"><div className="ep-home-press__feature-copy"><h3>Thamires fala sobre os bastidores de uma <em>viagem internacional com pets.</em></h3><p>Uma conversa sobre decisão, planejamento e o cuidado necessário para transformar regras em uma jornada possível.</p><InternalLink href="https://www.youtube.com/watch?v=ERQ5Xajr0G0" external>Assistir completo</InternalLink></div><div className="ep-home-press__video">{podcastPlaying ? <iframe src="https://www.youtube-nocookie.com/embed/ERQ5Xajr0G0?autoplay=1&loop=1&playlist=ERQ5Xajr0G0&rel=0" title="Thamires Félix em podcast" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button type="button" aria-label="Assistir Thamires no YouTube" onClick={() => setPodcastPlaying(true)}><img src="https://i.ytimg.com/vi/ERQ5Xajr0G0/hqdefault.jpg" alt="Thamires em participação no podcast" loading="lazy" /><span><Play size={18} fill="currentColor" />Assistir completo</span></button>}</div></div><div className="ep-home-press__grid"><a href="https://revistapegn.globo.com/Mulheres-empreendedoras/fotos/2019/11/mulheres-empreendedoras-10-negocios-de-sucesso-liderados-por-mulheres.html" target="_blank" rel="noopener noreferrer"><b className="ep-media-logo ep-media-logo--pegn">PEGN <i>/ Globo</i></b><strong>Empreendedorismo feminino e o crescimento da Embarpet.</strong><span>Ler matéria <ArrowRight size={15} /></span></a><a href="https://catracalivre.com.br/viagem-livre/conheca-as-regras-para-viajar-de-aviao-com-animais-exoticos/" target="_blank" rel="noopener noreferrer"><b className="ep-media-logo ep-media-logo--catraca">Catraca Livre</b><strong>Regras para viajar de avião com animais exóticos.</strong><span>Ler matéria <ArrowRight size={15} /></span></a><a href="https://visitebrasilia.com.br/noticias/pet-nas-alturas-entenda-como-funcionam-os-tipos-de-embarque-e-qual-o-melhor-para-o-seu-animal-de-estimacao" target="_blank" rel="noopener noreferrer"><b className="ep-media-logo ep-media-logo--visite">Visite Brasília</b><strong>Tipos de embarque para pets explicados por quem opera.</strong><span>Ler matéria <ArrowRight size={15} /></span></a></div></div></section>

    <section className="ep-home-cases" id="historias"><CaseDragCards cases={[
      { id:"leandro-hassum", title:"Leandro Hassum", subtitle:"Brasil → Estados Unidos", instagramHandle:"@leandrohassum", instagramUrl:"https://www.instagram.com/leandrohassum/", imageSrc:"/case-leandro-hassum.jpeg", imageAlt:"Leandro Hassum e equipe Embarpet no aeroporto" },
      { id:"talles-magno", title:"Talles Magno", subtitle:"Brasil → Estados Unidos", instagramHandle:"@talles_magno", instagramUrl:"https://www.instagram.com/talles_magno/", imageSrc:"/case-talles-magno.jpg", imageAlt:"Tutor com pet em Nova York" },
      { id:"alan-franco", title:"Alan Franco", subtitle:"Brasil → Estados Unidos", instagramHandle:"@alanfranco_", instagramUrl:"https://www.instagram.com/alanfranco_/", imageSrc:images.documents, imageAlt:"Documentação para viagem com pet" },
      { id:"kiliquinha", title:"Kiliquinha", subtitle:"Brasil → Estados Unidos", instagramHandle:"@kiliquinha", instagramUrl:"https://www.instagram.com/kiliquinha/", imageSrc:images.service, videoSrc:"/case-kiliquinha-preview-5s.mp4", previewWebmSrc:"/case-kiliquinha-preview-5s.webm", fullVideoSrc:"/case-kiliquinha.mp4", imageAlt:"Vídeo da Kiliquinha em contexto de viagem" },
      { id:"renato-paiva", title:"Renato Paiva", subtitle:"Jornada internacional com a Embarpet", instagramHandle:"@renatopaiva009", instagramUrl:"https://www.instagram.com/renatopaiva009/", imageSrc:"/case-renato-paiva.jpeg", imageAlt:"Renato Paiva com a equipe Embarpet" },
    ]} /></section>

    <PetLuxoSection />

    <InternationalTransfer subtitle="O destino define os próximos passos" title={<>Para qual país você pretende <em>levar seu pet?</em></>} description="Cada país exige documentos, prazos e procedimentos próprios para a entrada de animais. Escolha o destino para iniciarmos a leitura da rota e entendermos o que precisa ser planejado para a viagem." regions={regions} onCountrySelect={(country) => {
      if (country.code === "us") {
        window.location.assign(path("/destinos/estados-unidos"));
        return;
      }
      startFromDestination(country.name);
    }} onOtherDestination={() => startFromDestination()} />

    <section className="ep-home-authority"><div className="ep-container ep-home-authority__grid"><div className="ep-home-authority__mosaic" aria-label="Momentos reais de embarques internacionais realizados pela Embarpet"><figure className="ep-home-authority__tile ep-home-authority__tile--main"><img src={images.documents} alt="Pet em viagem internacional diante de um destino icônico" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--talles"><img src="/embarpet-mosaico-cabine.jpeg" alt="Pet em cabine durante uma viagem internacional" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--leandro"><img src="/embarpet-mosaico-cuidado.jpg" alt="Tutor com pet em momento de cuidado" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--renato"><img src="/embarpet-mosaico-familia.jpg" alt="Família e pet aproveitando o destino" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--luxury"><img src="/embarpet-mosaico-encontro.jpg" alt="Tutora com pet em momento de encontro" /></figure></div><div className="ep-home-authority__content"><p className="ep-eyebrow">Experiência comprovada</p><h2 className="ep-title-lg">Não é só saber a regra. É saber <em>o que ela muda</em> na viagem de vocês.</h2><p className="ep-copy">Cada rota combina requisitos, prazo, documentação, companhia aérea e perfil do pet. Essa leitura integrada transforma informação em um plano possível.</p><div className="ep-home-authority__proof"><div><strong>+2.000</strong><span>embarques<br />realizados</span></div><div><img src="/logo-ipata.png" alt="IPATA" /><span>Membro IPATA</span></div><div><img src="/logo-iata.png" alt="IATA" /><span>Membro IATA</span></div></div><InternalLink href="/equipe-e-credenciais">Conheça nossa história</InternalLink></div></div></section>

    <section className="ep-section ep-container ep-home-faq" id="faq"><div><SectionHeading eyebrow="Dúvidas frequentes" title={<>Perguntas frequentes sobre <em>transporte aéreo de pets.</em></>} copy="Respostas claras para os pontos que mais geram dúvidas antes de uma viagem internacional com animal de estimação." /></div><div className="ds-faq"><FAQItem question="Como transportar meu animal de estimação em avião?">O transporte aéreo de animais começa pela análise de origem, destino, prazo, espécie, porte e regras da companhia aérea. Com isso, avaliamos possibilidades como viagem na cabine, bagagem acompanhada ou compartimento de cargas, além do planejamento da documentação.</FAQItem><FAQItem question="O deck inferior do avião é confortável para pets?">Quando a modalidade é bagagem acompanhada ou compartimento de cargas, o pet viaja em compartimento apropriado da aeronave. As condições dependem da companhia aérea, rota, caixa de transporte e critérios operacionais; por isso cada embarque precisa ser avaliado individualmente.</FAQItem><FAQItem question="Alguém viaja com meu animal no deck inferior?">O pet não viaja acompanhado por uma pessoa dentro do compartimento de transporte. A operação é conduzida pela companhia aérea e pelas equipes de solo; quando aplicável, o tutor segue no mesmo voo e recebe orientação sobre cada etapa do embarque.</FAQItem><FAQItem question="Animais braquicefálicos podem viajar de avião?">Cães e gatos braquicefálicos podem ter restrições específicas por causa de características respiratórias. A possibilidade de transporte aéreo depende da raça, condição veterinária, companhia aérea, rota e modalidade disponível no momento da viagem.</FAQItem><FAQItem question="O transporte aéreo de animais é seguro?">O transporte de pets por avião segue processos, normas e cuidados próprios, mas a segurança depende de uma decisão bem planejada: rota adequada, documentação, caixa correta, condição do animal e regras atualizadas da companhia aérea e do destino.</FAQItem><FAQItem question="Como preparar meu animal para o transporte aéreo?">A preparação para viagem de pet inclui adaptação à caixa de transporte, consulta veterinária quando indicada, documentação, rotina de alimentação e orientações para o dia do voo. O plano correto varia conforme o perfil do animal e a rota internacional.</FAQItem><FAQItem question="O que é CVI para viagem internacional com pet?">O CVI, ou Certificado Veterinário Internacional, é um documento oficial usado no processo de saída do Brasil com animal de estimação. Os requisitos e a emissão seguem o fluxo da autoridade competente e as exigências do país de destino.</FAQItem><FAQItem question="Como escolher a caixa de transporte ideal para meu pet?">A caixa de transporte para avião precisa respeitar as medidas do pet, ventilação, material, modalidade de embarque e regras da companhia aérea. Uma caixa adequada permite que o animal fique em posição natural e atende às especificações da viagem.</FAQItem></div></section>
    <ScrollFlyIn className="ep-final-fly-in" imageUrl="/embarpet-cta-plane-top.webp" imageAlt="Avião Embarpet cruzando a tela"><div className="mx-auto max-w-3xl px-4 text-center"><div className="ep-final-impact" aria-label="Mais de dois mil embarques realizados"><span className="ep-final-impact__avatars" aria-hidden="true"><i /><i /><i /><i /></span><strong>+2.000</strong><small>embarques<br />realizados</small></div><h2 className="mt-2 text-5xl font-bold leading-tight text-white md:text-7xl">Vamos começar a desenhar a <em>viagem do seu pet?</em></h2><p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">Conte o destino e os dados do seu pet. Com isso, nossa equipe começa a analisar o processo da viagem.</p><button type="button" onClick={() => document.getElementById("analise")?.scrollIntoView({ behavior:"smooth" })} className="ep-button ep-button--primary mt-8">Iniciar minha análise</button></div></ScrollFlyIn>
  </main><SiteFooter logoSrc="/logo-embarpet-dark.png" groups={[
    { title:"Planeje a viagem", links:[{ label:"Como funciona", href:"#como-funciona" },{ label:"Modalidades", href:"#modalidades" },{ label:"Destinos", href:"#destinos" }] },
    { title:"Conteúdo", links:[{ label:"Guias para viagem", href:"#guias" },{ label:"Histórias reais", href:"#historias" },{ label:"Perguntas frequentes", href:"#faq" }] },
    { title:"Embarpet", links:[{ label:"Sobre nós", href:"#sobre" },{ label:"Fale com a equipe", href:"#analise" },{ label:"Privacidade", href:"#privacidade" }] },
  ]} /><WhatsAppFloat context={leadContext} onStart={(context) => setMessage("Entrada WhatsApp preparada para " + (context.destination || "sua rota") + ".")} /></>;
}
