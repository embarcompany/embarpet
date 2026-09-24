import { useEffect, useState } from "react";
import { ArrowDown, ChevronRight, ClipboardCheck, Clock, FileText, ListChecks, MessageCircleQuestion, Package, Route, Settings2, ShieldCheck } from "lucide-react";
import { AdaptiveHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { AnalysisButton } from "../../components/ui/buttons";
import { AnalysisModal, type AnalysisRouteContext } from "../../components/ui/analysis-modal";
import { openWhatsAppModal } from "../../components/ui/whatsapp-float";
import { setPageMetadata } from "../../lib/seo";
import { AuthoritySection } from "../destinations/sections/AuthoritySection";
import { RiskSection } from "../destinations/sections/RiskSection";
import { GoogleReviewsSection } from "../destinations/sections/GoogleReviewsSection";
import { WhatsappSupportSection } from "../destinations/sections/WhatsappSupportSection";
import { ComparisonSection } from "../destinations/sections/ComparisonSection";
import { EmbarkationMosaicSection } from "../destinations/sections/EmbarkationMosaicSection";
import { PetLuxoSection } from "../../components/ui/pet-luxo-section";
import { FinalCtaSection } from "../destinations/sections/FinalCtaSection";
import { modalityContent, modalityStorytelling, type ModalityContent } from "./modality-content";

const modalityStepIcons = [Route, ShieldCheck, FileText, ClipboardCheck];
const whatCardIcons = [Settings2, Clock, ListChecks];
const decisionIcons = [Route, ShieldCheck, Package];

function BagagemDecisionMap({ onStartPlanning }: { onStartPlanning: (placement: string) => void }) {
  const cards = [
    { icon: Route, title: "Tutor e pet no mesmo roteiro", copy: "A família segue no voo e a operação do pet precisa conversar com esse itinerário." },
    { icon: Package, title: "Caixa validada antes da reserva", copy: "Medidas, ventilação e padrão aceito pela companhia entram na decisão." },
    { icon: ShieldCheck, title: "Companhia e rota compatíveis", copy: "Nem toda rota aceita a mesma modalidade, conexão ou prazo operacional." },
    { icon: ClipboardCheck, title: "Documentação dentro do tempo certo", copy: "O cronograma evita que exigências apareçam só perto do embarque." },
  ];
  return <section className="ep-section ep-modality-fit">
    <div className="ep-container ep-modality-fit__grid">
      <div className="ep-modality-fit__content">
        <p className="ep-eyebrow">Mapa da decisão</p>
        <h2 className="ep-title-lg">A modalidade certa nasce quando <em>rota, caixa e prazo</em> se encaixam.</h2>
        <p className="ep-copy">Bagagem acompanhada pode ser uma excelente alternativa, mas ela não é decidida só pelo desejo de ir no mesmo voo. Primeiro, a gente entende o contexto para reduzir improviso no aeroporto.</p>
        <AnalysisButton onClick={() => onStartPlanning("decision_map")}>Ver se serve para minha rota</AnalysisButton>
      </div>
      <div className="ep-modality-fit__cards">
        {cards.map((card) => {
          const CardIcon = card.icon;
          return <article key={card.title}>
            <CardIcon aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

function FaqAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <div className="ep-modality-faq__list">
    {faqs.map((faq, index) => {
      const isOpen = index === openIndex;
      return <div key={faq.question} className={`ep-modality-faq__item${isOpen ? " is-open" : ""}`}>
        <button type="button" className="ep-modality-faq__question" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)}>
          <span>{faq.question}</span>
          <ChevronRight aria-hidden="true" />
        </button>
        <div className="ep-modality-faq__answer-wrap" id={`faq-panel-${index}`} role="region">
          <div className="ep-modality-faq__answer-inner"><p>{faq.answer}</p></div>
        </div>
      </div>;
    })}
  </div>;
}

export function ModalityPage({ modality, isLp = false }: { modality: ModalityContent; isLp?: boolean }) {
  const storytelling = modalityStorytelling[modality.slug];
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisSource, setAnalysisSource] = useState(`modality_${modality.slug}_hero`);
  const analysisRoute: AnalysisRouteContext = {};

  useEffect(() => setPageMetadata({ title: modality.seo.title, description: modality.seo.description, canonicalPath: `/modalidades/${modality.slug}` }), [modality]);

  const startPlanning = (placement = "hero") => {
    setAnalysisSource(`modality_${modality.slug}_${placement}`);
    if (placement === "whatsapp") {
      openWhatsAppModal(analysisRoute);
    } else {
      setAnalysisOpen(true);
    }
  };

  const pageNavigation = [
    { label: "Por que a Embarpet", href: "#autoridade" },
    { label: "Como funciona", href: "#processo" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return <>
    <AdaptiveHeader logoSrc="/brand/embarpet_full_logo_word-white_support-cyan_tagline-cyan.svg" isLp={isLp} sections={pageNavigation} ctaLabel="Começar minha análise" onCtaClick={() => startPlanning("header")} />
    <main className={`ep-modality-page ep-modality-page--${modality.slug}`}>
      <section className="ep-modality-hero" id="planejar">
        <div className="ep-modality-hero__grid">
          <div className="ep-modality-hero__content-wrap">
            <div className="ep-modality-hero__content">
              <p className="ep-eyebrow">{modality.eyebrow}</p>
              <h1 className="ep-title-xl">{modality.title} <em>{modality.titleHighlight}</em></h1>
              <p className="ep-copy">{modality.intro}</p>
              <div className="ep-modality-hero__actions">
                <AnalysisButton size="lg" onClick={() => startPlanning("hero")}>Começar minha análise</AnalysisButton>
                <a href="#entenda" className="ep-button ep-button--outline">Entender modalidade <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
          <div className="ep-modality-hero__visual"><img src={modality.heroImage} alt={modality.heroAlt} /></div>
        </div>
      </section>

      <AuthoritySection onStartPlanning={() => startPlanning("authority")} />

      <section className="ep-section ep-modality-introduction" id="entenda"><div className="ep-container ep-modality-introduction__grid">
        <div className="ep-modality-introduction__content">
          <p className="ep-eyebrow">Entenda esta modalidade</p>
          <h2 className="ep-title-lg">{modality.whatTitle} <em>{modality.whatTitleHighlight}</em></h2>
          <ul className="ep-modality-introduction__cards">{modality.whatCards.map((card, index) => { const CardIcon = whatCardIcons[index]; return <li key={card.title}><CardIcon aria-hidden="true" /><div><h3>{card.title}</h3><p>{card.copy}</p></div></li>; })}</ul>
        </div>
        <div className="ep-modality-introduction__media"><img src={modality.whatImage} alt={modality.whatImageAlt} loading="lazy" /></div>
      </div></section>

      <RiskSection />

      <section className="ep-section ep-modality-reassurance">
        <div className="ep-container ep-modality-reassurance__heading"><p className="ep-eyebrow">O que muda com uma boa análise</p><h2 className="ep-title-lg">{storytelling.reassuranceTitle} <em>{storytelling.reassuranceTitleHighlight}</em></h2><p className="ep-copy">{storytelling.reassuranceCopy}</p></div>
        <div className="ep-container ep-modality-reassurance__content">
          <div className="ep-modality-reassurance__visual"><img src={storytelling.reassuranceImage} alt={storytelling.reassuranceImageAlt} loading="lazy" /></div>
          <ol className="ep-modality-reassurance__points">{storytelling.reassurancePoints.map((point, index) => <li key={point}><span>0{index + 1}</span><p>{point}</p></li>)}</ol>
        </div>
        <div className="ep-modality-reassurance__cta"><AnalysisButton onClick={() => startPlanning("reassurance")}>Começar minha análise</AnalysisButton></div>
      </section>

      <section className="ep-section ep-modality-process" id="processo"><div className="ep-container">
        <div className="ep-modality-section-heading"><p className="ep-eyebrow">Do primeiro contato ao embarque</p><h2 className="ep-title-lg">Cada etapa existe para dar <em>clareza à decisão.</em></h2></div>
        <ol className="ep-modality-steps">{modality.howItWorks.map((step, index) => { const StepIcon = modalityStepIcons[index]; return <li key={step.number}><div className="ep-modality-steps__icon-wrap"><span aria-hidden="true">{step.number}</span><StepIcon className="ep-modality-steps__icon" aria-hidden="true" /></div><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>; })}</ol>
      </div></section>

      <section className="ep-section ep-modality-decision">
        <div className="ep-container ep-modality-decision__heading"><p className="ep-eyebrow">Quando ela pode fazer sentido</p><h2 className="ep-title-lg">{modality.decisionTitle} <em>{modality.decisionTitleHighlight}</em></h2></div>
        <div className="ep-container">
          <ul className="ep-modality-decision__points">{modality.decisionPoints.map((point, index) => { const PointIcon = decisionIcons[index]; return <li key={point.title}><PointIcon aria-hidden="true" /><h3>{point.title}</h3><p>{point.copy}</p></li>; })}</ul>
        </div>
      </section>

      {modality.slug === "bagagem-acompanhada" ? <BagagemDecisionMap onStartPlanning={startPlanning} /> : null}

      <ComparisonSection onStartPlanning={() => startPlanning("comparison")} />

      <GoogleReviewsSection onStartPlanning={() => startPlanning("google_reviews")} />
      <EmbarkationMosaicSection onStartPlanning={() => startPlanning("embarkations")} />

      <section className="ep-section ep-modality-faq" id="faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: modality.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
        }) }} />
        <div className="ep-container ep-modality-faq__grid">
          <div>
            <p className="ep-eyebrow">Dúvidas sobre {modality.label.toLocaleLowerCase("pt-BR")}</p>
            <h2 className="ep-title-lg">Respostas antes de <em>decidir.</em></h2>
            <div className="ep-modality-faq__support">
              <MessageCircleQuestion aria-hidden="true" />
              <h3>Ainda com dúvidas?</h3>
              <p>Fale direto com a Maya pelo WhatsApp e tire suas dúvidas sobre {modality.label.toLocaleLowerCase("pt-BR")} antes de decidir.</p>
              <AnalysisButton onClick={() => startPlanning("whatsapp")}>Falar com a Maya</AnalysisButton>
            </div>
          </div>
          <FaqAccordion faqs={modality.faqs} />
        </div>
      </section>

      <PetLuxoSection />

      <WhatsappSupportSection onStartPlanning={() => startPlanning("whatsapp")} />

      <FinalCtaSection onStartPlanning={() => startPlanning("final_cta")} />
    </main>
    <AnalysisModal open={analysisOpen} onClose={() => setAnalysisOpen(false)} initialRoute={analysisRoute} analyticsSource={analysisSource} />
    <SiteFooter minimal logoSrc="/logo-embarpet-dark.png" note={`Planejamento individual para a modalidade de ${modality.label.toLocaleLowerCase("pt-BR")}.`} brandCta={{ label: "Começar minha análise", href: "#planejar" }} quickLinks={[]} onAnalysisClick={() => startPlanning("footer")} groups={[
      { title: "Planeje a viagem", links: [{ label: "Como funciona", href: "/#como-funciona" },{ label: "Modalidades", href: "/#modalidades" },{ label: "Destinos", href: "/#destinos" }] },
      { title: "Conteúdo", links: [{ label: "Histórias reais", href: "/#historias" },{ label: "Perguntas frequentes", href: "/#faq" }] },
      { title: "Embarpet", links: [{ label: "Sobre nós", href: "/sobre" },{ label: "Fale com a equipe", href: "#planejar" }] },
    ]} showLanguageLink={false} />
  </>;
}
