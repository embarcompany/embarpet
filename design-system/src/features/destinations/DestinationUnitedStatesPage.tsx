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

export default function DestinationUnitedStatesPage() {
  const [period, setPeriod] = useState("");
  const [routeInverted, setRouteInverted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisSource, setAnalysisSource] = useState("destination_us_hero");
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

  const analysisRoute: AnalysisRouteContext = routeInverted
    ? { origin: "Estados Unidos", destination: "Brasil", originCode: "US", destinationCode: "BR", period }
    : { origin: "Brasil", destination: "Estados Unidos", originCode: "BR", destinationCode: "US", period };
  const startPlanning = (source = "destination_us_hero") => {
    setAnalysisSource(source);
    setAnalysisOpen(true);
  };

  const pageNavigation = [
    { label: "Por que a Embarpet", href: "#autoridade" },
    { label: "Como ajudamos", href: "#plano" },
    { label: "Dúvidas", href: "#faq" },
  ];

  return <>
    <SiteHeader logoSrc="/logo-embarpet-dark.png" items={pageNavigation} cta={{ label: "Começar o planejamento", href: "#planejar" }} showMobileJourney={false} mobileCtaLabel="Começar análise" onCtaClick={() => startPlanning("destination_us_header")} />
    <main className="ep-destination-lp">
      <HeroPlannerSection period={period} routeInverted={routeInverted} heroVisible={heroVisible} heroRef={heroRef} onPeriodChange={setPeriod} onToggleRoute={() => setRouteInverted((current) => !current)} onEditDestination={() => startPlanning("destination_us_route_edit")} onStartPlanning={() => startPlanning("destination_us_hero")} />
      <AuthoritySection onStartPlanning={() => startPlanning("destination_us_authority")} />
      <RiskSection />
      <AiWarningSection />
      <MethodSection onStartPlanning={() => startPlanning("destination_us_method")} />
      <WhatsappSupportSection onStartPlanning={() => startPlanning("destination_us_whatsapp")} />
      <ComparisonSection onStartPlanning={() => startPlanning("destination_us_comparison")} />
      <EmbarkationMosaicSection onStartPlanning={() => startPlanning("destination_us_embarkations")} />
      <DestinationContextSection onStartPlanning={() => startPlanning("destination_us_context")} />
      <FaqSection onStartPlanning={() => startPlanning("destination_us_faq")} />
      <FinalCtaSection onStartPlanning={() => startPlanning("destination_us_final_cta")} />
    </main>
    {!heroVisible ? <div className="ep-us-mobile-cta"><AnalysisButton size="lg" fullWidth onClick={() => startPlanning("destination_us_mobile_sticky")}>Começar análise</AnalysisButton></div> : null}
    <AnalysisModal open={analysisOpen} onClose={() => setAnalysisOpen(false)} initialRoute={analysisRoute} analyticsSource={analysisSource} />
    <SiteFooter minimal logoSrc="/logo-embarpet-dark.png" note="Planejamento individual para a viagem do seu pet aos Estados Unidos." brandCta={{ label: "Começar o planejamento", href: "#planejar" }} quickLinks={[]} onAnalysisClick={() => startPlanning("destination_us_footer")} groups={[
      { title: "Sua viagem", links: [{ label: "Começar o planejamento", href: "#planejar" }, { label: "Como ajudamos", href: "#plano" }] },
      { title: "Embarpet", links: [{ label: "Por que a Embarpet", href: "#autoridade" }, { label: "Falar sobre meu pet", href: "#planejar" }] },
      { title: "Dúvidas", links: [{ label: "Perguntas frequentes", href: "#faq" }, { label: "Voltar ao início", href: "#planejar" }] },
    ]} showLanguageLink={false} />
  </>;
}
