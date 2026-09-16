"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckCheck,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Sparkles,
  PawPrint,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Search,
  Send,
  AlertTriangle,
} from "lucide-react";
import { submitLead, type PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";
import { countryFlagSvg } from "../../lib/country-flag";
import { useCountrySuggestions } from "../../hooks/use-country-suggestions";
import { searchAiBreedsDetailed } from "../../data/pet-species-database";

function renderPetCategoryIcon(category: string) {
  switch (category) {
    case "dog":
      return <Dog size={15} className="ep-wa-category-icon" />;
    case "cat":
      return <Cat size={15} className="ep-wa-category-icon" />;
    case "bird":
      return <Bird size={15} className="ep-wa-category-icon" />;
    case "rodent":
      return <Rabbit size={15} className="ep-wa-category-icon" />;
    default:
      return <Sparkles size={15} className="ep-wa-category-icon" />;
  }
}

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
  { label: "Outro pet / Exótico", value: "Outro Pet / Exótico", icon: Sparkles, isFull: true },
];

const multiSpeciesItems = [
  { label: "Cães", key: "dogs" as const, icon: Dog, isFull: false },
  { label: "Gatos", key: "cats" as const, icon: Cat, isFull: false },
  { label: "Roedores", key: "rodents" as const, icon: Rabbit, isFull: false },
  { label: "Aves", key: "birds" as const, icon: Bird, isFull: false },
  { label: "Outros pets", key: "others" as const, icon: Sparkles, isFull: true },
];

const multiPetProfileOptions = [
  { label: "Pequeno / Médio porte", value: "Pequeno / Médio porte", isFull: false },
  { label: "1 Pequeno e 1 Grande", value: "Portes mistos (Pequeno e Grande)", isFull: false },
  { label: "Todos de Grande porte", value: "Todos de Grande porte", isFull: false },
  { label: "Focinho curto (Braquicefálico)", value: "Focinho curto (Braquicefálico)", isFull: false },
  { label: "Sem raça definida (SRD)", value: "Sem raça definida (SRD)", isFull: false },
  { label: "✍️ Digitar raças personalizadas...", value: "CUSTOM", isFull: true },
];

const popularOrigins = [
  { label: "Brasil", code: "BR" },
  { label: "Estados Unidos", code: "US" },
  { label: "Portugal", code: "PT" },
  { label: "Espanha", code: "ES" },
  { label: "Itália", code: "IT" },
  { label: "França", code: "FR" },
  { label: "Argentina", code: "AR" },
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
  { label: "Outro país", code: "OTHER" },
];

const travelPeriods = [
  { label: "Em até 30 dias (Urgente)", value: "Em até 30 dias (Urgente)" },
  { label: "Dentro de 1 a 3 meses", value: "Dentro de 1 a 3 meses" },
  { label: "De 3 a 6 meses", value: "De 3 a 6 meses" },
  { label: "Apenas planejando", value: "Apenas planejando" },
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
  const [isBreedSelected, setIsBreedSelected] = useState(false);

  // Multi-Pet Selector State
  const [isMultiPetMode, setIsMultiPetMode] = useState(false);
  const [isMultiPetFlow, setIsMultiPetFlow] = useState(false);
  const [isCustomMultiBreed, setIsCustomMultiBreed] = useState(false);
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

  // Real-Time AI Breed Suggestions Bank
  const dynamicBreedSuggestions = searchAiBreedsDetailed(petBreed, petSpecies, 8);

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
  }, [messages, isTyping, thinkingText, currentStep, isMultiPetMode, isCustomOrigin, isCustomDestination]);

  const trackStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackConversionEvent("analysis_started", {
      source: analyticsSource,
      format: "whatsapp_chat",
    });
  };

  // Helper for AI Thought transition with Realistic Thought Duration (1.4s) and Typing Duration (1.2s)
  const triggerAiResponse = (
    thoughtLabel: string,
    action: () => void,
    thoughtDuration = 1400,
    typingDuration = 1200
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
    if (isCustomMultiBreed) {
      setIsCustomMultiBreed(false);
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

  // Initial Greeting from Thamires Felix
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
          text: "Olá! Sou a **Thamires Felix** da **Embarpet**. Vou te ajudar com o **diagnóstico e rota internacional** do seu pet.",
          time,
        },
        {
          id: "q-species",
          sender: "thamires",
          text: "Qual pet vai viajar com você?",
          time,
        },
      ]);
    }, 1100);

    return () => clearTimeout(timer1);
  }, []);

  // Step 1A: Handle Single Species Selection (1-Tap)
  const handleSelectSpecies = (species: string) => {
    trackStart();
    setPetSpecies(species);
    setPetBreed("");
    setIsSrd(false);
    setIsMultiPetFlow(false);
    setIsCustomMultiBreed(false);
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
      ? "Consultando diretrizes IATA para felinos..."
      : species === "Cachorro"
      ? "Consultando regras IATA para caninos..."
      : "Verificando exigências para pets especiais...";

    triggerAiResponse(thoughtText, () => {
      const followUp = `Perfeito! Qual a **raça ou perfil** do seu **${species === "Gato" ? "gato" : species === "Cachorro" ? "cão" : "pet"}**?`;
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
    setIsMultiPetFlow(true);
    setIsCustomMultiBreed(false);
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

    const thoughtText = `Calculando caixas de transporte homologadas para ${totalMultiPets} pets...`;

    triggerAiResponse(thoughtText, () => {
      const followUp = `Perfeito! Já registrei o planejamento para **${summary}**.\n\nQual o **porte ou perfil** dos pets?`;
      const botMsg: ChatMessage = {
        id: `bot-pet-details-${Date.now()}`,
        sender: "thamires",
        text: followUp,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 2A: Handle Multi-Pet Profile Quick Selection (1-Tap)
  const handleSelectMultiPetProfile = (profileValue: string) => {
    if (profileValue === "CUSTOM") {
      setIsCustomMultiBreed(true);
      return;
    }

    setPetBreed(profileValue);
    setIsSrd(profileValue.includes("SRD") || profileValue.includes("Sem raça"));
    const time = getNowTime();
    const isBrachy = /braquicef|focinho curto/i.test(profileValue);
    const isMixed = /misto|variado|pequeno e grande/i.test(profileValue);
    const isLarge = /grande porte/i.test(profileValue) && !isMixed;

    const userMsg: ChatMessage = {
      id: `user-pet-profile-${Date.now()}`,
      sender: "user",
      text: `${profileValue}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("origin", messages.length);

    const thoughtText = isBrachy
      ? "Mapeando companhias com controle térmico para braquicefálicos..."
      : isMixed
      ? "Mapeando cabine para o menor e porão pressurizado IATA para o maior..."
      : isLarge
      ? "Dimensionando caixas IATA para pets de grande porte..."
      : "Mapeando logística sanitária para múltiplos pets...";

    triggerAiResponse(thoughtText, () => {
      let dynamicInsight = "";
      if (isBrachy) {
        dynamicInsight = `Identifiquei o perfil **braquicefálico (focinho curto)** no grupo. Já separei as companhias com **controle térmico ativo** e ventilação adequada.`;
      } else if (isMixed) {
        dynamicInsight = `Excelente! Para **portes combinados (1 pequeno e 1 grande)**, planejamos a logística mista: viabilidade de **cabine para o menor** e **caixa IATA homologada no compartimento pressurizado para o maior** no mesmo voo.`;
      } else if (isLarge) {
        dynamicInsight = `Registrado! Para pets de **grande porte**, já dimensionamos as caixas IATA reforçadas e porões pressurizados.`;
      } else {
        dynamicInsight = `Perfil dos pets (**${profileValue}**) registrado com sucesso.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-origin-${Date.now()}`,
        sender: "thamires",
        text: `${dynamicInsight}\n\nDe qual **país ou cidade** os pets vão sair? (Origem)`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 2B: Submit Pet Details (Breed or SRD via composer)
  const handleConfirmPetDetails = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const defaultBreedFallback = isMultiPetFlow
      ? "Múltiplos Pets (Portes Variados)"
      : petSpecies.toLowerCase().includes("gato")
      ? "Gato Doméstico"
      : petSpecies.toLowerCase().includes("ave")
      ? "Ave / Pássaro"
      : petSpecies.toLowerCase().includes("roedor")
      ? "Roedor"
      : "SRD (Sem raça definida)";
    const resolvedBreed = isSrd ? "Sem raça específica (SRD)" : petBreed.trim() || defaultBreedFallback;

    const time = getNowTime();
    const isBrachy = /buld|bulldog|pug|shih|boxer|pekin|lhasa|persa|boston|cavalier|shar\s*pei|malt[eê]s|braqui/i.test(resolvedBreed);

    const userMsg: ChatMessage = {
      id: `user-pet-details-${Date.now()}`,
      sender: "user",
      text: `${resolvedBreed}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("origin", messages.length);

    const thoughtText = isBrachy
      ? "Identificando regras especiais para focinho curto (braquicefálico)..."
      : isMultiPetFlow
      ? "Mapeando logística sanitária para múltiplos pets..."
      : "Mapeando protocolos sanitários da rota...";

    triggerAiResponse(thoughtText, () => {
      let dynamicInsight = "";
      if (isBrachy) {
        dynamicInsight = `Identifiquei o perfil **braquicefálico (focinho curto)**. Já separei as companhias com **controle térmico ativo** e ventilação adequada.`;
      } else if (isMultiPetFlow) {
        dynamicInsight = `Perfil dos pets (**${resolvedBreed}**) registrado com sucesso.`;
      } else {
        dynamicInsight = `Perfil **${resolvedBreed}** registrado com sucesso.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-origin-${Date.now()}`,
        sender: "thamires",
        text: `${dynamicInsight}\n\nDe qual **país ou cidade** ${isMultiPetFlow ? "os pets vão sair" : "o pet vai sair"}? (Origem)`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 3: Handle Origin Selection
  const handleSelectOrigin = (origin: string) => {
    setIsCustomOrigin(false);
    setRouteOrigin(origin);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-origin-${Date.now()}`,
      sender: "user",
      text: `${origin}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("destination", messages.length);

    const thoughtText = `Mapeando procedimentos de saída sanitária em ${origin}...`;

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

  // Step 4: Handle Destination Selection
  const handleSelectDestination = (dest: string) => {
    setIsCustomDestination(false);
    setRouteDestination(dest);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-dest-${Date.now()}`,
      sender: "user",
      text: `${dest}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("period", messages.length);

    const isUS = /estados unidos|usa|eua|united states/i.test(dest);
    const isEU = /portugal|espanha|it[aá]lia|fran[cç]a|alemanha|europa|ue/i.test(dest);
    const isMercosul = /argentina|uruguai|paraguai|chile/i.test(dest);

    const thoughtText = isUS
      ? "Consultando diretrizes CDC Dog Import Form e USDA..."
      : isEU
      ? "Verificando Regulamento UE 576/2013 e microchip ISO..."
      : isMercosul
      ? "Consultando normas sanitárias Mercosul..."
      : `Consultando exigências sanitárias para ${dest}...`;

    triggerAiResponse(thoughtText, () => {
      let destinationInsight = "";
      if (isUS) {
        destinationInsight = `Para os **Estados Unidos**, cuidamos do **formulário oficial do CDC (CDC Dog Import)**, microchip ISO e vacinação para desembarque imediato sem retenção.`;
      } else if (isEU) {
        destinationInsight = `Para a **Europa (${dest})**, cuidamos do **Microchip ISO**, emissão do **CVI oficial pelo MAPA/Vigiagro** e sorologia se necessária.`;
      } else if (isMercosul) {
        destinationInsight = `Para **${dest}**, o processo é ágil, com **CVI oficial do MAPA** e desparasitação oficial.`;
      } else {
        destinationInsight = `Mapeamos todas as exigências sanitárias de **${dest}** para um embarque 100% regularizado.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-period-${Date.now()}`,
        sender: "thamires",
        text: `${destinationInsight}\n\nPara quando é a **previsão de embarque**?`,
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
      text: `${period}`,
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
      ? `Calculando viabilidade prioritária para rota ${routeOrigin} ➔ ${routeDestination || "Exterior"}...`
      : `Calculando cronograma sanitário para rota ${routeOrigin} ➔ ${routeDestination || "Exterior"}...`;

    triggerAiResponse(thoughtText, () => {
      const botMsg: ChatMessage = {
        id: `bot-contact-${Date.now()}`,
        sender: "thamires",
        text: `Boas notícias! Analisei os requisitos para a rota **${routeOrigin} ➔ ${routeDestination || "Exterior"}** com previsão **${period}**:\n\n✅ **SIM! É 100% viável e seguro realizar a viagem no prazo informado.**\n\nPara onde envio seu laudo de viabilidade e o **cronograma oficial no WhatsApp**?`,
        time: getNowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });
  };

  // Step 6: Final Contact Submission
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
      text: `${tutorName.trim()} • ${fullPhone}`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("complete");
    setThinkingText("Gerando pré-diagnóstico e preparando atendimento no WhatsApp...");
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
        text: `Prontinho, **${firstName}**! Pré-diagnóstico gerado com sucesso para a rota **${routeOrigin} ➔ ${routeDestination || "o exterior"}**.\n\nToque no botão abaixo para **abrir seu atendimento no WhatsApp** com a Thamires!`,
        time: getNowTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  // Step Progress Metadata
  const stepMeta = {
    greeting: { percent: 20, title: "Espécie do Pet" },
    pet_details: { percent: 40, title: "Raça ou Perfil" },
    origin: { percent: 60, title: "Origem" },
    destination: { percent: 80, title: "Destino" },
    period: { percent: 90, title: "Previsão de Viagem" },
    contact: { percent: 95, title: "Finalizar Contato" },
    complete: { percent: 100, title: "Concluído" },
  }[currentStep];

  return (
    <div className="ep-wa-container">
      {/* 1. Scrollable Conversational Body */}
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

        {/* AI Thought / Reasoning Pill */}
        {thinkingText && (
          <div className="ep-wa-thought-pill">
            <span className="ep-wa-thought-pill__icon">
              <Sparkles size={13} />
            </span>
            <span className="ep-wa-thought-pill__text">{thinkingText}</span>
          </div>
        )}

        {/* Typing Indicator (3 Bouncing Dots) */}
        {isTyping && !thinkingText && (
          <div className="ep-wa-typing">
            <div className="ep-wa-typing__dot" />
            <div className="ep-wa-typing__dot" />
            <div className="ep-wa-typing__dot" />
          </div>
        )}

        {/* ACTIVE IN-STREAM TURN: Clean, Uncluttered WhatsApp Actions */}
        {!isTyping && !thinkingText && currentStep !== "complete" && (
          <div className="ep-wa-stream-actions">
            {/* Step 1: Species Selection - Clean Quick Replies */}
            {currentStep === "greeting" && !isMultiPetMode && (
              <div className="ep-wa-quick-replies">
                <div className="ep-wa-quick-replies__grid">
                  {mainSpeciesOptions.map((opt) => {
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        className={`ep-wa-quick-reply-btn ${opt.isFull ? "ep-wa-quick-reply-btn--full-span" : ""}`}
                        onClick={() => handleSelectSpecies(opt.value)}
                      >
                        <IconComponent size={16} className="ep-wa-quick-reply-icon" />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="ep-wa-quick-reply-sub"
                  onClick={() => setIsMultiPetMode(true)}
                >
                  <PawPrint size={13} />
                  <span>Viajar com mais de 1 pet</span>
                </button>
              </div>
            )}

            {/* Step 1 (Multi-Pet Mode): Same Quick Replies Grid with Integrated Steppers */}
            {currentStep === "greeting" && isMultiPetMode && (
              <div className="ep-wa-quick-replies">
                <div className="ep-wa-quick-replies__grid">
                  {multiSpeciesItems.map((item) => {
                    const IconComponent = item.icon;
                    const count = multiCounts[item.key];
                    return (
                      <div
                        key={item.key}
                        className={`ep-wa-quick-reply-btn ep-wa-quick-reply-btn--stepper ${
                          item.isFull ? "ep-wa-quick-reply-btn--full-span" : ""
                        }`}
                      >
                        <div className="ep-wa-quick-reply-btn__info">
                          <IconComponent size={16} className="ep-wa-quick-reply-icon" />
                          <span>{item.label}</span>
                        </div>

                        <div className="ep-wa-quick-reply-btn__stepper">
                          <button
                            type="button"
                            className="ep-wa-stepper-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateMultiCount(item.key, -1);
                            }}
                            disabled={count === 0}
                            aria-label={`Diminuir ${item.label}`}
                          >
                            <Minus size={11} />
                          </button>
                          <span className="ep-wa-stepper-count">{count}</span>
                          <button
                            type="button"
                            className="ep-wa-stepper-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateMultiCount(item.key, 1);
                            }}
                            aria-label={`Aumentar ${item.label}`}
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="ep-wa-submit-btn"
                  disabled={totalMultiPets === 0}
                  onClick={handleConfirmMultiPets}
                >
                  <span>Confirmar {totalMultiPets > 0 ? `${totalMultiPets} ${totalMultiPets > 1 ? "pets" : "pet"}` : "pets"}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="ep-wa-quick-reply-sub"
                  onClick={() => setIsMultiPetMode(false)}
                >
                  ✕ Voltar para seleção de 1 pet
                </button>
              </div>
            )}

            {/* Step 2: Breed Selection - Quick Profile Pills for Multi-Pet OR Native WhatsApp Composer */}
            {currentStep === "pet_details" && isMultiPetFlow && !isCustomMultiBreed ? (
              <div className="ep-wa-quick-replies">
                <div className="ep-wa-quick-replies__grid">
                  {multiPetProfileOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`ep-wa-quick-reply-btn ${opt.isFull ? "ep-wa-quick-reply-btn--full-span" : ""}`}
                      onClick={() => handleSelectMultiPetProfile(opt.value)}
                    >
                      {opt.value.includes("Pequeno / Médio") && <PawPrint size={14} className="ep-wa-quick-reply-icon" />}
                      {opt.value.includes("mistos") && <Sparkles size={14} className="ep-wa-quick-reply-icon" />}
                      {opt.value.includes("Grande") && !opt.value.includes("mistos") && <Dog size={14} className="ep-wa-quick-reply-icon" />}
                      {opt.value.includes("Braquicefálico") && <AlertTriangle size={14} style={{ color: "#d97706", flexShrink: 0 }} />}
                      {opt.value.includes("SRD") && <PawPrint size={14} className="ep-wa-quick-reply-icon" />}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : currentStep === "pet_details" ? (
              <form onSubmit={handleConfirmPetDetails} className="ep-wa-msg-composer">
                <div className="ep-wa-msg-composer__row">
                  <div className="ep-wa-msg-composer__input-wrap">
                    <input
                      className={`ep-wa-msg-composer__input ${isSrd ? "ep-wa-msg-composer__input--srd" : ""}`}
                      type="text"
                      placeholder={
                        isSrd
                          ? "Sem raça específica (SRD)"
                          : isMultiPetFlow
                          ? "Ex: 1 Golden e 1 Shih Tzu..."
                          : "Digite a raça do pet..."
                      }
                      value={isSrd ? "Sem raça específica (SRD)" : petBreed}
                      onChange={(e) => {
                        setIsSrd(false);
                        setIsBreedSelected(false);
                        setPetBreed(e.target.value);
                      }}
                      disabled={isSrd}
                      autoFocus={!isSrd}
                    />

                    {/* Minimalist AI Suggestions Dropdown (Floating Overlay) */}
                    {!isSrd && !isBreedSelected && petBreed.trim().length > 0 && (
                      <div className="ep-wa-dropdown-list" role="listbox">
                        {dynamicBreedSuggestions.length > 0 ? (
                          dynamicBreedSuggestions.map((item) => (
                            <button
                              key={item.name}
                              type="button"
                              className="ep-wa-dropdown-item"
                              onClick={() => {
                                setIsSrd(false);
                                setPetBreed(item.name);
                                setIsBreedSelected(true);
                              }}
                            >
                              <div className="ep-wa-dropdown-item__left">
                                {renderPetCategoryIcon(item.category)}
                                <span>{item.name}</span>
                              </div>
                              {item.isBrachy && (
                                <span className="ep-wa-dropdown-item__tag">
                                  Braquicefálico
                                </span>
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="ep-wa-dropdown-empty">
                            <span>Pressione enviar para usar &quot;{petBreed}&quot;</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="ep-wa-msg-composer__send-btn"
                    disabled={!isSrd && !petBreed.trim()}
                    aria-label="Enviar"
                    title="Enviar resposta"
                  >
                    <Send size={15} />
                  </button>
                </div>

                {/* Quick SRD Button */}
                <div className="ep-wa-msg-composer__footer">
                  <button
                    type="button"
                    className={`ep-wa-srd-btn ${isSrd ? "ep-wa-srd-btn--active" : ""}`}
                    onClick={() => {
                      const nextSrd = !isSrd;
                      setIsSrd(nextSrd);
                      setIsBreedSelected(false);
                      if (nextSrd) {
                        setPetBreed("Sem raça específica (SRD)");
                      } else {
                        setPetBreed("");
                      }
                    }}
                  >
                    <span>{isSrd ? "✓ Sem raça definida (SRD)" : "🐾 Sem raça específica (SRD / Vira-lata)"}</span>
                  </button>
                  {isMultiPetFlow && (
                    <button
                      type="button"
                      className="ep-wa-quick-reply-sub"
                      onClick={() => setIsCustomMultiBreed(false)}
                      style={{ marginTop: 6 }}
                    >
                      ✕ Voltar para opções de perfil rápido
                    </button>
                  )}
                </div>
              </form>
            ) : null}

            {/* Step 3: Origin Selection - Clean Quick Replies */}
            {currentStep === "origin" && (
              <div className="ep-wa-quick-replies">
                {!isCustomOrigin ? (
                  <div className="ep-wa-quick-replies__grid ep-wa-quick-replies__grid--countries">
                    {popularOrigins.map((orig) => (
                      <button
                        key={orig.code}
                        type="button"
                        className="ep-wa-quick-reply-btn"
                        onClick={() => {
                          if (orig.code === "OTHER") {
                            setIsCustomOrigin(true);
                          } else {
                            handleSelectOrigin(orig.label);
                          }
                        }}
                      >
                        {orig.code !== "OTHER" ? (
                          <img src={countryFlagSvg(orig.code)} alt="" className="ep-wa-flag-icon" />
                        ) : (
                          <Search size={14} />
                        )}
                        <span>{orig.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="ep-wa-msg-composer">
                    <div className="ep-wa-msg-composer__row">
                      <div className="ep-wa-msg-composer__input-wrap">
                        <input
                          className="ep-wa-msg-composer__input"
                          type="text"
                          placeholder="Digite o país de saída..."
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

                        {originSuggestions.length > 0 && (
                          <div className="ep-wa-dropdown-list" role="listbox">
                            {originSuggestions.map((s) => (
                              <button
                                key={s.code}
                                type="button"
                                className="ep-wa-dropdown-item"
                                onClick={() => {
                                  setCustomOriginInput(s.name);
                                  handleSelectOrigin(s.name);
                                }}
                              >
                                <div className="ep-wa-dropdown-item__left">
                                  <img src={countryFlagSvg(s.code)} alt="" className="ep-wa-flag-icon" />
                                  <span>{s.name}</span>
                                </div>
                                <span className="ep-wa-code-pill">{s.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="ep-wa-msg-composer__send-btn"
                        disabled={!customOriginInput.trim()}
                        onClick={() => handleSelectOrigin(customOriginInput.trim())}
                        aria-label="Enviar país"
                      >
                        <Send size={15} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="ep-wa-quick-reply-sub"
                      onClick={() => {
                        setIsCustomOrigin(false);
                        setCustomOriginInput("");
                      }}
                    >
                      ✕ Voltar aos países principais
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Destination Selection - Clean Quick Replies */}
            {currentStep === "destination" && (
              <div className="ep-wa-quick-replies">
                {!isCustomDestination ? (
                  <div className="ep-wa-quick-replies__grid ep-wa-quick-replies__grid--countries">
                    {popularDestinations.map((dest) => (
                      <button
                        key={dest.code}
                        type="button"
                        className="ep-wa-quick-reply-btn"
                        onClick={() => {
                          if (dest.code === "OTHER") {
                            setIsCustomDestination(true);
                          } else {
                            handleSelectDestination(dest.label);
                          }
                        }}
                      >
                        {dest.code !== "OTHER" ? (
                          <img src={countryFlagSvg(dest.code)} alt="" className="ep-wa-flag-icon" />
                        ) : (
                          <Search size={14} />
                        )}
                        <span>{dest.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="ep-wa-msg-composer">
                    <div className="ep-wa-msg-composer__row">
                      <div className="ep-wa-msg-composer__input-wrap">
                        <input
                          className="ep-wa-msg-composer__input"
                          type="text"
                          placeholder="Digite o país de destino..."
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

                        {destinationSuggestions.length > 0 && (
                          <div className="ep-wa-dropdown-list" role="listbox">
                            {destinationSuggestions.map((s) => (
                              <button
                                key={s.code}
                                type="button"
                                className="ep-wa-dropdown-item"
                                onClick={() => {
                                  setCustomDestinationInput(s.name);
                                  handleSelectDestination(s.name);
                                }}
                              >
                                <div className="ep-wa-dropdown-item__left">
                                  <img src={countryFlagSvg(s.code)} alt="" className="ep-wa-flag-icon" />
                                  <span>{s.name}</span>
                                </div>
                                <span className="ep-wa-code-pill">{s.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="ep-wa-msg-composer__send-btn"
                        disabled={!customDestinationInput.trim()}
                        onClick={() => handleSelectDestination(customDestinationInput.trim())}
                        aria-label="Enviar país"
                      >
                        <Send size={15} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="ep-wa-quick-reply-sub"
                      onClick={() => {
                        setIsCustomDestination(false);
                        setCustomDestinationInput("");
                      }}
                    >
                      ✕ Voltar aos países principais
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Period Selection - Clean Quick Replies */}
            {currentStep === "period" && (
              <div className="ep-wa-quick-replies ep-wa-quick-replies--stack">
                {travelPeriods.map((period) => (
                  <button
                    key={period.value}
                    type="button"
                    className="ep-wa-quick-reply-btn ep-wa-quick-reply-btn--full"
                    onClick={() => handleSelectPeriod(period.value)}
                  >
                    <span>{period.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 6: Contact Card - Sleek & Conversational */}
            {currentStep === "contact" && (
              <form onSubmit={handleContactSubmit} className="ep-wa-contact-card">
                <div className="ep-wa-contact-card__inputs">
                  <input
                    className="ep-wa-clean-input"
                    type="text"
                    required
                    placeholder="Seu Nome Completo"
                    value={tutorName}
                    onChange={(e) => setTutorName(e.target.value)}
                  />

                  <div className="ep-wa-phone-row">
                    <div className="ep-wa-ddi-box">
                      <img
                        src={countryFlagSvg(phoneCountry.code)}
                        alt=""
                        className="ep-wa-flag-icon"
                      />
                      <select
                        className="ep-wa-ddi-select"
                        value={phoneCountry.code}
                        onChange={(e) => {
                          const selected = phoneCountries.find((c) => c.code === e.target.value) ?? phoneCountries[0];
                          setPhoneCountry(selected);
                        }}
                        aria-label="DDI do país"
                      >
                        {phoneCountries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.dial}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      className="ep-wa-clean-input ep-wa-clean-input--phone"
                      type="tel"
                      required
                      placeholder="DDD + WhatsApp"
                      value={tutorPhone}
                      onChange={(e) => setTutorPhone(formatPhoneNumber(e.target.value, phoneCountry.code))}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="ep-wa-submit-btn"
                  disabled={isSubmitting || !tutorName.trim() || !tutorPhone.trim()}
                >
                  {isSubmitting ? (
                    <span>Gerando pré-diagnóstico...</span>
                  ) : (
                    <>
                      <span>Receber cronograma no WhatsApp</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <span className="ep-wa-privacy-text">
                  🔒 Seus dados são protegidos e confidenciais.
                </span>
              </form>
            )}
          </div>
        )}

        {/* Step 7: Completed State Handoff */}
        {currentStep === "complete" && completedWhatsAppUrl && (
          <div className="ep-wa-stream-actions">
            <a
              href={completedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-wa-whatsapp-cta"
            >
              <WhatsAppIconSvg size={20} color="#ffffff" />
              <span>Abrir conversa com Thamires no WhatsApp</span>
            </a>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 2. Sleek Minimalist Bottom Bar */}
      <div className="ep-wa-bottom-bar">
        <div className="ep-wa-bottom-bar__row">
          {stepHistory.length > 0 || isMultiPetMode || isCustomMultiBreed || isCustomOrigin || isCustomDestination ? (
            <button
              type="button"
              className="ep-wa-bottom-bar__back-btn"
              onClick={handleGoBack}
              title="Voltar para a opção anterior"
            >
              <ArrowLeft size={12} />
              <span>Voltar</span>
            </button>
          ) : (
            <span className="ep-wa-bottom-bar__label">{stepMeta.title}</span>
          )}

          <span className="ep-wa-bottom-bar__pct">{stepMeta.percent}%</span>
        </div>

        <div className="ep-wa-bottom-bar__track">
          <div
            className="ep-wa-bottom-bar__fill"
            style={{ width: `${stepMeta.percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
