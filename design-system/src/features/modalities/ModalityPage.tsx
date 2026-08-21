import { useEffect } from "react";
import { Check, CheckCircle2, ChevronRight, ClipboardCheck, FileText, Route, ShieldCheck } from "lucide-react";
import { SiteHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { AnalysisButton, InternalLink } from "../../components/ui/buttons";
import { setPageMetadata } from "../../lib/seo";
import { modalityContent, type ModalityContent } from "./modality-content";

function startAnalysis(slug: string) {
  window.location.assign(`/viajar?modalidade=${encodeURIComponent(slug)}`);
}
export function ModalityPage({ modality }: { modality: ModalityContent }) {
  useEffect(() => setPageMetadata({ title: modality.seo.title, description: modality.seo.description, canonicalPath: `/modalidades/${modality.slug}` }), [modality]);

  return <>
    <SiteHeader logoSrc="/logo-embarpet-dark.png" activeLabel="Modalidades" cta={{ label:"Começar minha análise", href:"/viajar" }} items={[
      { label:"Como funciona", href:"/#como-funciona" },
      { label:"Modalidades", href:"/#modalidades", children:Object.values(modalityContent).map((item) => ({ label:item.label, href:`/modalidades/${item.slug}`, description:item.intro, icon:Route })) },
      { label:"Destinos", href:"/#destinos" },
      { label:"Conteúdo", href:"/#faq" },
    ]} />
    <main className="ep-modality-page">
      <section className="ep-modality-hero">
        <div className="ep-container ep-modality-hero__grid">
          <div className="ep-modality-hero__content">
            <p className="ep-eyebrow">{modality.eyebrow}</p>
            <p className="ep-modality-hero__label">{modality.label}</p>
            <h1 className="ep-title-xl">{modality.title} <em>{modality.titleHighlight}</em></h1>
            <p className="ep-copy">{modality.intro}</p>
            <AnalysisButton size="lg" onClick={() => startAnalysis(modality.slug)}>Começar minha análise</AnalysisButton>
          </div>
          <div className="ep-modality-hero__visual"><img src={modality.heroImage} alt={modality.heroAlt} /><ul>{modality.heroFacts.map((fact) => <li key={fact}><Check size={15} aria-hidden="true" />{fact}</li>)}</ul></div>
        </div>
      </section>

      <section className="ep-section ep-modality-introduction"><div className="ep-container ep-modality-introduction__grid">
        <div><p className="ep-eyebrow">Entenda a modalidade</p><h2 className="ep-title-lg">{modality.whatTitle}</h2></div>
        <p className="ep-copy">{modality.whatCopy}</p>
      </div></section>

      <section className="ep-section ep-modality-process"><div className="ep-container">
        <div className="ep-modality-section-heading"><p className="ep-eyebrow">Da análise à operação</p><h2 className="ep-title-lg">Cada etapa existe para dar <em>clareza à decisão.</em></h2></div>
        <ol className="ep-modality-steps">{modality.howItWorks.map((step, index) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div>{index < modality.howItWorks.length - 1 ? <ChevronRight aria-hidden="true" /> : null}</li>)}</ol>
      </div></section>

      <section className="ep-section ep-modality-decision"><div className="ep-container ep-modality-decision__grid">
        <div><p className="ep-eyebrow">Onde ela se encaixa</p><h2 className="ep-title-lg">{modality.decisionTitle}</h2><p className="ep-copy">{modality.decisionCopy}</p></div>
        <ul>{modality.decisionPoints.map((point) => <li key={point}><CheckCircle2 aria-hidden="true" /><span>{point}</span></li>)}</ul>
      </div></section>

      <section className="ep-section ep-modality-proof"><div className="ep-container ep-modality-proof__grid"><img src={modality.proofImage} alt={modality.proofAlt} loading="lazy" /><div><p className="ep-eyebrow">Experiência que orienta</p><h2 className="ep-title-lg">{modality.proofTitle}</h2><p className="ep-copy">{modality.proofCopy}</p><div className="ep-modality-proof__links"><span><ShieldCheck aria-hidden="true" />Leitura técnica da viagem</span><span><FileText aria-hidden="true" />Documentação com contexto</span><span><ClipboardCheck aria-hidden="true" />Operação acompanhada</span></div></div></div></section>

      <section className="ep-section ep-modality-faq"><div className="ep-container ep-modality-faq__grid"><div><p className="ep-eyebrow">Dúvidas sobre {modality.label.toLocaleLowerCase("pt-BR")}</p><h2 className="ep-title-lg">Respostas antes de <em>decidir.</em></h2></div><div>{modality.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronRight aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section className="ep-modality-final"><div className="ep-container ep-modality-final__inner"><p className="ep-eyebrow">Próximo passo</p><h2 className="ep-title-lg">Conte a sua rota. A análise começa <em>pelo contexto.</em></h2><p className="ep-copy">Em poucos passos, reunimos as informações que ajudam a avaliar esta e outras possibilidades para a viagem do seu pet.</p><div><AnalysisButton size="lg" onClick={() => startAnalysis(modality.slug)}>Começar minha análise</AnalysisButton><InternalLink size="lg" href="/#modalidades">Ver todas as modalidades</InternalLink></div></div></section>
    </main>
    <SiteFooter logoSrc="/logo-embarpet-dark.png" groups={[
      { title:"Planeje a viagem", links:[{ label:"Como funciona", href:"/#como-funciona" },{ label:"Modalidades", href:"/#modalidades" },{ label:"Destinos", href:"/#destinos" }] },
      { title:"Conteúdo", links:[{ label:"Histórias reais", href:"/#historias" },{ label:"Perguntas frequentes", href:"/#faq" }] },
      { title:"Embarpet", links:[{ label:"Sobre nós", href:"/#sobre" },{ label:"Fale com a equipe", href:"/viajar" }] },
    ]} />
  </>;
}
