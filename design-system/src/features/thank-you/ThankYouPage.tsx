import { useEffect, useMemo } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Play, ShieldCheck, Star } from "lucide-react";
import { trackConversionEvent } from "../../lib/analytics";

const EMBARPET_WHATSAPP = "551149694604";

type ThankYouContext = { destination: string; animal: string; period: string; modality: string };

function contextFromLocation(): ThankYouContext {
  if (typeof window === "undefined") return { destination: "seu destino", animal: "seu pet", period: "", modality: "" };
  const query = new URLSearchParams(window.location.search);
  return {
    destination: query.get("destino") || "seu destino",
    animal: query.get("animal") || "seu pet",
    period: query.get("prazo") || "",
    modality: query.get("modalidade") || "",
  };
}

function cleanDestination(value: string) {
  return value.split("·")[0].trim() || "seu destino";
}

function toWhatsappUrl(context: ThankYouContext) {
  const details = [
    `Destino: ${cleanDestination(context.destination)}.`,
    `Animal: ${context.animal}.`,
    context.modality ? `Modalidade de interesse: ${context.modality}.` : "",
    context.period ? `Previsão de viagem: ${context.period}.` : "",
  ].filter(Boolean).join(" ");
  const message = `Olá, Embarpet! Acabei de preencher o diagnóstico no site. ${details} Quero continuar o atendimento pelo WhatsApp.`;
  return `https://wa.me/${EMBARPET_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export default function ThankYouPage() {
  const context = useMemo(contextFromLocation, []);
  const destination = cleanDestination(context.destination);
  const whatsappUrl = useMemo(() => toWhatsappUrl(context), [context]);

  useEffect(() => {
    document.title = "Continue seu atendimento | Embarpet";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    trackConversionEvent("thank_you_view", { destination, animal: context.animal, has_period: Boolean(context.period) });
    return () => robots.remove();
  }, [context.animal, context.period, destination]);

  const continueToWhatsApp = () => {
    trackConversionEvent("whatsapp_click_after_form", { destination, animal: context.animal, has_period: Boolean(context.period) });
    trackConversionEvent("lead_continued_whatsapp", { destination, animal: context.animal, has_period: Boolean(context.period) });
  };

  return (
    <main className="ep-thank-you-page">
      <header className="ep-thank-you-page__header">
        <a href="/" aria-label="Voltar para a página inicial"><img src="/logo-embarpet-dark.png" alt="Embarpet" /></a>
      </header>

      <section className="ep-thank-you-hero">
        <div className="ep-thank-you-hero__copy">
          <span className="ep-thank-you-hero__eyebrow"><CheckCircle2 size={16} aria-hidden="true" />Diagnóstico concluído</span>
          <h1>Recebemos as informações sobre a viagem do seu pet para <em>{destination}.</em></h1>
          <p>Nossa equipe vai avaliar destino, prazo, documentação e modalidade para indicar os próximos passos com segurança.</p>
          <div className="ep-thank-you-hero__step">
            <span>Agora falta só um passo</span>
            <b>Clique abaixo para continuar o atendimento pelo WhatsApp e enviar a mensagem automática para nossa equipe.</b>
          </div>
          <a className="ep-thank-you-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={continueToWhatsApp}>
            <MessageCircle size={22} aria-hidden="true" />
            <span>Continuar pelo WhatsApp<small>Isso ajuda nossa equipe a identificar seu atendimento e responder com mais rapidez.</small></span>
            <ArrowRight size={19} aria-hidden="true" />
          </a>
          <p className="ep-thank-you-hero__security"><ShieldCheck size={15} aria-hidden="true" />Você será direcionado ao WhatsApp oficial da Embarpet.</p>
          <p className="ep-thank-you-hero__fallback">Se preferir, nossa equipe também poderá entrar em contato com base nos dados enviados.</p>
        </div>

        <aside className="ep-thank-you-hero__video" aria-label="Como funciona o transporte internacional de pets">
          <video poster="/embarpet-pet-luxo-real.jpeg" autoPlay muted loop playsInline preload="metadata">
            <source src="/embarpet-petluxo-preview-5s.webm" type="video/webm" />
            <source src="/embarpet-petluxo-preview-5s.mp4" type="video/mp4" />
          </video>
          <span><Play size={15} fill="currentColor" aria-hidden="true" />Enquanto analisamos: como funciona o transporte internacional de pets</span>
        </aside>
      </section>

      <section className="ep-thank-you-proof" aria-label="Prova social da Embarpet">
        <div><img src="/embarpet-avatar-dog.png" alt="" /><img src="/embarpet-avatar-cat.png" alt="" /><img src="/embarpet-avatar-hamster.png" alt="" /><strong>+2.000<small>pets transportados</small></strong></div>
        <div><img src="/logo-ipata.png" alt="IPATA" /><img src="/logo-iata.png" alt="IATA" /><strong>Credenciados<small>Membro IATA e IPATA</small></strong></div>
        <div><img src="https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico" alt="Google" /><strong>4,9 <span aria-label="5 estrelas"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></span><small>avaliação no Google</small></strong></div>
      </section>
    </main>
  );
}
