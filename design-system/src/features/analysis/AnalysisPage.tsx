import { ArrowLeft, CalendarDays, MapPin, Plane } from "lucide-react";
import { DiagnosticFlow } from "../../components/ui/diagnostic-flow";
import { useLocale } from "../../i18n/locale";

function routeFromLocation() {
  if (typeof window === "undefined") return { origin: "", destination: "", period: "" };
  const query = new URLSearchParams(window.location.search);
  return { origin: query.get("origin") ?? "", destination: query.get("destination") ?? "", period: query.get("period") ?? "" };
}

export default function AnalysisPage() {
  const { locale, text, path } = useLocale();
  const route = routeFromLocation();
  const routeIsComplete = Boolean(route.origin && route.destination && route.period);
  const title = routeIsComplete ? (locale === "en" ? "Let’s meet the pet who will travel." : locale === "es" ? "Conozcamos a quien va a viajar." : locale === "ja" ? "渡航するペットについて教えてください。" : "Vamos conhecer quem vai viajar.") : text.formRouteTitle;
  const description = routeIsComplete ? (locale === "en" ? "You already shared the route. Now we need to understand your pet’s profile to prepare the next steps." : locale === "es" ? "Ya informaste la ruta. Ahora necesitamos conocer el perfil de tu mascota para preparar los próximos pasos." : locale === "ja" ? "ルートは受け取りました。次のステップのために、ペットの情報を教えてください。" : "Você já informou a rota. Agora precisamos entender o perfil do pet para preparar os próximos passos.") : text.formRouteCopy;
  return <main className="ep-analysis-page"><header className="ep-analysis-page__header"><a href={path("/")} aria-label={text.backHome}><img src="/logo-embarpet-dark.png" alt="Embarpet" /></a><a className="ep-analysis-page__back" href={path("/")}><ArrowLeft size={16} />{text.backHome}</a></header><section className="ep-analysis-page__content"><div className="ep-analysis-page__intro"><p className="ep-eyebrow">{text.formRoute}</p><h1>{title}</h1><p>{description}</p><div className="ep-analysis-page__route"><span><MapPin size={15} aria-hidden="true" />{route.origin || text.origin}</span><Plane size={15} aria-hidden="true" /><span>{route.destination || text.destination}</span>{route.period ? <small><CalendarDays size={13} aria-hidden="true" />{route.period}</small> : null}</div><a href={`${path("/")}#destinos`} className="ep-analysis-page__change">{text.changeRoute}</a></div><div className="ep-analysis-page__flow"><DiagnosticFlow routeFirst startAtPet={routeIsComplete} initialRoute={route} analyticsSource="analysis_page" /></div></section></main>;
}
