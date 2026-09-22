import { useEffect, useState } from "react";
import { ChevronRight, CircleAlert, ClipboardCheck, Crown, HeartHandshake, ShieldCheck, Star } from "lucide-react";
import { SiteHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { AnalysisButton } from "../../components/ui/buttons";
import { AnalysisModal, type AnalysisRouteContext } from "../../components/ui/analysis-modal";
import { useLocale } from "../../i18n/locale";
import { setPageMetadata } from "../../lib/seo";
import { petLuxoContent } from "./pet-luxo-content";

const eligibilityIcons = [Crown, HeartHandshake, ShieldCheck];

export default function PetLuxoPage() {
  const { text } = useLocale();
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisSource, setAnalysisSource] = useState("pet_luxo_hero");
  const analysisRoute: AnalysisRouteContext = {};

  useEffect(() => setPageMetadata({ title: petLuxoContent.seo.title, description: petLuxoContent.seo.description, canonicalPath: "/pet-luxo" }), []);

  const startPlanning = (placement = "hero") => {
    setAnalysisSource(`pet_luxo_${placement}`);
    setAnalysisOpen(true);
  };

  return <>
    <SiteHeader logoSrc="/brand/embarpet_full_logo_word-white_support-cyan_tagline-cyan.svg" overlay activeLabel={text.navModalities} mobileCtaLabel="Começar análise" onCtaClick={() => startPlanning("header")} />
    <main className="ep-petluxo-page">
      <section className="ep-petluxo-hero">
        <div className="ep-container ep-petluxo-hero__grid">
          <div className="ep-petluxo-hero__content">
            <p className="ep-eyebrow">{petLuxoContent.hero.eyebrow}</p>
            <h1 className="ep-title-xl">{petLuxoContent.hero.titleLead} <em>{petLuxoContent.hero.titleHighlight}</em></h1>
            <p className="ep-copy">{petLuxoContent.hero.copy}</p>
            <AnalysisButton className="ep-ds-button--luxury" size="lg" onClick={() => startPlanning("hero")}>Saiba mais sobre o PetLuxo</AnalysisButton>
            <ul className="ep-petluxo-hero__facts">{petLuxoContent.hero.heroFacts.map((fact) => <li key={fact}><ShieldCheck size={14} aria-hidden="true" />{fact}</li>)}</ul>
          </div>
          <div className="ep-petluxo-hero__media">
            <video poster="/embarpet-pet-luxo-real.jpeg" aria-label="Consultora Embarpet acompanhando pets no aeroporto" autoPlay loop muted playsInline preload="metadata">
              <source src="/embarpet-petluxo-preview-5s.webm" type="video/webm" />
              <source src="/embarpet-petluxo-preview-5s.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="ep-section ep-petluxo-pain"><div className="ep-container ep-petluxo-pain__grid">
        <div><p className="ep-eyebrow">{petLuxoContent.pain.eyebrow}</p><h2 className="ep-title-lg">{petLuxoContent.pain.title}</h2><p className="ep-copy">{petLuxoContent.pain.copy}</p></div>
        <ul>{petLuxoContent.pain.points.map((point) => <li key={point}><CircleAlert aria-hidden="true" /><span>{point}</span></li>)}</ul>
      </div></section>

      <section className="ep-section ep-petluxo-process"><div className="ep-container">
        <div><p className="ep-eyebrow">{petLuxoContent.process.eyebrow}</p><h2 className="ep-title-lg">{petLuxoContent.process.title}</h2><p className="ep-copy">{petLuxoContent.process.copy}</p></div>
        <ol className="ep-petluxo-process__steps">{petLuxoContent.process.steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
      </div></section>

      <section className="ep-section ep-petluxo-eligibility"><div className="ep-container ep-petluxo-eligibility__grid">
        <div><p className="ep-eyebrow">{petLuxoContent.eligibility.eyebrow}</p><h2 className="ep-title-lg">{petLuxoContent.eligibility.title}</h2><p className="ep-copy">{petLuxoContent.eligibility.copy}</p><AnalysisButton className="ep-ds-button--luxury" onClick={() => startPlanning("eligibility")}>Avaliar meu caso</AnalysisButton></div>
        <ul>{petLuxoContent.eligibility.points.map((point, index) => { const PointIcon = eligibilityIcons[index]; return <li key={point}><PointIcon aria-hidden="true" /><span>{point}</span></li>; })}</ul>
      </div></section>

      <section className="ep-section"><div className="ep-container">
        <div><p className="ep-eyebrow">Experiência comprovada</p><h2 className="ep-title-lg">Decisões mais seguras começam com <em>quem vive a operação.</em></h2></div>
        <div className="ep-petluxo-authority__grid">
          <div><strong>+2.000</strong><span>embarques realizados</span></div>
          <div><ClipboardCheck size={20} color="#e7c16d" aria-hidden="true" /><strong>4,9</strong><span aria-label="Avaliação 4,9 no Google"><Star size={11} fill="currentColor" color="#e7c16d" /></span></div>
          <div><img src="/logo-ipata.png" alt="IPATA" /><span>Membro IPATA e IATA</span></div>
        </div>
      </div></section>

      <section className="ep-section"><div className="ep-container">
        <div><p className="ep-eyebrow">Jornadas acompanhadas de perto</p><h2 className="ep-title-lg">Presença real, do início ao <em>encontro.</em></h2></div>
        <div className="ep-petluxo-cases__grid">{petLuxoContent.cases.map((item) => <figure key={item.image}><img src={item.image} alt={item.alt} loading="lazy" /><figcaption>{item.label}</figcaption></figure>)}</div>
      </div></section>

      <section className="ep-section ep-petluxo-faq"><div className="ep-container ep-petluxo-faq__grid">
        <div><p className="ep-eyebrow">Dúvidas sobre o PetLuxo</p><h2 className="ep-title-lg">Respostas antes de <em>decidir.</em></h2></div>
        <div>{petLuxoContent.faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronRight aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </div></section>

      <section className="ep-petluxo-final"><div className="ep-container ep-petluxo-final__inner">
        <p className="ep-eyebrow">Próximo passo</p>
        <h2 className="ep-title-lg">Conte a sua rota. A elegibilidade do PetLuxo <em>começa pela análise.</em></h2>
        <p className="ep-copy">Em poucos passos, reunimos as informações que ajudam a avaliar se o PetLuxo faz sentido para o seu pet e a sua viagem.</p>
        <AnalysisButton className="ep-ds-button--luxury" size="lg" onClick={() => startPlanning("final_cta")}>Começar minha análise</AnalysisButton>
      </div></section>
    </main>
    <AnalysisModal open={analysisOpen} onClose={() => setAnalysisOpen(false)} initialRoute={analysisRoute} analyticsSource={analysisSource} />
    <SiteFooter logoSrc="/logo-embarpet-dark.png" note="Acompanhamento dedicado para a viagem internacional do seu pet." onAnalysisClick={() => startPlanning("footer")} groups={[
      { title: "Planeje a viagem", links: [{ label: "Como funciona", href: "/#como-funciona" },{ label: "Modalidades", href: "/#modalidades" },{ label: "Destinos", href: "/#destinos" }] },
      { title: "Conteúdo", links: [{ label: "Histórias reais", href: "/#historias" },{ label: "Perguntas frequentes", href: "/#faq" }] },
      { title: "Embarpet", links: [{ label: "Sobre nós", href: "/sobre" },{ label: "Fale com a equipe", href: "#planejar" }] },
    ]} />
  </>;
}
