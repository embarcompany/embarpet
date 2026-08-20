/** Retorna a bandeira vetorial de um país a partir do código ISO 3166-1 alpha-2. */
export function countryFlagSvg(code: string) {
  const normalizedCode = code.trim().toLowerCase();

  if (!/^[a-z]{2}$/.test(normalizedCode)) return "";

  return `https://flagcdn.com/${normalizedCode}.svg`;
}
