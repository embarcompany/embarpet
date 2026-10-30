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
    navAboutLabel: "Sobre Nós", navAboutBadges: ["Aeroporto GRU", "Desde 2018"],
    megaDestSectionLabel: "Destinos Internacionais", megaModSectionLabel: "Modalidades de Voo", megaDestPromoLabel: "Assessoria Personalizada", megaModPromoLabel: "Diagnóstico Seguro",
    destUsaLabel: "Estados Unidos", destUsaDesc: "Conformidade CDC e entrada ágil",
    destPortugalLabel: "Portugal & Europa", destPortugalDesc: "Porta de entrada na UE com microchip",
    destSpainLabel: "Espanha", destSpainDesc: "Planejamento e CVI oficial",
    destItalyLabel: "Itália", destItalyDesc: "Rotas e trânsito comunitário",
    destArgentinaLabel: "Argentina", destArgentinaDesc: "Conexões e MERCOSUL",
    destUruguayLabel: "Uruguai", destUruguayDesc: "Documentação fronteiriça",
    destParaguayLabel: "Paraguai", destParaguayDesc: "Requisitos de entrada",
    destOtherLabel: "Outros 80+ Destinos", destOtherDesc: "Consulte sua rota sob medida para mais de 80 países atendidos", destOtherBadge: "Rotas Globais",
    destPromoBadge: "Planejamento Sob Medida", destPromoTitle: "Vai para outro país?", destPromoDesc: "Planejamos rotas personalizadas com sincronia de laudos, vacinas e microchip para mais de 80 destinos internacionais.", destPromoButton: "Consultar Especialista",
    modCabinLabel: "Viagem na Cabine", modCabinBadge: "Até 8–10kg", modCabinDesc: "Com o tutor dentro da cabine de passageiros, quando rota e porte permitem.",
    modLuggageLabel: "Bagagem Acompanhada", modLuggageBadge: "Mesmo Voo", modLuggageDesc: "No mesmo voo do tutor, em compartimento apropriado, pressurizado e climatizado.",
    modCargoLabel: "Compartimento de Cargas", modCargoBadge: "Carga Viva", modCargoDesc: "Operação dedicada para portes médios/grandes ou quando o tutor viaja em outra data.",
    modEmotionalLabel: "Suporte Emocional & Cão Guia", modEmotionalBadge: "Casos Especiais", modEmotionalDesc: "Orientação e conformidade técnica para animais de assistência em viagens internacionais.",
    modPetluxoLabel: "PetLuxo", modPetluxoBadges: ["Exclusivo", "Acompanhamento VIP"], modPetluxoDesc: "Consultor dedicado acompanhando cada marco da jornada até a entrega com a família.",
    modPromoBadge: "Diagnóstico Veterinário", modPromoTitle: "Dúvida sobre a modalidade?", modPromoDesc: "Nossa equipe avalia raça, medidas anatômicas e peso para indicar a modalidade 100% segura para seu pet.", modPromoButton: "Avaliar Modalidade",
  },
  en: {
    htmlLang: "en", title: "International Pet Transport | Embarpet", description: "Plan your pet’s international trip with route analysis, documentation and air-travel options.",
    notice: "We assist international destinations only. Domestic flights are supported only when connected to an international itinerary.", close: "Close notice", analyze: "Analyze your trip", startTrip: "Start your trip", wherePetGoes: "Where is your pet going?", language: "Language",
    navHow: "How it works", navModalities: "Travel options", navServices: "Services", navDestinations: "Destinations", navContent: "Resources", navQuestions: "Questions",
    heroTitleBefore: "Is your ", heroTitleHighlight: "pet moving abroad?", heroIntro: "Answer a few questions and receive a ", heroIntroStrong: "personalized initial assessment", heroIntroAfter: " for your pet’s journey.",
    period: "When would you like to travel?", periodOptions: ["Within 1 to 3 months", "Within 3 to 6 months", "No date set"], origin: "Which country is your pet leaving from?", destination: "Which country is your pet going to?", cityPlaceholder: "Enter a country", originRequired: "Enter the origin country", destinationRequired: "Enter the destination country", startAnalysis: "Start my assessment",
    formRoute: "Your assessment starts here", formRouteTitle: "Let’s start with your route.", formRouteCopy: "Tell us where your pet is leaving from and when you plan to travel. Your selected destination is already filled in.", backHome: "Back to home", changeRoute: "Change route",
    thankYouKicker: "Assessment received", thankYouTitle: "We received the details of your pet’s trip to", thankYouCopy: "Our team will review the destination, timing, documentation and travel option to guide the next steps safely.", thankYouStep: "Just one step left", thankYouAction: "Click below to continue on WhatsApp and send the automatic message to our team.", whatsapp: "Continue on WhatsApp", whatsappHint: "This helps our team identify your request and respond faster.", whatsappOfficial: "You will be taken to Embarpet’s official WhatsApp.",
    navAboutLabel: "About Us", navAboutBadges: ["GRU Airport", "Since 2018"],
    megaDestSectionLabel: "International Destinations", megaModSectionLabel: "Travel Options", megaDestPromoLabel: "Personalized Guidance", megaModPromoLabel: "Safe Assessment",
    destUsaLabel: "United States", destUsaDesc: "CDC compliance and fast entry",
    destPortugalLabel: "Portugal & Europe", destPortugalDesc: "Gateway to the EU with microchip",
    destSpainLabel: "Spain", destSpainDesc: "Planning and official CVI",
    destItalyLabel: "Italy", destItalyDesc: "Routes and EU transit",
    destArgentinaLabel: "Argentina", destArgentinaDesc: "Connections and MERCOSUR",
    destUruguayLabel: "Uruguay", destUruguayDesc: "Border documentation",
    destParaguayLabel: "Paraguay", destParaguayDesc: "Entry requirements",
    destOtherLabel: "80+ More Destinations", destOtherDesc: "Check your custom route for more than 80 countries we serve", destOtherBadge: "Global Routes",
    destPromoBadge: "Custom Planning", destPromoTitle: "Traveling to another country?", destPromoDesc: "We plan custom routes with synchronized health certificates, vaccines and microchip for more than 80 international destinations.", destPromoButton: "Talk to a Specialist",
    modCabinLabel: "Cabin Travel", modCabinBadge: "Up to 8–10kg", modCabinDesc: "With the owner inside the passenger cabin, when route and size allow.",
    modLuggageLabel: "Checked Baggage", modLuggageBadge: "Same Flight", modLuggageDesc: "On the owner's same flight, in an appropriate, pressurized and climate-controlled hold.",
    modCargoLabel: "Cargo Hold", modCargoBadge: "Live Cargo", modCargoDesc: "Dedicated operation for medium/large pets or when the owner travels on a different date.",
    modEmotionalLabel: "Emotional Support & Service Dogs", modEmotionalBadge: "Special Cases", modEmotionalDesc: "Guidance and technical compliance for assistance animals on international trips.",
    modPetluxoLabel: "PetLuxo", modPetluxoBadges: ["Exclusive", "VIP Escort"], modPetluxoDesc: "A dedicated consultant following every milestone of the journey through to delivery with the family.",
    modPromoBadge: "Veterinary Assessment", modPromoTitle: "Not sure which option fits?", modPromoDesc: "Our team evaluates breed, measurements and weight to recommend the 100% safe option for your pet.", modPromoButton: "Assess My Pet",
  },
  es: {
    htmlLang: "es", title: "Transporte Internacional de Mascotas | Embarpet", description: "Planifica el viaje internacional de tu mascota con análisis de ruta, documentación y opciones de transporte aéreo.",
    notice: "Atendemos únicamente destinos internacionales. Los vuelos nacionales se apoyan solo cuando conectan con un viaje internacional.", close: "Cerrar aviso", analyze: "Analizar el viaje", startTrip: "Comenzar viaje", wherePetGoes: "¿Adónde va tu mascota?", language: "Idioma",
    navHow: "Cómo funciona", navModalities: "Modalidades", navServices: "Servicios", navDestinations: "Destinos", navContent: "Contenido", navQuestions: "Preguntas",
    heroTitleBefore: "¿Tu ", heroTitleHighlight: "mascota viaja a otro país?", heroIntro: "Responde unos pasos y recibe una ", heroIntroStrong: "evaluación personalizada", heroIntroAfter: " para el embarque de tu mascota.",
    period: "¿Cuándo deseas viajar?", periodOptions: ["Dentro de 1 a 3 meses", "Dentro de 3 a 6 meses", "Sin fecha definida"], origin: "¿De qué país sale tu mascota?", destination: "¿A qué país va tu mascota?", cityPlaceholder: "Escribe un país", originRequired: "Indica el país de origen", destinationRequired: "Indica el país de destino", startAnalysis: "Comenzar mi evaluación",
    formRoute: "Tu evaluación comienza aquí", formRouteTitle: "Comencemos por tu ruta.", formRouteCopy: "Indica desde dónde sale tu mascota y cuándo deseas viajar. El destino elegido ya está completado.", backHome: "Volver al inicio", changeRoute: "Cambiar ruta",
    thankYouKicker: "Evaluación recibida", thankYouTitle: "Recibimos la información del viaje de tu mascota a", thankYouCopy: "Nuestro equipo revisará destino, plazo, documentación y modalidad para indicar los próximos pasos con seguridad.", thankYouStep: "Solo falta un paso", thankYouAction: "Haz clic abajo para continuar por WhatsApp y enviar el mensaje automático a nuestro equipo.", whatsapp: "Continuar por WhatsApp", whatsappHint: "Esto ayuda a nuestro equipo a identificar tu atención y responder más rápido.", whatsappOfficial: "Serás dirigido al WhatsApp oficial de Embarpet.",
    navAboutLabel: "Sobre Nosotros", navAboutBadges: ["Aeropuerto GRU", "Desde 2018"],
    megaDestSectionLabel: "Destinos Internacionales", megaModSectionLabel: "Modalidades de Vuelo", megaDestPromoLabel: "Asesoría Personalizada", megaModPromoLabel: "Diagnóstico Seguro",
    destUsaLabel: "Estados Unidos", destUsaDesc: "Cumplimiento CDC y entrada ágil",
    destPortugalLabel: "Portugal y Europa", destPortugalDesc: "Puerta de entrada a la UE con microchip",
    destSpainLabel: "España", destSpainDesc: "Planificación y CVI oficial",
    destItalyLabel: "Italia", destItalyDesc: "Rutas y tránsito comunitario",
    destArgentinaLabel: "Argentina", destArgentinaDesc: "Conexiones y MERCOSUR",
    destUruguayLabel: "Uruguay", destUruguayDesc: "Documentación fronteriza",
    destParaguayLabel: "Paraguay", destParaguayDesc: "Requisitos de entrada",
    destOtherLabel: "Más de 80 Destinos", destOtherDesc: "Consulta tu ruta a medida para más de 80 países atendidos", destOtherBadge: "Rutas Globales",
    destPromoBadge: "Planificación a Medida", destPromoTitle: "¿Viajas a otro país?", destPromoDesc: "Planificamos rutas personalizadas con sincronía de certificados, vacunas y microchip para más de 80 destinos internacionales.", destPromoButton: "Consultar Especialista",
    modCabinLabel: "Viaje en Cabina", modCabinBadge: "Hasta 8–10kg", modCabinDesc: "Con el tutor dentro de la cabina de pasajeros, cuando la ruta y el tamaño lo permiten.",
    modLuggageLabel: "Equipaje Acompañado", modLuggageBadge: "Mismo Vuelo", modLuggageDesc: "En el mismo vuelo del tutor, en compartimento adecuado, presurizado y climatizado.",
    modCargoLabel: "Compartimento de Carga", modCargoBadge: "Carga Viva", modCargoDesc: "Operación dedicada para tamaños medianos/grandes o cuando el tutor viaja en otra fecha.",
    modEmotionalLabel: "Apoyo Emocional y Perros Guía", modEmotionalBadge: "Casos Especiales", modEmotionalDesc: "Orientación y cumplimiento técnico para animales de asistencia en viajes internacionales.",
    modPetluxoLabel: "PetLuxo", modPetluxoBadges: ["Exclusivo", "Acompañamiento VIP"], modPetluxoDesc: "Un consultor dedicado que acompaña cada etapa del viaje hasta la entrega con la familia.",
    modPromoBadge: "Diagnóstico Veterinario", modPromoTitle: "¿Dudas sobre la modalidad?", modPromoDesc: "Nuestro equipo evalúa raza, medidas y peso para indicar la modalidad 100% segura para tu mascota.", modPromoButton: "Evaluar Modalidad",
  },
  ja: {
    htmlLang: "ja", title: "国際ペット輸送 | Embarpet", description: "ルート、書類、航空輸送の選択肢を確認しながら、ペットの国際移動を計画できます。",
    notice: "国際便のみを対象としています。国内線は国際線に接続する場合のみサポートします。", close: "お知らせを閉じる", analyze: "渡航を相談する", startTrip: "旅を始める", wherePetGoes: "ペットの渡航先は？", language: "言語",
    navHow: "流れ", navModalities: "輸送方法", navServices: "サービス", navDestinations: "渡航先", navContent: "ガイド", navQuestions: "よくある質問",
    heroTitleBefore: "ペットは", heroTitleHighlight: "海外へ渡航しますか？", heroIntro: "いくつかの質問に答えると、", heroIntroStrong: "個別の初期確認", heroIntroAfter: "をお届けします。",
    period: "渡航予定はいつですか？", periodOptions: ["1〜3か月以内", "3〜6か月以内", "日程未定"], origin: "ペットはどの国から出発しますか？", destination: "ペットはどの国へ渡航しますか？", cityPlaceholder: "国名を入力", originRequired: "出発国を入力してください", destinationRequired: "目的国を入力してください", startAnalysis: "確認を始める",
    formRoute: "確認はここから始まります", formRouteTitle: "まずルートを教えてください。", formRouteCopy: "ペットの出発地と渡航予定時期を入力してください。選択した目的地はすでに入力されています。", backHome: "トップへ戻る", changeRoute: "ルートを変更",
    thankYouKicker: "情報を受け取りました", thankYouTitle: "ペットの渡航先に関する情報を受け取りました：", thankYouCopy: "目的地、時期、必要書類、輸送方法を確認し、安全な次のステップをご案内します。", thankYouStep: "あと一歩です", thankYouAction: "下のボタンからWhatsAppで続け、チームへ自動メッセージを送信してください。", whatsapp: "WhatsAppで続ける", whatsappHint: "これによりチームがご相談を識別し、より早く返信できます。", whatsappOfficial: "Embarpet公式WhatsAppに移動します。",
    navAboutLabel: "私たちについて", navAboutBadges: ["GRU空港", "2018年設立"],
    megaDestSectionLabel: "海外渡航先", megaModSectionLabel: "輸送方法", megaDestPromoLabel: "個別サポート", megaModPromoLabel: "安全診断",
    destUsaLabel: "アメリカ合衆国", destUsaDesc: "CDC基準準拠とスムーズな入国",
    destPortugalLabel: "ポルトガル・欧州", destPortugalDesc: "マイクロチップでEUへの玄関口",
    destSpainLabel: "スペイン", destSpainDesc: "計画と公式CVI",
    destItalyLabel: "イタリア", destItalyDesc: "ルートとEU域内通過",
    destArgentinaLabel: "アルゼンチン", destArgentinaDesc: "接続とMERCOSUR",
    destUruguayLabel: "ウルグアイ", destUruguayDesc: "国境書類",
    destParaguayLabel: "パラグアイ", destParaguayDesc: "入国要件",
    destOtherLabel: "その他80以上の渡航先", destOtherDesc: "80か国以上対応、あなたに合わせたルートをご相談ください", destOtherBadge: "グローバルルート",
    destPromoBadge: "オーダーメイド計画", destPromoTitle: "他の国へ渡航しますか？", destPromoDesc: "80以上の渡航先に対応し、検査書類・ワクチン・マイクロチップのタイミングを調整したルートをご提案します。", destPromoButton: "専門家に相談",
    modCabinLabel: "客室輸送", modCabinBadge: "8〜10kgまで", modCabinDesc: "ルートとサイズが条件を満たす場合、飼い主と同じ客室内で輸送します。",
    modLuggageLabel: "同伴手荷物輸送", modLuggageBadge: "同じ便", modLuggageDesc: "飼い主と同じ便の、加圧・空調管理された専用区画で輸送します。",
    modCargoLabel: "貨物室輸送", modCargoBadge: "生体貨物", modCargoDesc: "中型・大型犬種、または飼い主と別日程で渡航する場合の専用オペレーションです。",
    modEmotionalLabel: "情緒サポート・盲導犬", modEmotionalBadge: "特別対応", modEmotionalDesc: "国際渡航における補助動物のガイダンスと技術的な法令順守をサポートします。",
    modPetluxoLabel: "PetLuxo", modPetluxoBadges: ["限定", "VIP同行"], modPetluxoDesc: "専任コンサルタントが渡航の節目ごとに同行し、ご家族のもとへお届けします。",
    modPromoBadge: "獣医師による診断", modPromoTitle: "輸送方法に迷っていますか？", modPromoDesc: "犬種、体のサイズ、体重を確認し、ペットに100%安全な輸送方法をご案内します。", modPromoButton: "輸送方法を相談",
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
  const [pathWithQuery, hash = ""] = path.split("#");
  const [pathname, query = ""] = pathWithQuery.split("?");
  const localePrefix = locales.filter((item) => item !== "pt-BR").join("|");
  const barePath = pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), "") || "/";
  const base = locale === "pt-BR" ? barePath : `/${locale}${barePath === "/" ? "/" : barePath}`;
  const destination = query ? `${base}?${query}` : base;
  return hash ? `${destination}#${hash}` : destination;
}

export function LocaleProvider({ locale: initialLocale, children }: { locale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState(initialLocale);
  useEffect(() => {
    setLocaleState(getLocaleFromPath(window.location.pathname));
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale === "pt-BR" ? "pt-BR" : locale;
    const localePrefix = locales.filter((item) => item !== "pt-BR").join("|");
    const currentPath = window.location.pathname.replace(new RegExp(`^/(${localePrefix})(?=/|$)`), "") || "/";
    try { window.localStorage.setItem("embarpet-locale", locale); } catch { /* optional preference */ }
    // Só a home usa o título/descrição genéricos daqui; outras rotas definem o próprio SEO
    // e não podem ser sobrescritas por este efeito, que roda depois do da página (pai monta após o filho).
    if (currentPath !== "/") return;
    const text = getCopy(locale);
    return setPageMetadata({
      title: text.title,
      description: text.description,
      canonicalPath: localizePath(locale, currentPath),
    });
  }, [locale]);
  const value = useMemo(() => ({ locale, text: getCopy(locale), path: (path = "/") => localizePath(locale, path), setLocale: setLocaleState }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
