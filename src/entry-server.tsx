import { renderToString } from "react-dom/server";
import { App } from "./app/App";
import type { Locale } from "./i18n/locale";

/** HTML pré-renderizado por rota para manter conteúdo e SEO acessíveis sem JavaScript. */
export function render(locale: Locale = "pt-BR", path = "/") {
  return renderToString(<App initialLocale={locale} initialPath={path} />);
}
