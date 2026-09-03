import { FileCheck2, Globe2, Plane, Sparkles, Stethoscope } from "lucide-react";
import { AnalysisButton } from "../../../components/ui/buttons";
import type { DestinationLandingContent } from "../destination-content";

const serviceIcons = {
  plane: Plane,
  document: FileCheck2,
  globe: Globe2,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
};

export function ServicesSection({
  destination,
  onStartPlanning,
}: {
  destination: DestinationLandingContent;
  onStartPlanning: () => void;
}) {
  return <section className="ep-destination-services" aria-labelledby="destination-services-title"><div className="ep-container"><div className="ep-destination-services__heading"><p className="ep-us-kicker">O que coordenamos na sua rota</p><h2 id="destination-services-title">Tudo o que seu pet precisa <em>para viajar com segurança.</em></h2><p>Do planejamento ao embarque internacional, cada frente é analisada conforme <strong>seu pet, sua rota e o destino.</strong></p></div><div className="ep-destination-services__grid">{destination.services.map(({ icon, title, copy, variant }) => {
    const Icon = serviceIcons[icon];
    return <article key={title} className={variant === "luxury" ? "is-luxury" : ""}><span><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></article>;
  })}</div><div className="ep-destination-services__cta"><AnalysisButton onClick={onStartPlanning}>Quero planejar a viagem do meu pet</AnalysisButton></div></div></section>;
}
