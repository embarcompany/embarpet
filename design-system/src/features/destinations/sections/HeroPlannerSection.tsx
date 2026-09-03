import type { RefObject } from "react";
import { ArrowLeftRight, CalendarDays, Check, Pencil } from "lucide-react";
import { AnalysisButton } from "../../../components/ui/buttons";

type HeroPlannerSectionProps = {
  period: string;
  routeInverted: boolean;
  heroVisible: boolean;
  heroRef: RefObject<HTMLElement | null>;
  onPeriodChange: (period: string) => void;
  onToggleRoute: () => void;
  onEditDestination: () => void;
  onStartPlanning: () => void;
};

const travelPeriods = ["1 a 3 meses", "3 a 6 meses", "Mais de 6 meses", "Ainda não sei"];

export function HeroPlannerSection({
  period,
  routeInverted,
  heroVisible,
  heroRef,
  onPeriodChange,
  onToggleRoute,
  onEditDestination,
  onStartPlanning,
}: HeroPlannerSectionProps) {
  const origin = routeInverted
    ? { country: "Estados Unidos", flag: "/flags/us.svg", alt: "Bandeira dos Estados Unidos" }
    : { country: "Brasil", flag: "/flags/br.svg", alt: "Bandeira do Brasil" };
  const destination = routeInverted
    ? { country: "Brasil", flag: "/flags/br.svg", alt: "Bandeira do Brasil" }
    : { country: "Estados Unidos", flag: "/flags/us.svg", alt: "Bandeira dos Estados Unidos" };

  return <section ref={heroRef} className={heroVisible ? "ep-us-hero is-in-view" : "ep-us-hero"} id="planejar">
    <div className="ep-container ep-us-hero__grid">
      <div className="ep-us-hero__copy">
        <div className="ep-us-proof" aria-label="Mais de dois mil embarques realizados e avaliação 4,9 no Google"><div className="ep-us-proof__seal"><strong>+2.000</strong><span>pets embarcados</span><i aria-hidden="true" /><img src="/logo-google.svg" alt="Google" /><strong>4,9</strong><span>no Google</span></div></div>
        <h1>Leve seu pet para os <em>Estados Unidos</em><br />com segurança.</h1>
        <p className="ep-us-hero__intro">Você não precisa entender de regras, documentos ou companhia aérea. <strong>Conte sobre seu pet e a sua viagem.</strong> Nós organizamos o que precisa ser visto antes do embarque.</p>
      </div>
      <div className="ep-us-hero__planner-wrap">
        <img className="ep-us-planner__pet-documents" src="/embarpet-pet-documentos-formulario.png" alt="Cachorro com documentos internacionais de viagem e visto aprovado" />
        <div className="ep-us-hero__planner">
          <div className="ep-us-planner__heading"><div><h2>Comece sua análise em menos de 2 minutos.</h2></div></div>
          <div className="ep-us-planner__route">
            <span><img src={origin.flag} alt={origin.alt} /><span><small>Origem</small><b>{origin.country}</b></span></span>
            <span><img src={destination.flag} alt={destination.alt} /><span><small>Destino</small><b>{destination.country}</b></span><button className="ep-us-planner__route-edit" type="button" onClick={onEditDestination} aria-label="Editar destino" title="Editar destino"><Pencil size={14} aria-hidden="true" /></button></span>
            <button className="ep-us-planner__route-swap" type="button" onClick={onToggleRoute} aria-label="Inverter origem e destino" title="Inverter origem e destino" aria-pressed={routeInverted}><ArrowLeftRight size={16} aria-hidden="true" /></button>
          </div>
          <fieldset className="ep-us-planner__field"><legend><span><CalendarDays size={16} aria-hidden="true" /></span>Quando vocês pretendem viajar?</legend><div className="ep-us-choice-row">{travelPeriods.map((item) => <button type="button" key={item} className={period === item ? "is-selected" : ""} aria-pressed={period === item} onClick={() => onPeriodChange(item)}>{period === item ? <Check size={14} aria-hidden="true" /> : null}{item}</button>)}</div></fieldset>
          <AnalysisButton size="lg" fullWidth onClick={onStartPlanning}>Continuar minha análise</AnalysisButton>
          <p className="ep-us-planner__note">Sem compromisso. Você recebe uma orientação inicial para a sua rota.</p>
        </div>
      </div>
    </div>
  </section>;
}
