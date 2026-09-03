import { Route, ShieldCheck, UsersRound } from "lucide-react";
import { AnalysisButton } from "../../../components/ui/buttons";
import type { DestinationLandingContent } from "../destination-content";

const steps = [
  { icon: UsersRound, title: "Você fala sobre seu pet", copy: "Destino, período e informações básicas já mostram por onde começar." },
  { icon: Route, title: "Nós avaliamos a viagem", copy: "Rota, exigências e operação são lidas juntas antes de qualquer decisão." },
  { icon: ShieldCheck, title: "Seu pet embarca com segurança" },
];

export function MethodSection({ destination, onStartPlanning }: { destination: DestinationLandingContent; onStartPlanning: () => void }) {
  return <section className="ep-us-method" id="plano"><div className="ep-container"><div className="ep-us-section-heading"><p className="ep-us-kicker">Como a Embarpet ajuda</p><h2>Você cuida do seu pet. <em>Nós cuidamos da operação.</em></h2><p>Em vez de deixar você sozinho diante de informações soltas, transformamos a viagem do seu pet em <strong>próximos passos que fazem sentido para a rota.</strong></p></div><ol className="ep-us-steps">{steps.map(({ icon: Icon, title, copy }, index) => <li key={title}><span>0{index + 1}</span><Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{copy ?? destination.methodArrivalCopy}</p></li>)}</ol><div className="ep-us-method__cta"><AnalysisButton onClick={onStartPlanning}>Quero ajuda para a viagem do meu pet</AnalysisButton></div></div></section>;
}
