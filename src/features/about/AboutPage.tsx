import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
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
import { SiteHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { AnalysisModal } from "../../components/ui/analysis-modal";
import { AnalysisButton } from "../../components/ui/buttons";
import { setPageMetadata } from "../../lib/seo";
import { WhatsAppFloat } from "../../components/ui/whatsapp-float";

export default function AboutPage() {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisSource, setAnalysisSource] = useState("about_hero");

  useEffect(() => {
    setPageMetadata({
      title: "Nossa História | Sobre a Embarpet — Transporte Internacional de Pets",
      description:
        "Conheça a história da Embarpet: fundada em 2018 por Daiane Sarmento e Thamires Felix para transformar a complexidade de viajar com pets em um plano seguro. O destino pode mudar. A família vai junto.",
      canonicalPath: "/sobre",
    });
  }, []);

  const openAnalysis = (source = "about_hero") => {
    setAnalysisSource(source);
    setAnalysisOpen(true);
  };

  const initialDoubtQuestions = [
    "Qual documento é necessário?",
    "Qual companhia aceita meu pet?",
    "Ele pode viajar comigo?",
    "Essa rota é segura?",
    "E se alguma coisa der errado?",
  ];

  const evolutionSteps = [
    {
      icon: Compass,
      title: "Legislação do Destino",
      desc: "Interpretação rigorosa das exigências sanitárias atualizadas de cada país.",
    },
    {
      icon: Clock,
      title: "Planejamento de Prazos",
      desc: "Cronograma de sorologia, vacinas e janelas de emissão oficial do CVI.",
    },
    {
      icon: Route,
      title: "Rotas & Conexões Seguras",
      desc: "Escolha de aeroportos e conexões viáveis e confortáveis para o animal.",
    },
    {
      icon: Plane,
      title: "Companhias Aéreas",
      desc: "Comunicação direta, negociação de regras e confirmação de reservas.",
    },
    {
      icon: Stethoscope,
      title: "Coordenação Veterinária",
      desc: "Acompanhamento de laudos clínicos com médicos e laboratórios credenciados.",
    },
    {
      icon: Luggage,
      title: "Ambientação & Caixa IATA",
      desc: "Orientação para caixa adequada e adaptação do pet ao transporte.",
    },
    {
      icon: FileCheck2,
      title: "Vigiagro / MAPA & CVI",
      desc: "Acompanhamento do Certificado Veterinário Internacional junto aos órgãos oficiais.",
    },
    {
      icon: ShieldCheck,
      title: "Importação & Liberação",
      desc: "Gestão aduaneira e desembaraço alfandegário no desembarque internacional.",
    },
  ];

  return (
    <div className="ep-about-page">
      <SiteHeader
        logoSrc="/brand/embarpet_full_logo_word-white_support-cyan_tagline-cyan.svg"
        activeLabel="Sobre"
        cta={{ label: "Analisar viagem do pet", href: "#" }}
        onCtaClick={() => openAnalysis("about_header")}
      />

      <main>
        {/* ==================================================================
            1. HERO SECTION — Todo grande embarque começa muito antes do aeroporto.
            ================================================================== */}
        <section className="ep-about-hero">
          <div className="ep-container">
            <div className="ep-about-hero__grid">
              <div className="ep-about-hero__content">
                <div className="ep-about-hero__eyebrow">
                  <HeartHandshake size={14} aria-hidden="true" />
                  Nossa História • Grupo Embarcompany
                </div>
                <h1 className="ep-about-hero__title">
                  Todo grande embarque começa <span>muito antes do aeroporto.</span>
                </h1>
                <p className="ep-about-hero__lead">
                  Antes da Embarpet existir, viajar para outro país com um pet já significava enfrentar uma sequência de dúvidas.
                  Para quem olha de fora, pode parecer apenas burocracia. Para quem ama um animal como parte da família,
                  é a responsabilidade de colocar alguém que você ama em um avião e confiar que, do outro lado do mundo, ele chegará bem.
                </p>

                {/* Dúvidas reais de todo tutor */}
                <div className="ep-about-hero__doubts-card">
                  <div className="ep-about-hero__doubts-header">
                    <HelpCircle size={16} aria-hidden="true" />
                    <span>As perguntas que todo tutor se faz antes de embarcar:</span>
                  </div>
                  <ul className="ep-about-hero__doubts-list">
                    {initialDoubtQuestions.map((question) => (
                      <li key={question}>
                        <ShieldAlert size={14} aria-hidden="true" />
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ep-about-hero__actions">
                  <AnalysisButton size="lg" onClick={() => openAnalysis("about_hero_cta")}>
                    Analisar a viagem do meu pet
                  </AnalysisButton>
                  <a
                    href="#origem"
                    className="ep-btn ep-btn--secondary ep-btn--md ep-about-hero__scroll-btn"
                  >
                    Conhecer nossa história <ArrowRight size={15} />
                  </a>
                </div>
              </div>

              <div className="ep-about-hero__media">
                <img
                  src="/embarpet-ceo-equipe-trim.webp"
                  alt="Daiane Sarmento, Thamires Felix e a equipe da Embarpet reunida"
                  className="ep-about-hero__img"
                  width="600"
                  height="450"
                  loading="eager"
                />
                <div className="ep-about-hero__badge">
                  <div className="ep-about-hero__badge-icon">
                    <MapPin size={20} aria-hidden="true" />
                  </div>
                  <div className="ep-about-hero__badge-text">
                    <b>Base Operacional em Guarulhos / SP</b>
                    <small>Prontidão e suporte direto no maior hub internacional do Brasil (GRU)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. STATS / TRUST BAR
            ================================================================== */}
        <section className="ep-about-stats" aria-label="Marcos e números da Embarpet">
          <div className="ep-container">
            <div className="ep-about-stats__grid">
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">2018</div>
                <div className="ep-about-stat-card__label">Ano de fundação em Portugal e no Brasil</div>
              </div>
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">+2.000</div>
                <div className="ep-about-stat-card__label">Famílias e pets conectados pelo mundo</div>
              </div>
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">IPATA</div>
                <div className="ep-about-stat-card__label">Membro oficial e conformidade IATA LAR</div>
              </div>
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">RA1000</div>
                <div className="ep-about-stat-card__label">Selo máximo de acolhimento e reputação</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. A ORIGEM — E foi assim que a Embarpet começou.
            ================================================================== */}
        <section className="ep-about-origin" id="origem">
          <div className="ep-container">
            <div className="ep-about-origin__grid">
              <div className="ep-about-origin__content">
                <div className="ep-about-section-tag">Fundação & Propósito</div>
                <h2>E foi assim que a Embarpet começou.</h2>
                <p className="ep-about-origin__lead-text">
                  Não nasceu grande. Não nasceu com uma estrutura gigantesca. Nasceu com{" "}
                  <strong>R$ 4 mil de investimento, conhecimento, coragem e um problema real para resolver.</strong>
                </p>
                <p>
                  Foi enxergando a dificuldade das famílias de perto que <strong>Daiane Sarmento e Thamires Felix</strong> decidiram, em 2018, transformar um problema em uma solução definitiva.
                </p>
                <p>
                  Depois de uma experiência em Portugal e do contato de Thamires com a rotina de documentação sanitária para animais, as duas perceberam que existia um espaço enorme entre o desejo das pessoas de viajar com seus pets e a complexidade necessária para tornar essa viagem possível.
                </p>

                <div className="ep-about-origin__quote-card">
                  <div className="ep-about-origin__quote-icon">
                    <Sparkles size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <b>A missão se revelou no primeiro atendimento</b>
                    <p>
                      No início, o objetivo era ajudar tutores a entender e organizar a documentação necessária para levar seus animais para outros países. Mas cada novo embarque mostrava uma coisa: <em>o tutor precisava de muito mais.</em>
                    </p>
                  </div>
                </div>
              </div>

              <div className="ep-about-origin__media">
                <div className="ep-about-origin__card-photo">
                  <img
                    src="/embarpet-thamires-felix.webp"
                    alt="Thamires Felix, cofundadora da Embarpet"
                    loading="lazy"
                    width="480"
                    height="420"
                  />
                  <div className="ep-about-origin__photo-caption">
                    <b>Thamires Felix & Daiane Sarmento</b>
                    <span>Fundadoras da Embarpet • Pioneirismo em mobilidade aérea de pets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. A EVOLUÇÃO — O tutor precisava de mais
            ================================================================== */}
        <section className="ep-about-evolution">
          <div className="ep-container">
            <div className="ep-about-evolution__header">
              <div className="ep-about-section-tag">Do Documento à Operação Completa</div>
              <h2>Não bastava apenas entregar uma lista de documentos.</h2>
              <p>
                Uma viagem internacional de pet exige sincronia absoluta entre múltiplos órgãos, companhias e prazos biológicos.
                Por isso, transformamos a assessoria inicial em uma operação logística completa de ponta a ponta.
              </p>
            </div>

            <div className="ep-about-evolution__grid">
              {evolutionSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.title} className="ep-evolution-card">
                    <div className="ep-evolution-card__header">
                      <div className="ep-evolution-card__icon">
                        <IconComponent size={20} aria-hidden="true" />
                      </div>
                      <span className="ep-evolution-card__step">0{idx + 1}</span>
                    </div>
                    <h3 className="ep-evolution-card__title">{step.title}</h3>
                    <p className="ep-evolution-card__desc">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. A MUDANÇA DE PERSPECTIVA — A missão ficava mais clara
            ================================================================== */}
        <section className="ep-about-perspective">
          <div className="ep-container">
            <div className="ep-about-perspective__box">
              <div className="ep-about-perspective__left">
                <div className="ep-about-section-tag ep-about-section-tag--light">Mudança de Perspectiva</div>
                <h2 className="ep-about-perspective__title">
                  A cada embarque, a missão ficava mais clara.
                </h2>
                <p className="ep-about-perspective__text">
                  Acompanhamos famílias mudando de país, brasileiros começando uma nova vida no exterior, pessoas retornando para casa e tutores realizando o sonho de estudar ou trabalhar fora.
                </p>
                <p className="ep-about-perspective__text">
                  Pets viajando na cabine com seus tutores, outros no compartimento de cargas ou atravessando oceanos desacompanhados. Cães, gatos, aves, roedores e animais com exigências específicas.
                </p>
              </div>

              <div className="ep-about-perspective__right">
                <div className="ep-perspective-comparison">
                  <div className="ep-perspective-comparison__before">
                    <span className="ep-perspective-comparison__tag">A pergunta comum do mercado</span>
                    <p className="ep-perspective-comparison__quote">
                      “Como colocar esse animal em um avião?”
                    </p>
                  </div>

                  <div className="ep-perspective-comparison__divider">
                    <span>A perspectiva Embarpet</span>
                  </div>

                  <div className="ep-perspective-comparison__after">
                    <span className="ep-perspective-comparison__tag ep-perspective-comparison__tag--accent">Nossa diretriz inegociável</span>
                    <p className="ep-perspective-comparison__quote">
                      “Qual é a melhor forma de fazer esse pet chegar ao destino com segurança, dentro de todas as exigências e com o menor nível possível de preocupação para sua família?”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. O MANIFESTO — Porque nunca foi apenas sobre transportar pets
            ================================================================== */}
        <section className="ep-about-manifesto">
          <div className="ep-container">
            <div className="ep-about-manifesto__header">
              <div className="ep-about-section-tag">Nosso Manifesto</div>
              <h2>Porque nunca foi apenas sobre transportar pets.</h2>
            </div>

            <div className="ep-about-manifesto__contrast-grid">
              <div className="ep-contrast-item">
                <Building2 size={24} className="ep-contrast-item__icon" />
                <span className="ep-contrast-item__subject">Um aeroporto</span>
                <b>Enxerga uma caixa de transporte.</b>
              </div>
              <div className="ep-contrast-item">
                <Plane size={24} className="ep-contrast-item__icon" />
                <span className="ep-contrast-item__subject">Uma companhia aérea</span>
                <b>Enxerga uma reserva no sistema.</b>
              </div>
              <div className="ep-contrast-item">
                <FileCheck2 size={24} className="ep-contrast-item__icon" />
                <span className="ep-contrast-item__subject">Uma autoridade sanitária</span>
                <b>Enxerga carimbos e documentos.</b>
              </div>
              <div className="ep-contrast-item ep-contrast-item--highlight">
                <Heart size={24} className="ep-contrast-item__icon" />
                <span className="ep-contrast-item__subject">Nós, na Embarpet</span>
                <b>Nós enxergamos uma família.</b>
              </div>
            </div>

            <div className="ep-about-manifesto__story-narrative">
              <div className="ep-about-manifesto__story-card">
                <p className="ep-about-manifesto__highlight-p">
                  Enxergamos o tutor que passa a noite anterior à viagem sem conseguir dormir.
                </p>
                <p>
                  A pessoa que pergunta três vezes se está tudo certo porque precisa de absoluta certeza. A família que atravessou um oceano e que <em>só sente que a mudança finalmente terminou quando vê seu pet chegando</em>.
                </p>
                <div className="ep-about-manifesto__reunion-moments">
                  <div className="ep-reunion-step">
                    <PawPrint size={18} />
                    <span>O reencontro no desembarque</span>
                  </div>
                  <div className="ep-reunion-step">
                    <CheckCircle2 size={18} />
                    <span>A porta da caixa abrindo</span>
                  </div>
                  <div className="ep-reunion-step">
                    <Heart size={18} />
                    <span>O rabo abanando</span>
                  </div>
                  <div className="ep-reunion-step">
                    <HeartHandshake size={18} />
                    <span>O primeiro colo depois de horas de viagem</span>
                  </div>
                </div>
                <p className="ep-about-manifesto__meaning">
                  É nesse exato momento que todo o trabalho técnico e minucioso realizado nos bastidores ganha sentido.
                </p>
              </div>

              <div className="ep-about-manifesto__mosaic">
                <img src="/embarpet-mosaico-encontro.jpg" alt="Tutora reencontrando seu pet no aeroporto" />
                <img src="/embarpet-mosaico-familia.jpg" alt="Família reunida com pet no novo país" />
                <img src="/embarpet-mosaico-cuidado.jpg" alt="Acolhimento e cuidado com o pet" />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            7. BASE OPERACIONAL EM GUARULHOS (GRU)
            ================================================================== */}
        <section className="ep-about-base" id="base" aria-label="Estrutura e Base Operacional">
          <div className="ep-container">
            <div className="ep-about-base__card">
              <div className="ep-about-base__info">
                <div className="ep-about-section-tag ep-about-section-tag--lime">Estrutura Física</div>
                <h2 className="ep-about-base__title">
                  Presença física estratégica no <span>coração logístico</span> do país.
                </h2>
                <p className="ep-about-base__text">
                  Nossa sede física e equipe de solo estão localizadas em Guarulhos/SP, a poucos minutos do Aeroporto Internacional de São Paulo (GRU). Essa presença nos permite acompanhar vistorias do Vigiagro/MAPA, recepcionar pets de conexões nacionais e prestar suporte presencial no momento mais sensível do embarque.
                </p>
                <div className="ep-about-base__features">
                  <div className="ep-about-base__feature-item">
                    <b>Suporte de Solo em GRU</b>
                    <p>Recepção presencial, acomodação e acompanhamento nas vistorias de embarque.</p>
                  </div>
                  <div className="ep-about-base__feature-item">
                    <b>Conexões Nacionais Integradas</b>
                    <p>Logística para pets vindos de todos os estados brasileiros com conexão em SP.</p>
                  </div>
                </div>
              </div>

              <div className="ep-about-base__address-panel">
                <h4>Base Operacional Embarpet</h4>
                <p>
                  <strong>Endereço:</strong> R. Leonor Bresser Corrêa, 33 - Vila Miriam, Guarulhos - SP, CEP 07110-130.
                </p>
                <p>
                  <strong>Atendimento:</strong> Todo o território nacional com conexões internacionais.
                </p>
                <p>
                  <strong>CNPJ:</strong> 29.922.919/0001-14 (Grupo Embarcompany).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8. CREDENCIAIS & RECONHECIMENTO NA MÍDIA
            ================================================================== */}
        <section className="ep-about-credentials" id="credenciais" aria-label="Credenciais e Reconhecimento">
          <div className="ep-container">
            <div className="ep-about-credentials__grid">
              <div>
                <div className="ep-about-section-tag">Certificações & Mídia</div>
                <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--ep-teal)", marginBottom: "16px" }}>
                  Credenciais internacionais e reconhecimento do setor.
                </h2>
                <p style={{ fontSize: "15px", color: "var(--ep-ink)", lineHeight: 1.65 }}>
                  A Embarpet segue as diretrizes da <strong>IPATA</strong> (International Pet and Animal Transportation Association) e as normas de transporte de animais vivos da <strong>IATA</strong> (Live Animals Regulations), além de contar com o selo de confiança RA1000 e destaque na imprensa nacional.
                </p>
              </div>

              <div className="ep-about-credentials__logos">
                <div className="ep-about-credentials__logo-box" title="Membro IPATA">
                  <img src="/logo-ipata.svg" alt="Logo IPATA" width="100" height="34" />
                </div>
                <div className="ep-about-credentials__logo-box" title="Diretrizes IATA">
                  <img src="/logo-iata.svg" alt="Logo IATA" width="100" height="34" />
                </div>
                <div className="ep-about-credentials__logo-box" title="Reclame Aqui RA1000">
                  <img src="/logo-reclame-aqui.webp" alt="Selo Reclame Aqui" width="100" height="34" />
                </div>
                <div className="ep-about-credentials__logo-box" title="Reportagens na Globo">
                  <img src="/logo-globo.svg" alt="Logo TV Globo" width="100" height="34" />
                </div>
                <div className="ep-about-credentials__logo-box" title="Destaque Catraca Livre">
                  <img src="/logo-catraca-livre.png" alt="Logo Catraca Livre" width="100" height="34" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            9. CASOS REAIS
            ================================================================== */}
        <section className="ep-about-cases">
          <div className="ep-container">
            <div className="ep-about-cases__header">
              <div className="ep-about-section-tag">Famílias Conectadas</div>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--ep-teal)", marginBottom: "12px" }}>
                Histórias reais de quem confiou na Embarpet
              </h2>
              <p style={{ fontSize: "16px", color: "var(--ep-muted)" }}>
                Mais de duas mil famílias já embarcaram com tranquilidade e apoio da nossa equipe.
              </p>
            </div>

            <div className="ep-about-cases__grid">
              <div className="ep-about-case-card">
                <div className="ep-about-case-card__media">
                  <img src="/case-leandro-hassum.jpeg" alt="Leandro Hassum e seu pet" loading="lazy" />
                </div>
                <div className="ep-about-case-card__body">
                  <span className="ep-about-case-card__tag">Brasil ➔ Estados Unidos</span>
                  <h3 className="ep-about-case-card__title">Leandro Hassum & Família</h3>
                  <p className="ep-about-case-card__quote">
                    "O carinho e a precisão da equipe da Embarpet com nossos animais foram fundamentais para que nossa mudança acontecesse sem nenhum susto."
                  </p>
                </div>
              </div>

              <div className="ep-about-case-card">
                <div className="ep-about-case-card__media">
                  <img src="/case-renato-paiva.jpeg" alt="Treinador Renato Paiva e seu pet" loading="lazy" />
                </div>
                <div className="ep-about-case-card__body">
                  <span className="ep-about-case-card__tag">Brasil ➔ Europa</span>
                  <h3 className="ep-about-case-card__title">Renato Paiva</h3>
                  <p className="ep-about-case-card__quote">
                    "Embarque internacional com coordenação impecável de documentos e acompanhamento até a chegada ao destino."
                  </p>
                </div>
              </div>

              <div className="ep-about-case-card">
                <div className="ep-about-case-card__media">
                  <img src="/case-talles-magno.jpg" alt="Jogador Talles Magno com seu pet" loading="lazy" />
                </div>
                <div className="ep-about-case-card__body">
                  <span className="ep-about-case-card__tag">Brasil ➔ Estados Unidos</span>
                  <h3 className="ep-about-case-card__title">Talles Magno</h3>
                  <p className="ep-about-case-card__quote">
                    "Atendimento atencioso, cuidando de cada detalhe da documentação para que a viagem acontecesse com total segurança."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            10. O PROPÓSITO & FECHAMENTO — O destino pode mudar. A família vai junto.
            ================================================================== */}
        <section className="ep-about-cta">
          <div className="ep-container">
            <div className="ep-about-cta__box">
              <div className="ep-about-cta__quote-banner">
                <p className="ep-about-cta__manifesto-lead">
                  “Não trabalhamos apenas para que um animal possa sair de um país e entrar em outro. Trabalhamos para que uma mudança de endereço não precise significar uma separação. Para que novos países possam significar novos começos — <strong>com a família completa.</strong>”
                </p>
                <div className="ep-about-cta__manifesto-sub">
                  <p>
                    Documentos atravessam fronteiras. Aviões atravessam oceanos.<br />
                    Mas aquilo que realmente levamos de um lugar para outro é muito maior:
                  </p>
                  <strong className="ep-about-cta__highlight-values">
                    Histórias, vínculos e famílias.
                  </strong>
                </div>

                <div className="ep-about-cta__slogan-block">
                  <h3 className="ep-about-cta__brand-name">Embarpet</h3>
                  <p className="ep-about-cta__slogan-phrase">
                    O destino pode mudar. <span>A família vai junto.</span>
                  </p>
                </div>
              </div>

              <div className="ep-about-cta__action-card">
                <h3>Vamos planejar o próximo embarque da sua família?</h3>
                <p>
                  Conte-nos a rota pretendida, a espécie e o porte do seu companheiro. Nossa equipe fará uma análise personalizada das possibilidades e dos requisitos sanitários.
                </p>
                <AnalysisButton size="lg" onClick={() => openAnalysis("about_final_cta")}>
                  Iniciar análise gratuita da viagem
                </AnalysisButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AnalysisModal
        open={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        analyticsSource={analysisSource}
      />

      <WhatsAppFloat />

      <SiteFooter
        logoSrc="/logo-embarpet-dark.png"
        note="Especialistas em transporte aéreo internacional de animais — Grupo Embarcompany."
        onAnalysisClick={() => openAnalysis("about_footer")}
      />
    </div>
  );
}
