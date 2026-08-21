import { useEffect } from "react";
import { Check, CheckCircle2, ChevronRight, CircleAlert, ClipboardCheck, FileText, HeartHandshake, Image as ImageIcon, Package, Plane, Route, ShieldCheck, Star } from "lucide-react";
import { SiteHeader } from "../../components/ui/navigation";
import { SiteFooter } from "../../components/ui/footer";
import { AnalysisButton, InternalLink } from "../../components/ui/buttons";
import { useLocale } from "../../i18n/locale";
import { setPageMetadata } from "../../lib/seo";
import { modalityContent, modalitySocialProof, modalityStorytelling, modalityVisualPlan, type ModalityContent } from "./modality-content";

function startAnalysis(slug: string, path: (value: string) => string) {
  window.location.assign(path(`/viajar?modalidade=${encodeURIComponent(slug)}`));
}

function VisualPlaceholder({ label, title, description, direction }: { label: string; title: string; description: string; direction: string }) {
  return <section className="ep-section ep-modality-visual-plan">
    <div className="ep-container ep-modality-visual-plan__grid">
      <figure className={`ep-modality-placeholder ep-modality-placeholder--${direction}`} aria-label={`Placeholder: ${title}`}>
        <div><ImageIcon aria-hidden="true" /><span>Placeholder de fotografia real</span></div>
      </figure>
      <div><p className="ep-eyebrow">{label}</p><h2 className="ep-title-lg">{title}</h2><p className="ep-copy">{description}</p><span className="ep-modality-visual-plan__note">Direção de arte para substituição posterior.</span></div>
    </div>
  </section>;
}
export function ModalityPage({ modality }: { modality: ModalityContent }) {
  const { path, text } = useLocale();
  const storytelling = modalityStorytelling[modality.slug];
  const visualPlan = modalityVisualPlan[modality.slug];
  const socialProof = modalitySocialProof[modality.slug];
  useEffect(() => setPageMetadata({ title: modality.seo.title, description: modality.seo.description, canonicalPath: `/modalidades/${modality.slug}` }), [modality]);

  return <>
    <SiteHeader logoSrc="/logo-embarpet-dark.png" activeLabel={text.navModalities} cta={{ label:text.analyze, href:path("/viajar") }} items={[
      { label:text.navHow, href:path("/#como-funciona") },
      { label:text.navModalities, href:path("/#modalidades"), children:[
        { label:"Viagem na cabine", href:path("/modalidades/viagem-na-cabine"), description:"Com o tutor na cabine, quando perfil e rota permitem.", icon:Plane },
        { label:"Bagagem acompanhada", href:path("/modalidades/bagagem-acompanhada"), description:"No mesmo voo do tutor, em compartimento apropriado.", icon:Package },
        { label:"Compartimento de cargas", href:path("/modalidades/compartimento-de-cargas"), description:"Operação dedicada para diferentes portes e rotas.", icon:Route },
        { label:"Suporte emocional", href:path("/modalidades/suporte-emocional"), description:"Orientação para casos sujeitos a critérios específicos.", icon:HeartHandshake },
      ] },
      { label:text.navServices, href:path("/#servicos") },
      { label:text.navDestinations, href:path("/#destinos"), children:[
        { label:"Estados Unidos", href:path("/#destinos"), description:"Planejamento da rota Brasil–EUA.", icon:Route },
        { label:"União Europeia", href:path("/#destinos"), description:"Cada país pede leitura própria.", icon:Route },
        { label:"Mercosul", href:path("/#destinos"), description:"Planejamento regional com atenção ao caso.", icon:Route },
      ] },
      { label:text.navContent, href:path("/#faq") },
    ]} />
    <main className="ep-modality-page">
      <section className="ep-modality-hero">
        <div className="ep-container ep-modality-hero__grid">
          <div className="ep-modality-hero__content">
            <p className="ep-eyebrow">{modality.eyebrow}</p>
            <p className="ep-modality-hero__label">{modality.label}</p>
            <h1 className="ep-title-xl">{modality.title} <em>{modality.titleHighlight}</em></h1>
            <p className="ep-copy">{modality.intro}</p>
            <AnalysisButton size="lg" onClick={() => startAnalysis(modality.slug, path)}>Começar minha análise</AnalysisButton>
          </div>
          <div className="ep-modality-hero__visual"><img src={modality.heroImage} alt={modality.heroAlt} /><ul>{modality.heroFacts.map((fact) => <li key={fact}><Check size={15} aria-hidden="true" />{fact}</li>)}</ul></div>
        </div>
      </section>

      <section className="ep-section ep-modality-introduction"><div className="ep-container ep-modality-introduction__grid">
        <div><p className="ep-eyebrow">Entenda esta modalidade</p><h2 className="ep-title-lg">{modality.whatTitle}</h2></div>
        <p className="ep-copy">{modality.whatCopy}</p>
      </div></section>

      <section className="ep-section ep-modality-pain"><div className="ep-container ep-modality-pain__grid">
        <div><p className="ep-eyebrow">Antes de decidir</p><h2 className="ep-title-lg">{storytelling.painTitle}</h2><p className="ep-copy">{storytelling.painCopy}</p></div>
        <ul>{storytelling.painPoints.map((point) => <li key={point}><CircleAlert aria-hidden="true" /><span>{point}</span></li>)}</ul>
      </div></section>

      <VisualPlaceholder {...visualPlan} />

      <section className="ep-section ep-modality-process"><div className="ep-container">
        <div className="ep-modality-section-heading"><p className="ep-eyebrow">Do primeiro contato ao embarque</p><h2 className="ep-title-lg">Cada etapa existe para dar <em>clareza à decisão.</em></h2></div>
        <ol className="ep-modality-steps">{modality.howItWorks.map((step, index) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div>{index < modality.howItWorks.length - 1 ? <ChevronRight aria-hidden="true" /> : null}</li>)}</ol>
        <div className="ep-modality-inline-cta"><span>Quer saber se essa possibilidade se aplica à sua viagem?</span><AnalysisButton onClick={() => startAnalysis(modality.slug, path)}>Iniciar uma análise</AnalysisButton></div>
      </div></section>

      <section className="ep-section ep-modality-decision"><div className="ep-container ep-modality-decision__grid">
        <div><p className="ep-eyebrow">Quando ela pode fazer sentido</p><h2 className="ep-title-lg">{modality.decisionTitle}</h2><p className="ep-copy">{modality.decisionCopy}</p></div>
        <ul>{modality.decisionPoints.map((point) => <li key={point}><CheckCircle2 aria-hidden="true" /><span>{point}</span></li>)}</ul>
      </div></section>

      <section className="ep-section ep-modality-benefits"><div className="ep-container ep-modality-benefits__grid">
        <div><p className="ep-eyebrow">O que esta escolha resolve</p><h2 className="ep-title-lg">{modality.benefitTitle}</h2><p className="ep-copy">{modality.benefitCopy}</p></div>
        <ul>{modality.benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" /><span>{benefit}</span></li>)}</ul>
      </div></section>

      <section className="ep-section ep-modality-reassurance"><div className="ep-container ep-modality-reassurance__grid">
        <div><p className="ep-eyebrow">O que muda com uma boa análise</p><h2 className="ep-title-lg">{storytelling.reassuranceTitle}</h2><p className="ep-copy">{storytelling.reassuranceCopy}</p><AnalysisButton onClick={() => startAnalysis(modality.slug, path)}>Começar minha análise</AnalysisButton></div>
        <ol>{storytelling.reassurancePoints.map((point, index) => <li key={point}><span>0{index + 1}</span><p>{point}</p></li>)}</ol>
      </div></section>

      <section className="ep-section ep-modality-proof"><div className="ep-container ep-modality-proof__grid"><img src={modality.proofImage} alt={modality.proofAlt} loading="lazy" /><div><p className="ep-eyebrow">Experiência que orienta</p><h2 className="ep-title-lg">{modality.proofTitle}</h2><p className="ep-copy">{modality.proofCopy}</p><div className="ep-modality-proof__links"><span><ShieldCheck aria-hidden="true" />Leitura técnica da viagem</span><span><FileText aria-hidden="true" />Documentação com contexto</span><span><ClipboardCheck aria-hidden="true" />Operação acompanhada</span></div><AnalysisButton onClick={() => startAnalysis(modality.slug, path)}>Avaliar esta possibilidade</AnalysisButton></div></div></section>

      <section className="ep-section ep-modality-authority"><div className="ep-container ep-modality-authority__grid">
        <div><p className="ep-eyebrow">Experiência comprovada</p><h2 className="ep-title-lg">Decisões mais seguras começam com <em>quem vive a operação.</em></h2><p className="ep-copy">{socialProof.copy}</p><div className="ep-modality-authority__metrics"><div><strong>+2.000</strong><span>embarques<br />realizados</span></div><div><img src="/logo-google.svg" alt="Google" /><strong>4,9</strong><span aria-label="Avaliação 4,9 no Google"><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /></span></div><div className="ep-modality-authority__members"><img src="/logo-ipata.svg" alt="IPATA" /><img src="/logo-iata.svg" alt="IATA" /><span>Membro IPATA<br />e IATA</span></div></div><AnalysisButton onClick={() => startAnalysis(modality.slug, path)}>Começar minha análise</AnalysisButton></div>
        <figure><img src={socialProof.image} alt={socialProof.alt} loading="lazy" /><figcaption>{socialProof.label}</figcaption></figure>
      </div></section>

      <section className="ep-section ep-modality-faq"><div className="ep-container ep-modality-faq__grid"><div><p className="ep-eyebrow">Dúvidas sobre {modality.label.toLocaleLowerCase("pt-BR")}</p><h2 className="ep-title-lg">Respostas antes de <em>decidir.</em></h2></div><div>{modality.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronRight aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section className="ep-modality-final"><div className="ep-container ep-modality-final__inner"><p className="ep-eyebrow">Próximo passo</p><h2 className="ep-title-lg">Conte a sua rota. A análise começa <em>pelo contexto.</em></h2><p className="ep-copy">Em poucos passos, reunimos as informações que ajudam a avaliar esta e outras possibilidades para a viagem do seu pet.</p><div><AnalysisButton size="lg" onClick={() => startAnalysis(modality.slug, path)}>Começar minha análise</AnalysisButton><InternalLink size="lg" href={path("/#modalidades")}>Ver todas as modalidades</InternalLink></div></div></section>
    </main>
    <SiteFooter logoSrc="/logo-embarpet-dark.png" groups={[
      { title:"Planeje a viagem", links:[{ label:"Como funciona", href:"/#como-funciona" },{ label:"Modalidades", href:"/#modalidades" },{ label:"Destinos", href:"/#destinos" }] },
      { title:"Conteúdo", links:[{ label:"Histórias reais", href:"/#historias" },{ label:"Perguntas frequentes", href:"/#faq" }] },
      { title:"Embarpet", links:[{ label:"Sobre nós", href:"/#sobre" },{ label:"Fale com a equipe", href:"/viajar" }] },
    ]} />
  </>;
}
