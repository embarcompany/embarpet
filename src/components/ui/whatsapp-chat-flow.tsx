"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckCheck,
  ArrowRight,
  Phone,
  ShieldCheck,
  Plus,
  Sparkles,
} from "lucide-react";
import { submitLead, type PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";
import { countryFlagSvg } from "../../lib/country-flag";
import { useLocale } from "../../i18n/locale";

type ChatStep = "greeting" | "pet_details" | "route" | "period" | "contact" | "complete";

type ChatMessage = {
  id: string;
  sender: "thamires" | "user" | "system";
  text?: string;
  highlightTag?: string;
  time: string;
  quickReplies?: Array<{
    label: string;
    icon?: string | ReactNode;
    onClick: () => void;
  }>;
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

const travelPeriods = [
  "Dentro de 1 a 3 meses",
  "De 3 a 6 meses",
  "De 6 a 12 meses",
  "Sem data definida",
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
  const { locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<ChatStep>("greeting");

  // Form Data
  const [petSpecies, setPetSpecies] = useState("Cachorro");
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [routeOrigin, setRouteOrigin] = useState(initialRoute.origin || "Brasil");
  const [routeDestination, setRouteDestination] = useState(initialRoute.destination || "");
  const [travelPeriod, setTravelPeriod] = useState(initialRoute.period || "");
  const [tutorName, setTutorName] = useState("");
  const [tutorPhone, setTutorPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customDestinationInput, setCustomDestinationInput] = useState("");
  const [isCustomDestination, setIsCustomDestination] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, thinkingText]);

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
    thoughtDuration = 700,
    typingDuration = 550
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
          quickReplies: [
            { label: "Cachorro", icon: "🐶", onClick: () => handleSelectSpecies("Cachorro") },
            { label: "Gato", icon: "🐱", onClick: () => handleSelectSpecies("Gato") },
            { label: "Hamster", icon: "🐹", onClick: () => handleSelectSpecies("Hamster") },
            { label: "Ave / Exótico", icon: "🦜", onClick: () => handleSelectSpecies("Exótico") },
            { label: "Mais de um pet", icon: "🐾", onClick: () => handleSelectSpecies("Múltiplos Pets") },
          ],
        },
      ]);
    }, 600);

    return () => clearTimeout(timer1);
  }, []);

  // Step 1: Handle Species Selection
  const handleSelectSpecies = (species: string) => {
    trackStart();
    setPetSpecies(species);
    const time = getNowTime();

    // User message
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
      let followUp = "Perfeito! Para calcularmos o compartimento ideal (Cabine, Bagagem Acompanhada ou Cargas Vivas) e o tamanho da caixa, me informe a raça e o peso aproximado:";
      if (species === "Gato") {
        followUp = "Excelente! Para felinos, precisamos conferir as medidas e peso para indicar a melhor acomodação de voo. Me informe a raça e o peso aproximado:";
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

  // Step 2: Submit Pet Details with Deep Conditional Intelligence
  const handleConfirmPetDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petBreed.trim() && !petWeight.trim()) return;

    const time = getNowTime();
    const displayName = petName.trim() || (petSpecies === "Gato" ? "seu gatinho" : "seu pet");
    const weightNum = parseFloat(petWeight.replace(",", ".")) || 0;

    // Intelligent Brachycephalic Check
    const isBrachy = /buld|bulldog|pug|shih|boxer|pekin|lhasa|persa|boston|cavalier|shar\s*pei|malt[eê]s/i.test(petBreed);
    const isSmall = weightNum > 0 && weightNum <= 8;

    const detailsSummary = [
      petName ? `Nome: ${petName}` : null,
      petBreed ? `Raça: ${petBreed}` : null,
      petWeight ? `Peso: ${petWeight} kg` : null,
    ].filter(Boolean).join(" • ");

    const userMsg: ChatMessage = {
      id: `user-pet-details-${Date.now()}`,
      sender: "user",
      text: detailsSummary || `${petSpecies} (informações enviadas)`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("route");

    const thoughtText = isBrachy
      ? "Identificando perfil braquicefálico e selecionando companhias aéreas com aclimatação reforçada..."
      : isSmall
      ? "Calculando elegibilidade para Viagem na Cabine de Passageiros..."
      : "Dimensionando compartimento climatizado (Bagagem Acompanhada / Carga Viva)...";

    triggerAiResponse(thoughtText, () => {
      let dynamicInsight = "";
      if (isBrachy) {
        dynamicInsight = `Identifiquei que o(a) ${displayName} é de perfil braquicefálico (focinho curto). As cias aéreas possuem cuidados especiais com caixas de ventilação 360° e limites térmicos. Já incluí essas salvaguardas no planejamento!`;
      } else if (isSmall) {
        dynamicInsight = `Com aproximadamente ${petWeight} kg, o(a) ${displayName} tem excelentes chances de ser aprovado(a) na **Cabine de Passageiros** com você!`;
      } else {
        dynamicInsight = `Para o porte do(a) ${displayName} (${petWeight} kg), a viagem opera com **Bagagem Acompanhada no porão pressurizado e climatizado** ou **Carga Viva Dedicada**, garantindo espaço amplo para ele(a) ficar em pé e dar uma volta completa.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-route-${Date.now()}`,
        sender: "thamires",
        text: `${dynamicInsight}\n\nAgora me conte: de qual país para qual país vocês pretendem viajar?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 3: Handle Route Selection with Deep Country Conditional Intelligence
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
        destinationInsight = `Excelente! Para os **Estados Unidos**, alinhamos o novo formulário do CDC (CDC Dog Import Form), microchip ISO e comprovação de vacinação antirrábica oficial para garantir entrada ágil sem surpresas.`;
      } else if (isEU) {
        destinationInsight = `Destino maravilhoso! Para a **União Europeia (${dest})**, o protocolo exige Microchip ISO padrão 11784 aplicado antes da vacina da raiva, eventual laudo de sorologia e emissão do CVI oficial pelo Ministério da Agricultura (MAPA).`;
      } else if (isMercosul) {
        destinationInsight = `Perfeito! Para a **${dest} (Mercosul)**, o processo é mais ágil, exigindo CVI com laudo de desparasitação interna e externa recente e atestado de saúde veterinário.`;
      } else {
        destinationInsight = `Ótima rota! Mapeamos as diretrizes da autoridade sanitária local de **${dest}** para garantir um desembarque 100% em conformidade.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-period-${Date.now()}`,
        sender: "thamires",
        text: `${destinationInsight}\n\nE para quando você planeja essa viagem?`,
        time: getNowTime(),
        quickReplies: travelPeriods.map((period) => ({
          label: period,
          onClick: () => handleSelectPeriod(period, dest),
        })),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 4: Handle Period Selection
  const handleSelectPeriod = (period: string, dest: string) => {
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
      destination: dest,
    });

    const isUrgent = /1 a 3 meses/i.test(period);
    const thoughtText = isUrgent
      ? "Calculando janela prioritária de agendamento Vigiagro e reserva aérea..."
      : "Estruturando cronograma sanitário preventivo e janelas de vacinação...";

    triggerAiResponse(thoughtText, () => {
      const timingAdvice = isUrgent
        ? "Prazo ideal para iniciarmos os laudos agora e garantirmos a reserva de espaço na aeronave sem correria!"
        : "Excelente antecedência! Teremos tempo hábil perfeito para cumprir todas as etapas com tranquilidade.";

      const botMsg: ChatMessage = {
        id: `bot-contact-${Date.now()}`,
        sender: "thamires",
        text: `${timingAdvice}\n\nPara eu compilar o pré-diagnóstico completo da sua rota e continuarmos a conversa no WhatsApp, qual o seu nome e número?`,
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
      size: `${petBreed ? petBreed + " " : ""}${petWeight ? "(" + petWeight + "kg)" : ""}`.trim() || undefined,
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
      // Continue so the tutor can always reach WhatsApp even if network glitch occurs
    }

    const waText = encodeURIComponent(
      `Olá Thamires! Preenchi o pré-diagnóstico no site da Embarpet para meu pet (${petSpecies} - ${petBreed || "sem raça definida"}).\n\n` +
      `✈️ Rota: ${routeOrigin} ➔ ${routeDestination || "Internacional"}\n` +
      `📅 Previsão: ${travelPeriod || "A definir"}\n` +
      `👤 Tutor: ${tutorName}\n\n` +
      `Gostaria de tirar dúvidas e dar andamento ao planejamento!`
    );

    const whatsappUrl = `https://wa.me/5511978253579?text=${waText}`;

    setTimeout(() => {
      setThinkingText(null);
      setIsTyping(false);
      setIsSubmitting(false);

      const firstName = tutorName.split(" ")[0] || "Tutor(a)";
      const botMsg: ChatMessage = {
        id: `bot-complete-${Date.now()}`,
        sender: "thamires",
        text: `Prontinho, ${firstName}! 🎉 Mapeei a sua rota para ${routeDestination || "o exterior"} e as diretrizes do seu pet. Toque no botão abaixo para abrir a nossa conversa oficial no WhatsApp e darmos o próximo passo!`,
        time: getNowTime(),
        card: (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ep-wa-final-cta"
          >
            <Phone size={17} />
            <span>Abrir WhatsApp com Thamires Felix ➔</span>
          </a>
        ),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="ep-wa-body" role="log" aria-live="polite">
      <div className="ep-wa-date-pill">Hoje</div>

      {/* Messages List */}
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

          {/* Quick Replies */}
          {msg.quickReplies && currentStep === "greeting" && (
            <div className="ep-wa-chips">
              {msg.quickReplies.map((reply, i) => (
                <button
                  key={i}
                  type="button"
                  className="ep-wa-chip"
                  onClick={reply.onClick}
                >
                  {reply.icon && <span>{reply.icon}</span>}
                  <span>{reply.label}</span>
                </button>
              ))}
            </div>
          )}

          {msg.quickReplies && currentStep === "period" && (
            <div className="ep-wa-chips">
              {msg.quickReplies.map((reply, i) => (
                <button
                  key={i}
                  type="button"
                  className="ep-wa-chip"
                  onClick={reply.onClick}
                >
                  <span>{reply.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Custom Card (CTA etc) */}
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

      {/* Interactive Form for Step 2: Pet Details */}
      {currentStep === "pet_details" && !isTyping && !thinkingText && (
        <form onSubmit={handleConfirmPetDetails} className="ep-wa-card">
          <div className="ep-wa-card__row">
            <div className="ep-wa-card__field">
              <label className="ep-wa-card__label">Nome do Pet (opcional)</label>
              <input
                className="ep-wa-card__input"
                type="text"
                placeholder="Ex: Luna, Thor..."
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>
          </div>
          <div className="ep-wa-card__row">
            <div className="ep-wa-card__field">
              <label className="ep-wa-card__label">Raça / Porte</label>
              <input
                className="ep-wa-card__input"
                type="text"
                required
                placeholder="Ex: Golden, Bulldog, SRD..."
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
              />
            </div>
            <div className="ep-wa-card__field" style={{ maxWidth: "110px" }}>
              <label className="ep-wa-card__label">Peso (kg)</label>
              <input
                className="ep-wa-card__input"
                type="text"
                required
                placeholder="Ex: 12"
                value={petWeight}
                onChange={(e) => setPetWeight(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="ep-wa-card__btn">
            <span>Confirmar Perfil do Pet</span>
            <ArrowRight size={14} />
          </button>
        </form>
      )}

      {/* Interactive Form for Step 3: Route */}
      {currentStep === "route" && !isTyping && !thinkingText && (
        <div className="ep-wa-card">
          <span className="ep-wa-card__label">Selecione o Destino Principal:</span>
          <div className="ep-wa-chips" style={{ marginTop: 0 }}>
            {popularDestinations.map((dest) => (
              <button
                key={dest.code}
                type="button"
                className="ep-wa-chip"
                onClick={() => handleSelectDestination(dest.label)}
              >
                <img
                  src={countryFlagSvg(dest.code)}
                  alt=""
                  style={{ width: 16, height: "auto", borderRadius: 2 }}
                />
                <span>{dest.label}</span>
              </button>
            ))}
          </div>

          {!isCustomDestination ? (
            <button
              type="button"
              className="ep-wa-chip"
              style={{ alignSelf: "flex-start", marginTop: 4 }}
              onClick={() => setIsCustomDestination(true)}
            >
              <Plus size={14} />
              <span>Outro País / Destino</span>
            </button>
          ) : (
            <div className="ep-wa-card__row" style={{ marginTop: 4 }}>
              <input
                className="ep-wa-card__input"
                type="text"
                placeholder="Digite o país de destino..."
                value={customDestinationInput}
                onChange={(e) => setCustomDestinationInput(e.target.value)}
              />
              <button
                type="button"
                className="ep-wa-card__btn"
                style={{ width: "auto", padding: "0 14px" }}
                disabled={!customDestinationInput.trim()}
                onClick={() => handleSelectDestination(customDestinationInput.trim())}
              >
                OK
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Form for Step 5: Contact Details */}
      {currentStep === "contact" && !isTyping && !thinkingText && (
        <form onSubmit={handleContactSubmit} className="ep-wa-card">
          <div className="ep-wa-card__field">
            <label className="ep-wa-card__label">Seu Nome Completo</label>
            <input
              className="ep-wa-card__input"
              type="text"
              required
              placeholder="Ex: Camila Silva"
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
            />
          </div>

          <div className="ep-wa-card__field">
            <label className="ep-wa-card__label">WhatsApp para contato</label>
            <div className="ep-wa-card__row">
              <select
                className="ep-wa-card__select"
                style={{ width: "110px", flex: "0 0 110px" }}
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
                className="ep-wa-card__input"
                type="tel"
                required
                placeholder="DDD + Número"
                value={tutorPhone}
                onChange={(e) => setTutorPhone(formatPhoneNumber(e.target.value, phoneCountry.code))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="ep-wa-card__btn"
            disabled={isSubmitting || !tutorName.trim() || !tutorPhone.trim()}
          >
            {isSubmitting ? (
              <span>Gerando pré-diagnóstico...</span>
            ) : (
              <>
                <span>Gerar Pré-Diagnóstico Oficial</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      )}

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
  );
}
