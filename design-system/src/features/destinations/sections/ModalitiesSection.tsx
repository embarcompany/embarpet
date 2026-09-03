import { ArrowUpRight, HeartHandshake, Luggage, PackageCheck, Plane } from "lucide-react";
import { InternalLink } from "../../../components/ui/buttons";

const modalities = [
  { icon: Plane, title: "Viagem na cabine", copy: "Quando o porte, a companhia e a rota permitem que o pet viaje próximo da família.", href: "/modalidades/viagem-na-cabine" },
  { icon: Luggage, title: "Bagagem acompanhada", copy: "Pet e tutor seguem no mesmo voo, dentro de uma operação e caixa adequadas.", href: "/modalidades/bagagem-acompanhada" },
  { icon: PackageCheck, title: "Compartimento de cargas", copy: "Uma alternativa com reserva, logística e regras próprias para a jornada do animal.", href: "/modalidades/compartimento-de-cargas" },
  { icon: HeartHandshake, title: "Suporte emocional", copy: "Uma possibilidade que depende das regras vigentes e da análise responsável do caso.", href: "/modalidades/suporte-emocional" },
] as const;

export function ModalitiesSection() {
  return <section className="ep-us-modalities" aria-labelledby="modalities-title"><div className="ep-container">
    <div className="ep-us-modalities__heading"><p className="ep-us-kicker">Modalidades de embarque</p><h2 id="modalities-title">Cada viagem pede uma <em>possibilidade diferente.</em></h2><p>Cabine, bagagem acompanhada, compartimento de cargas ou suporte emocional: <strong>a modalidade é definida pelo contexto da sua viagem.</strong></p></div>
    <div className="ep-us-modalities__grid">{modalities.map(({ icon: Icon, title, copy, href }) => <InternalLink key={title} href={href} className="ep-us-modalities__card"><span><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p><b>Entenda a modalidade <ArrowUpRight size={15} aria-hidden="true" /></b></InternalLink>)}</div>
  </div></section>;
}
