const CIRCLE_FLAGS_CDN = "https://circle-flags.cdn.skk.moe/flags";

/** Retorna a bandeira circular em SVG a partir do código ISO 3166-1 alpha-2. */
export function countryFlagSvg(code: string) {
  const normalizedCode = code.trim().toLowerCase();

  if (!/^[a-z]{2}$/.test(normalizedCode)) return "";

  return `${CIRCLE_FLAGS_CDN}/${normalizedCode}.svg`;
}
