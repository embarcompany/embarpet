import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { countryFlagSvg } from "../lib/country-flag";
import { setPageMetadata } from "../lib/seo";

export const locales = ["pt-BR", "pt-PT", "en", "es", "ja", "fr", "it", "de", "nl", "zh", "ko", "ar", "ru"] as const;
export type Locale = typeof locales[number];

export const languageOptions: Array<{ code: Locale; label: string; shortLabel: string; flagSrc: string }> = [
  { code: "pt-BR", label: "Português (Brasil)", shortLabel: "PT", flagSrc: countryFlagSvg("BR") },
  { code: "pt-PT", label: "Português (Portugal)", shortLabel: "PT", flagSrc: countryFlagSvg("PT") },
  { code: "en", label: "English", shortLabel: "EN", flagSrc: countryFlagSvg("US") },
  { code: "es", label: "Español", shortLabel: "ES", flagSrc: countryFlagSvg("ES") },
  { code: "ja", label: "日本語", shortLabel: "日本語", flagSrc: countryFlagSvg("JP") },
  { code: "fr", label: "Français", shortLabel: "FR", flagSrc: countryFlagSvg("FR") },
  { code: "it", label: "Italiano", shortLabel: "IT", flagSrc: countryFlagSvg("IT") },
  { code: "de", label: "Deutsch", shortLabel: "DE", flagSrc: countryFlagSvg("DE") },
  { code: "nl", label: "Nederlands", shortLabel: "NL", flagSrc: countryFlagSvg("NL") },
  { code: "zh", label: "中文", shortLabel: "中文", flagSrc: countryFlagSvg("CN") },
  { code: "ko", label: "한국어", shortLabel: "한국어", flagSrc: countryFlagSvg("KR") },
  { code: "ar", label: "العربية", shortLabel: "AR", flagSrc: countryFlagSvg("SA") },
  { code: "ru", label: "Русский", shortLabel: "RU", flagSrc: countryFlagSvg("RU") },
];

const translatedCopy = {
  "pt-BR": {
    htmlLang: "pt-BR", title: "Transporte Internacional de Pets | Embarpet", description: "Planeje o transporte internacional do seu pet com análise de rota, documentação e possibilidades de embarque.",
    notice: "Atendemos somente destinos internacionais. Voos nacionais são auxiliados apenas quando conectam a uma viagem internacional.", close: "Fechar aviso", analyze: "Analisar a viagem", startTrip: "Começar viagem", wherePetGoes: "Para onde seu pet vai?", language: "Idioma",
    navHow: "Como funciona", navModalities: "Modalidades", navServices: "Serviços", navDestinations: "Destinos", navContent: "Conteúdo", navQuestions: "Dúvidas",
    heroTitleBefore: "Vai viajar com seu ", heroTitleHighlight: "pet pra outro país?", heroIntro: "Conte com a experiência de mais de 2.000 embarques realizados. Responda em poucos passos e receba uma ", heroIntroStrong: "previsão personalizada", heroIntroAfter: " para a viagem de você e seu pet.",
    period: "Quando deseja viajar?", periodOptions: ["Dentro de 1 a 3 meses", "De 3 a 6 meses", "Sem data definida"], origin: "De qual país seu pet parte?", destination: "Para qual país seu pet vai?", cityPlaceholder: "Digite um país", originRequired: "Informe o país de origem", destinationRequired: "Informe o país de destino", startAnalysis: "Começar minha análise",
    formRoute: "Sua análise começa aqui", formRouteTitle: "Vamos começar pela sua rota.", formRouteCopy: "Informe de onde seu pet parte e quando pretende viajar. O destino que você escolheu já está preenchido.", backHome: "Voltar ao início", changeRoute: "Alterar rota",
    thankYouKicker: "Diagnóstico concluído", thankYouTitle: "Recebemos as informações sobre a viagem do seu pet para", thankYouCopy: "Nossa equipe vai avaliar destino, prazo, documentação e modalidade para indicar os próximos passos com segurança.", thankYouStep: "Agora falta só um passo", thankYouAction: "Clique abaixo para continuar o atendimento pelo WhatsApp e enviar a mensagem automática para nossa equipe.", whatsapp: "Continuar pelo WhatsApp", whatsappHint: "Isso ajuda nossa equipe a identificar seu atendimento e responder com mais rapidez.", whatsappOfficial: "Você será direcionado ao WhatsApp oficial da Embarpet.",
  },
  en: {
    htmlLang: "en", title: "International Pet Transport | Embarpet", description: "Plan your pet’s international trip with route analysis, documentation and air-travel options.",
    notice: "We assist international destinations only. Domestic flights are supported only when connected to an international itinerary.", close: "Close notice", analyze: "Analyze your trip", startTrip: "Start your trip", wherePetGoes: "Where is your pet going?", language: "Language",
    navHow: "How it works", navModalities: "Travel options", navServices: "Services", navDestinations: "Destinations", navContent: "Resources", navQuestions: "Questions",
    heroTitleBefore: "Is your ", heroTitleHighlight: "pet moving abroad?", heroIntro: "Answer a few questions and receive a ", heroIntroStrong: "personalized initial assessment", heroIntroAfter: " for your pet’s journey.",
    period: "When would you like to travel?", periodOptions: ["Within 1 to 3 months", "Within 3 to 6 months", "No date set"], origin: "Which country is your pet leaving from?", destination: "Which country is your pet going to?", cityPlaceholder: "Enter a country", originRequired: "Enter the origin country", destinationRequired: "Enter the destination country", startAnalysis: "Start my assessment",
    formRoute: "Your assessment starts here", formRouteTitle: "Let’s start with your route.", formRouteCopy: "Tell us where your pet is leaving from and when you plan to travel. Your selected destination is already filled in.", backHome: "Back to home", changeRoute: "Change route",
    thankYouKicker: "Assessment received", thankYouTitle: "We received the details of your pet’s trip to", thankYouCopy: "Our team will review the destination, timing, documentation and travel option to guide the next steps safely.", thankYouStep: "Just one step left", thankYouAction: "Click below to continue on WhatsApp and send the automatic message to our team.", whatsapp: "Continue on WhatsApp", whatsappHint: "This helps our team identify your request and respond faster.", whatsappOfficial: "You will be taken to Embarpet’s official WhatsApp.",
  },
  es: {
    htmlLang: "es", title: "Transporte Internacional de Mascotas | Embarpet", description: "Planifica el viaje internacional de tu mascota con análisis de ruta, documentación y opciones de transporte aéreo.",
    notice: "Atendemos únicamente destinos internacionales. Los vuelos nacionales se apoyan solo cuando conectan con un viaje internacional.", close: "Cerrar aviso", analyze: "Analizar el viaje", startTrip: "Comenzar viaje", wherePetGoes: "¿Adónde va tu mascota?", language: "Idioma",
    navHow: "Cómo funciona", navModalities: "Modalidades", navServices: "Servicios", navDestinations: "Destinos", navContent: "Contenido", navQuestions: "Preguntas",
    heroTitleBefore: "¿Tu ", heroTitleHighlight: "mascota viaja a otro país?", heroIntro: "Responde unos pasos y recibe una ", heroIntroStrong: "evaluación personalizada", heroIntroAfter: " para el embarque de tu mascota.",
    period: "¿Cuándo deseas viajar?", periodOptions: ["Dentro de 1 a 3 meses", "Dentro de 3 a 6 meses", "Sin fecha definida"], origin: "¿De qué país sale tu mascota?", destination: "¿A qué país va tu mascota?", cityPlaceholder: "Escribe un país", originRequired: "Indica el país de origen", destinationRequired: "Indica el país de destino", startAnalysis: "Comenzar mi evaluación",
    formRoute: "Tu evaluación comienza aquí", formRouteTitle: "Comencemos por tu ruta.", formRouteCopy: "Indica desde dónde sale tu mascota y cuándo deseas viajar. El destino elegido ya está completado.", backHome: "Volver al inicio", changeRoute: "Cambiar ruta",
    thankYouKicker: "Evaluación recibida", thankYouTitle: "Recibimos la información del viaje de tu mascota a", thankYouCopy: "Nuestro equipo revisará destino, plazo, documentación y modalidad para indicar los próximos pasos con seguridad.", thankYouStep: "Solo falta un paso", thankYouAction: "Haz clic abajo para continuar por WhatsApp y enviar el mensaje automático a nuestro equipo.", whatsapp: "Continuar por WhatsApp", whatsappHint: "Esto ayuda a nuestro equipo a identificar tu atención y responder más rápido.", whatsappOfficial: "Serás dirigido al WhatsApp oficial de Embarpet.",
  },
  ja: {
    htmlLang: "ja", title: "国際ペット輸送 | Embarpet", description: "ルート、書類、航空輸送の選択肢を確認しながら、ペットの国際移動を計画できます。",
    notice: "国際便のみを対象としています。国内線は国際線に接続する場合のみサポートします。", close: "お知らせを閉じる", analyze: "渡航を相談する", startTrip: "旅を始める", wherePetGoes: "ペットの渡航先は？", language: "言語",
    navHow: "流れ", navModalities: "輸送方法", navServices: "サービス", navDestinations: "渡航先", navContent: "ガイド", navQuestions: "よくある質問",
    heroTitleBefore: "ペットは", heroTitleHighlight: "海外へ渡航しますか？", heroIntro: "いくつかの質問に答えると、", heroIntroStrong: "個別の初期確認", heroIntroAfter: "をお届けします。",
    period: "渡航予定はいつですか？", periodOptions: ["1〜3か月以内", "3〜6か月以内", "日程未定"], origin: "ペットはどの国から出発しますか？", destination: "ペットはどの国へ渡航しますか？", cityPlaceholder: "国名を入力", originRequired: "出発国を入力してください", destinationRequired: "目的国を入力してください", startAnalysis: "確認を始める",
    formRoute: "確認はここから始まります", formRouteTitle: "まずルートを教えてください。", formRouteCopy: "ペットの出発地と渡航予定時期を入力してください。選択した目的地はすでに入力されています。", backHome: "トップへ戻る", changeRoute: "ルートを変更",
    thankYouKicker: "情報を受け取りました", thankYouTitle: "ペットの渡航先に関する情報を受け取りました：", thankYouCopy: "目的地、時期、必要書類、輸送方法を確認し、安全な次のステップをご案内します。", thankYouStep: "あと一歩です", thankYouAction: "下のボタンからWhatsAppで続け、チームへ自動メッセージを送信してください。", whatsapp: "WhatsAppで続ける", whatsappHint: "これによりチームがご相談を識別し、より早く返信できます。", whatsappOfficial: "Embarpet公式WhatsAppに移動します。",
  },
} as const;

export type Copy = typeof translatedCopy[keyof typeof translatedCopy];
const localeFallback: Record<Locale, keyof typeof translatedCopy> = {
  "pt-BR": "pt-BR", "pt-PT": "pt-BR", en: "en", es: "es", ja: "ja",
  fr: "en", it: "en", de: "en", nl: "en", zh: "en", ko: "en", ar: "en", ru: "en",
};
const getCopy = (locale: Locale): Copy => translatedCopy[localeFallback[locale]];
type LocaleContextValue = { locale: Locale; text: Copy; path: (path?: string) => string; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return locales.includes(segment as Locale) ? segment as Locale : "pt-BR";
}

export function localizePath(locale: Locale, path = "/") {
  const [pathname, query = ""] = path.split("?");
  const localePrefix = locales.filter((item) => item !== "pt-BR").join("|");
  const barePath = pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), "") || "/";
  const base = locale === "pt-BR" ? barePath : `/${locale}${barePath === "/" ? "/" : barePath}`;
  return query ? `${base}?${query}` : base;
}

export function LocaleProvider({ locale: initialLocale, children }: { locale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState(initialLocale);
  useEffect(() => {
    setLocaleState(getLocaleFromPath(window.location.pathname));
  }, []);
  useEffect(() => {
    const text = getCopy(locale);
    document.documentElement.lang = locale === "pt-BR" ? "pt-BR" : locale;
    const localePrefix = locales.filter((item) => item !== "pt-BR").join("|");
    const currentPath = window.location.pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), "") || "/";
    const restoreMetadata = setPageMetadata({
      title: text.title,
      description: text.description,
      canonicalPath: localizePath(locale, currentPath),
    });
    try { window.localStorage.setItem("embarpet-locale", locale); } catch { /* optional preference */ }
    return restoreMetadata;
  }, [locale]);
  const value = useMemo(() => ({ locale, text: getCopy(locale), path: (path = "/") => localizePath(locale, path), setLocale: setLocaleState }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
