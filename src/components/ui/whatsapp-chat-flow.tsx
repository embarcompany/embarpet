"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckCheck,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Sparkles,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Search,
  ChevronDown,
  Check,
  RotateCcw,
} from "lucide-react";
import { submitLead, type PublicLead } from "../../lead-contract";
import { trackConversionEvent } from "../../lib/analytics";
import { CountryFlag } from "./country-flag";
import { useCountrySuggestions } from "../../hooks/use-country-suggestions";
import { searchAiBreedsDetailed, isSrdTerm, normalizeText } from "../../data/pet-species-database";
import {
  openWhatsApp,
  getSmartWhatsAppUrl,
  DEFAULT_EMBARPET_WHATSAPP,
} from "../../lib/whatsapp";

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

type ChatStep = "greeting" | "pet_details" | "origin" | "destination" | "period" | "contact" | "complete" | "disqualified";

type ChatMessage = {
  id: string;
  sender: "thamires" | "user" | "system";
  text?: string;
  time: string;
  card?: ReactNode;
};

const mainSpeciesOptions = [
  { label: "Cachorro", value: "Cachorro", icon: Dog },
  { label: "Gato", value: "Gato", icon: Cat },
  { label: "Roedor", value: "Roedor", icon: Rabbit },
  { label: "Ave", value: "Ave", icon: Bird },
  { label: "Outro pet", value: "Outro Pet", icon: Sparkles },
];

const multiSpeciesItems = [
  { label: "Cães", key: "dogs" as const, icon: Dog },
  { label: "Gatos", key: "cats" as const, icon: Cat },
  { label: "Roedores", key: "rodents" as const, icon: Rabbit },
  { label: "Aves", key: "birds" as const, icon: Bird },
  { label: "Outros pets", key: "others" as const, icon: Sparkles },
];

type PetQueueItem = {
  id: string;
  species: string;
  label: string;
};

type CollectedPetBreed = {
  id: string;
  species: string;
  label: string;
  breed: string;
  isSrd: boolean;
  isBrachy: boolean;
};

function getPetGrammar(species: string, count = 1, ordinalIndex?: number): string {
  const s = normalizeText(species);
  if (ordinalIndex && ordinalIndex > 1) {
    if (s.includes("gato") || s.includes("felin")) return `do seu ${ordinalIndex}º gato`;
    if (s.includes("cao") || s.includes("cachorro") || s.includes("canin")) return `do seu ${ordinalIndex}º cachorro`;
    if (s.includes("ave")) return `da sua ${ordinalIndex}ª ave`;
    if (s.includes("roedor")) return `do seu ${ordinalIndex}º roedor`;
    return `do seu ${ordinalIndex}º pet`;
  }
  if (count > 1) {
    if (s.includes("gato") || s.includes("felin")) return "dos seus gatos";
    if (s.includes("cao") || s.includes("cachorro") || s.includes("canin")) return "dos seus cachorros";
    if (s.includes("ave")) return "das suas aves";
    if (s.includes("roedor")) return "dos seus roedores";
    return "dos seus pets";
  }
  if (s.includes("gato") || s.includes("felin")) return "do seu gato";
  if (s.includes("cao") || s.includes("cachorro") || s.includes("canin")) return "do seu cachorro";
  if (s.includes("ave")) return "da sua ave";
  if (s.includes("roedor")) return "do seu roedor";
  return "do seu pet";
}

function buildPetQueue(counts: {
  dogs: number;
  cats: number;
  rodents: number;
  birds: number;
  others: number;
}): PetQueueItem[] {
  const queue: PetQueueItem[] = [];
  if (counts.dogs > 0) {
    for (let i = 1; i <= counts.dogs; i++) {
      queue.push({
        id: `dog-${i}`,
        species: "Cachorro",
        label: counts.dogs === 1 ? "cachorro" : `${i}º cachorro`,
      });
    }
  }
  if (counts.cats > 0) {
    for (let i = 1; i <= counts.cats; i++) {
      queue.push({
        id: `cat-${i}`,
        species: "Gato",
        label: counts.cats === 1 ? "gato" : `${i}º gato`,
      });
    }
  }
  if (counts.rodents > 0) {
    for (let i = 1; i <= counts.rodents; i++) {
      queue.push({
        id: `rodent-${i}`,
        species: "Roedor",
        label: counts.rodents === 1 ? "roedor" : `${i}º roedor`,
      });
    }
  }
  if (counts.birds > 0) {
    for (let i = 1; i <= counts.birds; i++) {
      queue.push({
        id: `bird-${i}`,
        species: "Ave",
        label: counts.birds === 1 ? "ave" : `${i}ª ave`,
      });
    }
  }
  if (counts.others > 0) {
    for (let i = 1; i <= counts.others; i++) {
      queue.push({
        id: `other-${i}`,
        species: "Outro Pet",
        label: counts.others === 1 ? "outro pet" : `${i}º outro pet`,
      });
    }
  }
  return queue;
}

const popularOrigins = [
  { label: "Brasil", code: "BR" },
  { label: "Estados Unidos", code: "US" },
  { label: "Portugal", code: "PT" },
  { label: "Espanha", code: "ES" },
  { label: "Itália", code: "IT" },
  { label: "França", code: "FR" },
  { label: "Alemanha", code: "DE" },
  { label: "Argentina", code: "AR" },
  { label: "Outro país", code: "OTHER" },
];

const popularDestinationsFromBrazil = [
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
  let digits = value.replace(/\D/g, "");
  if (countryCode === "BR" && digits.startsWith("55") && digits.length > 11) {
    digits = digits.substring(2);
  }
  const mask = phoneMasks[countryCode];
  return mask ? mask.format(digits.slice(0, mask.max)) : digits.slice(0, 15).replace(/(\d{3})(?=\d)/g, "$1 ");
}

function getNowTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function isBrazilCountry(countryName: string): boolean {
  const norm = normalizeText(countryName);
  return norm === "brasil" || norm === "brazil" || norm === "br" || norm === "pindorama";
}

/**
 * Reading delay formula: clamp(1000ms, chars * 24ms + 500ms, 3000ms)
 */
function calculateReadingDelay(text: string): number {
  const cleanLen = text.replace(/\*\*|\*|•|✅|✈️|👤|📅|⚠️/g, "").length;
  return Math.max(1000, Math.min(3000, Math.round(cleanLen * 24 + 500)));
}

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
  onProgressChange,
}: {
  initialRoute?: {
    origin?: string;
    destination?: string;
    period?: string;
  };
  analyticsSource?: string;
  onComplete?: (lead: PublicLead) => void;
  onStatusChange?: (status: "online" | "digitando..." | "anotando...") => void;
  onProgressChange?: (percent: number) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<ChatStep>("greeting");
  const [stepHistory, setStepHistory] = useState<Array<{ step: ChatStep; msgCount: number }>>([]);
  const [isBotDelivering, setIsBotDelivering] = useState(true);

  // Form State
  const [petSpecies, setPetSpecies] = useState("Cachorro");
  const [petBreed, setPetBreed] = useState("");
  const [isBreedSelected, setIsBreedSelected] = useState(false);
  const [otherPetName, setOtherPetName] = useState("");

  // Multi-Pet Queue & Flow State
  const [isMultiPetMode, setIsMultiPetMode] = useState(false);
  const [isMultiPetFlow, setIsMultiPetFlow] = useState(false);
  const [multiPetQueue, setMultiPetQueue] = useState<PetQueueItem[]>([]);
  const [currentMultiPetIndex, setCurrentMultiPetIndex] = useState(0);
  const [collectedMultiBreeds, setCollectedMultiBreeds] = useState<CollectedPetBreed[]>([]);
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
    if (multiCounts.dogs > 0) parts.push(`${multiCounts.dogs} ${multiCounts.dogs > 1 ? "cães" : "cão"}`);
    if (multiCounts.cats > 0) parts.push(`${multiCounts.cats} ${multiCounts.cats > 1 ? "gatos" : "gato"}`);
    if (multiCounts.rodents > 0) parts.push(`${multiCounts.rodents} ${multiCounts.rodents > 1 ? "roedores" : "roedor"}`);
    if (multiCounts.birds > 0) parts.push(`${multiCounts.birds} ${multiCounts.birds > 1 ? "aves" : "ave"}`);
    if (multiCounts.others > 0) parts.push(`${multiCounts.others} outro(s)`);
    if (parts.length === 0) return "Múltiplos pets";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} e ${parts[1]}`;
    return `${parts.slice(0, -1).join(", ")} e ${parts[parts.length - 1]}`;
  };

  // Currently Active Pet in the Queue
  const currentActivePet = isMultiPetFlow && multiPetQueue.length > 0 ? multiPetQueue[currentMultiPetIndex] : null;
  const activeSpecies = currentActivePet ? currentActivePet.species : petSpecies;

  // Real-Time AI Breed Suggestions strictly for current species
  const dynamicBreedSuggestions = searchAiBreedsDetailed(petBreed, activeSpecies, 8);

  const [routeOrigin, setRouteOrigin] = useState(initialRoute.origin || "Brasil");
  const [routeDestination, setRouteDestination] = useState(initialRoute.destination || "");
  const [customOriginInput, setCustomOriginInput] = useState("");
  const [isCustomOrigin, setIsCustomOrigin] = useState(false);

  const [customDestinationInput, setCustomDestinationInput] = useState("");
  const [isCustomDestination, setIsCustomDestination] = useState(false);

  // Country Suggestions Hooks
  const originSuggestions = useCountrySuggestions(customOriginInput, isCustomOrigin, "pt-BR");
  const destinationSuggestions = useCountrySuggestions(customDestinationInput, isCustomDestination, "pt-BR");

  const [travelPeriod, setTravelPeriod] = useState(initialRoute.period || "");
  const [tutorName, setTutorName] = useState("");
  const [tutorPhone, setTutorPhone] = useState("");
  const [tutorEmail, setTutorEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [phoneCountryOpen, setPhoneCountryOpen] = useState(false);
  const ddiWrapRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedWhatsAppUrl, setCompletedWhatsAppUrl] = useState<string | null>(null);
  const [completedMessage, setCompletedMessage] = useState<string>("");

  // Disqualification state
  const [disqualificationText, setDisqualificationText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSentInactivityFollowUp = useRef(false);
  const isEngagedRef = useRef(false);
  const hasSentGreeting = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, thinkingText, currentStep, isMultiPetMode, isCustomOrigin, isCustomDestination]);

  // Step Progress Metadata
  const stepMeta = {
    greeting: { percent: 20, title: "Espécie do Pet" },
    pet_details: { percent: 40, title: "Perfil do Pet" },
    origin: { percent: 60, title: "Origem da Viagem" },
    destination: { percent: 80, title: "Destino" },
    period: { percent: 90, title: "Previsão de Viagem" },
    contact: { percent: 95, title: "Finalizar Contato" },
    complete: { percent: 100, title: "Concluído" },
    disqualified: { percent: 50, title: "Rota Não Atendida" },
  }[currentStep];

  useEffect(() => {
    onProgressChange?.(stepMeta.percent);
  }, [currentStep, onProgressChange, stepMeta.percent]);

  // Engagement Tracker & Tab Title Visibility Alert
  useEffect(() => {
    const markEngaged = () => {
      isEngagedRef.current = true;
    };
    const handleScroll = () => {
      if (window.scrollY / document.body.scrollHeight >= 0.25) {
        markEngaged();
      }
    };
    const engagedTimer = setTimeout(markEngaged, 15000);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(engagedTimer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);

  // Inactivity Follow-Up Timer (45-50s of idle in chat)
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (isBotDelivering || currentStep === "complete" || currentStep === "disqualified" || hasSentInactivityFollowUp.current) {
      return;
    }

    inactivityTimerRef.current = setTimeout(() => {
      if (isEngagedRef.current && !hasSentInactivityFollowUp.current) {
        hasSentInactivityFollowUp.current = true;
        const followUpText =
          currentStep === "greeting"
            ? "Oi! Você ainda está por aí? 😊"
            : "Ainda posso te ajudar com o planejamento da viagem do seu pet?";

        if (document.visibilityState === "hidden") {
          document.title = "💬 Nova mensagem da Thamires";
        }

        setIsTyping(true);
        onStatusChange?.("digitando...");
        setTimeout(() => {
          setIsTyping(false);
          onStatusChange?.("online");
          setMessages((prev) => [
            ...prev,
            {
              id: `followup-${Date.now()}`,
              sender: "thamires",
              text: followUpText,
              time: getNowTime(),
            },
          ]);
        }, 1200);
      }
    }, 50000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [messages, isBotDelivering, currentStep, onStatusChange]);

  // Click Outside DDI Dropdown
  useEffect(() => {
    if (!phoneCountryOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ddiWrapRef.current && !ddiWrapRef.current.contains(event.target as Node)) {
        setPhoneCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [phoneCountryOpen]);

  const trackStart = () => {
    isEngagedRef.current = true;
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackConversionEvent("analysis_started", {
      source: analyticsSource,
      format: "whatsapp_chat",
    });
  };

  // Natural Message Sequence Delivery with Dynamic Typing & Reading Pauses
  const deliverBotSequence = (
    sequence: { text: string; thoughtText?: string }[],
    onSequenceFinished?: () => void
  ) => {
    setIsBotDelivering(true);
    let index = 0;

    const playNext = () => {
      if (index >= sequence.length) {
        setIsTyping(false);
        setThinkingText(null);
        setIsBotDelivering(false);
        onStatusChange?.("online");
        onSequenceFinished?.();
        return;
      }

      const item = sequence[index];
      index++;

      if (item.thoughtText) {
        setThinkingText(item.thoughtText);
        setIsTyping(false);
        onStatusChange?.("anotando...");
        setTimeout(() => {
          setThinkingText(null);
          setIsTyping(true);
          onStatusChange?.("digitando...");
          const typingTime = calculateReadingDelay(item.text);
          setTimeout(() => {
            pushBotMessage(item.text);
            if (document.visibilityState === "hidden") {
              document.title = "💬 Nova mensagem da Thamires";
            }
            setTimeout(playNext, Math.min(1000, typingTime * 0.35));
          }, typingTime);
        }, 1000);
      } else {
        setIsTyping(true);
        onStatusChange?.("digitando...");
        const typingTime = calculateReadingDelay(item.text);
        setTimeout(() => {
          pushBotMessage(item.text);
          if (document.visibilityState === "hidden") {
            document.title = "💬 Nova mensagem da Thamires";
          }
          setTimeout(playNext, Math.min(1000, typingTime * 0.35));
        }, typingTime);
      }
    };

    playNext();
  };

  const pushBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `thamires-${Date.now()}-${Math.random()}`,
        sender: "thamires",
        text,
        time: getNowTime(),
      },
    ]);
  };

  // Step Back Navigation
  const handleGoBack = () => {
    if (isBotDelivering) return;

    if (isMultiPetMode) {
      setIsMultiPetMode(false);
      return;
    }
    if (isCustomOrigin) {
      setIsCustomOrigin(false);
      setCustomOriginInput("");
      return;
    }
    if (isCustomDestination) {
      setIsCustomDestination(false);
      setCustomDestinationInput("");
      return;
    }

    if (currentStep === "disqualified") {
      setCurrentStep("origin");
      setDisqualificationText("");
      return;
    }

    // Undo Turn in Multi-Pet Queue if past 1st pet
    if (currentStep === "pet_details" && isMultiPetFlow && currentMultiPetIndex > 0) {
      setCurrentMultiPetIndex((prev) => prev - 1);
      setCollectedMultiBreeds((prev) => prev.slice(0, -1));
      setMessages((prev) => prev.slice(0, -2));
      setPetBreed("");
      setIsBreedSelected(false);
      return;
    }

    if (stepHistory.length === 0) return;
    const previous = stepHistory[stepHistory.length - 1];
    setStepHistory((prev) => prev.slice(0, -1));
    setCurrentStep(previous.step);
    setMessages((prev) => prev.slice(0, previous.msgCount));

    // Reset local state of the step being exited
    if (previous.step === "greeting") {
      setPetSpecies("Cachorro");
      setPetBreed("");
      setIsBreedSelected(false);
      setIsMultiPetFlow(false);
      setMultiPetQueue([]);
      setCollectedMultiBreeds([]);
      setCurrentMultiPetIndex(0);
      setOtherPetName("");
    } else if (previous.step === "pet_details") {
      setPetBreed("");
      setIsBreedSelected(false);
      setOtherPetName("");
    } else if (previous.step === "origin") {
      setRouteDestination("");
      setIsCustomDestination(false);
      setCustomDestinationInput("");
    } else if (previous.step === "destination") {
      setTravelPeriod("");
    }
  };

  const pushStep = (nextStep: ChatStep, currentMsgCount: number) => {
    setStepHistory((prev) => [...prev, { step: currentStep, msgCount: currentMsgCount }]);
    setCurrentStep(nextStep);
  };

  // Initial Greeting Sequence from Thamires Felix (Guarded to prevent duplication)
  useEffect(() => {
    if (hasSentGreeting.current) return;
    hasSentGreeting.current = true;
    deliverBotSequence([
      {
        text: "Olá! Sou a **Thamires Felix** da **Embarpet**. Vou te ajudar com o **diagnóstico e rota internacional** do seu pet.",
      },
      {
        text: "Qual pet vai viajar com você?",
      },
    ]);
  }, []);

  // Step 1A: Handle Single Species Selection
  const handleSelectSpecies = (species: string) => {
    trackStart();
    const prevCount = messages.length;
    setPetSpecies(species);
    setPetBreed("");
    setIsBreedSelected(false);
    setIsMultiPetFlow(false);
    setMultiPetQueue([]);
    setCollectedMultiBreeds([]);
    setCurrentMultiPetIndex(0);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-species-${Date.now()}`,
      sender: "user",
      text: `${species}`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);

    // Regra: Raça apenas para Cão e Gato (até 2 pets)
    if (species === "Cachorro") {
      pushStep("pet_details", prevCount);
      deliverBotSequence([
        {
          thoughtText: "Consultando regras IATA para caninos...",
          text: `Perfeito! Qual é a **raça ${getPetGrammar("Cachorro")}**?`,
        },
      ]);
    } else if (species === "Gato") {
      pushStep("pet_details", prevCount);
      deliverBotSequence([
        {
          thoughtText: "Consultando diretrizes IATA para felinos...",
          text: `Perfeito! Qual é a **raça ${getPetGrammar("Gato")}**?`,
        },
      ]);
    } else if (species === "Ave") {
      setPetBreed("Ave Doméstica");
      pushStep("origin", prevCount);
      deliverBotSequence([
        {
          thoughtText: "Consultando exigências sanitárias e anilhas para aves...",
          text: `Perfeito! Registrei o planejamento para sua **ave**.\n\nDe qual **país** vocês vão sair?`,
        },
      ]);
    } else if (species === "Roedor") {
      setPetBreed("Roedor Doméstico");
      pushStep("origin", prevCount);
      deliverBotSequence([
        {
          thoughtText: "Consultando diretrizes para pequenos mamíferos e roedores...",
          text: `Perfeito! Registrei o planejamento para seu **roedor**.\n\nDe qual **país** vocês vão sair?`,
        },
      ]);
    } else {
      // Outro Pet -> Pergunta diretamente: "Qual é o seu pet?"
      pushStep("pet_details", prevCount);
      deliverBotSequence([
        {
          text: "Entendido! **Qual é o seu pet?**",
        },
      ]);
    }
  };

  // Step 1B: Handle Multi-Pet Confirmation
  const handleConfirmMultiPets = () => {
    if (totalMultiPets === 0) return;
    trackStart();
    const prevCount = messages.length;
    const summary = formatMultiSummary();
    const queue = buildPetQueue(multiCounts);
    setPetSpecies(summary);
    setPetBreed("");
    setIsBreedSelected(false);
    setIsMultiPetMode(false);
    setIsMultiPetFlow(true);
    setMultiPetQueue(queue);
    setCurrentMultiPetIndex(0);
    setCollectedMultiBreeds([]);
    const time = getNowTime();

    const userMsg: ChatMessage = {
      id: `user-species-${Date.now()}`,
      sender: "user",
      text: `${summary} (${totalMultiPets} ${totalMultiPets > 1 ? "pets" : "pet"})`,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);

    // Regra: A partir de 3 pets, não solicita raça individual de cada pet!
    if (totalMultiPets >= 3) {
      setPetBreed(summary);
      pushStep("origin", prevCount);
      deliverBotSequence([
        {
          thoughtText: `Dimensionando caixas IATA e logística sanitária para ${totalMultiPets} pets...`,
          text: `Perfeito! Já registrei o planejamento para seus **${totalMultiPets} pets (${summary})**.\n\nDe qual **país** os pets vão sair?`,
        },
      ]);
      return;
    }

    // Apenas 1 ou 2 pets: verificar se tem cão/gato/outro para perguntar raça
    const eligibleQueue = queue.filter((p) => p.species === "Cachorro" || p.species === "Gato" || p.species === "Outro Pet");
    if (eligibleQueue.length === 0) {
      setPetBreed(summary);
      pushStep("origin", prevCount);
      deliverBotSequence([
        {
          thoughtText: "Mapeando logística sanitária...",
          text: `Perfeito! Registrei o planejamento para seus pets (${summary}).\n\nDe qual **país** vocês vão sair?`,
        },
      ]);
      return;
    }

    pushStep("pet_details", prevCount);
    const firstPet = queue[0];
    const promptText =
      firstPet.species === "Outro Pet"
        ? "Qual é o seu pet?"
        : `Qual é a **raça ${getPetGrammar(firstPet.species, 1, queue.length > 1 ? 1 : undefined)}**?`;

    deliverBotSequence([
      {
        thoughtText: `Dimensionando logística para ${totalMultiPets} pets...`,
        text: `Perfeito! Já registrei o planejamento para **${summary}**.\n\n${promptText}`,
      },
    ]);
  };

  // Step 2: Submit Pet Details (Breed / "Qual é o seu pet?")
  const handleConfirmPetDetails = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prevCount = messages.length;
    const isOtherSingle = petSpecies === "Outro Pet" && !isMultiPetFlow;

    let resolvedBreed = "";
    if (isOtherSingle) {
      resolvedBreed = otherPetName.trim() || "Animal Especial";
    } else {
      if (isSrdTerm(petBreed)) {
        resolvedBreed = "Sem Raça Definida (SRD)";
      } else {
        resolvedBreed = petBreed.trim() || "Sem Raça Definida (SRD)";
      }
    }

    const time = getNowTime();
    const isBrachy = /buld|bulldog|pug|shih|boxer|pekin|lhasa|persa|boston|cavalier|shar\s*pei|malt[eê]s|braqui|ex[oó]tico/i.test(resolvedBreed);

    if (!isMultiPetFlow) {
      setPetBreed(resolvedBreed);
      const userMsg: ChatMessage = {
        id: `user-pet-details-${Date.now()}`,
        sender: "user",
        text: `${resolvedBreed}`,
        time,
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      pushStep("origin", prevCount);

      let dynamicInsight = "";
      if (isBrachy) {
        dynamicInsight = `Identifiquei o perfil **braquicefálico (focinho curto)**. Já separei as companhias aéreas com **controle térmico ativo** e ventilação adequada para sua rota.`;
      } else {
        dynamicInsight = `Perfil **${resolvedBreed}** registrado com sucesso.`;
      }

      deliverBotSequence([
        {
          thoughtText: isBrachy ? "Mapeando companhias com controle térmico..." : "Mapeando protocolos sanitários...",
          text: `${dynamicInsight}\n\nDe qual **país** o pet vai sair?`,
        },
      ]);
    } else {
      const currentPet = multiPetQueue[currentMultiPetIndex];
      const newEntry: CollectedPetBreed = {
        id: currentPet.id,
        species: currentPet.species,
        label: currentPet.label,
        breed: resolvedBreed,
        isSrd: isSrdTerm(resolvedBreed),
        isBrachy,
      };

      const updatedCollected = [...collectedMultiBreeds, newEntry];
      setCollectedMultiBreeds(updatedCollected);

      const userMsg: ChatMessage = {
        id: `user-pet-details-${Date.now()}`,
        sender: "user",
        text: `${currentPet.label.charAt(0).toUpperCase() + currentPet.label.slice(1)}: ${resolvedBreed}`,
        time,
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);

      const nextIndex = currentMultiPetIndex + 1;
      if (nextIndex < multiPetQueue.length) {
        setCurrentMultiPetIndex(nextIndex);
        setPetBreed("");
        setIsBreedSelected(false);
        const nextPet = multiPetQueue[nextIndex];
        const nextPrompt =
          nextPet.species === "Outro Pet"
            ? "Qual é o seu pet?"
            : `Anotado! E qual é a **raça ${getPetGrammar(nextPet.species, 1, nextIndex + 1)}**?`;

        deliverBotSequence([
          {
            thoughtText: `Registrando ${currentPet.label}...`,
            text: nextPrompt,
          },
        ]);
      } else {
        const fullSummary = updatedCollected.map((p) => `${p.label}: ${p.breed}`).join(", ");
        setPetBreed(fullSummary);
        pushStep("origin", prevCount);

        const hasBrachy = updatedCollected.some((p) => p.isBrachy);
        const thoughtText = hasBrachy
          ? "Mapeando companhias com controle térmico ativo para o grupo..."
          : "Dimensionando caixas IATA para todos os pets...";

        const petListBullet = updatedCollected
          .map((p) => `• **${p.label.charAt(0).toUpperCase() + p.label.slice(1)}:** ${p.breed}${p.isBrachy ? " *(Focinho curto)*" : ""}`)
          .join("\n");

        deliverBotSequence([
          {
            thoughtText,
            text: `Perfeito! Registrei todos os pets:\n\n${petListBullet}\n\nDe qual **país** os pets vão sair?`,
          },
        ]);
      }
    }
  };

  // Step 3: Handle Origin Selection
  const handleSelectOrigin = (origin: string) => {
    const prevCount = messages.length;
    setIsCustomOrigin(false);
    const resolvedOriginName = origin === "EUA" ? "Estados Unidos" : origin;
    setRouteOrigin(resolvedOriginName);
    const time = getNowTime();

    // Mensagem simulada do usuário: estritamente o nome do país
    const userMsg: ChatMessage = {
      id: `user-origin-${Date.now()}`,
      sender: "user",
      text: resolvedOriginName,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    pushStep("destination", prevCount);

    const isOriginBR = isBrazilCountry(resolvedOriginName);

    if (isOriginBR) {
      deliverBotSequence([
        {
          thoughtText: "Mapeando procedimentos de saída e documentação para o exterior...",
          text: `Origem confirmada no **Brasil** 🇧🇷.\n\nPara qual **país de destino** ${isMultiPetFlow ? "os pets vão viajar" : "o pet vai viajar"}?`,
        },
      ]);
    } else {
      deliverBotSequence([
        {
          thoughtText: "Mapeando protocolos de importação e entrada sanitária no Brasil...",
          text: `Origem confirmada em **${resolvedOriginName}** ✈️\n\nComo a Embarpet é especializada exclusivamente em **rotas internacionais conectadas ao Brasil**, todo o suporte será para a viagem com desembarque seguro no **Brasil** 🇧🇷.\n\nPodemos confirmar o **Brasil** como país de destino?`,
        },
      ]);
    }
  };

  // Step 4: Handle Destination Selection with Strict International Route Check
  const handleSelectDestination = (dest: string) => {
    const prevCount = messages.length;
    setIsCustomDestination(false);
    const resolvedDestName = dest === "EUA" ? "Estados Unidos" : dest;
    setRouteDestination(resolvedDestName);
    const time = getNowTime();

    // Mensagem simulada do usuário: estritamente o nome do país
    const userMsg: ChatMessage = {
      id: `user-dest-${Date.now()}`,
      sender: "user",
      text: resolvedDestName,
      time,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);

    // Validação Estrita: Rota Internacional obrigatoriamente envolvendo o Brasil (Brasil <-> Exterior)
    const originIsBR = isBrazilCountry(routeOrigin);
    const destIsBR = isBrazilCountry(resolvedDestName);

    if ((!originIsBR && !destIsBR) || (originIsBR && destIsBR)) {
      pushStep("disqualified", prevCount);
      const disqMsg = originIsBR && destIsBR
        ? "No momento, a Embarpet atende exclusivamente viagens internacionais (entre o Brasil e o exterior). Não realizamos voos domésticos dentro do Brasil."
        : "No momento, atendemos exclusivamente embarques internacionais de importação ou exportação que tenham o Brasil como origem ou destino.";
      setDisqualificationText(disqMsg);

      deliverBotSequence([
        {
          text: `⚠️ **Aviso sobre a rota informada (${routeOrigin} ➔ ${resolvedDestName}):**\n\n${disqMsg}`,
        },
      ]);
      return;
    }

    pushStep("period", prevCount);

    if (destIsBR) {
      deliverBotSequence([
        {
          thoughtText: "Consultando exigências sanitárias e autorização Vigiagro para entrada no Brasil...",
          text: `Excelente! Cuidaremos de toda a assessoria da rota **${routeOrigin} ➔ Brasil**, incluindo validação de atestados no país de saída, microchip padrão ISO, sorologia se exigida e desembaraço aduaneiro no aeroporto de chegada 🛬.\n\nPara quando é a **previsão de embarque**?`,
        },
      ]);
      return;
    }

    const isUS = /estados unidos|usa|eua|united states/i.test(resolvedDestName);
    const isEU = /portugal|espanha|it[aá]lia|fran[cç]a|alemanha|europa|ue/i.test(resolvedDestName);
    const isMercosul = /argentina|uruguai|paraguai|chile/i.test(resolvedDestName);

    const thoughtText = isUS
      ? "Consultando diretrizes CDC Dog Import Form e USDA..."
      : isEU
      ? "Verificando Regulamento UE 576/2013 e microchip ISO..."
      : isMercosul
      ? "Consultando normas sanitárias Mercosul..."
      : `Consultando exigências sanitárias para ${resolvedDestName}...`;

    let destinationInsight = "";
    if (isUS) {
      destinationInsight = `Para os **Estados Unidos**, cuidamos do **formulário oficial do CDC (CDC Dog Import)**, microchip ISO e vacinação para desembarque imediato sem retenção.`;
    } else if (isEU) {
      destinationInsight = `Para a **Europa (${resolvedDestName})**, cuidamos do **Microchip ISO**, emissão do **CVI oficial pelo MAPA/Vigiagro** e sorologia se necessária.`;
    } else if (isMercosul) {
      destinationInsight = `Para **${resolvedDestName}**, o processo é ágil, com **CVI oficial do MAPA** e desparasitação oficial.`;
    } else {
      destinationInsight = `Mapeamos todas as exigências sanitárias de **${resolvedDestName}** para um embarque 100% regularizado.`;
    }

    deliverBotSequence([
      {
        thoughtText,
        text: `${destinationInsight}\n\nPara quando é a **previsão de embarque**?`,
      },
    ]);
  };

  // Step 5: Handle Period Selection
  const handleSelectPeriod = (period: string) => {
    const prevCount = messages.length;
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
    pushStep("contact", prevCount);

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

    deliverBotSequence([
      {
        thoughtText,
        text: `Boas notícias! Analisei os requisitos para a rota **${routeOrigin} ➔ ${routeDestination || "Exterior"}** com previsão **${period}**:\n\n✅ **SIM! É 100% viável e seguro realizar a viagem no prazo informado.**\n\nPara onde envio seu laudo de viabilidade e o **cronograma oficial**?`,
      },
    ]);
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
      size: petBreed.trim() || "Sem Raça Definida (SRD)",
      name: tutorName.trim(),
      phone: fullPhone,
      email: tutorEmail.trim() || undefined,
      consent: true,
    };

    const userMsg: ChatMessage = {
      id: `user-lead-${Date.now()}`,
      sender: "user",
      text: `${tutorName.trim()} • ${fullPhone}${tutorEmail.trim() ? ` • ${tutorEmail.trim()}` : ""}`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep("complete");
    setThinkingText("Gerando pré-diagnóstico e preparando atendimento com a equipe...");
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

    const resolvedPetDetails = isMultiPetFlow
      ? `${petSpecies} (${petBreed})`
      : `${petSpecies} - ${petBreed}`;

    const waText =
      `Olá! Preenchi o pré-diagnóstico no site da Embarpet para meu pet (${resolvedPetDetails}).\n\n` +
      `✈️ Rota: ${routeOrigin} → ${routeDestination || "Internacional"}\n` +
      `📅 Previsão: ${travelPeriod || "A definir"}\n` +
      `👤 Tutor: ${tutorName}${tutorEmail.trim() ? `\n✉️ E-mail: ${tutorEmail.trim()}` : ""}\n\n` +
      `Gostaria de tirar dúvidas e dar andamento ao planejamento com a equipe!`;

    const smartUrl = getSmartWhatsAppUrl(DEFAULT_EMBARPET_WHATSAPP, waText);
    setCompletedWhatsAppUrl(smartUrl);
    setCompletedMessage(waText);

    setTimeout(() => {
      setThinkingText(null);
      setIsTyping(false);
      setIsSubmitting(false);
      onStatusChange?.("online");

      pushBotMessage(
        `Todas as informações do seu pré-diagnóstico já estão conosco para a rota **${routeOrigin} → ${routeDestination || "o exterior"}**.\n\nToque no botão abaixo para continuar com nossa equipe.`
      );
    }, 600);
  };

  const handleOpenWhatsAppCta = () => {
    trackConversionEvent("whatsapp_clicked", {
      source: analyticsSource,
      origin: routeOrigin,
      destination: routeDestination,
      format: "chat_completed_cta",
    });
    openWhatsApp(DEFAULT_EMBARPET_WHATSAPP, completedMessage);
  };

  return (
    <div className="ep-wa-container">
      {/* 1. Scrollable Conversational Body */}
      <div className="ep-wa-body" role="log" aria-live="polite">
        <div className="ep-wa-date-pill">Hoje</div>

        {/* Message Stream */}
        {messages.map((msg, index) => {
          const isCurrentRoundStart =
            stepHistory.length > 0 &&
            currentStep !== "complete" &&
            currentStep !== "disqualified" &&
            index === (
              isMultiPetFlow && currentStep === "pet_details" && currentMultiPetIndex > 0
                ? stepHistory[stepHistory.length - 1].msgCount + 1 + currentMultiPetIndex * 2
                : stepHistory[stepHistory.length - 1].msgCount + 1
            );

          return (
            <div key={msg.id} style={{ display: "contents" }}>
              {isCurrentRoundStart && (
                <div className="ep-wa-back-wrap">
                  <button
                    type="button"
                    className="ep-wa-back-btn"
                    onClick={handleGoBack}
                    disabled={isBotDelivering}
                  >
                    <ArrowLeft size={13} />
                    <span>Voltar</span>
                  </button>
                </div>
              )}

              <div
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
            </div>
          );
        })}

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

        {/* ACTIVE IN-STREAM TURN (Only revealed once bot finishes delivering) */}
        {!isBotDelivering && !isTyping && !thinkingText && currentStep !== "complete" && (
          <div className="ep-wa-stream-actions">
            {/* Step 1: Species Selection */}
            {currentStep === "greeting" && !isMultiPetMode && (
              <div className="ep-wa-quick-replies">
                <div className="ep-wa-quick-replies__grid">
                  {mainSpeciesOptions.map((opt) => {
                    const IconComponent = opt.icon;
                    const isRight = opt.value === "Outro Pet";
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        className={`ep-wa-quick-reply-btn ${isRight ? "ep-wa-quick-reply-btn--right" : ""}`}
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
                  <span>Viajar com mais de 1 pet</span>
                </button>
              </div>
            )}

            {/* Step 1 (Multi-Pet Mode): Clean Unified Vertical List Card */}
            {currentStep === "greeting" && isMultiPetMode && (
              <div className="ep-wa-multi-pet-card">
                <div className="ep-wa-multi-pet-list">
                  {multiSpeciesItems.map((item) => {
                    const IconComponent = item.icon;
                    const count = multiCounts[item.key];
                    return (
                      <div key={item.key} className="ep-wa-multi-pet-row">
                        <div className="ep-wa-multi-pet-info">
                          <IconComponent size={16} className="ep-wa-multi-pet-icon" />
                          <span>{item.label}</span>
                        </div>

                        <div className="ep-wa-multi-pet-stepper">
                          <button
                            type="button"
                            className="ep-wa-stepper-btn"
                            onClick={() => updateMultiCount(item.key, -1)}
                            disabled={count === 0}
                            aria-label={`Diminuir ${item.label}`}
                          >
                            <Minus size={11} />
                          </button>
                          <span className="ep-wa-stepper-count">{count}</span>
                          <button
                            type="button"
                            className="ep-wa-stepper-btn"
                            onClick={() => updateMultiCount(item.key, 1)}
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
                  <span>Confirmar ({totalMultiPets} {totalMultiPets > 1 ? "pets" : "pet"})</span>
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

            {/* Step 2: Breed or "Qual é o seu pet?" Selection */}
            {currentStep === "pet_details" && (
              <form onSubmit={handleConfirmPetDetails} className="ep-wa-msg-composer">
                {petSpecies === "Outro Pet" && !isMultiPetFlow ? (
                  <div className="ep-wa-msg-composer__row">
                    <input
                      className="ep-wa-msg-composer__input"
                      type="text"
                      maxLength={50}
                      placeholder="Ex: Ferret, Mini Pig, Coelho..."
                      value={otherPetName}
                      onChange={(e) => setOtherPetName(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="ep-wa-msg-composer__send-btn"
                      disabled={!otherPetName.trim()}
                      aria-label="Enviar"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    {isMultiPetFlow && multiPetQueue.length > 1 && (
                      <div className="ep-wa-multi-pet-counter-tag">
                        Pet {currentMultiPetIndex + 1} de {multiPetQueue.length} • {activeSpecies}
                      </div>
                    )}

                    <div className="ep-wa-msg-composer__row">
                      <div className="ep-wa-msg-composer__input-wrap">
                        <input
                          className="ep-wa-msg-composer__input"
                          type="text"
                          maxLength={60}
                          placeholder={
                            isMultiPetFlow
                              ? `Digite a raça do seu ${activeSpecies.toLowerCase()}...`
                              : `Digite a raça ${getPetGrammar(petSpecies)}...`
                          }
                          value={petBreed}
                          onChange={(e) => {
                            setIsBreedSelected(false);
                            setPetBreed(e.target.value);
                          }}
                          autoFocus
                        />

                        {/* Autocomplete Dropdown */}
                        {!isBreedSelected && petBreed.trim().length > 0 && (
                          <div className="ep-wa-dropdown-list" role="listbox">
                            {dynamicBreedSuggestions.length > 0 ? (
                              dynamicBreedSuggestions.map((item) => (
                                <button
                                  key={item.name}
                                  type="button"
                                  className="ep-wa-dropdown-item"
                                  onClick={() => {
                                    setPetBreed(item.name);
                                    setIsBreedSelected(true);
                                  }}
                                >
                                  <div className="ep-wa-dropdown-item__left">
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
                        disabled={!petBreed.trim()}
                        aria-label="Enviar"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}

            {/* Step 3: Origin Selection */}
            {currentStep === "origin" && (
              <div className="ep-wa-quick-replies">
                {!isCustomOrigin ? (
                  <div className="ep-wa-quick-replies__grid ep-wa-quick-replies__grid--countries">
                    {popularOrigins.map((orig) => {
                      const isRight = orig.code === "OTHER";
                      return (
                        <button
                          key={orig.code}
                          type="button"
                          className={`ep-wa-quick-reply-btn ${isRight ? "ep-wa-quick-reply-btn--right" : ""}`}
                          onClick={() => {
                            if (orig.code === "OTHER") {
                              setIsCustomOrigin(true);
                            } else {
                              handleSelectOrigin(orig.label);
                            }
                          }}
                        >
                          {orig.code !== "OTHER" ? (
                            <CountryFlag code={orig.code} name={orig.label} />
                          ) : (
                            <Search size={14} />
                          )}
                          <span>{orig.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="ep-wa-msg-composer">
                    <div className="ep-wa-msg-composer__row">
                      <div className="ep-wa-msg-composer__input-wrap">
                        <input
                          className="ep-wa-msg-composer__input"
                          type="text"
                          maxLength={70}
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
                                  <CountryFlag code={s.code} name={s.name} />
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
                        <ArrowRight size={16} />
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

            {/* Step 4: Destination Selection */}
            {currentStep === "destination" && (
              <div className="ep-wa-quick-replies">
                {isBrazilCountry(routeOrigin) ? (
                  !isCustomDestination ? (
                    <div className="ep-wa-quick-replies__grid ep-wa-quick-replies__grid--countries">
                      {popularDestinationsFromBrazil.map((dest) => {
                        const isRight = dest.code === "OTHER";
                        return (
                          <button
                            key={dest.code}
                            type="button"
                            className={`ep-wa-quick-reply-btn ${isRight ? "ep-wa-quick-reply-btn--right" : ""}`}
                            onClick={() => {
                              if (dest.code === "OTHER") {
                                setIsCustomDestination(true);
                              } else {
                                handleSelectDestination(dest.label);
                              }
                            }}
                          >
                            {dest.code !== "OTHER" ? (
                              <CountryFlag code={dest.code} name={dest.label} />
                            ) : (
                              <Search size={14} />
                            )}
                            <span>{dest.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="ep-wa-msg-composer">
                      <div className="ep-wa-msg-composer__row">
                        <div className="ep-wa-msg-composer__input-wrap">
                          <input
                            className="ep-wa-msg-composer__input"
                            type="text"
                            maxLength={70}
                            placeholder="Digite o país de destino no exterior..."
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

                          {destinationSuggestions.filter((s) => !isBrazilCountry(s.name)).length > 0 && (
                            <div className="ep-wa-dropdown-list" role="listbox">
                              {destinationSuggestions
                                .filter((s) => !isBrazilCountry(s.name))
                                .map((s) => (
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
                                      <CountryFlag code={s.code} name={s.name} />
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
                          <ArrowRight size={16} />
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
                  )
                ) : (
                  <div className="ep-wa-import-confirmation">
                    <div className="ep-wa-import-badge">
                      <span>🛬 Rota Internacional: <strong>{routeOrigin} ➔ Brasil</strong></span>
                    </div>

                    <button
                      type="button"
                      className="ep-wa-quick-reply-btn ep-wa-quick-reply-btn--full ep-wa-quick-reply-btn--confirm-dest"
                      onClick={() => handleSelectDestination("Brasil")}
                    >
                      <CountryFlag code="BR" name="Brasil" />
                      <span>Confirmar Brasil como destino</span>
                      <Check size={16} className="ep-wa-confirm-icon" />
                    </button>

                    <button
                      type="button"
                      className="ep-wa-quick-reply-sub"
                      onClick={handleGoBack}
                    >
                      <RotateCcw size={12} />
                      <span>Alterar país de origem</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 4.5: Disqualified Route State */}
            {currentStep === "disqualified" && (
              <div className="ep-wa-disqualified-card">
                <button
                  type="button"
                  className="ep-wa-submit-btn"
                  onClick={() => {
                    setCurrentStep("origin");
                    setDisqualificationText("");
                  }}
                >
                  <RotateCcw size={15} />
                  <span>Alterar rota e tentar novamente</span>
                </button>
              </div>
            )}

            {/* Step 5: Period Selection */}
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

            {/* Step 6: Unified Contact Card (WhatsApp + E-mail Opcional) */}
            {currentStep === "contact" && (
              <form onSubmit={handleContactSubmit} className="ep-wa-contact-card">
                <div className="ep-wa-contact-card__inputs">
                  <input
                    className="ep-wa-clean-input"
                    type="text"
                    required
                    maxLength={80}
                    placeholder="Seu Nome Completo"
                    value={tutorName}
                    onChange={(e) => setTutorName(e.target.value)}
                  />

                  {/* Unified DDI + WhatsApp Input */}
                  <div className="ep-wa-unified-phone">
                    <div className="ep-wa-ddi-wrap" ref={ddiWrapRef}>
                      <button
                        type="button"
                        className="ep-wa-ddi-trigger"
                        aria-label={`País do WhatsApp: ${phoneCountry.name}`}
                        aria-haspopup="listbox"
                        aria-expanded={phoneCountryOpen}
                        onClick={() => setPhoneCountryOpen((prev) => !prev)}
                      >
                        <CountryFlag code={phoneCountry.code} name={phoneCountry.name} />
                        <span className="ep-wa-ddi-dial">{phoneCountry.dial}</span>
                        <ChevronDown size={13} className={`ep-wa-ddi-chevron ${phoneCountryOpen ? "ep-wa-ddi-chevron--open" : ""}`} aria-hidden="true" />
                      </button>

                      {phoneCountryOpen && (
                        <div
                          className="ep-wa-ddi-dropdown"
                          role="listbox"
                          aria-label="Selecione o país do WhatsApp"
                        >
                          {phoneCountries.map((c) => {
                            const isSelected = c.code === phoneCountry.code;
                            return (
                              <button
                                type="button"
                                role="option"
                                key={c.code}
                                aria-selected={isSelected}
                                className={`ep-wa-ddi-option ${isSelected ? "ep-wa-ddi-option--selected" : ""}`}
                                onClick={() => {
                                  setPhoneCountry(c);
                                  setPhoneCountryOpen(false);
                                }}
                              >
                                <CountryFlag code={c.code} name={c.name} />
                                <span className="ep-wa-ddi-option-text">
                                  <b>{c.name}</b>
                                  <small>{c.dial}</small>
                                </span>
                                {isSelected && <Check size={14} className="ep-wa-ddi-check" aria-hidden="true" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <input
                      className="ep-wa-unified-phone__input"
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="DDD + WhatsApp"
                      value={tutorPhone}
                      onChange={(e) => setTutorPhone(formatPhoneNumber(e.target.value, phoneCountry.code))}
                    />
                  </div>

                  {/* Optional Email Field */}
                  <input
                    className="ep-wa-clean-input"
                    type="email"
                    maxLength={100}
                    placeholder="E-mail (opcional)"
                    value={tutorEmail}
                    onChange={(e) => setTutorEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="ep-wa-submit-btn"
                  disabled={isSubmitting || !tutorName.trim() || !tutorPhone.trim()}
                >
                  <span>Continuar para o atendimento</span>
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
          <div className="ep-wa-stream-actions ep-wa-stream-actions--complete">
            <a
              href={completedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-wa-whatsapp-cta"
              onClick={(e) => {
                e.preventDefault();
                handleOpenWhatsAppCta();
              }}
            >
              <WhatsAppIconSvg size={19} color="#ffffff" />
              <span>Chamar equipe no WhatsApp</span>
            </a>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
