import { FileCheck2, Globe2, Luggage, Plane, Sparkles, Stethoscope } from "lucide-react";
import { AnalysisButton } from "../../../components/ui/buttons";
import type { DestinationLandingContent } from "../destination-content";

const serviceIcons = {
  plane: Plane,
  document: FileCheck2,
  globe: Globe2,
  stethoscope: Stethoscope,
  box: Luggage,
  sparkles: Sparkles,
};

export function ServicesSection({
  destination,
  onStartPlanning,
}: {
  destination: DestinationLandingContent;
  onStartPlanning: () => void;
}) {
  return <section className="ep-destination-services" aria-labelledby="destination-services-title"><div className="ep-container"><div className="ep-destination-services__heading"><p className="ep-us-kicker">Nossos serviços</p><h2 id="destination-services-title">{destination.servicesHeading} <em>{destination.servicesHeadingHighlight}</em></h2><p>{destination.servicesIntro}</p></div><div className="ep-destination-services__grid">{destination.services.map(({ icon, title, copy, topics }) => {
    const Icon = serviceIcons[icon];
    return <article key={title}><span><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p><ul>{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></article>;
  })}</div><div className="ep-destination-services__cta"><AnalysisButton onClick={onStartPlanning}>Quero planejar a viagem do meu pet</AnalysisButton></div></div></section>;
}
