import EmbarpetHome from "../features/home/HomePage";
import AnalysisPage from "../features/analysis/AnalysisPage";
import ThankYouPage from "../features/thank-you/ThankYouPage";
import ButtonsPage from "../features/buttons/ButtonsPage";
import { getLocaleFromPath, locales, LocaleProvider, type Locale } from "../i18n/locale";

/** Application shell. Future routes should be composed here, never inside the design system. */
export function App({ initialLocale = "pt-BR" }: { initialLocale?: Locale }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const locale = typeof window !== "undefined" ? getLocaleFromPath(pathname) : initialLocale;
  const localePrefix = locales.filter((item) => item !== "pt-BR").join("|");
  const route = pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), "") || "/";
  const page = route === "/viajar" ? <AnalysisPage /> : route === "/obrigado" ? <ThankYouPage /> : route === "/design-system/botoes" ? <ButtonsPage /> : <EmbarpetHome />;
  return <LocaleProvider locale={locale}>{page}</LocaleProvider>;
}
