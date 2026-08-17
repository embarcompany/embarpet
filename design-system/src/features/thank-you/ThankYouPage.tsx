import { useEffect, useMemo } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Play, ShieldCheck, Star } from "lucide-react";
import { trackConversionEvent } from "../../lib/analytics";
import { useLocale } from "../../i18n/locale";

const EMBARPET_WHATSAPP = "551149694604";
type ThankYouContext = { destination: string; animal: string; period: string; modality: string };

function contextFromLocation(): ThankYouContext {
  if (typeof window === "undefined") return { destination: "your destination", animal: "your pet", period: "", modality: "" };
  const query = new URLSearchParams(window.location.search);
  return { destination: query.get("destino") || "your destination", animal: query.get("animal") || "your pet", period: query.get("prazo") || "", modality: query.get("modalidade") || "" };
}
function cleanDestination(value: string) { return value.split("·")[0].trim() || "your destination"; }
function toWhatsappUrl(context: ThankYouContext) {
  const details = [`Destination: ${cleanDestination(context.destination)}.`, `Animal: ${context.animal}.`, context.modality ? `Travel option: ${context.modality}.` : "", context.period ? `Travel date: ${context.period}.` : ""].filter(Boolean).join(" ");
  return `https://wa.me/${EMBARPET_WHATSAPP}?text=${encodeURIComponent(`Hello, Embarpet! I just completed the website assessment. ${details} I would like to continue on WhatsApp.`)}`;
}

export default function ThankYouPage() {
  const { text, path } = useLocale();
  const context = useMemo(contextFromLocation, []);
  const destination = cleanDestination(context.destination);
  const whatsappUrl = useMemo(() => toWhatsappUrl(context), [context]);
  useEffect(() => {
    document.title = `${text.whatsapp} | Embarpet`;
    const robots = document.createElement("meta"); robots.name = "robots"; robots.content = "noindex, nofollow"; document.head.appendChild(robots);
    trackConversionEvent("thank_you_view", { destination, animal: context.animal, has_period: Boolean(context.period) });
    return () => robots.remove();
  }, [context.animal, context.period, destination, text.whatsapp]);
  const continueToWhatsApp = () => {
    trackConversionEvent("whatsapp_click_after_form", { destination, animal: context.animal, has_period: Boolean(context.period) });
    trackConversionEvent("lead_continued_whatsapp", { destination, animal: context.animal, has_period: Boolean(context.period) });
  };
  return <main className="ep-thank-you-page">
    <header className="ep-thank-you-page__header"><a href={path("/")} aria-label={text.backHome}><img src="/logo-embarpet-dark.png" alt="Embarpet" /></a></header>
    <section className="ep-thank-you-hero"><div className="ep-thank-you-hero__copy">
      <span className="ep-thank-you-hero__eyebrow"><CheckCircle2 size={16} aria-hidden="true" />{text.thankYouKicker}</span>
      <h1>{text.thankYouTitle} <em>{destination}.</em></h1><p>{text.thankYouCopy}</p>
      <div className="ep-thank-you-hero__step"><span>{text.thankYouStep}</span><b>{text.thankYouAction}</b></div>
      <a className="ep-thank-you-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={continueToWhatsApp}><MessageCircle size={22} aria-hidden="true" /><span>{text.whatsapp}<small>{text.whatsappHint}</small></span><ArrowRight size={19} aria-hidden="true" /></a>
      <p className="ep-thank-you-hero__security"><ShieldCheck size={15} aria-hidden="true" />{text.whatsappOfficial}</p>
      <p className="ep-thank-you-hero__fallback">If you prefer, our team can also contact you using the information submitted.</p>
    </div><aside className="ep-thank-you-hero__video" aria-label="How international pet transport works"><video poster="/embarpet-pet-luxo-real.jpeg" autoPlay muted loop playsInline preload="metadata"><source src="/embarpet-petluxo-preview-5s.webm" type="video/webm" /><source src="/embarpet-petluxo-preview-5s.mp4" type="video/mp4" /></video><span><Play size={15} fill="currentColor" aria-hidden="true" />While we review: how international pet transport works</span></aside></section>
    <section className="ep-thank-you-proof" aria-label="Embarpet social proof"><div><img src="/embarpet-avatar-dog.png" alt="" /><img src="/embarpet-avatar-cat.png" alt="" /><img src="/embarpet-avatar-hamster.png" alt="" /><strong>+2.000<small>pets transported</small></strong></div><div><img src="/logo-ipata.png" alt="IPATA" /><img src="/logo-iata.png" alt="IATA" /><strong>Certified<small>IATA and IPATA member</small></strong></div><div><img src="https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico" alt="Google" /><strong>4.9 <span aria-label="5 stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></span><small>Google rating</small></strong></div></section>
  </main>;
}
