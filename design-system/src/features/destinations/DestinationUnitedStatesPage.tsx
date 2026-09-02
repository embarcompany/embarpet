import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Cat, Check, CircleHelp, ClipboardCheck, Dog, HeartHandshake, MapPin, Package, PawPrint, Plane, Route, ShieldCheck, UsersRound } from "lucide-react";
import { AnalysisButton } from "../../components/ui/buttons";
import { FAQItem } from "../../components/ui/system";
import { useLocale } from "../../i18n/locale";
import { setPageMetadata } from "../../lib/seo";

type PetType = "Cachorro" | "Gato" | "Outro";

const questions = [
  "Será que ainda dá tempo de planejar a viagem?",
  "Como saber qual caminho faz sentido para o meu pet?",
  "E se um detalhe aparecer perto do embarque?",
];

const possibilities = [
  { icon: Plane, title: "Mais perto de você", copy: "Quando a viagem pode ser planejada com o pet próximo à família." },
  { icon: Route, title: "No mesmo roteiro", copy: "Quando tutor e pet precisam seguir uma jornada coordenada." },
  { icon: Package, title: "Operação dedicada", copy: "Quando porte, rota ou planejamento pedem outra estrutura." },
  { icon: HeartHandshake, title: "Acompanhamento especializado", copy: "Quando a família busca uma presença mais próxima nos marcos combinados." },
];

export default function DestinationUnitedStatesPage() {
  const { path } = useLocale();
  const [period, setPeriod] = useState("");
  const [pet, setPet] = useState<PetType | "">("");

  useEffect(() => setPageMetadata({
    title: "Levar Pet para os Estados Unidos | Embarpet",
    description: "Comece a planejar a viagem do seu pet para os Estados Unidos com uma análise da rota, do perfil do animal e dos próximos passos.",
    canonicalPath: "/destinos/estados-unidos",
  }), []);

  const startPlanning = () => {
    const query = new URLSearchParams({ origin: "Brasil", destination: "Estados Unidos" });
    if (period) query.set("period", period);
    if (pet) query.set("pet", pet);
    window.location.assign(`${path("/viajar")}?${query.toString()}`);
  };

  return <main className="ep-destination-lp">
    <header className="ep-destination-lp__header">
      <div className="ep-container ep-destination-lp__nav">
        <a href={path("/")} className="ep-destination-lp__logo"><img src="/logo-embarpet-dark.png" alt="Embarpet" /></a>
        <a href="#planejar" className="ep-destination-lp__nav-cta">Começar o planejamento <ArrowRight size={15} aria-hidden="true" /></a>
      </div>
    </header>

    <section className="ep-us-hero" id="planejar">
      <div className="ep-container ep-us-hero__grid">
        <div className="ep-us-hero__copy">
          <p className="ep-us-route"><img src="/flags/br.svg" alt="Brasil" /><span>Brasil</span><i>→</i><img src="/flags/us.svg" alt="Estados Unidos" /><span>Estados Unidos</span></p>
          <h1>Levar seu pet para os <em>Estados Unidos</em> não precisa ser um salto no escuro.</h1>
          <p className="ep-us-hero__intro">Uma viagem internacional pede decisões que façam sentido juntas. Conte o básico do seu caso e comece a organizar os próximos passos.</p>
          <div className="ep-us-proof" aria-label="Provas institucionais Embarpet"><span><b>+2.000</b> embarques realizados</span><i aria-hidden="true" /><span><b>4,9</b> avaliação no Google</span></div>
        </div>
        <div className="ep-us-hero__planner">
          <div className="ep-us-planner__heading"><span><ClipboardCheck size={18} aria-hidden="true" /></span><div><small>Seu ponto de partida</small><h2>Comece pelo que você já sabe.</h2></div></div>
          <div className="ep-us-planner__route"><span><MapPin size={16} aria-hidden="true" /><small>Origem</small><b>Brasil</b></span><i><Plane size={16} aria-hidden="true" /></i><span><MapPin size={16} aria-hidden="true" /><small>Destino</small><b>Estados Unidos</b></span></div>
          <fieldset className="ep-us-planner__field"><legend><CalendarDays size={16} aria-hidden="true" />Quando vocês pretendem viajar?</legend><div className="ep-us-choice-row">{["1 a 3 meses", "3 a 6 meses", "Mais de 6 meses", "Ainda não sei"].map((item) => <button type="button" key={item} className={period === item ? "is-selected" : ""} aria-pressed={period === item} onClick={() => setPeriod(item)}>{period === item ? <Check size={14} aria-hidden="true" /> : null}{item}</button>)}</div></fieldset>
          <fieldset className="ep-us-planner__field"><legend><PawPrint size={16} aria-hidden="true" />Quem vai viajar?</legend><div className="ep-us-choice-row ep-us-choice-row--pets">{(["Cachorro", "Gato", "Outro"] as PetType[]).map((item) => { const Icon = item === "Cachorro" ? Dog : item === "Gato" ? Cat : PawPrint; return <button type="button" key={item} className={pet === item ? "is-selected" : ""} aria-pressed={pet === item} onClick={() => setPet(item)}><Icon size={15} aria-hidden="true" />{item}</button>; })}</div></fieldset>
          <AnalysisButton size="lg" fullWidth onClick={startPlanning}>Começar o planejamento</AnalysisButton>
          <p className="ep-us-planner__note">Você não precisa saber todos os detalhes agora.</p>
        </div>
      </div>
    </section>

    <section className="ep-us-doubt">
      <div className="ep-container ep-us-doubt__grid"><div><p className="ep-us-kicker">Uma jornada grande começa pequena</p><h2>Você não precisa descobrir <em>tudo sozinho</em> antes de começar.</h2><p>O destino importa. Mas o perfil do seu pet, o momento da sua família e a forma de organizar cada decisão também.</p></div><div className="ep-us-doubt__questions">{questions.map((question, index) => <article key={question}><span>0{index + 1}</span><CircleHelp size={21} aria-hidden="true" /><p>{question}</p></article>)}</div></div>
    </section>

    <section className="ep-us-method">
      <div className="ep-container"><div className="ep-us-section-heading"><p className="ep-us-kicker">O método Embarpet</p><h2>A gente começa pelo que você já sabe. <em>O resto ganha caminho.</em></h2><p>Sem despejar burocracia. Sem pedir que você escolha uma modalidade antes de entender a viagem.</p></div><ol className="ep-us-steps">{[
        { icon: UsersRound, title: "Você conta o básico", copy: "Destino, período e o perfil do seu pet já nos dão um ponto de partida." },
        { icon: Route, title: "A gente lê a jornada", copy: "Rota, possibilidades e pontos de atenção entram na mesma conversa." },
        { icon: ShieldCheck, title: "Vocês seguem com um plano", copy: "A equipe orienta os próximos marcos conforme o caso avança." },
      ].map(({ icon: Icon, title, copy }, index) => <li key={title}><span>0{index + 1}</span><Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></li>)}</ol></div>
    </section>

    <section className="ep-us-decision-map">
      <div className="ep-container ep-us-decision-map__grid"><div className="ep-us-decision-map__copy"><p className="ep-us-kicker">O caso vem antes da resposta</p><h2>O país de chegada é só uma parte <em>da decisão.</em></h2><p>É por isso que uma busca no Google não substitui uma análise conectada da viagem de vocês.</p><button type="button" className="ep-us-text-cta" onClick={startPlanning}>Entender os próximos passos <ArrowRight size={16} aria-hidden="true" /></button></div><div className="ep-us-decision-map__visual" aria-label="Elementos que compõem a análise da viagem"><div className="ep-us-decision-map__center"><img src="/flags/us.svg" alt="" aria-hidden="true" /><b>Estados Unidos</b><small>o destino</small></div><span className="is-pet"><PawPrint size={19} />Seu pet</span><span className="is-route"><Route size={19} />Sua rota</span><span className="is-time"><CalendarDays size={19} />Seu momento</span><span className="is-family"><UsersRound size={19} />Sua família</span></div></div>
    </section>

    <section className="ep-us-possibilities">
      <div className="ep-container"><div className="ep-us-possibilities__heading"><p className="ep-us-kicker">Possibilidades de jornada</p><h2>Existem caminhos possíveis. O certo é descobrir qual conversa <em>com a viagem de vocês.</em></h2></div><div className="ep-us-possibilities__grid">{possibilities.map(({ icon: Icon, title, copy }) => <article key={title}><Icon size={24} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p><span>Entendido no contexto do caso</span></article>)}</div></div>
    </section>

    <section className="ep-us-case">
      <div className="ep-container ep-us-case__grid"><figure><img src="/case-leandro-hassum.jpeg" alt="Leandro Hassum com a equipe Embarpet no aeroporto" loading="lazy" /><figcaption>Brasil → Estados Unidos</figcaption></figure><div><p className="ep-us-kicker">Jornadas que acontecem de verdade</p><h2>Toda jornada começa com uma dúvida. <em>Esta também começou.</em></h2><p>Uma viagem internacional não é uma sequência solta de tarefas. É uma história de família que precisa de planejamento, presença e uma equipe que entenda a operação.</p><div className="ep-us-case__proof"><img src="/logo-ipata.svg" alt="IPATA" /><img src="/logo-iata.svg" alt="IATA" /><span>Experiência que acompanha cada etapa da jornada.</span></div></div></div>
    </section>

    <section className="ep-us-faq">
      <div className="ep-container ep-us-faq__grid"><div><p className="ep-us-kicker">Dúvidas antes de começar</p><h2>Você não precisa ter todas as respostas para <em>falar com a gente.</em></h2></div><div className="ep-us-faq__list"><FAQItem question="Ainda dá tempo de planejar uma viagem para os Estados Unidos?">O melhor ponto de partida é entender o período que vocês têm e o perfil da viagem. A partir disso, a equipe organiza uma leitura do caso e dos próximos passos possíveis.</FAQItem><FAQItem question="Meu pet pode viajar comigo para os Estados Unidos?">As possibilidades dependem da rota, do perfil do pet, do momento da viagem e de critérios operacionais. A análise existe justamente para avaliar esse conjunto antes de indicar um caminho.</FAQItem><FAQItem question="Como vocês definem a modalidade da viagem?">A modalidade não é escolhida isoladamente. Nós conectamos o contexto da família, o perfil do pet e a rota para entender o que pode fazer sentido na jornada.</FAQItem><FAQItem question="O que preciso informar para começar?">Origem, destino, período aproximado e informações básicas sobre o pet já são suficientes para abrir a primeira conversa.</FAQItem></div></div>
    </section>

    <section className="ep-us-final"><div className="ep-container ep-us-final__inner"><div><p className="ep-us-kicker">Próximo passo</p><h2>O destino é Estados Unidos. <em>A viagem é de vocês.</em></h2><p>Comece pelo que já sabe. O restante a gente organiza junto.</p><AnalysisButton size="lg" onClick={startPlanning}>Começar a análise da viagem</AnalysisButton></div><img src="/embarpet-familia-pet-cutout.png" alt="Família e pet juntos" loading="lazy" /></div></section>
  </main>;
}
