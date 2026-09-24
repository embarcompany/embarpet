import EmbarpetHome from "../features/home/HomePage";
import AnalysisPage from "../features/analysis/AnalysisPage";
import ThankYouPage from "../features/thank-you/ThankYouPage";
import ButtonsPage from "../features/buttons/ButtonsPage";
import AboutPage from "../features/about/AboutPage";
import { DestinationPage } from "../features/destinations/DestinationUnitedStatesPage";
import { getDestinationLanding } from "../features/destinations/destination-content";
import { ModalityPage } from "../features/modalities/ModalityPage";
import { modalityContent, type ModalitySlug } from "../features/modalities/modality-content";
import PetLuxoPage from "../features/pet-luxo/PetLuxoPage";
import { getLocaleFromPath, locales, LocaleProvider, type Locale } from "../i18n/locale";
import { WhatsAppFloat } from "../components/ui/whatsapp-float";
import { SmoothScroll } from "../components/ui/smooth-scroll";

/** Application shell. Future routes should be composed here, never inside the design system. */
export function App({ initialLocale = "pt-BR", initialPath = "/", initialSearch = "" }: { initialLocale?: Locale; initialPath?: string; initialSearch?: string }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : initialPath;
  const search = typeof window !== "undefined" ? window.location.search : initialSearch;
  const locale = typeof window !== "undefined" ? getLocaleFromPath(pathname) : initialLocale;
  const localePrefix = locales.filter((item) => item !== "pt-BR").join("|");
  const route = pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), "") || "/";
  // Modo LP (header enxuto, sem saída, para tráfego pago) é decidido por query param, nunca por
  // path: um path próprio (`-lp`) cria uma URL indexável a mais e duplica conteúdo para o Google.
  const isLp = new URLSearchParams(search).get("lp") === "1";
  const destinationSlug = route.startsWith("/destinos/") ? route.slice("/destinos/".length).replace(/\/+$/, "") : null;
  const destination = destinationSlug ? getDestinationLanding(destinationSlug) : undefined;
  const modalitySlug = (route.startsWith("/modalidades/") ? route.slice("/modalidades/".length).replace(/\/+$/, "") : null) as ModalitySlug | null;
  const modality = modalitySlug && modalityContent[modalitySlug] ? modalityContent[modalitySlug] : undefined;
  const page = destination ? <DestinationPage destination={destination} isLp={isLp} />
    : modality ? <ModalityPage modality={modality} isLp={isLp} />
    : route === "/pet-luxo" ? <PetLuxoPage isLp={isLp} />
    : (route === "/sobre" || route === "/quem-somos") ? <AboutPage isLp={isLp} />
    : route === "/viajar" ? <AnalysisPage />
    : route === "/obrigado" ? <ThankYouPage />
    : route === "/design-system/botoes" ? <ButtonsPage />
    : <EmbarpetHome isLp={isLp} />;
  return (
    <LocaleProvider locale={locale}>
      <SmoothScroll />
      {page}
      <WhatsAppFloat />
    </LocaleProvider>
  );
}

