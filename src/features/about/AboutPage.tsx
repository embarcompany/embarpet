import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Heart,
  HeartHandshake,
  MapPin,
  PawPrint,
  Plane,
  Sparkles,
} from "lucide-react";
import { ConversionHero } from "../../design-system/patterns";
import { ScrollFlyIn } from "../../components/ui/hero-section-3";
import { CaseDragCards } from "../../components/ui/case-drag-cards";
import { SiteHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { AnalysisModal } from "../../components/ui/analysis-modal";
import { setPageMetadata } from "../../lib/seo";
import { WhatsAppFloat } from "../../components/ui/whatsapp-float";

const embarkationGallery = [
  { src: "/embarpet-marquee-airport-crate.webp", alt: "Pet e caixa de transporte prontos para o embarque", destination: "Canadá" },
  { src: "/embarpet-marquee-road-trip.webp", alt: "Pet em deslocamento para o aeroporto", destination: "Portugal" },
  { src: "/embarpet-marquee-cockatiel.webp", alt: "Ave em transporte especializado", destination: "Espanha" },
  { src: "/embarpet-marquee-carrier-car.webp", alt: "Pet em caixa de transporte durante o deslocamento", destination: "França" },
  { src: "/embarpet-marquee-window-flight.webp", alt: "Pet contemplando a vista pela janela do avião", destination: "Itália" },
  { src: "/embarpet-marquee-cabin-pomeranian.webp", alt: "Pet viajando confortavelmente na cabine", destination: "Argentina" },
  { src: "/embarpet-marquee-cabin-dog.webp", alt: "Cão viajando dentro da cabine do avião", destination: "Uruguai" },
  { src: "/embarpet-viagem-cabine.jpg", alt: "Pet em contexto de viagem na cabine", destination: "Estados Unidos" },
];

function EmbarkationMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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
        if (Math.abs(velocity) > 0.015) {
          offset += velocity * elapsed;
          velocity *= Math.pow(0.9, elapsed / 16.67);
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
    resizeObserver.observe(rail);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
    });
    intersectionObserver.observe(viewport);

    frame = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <section className="ep-embarkation-marquee" aria-label="Galeria de embarques internacionais de pets" ref={viewportRef}>
      <div className="ep-embarkation-marquee__track" ref={trackRef}>
        {rails.map((railIndex) => (
          <div key={railIndex} className="ep-embarkation-marquee__rail" aria-hidden={railIndex === 1}>
            {embarkationGallery.map(({ src, alt, destination }, itemIndex) => (
              <figure key={`${railIndex}-${itemIndex}`} className="ep-embarkation-marquee__item">
                <img src={src} alt={alt} loading="lazy" />
                <figcaption><span>{destination}</span></figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const methodologyStepsData = [
  {
    number: "01",
    icon: Compass,
    title: "Diagnóstico & Viabilidade da Rota",
    subtitle: "Análise estratégica de perfil e destino",
    copy: "Avaliamos cada detalhe da sua rota e do perfil do seu pet para definir o melhor itinerário e antecipar todas as exigências do país de destino.",
  },
  {
    number: "02",
    icon: Clock,
    title: "Planejamento Cronológico Integrado",
    subtitle: "Sincronia e previsibilidade em cada etapa",
    copy: "Estruturamos um cronograma seguro para que todas as etapas veterinárias, documentais e operacionais aconteçam na janela exata do voo.",
  },
  {
    number: "03",
    icon: Plane,
    title: "Coordenação Logística & Presença em Solo",
    subtitle: "Acompanhamento dedicado no aeroporto",
    copy: "Cuidamos das reservas junto às companhias aéreas e mantemos suporte presencial na nossa base operacional em Guarulhos (GRU).",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Embarque Seguro & Reencontro da Família",
    subtitle: "Tranquilidade até o abraço final",
    copy: "Acompanhamento contínuo em tempo real durante todo o trajeto, para que você viva a chegada ao novo país com total paz de espírito.",
  },
];

function AboutMethodologyPipeline({ onOpenAnalysis }: { onOpenAnalysis: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressHeight, setProgressHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.65;
      const endOffset = windowHeight * 0.35;

      const totalDistance = rect.height;
      const currentScroll = startOffset - rect.top;

      if (currentScroll <= 0) {
        setProgressHeight(0);
      } else if (currentScroll >= totalDistance) {
        setProgressHeight(100);
      } else {
        const pct = (currentScroll / totalDistance) * 100;
        setProgressHeight(Math.min(Math.max(pct, 0), 100));
      }

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const stepRect = el.getBoundingClientRect();
        if (stepRect.top <= startOffset && stepRect.bottom >= endOffset) {
          setActiveStep(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ep-about-pipeline" ref={containerRef}>
      {/* Connected Vertical Progress Line */}
      <div className="ep-about-pipeline__track" aria-hidden="true">
        <div
          className="ep-about-pipeline__bar"
          style={{ height: `${progressHeight}%` }}
        />
      </div>

      <div className="ep-about-pipeline__steps">
        {methodologyStepsData.map((step, idx) => {
          const Icon = step.icon;
          const isPassed = (progressHeight / 100) * methodologyStepsData.length >= idx + 0.3;
          const isCurrent = activeStep === idx;

          return (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[idx] = el; }}
              className={`ep-about-pipeline__step ${isPassed ? "is-passed" : ""} ${isCurrent ? "is-active" : ""}`}
            >
              <div className="ep-about-pipeline__marker">
                <div className="ep-about-pipeline__node">
                  <span>{step.number}</span>
                </div>
              </div>

              <div className="ep-about-pipeline__card">
                <div className="ep-about-pipeline__card-head">
                  <div className="ep-about-pipeline__card-icon">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="ep-about-pipeline__card-eyebrow">Etapa {step.number}</span>
                    <h3 className="ep-about-pipeline__card-title">{step.title}</h3>
                    <p className="ep-about-pipeline__card-subtitle">{step.subtitle}</p>
                  </div>
                </div>

                <p className="ep-about-pipeline__card-copy">{step.copy}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisRoute, setAnalysisRoute] = useState<{ origin?: string; destination?: string }>({});

  useEffect(() => {
    setPageMetadata({
      title: "Nossa História & Propósito | Embarpet — Transporte Aéreo Internacional de Pets",
      description:
        "Conheça a história da Embarpet: fundada em 2018 por Daiane Sarmento e Thamires Felix para transformar a complexidade de viajar com pets em um plano seguro. O destino pode mudar. A família vai junto.",
      canonicalPath: "/sobre",
    });
  }, []);

  const openAnalysis = (route = {}) => {
    setAnalysisRoute(route);
    setAnalysisOpen(true);
  };

  return (
    <div className="ep-about-page-v2">
      <AnalysisModal
        open={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        initialRoute={analysisRoute}
        analyticsSource="about_modal"
      />

      <SiteHeader overlay logoSrc="/brand/embarpet_full_logo_word-white_support-cyan_tagline-cyan.svg" activeLabel="Sobre" />

      <main className="ep-about-main">
        {/* ==================================================================
            1. HERO: Institucional, Autoritária e Humanizada
            ================================================================== */}
        <ConversionHero
          aside={
            <aside className="ep-about-hero-showcase" aria-label="Liderança e Base Operacional Embarpet">
              <div className="ep-about-hero-showcase__frame">
                <img
                  src="/embarpet-ceo-equipe-trim.webp"
                  alt="Daiane Sarmento, Thamires Felix e a equipe da Embarpet reunida"
                  className="ep-about-hero-showcase__image"
                  fetchPriority="high"
                />
                <div className="ep-about-hero-showcase__badge">
                  <div className="ep-about-hero-showcase__badge-icon">
                    <MapPin size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <strong>Base Operacional em Guarulhos / SP (GRU)</strong>
                    <small>R. Leonor Bresser Corrêa, 33 · Prontidão e suporte presencial no aeroporto</small>
                  </div>
                </div>
              </div>
            </aside>
          }
        >
          {/* Institutional Eyebrow & Social Proof */}
          <div className="ep-about-hero-top">
            <span className="ep-eyebrow">
              <Sparkles size={13} aria-hidden="true" /> Embarpet · Nossa História & Propósito
            </span>

            <div className="ep-hero-proof" aria-label="Pioneirismo em transporte internacional de pets">
              <div className="ep-hero-proof__metric">
                <span className="ep-team-avatars" aria-hidden="true"><i /><i /><i /><i /></span>
                <strong>+2.000</strong>
                <small>embarques<br />realizados</small>
              </div>
              <div className="ep-hero-proof__metric">
                <img src="/logo-google.svg" alt="Google" />
                <strong>4,9</strong>
                <small>avaliação<br />no Google</small>
              </div>
            </div>
          </div>

          <h1 className="ep-title-xl">
            Mais do que transportar animais.{" "}
            <span className="ep-hero-highlight">Conectamos famílias em qualquer lugar do mundo.</span>
          </h1>

          <p className="ep-hero-route-intro">
            Fundada em 2018 por <strong>Daiane Sarmento e Thamires Felix</strong>, a Embarpet nasceu para transformar a burocracia de viagens internacionais com pets em um caminho seguro, previsível e acolhedor.
          </p>

          {/* Hero Actions */}
          <div className="ep-about-hero-actions">
            <button type="button" className="ep-button ep-button--primary" onClick={() => openAnalysis()}>
              Iniciar análise da viagem <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a href="#origem" className="ep-about-hero-link">
              Conhecer nossa história ↓
            </a>
          </div>
        </ConversionHero>

        {/* ==================================================================
            2. EMBARKATION MARQUEE: Galeria contínua de embarques reais
            ================================================================== */}
        <EmbarkationMarquee />

        {/* ==================================================================
            3. A ORIGEM (2018): E foi assim que a Embarpet começou.
            ================================================================== */}
        <section className="ep-section ep-container ep-about-origin-section" id="origem">
          <div className="ep-home-split-heading">
            <div>
              <span className="ep-eyebrow">Fundação em 2018</span>
              <h2 className="ep-title-lg" style={{ marginTop: "14px" }}>
                E foi assim que a <em>Embarpet começou.</em>
              </h2>
            </div>
            <p className="ep-copy">
              Não nasceu grande. Nasceu com <strong>R$ 4 mil de investimento, conhecimento, coragem e um propósito real para resolver.</strong>
            </p>
          </div>

          <div className="ep-about-origin-bento">
            <div className="ep-about-origin-card ep-about-origin-card--featured">
              <div className="ep-about-origin-card__content">
                <span className="ep-about-origin-tag">A Centelha em Portugal</span>
                <h3>Transformar a distância entre o amor e a burocracia em um caminho seguro.</h3>
                <p>
                  Foi enxergando essa dificuldade de perto que <strong>Daiane Sarmento e Thamires Felix</strong> decidiram, em 2018, transformar um problema em uma solução definitiva. As duas perceberam que existia um abismo entre o desejo das famílias de viajar com seus pets e a complexidade de tornar essa viagem real.
                </p>
              </div>
              <div className="ep-about-origin-card__media">
                <img src="/embarpet-thamires-felix.webp" alt="Thamires Felix, cofundadora da Embarpet" />
                <div className="ep-about-origin-card__caption">
                  <strong>Thamires Felix & Daiane Sarmento</strong>
                  <span>Fundadoras da Embarpet</span>
                </div>
              </div>
            </div>

            <div className="ep-about-origin-card ep-about-origin-card--highlight">
              <div className="ep-about-origin-badge">R$ 4.000</div>
              <h4>Investimento inicial</h4>
              <p>
                No início, o objetivo era descomplicar a documentação. Mas cada novo embarque mostrava que o tutor precisava de uma gestão completa de ponta a ponta.
              </p>
            </div>

            <div className="ep-about-origin-card ep-about-origin-card--evolution">
              <span className="ep-about-origin-tag">A Evolução</span>
              <h4>Da assessoria à operação logística aérea</h4>
              <p>
                Hoje somos uma estrutura completa com mais de 30 especialistas, coordenando rotas, companhias aéreas, prazos e suporte presencial em Guarulhos.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. METODOLOGIA: Centralizada, Minimalista e Assertiva
            ================================================================== */}
        <section className="ep-about-methodology-section" id="metodologia">
          <div className="ep-container ep-about-methodology-container">
            <div className="ep-about-methodology-header">
              <span className="ep-eyebrow">Metodologia Embarpet</span>
              <h2 className="ep-title-lg">
                Do diagnóstico inicial ao <em>abraço no destino.</em>
              </h2>
              <p className="ep-copy">
                Nossa metodologia conecta inteligência de rota, controle de prazos e suporte presencial em 4 etapas integradas para uma viagem segura e sem imprevistos.
              </p>
            </div>

            {/* Continuous Vertical Animated Pipeline */}
            <AboutMethodologyPipeline onOpenAnalysis={() => openAnalysis()} />

            <div className="ep-about-methodology-footer">
              <button type="button" className="ep-button ep-button--primary" onClick={() => openAnalysis()}>
                Planejar a viagem do meu pet <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. A MUDANÇA DE PERSPECTIVA (Deep Teal Editorial Card)
            ================================================================== */}
        <section className="ep-about-perspective-section" id="perspectiva">
          <div className="ep-container ep-about-perspective-grid">
            <div className="ep-about-perspective-content">
              <span className="ep-eyebrow">Mudança de Perspectiva</span>
              <h2 className="ep-title-lg" style={{ marginTop: "14px" }}>
                A cada embarque, a <em>missão ficava mais clara.</em>
              </h2>
              <p className="ep-copy">
                Acompanhamos famílias inteiras mudando de vida. Para nós, a responsabilidade de embarcar um animal é absoluta.
              </p>
              <div className="ep-about-perspective-contrast">
                <div className="ep-about-perspective-contrast__box ep-about-perspective-contrast__box--old">
                  <small>A pergunta comum do mercado:</small>
                  <p>“Como colocar esse animal em um avião?”</p>
                </div>
                <div className="ep-about-perspective-contrast__arrow">➔</div>
                <div className="ep-about-perspective-contrast__box ep-about-perspective-contrast__box--new">
                  <small>A diretriz inegociável da Embarpet:</small>
                  <strong>“Como fazer esse pet chegar ao destino com total segurança, conforto e a menor preocupação para a sua família?”</strong>
                </div>
              </div>
            </div>

            <div className="ep-about-perspective-media">
              <img src="/embarpet-ceo-equipe-trim.webp" alt="Liderança da Embarpet" className="ep-about-perspective-portrait" />
              <div className="ep-about-perspective-caption">
                <strong>Equipe & Liderança Embarpet</strong>
                <span>Mais de 30 especialistas dedicados a cada rota internacional</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. O MANIFESTO HUMANO: Porque nunca foi apenas sobre transportar pets
            ================================================================== */}
        <section className="ep-about-manifesto-section" id="manifesto">
          <div className="ep-container ep-about-manifesto-container">
            <div className="ep-about-authority-mosaic" aria-label="Momentos reais de reencontros e embarques">
              <figure className="ep-about-mosaic-tile ep-about-mosaic-tile--main">
                <img src="/embarpet-autoridade-destino-real.jpeg" alt="Pet em viagem internacional com documentos oficiais" />
              </figure>
              <figure className="ep-about-mosaic-tile ep-about-mosaic-tile--talles">
                <img src="/embarpet-mosaico-cabine.jpeg" alt="Pet acomodado na cabine do avião" />
              </figure>
              <figure className="ep-about-mosaic-tile ep-about-mosaic-tile--leandro">
                <img src="/embarpet-mosaico-cuidado.jpg" alt="Acolhimento e carinho com o pet antes do embarque" />
              </figure>
              <figure className="ep-about-mosaic-tile ep-about-mosaic-tile--renato">
                <img src="/embarpet-mosaico-familia.jpg" alt="Família reunida no destino internacional" />
              </figure>
              <figure className="ep-about-mosaic-tile ep-about-mosaic-tile--luxury">
                <img src="/embarpet-mosaico-encontro.jpg" alt="O reencontro no desembarque do aeroporto" />
              </figure>
            </div>

            <div className="ep-about-manifesto-content">
              <span className="ep-eyebrow">Nosso Manifesto</span>
              <h2 className="ep-title-lg" style={{ marginTop: "14px" }}>
                Porque nunca foi apenas sobre <em>transportar pets.</em>
              </h2>
              
              <div className="ep-about-manifesto-grid">
                <div className="ep-about-manifesto-item">
                  <span>Um aeroporto</span>
                  <b>Enxerga uma caixa de transporte.</b>
                </div>
                <div className="ep-about-manifesto-item">
                  <span>Uma companhia aérea</span>
                  <b>Enxerga uma reserva de espaço.</b>
                </div>
                <div className="ep-about-manifesto-item">
                  <span>A autoridade sanitária</span>
                  <b>Enxerga carimbos e documentos.</b>
                </div>
                <div className="ep-about-manifesto-item ep-about-manifesto-item--highlight">
                  <span>Nós, na Embarpet</span>
                  <b>Nós enxergamos a sua família.</b>
                </div>
              </div>

              <div className="ep-about-reunion-steps">
                <span><PawPrint size={14} /> O desembarque</span>
                <span><CheckCircle2 size={14} /> A porta abrindo</span>
                <span><Heart size={14} /> O rabo abanando</span>
                <span><HeartHandshake size={14} /> O primeiro colo</span>
              </div>

              <div className="ep-about-authority-proof" style={{ marginTop: "24px" }}>
                <div><strong>+2.000</strong><span>embarques<br />realizados</span></div>
                <div><img src="/logo-ipata.png" alt="IPATA" /><span>Membro IPATA</span></div>
                <div><img src="/logo-iata.png" alt="IATA" /><span>Membro IATA</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            7. BASE OPERACIONAL EM GUARULHOS & CREDENCIAIS
            ================================================================== */}
        <section className="ep-section ep-container ep-about-base-section" id="base">
          <div className="ep-about-base-card">
            <div className="ep-about-base-card__info">
              <span className="ep-eyebrow">Presença Física Estratégica</span>
              <h2 className="ep-title-lg" style={{ color: "#ffffff", marginTop: "14px" }}>
                Base de Apoio em Guarulhos / SP (GRU)
              </h2>
              <p className="ep-copy" style={{ color: "rgba(255,255,255,0.85)", marginTop: "14px" }}>
                Nossa sede física e equipe de solo estão estrategicamente posicionadas em Guarulhos, a poucos minutos do Aeroporto Internacional de São Paulo (GRU), garantindo suporte presencial no MAPA, conexões e assistência direta aos pets.
              </p>
              <div className="ep-about-base-card__address">
                <MapPin size={18} />
                <div>
                  <strong>R. Leonor Bresser Corrêa, 33 - Vila Miriam, Guarulhos - SP, CEP 07110-130</strong>
                  <small>CNPJ: 29.922.919/0001-14 · Grupo Embarcompany</small>
                </div>
              </div>
            </div>

            <div className="ep-about-base-card__credentials">
              <span className="ep-about-base-card__cred-title">Reconhecimento & Credenciais Oficiais:</span>
              <div className="ep-about-base-card__logos">
                <div className="ep-about-cred-pill"><img src="/logo-ipata.svg" alt="IPATA" /><span>Membro IPATA</span></div>
                <div className="ep-about-cred-pill"><img src="/logo-iata.svg" alt="IATA" /><span>Normas IATA LAR</span></div>
                <div className="ep-about-cred-pill"><img src="/logo-reclame-aqui.webp" alt="Reclame Aqui" /><span>Selo RA1000</span></div>
                <div className="ep-about-cred-pill"><img src="/logo-globo.svg" alt="Globo PEGN" /><span>Destaque PEGN</span></div>
                <div className="ep-about-cred-pill"><img src="/logo-catraca-livre.png" alt="Catraca Livre" /><span>Catraca Livre</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8. CASOS REAIS: CaseDragCards
            ================================================================== */}
        <section className="ep-about-cases-section" id="historias">
          <CaseDragCards
            cases={[
              { id: "leandro-hassum", title: "Leandro Hassum", subtitle: "Brasil → Estados Unidos", instagramHandle: "@leandrohassum", instagramUrl: "https://www.instagram.com/leandrohassum/", imageSrc: "/case-leandro-hassum.jpeg", imageAlt: "Leandro Hassum e equipe Embarpet no aeroporto" },
              { id: "talles-magno", title: "Talles Magno", subtitle: "Brasil → Estados Unidos", instagramHandle: "@talles_magno", instagramUrl: "https://www.instagram.com/talles_magno/", imageSrc: "/case-talles-magno.jpg", imageAlt: "Tutor com pet em Nova York" },
              { id: "renato-paiva", title: "Renato Paiva", subtitle: "Jornada internacional com a Embarpet", instagramHandle: "@renatopaiva009", instagramUrl: "https://www.instagram.com/renatopaiva009/", imageSrc: "/case-renato-paiva.jpeg", imageAlt: "Renato Paiva com a equipe Embarpet" },
              { id: "kiliquinha", title: "Kiliquinha", subtitle: "Brasil → Estados Unidos", instagramHandle: "@kiliquinha", instagramUrl: "https://www.instagram.com/kiliquinha/", imageSrc: "/embarpet-service-management.webp", videoSrc: "/case-kiliquinha-preview-5s.mp4", previewWebmSrc: "/case-kiliquinha-preview-5s.webm", fullVideoSrc: "/case-kiliquinha.mp4", imageAlt: "Vídeo da Kiliquinha em contexto de viagem" },
            ]}
          />
        </section>

        {/* ==================================================================
            9. FINAL IMPACT & CTA: ScrollFlyIn (O destino pode mudar. A família vai junto.)
            ================================================================== */}
        <ScrollFlyIn className="ep-final-fly-in" imageUrl="/embarpet-cta-plane-top.webp" imageAlt="Avião Embarpet cruzando a tela">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="ep-final-impact" aria-label="Mais de dois mil embarques realizados">
              <span className="ep-final-impact__avatars" aria-hidden="true"><i /><i /><i /><i /></span>
              <strong>+2.000</strong>
              <small>embarques<br />realizados</small>
            </div>
            <p className="ep-about-final-manifesto-quote">
              “Documentos atravessam fronteiras. Aviões atravessam oceanos. Mas aquilo que realmente levamos de um lugar para outro é muito maior: <strong>histórias, vínculos e famílias.</strong>”
            </p>
            <h2 className="mt-2 text-5xl font-bold leading-tight text-white md:text-7xl">
              O destino pode mudar. <em style={{ color: "var(--ep-lime)", fontStyle: "normal" }}>A família vai junto.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">
              Conte o destino e os dados do seu pet. Nossa equipe começa a desenhar o plano de viagem de vocês hoje mesmo.
            </p>
            <button type="button" onClick={() => openAnalysis()} className="ep-button ep-button--primary mt-8">
              Iniciar análise da viagem
            </button>
          </div>
        </ScrollFlyIn>
      </main>

      <WhatsAppFloat />

      <SiteFooter
        logoSrc="/logo-embarpet-dark.png"
        note="Especialistas em transporte aéreo internacional de animais — Grupo Embarcompany."
        onAnalysisClick={() => openAnalysis()}
      />
    </div>
  );
}
