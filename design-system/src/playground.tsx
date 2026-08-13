import { useState } from "react";
import "./components.css";
import { AuthorityBand, ConversionHero } from "./patterns";
import { ModalityRail, type RouteData } from "./components";
import { Button, Notice, SectionHeading } from "./primitives";
import { InternationalTransfer, type Region } from "./components/ui/country-accordion";
import { ScrollFlyIn } from "./components/ui/hero-section-3";
import { FAQItem } from "./components/ui/system";
import { ArrowRight, ClipboardCheck, Crown, FileText, Globe2, Headset, HeartHandshake, MapPin, Package, Plane, Route, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import { SiteHeader } from "./components/ui/navigation";
import { SiteFooter } from "./components/ui/footer";
import { WhatsAppFloat, type LeadContext } from "./components/ui/whatsapp-float";
import { DiagnosticFlow } from "./components/ui/diagnostic-flow";
import { CaseDragCards } from "./components/ui/case-drag-cards";

const images = {
  hero: "/embarpet-hero-pet-travel.png",
  planning: "/embarpet-trip-planning.png",
  crate: "/embarpet-crate-preparation.png",
  documents: "/embarpet-autoridade-destino-real.jpeg",
  service: "/embarpet-service-management.png",
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

export default function EmbarpetHome() {
  const [route, setRoute] = useState<RouteData>({ origin:"", destination:"", period:"" });
  const [message, setMessage] = useState("");
  const [petLuxoUnmuted, setPetLuxoUnmuted] = useState(false);
  const [petLuxoFullVideoLoaded, setPetLuxoFullVideoLoaded] = useState(false);
  const startFromDestination = (destination: string) => {
    setRoute((current) => ({ ...current, destination }));
    document.getElementById("analise")?.scrollIntoView({ behavior:"smooth" });
  };
  const leadContext: LeadContext = { source:"home", page:"/", origin:route.origin, destination:route.destination, period:route.period };

  return <><SiteHeader overlay logoSrc="/logo-embarpet-dark.png" items={[
    { label:"Como funciona", href:"#como-funciona" },
    { label:"Modalidades", href:"#modalidades", children:[
      { label:"Pet na cabine", href:"#modalidades", description:"Possibilidade para alguns pets e rotas.", icon:Plane },
      { label:"Bagagem acompanhada", href:"#modalidades", description:"Mesmo voo do tutor, em compartimento próprio.", icon:Package },
      { label:"Carga viva", href:"#modalidades", description:"Operação especializada para casos específicos.", icon:Route },
    ] },
    { label:"Serviços", href:"#servicos" },
    { label:"Destinos", href:"#destinos", children:[
      { label:"Estados Unidos", href:"#destinos", description:"Planejamento da rota Brasil–EUA.", icon:Route },
      { label:"União Europeia", href:"#destinos", description:"Cada país pede leitura própria.", icon:Route },
      { label:"Mercosul", href:"#destinos", description:"Planejamento regional com atenção ao caso.", icon:Route },
    ] },
    { label:"Conteúdo", href:"#faq" },
  ]} /><main>
    <ConversionHero imageSrc={images.hero} imageAlt="Tutor com pet em contexto de viagem internacional" flow={<DiagnosticFlow onRouteChange={setRoute} onComplete={(lead) => setMessage(`Diagnóstico preparado para ${lead.destination || "sua rota"}.`)} />}>
      <p className="ep-eyebrow">Transporte internacional de pets</p>
      <h1 className="ep-title-xl">Seu pet vai para outro país? Vamos encontrar a melhor forma de realizar essa viagem.</h1>
      <p className="ep-copy">Conte origem, destino e data prevista. A partir do seu caso, analisamos possibilidades, requisitos e os próximos passos para a viagem.</p>
      <p className="ep-hero-premium-note">A modalidade e o escopo de acompanhamento dependem da rota, do pet e das regras vigentes.</p>
    </ConversionHero>
    <AuthorityBand />
    {message ? <div className="ep-container ep-home-notice"><Notice kind="success">{message}</Notice></div> : null}

    <section className="ep-home-modalities" id="modalidades"><div className="ep-container"><div className="ep-home-modalities__intro"><div><p className="ep-eyebrow">Não existe uma resposta pronta</p><h2 className="ep-title-lg">Antes da modalidade, vem a leitura do seu caso.</h2></div><p className="ep-copy">Cabine, bagagem acompanhada e carga viva são possibilidades — nunca uma promessa de prateleira. Rota, perfil do pet e regras vigentes orientam a decisão.</p></div>
      <ModalityRail items={[
        { icon:"plane", title:"Pet na cabine", copy:"Em algumas rotas, pets dentro dos critérios podem viajar próximos ao tutor.", ctaLabel:"Avaliar pet na cabine", detailHref:"/modalidades/pet-na-cabine", imageSrc:images.hero, imageAlt:"Pet em contexto de viagem" },
        { icon:"document", title:"Bagagem acompanhada", copy:"Em determinados casos, o pet embarca no mesmo voo do tutor, em compartimento apropriado.", ctaLabel:"Avaliar bagagem acompanhada", detailHref:"/modalidades/bagagem-acompanhada", imageSrc:images.crate, imageAlt:"Caixa de transporte para pet" },
        { icon:"home", title:"Carga viva", copy:"Uma operação especializada para perfis, rotas ou viagens que pedem uma estrutura própria.", ctaLabel:"Avaliar carga viva", detailHref:"/modalidades/carga-viva", imageSrc:images.service, imageAlt:"Operação de carga viva acompanhada pela Embarpet", videoSrc:"/embarpet-carga-viva-preview-5s.mp4" },
        { icon:"route", title:"Importação", copy:"A chegada ao Brasil também pede leitura de origem, documentação e planejamento prévio.", ctaLabel:"Planejar a importação", detailHref:"/modalidades/importacao-de-pets", imageSrc:images.documents, imageAlt:"Documentação para importação de pet" },
      ]} />
      <p className="ep-home-bridge">A melhor possibilidade nasce da análise certa — e é isso que começamos a fazer com você.</p>
    </div></section>

    <section className="ep-home-service" id="servicos"><div className="ep-container ep-home-service__grid"><div className="ep-home-team-grid" aria-label="Pessoas que fazem parte da equipe Embarpet">{teamMembers.map((member) => <figure className="ep-home-team-card" key={member.name}><div className="ep-home-team-card__placeholder" aria-hidden="true">Foto</div><figcaption><b>{member.name}</b><span>{member.role}</span></figcaption></figure>)}</div><div><p className="ep-eyebrow">Quem somos</p><h2 className="ep-title-lg">Por trás de cada rota, existe uma equipe que cuida dos detalhes.</h2><p className="ep-copy">A Embarpet reúne atendimento, planejamento, documentação e operação para transformar uma viagem complexa em próximos passos claros — com pessoas acompanhando o seu caso de verdade.</p><div className="ep-home-service__list"><span><Route size={19} />Leitura humana da rota, do prazo e do embarque</span><span><Package size={19} />Orientação conectada entre documentos e operação</span><span><ShieldCheck size={19} />Clareza antes de qualquer decisão de viagem</span></div><a className="ep-button ep-button--secondary" href="/equipe-e-credenciais"><span>Conhecer quem faz a Embarpet</span><ArrowRight size={18} aria-hidden="true" /></a></div></div></section>

    <section className="ep-home-process-section" id="como-funciona"><div className="ep-container ep-home-process ep-home-process--cycle"><div className="ep-home-process__intro"><p className="ep-eyebrow">Metodologia Embarpet</p><h2 className="ep-title-lg">Uma forma própria de transformar complexidade em <em>caminho.</em></h2><p className="ep-copy">Nossa metodologia conecta rota, perfil do pet, exigências e operação em uma leitura única — para que cada decisão tenha contexto antes de virar próximo passo.</p></div><div className="ep-home-process__cycle" aria-label="As quatro etapas da metodologia Embarpet"><span className="ep-home-process__orbit" aria-hidden="true" /><div className="ep-home-process__core"><img src="/logo-embarpet-symbol.png" alt="" /><strong>Método<br />Embarpet</strong><small>Uma jornada<br />com contexto.</small></div>{[
      { icon:Globe2, title:"Entendemos a viagem", copy:"Origem, destino, prazo e o perfil do pet.", number:"01" },
      { icon:ClipboardCheck, title:"Desenhamos o plano", copy:"Possibilidades e cronograma para a família.", number:"02" },
      { icon:FileText, title:"Preparamos as etapas", copy:"Documentação e orientações do seu caso.", number:"03" },
      { icon:Headset, title:"Acompanhamos a operação", copy:"Marcos definidos até o próximo encontro.", number:"04" },
    ].map(({ icon: Icon, title, copy, number }) => <a className="ep-home-process__cycle-step" href="#analise" key={title}><span className="ep-home-process__cycle-icon"><Icon size={20} strokeWidth={1.7} /></span><span><b>{number}</b><strong>{title}</strong><small>{copy}</small></span></a>)}</div></div></section>

    <section className="ep-home-cases" id="historias"><CaseDragCards cases={[
      { id:"leandro-hassum", title:"Leandro Hassum", subtitle:"Brasil → Estados Unidos", instagramHandle:"@leandrohassum", instagramUrl:"https://www.instagram.com/leandrohassum/", imageSrc:"/case-leandro-hassum.jpeg", imageAlt:"Leandro Hassum e equipe Embarpet no aeroporto" },
      { id:"talles-magno", title:"Talles Magno", subtitle:"Brasil → Estados Unidos", instagramHandle:"@talles_magno", instagramUrl:"https://www.instagram.com/talles_magno/", imageSrc:"/case-talles-magno.jpg", imageAlt:"Tutor com pet em Nova York" },
      { id:"alan-franco", title:"Alan Franco", subtitle:"Brasil → Estados Unidos", instagramHandle:"@alanfranco_", instagramUrl:"https://www.instagram.com/alanfranco_/", imageSrc:images.documents, imageAlt:"Documentação para viagem com pet" },
      { id:"kiliquinha", title:"Kiliquinha", subtitle:"Brasil → Estados Unidos", instagramHandle:"@kiliquinha", instagramUrl:"https://www.instagram.com/kiliquinha/", imageSrc:images.service, videoSrc:"/case-kiliquinha.mp4", imageAlt:"Vídeo da Kiliquinha em contexto de viagem" },
      { id:"renato-paiva", title:"Renato Paiva", subtitle:"Jornada internacional com a Embarpet", instagramHandle:"@renatopaiva009", instagramUrl:"https://www.instagram.com/renatopaiva009/", imageSrc:"/case-renato-paiva.jpeg", imageAlt:"Renato Paiva com a equipe Embarpet" },
    ]} /></section>

    <section className="ep-home-luxury" id="pet-luxo"><div className="ep-container ep-home-luxury__grid"><div className="ep-home-luxury__image"><video key={petLuxoFullVideoLoaded ? "petluxo-full" : "petluxo-preview"} src={petLuxoFullVideoLoaded ? "/embarpet-petluxo-baeta-alpargata.mp4" : "/embarpet-petluxo-preview-5s.mp4"} aria-label="Consultora Embarpet acompanhando pets no aeroporto" autoPlay loop muted={petLuxoFullVideoLoaded ? !petLuxoUnmuted : true} playsInline preload={petLuxoFullVideoLoaded ? "metadata" : "auto"} /><button type="button" className="ep-home-luxury__sound" onClick={() => { if (!petLuxoFullVideoLoaded) { setPetLuxoFullVideoLoaded(true); setPetLuxoUnmuted(true); return; } setPetLuxoUnmuted((current) => !current); }}>{petLuxoUnmuted ? <VolumeX size={15} /> : <Volume2 size={15} />}{petLuxoUnmuted ? "Silenciar" : "Ativar som"}</button></div><div className="ep-home-luxury__content"><p className="ep-eyebrow">PetLuxo <span>·</span> atendimento dedicado</p><h2 className="ep-title-lg">Um consultor especializado acompanha seu pet até você.</h2><p className="ep-copy">PetLuxo é um acompanhamento dedicado para jornadas que pedem presença e coordenação ainda mais próximas. Um consultor especializado conduz o pet com atenção aos marcos definidos até o encontro com a família.</p><div className="ep-home-luxury__list"><span><i>01</i><Crown size={17} /><b>Planejamento individual</b><small>Uma leitura própria para a jornada da família.</small></span><span><i>02</i><HeartHandshake size={17} /><b>Presença especializada</b><small>Um consultor acompanha o pet nos marcos combinados.</small></span><span><i>03</i><ShieldCheck size={17} /><b>Coordenação até o encontro</b><small>Cuidado contínuo até a entrega planejada.</small></span></div><div className="ep-home-luxury__actions"><Button variant="secondary" icon="arrow" onClick={() => document.getElementById("analise")?.scrollIntoView({ behavior:"smooth" })}>Avaliar PetLuxo</Button></div></div></div></section>

    <InternationalTransfer subtitle="O destino muda o plano" title="Comece por onde vocês vão chegar." description="Regras, prazos e processos variam conforme o destino. Selecione uma rota prioritária ou conte outra: levamos essa informação para a sua análise inicial." regions={regions} onCountrySelect={(country) => startFromDestination(country.name)} />

    <section className="ep-home-authority"><div className="ep-container ep-home-authority__grid"><div className="ep-home-authority__mosaic" aria-label="Momentos reais de embarques internacionais acompanhados pela Embarpet"><figure className="ep-home-authority__tile ep-home-authority__tile--main"><img src={images.documents} alt="Pet em viagem internacional diante de um destino icônico" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--talles"><img src="/embarpet-mosaico-cabine.jpeg" alt="Pet em cabine durante uma viagem internacional" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--leandro"><img src="/embarpet-mosaico-cuidado.jpg" alt="Tutor com pet em momento de cuidado" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--renato"><img src="/embarpet-mosaico-familia.jpg" alt="Família e pet aproveitando o destino" /></figure><figure className="ep-home-authority__tile ep-home-authority__tile--luxury"><img src="/embarpet-mosaico-encontro.jpg" alt="Tutora com pet em momento de encontro" /></figure></div><div className="ep-home-authority__content"><p className="ep-eyebrow">Autoridade que aparece na operação</p><h2 className="ep-title-lg">Não é só saber a regra. É saber o que ela muda na viagem de vocês.</h2><p className="ep-copy">Cada rota pede uma leitura cuidadosa entre requisitos, prazo, documentação, companhia aérea e perfil do pet. É essa visão integrada que transforma informação em um plano possível.</p><div className="ep-home-authority__proof"><div><strong>+2.000</strong><span>embarques<br />analisados</span></div><div><img src="/logo-ipata.png" alt="IPATA" /><span>credenciada</span></div><div><img src="/logo-iata.png" alt="IATA" /><span>credenciada</span></div></div><a className="ep-home-authority__story-cta" href="/equipe-e-credenciais"><span>Conheça nossa história</span><ArrowRight size={18} aria-hidden="true" /></a></div></div></section>

    <section className="ep-section ep-container ep-home-faq" id="faq"><div><SectionHeading eyebrow="Dúvidas antes de começar" title="Perguntas frequentes sobre transporte aéreo de pets." copy="Respostas claras para os pontos que mais geram dúvidas antes de uma viagem internacional com animal de estimação." /></div><div className="ds-faq"><FAQItem question="Como transportar meu animal de estimação em avião?">O transporte aéreo de animais começa pela análise de origem, destino, prazo, espécie, porte e regras da companhia aérea. Com isso, avaliamos a modalidade possível — cabine, bagagem acompanhada ou carga viva — e o planejamento da documentação.</FAQItem><FAQItem question="O deck inferior do avião é confortável para pets?">Quando a modalidade é bagagem acompanhada ou carga viva, o pet viaja em compartimento apropriado da aeronave. As condições dependem da companhia aérea, rota, caixa de transporte e critérios operacionais; por isso cada embarque precisa ser avaliado individualmente.</FAQItem><FAQItem question="Alguém viaja com meu animal no deck inferior?">O pet não viaja acompanhado por uma pessoa dentro do compartimento de transporte. A operação é conduzida pela companhia aérea e pelas equipes de solo; quando aplicável, o tutor segue no mesmo voo e recebe orientação sobre cada etapa do embarque.</FAQItem><FAQItem question="Animais braquicefálicos podem viajar de avião?">Cães e gatos braquicefálicos podem ter restrições específicas por causa de características respiratórias. A possibilidade de transporte aéreo depende da raça, condição veterinária, companhia aérea, rota e modalidade disponível no momento da viagem.</FAQItem><FAQItem question="O transporte aéreo de animais é seguro?">O transporte de pets por avião segue processos, normas e cuidados próprios, mas a segurança depende de uma decisão bem planejada: rota adequada, documentação, caixa correta, condição do animal e regras atualizadas da companhia aérea e do destino.</FAQItem><FAQItem question="Como preparar meu animal para o transporte aéreo?">A preparação para viagem de pet inclui adaptação à caixa de transporte, consulta veterinária quando indicada, documentação, rotina de alimentação e orientações para o dia do voo. O plano correto varia conforme o perfil do animal e a rota internacional.</FAQItem><FAQItem question="O que é CVI para viagem internacional com pet?">O CVI, ou Certificado Veterinário Internacional, é um documento oficial usado no processo de saída do Brasil com animal de estimação. Os requisitos e a emissão seguem o fluxo da autoridade competente e as exigências do país de destino.</FAQItem><FAQItem question="Como escolher a caixa de transporte ideal para meu pet?">A caixa de transporte para avião precisa respeitar as medidas do pet, ventilação, material, modalidade de embarque e regras da companhia aérea. Uma caixa adequada permite que o animal fique em posição natural e atende às especificações da viagem.</FAQItem></div></section>
    <ScrollFlyIn className="ep-final-fly-in" imageUrl="https://cdn.prod.website-files.com/661fdce3e735db03332bf817/66223004372c7c1124c1b0d1_Top-view2x-p-2000.webp" imageAlt="Vista superior de um avião particular cruzando a tela"><div className="mx-auto max-w-3xl px-4 text-center"><div className="ep-final-impact" aria-label="Mais de dois mil embarques analisados"><span className="ep-final-impact__avatars" aria-hidden="true"><i /><i /><i /><i /></span><strong>+2.000</strong><small>embarques<br />analisados</small></div><h2 className="mt-2 text-5xl font-bold leading-tight text-white md:text-7xl">Vamos começar a desenhar a viagem do seu pet?</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">Leva poucos minutos para compartilhar a rota. Depois, a gente transforma as informações em um próximo passo claro.</p><button type="button" onClick={() => document.getElementById("analise")?.scrollIntoView({ behavior:"smooth" })} className="ep-button ep-button--primary mt-8">Iniciar minha análise</button></div></ScrollFlyIn>
  </main><SiteFooter logoSrc="/logo-embarpet-dark.png" groups={[
    { title:"Planeje a viagem", links:[{ label:"Como funciona", href:"#como-funciona" },{ label:"Modalidades", href:"#modalidades" },{ label:"Destinos", href:"#destinos" }] },
    { title:"Conteúdo", links:[{ label:"Guias para viagem", href:"#guias" },{ label:"Histórias reais", href:"#historias" },{ label:"Perguntas frequentes", href:"#faq" }] },
    { title:"Embarpet", links:[{ label:"Sobre nós", href:"#sobre" },{ label:"Fale com a equipe", href:"#analise" },{ label:"Privacidade", href:"#privacidade" }] },
  ]} /><WhatsAppFloat context={leadContext} onStart={(context) => setMessage("Entrada WhatsApp preparada para " + (context.destination || "sua rota") + ".")} /></>;
}
