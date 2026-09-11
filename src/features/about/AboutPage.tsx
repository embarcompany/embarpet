import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  MapPin,
  Plane,
  ShieldCheck,
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
      title: "Quem Somos | Sobre a Embarpet — Especialistas em Transporte Internacional de Pets",
      description:
        "Conheça a Embarpet: empresa do Grupo Embarcompany especializada em mobilidade aérea internacional de animais. Conheça nossa base em Guarulhos, equipe, valores e credenciais.",
      canonicalPath: "/sobre",
    });
  }, []);

  const openAnalysis = (source = "about_hero") => {
    setAnalysisSource(source);
    setAnalysisOpen(true);
  };

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
            Hero Section
            ================================================================== */}
        <section className="ep-about-hero">
          <div className="ep-container">
            <div className="ep-about-hero__grid">
              <div className="ep-about-hero__content">
                <div className="ep-about-hero__eyebrow">
                  <ShieldCheck size={14} aria-hidden="true" />
                  Quem Somos • Grupo Embarcompany
                </div>
                <h1 className="ep-about-hero__title">
                  Cuidamos da viagem do seu pet com <span>rigor técnico</span> e o carinho de uma família.
                </h1>
                <p className="ep-about-hero__lead">
                  Somos especialistas em mobilidade aérea internacional de animais. Planejamos a rota, a documentação
                  sanitária oficial e a operação de embarque para que você e seu pet cheguem juntos com tranquilidade.
                </p>
                <div className="ep-about-hero__actions">
                  <AnalysisButton size="lg" onClick={() => openAnalysis("about_hero_cta")}>
                    Analisar a viagem do meu pet
                  </AnalysisButton>
                  <a href="#historia" className="ep-btn ep-btn--secondary ep-btn--md" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
                    Conhecer nossa história
                  </a>
                </div>
              </div>

              <div className="ep-about-hero__media">
                <img
                  src="/embarpet-ceo-equipe-trim.webp"
                  alt="Equipe e liderança da Embarpet reunida"
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
            Stats / Trust Numbers Bar
            ================================================================== */}
        <section className="ep-about-stats" aria-label="Estatísticas e marcos da Embarpet">
          <div className="ep-container">
            <div className="ep-about-stats__grid">
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">+2.000</div>
                <div className="ep-about-stat-card__label">Embarques internacionais concluídos</div>
              </div>
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">100%</div>
                <div className="ep-about-stat-card__label">Foco em viagens internacionais de pets</div>
              </div>
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">IPATA</div>
                <div className="ep-about-stat-card__label">Associação Internacional e normas IATA</div>
              </div>
              <div className="ep-about-stat-card">
                <div className="ep-about-stat-card__number">RA1000</div>
                <div className="ep-about-stat-card__label">Índice máximo de reputação e acolhimento</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            Story & Mission Section
            ================================================================== */}
        <section className="ep-about-story" id="historia">
          <div className="ep-container">
            <div className="ep-about-story__grid">
              <div className="ep-about-story__content">
                <h2>Por que a Embarpet existe?</h2>
                <p>
                  Mudar de país ou fazer uma viagem internacional de longa distância já é um processo desafiador para
                  qualquer família. Quando essa jornada envolve um cão, gato ou animal especial, a complexidade se
                  multiplica: regras sanitárias que mudam constantemente, exigências de companhias aéreas, prazos rígidos de
                  sorologia e vistorias oficiais.
                </p>
                <p>
                  A Embarpet nasceu para transformar essa incerteza em um plano claro e seguro. Não somos uma agência de
                  turismo comum nem vendemos passagens avulsas: somos consultores e operadores logísticos especializados em
                  proteger o bem-estar do seu animal do Brasil até o destino final.
                </p>
                <div className="ep-about-story__box">
                  <h4>A rota é a nossa unidade de trabalho</h4>
                  <p>
                    Cada espécie, raça, porte, aeroporto e data exige uma leitura personalizada. Por isso, nunca prometemos
                    soluções automáticas sem antes auditar as regras vigentes do seu caso específico.
                  </p>
                </div>
              </div>

              <div className="ep-about-story__media">
                <img
                  src="/embarpet-service-management.webp"
                  alt="Consultora da Embarpet organizando planejamento de viagem de pet"
                  className="ep-about-hero__img"
                  style={{ borderRadius: "12px", border: "1px solid var(--ep-line)" }}
                  width="540"
                  height="400"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            Guarulhos Base Section
            ================================================================== */}
        <section className="ep-about-base" aria-label="Estrutura e Base Operacional">
          <div className="ep-container">
            <div className="ep-about-base__card">
              <div className="ep-about-base__info">
                <h2 className="ep-about-base__title">
                  Presença física estratégica no <span>coração logístico</span> do país.
                </h2>
                <p className="ep-about-base__text">
                  Nossa sede física e equipe de solo estão localizadas em Guarulhos/SP, a poucos minutos do Aeroporto
                  Internacional de São Paulo (GRU). Essa proximidade nos permite acompanhar vistorias do Vigiagro/MAPA,
                  recepcionar pets vindos de conexões nacionais e prestar suporte imediato no momento mais importante do
                  embarque.
                </p>
                <div className="ep-about-base__features">
                  <div className="ep-about-base__feature-item">
                    <b>Suporte Aeroportuário</b>
                    <p>Recepção presencial e acompanhamento nas vistorias de embarque.</p>
                  </div>
                  <div className="ep-about-base__feature-item">
                    <b>Conexões Nacionais</b>
                    <p>Logística integrada para pets de outros estados conectando em GRU.</p>
                  </div>
                </div>
              </div>

              <div className="ep-about-base__address-panel">
                <h4>Base Operacional Embarpet</h4>
                <p>
                  <strong>Endereço:</strong> Rua Porto Martinho, 159, Cidade Soinco, Guarulhos/SP, CEP 07182-270.
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
            4 Operational Pillars
            ================================================================== */}
        <section className="ep-about-pillars">
          <div className="ep-container">
            <div className="ep-about-pillars__header">
              <h2>Como trabalhamos para proteger sua viagem</h2>
              <p>Quatro compromissos inegociáveis que norteiam cada atendimento da Embarpet.</p>
            </div>

            <div className="ep-about-pillars__grid">
              <div className="ep-pillar-card">
                <div className="ep-pillar-card__icon">
                  <FileCheck2 size={22} aria-hidden="true" />
                </div>
                <h3 className="ep-pillar-card__title">Rigor Documental e CVI</h3>
                <p className="ep-pillar-card__copy">
                  Acompanhamos microchipagem ISO, calendário de vacinas, sorologia laboratorial e a emissão oficial do
                  Certificado Veterinário Internacional junto ao MAPA.
                </p>
              </div>

              <div className="ep-pillar-card">
                <div className="ep-pillar-card__icon">
                  <Plane size={22} aria-hidden="true" />
                </div>
                <h3 className="ep-pillar-card__title">Logística e Modalidade</h3>
                <p className="ep-pillar-card__copy">
                  Analisamos se a melhor alternativa para o animal é viajar na Cabine, como Bagagem Acompanhada, Carga
                  Viva ou pelo serviço exclusivo Pet Luxo.
                </p>
              </div>

              <div className="ep-pillar-card">
                <div className="ep-pillar-card__icon">
                  <Stethoscope size={22} aria-hidden="true" />
                </div>
                <h3 className="ep-pillar-card__title">Parceiros Veterinários</h3>
                <p className="ep-pillar-card__copy">
                  Trabalhamos em estreita cooperação com clínicas e laboratórios credenciados para garantir que todos os
                  laudos atendam às exigências do país de destino.
                </p>
              </div>

              <div className="ep-pillar-card">
                <div className="ep-pillar-card__icon">
                  <HeartHandshake size={22} aria-hidden="true" />
                </div>
                <h3 className="ep-pillar-card__title">Comunicação Acolhedora</h3>
                <p className="ep-pillar-card__copy">
                  Você não fala com robôs. Nossa equipe mantém contato direto via WhatsApp antes, durante e após o pouso,
                  oferecendo atualizações constantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            Credentials & Recognition
            ================================================================== */}
        <section className="ep-about-credentials" aria-label="Credenciais e Reconhecimento">
          <div className="ep-container">
            <div className="ep-about-credentials__grid">
              <div>
                <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--ep-teal)", marginBottom: "16px" }}>
                  Credenciais internacionais e reconhecimento do setor.
                </h2>
                <p style={{ fontSize: "15px", color: "var(--ep-ink)", lineHeight: 1.65 }}>
                  A Embarpet segue as diretrizes da <strong>IPATA</strong> (International Pet and Animal Transportation
                  Association) e as normas de transporte de animais vivos da <strong>IATA</strong> (Live Animals Regulations),
                  além de contar com o selo de confiança RA1000 e destaque na imprensa nacional.
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
            Real Families & Cases
            ================================================================== */}
        <section className="ep-about-cases">
          <div className="ep-container">
            <div className="ep-about-cases__header">
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
                    "O carinho e a precisão da equipe da Embarpet com nossos animais foram fundamentais para que nossa mudança
                    acontecesse sem nenhum susto."
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
            Final Conversion CTA
            ================================================================== */}
        <section className="ep-about-cta">
          <div className="ep-container">
            <div className="ep-about-cta__box">
              <h2 className="ep-about-cta__title">
                Quer planejar a viagem do seu pet com a nossa equipe?
              </h2>
              <p className="ep-about-cta__text">
                Conte-nos a rota pretendida, a espécie e o porte do seu companheiro. Faremos uma análise personalizada
                das opções disponíveis e dos próximos passos.
              </p>
              <AnalysisButton size="lg" onClick={() => openAnalysis("about_final_cta")}>
                Iniciar análise gratuita da viagem
              </AnalysisButton>
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
