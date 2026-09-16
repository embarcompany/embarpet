"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckCheck,
  ArrowRight,
  ArrowLeft,
  Phone,
  Plus,
  Sparkles,
  Lock,
  ChevronRight,
  Check,
  User,
  PawPrint,
  PlaneTakeoff,
  PlaneLanding,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Zap,
  Plane,
  Calendar,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { submitLead, type PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";
import { countryFlagSvg } from "../../lib/country-flag";

export function WhatsAppIconSvg({ size = 18, color = "#25D366" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color, flexShrink: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.675-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.509-.678-.518-.175-.009-.376-.009-.577-.009-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.721.23 1.377.197 1.896.12.578-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.175-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.522 2 2.036 6.486 2.036 12c0 1.96.568 3.788 1.549 5.334L2 22l4.821-1.544c1.488.91 3.228 1.444 5.219 1.444 5.518 0 10.004-4.486 10.004-10S17.558 2 12.04 2z" />
    </svg>
  );
}

type ChatStep = "greeting" | "pet_details" | "origin" | "destination" | "period" | "contact" | "complete";

type ChatMessage = {
  id: string;
  sender: "thamires" | "user" | "system";
  text?: string;
  time: string;
  card?: ReactNode;
};

const mainSpeciesOptions = [
  { label: "Cachorro", value: "Cachorro", icon: Dog, isFull: false },
  { label: "Gato", value: "Gato", icon: Cat, isFull: false },
  { label: "Roedor", value: "Roedor", icon: Rabbit, isFull: false },
  { label: "Ave", value: "Ave", icon: Bird, isFull: false },
  { label: "Outro Pet / Exótico", value: "Outro Pet / Exótico", icon: Sparkles, isFull: true },
];

const popularOrigins = [
  { label: "Brasil", code: "BR" },
  { label: "Estados Unidos", code: "US" },
  { label: "Portugal", code: "PT" },
  { label: "Argentina", code: "AR" },
  { label: "Outro país", code: "OTHER" },
];

const popularDestinations = [
  { label: "Estados Unidos", code: "US" },
  { label: "Portugal", code: "PT" },
  { label: "Espanha", code: "ES" },
  { label: "Itália", code: "IT" },
  { label: "Argentina", code: "AR" },
  { label: "Uruguai", code: "UY" },
  { label: "Outro país", code: "OTHER" },
];

const dogBreeds = [
  "Spitz / Lulu",
  "Golden / Labrador",
  "Bulldog / Pug",
  "Shih Tzu / Lhasa",
  "Yorkshire / Maltês",
  "Pastor / Border",
];

const catBreeds = [
  "Siamês",
  "Persa (Braqui)",
  "Maine Coon",
  "Bengal",
  "Ragdoll",
  "Gato Comum",
];

const exoticPets = [
  "Calopsita",
  "Coelho / Porquinho",
  "Furão / Ferret",
  "Papagaio",
  "Réptil",
  "Outra Espécie",
];

const travelPeriods = [
  { label: "Em até 30 dias (Urgente)", value: "Em até 30 dias (Urgente)", icon: Zap, tag: "Prioritário" },
  { label: "Dentro de 1 a 3 meses", value: "Dentro de 1 a 3 meses", icon: Plane, tag: "Ideal" },
  { label: "De 3 a 6 meses", value: "De 3 a 6 meses", icon: Calendar, tag: "Planejado" },
  { label: "Apenas planejando", value: "Apenas planejando", icon: Clock, tag: "Pesquisa" },
];

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

// Markdown Bold Parser for Chat Messages
function renderFormattedChatText(text: string): ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="ep-wa-bold-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
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
  const [stepHistory, setStepHistory] = useState<Array<{ step: ChatStep; msgCount: number }>>([]);

  // Form State
  const [petSpecies, setPetSpecies] = useState("Cachorro");
  const [petBreed, setPetBreed] = useState("");
  const [isSrd, setIsSrd] = useState(false);

  const availableBreeds = petSpecies === "Gato" ? catBreeds : (petSpecies === "Roedor" || petSpecies === "Ave" || petSpecies === "Outro Pet / Exótico") ? exoticPets : dogBreeds;

  const [routeOrigin, setRouteOrigin] = useState(initialRoute.origin || "Brasil");
  const [routeDestination, setRouteDestination] = useState(initialRoute.destination || "");
  const [customOriginInput, setCustomOriginInput] = useState("");
  const [isCustomOrigin, setIsCustomOrigin] = useState(false);

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

  // Helper for AI Thought transition with Realistic Thought Duration (1.75s)
  const triggerAiResponse = (
    thoughtLabel: string,
    action: () => void,
    thoughtDuration = 1750,
    typingDuration = 450
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

  // Step Back Navigation
  const handleGoBack = () => {
    if (stepHistory.length === 0 || isTyping || thinkingText) return;
    const previous = stepHistory[stepHistory.length - 1];
    setStepHistory((prev) => prev.slice(0, -1));
    setCurrentStep(previous.step);
    setMessages((prev) => prev.slice(0, previous.msgCount));
  };

  const pushStep = (nextStep: ChatStep, currentMsgCount: number) => {
    setStepHistory((prev) => [...prev, { step: currentStep, msgCount: currentMsgCount }]);
    setCurrentStep(nextStep);
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
          text: "Olá! Sou a Thamires Felix da Embarpet. Vou te ajudar a traçar a rota internacional mais segura para o seu pet.",
          time,
        },
        {
          id: "q-species",
          sender: "thamires",
          text: "Qual pet vai viajar com você?",
          time,
        },
      ]);
    }, 400);

    return () => clearTimeout(timer1);
  }, []);

  // Step 1: Handle Species Selection (1-Tap)
  const handleSelectSpecies = (species: string) => {
    trackStart();
    setPetSpecies(species);
    setPetBreed("");
    setIsSrd(false);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-species-${Date.now()}`,
      sender: "user",
      text: `${species}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("pet_details", messages.length);

    const thoughtText = species === "Gato"
      ? "Consultando diretrizes IATA para felinos e caixas homologadas..."
      : species === "Cachorro"
      ? "Consultando regras de transporte internacional para caninos..."
      : "Verificando exigências para animais especiais...";

    triggerAiResponse(thoughtText, () => {
      const followUp = `Perfeito! Qual a raça ou tipo do seu **${species === "Gato" ? "gatinho" : species === "Cachorro" ? "cãozinho" : "pet"}**?`;
      const botMsg: ChatMessage = {
        id: `bot-pet-details-${Date.now()}`,
        sender: "thamires",
        text: followUp,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 2: Submit Pet Details (Breed or SRD)
  const handleConfirmPetDetails = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const defaultBreedFallback = petSpecies === "Gato" ? "Gato Doméstico" : petSpecies === "Ave" ? "Ave / Pássaro" : petSpecies === "Roedor" ? "Roedor" : "SRD (Sem raça definida)";
    const resolvedBreed = isSrd ? "Sem raça específica (SRD)" : petBreed.trim() || defaultBreedFallback;

    const time = getNowTime();
    const isBrachy = /buld|bulldog|pug|shih|boxer|pekin|lhasa|persa|boston|cavalier|shar\s*pei|malt[eê]s/i.test(resolvedBreed);

    const userMsg: ChatMessage = {
      id: `user-pet-details-${Date.now()}`,
      sender: "user",
      text: `Raça: ${resolvedBreed}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("origin", messages.length);

    const thoughtText = isBrachy
      ? "Identificando perfil braquicefálico e selecionando cias com aclimatação reforçada..."
      : "Analisando protocolos sanitários e aclimatação da rota...";

    triggerAiResponse(thoughtText, () => {
      let dynamicInsight = "";
      if (isBrachy) {
        dynamicInsight = `Identifiquei o **perfil braquicefálico (focinho curto)**. Já selecionei companhias com controle de temperatura rigoroso e caixas IATA com ventilação 360°.`;
      } else {
        dynamicInsight = `Excelente! Perfil **${resolvedBreed}** mapeado para planejamento sanitário seguro e homologado.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-origin-${Date.now()}`,
        sender: "thamires",
        text: `${dynamicInsight}\n\nDe onde o pet vai sair?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 3: Handle Origin Selection (Micro-step 1)
  const handleSelectOrigin = (origin: string) => {
    setRouteOrigin(origin);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-origin-${Date.now()}`,
      sender: "user",
      text: `Origem: ${origin}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("destination", messages.length);

    const thoughtText = `Mapeando aeroportos e procedimentos de saída em ${origin}...`;

    triggerAiResponse(thoughtText, () => {
      const botMsg: ChatMessage = {
        id: `bot-dest-${Date.now()}`,
        sender: "thamires",
        text: `Origem confirmada em **${origin}**.\n\nPara onde o pet vai viajar?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 4: Handle Destination Selection (Micro-step 2)
  const handleSelectDestination = (dest: string) => {
    setRouteDestination(dest);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-dest-${Date.now()}`,
      sender: "user",
      text: `Destino: ${dest}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("period", messages.length);

    const isUS = /estados unidos|usa|eua|united states/i.test(dest);
    const isEU = /portugal|espanha|it[aá]lia|fran[cç]a|alemanha|europa|ue/i.test(dest);
    const isMercosul = /argentina|uruguai|paraguai|chile/i.test(dest);

    const thoughtText = isUS
      ? "Consultando diretrizes CDC (CDC Dog Import Form) e protocolos USDA/MAPA..."
      : isEU
      ? "Verificando Regulamento UE 576/2013, microchip ISO 11784 e emissão de CVI..."
      : isMercosul
      ? "Consultando normas sanitárias Mercosul e desparasitação oficial..."
      : `Consultando exigências sanitárias bilaterais para rota ${routeOrigin} ➔ ${dest}...`;

    triggerAiResponse(thoughtText, () => {
      let destinationInsight = "";
      if (isUS) {
        destinationInsight = `Excelente! Para os **Estados Unidos**, aplicamos o **formulário oficial do CDC (CDC Dog Import)**, **microchip ISO** e vacinação em dia para entrada imediata sem retenção.`;
      } else if (isEU) {
        destinationInsight = `Perfeito! Para a **Europa (${dest})**, cuidamos do **Microchip ISO**, emissão do **CVI oficial pelo MAPA** e laudo de sorologia.`;
      } else if (isMercosul) {
        destinationInsight = `Ótima rota! Para **${dest}**, o processo é ágil, com **CVI oficial**, desparasitação recente e atestado veterinário.`;
      } else {
        destinationInsight = `Mapeamos os requisitos da autoridade sanitária de **${dest}** para um desembarque 100% regularizado.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-period-${Date.now()}`,
        sender: "thamires",
        text: `${destinationInsight}\n\nPara quando é a previsão dessa viagem?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 5: Handle Period Selection (1-Tap)
  const handleSelectPeriod = (period: string) => {
    setTravelPeriod(period);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-period-${Date.now()}`,
      sender: "user",
      text: `Previsão: ${period}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("contact", messages.length);

    trackConversionEvent("pets_completed", {
      source: analyticsSource,
      format: "whatsapp_chat",
      species: petSpecies,
      destination: routeDestination,
    });

    const isUrgent = /30 dias|urgente/i.test(period);
    const thoughtText = isUrgent
      ? "Priorizando janela de agendamento Vigiagro e reserva de espaço prioritário no voo..."
      : "Estruturando cronograma sanitário preventivo e laudos veterinários...";

    triggerAiResponse(thoughtText, () => {
      const timingAdvice = isUrgent
        ? "Prazo prioritário! Recomendo iniciarmos os laudos imediatamente para assegurar vaga no voo."
        : "Excelente antecedência! Teremos tempo hábil para cumprir cada etapa com total tranquilidade.";

      const botMsg: ChatMessage = {
        id: `bot-contact-${Date.now()}`,
        sender: "thamires",
        text: `${timingAdvice}\n\n**Último passo!** Onde posso te enviar o pré-diagnóstico completo no WhatsApp?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 6: Final Submission and WhatsApp URL Generation
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
      size: (isSrd ? "Sem raça específica (SRD)" : petBreed.trim()) || "Não especificado",
      name: tutorName.trim(),
      phone: fullPhone,
      consent: true,
    };

    const userMsg: ChatMessage = {
      id: `user-lead-${Date.now()}`,
      sender: "user",
      text: `Nome: ${tutorName.trim()}\nWhatsApp: ${fullPhone}`,
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
      // Graceful fallback
    }

    const waText = encodeURIComponent(
      `Olá Thamires! Preenchi o pré-diagnóstico no site da Embarpet para meu pet (${petSpecies} - ${isSrd ? "sem raça definida" : petBreed || "sem raça definida"}).\n\n` +
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
        text: `Prontinho, ${firstName}! Pré-diagnóstico gerado com sucesso para a rota **${routeOrigin} ➔ ${routeDestination || "o exterior"}**. Toque no botão verde abaixo para abrir nossa conversa no WhatsApp!`,
        time: getNowTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  // Step Progress Metadata (Goal Gradient Effect)
  const stepMeta = {
    greeting: { step: 1, total: 5, percent: 20, label: "Passo 1 de 5", title: "Perfil do Pet", isFinal: false },
    pet_details: { step: 2, total: 5, percent: 40, label: "Passo 2 de 5", title: "Raça do Pet", isFinal: false },
    origin: { step: 3, total: 5, percent: 60, label: "Passo 3 de 5", title: "País de Origem", isFinal: false },
    destination: { step: 4, total: 5, percent: 80, label: "Passo 4 de 5", title: "País de Destino", isFinal: false },
    period: { step: 5, total: 5, percent: 90, label: "Passo 5 de 5", title: "Previsão de Viagem", isFinal: false },
    contact: { step: 5, total: 5, percent: 95, label: "Quase pronto!", title: "Último passo • Quase pronto!", isFinal: true },
    complete: { step: 5, total: 5, percent: 100, label: "Concluído", title: "100% Concluído", isFinal: true },
  }[currentStep];

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
                {renderFormattedChatText(msg.text)}
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
              <Sparkles size={14} />
            </span>
            <span className="ep-wa-thought-pill__text">{thinkingText}</span>
          </div>
        )}

        {/* Typing Indicator (WhatsApp Native Dots Only) */}
        {isTyping && !thinkingText && (
          <div className="ep-wa-typing">
            <div className="ep-wa-typing__dot" />
            <div className="ep-wa-typing__dot" />
            <div className="ep-wa-typing__dot" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 2. Interactive Bottom Dock (Zero Horizontal Scroll • 52px+ Pill Inputs • Solid Colors) */}
      <div className="ep-wa-dock">
        {/* Navigation & Progressive Goal Gradient Bar */}
        {currentStep !== "complete" && (
          <div className="ep-wa-dock__progress-wrap">
            <div className="ep-wa-dock__progress-info">
              <div className="ep-wa-dock__step-row">
                {stepHistory.length > 0 ? (
                  <button
                    type="button"
                    className="ep-wa-dock__back-btn"
                    onClick={handleGoBack}
                    title="Voltar para a pergunta anterior"
                  >
                    <ArrowLeft size={13} />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <span className="ep-wa-dock__step-indicator">Início</span>
                )}
                <span className={`ep-wa-dock__progress-label ${stepMeta.isFinal ? "ep-wa-dock__progress-label--urgent" : ""}`}>
                  {stepMeta.title}
                </span>
              </div>
              <span className="ep-wa-dock__progress-badge">
                {stepMeta.percent}%
              </span>
            </div>
            <div className="ep-wa-dock__progress-track">
              <div
                className={`ep-wa-dock__progress-fill ${stepMeta.isFinal ? "ep-wa-dock__progress-fill--final" : ""}`}
                style={{ width: `${stepMeta.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Species Selection (2x2 cards for main 4 + 2-column card for Outro Pet + text button for multiple pets) */}
        {currentStep === "greeting" && !isTyping && (
          <div className="ep-wa-dock__step">
            <div className="ep-wa-dock__grid ep-wa-dock__grid--species">
              {mainSpeciesOptions.map((opt) => {
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`ep-wa-dock__btn-species ${opt.isFull ? "ep-wa-dock__btn-species--full" : ""}`}
                    onClick={() => handleSelectSpecies(opt.value)}
                  >
                    <div className="ep-wa-dock__species-icon-wrap">
                      <IconComponent size={23} className="ep-wa-dock__species-icon" />
                    </div>
                    <span className="ep-wa-dock__species-title">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="ep-wa-dock__species-footer">
              <button
                type="button"
                className="ep-wa-dock__species-text-btn"
                onClick={() => handleSelectSpecies("Múltiplos Pets")}
              >
                <PawPrint size={15} />
                <span>Viajar com mais de 1 pet</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Breed / Pet Details (SRD Badge Inside Input on the Right + Strikethrough AI Suggestions) */}
        {currentStep === "pet_details" && !isTyping && !thinkingText && (
          <form onSubmit={handleConfirmPetDetails} className="ep-wa-dock__step">
            <div className="ep-wa-dock__field-group">
              <span className="ep-wa-dock__label">
                Raça ou tipo do seu {petSpecies === "Gato" ? "gato" : petSpecies === "Cachorro" ? "cão" : "pet"}:
              </span>

              {/* Input with SRD Badge Button inside on the right */}
              <div className="ep-wa-dock__input-wrap">
                <PawPrint size={18} className="ep-wa-dock__input-icon" />
                <input
                  className={`ep-wa-dock__input ep-wa-dock__input--with-icon ep-wa-dock__input--with-srd ${isSrd ? "ep-wa-dock__input--srd-active" : ""}`}
                  type="text"
                  placeholder={isSrd ? "Sem raça específica (SRD)" : "Digite a raça do pet..."}
                  value={isSrd ? "Sem raça específica (SRD)" : petBreed}
                  onChange={(e) => {
                    setIsSrd(false);
                    setPetBreed(e.target.value);
                  }}
                  disabled={isSrd}
                  autoFocus={!isSrd}
                />
                <button
                  type="button"
                  className={`ep-wa-dock__srd-badge-btn ${isSrd ? "ep-wa-dock__srd-badge-btn--active" : ""}`}
                  onClick={() => {
                    const nextSrd = !isSrd;
                    setIsSrd(nextSrd);
                    if (nextSrd) {
                      setPetBreed("Sem raça específica (SRD)");
                    } else {
                      setPetBreed("");
                    }
                  }}
                >
                  {isSrd ? "✕ Sem raça (SRD)" : "Sem raça (SRD)"}
                </button>
              </div>

              {/* Suggestion Chips (Strikethrough / tachadas when SRD is active) */}
              <div className="ep-wa-dock__suggestions-container">
                <span className={`ep-wa-dock__suggestions-label ${isSrd ? "ep-wa-dock__suggestions-label--disabled" : ""}`}>
                  <Sparkles size={12} />
                  Sugestões da IA:
                </span>
                <div className="ep-wa-dock__chips-wrap">
                  {availableBreeds.map((b) => {
                    const isSelected = !isSrd && petBreed === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        disabled={isSrd}
                        className={`ep-wa-dock__chip ${isSelected ? "ep-wa-dock__chip--active" : ""} ${isSrd ? "ep-wa-dock__chip--struck" : ""}`}
                        onClick={() => {
                          setIsSrd(false);
                          setPetBreed(b);
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bold Solid Primary CTA */}
            <button
              type="submit"
              className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--bold"
            >
              <span>CONFIRMAR PERFIL DO PET</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </form>
        )}

        {/* Step 3: Origin Selection (Separate Micro-step with "Outro país" full width) */}
        {currentStep === "origin" && !isTyping && !thinkingText && (
          <div className="ep-wa-dock__step">
            <div className="ep-wa-dock__field-group">
              <span className="ep-wa-dock__label">
                <PlaneTakeoff size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 5, color: "#00a884" }} />
                De onde o pet vai sair? (Origem)
              </span>

              {!isCustomOrigin ? (
                <div className="ep-wa-dock__grid ep-wa-dock__grid--destinations">
                  {popularOrigins.map((orig) => {
                    const isFullWidth = orig.code === "OTHER";
                    return (
                      <button
                        key={orig.code}
                        type="button"
                        className={`ep-wa-dock__btn-dest ${isFullWidth ? "ep-wa-dock__btn-dest--full" : ""}`}
                        onClick={() => {
                          if (orig.code === "OTHER") {
                            setIsCustomOrigin(true);
                          } else {
                            handleSelectOrigin(orig.label);
                          }
                        }}
                      >
                        {orig.code !== "OTHER" ? (
                          <img src={countryFlagSvg(orig.code)} alt="" className="ep-wa-dock__dest-flag" />
                        ) : (
                          <Plus size={16} />
                        )}
                        <span className="ep-wa-dock__dest-name">{orig.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="ep-wa-dock__input-row">
                  <div className="ep-wa-dock__input-wrap">
                    <PlaneTakeoff size={17} className="ep-wa-dock__input-icon" />
                    <input
                      className="ep-wa-dock__input ep-wa-dock__input--with-icon"
                      type="text"
                      placeholder="Digite o país de origem..."
                      value={customOriginInput}
                      onChange={(e) => setCustomOriginInput(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button
                    type="button"
                    className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--compact ep-wa-dock__cta-btn--bold"
                    disabled={!customOriginInput.trim()}
                    onClick={() => handleSelectOrigin(customOriginInput.trim())}
                  >
                    <span>OK</span>
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Destination Selection (Separate Micro-step with "Outro país" full width) */}
        {currentStep === "destination" && !isTyping && !thinkingText && (
          <div className="ep-wa-dock__step">
            <div className="ep-wa-dock__field-group">
              <span className="ep-wa-dock__label">
                <PlaneLanding size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 5, color: "#00a884" }} />
                Para onde o pet vai viajar? (Destino)
              </span>

              {!isCustomDestination ? (
                <div className="ep-wa-dock__grid ep-wa-dock__grid--destinations">
                  {popularDestinations.map((dest) => {
                    const isFullWidth = dest.code === "OTHER";
                    return (
                      <button
                        key={dest.code}
                        type="button"
                        className={`ep-wa-dock__btn-dest ${isFullWidth ? "ep-wa-dock__btn-dest--full" : ""}`}
                        onClick={() => {
                          if (dest.code === "OTHER") {
                            setIsCustomDestination(true);
                          } else {
                            handleSelectDestination(dest.label);
                          }
                        }}
                      >
                        {dest.code !== "OTHER" ? (
                          <img
                            src={countryFlagSvg(dest.code)}
                            alt=""
                            className="ep-wa-dock__dest-flag"
                          />
                        ) : (
                          <Plus size={16} />
                        )}
                        <span className="ep-wa-dock__dest-name">{dest.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="ep-wa-dock__input-row">
                  <div className="ep-wa-dock__input-wrap">
                    <PlaneLanding size={18} className="ep-wa-dock__input-icon" />
                    <input
                      className="ep-wa-dock__input ep-wa-dock__input--with-icon"
                      type="text"
                      placeholder="Digite o país de destino..."
                      value={customDestinationInput}
                      onChange={(e) => setCustomDestinationInput(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button
                    type="button"
                    className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--compact ep-wa-dock__cta-btn--bold"
                    disabled={!customDestinationInput.trim()}
                    onClick={() => handleSelectDestination(customDestinationInput.trim())}
                  >
                    <span>OK</span>
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Period Selection (52px Touch Targets with Lucide Icons) */}
        {currentStep === "period" && !isTyping && !thinkingText && (
          <div className="ep-wa-dock__step">
            <div className="ep-wa-dock__period-list">
              {travelPeriods.map((period) => {
                const PeriodIcon = period.icon;
                return (
                  <button
                    key={period.value}
                    type="button"
                    className="ep-wa-dock__period-btn"
                    onClick={() => handleSelectPeriod(period.value)}
                  >
                    <div className="ep-wa-dock__period-btn-left">
                      <div className="ep-wa-dock__period-icon-wrap">
                        <PeriodIcon size={17} className="ep-wa-dock__period-icon" />
                      </div>
                      <span className="ep-wa-dock__period-text">{period.label}</span>
                    </div>
                    <div className="ep-wa-dock__period-btn-right">
                      <span className="ep-wa-dock__period-tag">{period.tag}</span>
                      <ChevronRight size={16} className="ep-wa-dock__period-arrow" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 6: Contact Lead Form (DDI with Flag + WhatsApp Icon in Phone input) */}
        {currentStep === "contact" && !isTyping && !thinkingText && (
          <form onSubmit={handleContactSubmit} className="ep-wa-dock__step">
            <div className="ep-wa-dock__input-wrap">
              <User size={18} className="ep-wa-dock__input-icon" />
              <input
                className="ep-wa-dock__input ep-wa-dock__input--with-icon"
                type="text"
                required
                placeholder="Seu Nome Completo"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
              />
            </div>

            <div className="ep-wa-dock__phone-group">
              <div className="ep-wa-dock__ddi-wrap">
                <img
                  src={countryFlagSvg(phoneCountry.code)}
                  alt=""
                  className="ep-wa-dock__ddi-flag"
                />
                <select
                  className="ep-wa-dock__select ep-wa-dock__phone-select"
                  value={phoneCountry.code}
                  onChange={(e) => {
                    const selected = phoneCountries.find((c) => c.code === e.target.value) ?? phoneCountries[0];
                    setPhoneCountry(selected);
                  }}
                  aria-label="Código do país"
                >
                  {phoneCountries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.dial} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="ep-wa-dock__input-wrap ep-wa-dock__phone-input-wrap">
                <div className="ep-wa-dock__input-icon ep-wa-dock__input-icon--whatsapp">
                  <WhatsAppIconSvg size={19} />
                </div>
                <input
                  className="ep-wa-dock__input ep-wa-dock__input--with-icon ep-wa-dock__phone-input"
                  type="tel"
                  required
                  placeholder="DDD + WhatsApp"
                  value={tutorPhone}
                  onChange={(e) => setTutorPhone(formatPhoneNumber(e.target.value, phoneCountry.code))}
                />
              </div>
            </div>

            <div className="ep-wa-dock__reassurance">
              <ShieldCheck size={15} className="ep-wa-dock__shield-icon" />
              <span>Análise 100% gratuita, oficial e segura. Envio direto no WhatsApp.</span>
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
                  <ArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 7: Direct WhatsApp Handoff (Extra Bold Solid CTA) */}
        {currentStep === "complete" && completedWhatsAppUrl && (
          <div className="ep-wa-dock__step">
            <a
              href={completedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-wa-final-cta ep-wa-final-cta--bold"
            >
              <Phone size={19} />
              <span>ABRIR CONVERSA COM THAMIRES FELIX ➔</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
