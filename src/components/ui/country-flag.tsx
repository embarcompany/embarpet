"use client";

import { useState } from "react";
import { countryFlagSvg } from "../../lib/country-flag";

interface CountryFlagProps {
  code?: string;
  name?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

/**
 * Componente unificado para exibição de bandeiras de países via ISO 3166-1 alpha-2.
 * Garante que se o SVG não existir ou falhar no carregamento, o layout não quebre
 * e nenhum caractere corrompido seja exibido.
 */
export function CountryFlag({
  code,
  name,
  className = "ep-wa-flag-icon",
  width,
  height,
  style,
}: CountryFlagProps) {
  const [hasError, setHasError] = useState(false);

  if (!code || hasError) {
    return null;
  }

  const src = countryFlagSvg(code);
  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={name ? `Bandeira de ${name}` : ""}
      className={className}
      width={width}
      height={height}
      style={{ flexShrink: 0, ...style }}
      loading="lazy"
      onError={() => setHasError(true)}
      aria-hidden={!name}
    />
  );
}
