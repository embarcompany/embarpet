"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckCheck,
  ArrowRight,
  Phone,
  ShieldCheck,
  Plus,
  Sparkles,
  Lock,
  ChevronRight,
} from "lucide-react";
import { submitLead, type PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";
import { countryFlagSvg } from "../../lib/country-flag";

type ChatStep = "greeting" | "pet_details" | "route" | "period" | "contact" | "complete";

type ChatMessage = {
  id: string;
  sender: "thamires" | "user" | "system";
  text?: string;
  time: string;
  card?: ReactNode;
};

const phoneCountries = [
  { code: "BR", dial: "+55", name: "Brasil" },
  { code: "PT", dial: "+351", name: "Portugal" },
  { code: "US", dial: "+1", name: "Estados Unidos" },
  { code: "ES", dial: "+34", name: "Espanha" },
  { code: "IT", dial: "+39", name: "Itália" },
  { code: "FR", dial: "+33", name: "França" },
  { code: "AR", dial: "+54", name: "Argentina" },
  { code: "UY", dial: "+598", name: "Uruguai" },
  { code: "PY", dial: "+595", name: "Paraguai" },
];

const popularDestinations = [
  { label: "Estados Unidos", code: "US" },
  { label: "Portugal", code: "PT" },
  { label: "Espanha", code: "ES" },
  { label: "Itália", code: "IT" },
  { label: "Argentina", code: "AR" },
  { label: "Uruguai", code: "UY" },
  { label: "Paraguai", code: "PY" },
];

const weightPresets = [
  { label: "Até 8 kg (Cabine)", value: "7" },
  { label: "8 a 15 kg", value: "12" },
  { label: "15 a 30 kg", value: "22" },
  { label: "+30 kg (Grande Porte)", value: "35" },
];

const popularBreeds = [
  "SRD (Vira-lata)",
  "Spitz Alemão / Lulu",
  "Golden / Labrador",
  "Bulldog / Pug (Focinho Curto)",
  "Shih Tzu / Lhasa",
  "Gato Persa / Siamês",
];

const travelPeriods = [
  { label: "⚡ Em até 30 dias (Urgente)", value: "Em até 30 dias (Urgente)" },
  { label: "✈️ Dentro de 1 a 3 meses", value: "Dentro de 1 a 3 meses" },
  { label: "📅 De 3 a 6 meses", value: "De 3 a 6 meses" },
  { label: "🔍 Apenas planejando", value: "Apenas planejando" },
];

const phoneMasks: Record<string, { max: number; format: (digits: string) => string }> = {
  BR: {
    max: 11,
    format: (digits) =>
      digits.length <= 10
        ? digits.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*$/, (_, area, first, last) =>
            [area && `(${area}${area.length === 2 ? ")" : ""}`, first, last].filter(Boolean).join(area.length === 2 ? " " : ""),
          ).replace(/(\d{4}) (\d)/, "$1-$2")
        : digits.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*$/, (_, area, first, last) =>
            [area && `(${area}${area.length === 2 ? ")" : ""}`, first, last].filter(Boolean).join(area.length === 2 ? " " : ""),
          ).replace(/(\d{5}) (\d)/, "$1-$2"),
  },
  US: { max: 10, format: (digits) => digits.replace(/^(\d{0,3})(\d{0,3})(\d{0,4}).*$/, (_, area, first, last) => [area && `(${area}${area.length === 3 ? ")" : ""}`, first, last].filter(Boolean).join(area.length === 3 ? " " : "")).replace(/(\d{3}) (\d)/, "$1-$2") },
  PT: { max: 9, format: (digits) => digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim() },
  ES: { max: 9, format: (digits) => digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim() },
  IT: { max: 10, format: (digits) => digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim() },
  FR: { max: 9, format: (digits) => digits.replace(/(\d)(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2}).*$/, (_, a, b, c, d, e) => [a, b, c, d, e].filter(Boolean).join(" ")) },
  AR: { max: 10, format: (digits) => digits.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*$/, (_, area, first, last) => [area, first, last].filter(Boolean).join(" ")).replace(/(\d{4}) (\d)/, "$1-$2") },
  UY: { max: 8, format: (digits) => digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim() },
  PY: { max: 9, format: (digits) => digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim() },
};

function formatPhoneNumber(value: string, countryCode: string) {
  const digits = value.replace(/\D/g, "");
  const mask = phoneMasks[countryCode];
  return mask ? mask.format(digits.slice(0, mask.max)) : digits.slice(0, 15).replace(/(\d{3})(?=\d)/g, "$1 ");
}

function getNowTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function WhatsAppChatFlow({
  initialRoute = {},
  analyticsSource = "whatsapp_modal",
  onComplete,
}: {
  initialRoute?: {
    origin?: string;
    destination?: string;
    period?: string;
  };
  analyticsSource?: string;
  onComplete?: (lead: PublicLead) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<ChatStep>("greeting");

  // Form State
  const [petSpecies, setPetSpecies] = useState("Cachorro");
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [customBreedMode, setCustomBreedMode] = useState(false);

  const [routeOrigin] = useState(initialRoute.origin || "Brasil");
  const [routeDestination, setRouteDestination] = useState(initialRoute.destination || "");
  const [travelPeriod, setTravelPeriod] = useState(initialRoute.period || "");
  const [tutorName, setTutorName] = useState("");
  const [tutorPhone, setTutorPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customDestinationInput, setCustomDestinationInput] = useState("");
  const [isCustomDestination, setIsCustomDestination] = useState(false);
  const [completedWhatsAppUrl, setCompletedWhatsAppUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, thinkingText, currentStep]);

  const trackStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackConversionEvent("analysis_started", {
      source: analyticsSource,
      format: "whatsapp_chat",
    });
  };

  // Helper for AI Thought transition
  const triggerAiResponse = (
    thoughtLabel: string,
    action: () => void,
    thoughtDuration = 650,
    typingDuration = 500
  ) => {
    setThinkingText(thoughtLabel);
    setIsTyping(false);

    setTimeout(() => {
      setThinkingText(null);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        action();
      }, typingDuration);
    }, thoughtDuration);
  };

  // Initial Greeting from Thamires Felix
  useEffect(() => {
    const time = getNowTime();
    setIsTyping(true);

    const timer1 = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: "intro-text",
          sender: "thamires",
          text: "Olá! Sou a Thamires Felix da Embarpet. Vou te ajudar com cada detalhe do planejamento de viagem internacional do seu pet.",
          time,
        },
        {
          id: "q-species",
          sender: "thamires",
          text: "Para começarmos a traçar a rota ideal, qual pet vai viajar com você?",
          time,
        },
      ]);
    }, 500);

    return () => clearTimeout(timer1);
  }, []);

  // Step 1: Handle Species Selection (1-Tap)
  const handleSelectSpecies = (species: string) => {
    trackStart();
    setPetSpecies(species);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-species-${Date.now()}`,
      sender: "user",
      text: `${species}`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("pet_details");

    const thoughtText = species === "Gato"
      ? "Consultando diretrizes IATA para felinos e conforto acústico..."
      : species === "Cachorro"
      ? "Consultando diretrizes IATA para caninos e regras de compartimento..."
      : "Verificando exigências para animais silvestres e exóticos...";

    triggerAiResponse(thoughtText, () => {
      let followUp = "Perfeito! Para calcularmos o compartimento ideal (Cabine, Bagagem Acompanhada ou Cargas Vivas) e o tamanho da caixa, selecione o perfil do seu pet abaixo:";
      if (species === "Gato") {
        followUp = "Excelente! Para felinos, precisamos conferir peso e perfil para indicar a melhor acomodação de voo. Selecione o perfil abaixo:";
      }

      const botMsg: ChatMessage = {
        id: `bot-pet-details-${Date.now()}`,
        sender: "thamires",
        text: followUp,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 2: Submit Pet Details (1-Tap Presets or Fast Submit)
  const handleConfirmPetDetails = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const resolvedBreed = petBreed.trim() || (petSpecies === "Gato" ? "Gato Doméstico" : "SRD (Vira-lata)");
    const resolvedWeight = petWeight.trim() || "8";

    const time = getNowTime();
    const displayName = petName.trim() || (petSpecies === "Gato" ? "seu gatinho" : "seu pet");
    const weightNum = parseFloat(resolvedWeight.replace(",", ".")) || 8;

    const isBrachy = /buld|bulldog|pug|shih|boxer|pekin|lhasa|persa|boston|cavalier|shar\s*pei|malt[eê]s/i.test(resolvedBreed);
    const isSmall = weightNum > 0 && weightNum <= 8;

    const detailsSummary = [
      petName.trim() ? `Nome: ${petName.trim()}` : null,
      `Raça: ${resolvedBreed}`,
      `Peso: ~${resolvedWeight} kg`,
    ].filter(Boolean).join(" • ");

    const userMsg: ChatMessage = {
      id: `user-pet-details-${Date.now()}`,
      sender: "user",
      text: detailsSummary,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("route");

    const thoughtText = isBrachy
      ? "Identificando perfil braquicefálico e selecionando companhias com aclimatação reforçada..."
      : isSmall
      ? "Calculando elegibilidade para Viagem na Cabine de Passageiros..."
      : "Dimensionando compartimento climatizado (Bagagem Acompanhada / Carga Viva)...";

    triggerAiResponse(thoughtText, () => {
      let dynamicInsight = "";
      if (isBrachy) {
        dynamicInsight = `Identifiquei que o(a) ${displayName} possui perfil braquicefálico (focinho curto). Mapeamos companhias que autorizam a rota com caixas de ventilação 360° e limites térmicos controlados.`;
      } else if (isSmall) {
        dynamicInsight = `Com aproximadamente ${resolvedWeight} kg, o(a) ${displayName} tem elegibilidade alta para **Cabine de Passageiros** com você!`;
      } else {
        dynamicInsight = `Para o porte do(a) ${displayName} (~${resolvedWeight} kg), a rota opera com **Bagagem Acompanhada no porão pressurizado e climatizado** ou **Carga Viva Dedicada**, com amplo espaço e segurança.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-route-${Date.now()}`,
        sender: "thamires",
        text: `${dynamicInsight}\n\nAgora selecione o país de destino da viagem:`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 3: Handle Destination Selection (1-Tap)
  const handleSelectDestination = (dest: string) => {
    setRouteDestination(dest);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-dest-${Date.now()}`,
      sender: "user",
      text: `Origem: ${routeOrigin} ➔ Destino: ${dest}`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("period");

    const isUS = /estados unidos|usa|eua|united states/i.test(dest);
    const isEU = /portugal|espanha|it[aá]lia|fran[cç]a|alemanha|europa|ue/i.test(dest);
    const isMercosul = /argentina|uruguai|paraguai|chile/i.test(dest);

    const thoughtText = isUS
      ? "Consultando diretrizes CDC (CDC Dog Import Form) e protocolos USDA/MAPA..."
      : isEU
      ? "Verificando Regulamento UE 576/2013, microchip ISO 11784 e emissão de CVI..."
      : isMercosul
      ? "Consultando normas sanitárias Senasa/MGAP e desparasitação oficial..."
      : `Consultando exigências consulares e sanitárias para ${dest}...`;

    triggerAiResponse(thoughtText, () => {
      let destinationInsight = "";
      if (isUS) {
        destinationInsight = `Excelente! Para os **Estados Unidos**, alinhamos o novo formulário do CDC (CDC Dog Import Form), microchip ISO e comprovação de vacinação antirrábica oficial para entrada ágil sem retenções.`;
      } else if (isEU) {
        destinationInsight = `Destino maravilhoso! Para a **União Europeia (${dest})**, o protocolo exige Microchip ISO padrão 11784 antes da vacina da raiva, eventual sorologia e emissão do CVI oficial pelo Ministério da Agricultura (MAPA).`;
      } else if (isMercosul) {
        destinationInsight = `Perfeito! Para a **${dest} (Mercosul)**, o processo é mais ágil, exigindo CVI com laudo de desparasitação recente e atestado veterinário.`;
      } else {
        destinationInsight = `Ótima rota! Mapeamos as diretrizes da autoridade sanitária local de **${dest}** para garantir um desembarque 100% regularizado.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-period-${Date.now()}`,
        sender: "thamires",
        text: `${destinationInsight}\n\nPara quando você planeja essa viagem?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 4: Handle Period Selection (1-Tap)
  const handleSelectPeriod = (period: string) => {
    setTravelPeriod(period);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-period-${Date.now()}`,
      sender: "user",
      text: `Previsão: ${period}`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("contact");

    trackConversionEvent("pets_completed", {
      source: analyticsSource,
      format: "whatsapp_chat",
      species: petSpecies,
      destination: routeDestination,
    });

    const isUrgent = /30 dias|urgente/i.test(period);
    const thoughtText = isUrgent
      ? "Calculando janela prioritária de agendamento Vigiagro e reserva aérea expressa..."
      : "Estruturando cronograma sanitário preventivo e janelas de vacinação...";

    triggerAiResponse(thoughtText, () => {
      const timingAdvice = isUrgent
        ? "Prazo prioritário! É importante iniciarmos a documentação imediatamente para assegurar vaga na aeronave."
        : "Excelente antecedência! Teremos tempo hábil para cumprir todas as etapas com total tranquilidade.";

      const botMsg: ChatMessage = {
        id: `bot-contact-${Date.now()}`,
        sender: "thamires",
        text: `${timingAdvice}\n\nPara eu compilar o pré-diagnóstico completo da sua rota e te enviar no WhatsApp, informe seu nome e número abaixo:`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 5: Final Submission and WhatsApp URL Generation
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorName.trim() || !tutorPhone.trim()) return;

    setIsSubmitting(true);
    const time = getNowTime();
    const fullPhone = `${phoneCountry.dial} ${tutorPhone}`;

    const lead: PublicLead = {
      source: analyticsSource,
      page: typeof window !== "undefined" ? window.location.pathname : "/whatsapp",
      origin: routeOrigin,
      destination: routeDestination,
      period: travelPeriod,
      species: petSpecies,
      size: `${petBreed ? petBreed + " " : ""}${petWeight ? "(~" + petWeight + "kg)" : ""}`.trim() || undefined,
      name: tutorName,
      phone: fullPhone,
      consent: true,
    };

    const userMsg: ChatMessage = {
      id: `user-contact-${Date.now()}`,
      sender: "user",
      text: `Meu nome é ${tutorName} (${fullPhone})`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("complete");
    setThinkingText("Gerando laudo de pré-diagnóstico e conectando ao WhatsApp oficial...");

    try {
      await submitLead(lead);
      trackConversionEvent("diagnostico_concluido", {
        source: analyticsSource,
        format: "whatsapp_chat",
        origin: routeOrigin,
        destination: routeDestination,
      });
      onComplete?.(lead);
    } catch {
      // Allow user to proceed even if network glitched
    }

    const waText = encodeURIComponent(
      `Olá Thamires! Preenchi o pré-diagnóstico no site da Embarpet para meu pet (${petSpecies} - ${petBreed || "sem raça definida"}).\n\n` +
      `✈️ Rota: ${routeOrigin} ➔ ${routeDestination || "Internacional"}\n` +
      `📅 Previsão: ${travelPeriod || "A definir"}\n` +
      `👤 Tutor: ${tutorName}\n\n` +
      `Gostaria de tirar dúvidas e dar andamento ao planejamento!`
    );

    const whatsappUrl = `https://wa.me/5511978253579?text=${waText}`;
    setCompletedWhatsAppUrl(whatsappUrl);

    setTimeout(() => {
      setThinkingText(null);
      setIsTyping(false);
      setIsSubmitting(false);

      const firstName = tutorName.split(" ")[0] || "Tutor(a)";
      const botMsg: ChatMessage = {
        id: `bot-complete-${Date.now()}`,
        sender: "thamires",
        text: `Prontinho, ${firstName}! 🎉 Pré-diagnóstico gerado com sucesso para a rota ${routeDestination || "internacional"}. Toque no botão verde abaixo para abrir a conversa comigo no WhatsApp!`,
        time: getNowTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  return (
    <div className="ep-wa-container">
      {/* 1. Scrollable Message Stream */}
      <div className="ep-wa-body" role="log" aria-live="polite">
        <div className="ep-wa-date-pill">Hoje</div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`ep-wa-bubble ${
              msg.sender === "user" ? "ep-wa-bubble--outgoing" : "ep-wa-bubble--incoming"
            }`}
          >
            {msg.text && (
              <p className="ep-wa-bubble__text" style={{ whiteSpace: "pre-line" }}>
                {msg.text}
              </p>
            )}

            {msg.card && msg.card}

            <div className="ep-wa-bubble__meta">
              <span>{msg.time}</span>
              {msg.sender === "user" && (
                <span className="ep-wa-bubble__ticks">
                  <CheckCheck size={14} />
                </span>
              )}
            </div>
          </div>
        ))}

        {/* AI Thought / Reasoning State */}
        {thinkingText && (
          <div className="ep-wa-thought-pill">
            <span className="ep-wa-thought-pill__icon">
              <Sparkles size={13} />
            </span>
            <span className="ep-wa-thought-pill__text">{thinkingText}</span>
          </div>
        )}

        {/* Typing Indicator */}
        {isTyping && !thinkingText && (
          <div className="ep-wa-typing">
            <div className="ep-wa-typing__dot" />
            <div className="ep-wa-typing__dot" />
            <div className="ep-wa-typing__dot" />
            <span className="ep-wa-typing__label">Thamires digitando...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 2. Interactive Bottom Dock (Replaces Keyboard / Static Input Area) */}
      <div className="ep-wa-dock">
        {/* Step 1: Species Selection (1-Tap) */}
        {currentStep === "greeting" && !isTyping && (
          <div className="ep-wa-dock__step">
            <span className="ep-wa-dock__hint">Escolha uma opção para continuar:</span>
            <div className="ep-wa-dock__grid">
              <button
                type="button"
                className="ep-wa-dock__btn-option"
                onClick={() => handleSelectSpecies("Cachorro")}
              >
                <span className="ep-wa-dock__btn-emoji">🐶</span>
                <span className="ep-wa-dock__btn-title">Cachorro</span>
              </button>
              <button
                type="button"
                className="ep-wa-dock__btn-option"
                onClick={() => handleSelectSpecies("Gato")}
              >
                <span className="ep-wa-dock__btn-emoji">🐱</span>
                <span className="ep-wa-dock__btn-title">Gato</span>
              </button>
              <button
                type="button"
                className="ep-wa-dock__btn-option"
                onClick={() => handleSelectSpecies("Múltiplos Pets")}
              >
                <span className="ep-wa-dock__btn-emoji">🐾</span>
                <span className="ep-wa-dock__btn-title">Mais de 1 Pet</span>
              </button>
              <button
                type="button"
                className="ep-wa-dock__btn-option"
                onClick={() => handleSelectSpecies("Exótico")}
              >
                <span className="ep-wa-dock__btn-emoji">🦜</span>
                <span className="ep-wa-dock__btn-title">Outro Pet</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pet Details (1-Tap Weight & Breed Presets + Bold CTA) */}
        {currentStep === "pet_details" && !isTyping && !thinkingText && (
          <form onSubmit={handleConfirmPetDetails} className="ep-wa-dock__step">
            {/* Weight Presets */}
            <div className="ep-wa-dock__field-group">
              <div className="ep-wa-dock__label-row">
                <span className="ep-wa-dock__label">Faixa de Peso do Pet:</span>
                <span className="ep-wa-dock__badge-micro">1 toque</span>
              </div>
              <div className="ep-wa-dock__chips-scroll">
                {weightPresets.map((preset) => {
                  const isSelected = petWeight === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      className={`ep-wa-dock__chip ${isSelected ? "ep-wa-dock__chip--active" : ""}`}
                      onClick={() => setPetWeight(preset.value)}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Breed Quick Select or Custom Input */}
            <div className="ep-wa-dock__field-group">
              <div className="ep-wa-dock__label-row">
                <span className="ep-wa-dock__label">Raça / Porte:</span>
                <button
                  type="button"
                  className="ep-wa-dock__link-toggle"
                  onClick={() => setCustomBreedMode(!customBreedMode)}
                >
                  {customBreedMode ? "Ver sugestões rápidas" : "Digitar outra raça"}
                </button>
              </div>

              {!customBreedMode ? (
                <div className="ep-wa-dock__chips-scroll">
                  {popularBreeds.map((b) => {
                    const isSelected = petBreed === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        className={`ep-wa-dock__chip ${isSelected ? "ep-wa-dock__chip--active" : ""}`}
                        onClick={() => setPetBreed(b)}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  className="ep-wa-dock__input"
                  type="text"
                  placeholder="Ex: Maltês, Pastor Alemão, SRD..."
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  autoFocus
                />
              )}
            </div>

            {/* Bold Primary CTA */}
            <button
              type="submit"
              className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--bold"
            >
              <span>CONFIRMAR PERFIL DO PET</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </form>
        )}

        {/* Step 3: Route Selection (1-Tap Flags & Country Chips) */}
        {currentStep === "route" && !isTyping && !thinkingText && (
          <div className="ep-wa-dock__step">
            <span className="ep-wa-dock__hint">Selecione o país de destino:</span>

            {!isCustomDestination ? (
              <div className="ep-wa-dock__grid ep-wa-dock__grid--destinations">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.code}
                    type="button"
                    className="ep-wa-dock__btn-dest"
                    onClick={() => handleSelectDestination(dest.label)}
                  >
                    <img
                      src={countryFlagSvg(dest.code)}
                      alt=""
                      className="ep-wa-dock__dest-flag"
                    />
                    <span className="ep-wa-dock__dest-name">{dest.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="ep-wa-dock__btn-dest ep-wa-dock__btn-dest--more"
                  onClick={() => setIsCustomDestination(true)}
                >
                  <Plus size={15} />
                  <span>Outro país...</span>
                </button>
              </div>
            ) : (
              <div className="ep-wa-dock__input-row">
                <input
                  className="ep-wa-dock__input"
                  type="text"
                  placeholder="Digite o país de destino..."
                  value={customDestinationInput}
                  onChange={(e) => setCustomDestinationInput(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--compact ep-wa-dock__cta-btn--bold"
                  disabled={!customDestinationInput.trim()}
                  onClick={() => handleSelectDestination(customDestinationInput.trim())}
                >
                  <span>OK</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Period Selection (1-Tap Presets) */}
        {currentStep === "period" && !isTyping && !thinkingText && (
          <div className="ep-wa-dock__step">
            <span className="ep-wa-dock__hint">Quando vocês pretendem viajar?</span>
            <div className="ep-wa-dock__period-list">
              {travelPeriods.map((period) => (
                <button
                  key={period.value}
                  type="button"
                  className="ep-wa-dock__period-btn"
                  onClick={() => handleSelectPeriod(period.value)}
                >
                  <span>{period.label}</span>
                  <ChevronRight size={15} className="ep-wa-dock__period-arrow" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Contact Lead Form + Bold CTA */}
        {currentStep === "contact" && !isTyping && !thinkingText && (
          <form onSubmit={handleContactSubmit} className="ep-wa-dock__step">
            <div className="ep-wa-dock__input-row">
              <input
                className="ep-wa-dock__input"
                type="text"
                required
                placeholder="Seu Nome Completo"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
              />
            </div>

            <div className="ep-wa-dock__phone-row">
              <select
                className="ep-wa-dock__select"
                value={phoneCountry.code}
                onChange={(e) => {
                  const selected = phoneCountries.find((c) => c.code === e.target.value) ?? phoneCountries[0];
                  setPhoneCountry(selected);
                }}
              >
                {phoneCountries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.dial} ({c.code})
                  </option>
                ))}
              </select>
              <input
                className="ep-wa-dock__input ep-wa-dock__input--phone"
                type="tel"
                required
                placeholder="DDD + WhatsApp"
                value={tutorPhone}
                onChange={(e) => setTutorPhone(formatPhoneNumber(e.target.value, phoneCountry.code))}
              />
            </div>

            <div className="ep-wa-dock__reassurance">
              <Lock size={12} className="ep-wa-dock__lock-icon" />
              <span>Análise gratuita e confidencial. Sem ligações indesejadas.</span>
            </div>

            <button
              type="submit"
              className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--bold"
              disabled={isSubmitting || !tutorName.trim() || !tutorPhone.trim()}
            >
              {isSubmitting ? (
                <span>GERANDO PRÉ-DIAGNÓSTICO...</span>
              ) : (
                <>
                  <span>GERAR PRÉ-DIAGNÓSTICO OFICIAL</span>
                  <ArrowRight size={17} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 6: Direct WhatsApp Handoff (Extra Bold CTA) */}
        {currentStep === "complete" && completedWhatsAppUrl && (
          <div className="ep-wa-dock__step">
            <a
              href={completedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-wa-final-cta ep-wa-final-cta--bold"
            >
              <Phone size={18} />
              <span>ABRIR CONVERSA COM THAMIRES FELIX ➔</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

