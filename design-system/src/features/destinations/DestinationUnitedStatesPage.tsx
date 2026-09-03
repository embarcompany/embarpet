import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "../../components/ui/footer";
import { SiteHeader } from "../../components/ui/navigation";
import { setPageMetadata } from "../../lib/seo";
import { AnalysisButton } from "../../components/ui/buttons";
import { AnalysisModal, type AnalysisRouteContext } from "../../components/ui/analysis-modal";
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
import { ServicesSection } from "./sections/ServicesSection";
import { unitedStatesDestination, type DestinationLandingContent } from "./destination-content";

export function DestinationPage({ destination }: { destination: DestinationLandingContent }) {
  const [period, setPeriod] = useState("");
  const [routeInverted, setRouteInverted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisSource, setAnalysisSource] = useState(`destination_${destination.analyticsKey}_hero`);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => setPageMetadata({
    title: destination.meta.title,
    description: destination.meta.description,
    canonicalPath: `/destinos/${destination.slug}`,
  }), [destination]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const analysisRoute: AnalysisRouteContext = routeInverted
    ? { origin: destination.country, destination: "Brasil", originCode: destination.countryCode, destinationCode: "BR", period }
    : { origin: "Brasil", destination: destination.country, originCode: "BR", destinationCode: destination.countryCode, period };
  const source = (placement: string) => `destination_${destination.analyticsKey}_${placement}`;
  const startPlanning = (placement = "hero") => {
    setAnalysisSource(source(placement));
    setAnalysisOpen(true);
  };

  const pageNavigation = [
    { label: "Por que a Embarpet", href: "#autoridade" },
    { label: "Como ajudamos", href: "#plano" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return <>
    <SiteHeader logoSrc="/logo-embarpet-dark.png" items={pageNavigation} cta={{ label: "Começar o planejamento", href: "#planejar" }} showMobileJourney={false} mobileCtaLabel="Começar análise" onCtaClick={() => startPlanning("header")} />
    <main className="ep-destination-lp">
      <HeroPlannerSection destination={destination} period={period} routeInverted={routeInverted} heroVisible={heroVisible} heroRef={heroRef} onPeriodChange={setPeriod} onToggleRoute={() => setRouteInverted((current) => !current)} onEditDestination={() => startPlanning("route_edit")} onStartPlanning={() => startPlanning()} />
      <ServicesSection destination={destination} onStartPlanning={() => startPlanning("services")} />
      <AuthoritySection onStartPlanning={() => startPlanning("authority")} />
      <RiskSection />
      <AiWarningSection />
      <MethodSection destination={destination} onStartPlanning={() => startPlanning("method")} />
      <WhatsappSupportSection onStartPlanning={() => startPlanning("whatsapp")} />
      <ComparisonSection onStartPlanning={() => startPlanning("comparison")} />
      <EmbarkationMosaicSection onStartPlanning={() => startPlanning("embarkations")} />
      <DestinationContextSection destination={destination} onStartPlanning={() => startPlanning("context")} />
      <FaqSection destination={destination} onStartPlanning={() => startPlanning("faq")} />
      <FinalCtaSection onStartPlanning={() => startPlanning("final_cta")} />
    </main>
    {!heroVisible ? <div className="ep-us-mobile-cta"><AnalysisButton size="lg" fullWidth onClick={() => startPlanning("mobile_sticky")}>Começar análise</AnalysisButton></div> : null}
    <AnalysisModal open={analysisOpen} onClose={() => setAnalysisOpen(false)} initialRoute={analysisRoute} analyticsSource={analysisSource} />
    <SiteFooter minimal logoSrc="/logo-embarpet-dark.png" note={destination.footerNote} brandCta={{ label: "Começar o planejamento", href: "#planejar" }} quickLinks={[]} onAnalysisClick={() => startPlanning("footer")} groups={[
      { title: "Sua viagem", links: [{ label: "Começar o planejamento", href: "#planejar" }, { label: "Como ajudamos", href: "#plano" }] },
      { title: "Embarpet", links: [{ label: "Por que a Embarpet", href: "#autoridade" }, { label: "Falar sobre meu pet", href: "#planejar" }] },
      { title: "Dúvidas", links: [{ label: "Perguntas frequentes", href: "#faq" }, { label: "Voltar ao início", href: "#planejar" }] },
    ]} showLanguageLink={false} />
  </>;
}

export default function DestinationUnitedStatesPage() {
  return <DestinationPage destination={unitedStatesDestination} />;
}
