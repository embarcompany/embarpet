import { renderToString } from "react-dom/server";
import { App } from "./app/App";
import type { Locale } from "./i18n/locale";

/** HTML base da home para crawlers; as interações continuam hidratadas no cliente. */
export function render(locale: Locale = "pt-BR") {
  return renderToString(<App initialLocale={locale} />);
}
