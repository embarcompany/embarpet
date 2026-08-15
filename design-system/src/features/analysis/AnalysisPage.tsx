import { ArrowLeft, CalendarDays, MapPin, Plane } from "lucide-react";
import { DiagnosticFlow } from "../../components/ui/diagnostic-flow";

function routeFromLocation() {
  if (typeof window === "undefined") return { origin:"", destination:"", period:"" };
  const query = new URLSearchParams(window.location.search);
  return { origin:query.get("origin") ?? "", destination:query.get("destination") ?? "", period:query.get("period") ?? "" };
}

export default function AnalysisPage() {
  const route = routeFromLocation();
  const routeIsComplete = Boolean(route.origin && route.destination && route.period);
  return <main className="ep-analysis-page"><header className="ep-analysis-page__header"><a href="/" aria-label="Voltar para a página inicial"><img src="/logo-embarpet-dark.png" alt="Embarpet" /></a><a className="ep-analysis-page__back" href="/"><ArrowLeft size={16} />Voltar ao início</a></header><section className="ep-analysis-page__content"><div className="ep-analysis-page__intro"><p className="ep-eyebrow">Sua análise começa aqui</p><h1>{routeIsComplete ? "Vamos conhecer quem vai viajar." : "Vamos começar pela sua rota."}</h1><p>{routeIsComplete ? "Você já informou a rota. Agora precisamos entender o perfil do pet para preparar os próximos passos." : "Informe de onde seu pet parte e quando pretende viajar. O destino que você escolheu já está preenchido."}</p><div className="ep-analysis-page__route"><span><MapPin size={15} aria-hidden="true" />{route.origin || "Origem"}</span><Plane size={15} aria-hidden="true" /><span>{route.destination || "Destino"}</span>{route.period ? <small><CalendarDays size={13} aria-hidden="true" />{route.period}</small> : null}</div><a href="/#destinos" className="ep-analysis-page__change">Alterar rota</a></div><div className="ep-analysis-page__flow"><DiagnosticFlow routeFirst startAtPet={routeIsComplete} initialRoute={route} analyticsSource="analysis_page" /></div></section></main>;
}
