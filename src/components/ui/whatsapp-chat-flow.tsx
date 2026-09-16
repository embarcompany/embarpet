"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckCheck,
  ArrowRight,
  ArrowLeft,
  Phone,
  Plus,
  Minus,
  Sparkles,
  ChevronRight,
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
  Search,
} from "lucide-react";
import { submitLead, type PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";
import { countryFlagSvg } from "../../lib/country-flag";
import { useCountrySuggestions } from "../../hooks/use-country-suggestions";
import { searchAiBreeds, normalizeText } from "../../data/pet-species-database";

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
  { label: "Espanha", code: "ES" },
  { label: "Itália", code: "IT" },
  { label: "França", code: "FR" },
  { label: "Argentina", code: "AR" },
  { label: "Uruguai", code: "UY" },
  { label: "Outro país", code: "OTHER" },
];

const popularDestinations = [
  { label: "Estados Unidos", code: "US" },
  { label: "Portugal", code: "PT" },
  { label: "Espanha", code: "ES" },
  { label: "Itália", code: "IT" },
  { label: "França", code: "FR" },
  { label: "Alemanha", code: "DE" },
  { label: "Argentina", code: "AR" },
  { label: "Uruguai", code: "UY" },
  { label: "Outro país", code: "OTHER" },
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
  onStatusChange,
}: {
  initialRoute?: {
    origin?: string;
    destination?: string;
    period?: string;
  };
  analyticsSource?: string;
  onComplete?: (lead: PublicLead) => void;
  onStatusChange?: (status: "online" | "digitando..." | "anotando...") => void;
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

  // Multi-Pet Selector State
  const [isMultiPetMode, setIsMultiPetMode] = useState(false);
  const [multiCounts, setMultiCounts] = useState({
    dogs: 1,
    cats: 1,
    rodents: 0,
    birds: 0,
    others: 0,
  });

  const totalMultiPets =
    multiCounts.dogs +
    multiCounts.cats +
    multiCounts.rodents +
    multiCounts.birds +
    multiCounts.others;

  const updateMultiCount = (type: keyof typeof multiCounts, delta: number) => {
    setMultiCounts((prev) => {
      const nextVal = Math.max(0, Math.min(10, prev[type] + delta));
      return { ...prev, [type]: nextVal };
    });
  };

  const formatMultiSummary = () => {
    const parts: string[] = [];
    if (multiCounts.dogs > 0) parts.push(`${multiCounts.dogs} ${multiCounts.dogs > 1 ? "Cães" : "Cão"}`);
    if (multiCounts.cats > 0) parts.push(`${multiCounts.cats} ${multiCounts.cats > 1 ? "Gatos" : "Gato"}`);
    if (multiCounts.rodents > 0) parts.push(`${multiCounts.rodents} ${multiCounts.rodents > 1 ? "Roedores" : "Roedor"}`);
    if (multiCounts.birds > 0) parts.push(`${multiCounts.birds} ${multiCounts.birds > 1 ? "Aves" : "Ave"}`);
    if (multiCounts.others > 0) parts.push(`${multiCounts.others} Outro(s)`);
    if (parts.length === 0) return "Múltiplos Pets";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} e ${parts[1]}`;
    return `${parts.slice(0, -1).join(", ")} e ${parts[parts.length - 1]}`;
  };

  // Real-Time AI Breed Suggestions Bank (140+ database)
  const dynamicAiBreeds = searchAiBreeds(petBreed, petSpecies, 12);

  const [routeOrigin, setRouteOrigin] = useState(initialRoute.origin || "Brasil");
  const [routeDestination, setRouteDestination] = useState(initialRoute.destination || "");
  const [customOriginInput, setCustomOriginInput] = useState("");
  const [isCustomOrigin, setIsCustomOrigin] = useState(false);

  const [customDestinationInput, setCustomDestinationInput] = useState("");
  const [isCustomDestination, setIsCustomDestination] = useState(false);

  // Country Suggestions Hooks for Origin & Destination
  const originSuggestions = useCountrySuggestions(customOriginInput, isCustomOrigin, "pt-BR");
  const destinationSuggestions = useCountrySuggestions(customDestinationInput, isCustomDestination, "pt-BR");

  const [travelPeriod, setTravelPeriod] = useState(initialRoute.period || "");
  const [tutorName, setTutorName] = useState("");
  const [tutorPhone, setTutorPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedWhatsAppUrl, setCompletedWhatsAppUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, thinkingText, currentStep, isMultiPetMode, isCustomOrigin, isCustomDestination, petBreed]);

  const trackStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackConversionEvent("analysis_started", {
      source: analyticsSource,
      format: "whatsapp_chat",
    });
  };

  // Helper for AI Thought transition with Realistic Thought Duration (1.5s) and Typing Duration (1.35s)
  const triggerAiResponse = (
    thoughtLabel: string,
    action: () => void,
    thoughtDuration = 1500,
    typingDuration = 1350
  ) => {
    setThinkingText(thoughtLabel);
    setIsTyping(false);
    onStatusChange?.("anotando...");

    setTimeout(() => {
      setThinkingText(null);
      setIsTyping(true);
      onStatusChange?.("digitando...");

      setTimeout(() => {
        setIsTyping(false);
        onStatusChange?.("online");
        action();
      }, typingDuration);
    }, thoughtDuration);
  };

  // Step Back Navigation
  const handleGoBack = () => {
    if (isMultiPetMode) {
      setIsMultiPetMode(false);
      return;
    }
    if (isCustomOrigin) {
      setIsCustomOrigin(false);
      return;
    }
    if (isCustomDestination) {
      setIsCustomDestination(false);
      return;
    }
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

  // Initial Greeting from Thamires Felix (with natural typing duration)
  useEffect(() => {
    const time = getNowTime();
    setIsTyping(true);
    onStatusChange?.("digitando...");

    const timer1 = setTimeout(() => {
      setIsTyping(false);
      onStatusChange?.("online");
      setMessages([
        {
          id: "intro-text",
          sender: "thamires",
          text: "Olá! Sou a **Thamires Felix** da **Embarpet**. Vou te ajudar a traçar a **rota internacional mais segura** para o seu pet.",
          time,
        },
        {
          id: "q-species",
          sender: "thamires",
          text: "Para iniciarmos seu diagnóstico oficial, **qual pet vai viajar com você?**",
          time,
        },
      ]);
    }, 1200);

    return () => clearTimeout(timer1);
  }, []);

  // Step 1A: Handle Single Species Selection (1-Tap)
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
      ? "Thamires está anotando os detalhes e consultando diretrizes IATA para felinos..."
      : species === "Cachorro"
      ? "Thamires está anotando os detalhes e consultando regras IATA para caninos..."
      : "Thamires está anotando os detalhes e verificando exigências para pets especiais...";

    triggerAiResponse(thoughtText, () => {
      const followUp = `Perfeito! Qual a **raça ou perfil** do seu **${species === "Gato" ? "gatinho" : species === "Cachorro" ? "cãozinho" : "pet"}**?`;
      const botMsg: ChatMessage = {
        id: `bot-pet-details-${Date.now()}`,
        sender: "thamires",
        text: followUp,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 1B: Handle Multi-Pet Confirmation
  const handleConfirmMultiPets = () => {
    if (totalMultiPets === 0) return;
    trackStart();
    const summary = formatMultiSummary();
    setPetSpecies(summary);
    setPetBreed("");
    setIsSrd(false);
    setIsMultiPetMode(false);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-species-${Date.now()}`,
      sender: "user",
      text: `${summary} (${totalMultiPets} pets)`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("pet_details", messages.length);

    const thoughtText = `Thamires está anotando os detalhes e calculando caixas de transporte homologadas para ${totalMultiPets} pets...`;

    triggerAiResponse(thoughtText, () => {
      const followUp = `Perfeito! Já registrei o planejamento para **${summary}**.\n\nQuais as **raças ou portes** dos pets?`;
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
    const defaultBreedFallback = petSpecies.toLowerCase().includes("gato")
      ? "Gato Doméstico"
      : petSpecies.toLowerCase().includes("ave")
      ? "Ave / Pássaro"
      : petSpecies.toLowerCase().includes("roedor")
      ? "Roedor"
      : "SRD (Sem raça definida)";
    const resolvedBreed = isSrd ? "Sem raça específica (SRD)" : petBreed.trim() || defaultBreedFallback;

    const time = getNowTime();
    const isBrachy = /buld|bulldog|pug|shih|boxer|pekin|lhasa|persa|boston|cavalier|shar\s*pei|malt[eê]s/i.test(resolvedBreed);

    const userMsg: ChatMessage = {
      id: `user-pet-details-${Date.now()}`,
      sender: "user",
      text: `Perfil: ${resolvedBreed}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("origin", messages.length);

    const thoughtText = isBrachy
      ? "Thamires está anotando o perfil braquicefálico e selecionando companhias aéreas com aclimatação reforçada..."
      : "Thamires está anotando as características e mapeando protocolos sanitários da rota...";

    triggerAiResponse(thoughtText, () => {
      let dynamicInsight = "";
      if (isBrachy) {
        dynamicInsight = `Identifiquei o **perfil braquicefálico (focinho curto)**. Já selecionei companhias aéreas com **controle de temperatura ativo** e **caixas IATA com ventilação 360°**.`;
      } else {
        dynamicInsight = `Excelente! Perfil **${resolvedBreed}** registrado para **planejamento sanitário homologado**.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-origin-${Date.now()}`,
        sender: "thamires",
        text: `${dynamicInsight}\n\nDe qual **país ou cidade** o pet vai sair? (Origem)`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 3: Handle Origin Selection (Micro-step 1)
  const handleSelectOrigin = (origin: string) => {
    setIsCustomOrigin(false);
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

    const thoughtText = `Thamires está mapeando procedimentos de saída e emissão sanitária em ${origin}...`;

    triggerAiResponse(thoughtText, () => {
      const botMsg: ChatMessage = {
        id: `bot-dest-${Date.now()}`,
        sender: "thamires",
        text: `Origem confirmada em **${origin}**.\n\nPara qual **país de destino** o pet vai viajar?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 4: Handle Destination Selection (Micro-step 2)
  const handleSelectDestination = (dest: string) => {
    setIsCustomDestination(false);
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
      ? "Thamires está consultando diretrizes CDC (CDC Dog Import Form) e protocolos USDA/MAPA..."
      : isEU
      ? "Thamires está verificando Regulamento UE 576/2013, microchip ISO 11784 e emissão de CVI..."
      : isMercosul
      ? "Thamires está consultando normas sanitárias Mercosul e desparasitação oficial..."
      : `Thamires está consultando acordos bilaterais e exigências de entrada para ${dest}...`;

    triggerAiResponse(thoughtText, () => {
      let destinationInsight = "";
      if (isUS) {
        destinationInsight = `Excelente! Para os **Estados Unidos**, cuidamos do **formulário oficial do CDC (CDC Dog Import)**, **microchip padrão ISO** e vacinação para **desembarque imediato sem retenção**.`;
      } else if (isEU) {
        destinationInsight = `Perfeito! Para a **Europa (${dest})**, cuidamos do **Microchip ISO**, emissão do **CVI oficial pelo MAPA/Vigiagro** e todos os laudos necessários.`;
      } else if (isMercosul) {
        destinationInsight = `Ótima rota! Para **${dest}**, o processo é ágil, com **CVI oficial emitido pelo MAPA**, **desparasitação oficial** e atestado veterinário credenciado.`;
      } else {
        destinationInsight = `Mapeamos todas as exigências sanitárias de **${dest}** para um **desembarque 100% seguro e regularizado**.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-period-${Date.now()}`,
        sender: "thamires",
        text: `${destinationInsight}\n\nPara quando é a **previsão de embarque** dessa viagem?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 5: Handle Period Selection (1-Tap) -> Positive Viability Gate
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
      ? `Thamires está calculando viabilidade técnica prioritária e janelas de emissão para ${routeOrigin} ➔ ${routeDestination || "o exterior"}...`
      : `Thamires está calculando cronograma sanitário preventivo para ${routeOrigin} ➔ ${routeDestination || "o exterior"}...`;

    triggerAiResponse(thoughtText, () => {
      const botMsg: ChatMessage = {
        id: `bot-contact-${Date.now()}`,
        sender: "thamires",
        text: `Boas notícias! Analisei os requisitos para a rota **${routeOrigin} ➔ ${routeDestination || "o exterior"}** com previsão **${period}**:\n\n✅ **SIM! É 100% viável e seguro realizar a viagem no prazo informado.**\n\nCaso você queira falar com nossa equipe de especialistas e **iniciar o planejamento oficial da viagem agora**, basta preencher seu WhatsApp abaixo para receber o cronograma completo:`,
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
    setThinkingText("Thamires está consolidando o laudo de pré-diagnóstico e conectando ao WhatsApp oficial...");
    onStatusChange?.("anotando...");

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
      onStatusChange?.("online");

      const firstName = tutorName.split(" ")[0] || "Tutor(a)";
      const botMsg: ChatMessage = {
        id: `bot-complete-${Date.now()}`,
        sender: "thamires",
        text: `Prontinho, **${firstName}**! Pré-diagnóstico gerado com sucesso para a rota **${routeOrigin} ➔ ${routeDestination || "o exterior"}**.\n\nToque no botão verde abaixo para **iniciar seu atendimento prioritário no WhatsApp** com a especialista **Thamires Felix**!`,
        time: getNowTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 700);
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
      {/* 1. Scrollable In-Stream Conversational Body (All interactions happen in-stream) */}
      <div className="ep-wa-body" role="log" aria-live="polite">
        <div className="ep-wa-date-pill">Hoje</div>

        {/* Message Stream */}
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

        {/* ACTIVE IN-STREAM INTERACTIVE TURN (Authentic WhatsApp Outgoing Green Bubble) */}
        {!isTyping && !thinkingText && currentStep !== "complete" && (
          <div className="ep-wa-stream-turn">
            <div className="ep-wa-bubble ep-wa-bubble--outgoing ep-wa-bubble--active">
              {/* Step 1: Species Selection */}
              {currentStep === "greeting" && !isMultiPetMode && (
                <div className="ep-wa-stream-card">
                  <div className="ep-wa-stream-card__header">
                    <PawPrint size={15} className="ep-wa-stream-card__header-icon" />
                    <span>Escolha uma opção para responder:</span>
                  </div>

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
                            <IconComponent size={22} className="ep-wa-dock__species-icon" />
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
                      onClick={() => setIsMultiPetMode(true)}
                    >
                      <PawPrint size={15} />
                      <span>Viajar com mais de 1 pet</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1 (Multi-Pet Mode): In-Stream Low-friction Stepper Counters */}
              {currentStep === "greeting" && isMultiPetMode && (
                <div className="ep-wa-stream-card">
                  <div className="ep-wa-dock__multi-selector">
                    <div className="ep-wa-dock__multi-header">
                      <span className="ep-wa-dock__label">Quantos pets vão viajar?</span>
                    </div>

                    <div className="ep-wa-dock__counters-grid">
                      <div className="ep-wa-dock__counter-row">
                        <div className="ep-wa-dock__counter-info">
                          <Dog size={17} className="ep-wa-dock__counter-icon" />
                          <span className="ep-wa-dock__counter-label">Cães</span>
                        </div>
                        <div className="ep-wa-dock__counter-stepper">
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("dogs", -1)}
                            disabled={multiCounts.dogs === 0}
                            aria-label="Diminuir cães"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="ep-wa-dock__counter-val">{multiCounts.dogs}</span>
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("dogs", 1)}
                            aria-label="Aumentar cães"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="ep-wa-dock__counter-row">
                        <div className="ep-wa-dock__counter-info">
                          <Cat size={17} className="ep-wa-dock__counter-icon" />
                          <span className="ep-wa-dock__counter-label">Gatos</span>
                        </div>
                        <div className="ep-wa-dock__counter-stepper">
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("cats", -1)}
                            disabled={multiCounts.cats === 0}
                            aria-label="Diminuir gatos"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="ep-wa-dock__counter-val">{multiCounts.cats}</span>
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("cats", 1)}
                            aria-label="Aumentar gatos"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="ep-wa-dock__counter-row">
                        <div className="ep-wa-dock__counter-info">
                          <Rabbit size={17} className="ep-wa-dock__counter-icon" />
                          <span className="ep-wa-dock__counter-label">Roedores</span>
                        </div>
                        <div className="ep-wa-dock__counter-stepper">
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("rodents", -1)}
                            disabled={multiCounts.rodents === 0}
                            aria-label="Diminuir roedores"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="ep-wa-dock__counter-val">{multiCounts.rodents}</span>
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("rodents", 1)}
                            aria-label="Aumentar roedores"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="ep-wa-dock__counter-row">
                        <div className="ep-wa-dock__counter-info">
                          <Bird size={17} className="ep-wa-dock__counter-icon" />
                          <span className="ep-wa-dock__counter-label">Aves</span>
                        </div>
                        <div className="ep-wa-dock__counter-stepper">
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("birds", -1)}
                            disabled={multiCounts.birds === 0}
                            aria-label="Diminuir aves"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="ep-wa-dock__counter-val">{multiCounts.birds}</span>
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("birds", 1)}
                            aria-label="Aumentar aves"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="ep-wa-dock__counter-row ep-wa-dock__counter-row--full">
                        <div className="ep-wa-dock__counter-info">
                          <Sparkles size={17} className="ep-wa-dock__counter-icon" />
                          <span className="ep-wa-dock__counter-label">Outros pets</span>
                        </div>
                        <div className="ep-wa-dock__counter-stepper">
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("others", -1)}
                            disabled={multiCounts.others === 0}
                            aria-label="Diminuir outros"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="ep-wa-dock__counter-val">{multiCounts.others}</span>
                          <button
                            type="button"
                            className="ep-wa-dock__counter-btn"
                            onClick={() => updateMultiCount("others", 1)}
                            aria-label="Aumentar outros"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--bold"
                      disabled={totalMultiPets === 0}
                      onClick={handleConfirmMultiPets}
                    >
                      <span>
                        CONFIRMAR {totalMultiPets > 0 ? `${totalMultiPets} ${totalMultiPets > 1 ? "PETS" : "PET"}` : "PETS"}
                      </span>
                      <ArrowRight size={17} strokeWidth={2.5} />
                    </button>

                    <div className="ep-wa-dock__species-footer">
                      <button
                        type="button"
                        className="ep-wa-dock__species-text-btn"
                        onClick={() => setIsMultiPetMode(false)}
                      >
                        ✕ Voltar para seleção única
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Breed / Pet Details with Real-Time AI Suggestions */}
              {currentStep === "pet_details" && (
                <form onSubmit={handleConfirmPetDetails} className="ep-wa-stream-card">
                  <div className="ep-wa-dock__field-group">
                    <span className="ep-wa-dock__label">
                      Raça ou perfil {petSpecies.toLowerCase().includes("gato") ? "do gato" : petSpecies.toLowerCase().includes("cão") || petSpecies.toLowerCase().includes("cachorro") ? "do cão" : "dos pets"}:
                    </span>

                    {/* Input with SRD Badge Button inside on the right */}
                    <div className="ep-wa-dock__input-wrap">
                      <PawPrint size={18} className="ep-wa-dock__input-icon" />
                      <input
                        className={`ep-wa-dock__input ep-wa-dock__input--with-icon ep-wa-dock__input--with-srd ${isSrd ? "ep-wa-dock__input--srd-active" : ""}`}
                        type="text"
                        placeholder={isSrd ? "Sem raça específica (SRD)" : "Digite a raça ou selecione abaixo..."}
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
                        {isSrd ? "✓ Sem raça (SRD)" : "Sem raça (SRD)"}
                      </button>
                    </div>

                    {/* Dynamic AI Suggestions from 140+ database filtered in real-time */}
                    <div className="ep-wa-dock__suggestions-container">
                      <span className={`ep-wa-dock__suggestions-label ${isSrd ? "ep-wa-dock__suggestions-label--disabled" : ""}`}>
                        <Sparkles size={12} />
                        sugestões da ia
                      </span>
                      <div className="ep-wa-dock__chips-grid">
                        {dynamicAiBreeds.map((b) => {
                          const isSelected = !isSrd && normalizeText(petBreed) === normalizeText(b);
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
                              title={b}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="ep-wa-dock__cta-btn ep-wa-dock__cta-btn--bold"
                  >
                    <span>CONFIRMAR PERFIL DO PET</span>
                    <ArrowRight size={17} strokeWidth={2.5} />
                  </button>
                </form>
              )}

              {/* Step 3: Origin Selection */}
              {currentStep === "origin" && (
                <div className="ep-wa-stream-card">
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
                                <Search size={16} />
                              )}
                              <span className="ep-wa-dock__dest-name">{orig.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="ep-wa-dock__search-container">
                        <div className="ep-wa-dock__input-row">
                          <div className="ep-wa-dock__input-wrap">
                            <Search size={17} className="ep-wa-dock__input-icon" />
                            <input
                              className="ep-wa-dock__input ep-wa-dock__input--with-icon"
                              type="text"
                              placeholder="Digite o país (ex: Japão, Canadá...)"
                              value={customOriginInput}
                              onChange={(e) => setCustomOriginInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && customOriginInput.trim()) {
                                  e.preventDefault();
                                  handleSelectOrigin(customOriginInput.trim());
                                }
                              }}
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

                        {originSuggestions.length > 0 && (
                          <div className="ep-wa-dock__country-dropdown" role="listbox">
                            {originSuggestions.map((s) => (
                              <button
                                key={s.code}
                                type="button"
                                className="ep-wa-dock__country-dropdown-item"
                                onClick={() => {
                                  setCustomOriginInput(s.name);
                                  handleSelectOrigin(s.name);
                                }}
                              >
                                <img src={countryFlagSvg(s.code)} alt="" className="ep-wa-dock__dropdown-flag" />
                                <span className="ep-wa-dock__dropdown-name">{s.name}</span>
                                <span className="ep-wa-dock__dropdown-code">{s.code}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="ep-wa-dock__species-footer">
                          <button
                            type="button"
                            className="ep-wa-dock__species-text-btn"
                            onClick={() => {
                              setIsCustomOrigin(false);
                              setCustomOriginInput("");
                            }}
                          >
                            ✕ Voltar aos países principais
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Destination Selection */}
              {currentStep === "destination" && (
                <div className="ep-wa-stream-card">
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
                                <Search size={16} />
                              )}
                              <span className="ep-wa-dock__dest-name">{dest.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="ep-wa-dock__search-container">
                        <div className="ep-wa-dock__input-row">
                          <div className="ep-wa-dock__input-wrap">
                            <Search size={18} className="ep-wa-dock__input-icon" />
                            <input
                              className="ep-wa-dock__input ep-wa-dock__input--with-icon"
                              type="text"
                              placeholder="Digite o país (ex: Japão, Canadá...)"
                              value={customDestinationInput}
                              onChange={(e) => setCustomDestinationInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && customDestinationInput.trim()) {
                                  e.preventDefault();
                                  handleSelectDestination(customDestinationInput.trim());
                                }
                              }}
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

                        {destinationSuggestions.length > 0 && (
                          <div className="ep-wa-dock__country-dropdown" role="listbox">
                            {destinationSuggestions.map((s) => (
                              <button
                                key={s.code}
                                type="button"
                                className="ep-wa-dock__country-dropdown-item"
                                onClick={() => {
                                  setCustomDestinationInput(s.name);
                                  handleSelectDestination(s.name);
                                }}
                              >
                                <img src={countryFlagSvg(s.code)} alt="" className="ep-wa-dock__dropdown-flag" />
                                <span className="ep-wa-dock__dropdown-name">{s.name}</span>
                                <span className="ep-wa-dock__dropdown-code">{s.code}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="ep-wa-dock__species-footer">
                          <button
                            type="button"
                            className="ep-wa-dock__species-text-btn"
                            onClick={() => {
                              setIsCustomDestination(false);
                              setCustomDestinationInput("");
                            }}
                          >
                            ✕ Voltar aos países principais
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Period Selection */}
              {currentStep === "period" && (
                <div className="ep-wa-stream-card">
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

              {/* Step 6: WhatsApp Native Contact Card */}
              {currentStep === "contact" && (
                <form onSubmit={handleContactSubmit} className="ep-wa-stream-card ep-wa-contact-form">
                  <div className="ep-wa-contact-card__badge">
                    <User size={14} className="ep-wa-contact-card__badge-icon" />
                    <span>Cartão de Contato Oficial</span>
                  </div>

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
                    <span>Análise 100% gratuita, oficial e segura. Envio direto no seu WhatsApp.</span>
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
                        <span>RECEBER CRONOGRAMA OFICIAL</span>
                        <ArrowRight size={18} strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Bottom WhatsApp Message Meta */}
              <div className="ep-wa-bubble__meta ep-wa-bubble__meta--active">
                <span className="ep-wa-bubble__active-hint">Selecione para responder</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>{getNowTime()}</span>
                  <span className="ep-wa-bubble__ticks">
                    <CheckCheck size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Completed State Handoff Button (In-Stream) */}
        {currentStep === "complete" && completedWhatsAppUrl && (
          <div className="ep-wa-stream-turn">
            <div className="ep-wa-stream-card ep-wa-stream-card--complete">
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
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 2. Sleek WhatsApp Native Bottom Bar (Goal Gradient + Back Button + Reassurance) */}
      <div className="ep-wa-bottom-bar">
        <div className="ep-wa-bottom-bar__progress-wrap">
          <div className="ep-wa-bottom-bar__progress-info">
            <div className="ep-wa-bottom-bar__step-row">
              {stepHistory.length > 0 || isMultiPetMode || isCustomOrigin || isCustomDestination ? (
                <button
                  type="button"
                  className="ep-wa-bottom-bar__back-btn"
                  onClick={handleGoBack}
                  title="Voltar para a opção anterior"
                >
                  <ArrowLeft size={13} />
                  <span>Voltar</span>
                </button>
              ) : (
                <span className="ep-wa-bottom-bar__step-indicator">Início</span>
              )}
              <span className={`ep-wa-bottom-bar__progress-label ${stepMeta.isFinal ? "ep-wa-bottom-bar__progress-label--urgent" : ""}`}>
                {isMultiPetMode ? "Quantidade de Pets" : isCustomOrigin ? "Buscar Origem" : isCustomDestination ? "Buscar Destino" : stepMeta.title}
              </span>
            </div>
            <span className="ep-wa-bottom-bar__progress-badge">
              {stepMeta.percent}%
            </span>
          </div>
          <div className="ep-wa-bottom-bar__progress-track">
            <div
              className={`ep-wa-bottom-bar__progress-fill ${stepMeta.isFinal ? "ep-wa-bottom-bar__progress-fill--final" : ""}`}
              style={{ width: `${stepMeta.percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
