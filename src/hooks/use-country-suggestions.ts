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
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();

export function resolveCountryCode(value: string, locale: Locale) {
  const query = normalize(value);
  if (!query) return undefined;
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
        const score =
          name === query || code === query
            ? 100
            : name.startsWith(query)
              ? 80
              : name.includes(query)
                ? 60
                : 0;
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
