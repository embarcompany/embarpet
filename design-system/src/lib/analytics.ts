type ConversionEvent = "analysis_started" | "route_completed" | "pets_completed" | "analysis_completed" | "modality_clicked" | "whatsapp_clicked";
type ConversionPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __embarpConsentGranted?: boolean;
  }
}

/**
 * Camada neutra de mensuração: sempre emite um CustomEvent para testes e só
 * encaminha ao dataLayer quando a política de consentimento liberar o uso.
 * Nunca passe nome, telefone ou outro dado pessoal neste payload.
 */
export function trackConversionEvent(event: ConversionEvent, payload: ConversionPayload = {}) {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload };
  window.dispatchEvent(new CustomEvent("embarp:conversion", { detail }));

  if (window.__embarpConsentGranted) {
    window.dataLayer ??= [];
    window.dataLayer.push(detail);
  }
}
