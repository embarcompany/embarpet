import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "../../components/ui/footer";
import { SiteHeader } from "../../components/ui/navigation";
import { useLocale } from "../../i18n/locale";
import { setPageMetadata } from "../../lib/seo";
import { AnalysisButton } from "../../components/ui/buttons";
import { AiWarningSection } from "./sections/AiWarningSection";
import { AuthoritySection } from "./sections/AuthoritySection";
import { ComparisonSection } from "./sections/ComparisonSection";
import { DestinationContextSection } from "./sections/DestinationContextSection";
import { EmbarkationMosaicSection } from "./sections/EmbarkationMosaicSection";
import { FaqSection } from "./sections/FaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { HeroPlannerSection } from "./sections/HeroPlannerSection";
import { MethodSection } from "./sections/MethodSection";
import { RiskSection } from "./sections/RiskSection";
import { WhatsappSupportSection } from "./sections/WhatsappSupportSection";

export default function DestinationUnitedStatesPage() {
  const { path } = useLocale();
  const [period, setPeriod] = useState("");
  const [routeInverted, setRouteInverted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => setPageMetadata({
    title: "Levar Pet para os Estados Unidos | Embarpet",
    description: "Comece a planejar a viagem do seu pet para os Estados Unidos com uma análise da rota, do perfil do animal e dos próximos passos.",
    canonicalPath: "/destinos/estados-unidos",
  }), []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const startPlanning = () => {
    const query = new URLSearchParams(routeInverted
      ? { origin: "Estados Unidos", destination: "Brasil" }
      : { origin: "Brasil", destination: "Estados Unidos" });
    if (period) query.set("period", period);
    window.location.assign(`${path("/viajar")}?${query.toString()}`);
  };

  const pageNavigation = [
    { label: "Por que a Embarpet", href: "#autoridade" },
    { label: "Como ajudamos", href: "#plano" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return <>
    <SiteHeader logoSrc="/logo-embarpet-dark.png" items={pageNavigation} cta={{ label: "Começar o planejamento", href: "#planejar" }} showMobileJourney={false} mobileCtaLabel="Começar análise" />
    <main className="ep-destination-lp">
      <HeroPlannerSection period={period} routeInverted={routeInverted} heroVisible={heroVisible} heroRef={heroRef} onPeriodChange={setPeriod} onToggleRoute={() => setRouteInverted((current) => !current)} onEditDestination={() => window.location.assign(path("/viajar"))} onStartPlanning={startPlanning} />
      <AuthoritySection onStartPlanning={startPlanning} />
      <RiskSection />
      <AiWarningSection />
      <MethodSection onStartPlanning={startPlanning} />
      <WhatsappSupportSection onStartPlanning={startPlanning} />
      <ComparisonSection onStartPlanning={startPlanning} />
      <EmbarkationMosaicSection onStartPlanning={startPlanning} />
      <DestinationContextSection onStartPlanning={startPlanning} />
      <FaqSection onStartPlanning={startPlanning} />
      <FinalCtaSection onStartPlanning={startPlanning} />
    </main>
    {!heroVisible ? <div className="ep-us-mobile-cta"><AnalysisButton size="lg" fullWidth onClick={startPlanning}>Começar análise</AnalysisButton></div> : null}
    <SiteFooter minimal logoSrc="/logo-embarpet-dark.png" note="Planejamento individual para a viagem do seu pet aos Estados Unidos." brandCta={{ label: "Começar o planejamento", href: "#planejar" }} quickLinks={[]} groups={[
      { title: "Sua viagem", links: [{ label: "Começar o planejamento", href: "#planejar" }, { label: "Como ajudamos", href: "#plano" }] },
      { title: "Embarpet", links: [{ label: "Por que a Embarpet", href: "#autoridade" }, { label: "Falar sobre meu pet", href: "#planejar" }] },
      { title: "Dúvidas", links: [{ label: "Perguntas frequentes", href: "#faq" }, { label: "Voltar ao início", href: "#planejar" }] },
    ]} showLanguageLink={false} />
  </>;
}
