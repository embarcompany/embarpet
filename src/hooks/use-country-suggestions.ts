import { useMemo } from "react";
import airports from "../data/airports.global.json";
import type { Locale } from "../i18n/locale";

type AirportCountry = { countryCode: string };
export type CountrySuggestion = { code: string; name: string };

export const countryCodes = Array.from(
  new Set(
    (airports as AirportCountry[])
      .map(({ countryCode }) => countryCode)
      .filter(Boolean),
  ),
);

export const countryAliases: Record<string, string[]> = {
  BR: ["brasil", "brazil", "bresil", "brasile", "bra", "br"],
  US: ["eua", "usa", "estados unidos", "united states", "eeuu", "america", "us", "u.s.a", "e.u.a"],
  PT: ["portugal", "pt"],
  GB: ["reino unido", "inglaterra", "uk", "united kingdom", "great britain", "gra-bretanha", "gra bretanha", "londres", "england", "scotland", "escocia"],
  ES: ["espanha", "spain", "espana", "es"],
  FR: ["franca", "france", "francia", "fr", "paris"],
  DE: ["alemanha", "germany", "deutschland", "alemania", "de"],
  IT: ["italia", "italy", "it"],
  CA: ["canada", "ca"],
  AR: ["argentina", "ar", "buenos aires"],
  UY: ["uruguai", "uruguay", "uy"],
  PY: ["paraguai", "paraguay", "py"],
  CL: ["chile", "cl", "santiago"],
  JP: ["japao", "japan", "japon", "jp", "tokyo", "toquio"],
  AU: ["australia", "au", "sydney"],
  IE: ["irlanda", "ireland", "ie", "dublin"],
  CH: ["suica", "switzerland", "suisse", "suiza", "ch"],
  NL: ["holanda", "paises baixos", "netherlands", "holland", "nl", "amsterdam"],
  BE: ["belgica", "belgium", "belgique", "be", "bruxelas"],
  AE: ["emirados arabes", "dubai", "uae", "emirates", "emirados", "ae"],
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();

export function resolveCountryCode(value: string, locale: Locale) {
  const query = normalize(value);
  if (!query) return undefined;

  // 1. Checagem direta por apelidos/sinônimos
  for (const [code, aliases] of Object.entries(countryAliases)) {
    if (aliases.some((alias) => normalize(alias) === query)) {
      return code;
    }
  }

  const lookupLocales = Array.from(
    new Set([locale, "pt-BR", "en", "es", "fr", "it", "de"]),
  );
  return countryCodes.find((code) =>
    lookupLocales.some(
      (lookupLocale) =>
        normalize(
          new Intl.DisplayNames([lookupLocale], { type: "region" }).of(code) ??
            code,
        ) === query,
    ),
  );
}

export function useCountrySuggestions(
  value: string,
  enabled: boolean,
  locale: Locale,
) {
  return useMemo(() => {
    const query = normalize(value);
    if (!enabled || query.length < 2) return [];
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return countryCodes
      .map((code) => ({ code, name: names.of(code) ?? code }))
      .map((country) => {
        const name = normalize(country.name);
        const code = normalize(country.code);
        const aliases = countryAliases[country.code] || [];
        
        let score = 0;
        if (name === query || code === query || aliases.some((a) => normalize(a) === query)) {
          score = 100;
        } else if (name.startsWith(query) || aliases.some((a) => normalize(a).startsWith(query))) {
          score = 80;
        } else if (name.includes(query) || aliases.some((a) => normalize(a).includes(query))) {
          score = 60;
        }
        return { country, score };
      })
      .filter(({ score }) => score > 0)
      .sort(
        (left, right) =>
          right.score - left.score ||
          left.country.name.localeCompare(right.country.name, locale),
      )
      .slice(0, 8)
      .map(({ country }) => country);
  }, [enabled, locale, value]);
}
