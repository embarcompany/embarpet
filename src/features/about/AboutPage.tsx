import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Globe2,
  Heart,
  HeartHandshake,
  HelpCircle,
  Luggage,
  MapPin,
  MessageCircle,
  Navigation,
  PawPrint,
  Plane,
  Route,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { ConversionHero } from "../../design-system/patterns";
import { ScrollFlyIn } from "../../components/ui/hero-section-3";
import { CaseDragCards } from "../../components/ui/case-drag-cards";
import { SiteHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { AnalysisModal } from "../../components/ui/analysis-modal";
import { InternalLink } from "../../components/ui/buttons";
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

export default function AboutPage() {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisRoute, setAnalysisRoute] = useState<{ origin?: string; destination?: string }>({});
  const [activeDoubt, setActiveDoubt] = useState<number | null>(0);

  useEffect(() => {
    setPageMetadata({
      title: "Nossa História | Sobre a Embarpet — Especialistas em Transporte Internacional de Pets",
      description:
        "Conheça a história da Embarpet: fundada em 2018 por Daiane Sarmento e Thamires Felix para transformar a complexidade de viajar com pets em um plano seguro. O destino pode mudar. A família vai junto.",
      canonicalPath: "/sobre",
    });
  }, []);

  const openAnalysis = (route = {}) => {
    setAnalysisRoute(route);
    setAnalysisOpen(true);
  };

  const doubtQuestions = [
    {
      q: "Qual documento é necessário?",
      ans: "Cada país exige um conjunto sanitário próprio: microchipagem padrão ISO, vacina antirrábica, sorologia laboratorial e a emissão oficial do CVI (Certificado Veterinário Internacional) junto ao MAPA.",
    },
    {
      q: "Qual companhia aceita meu pet?",
      ans: "Mapeamos a malha de companhias aéreas internacionais compatíveis com o porte, raça e modalidade pretendida, negociando as reservas operacionais diretamente com as companhias.",
    },
    {
      q: "Ele pode viajar comigo?",
      ans: "Avaliamos se o pet atende aos critérios para viajar na Cabine, como Bagagem Acompanhada no mesmo voo ou em Carga Viva com itinerário monitorado.",
    },
    {
      q: "Essa rota é segura?",
      ans: "Priorizamos voos diretos e conexões com tempo adequado e instalações aeroportuárias climatizadas, reduzindo o estresse e o tempo total de viagem do animal.",
    },
    {
      q: "E se alguma coisa der errado?",
      ans: "Nossa equipe de solo e plantão em Guarulhos (GRU) acompanha vistorias oficiais, conexão e alfândega, com suporte humano em tempo real via WhatsApp.",
    },
  ];

  const methodologySteps = [
    { number: "01", icon: Compass, title: "Legislação do Destino", copy: "Interpretação rigorosa das exigências sanitárias do país pretendido." },
    { number: "02", icon: Clock, title: "Planejamento de Prazos", copy: "Cronograma de sorologia, vacinas e janelas oficiais de emissão." },
    { number: "03", icon: Route, title: "Rotas & Conexões Seguras", copy: "Seleção de itinerários com menor tempo de solo e conexões viáveis." },
    { number: "04", icon: Plane, title: "Companhias Aéreas", copy: "Comunicação técnica, reserva de espaço e confirmação de voo." },
    { number: "05", icon: Stethoscope, title: "Coordenação Veterinária", copy: "Acompanhamento com clínicas e laboratórios credenciados." },
    { number: "06", icon: Luggage, title: "Ambientação & Caixa IATA", copy: "Orientação para caixa de transporte adequada às normas IATA LAR." },
    { number: "07", icon: FileCheck2, title: "Vigiagro / MAPA & CVI", copy: "Acompanhamento presencial da vistoria oficial e emissão do CVI." },
    { number: "08", icon: ShieldCheck, title: "Desembaraço & Chegada", copy: "Gestão aduaneira e acolhimento seguro no desembarque internacional." },
  ];

  return (
    <div className="ep-about-page-v2">
      <AnalysisModal
        open={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        initialRoute={analysisRoute}
        analyticsSource="about_modal"
      />

      <SiteHeader overlay logoSrc="/brand/embarpet_full_logo_word-white_support-cyan_tagline-cyan.svg" activeLabel="Sobre" />

      <main>
        {/* ==================================================================
            1. HERO: ConversionHero (Bright IDV Gradient, Asymmetric, Polished)
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
                    <small>R. Leonor Bresser Corrêa, 33 · Prontidão e suporte presencial no maior hub do Brasil</small>
                  </div>
                </div>
              </div>
            </aside>
          }
        >
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

          <h1 className="ep-title-xl">
            Todo grande embarque começa <span className="ep-hero-highlight">muito antes do aeroporto.</span>
          </h1>

          <p className="ep-hero-route-intro">
            Antes da Embarpet existir, viajar para outro país com um pet significava enfrentar uma sequência de dúvidas.{" "}
            <strong>Para quem ama um animal como família, é a responsabilidade de colocar alguém insubstituível em um avião e confiar que ele chegará bem.</strong>
          </p>

          <div className="ep-about-hero-doubts" aria-label="Dúvidas comuns antes do embarque">
            <span className="ep-about-hero-doubts__title">
              <HelpCircle size={14} aria-hidden="true" /> As dúvidas que todo tutor já enfrentou:
            </span>
            <div className="ep-about-hero-doubts__chips">
              {doubtQuestions.map((item, idx) => (
                <button
                  key={item.q}
                  type="button"
                  className={`ep-about-doubt-chip ${activeDoubt === idx ? "is-active" : ""}`}
                  onClick={() => setActiveDoubt(activeDoubt === idx ? null : idx)}
                >
                  <ShieldAlert size={12} aria-hidden="true" />
                  <span>{item.q}</span>
                </button>
              ))}
            </div>
            {activeDoubt !== null && doubtQuestions[activeDoubt] ? (
              <div className="ep-about-doubt-answer" role="region" aria-live="polite">
                <strong>{doubtQuestions[activeDoubt].q}</strong>
                <p>{doubtQuestions[activeDoubt].ans}</p>
              </div>
            ) : null}
          </div>

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
            2. EMBARKATION MARQUEE: Live stream of real traveling pets
            ================================================================== */}
        <EmbarkationMarquee />

        {/* ==================================================================
            3. A ORIGEM (2018): E foi assim que a Embarpet começou.
            ================================================================== */}
        <section className="ep-section ep-container ep-about-origin-section" id="origem">
          <div className="ep-home-split-heading">
            <div>
              <p className="ep-eyebrow">Fundação em 2018</p>
              <h2 className="ep-title-lg">E foi assim que a <em>Embarpet começou.</em></h2>
            </div>
            <p className="ep-copy">
              Não nasceu grande. Não nasceu com uma estrutura gigantesca. Nasceu com <strong>R$ 4 mil de investimento, conhecimento, coragem e um problema real para resolver.</strong>
            </p>
          </div>

          <div className="ep-about-origin-bento">
            <div className="ep-about-origin-card ep-about-origin-card--featured">
              <div className="ep-about-origin-card__content">
                <span className="ep-about-origin-tag">A Centelha em Portugal</span>
                <h3>Transformar a distância entre o amor e a burocracia em um caminho seguro.</h3>
                <p>
                  Foi enxergando essa dificuldade de perto que <strong>Daiane Sarmento e Thamires Felix</strong> decidiram, em 2018, transformar um problema em uma solução definitiva. Depois de uma experiência em Portugal e do contato de Thamires com a rotina de documentação sanitária, as duas perceberam que existia um abismo entre o desejo das pessoas de viajar com seus pets e a complexidade de tornar essa viagem possível.
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
                No início, o objetivo era ajudar tutores a entender e organizar a documentação para outros países. Mas cada novo embarque mostrava uma coisa: <em>o tutor precisava de muito mais.</em>
              </p>
            </div>

            <div className="ep-about-origin-card ep-about-origin-card--evolution">
              <span className="ep-about-origin-tag">A Evolução</span>
              <h4>Da assessoria à operação logística aérea</h4>
              <p>
                Não bastava entregar uma lista de documentos. Era preciso entender a legislação do destino, planejar prazos, encontrar rotas viáveis, negociar com companhias aéreas, coordenar processos veterinários, preparar o animal e cuidar da liberação alfandegária.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. METODOLOGIA: Do Documento à Operação Completa (8 Passos)
            ================================================================== */}
        <section className="ep-home-process-section" id="metodologia">
          <div className="ep-container ep-home-process ep-home-process--framework">
            <div className="ep-home-process__intro">
              <p className="ep-eyebrow">Metodologia Integrada</p>
              <h2 className="ep-title-lg">Do documento à <em>operação completa.</em></h2>
              <p className="ep-copy">
                Uma viagem internacional com animais vivos exige sincronia absoluta entre múltiplos órgãos oficiais, companhias aéreas e prazos biológicos rígidos.
              </p>
              <button type="button" className="ep-home-process__cta" onClick={() => openAnalysis()}>
                <span>Planejar embarque do pet</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="ep-home-process__framework" aria-label="Os 8 passos da metodologia Embarpet">
              <ol>
                {methodologySteps.map(({ icon: Icon, title, copy, number }) => (
                  <li key={title}>
                    <a href="#analise" onClick={(e) => { e.preventDefault(); openAnalysis(); }}>
                      <span className="ep-home-process__framework-number">{number}</span>
                      <span className="ep-home-process__framework-icon">
                        <Icon size={20} strokeWidth={1.8} />
                      </span>
                      <span className="ep-home-process__framework-copy">
                        <strong>{title}</strong>
                        <small>{copy}</small>
                      </span>
                      <ArrowRight className="ep-home-process__framework-arrow" size={18} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. A MUDANÇA DE PERSPECTIVA (Deep Teal Editorial Card)
            ================================================================== */}
        <section className="ep-home-service ep-about-perspective-card" id="perspectiva">
          <div className="ep-container ep-home-service__grid">
            <div className="ep-home-service__content">
              <p className="ep-eyebrow">Mudança de Perspectiva</p>
              <h2 className="ep-title-lg">A cada embarque, a <em>missão ficava mais clara.</em></h2>
              <p className="ep-copy">
                Acompanhamos famílias mudando de país, brasileiros começando uma nova vida no exterior, pessoas retornando para casa, tutores estudando fora, cães, gatos, aves, roedores e animais com exigências específicas.
              </p>
              <div className="ep-about-perspective-contrast">
                <div className="ep-about-perspective-contrast__box ep-about-perspective-contrast__box--old">
                  <small>A pergunta comum do mercado:</small>
                  <p>“Como colocar esse animal em um avião?”</p>
                </div>
                <div className="ep-about-perspective-contrast__arrow">➔</div>
                <div className="ep-about-perspective-contrast__box ep-about-perspective-contrast__box--new">
                  <small>A diretriz inegociável da Embarpet:</small>
                  <strong>“Qual é a melhor forma de fazer esse pet chegar ao destino com segurança, dentro das exigências e com o menor nível possível de preocupação para sua família?”</strong>
                </div>
              </div>
            </div>

            <figure className="ep-home-ceo" aria-label="Equipe e liderança Embarpet">
              <div className="ep-home-ceo__glow" aria-hidden="true" />
              <img className="ep-home-ceo__portrait" src="/embarpet-ceo-equipe-trim.webp" alt="Liderança da Embarpet" />
              <span className="ep-home-ceo__fade" aria-hidden="true" />
              <figcaption className="ep-home-service__identity">
                <strong>Equipe & Liderança Embarpet</strong>
                <span>Mais de 30 especialistas dedicados a cada rota internacional</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ==================================================================
            6. O MANIFESTO HUMANO: Porque nunca foi apenas sobre transportar pets
            ================================================================== */}
        <section className="ep-home-authority" id="manifesto">
          <div className="ep-container ep-home-authority__grid">
            <div className="ep-home-authority__mosaic" aria-label="Momentos reais de reencontros e embarques">
              <figure className="ep-home-authority__tile ep-home-authority__tile--main">
                <img src="/embarpet-autoridade-destino-real.jpeg" alt="Pet em viagem internacional com documentos oficiais" />
              </figure>
              <figure className="ep-home-authority__tile ep-home-authority__tile--talles">
                <img src="/embarpet-mosaico-cabine.jpeg" alt="Pet acomodado na cabine do avião" />
              </figure>
              <figure className="ep-home-authority__tile ep-home-authority__tile--leandro">
                <img src="/embarpet-mosaico-cuidado.jpg" alt="Acolhimento e carinho com o pet antes do embarque" />
              </figure>
              <figure className="ep-home-authority__tile ep-home-authority__tile--renato">
                <img src="/embarpet-mosaico-familia.jpg" alt="Família reunida no destino internacional" />
              </figure>
              <figure className="ep-home-authority__tile ep-home-authority__tile--luxury">
                <img src="/embarpet-mosaico-encontro.jpg" alt="O reencontro no desembarque do aeroporto" />
              </figure>
            </div>

            <div className="ep-home-authority__content">
              <p className="ep-eyebrow">Nosso Manifesto</p>
              <h2 className="ep-title-lg">Porque nunca foi apenas sobre <em>transportar pets.</em></h2>
              
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
                  <b>Nós enxergamos uma família.</b>
                </div>
              </div>

              <p className="ep-copy" style={{ marginTop: "20px" }}>
                Enxergamos o tutor que passa a noite anterior sem dormir, quem pergunta três vezes para ter certeza, a família que atravessou um oceano e só sente que a mudança terminou quando vê seu companheiro chegar.
              </p>

              <div className="ep-about-reunion-steps">
                <span><PawPrint size={14} /> O desembarque</span>
                <span><CheckCircle2 size={14} /> A porta abrindo</span>
                <span><Heart size={14} /> O rabo abanando</span>
                <span><HeartHandshake size={14} /> O primeiro colo</span>
              </div>

              <div className="ep-home-authority__proof" style={{ marginTop: "28px" }}>
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
              <p className="ep-eyebrow" style={{ color: "var(--ep-turq)" }}>Presença Física Estratégica</p>
              <h2 className="ep-title-lg" style={{ color: "#ffffff", marginTop: "10px" }}>
                Base de Apoio em Guarulhos / SP (GRU)
              </h2>
              <p className="ep-copy" style={{ color: "rgba(255,255,255,0.85)", marginTop: "14px" }}>
                Nossa sede física e equipe de solo estão estrategicamente posicionadas em Guarulhos, a poucos minutos do Aeroporto Internacional de São Paulo (GRU), garantindo suporte presencial no Vigiagro/MAPA, acolhimento de pets em conexões nacionais e assistência direta no momento mais importante da viagem.
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
        <section className="ep-home-cases" id="historias">
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
