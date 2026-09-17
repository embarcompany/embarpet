/**
 * Utilitário centralizado para abertura e geração de links do WhatsApp.
 * Embarpet — Atendimento Internacional
 */

export const DEFAULT_EMBARPET_WHATSAPP = "5511978253579";

/**
 * Sanitiza o número de telefone garantindo formato internacional apenas com dígitos.
 */
export function sanitizePhoneNumber(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (!digits) return DEFAULT_EMBARPET_WHATSAPP;
  // Se for número brasileiro sem DDI (10 ou 11 dígitos), adiciona 55
  if (digits.length === 10 || digits.length === 11) {
    digits = `55${digits}`;
  }
  return digits;
}

/**
 * Detecta se o ambiente atual é um dispositivo móvel (Android, iOS, etc.).
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || ""
  );
}

/**
 * Gera a URL para o WhatsApp Web (preferencial para Desktop).
 */
export function getWhatsAppWebUrl(phone: string, message: string): string {
  const cleanPhone = sanitizePhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}

/**
 * Gera o protocolo nativo de deeplink para o app do WhatsApp (preferencial para Mobile).
 */
export function getWhatsAppProtocolUrl(phone: string, message: string): string {
  const cleanPhone = sanitizePhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  return `whatsapp://send?phone=${cleanPhone}&text=${encodedText}`;
}

/**
 * Gera a URL da API do WhatsApp (Fallback para mobile sem app ou navegadores compatíveis).
 */
export function getWhatsAppApiUrl(phone: string, message: string): string {
  const cleanPhone = sanitizePhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}

/**
 * Retorna a URL mais adequada com base no dispositivo para uso em links estáticos.
 */
export function getSmartWhatsAppUrl(phone: string, message: string): string {
  if (isMobileDevice()) {
    return getWhatsAppApiUrl(phone, message);
  }
  return getWhatsAppWebUrl(phone, message);
}

/**
 * Executa a abertura inteligente do WhatsApp:
 * - Desktop: Abre o WhatsApp Web em nova aba.
 * - Mobile: Tenta abrir o protocolo nativo `whatsapp://`. Se o app não estiver instalado
 *   ou não responder, faz fallback para `api.whatsapp.com`.
 */
export function openWhatsApp(phone: string, message: string): void {
  if (typeof window === "undefined") return;

  const isMobile = isMobileDevice();

  if (!isMobile) {
    const webUrl = getWhatsAppWebUrl(phone, message);
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  const appUrl = getWhatsAppProtocolUrl(phone, message);
  const fallbackUrl = getWhatsAppApiUrl(phone, message);

  const startTime = Date.now();
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  const handleVisibilityChange = () => {
    // Se o usuário mudou de app (abriu o WhatsApp), cancela o fallback
    if (document.hidden && fallbackTimer) {
      clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Tenta abrir o deeplink do app
  window.location.href = appUrl;

  // Se após 1500ms o usuário ainda estiver na página visível, abre fallback
  fallbackTimer = setTimeout(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    const elapsed = Date.now() - startTime;
    if (!document.hidden && elapsed < 2500) {
      window.location.href = fallbackUrl;
    }
  }, 1500);
}
