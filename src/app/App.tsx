import EmbarpetHome from "../features/home/HomePage";
import AnalysisPage from "../features/analysis/AnalysisPage";
import ThankYouPage from "../features/thank-you/ThankYouPage";
import ButtonsPage from "../features/buttons/ButtonsPage";
import AboutPage from "../features/about/AboutPage";
import { DestinationPage } from "../features/destinations/DestinationUnitedStatesPage";
import { getDestinationLanding } from "../features/destinations/destination-content";
import { getLocaleFromPath, locales, LocaleProvider, type Locale } from "../i18n/locale";

/** Application shell. Future routes should be composed here, never inside the design system. */
export function App({ initialLocale = "pt-BR", initialPath = "/" }: { initialLocale?: Locale; initialPath?: string }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : initialPath;
  const locale = typeof window !== "undefined" ? getLocaleFromPath(pathname) : initialLocale;
  const localePrefix = locales.filter((item) => item !== "pt-BR").join("|");
  const route = pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), "") || "/";
  const destinationSlug = route.startsWith("/destinos/") ? route.slice("/destinos/".length).replace(/\/+$/, "") : null;
  const destination = destinationSlug ? getDestinationLanding(destinationSlug) : undefined;
  const page = destination ? <DestinationPage destination={destination} />
    : (route === "/sobre" || route === "/quem-somos") ? <AboutPage />
    : route === "/viajar" ? <AnalysisPage />
    : route === "/obrigado" ? <ThankYouPage />
    : route === "/design-system/botoes" ? <ButtonsPage />
    : <EmbarpetHome />;
  return <LocaleProvider locale={locale}>{page}</LocaleProvider>;
}

