"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  AlertTriangle,
  Bird,
  CalendarDays,
  Cat,
  Check,
  ChevronDown,
  CircleHelp,
  Dog,
  MapPin,
  Minus,
  Plane,
  Plus,
  Rabbit,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { PublicLead } from "../../lead-contract";
import {
  resolveCountryCode,
  useCountrySuggestions,
} from "../../hooks/use-country-suggestions";
import { trackConversionEvent } from "../../lib/analytics";
import { countryFlagSvg } from "../../lib/country-flag";
import { useLocale } from "../../i18n/locale";

type Step = 1 | 2 | 3 | 4;
type PetKind = "Cachorro" | "Gato" | "Hamster" | "Exótico" | "Outro";
type PetDetail = {
  kind: PetKind;
  name?: string;
  breed: string;
  weight: string;
};
type RouteData = {
  origin: string;
  destination: string;
  period: string;
  originCode?: string;
  destinationCode?: string;
};

const phoneCountries = [
  { code: "BR", dial: "+55", name: "Brasil" },
  { code: "PT", dial: "+351", name: "Portugal" },
  { code: "US", dial: "+1", name: "Estados Unidos" },
  { code: "ES", dial: "+34", name: "Espanha" },
  { code: "FR", dial: "+33", name: "França" },
  { code: "AR", dial: "+54", name: "Argentina" },
  { code: "UY", dial: "+598", name: "Uruguai" },
  { code: "PY", dial: "+595", name: "Paraguai" },
];

const dialFromOrigin = (origin: string) =>
  phoneCountries.find((country) =>
    origin.toLocaleLowerCase().includes(country.name.toLocaleLowerCase()),
  ) ?? phoneCountries[0];

const petKinds: { label: PetKind; icon: LucideIcon }[] = [
  { label: "Cachorro", icon: Dog },
  { label: "Gato", icon: Cat },
  { label: "Hamster", icon: Rabbit },
  { label: "Exótico", icon: Bird },
];

const normalizedTravelPeriods: Record<string, string> = {
  "1 a 3 meses": "Dentro de 1 a 3 meses",
  "3 a 6 meses": "De 3 a 6 meses",
  "Mais de 6 meses": "De 6 a 12 meses",
  "Ainda não sei": "Sem data definida",
};

const normalizeTravelPeriod = (period: string) => normalizedTravelPeriods[period] ?? period;

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
  FR: { max: 9, format: (digits) => digits.replace(/(\d)(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2}).*$/, (_, a, b, c, d, e) => [a, b, c, d, e].filter(Boolean).join(" ")) },
  AR: { max: 10, format: (digits) => digits.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*$/, (_, area, first, last) => [area, first, last].filter(Boolean).join(" ")).replace(/(\d{4}) (\d)/, "$1-$2") },
  UY: { max: 8, format: (digits) => digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim() },
  PY: { max: 9, format: (digits) => digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim() },
};

const formatPhoneNumber = (value: string, countryCode: string) => {
  const digits = value.replace(/\D/g, "");
  const mask = phoneMasks[countryCode];
  return mask ? mask.format(digits.slice(0, mask.max)) : digits.slice(0, 15).replace(/(\d{3})(?=\d)/g, "$1 ");
};

const normalizePhoneNumber = (value: string, countryCode: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.slice(0, phoneMasks[countryCode]?.max ?? 15);
};

const formatWeight = (value: string) => {
  const normalized = value.replace(/[^\d,.]/g, "").replace(".", ",");
  if (!normalized) return "";
  const [whole = "", ...decimal] = normalized.split(",");
  const integer = whole.slice(0, 3) || "0";
  const fraction = decimal.join("").slice(0, 2);
  return normalized.includes(",") ? `${integer},${fraction}` : integer;
};

export function DiagnosticFlow({
  onComplete,
  onRouteChange,
  initialRoute,
  routeFirst = false,
  startAtPet = false,
  integrated = false,
  analyticsSource = routeFirst ? "mobile_header" : "hero_form",
}: {
  onComplete?: (lead: PublicLead) => void;
  onRouteChange?: (route: RouteData) => void;
  initialRoute?: Partial<RouteData>;
  routeFirst?: boolean;
  startAtPet?: boolean;
  integrated?: boolean;
  analyticsSource?: string;
}) {
  const { path, text, locale } = useLocale();
  // O pop-up móvel começa pela rota; o formulário da hero desktop preserva a ordem original.
  const [step, setStep] = useState<Step>(routeFirst && !startAtPet ? 2 : 1);
  const [firstKind, setFirstKind] = useState<PetKind | "">("");
  const [hasMultiplePets, setHasMultiplePets] = useState(false);
  const [petCounts, setPetCounts] = useState<Partial<Record<PetKind, number>>>(
    {},
  );
  const [otherPets, setOtherPets] = useState<string[]>([]);
  const [isChoosingOtherSpecies, setIsChoosingOtherSpecies] = useState(false);
  const [editingOtherSpecies, setEditingOtherSpecies] = useState<string | null>(null);
  const [otherSpeciesDraft, setOtherSpeciesDraft] = useState("");
  const [otherSpeciesQuantity, setOtherSpeciesQuantity] = useState(1);
  const [route, setRoute] = useState<RouteData>({
    origin: initialRoute?.origin ?? "",
    destination: initialRoute?.destination ?? "",
    period: normalizeTravelPeriod(initialRoute?.period ?? ""),
    originCode: initialRoute?.originCode ?? resolveCountryCode(initialRoute?.origin ?? "", locale),
    destinationCode: initialRoute?.destinationCode ?? resolveCountryCode(initialRoute?.destination ?? "", locale),
  });
  const [pets, setPets] = useState<PetDetail[]>([]);
  const [activePetDetail, setActivePetDetail] = useState(0);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [phoneCountryOpen, setPhoneCountryOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [hasSpecificDate, setHasSpecificDate] = useState(false);
  const hasTrackedStart = useRef(false);
  const otherPetCount = petCounts.Outro ?? 0;
  const totalOtherPets = hasMultiplePets
    ? otherPetCount
    : firstKind === "Outro"
      ? 1
      : 0;
  const identifiedOtherPets = otherPets.filter((pet) => pet.trim()).length;
  const otherSpecies = Array.from(
    otherPets.reduce((species, name) => {
      const normalized = name.trim();
      if (!normalized) return species;
      species.set(normalized, (species.get(normalized) ?? 0) + 1);
      return species;
    }, new Map<string, number>()),
  ).map(([name, count]) => ({ name, count }));
  const selectedPetCount = hasMultiplePets
    ? Object.values(petCounts).reduce((total, count) => total + (count ?? 0), 0)
    : firstKind
      ? 1
      : 0;
  const trackStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackConversionEvent("analysis_started", {
      source: analyticsSource,
      route_first: routeFirst,
    });
  };
  const go = (next: Step) => {
    if (next === 4 && !sent)
      trackConversionEvent("pets_completed", {
        source: analyticsSource,
        pet_count: pets.length,
        species: pets.map((pet) => pet.kind).join(","),
      });
    setStep(next);
  };
  const isBrazil = (name: string, code?: string) =>
    (code ?? resolveCountryCode(name, locale)) === "BR";
  const hasValidInternationalRoute = () => {
    const originIsBrazil = isBrazil(route.origin, route.originCode);
    const destinationIsBrazil = isBrazil(route.destination, route.destinationCode);
    return Boolean(route.origin && route.destination) && originIsBrazil !== destinationIsBrazil;
  };
  const setRouteField = (field: keyof RouteData, value: string) => {
    if (value.trim()) trackStart();
    setRoute((current) => ({
      ...current,
      [field]: value,
      ...(field === "origin" ? { originCode: resolveCountryCode(value, locale) } : {}),
      ...(field === "destination" ? { destinationCode: resolveCountryCode(value, locale) } : {}),
    }));
    if (field === "origin") setPhoneCountry(dialFromOrigin(value));
  };
  const setRouteCountry = (
    field: "origin" | "destination",
    name: string,
    code?: string,
  ) => {
    if (name.trim()) trackStart();
    setRoute((current) => {
      const selectedCode = code ?? resolveCountryCode(name, locale);
      const selectedIsBrazil = isBrazil(name, selectedCode);
      const counterpart = field === "origin" ? "destination" : "origin";
      const counterpartCode = field === "origin" ? "destinationCode" : "originCode";
      const next = {
        ...current,
        [field]: name,
        [field === "origin" ? "originCode" : "destinationCode"]: selectedCode,
      };

      // Toda análise é internacional: Brasil ↔ outro país. Ao selecionar um
      // país estrangeiro, o outro lado da rota vira Brasil automaticamente.
      if (selectedCode && !selectedIsBrazil) {
        return { ...next, [counterpart]: "Brasil", [counterpartCode]: "BR" };
      }
      if (selectedCode === "BR" && isBrazil(String(next[counterpart] ?? ""), String(next[counterpartCode] ?? "") || undefined)) {
        return { ...next, [counterpart]: "", [counterpartCode]: undefined };
      }
      return next;
    });
    if (field === "origin") setPhoneCountry(dialFromOrigin(name));
  };
  const updateKindCount = (kind: PetKind, count: number) =>
    setPetCounts((current) => ({
      ...current,
      [kind]: Math.max(0, Math.min(count, 4)),
    }));
  const enableMultiple = () => {
    setHasMultiplePets(true);
    setPetCounts(firstKind ? { [firstKind]: 1 } : {});
  };
  const disableMultiple = () => {
    setHasMultiplePets(false);
    setPetCounts({});
  };
  const toggleOther = () => {
    if (hasMultiplePets) {
      const count = petCounts.Outro ?? 0;
      updateKindCount("Outro", count ? 0 : 1);
      if (!firstKind && !count) setFirstKind("Outro");
      setOtherPets(count ? [] : [""]);
      return;
    }
    if (firstKind === "Outro") {
      setFirstKind("");
      setOtherPets([]);
      return;
    }
    setFirstKind("Outro");
    setOtherPets([""]);
  };
  const selectSinglePet = (kind: PetKind) => {
    trackStart();
    setFirstKind(kind);
    setPets([{ kind, breed: "", weight: "" }]);
  };
  const changeMultiCount = (kind: PetKind, nextCount: number) => {
    updateKindCount(kind, nextCount);
    if (kind === "Outro") {
      const count = Math.max(0, Math.min(nextCount, 4));
      setOtherPets((current) =>
        Array.from({ length: count }, (_, index) => current[index] ?? ""),
      );
    }
    if (nextCount > 0 && !firstKind) setFirstKind(kind);
  };
  const beginOtherSpeciesStep = () => {
    setEditingOtherSpecies(null);
    setOtherSpeciesDraft("");
    setOtherSpeciesQuantity(1);
    setIsChoosingOtherSpecies(true);
  };
  const editOtherSpecies = (name: string, count: number) => {
    setEditingOtherSpecies(name);
    setOtherSpeciesDraft(name);
    setOtherSpeciesQuantity(count);
  };
  const saveOtherSpecies = () => {
    const name = otherSpeciesDraft.trim();
    if (!name || !totalOtherPets) return;
    const remaining = otherPets.filter(
      (pet) => !editingOtherSpecies || pet.trim() !== editingOtherSpecies,
    );
    const available = totalOtherPets - remaining.filter((pet) => pet.trim()).length;
    const quantity = Math.max(1, Math.min(otherSpeciesQuantity, available));
    setOtherPets(
      [...remaining.filter((pet) => pet.trim()), ...Array(quantity).fill(name)].slice(
        0,
        totalOtherPets,
      ),
    );
    setEditingOtherSpecies(null);
    setOtherSpeciesDraft("");
    setOtherSpeciesQuantity(1);
  };
  const removeOtherSpecies = () => {
    if (!editingOtherSpecies) return;
    setOtherPets((current) =>
      current.filter((pet) => pet.trim() !== editingOtherSpecies),
    );
    setEditingOtherSpecies(null);
    setOtherSpeciesDraft("");
    setOtherSpeciesQuantity(1);
  };
  const createPetsFromKinds = () => {
    const selected = Object.entries(petCounts).flatMap(([kind, count]) =>
      Array.from({ length: count ?? 0 }, (_, index) => ({
        kind: kind as PetKind,
        breed: kind === "Outro" ? (otherPets[index] ?? "") : "",
        weight: "",
      })),
    );
    setPets(
      selected.length
        ? selected
        : [
            {
              kind: firstKind as PetKind,
              breed: firstKind === "Outro" ? (otherPets[0] ?? "") : "",
              weight: "",
            },
          ],
    );
    setActivePetDetail(0);
  };
  const advancePets = () => {
    if (totalOtherPets > 0) {
      beginOtherSpeciesStep();
      return;
    }
    createPetsFromKinds();
    go(routeFirst ? 3 : 2);
  };
  const changePet = (index: number, field: keyof PetDetail, value: string) =>
    setPets((current) =>
      current.map((pet, petIndex) =>
        petIndex === index ? ({ ...pet, [field]: value } as PetDetail) : pet,
      ),
    );
  const advanceRoute = () => {
    trackConversionEvent("route_completed", {
      source: analyticsSource,
      has_origin: Boolean(route.origin),
      has_destination: Boolean(route.destination),
      travel_period: route.period,
    });
    onRouteChange?.(route);
    go(routeFirst ? 1 : 3);
  };
  const swapRoute = () => {
    const nextOrigin = route.destination;
    setRoute((current) => ({
      ...current,
      origin: current.destination,
      destination: current.origin,
      originCode: current.destinationCode,
      destinationCode: current.originCode,
    }));
    setPhoneCountry(dialFromOrigin(nextOrigin));
  };
  const complete = () => {
    const lead: PublicLead = {
      source: analyticsSource,
      page: typeof window === "undefined" ? "/" : window.location.pathname,
      ...route,
      species: pets.map((pet) => pet.kind).join(", "),
      size: pets.map((pet) => pet.weight).join(", "),
      name: contact.name,
      phone: `${phoneCountry.dial}${contact.phone}`,
      consent: true,
    };
    const query = new URLSearchParams({
      destino: route.destination,
      animal: lead.species ?? "Pet",
      prazo: route.period,
      source: analyticsSource,
    });
    trackConversionEvent("form_submitted", {
      source: analyticsSource,
      pet_count: pets.length,
      travel_period: route.period,
    });
    trackConversionEvent("diagnostico_concluido", {
      source: analyticsSource,
      pet_count: pets.length,
      travel_period: route.period,
    });
    trackConversionEvent("lead_created", {
      source: analyticsSource,
      pet_count: pets.length,
      travel_period: route.period,
    });
    trackConversionEvent("analysis_completed", {
      source: analyticsSource,
      pet_count: pets.length,
      travel_period: route.period,
    });
    onComplete?.(lead);
    window.location.assign(`${path("/obrigado")}?${query.toString()}`);
  };
  const journeyStep = routeFirst
    ? step === 2
      ? 1
      : step === 1
        ? 2
        : step
    : step;

  return (
    <section
      className={`ep-diagnostic-flow ep-diagnostic-flow--hero ep-diagnostic-flow--step-${step}${integrated ? " ep-diagnostic-flow--integrated" : ""}${routeFirst ? " ep-diagnostic-flow--route-first" : ""}`}
      aria-label="Diagnóstico inicial da viagem"
    >
      {routeFirst ? (
        <header
          className="ep-flow-journey-header"
          aria-label="Resumo atualizado da viagem"
        >
          <div className="ep-flow-journey-progress">
            <span>Etapa {journeyStep} de 4</span>
            <span aria-hidden="true">
              <i style={{ width: `${journeyStep * 25}%` }} />
            </span>
          </div>
          <RoutePreview {...route} petCount={selectedPetCount} />
        </header>
      ) : null}
      {step === 1 && !isChoosingOtherSpecies && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Sobre seu pet</p>
          <h2 className="ep-flow-title">
            Quem <em>vai viajar?</em> <RequiredMark />
          </h2>
          <p className="ep-flow-intro">Comece escolhendo o tipo do seu pet.</p>
          <div
            className={
              hasMultiplePets
                ? "ep-pet-choice-grid ep-pet-choice-grid--multiple"
                : "ep-pet-choice-grid"
            }
          >
            {petKinds.map((pet) => {
              const count = petCounts[pet.label] ?? 0;
              const selected = hasMultiplePets
                ? count > 0
                : firstKind === pet.label;
              const PetIcon = pet.icon;
              return (
                <div
                  className={
                    selected ? "ep-pet-choice is-selected" : "ep-pet-choice"
                  }
                  key={pet.label}
                >
                  <button
                    type="button"
                    onClick={() =>
                      !hasMultiplePets && selectSinglePet(pet.label)
                    }
                    disabled={hasMultiplePets}
                  >
                    <span className="ep-pet-choice__icon">
                      <PetIcon size={28} strokeWidth={1.6} />
                    </span>
                    <span>{pet.label}</span>
                  </button>
                  {hasMultiplePets && selected ? (
                    <Check
                      className="ep-pet-choice__selected"
                      size={15}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  ) : null}
                  {hasMultiplePets ? (
                    <div className="ep-pet-choice__quantity">
                      <button
                        type="button"
                        aria-label={`Diminuir ${pet.label}`}
                        onClick={() => changeMultiCount(pet.label, count - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <b>{count}</b>
                      <button
                        type="button"
                        aria-label={`Aumentar ${pet.label}`}
                        onClick={() => changeMultiCount(pet.label, count + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div
            className={
              hasMultiplePets && otherPetCount > 0
                ? "ep-other-pet is-selected"
                : "ep-other-pet"
            }
          >
            <div className="ep-other-pet__heading">
              <button
                type="button"
                onClick={toggleOther}
                aria-expanded={
                  hasMultiplePets ? otherPetCount > 0 : firstKind === "Outro"
                }
              >
                <CircleHelp size={17} />
                <span>Outro</span>
              </button>
            </div>
            {hasMultiplePets ? (
              <div className="ep-pet-choice__quantity">
                <button
                  type="button"
                  onClick={() => changeMultiCount("Outro", otherPetCount - 1)}
                  aria-label="Diminuir outro animal"
                >
                  <Minus size={12} />
                </button>
                <b>{otherPetCount}</b>
                <button
                  type="button"
                  onClick={() => changeMultiCount("Outro", otherPetCount + 1)}
                  aria-label="Aumentar outro animal"
                >
                  <Plus size={12} />
                </button>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="ep-multi-pet-trigger"
            onClick={hasMultiplePets ? disableMultiple : enableMultiple}
          >
            <em>
              {hasMultiplePets
                ? "Não vou viajar com mais de um pet"
                : "Vai viajar com mais de um pet?"}
            </em>
          </button>
          <FlowActions
            back={routeFirst ? () => go(2) : undefined}
            next={advancePets}
            nextLabel="Continuar"
            disabled={
              hasMultiplePets
                ? Object.values(petCounts).every((count) => !count)
                : !firstKind
            }
          />
        </div>
      )}

      {step === 1 && isChoosingOtherSpecies && (
        <div className="ep-flow-card ep-other-species-step">
          <p className="ep-flow-kicker">Outros pets</p>
          <h2 className="ep-flow-title">
            Quais outros pets <em>vão viajar?</em>
          </h2>
          <p className="ep-flow-intro">
            Identifique cada espécie para montarmos uma análise compatível com todos.
          </p>
          <div className="ep-other-species-summary" aria-live="polite">
            <span>{identifiedOtherPets} de {totalOtherPets} pets identificados</span>
            <i aria-hidden="true"><b style={{ width: `${(identifiedOtherPets / totalOtherPets) * 100}%` }} /></i>
          </div>
          <div className="ep-other-species-chips" aria-label="Espécies adicionadas">
            {otherSpecies.map(({ name, count }) => (
              <button
                type="button"
                className={editingOtherSpecies === name ? "is-active" : ""}
                key={name}
                onClick={() => editOtherSpecies(name, count)}
              >
                <span>{name}</span>
                <b>× {count}</b>
              </button>
            ))}
            {identifiedOtherPets < totalOtherPets ? (
              <button
                type="button"
                className="ep-other-species-chips__add"
                onClick={() => {
                  setEditingOtherSpecies(null);
                  setOtherSpeciesDraft("");
                  setOtherSpeciesQuantity(1);
                }}
              >
                <Plus size={14} aria-hidden="true" /> Adicionar espécie
              </button>
            ) : null}
          </div>
          <div className="ep-other-species-editor">
            <label>
              <span>Espécie</span>
              <input
                value={otherSpeciesDraft}
                onChange={(event) => setOtherSpeciesDraft(event.target.value)}
                placeholder="Ex.: coelho, ave, tartaruga"
                autoFocus
              />
            </label>
            <div className="ep-other-species-editor__quantity">
              <span>Quantidade</span>
              <div>
                <button
                  type="button"
                  onClick={() => setOtherSpeciesQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Diminuir quantidade"
                ><Minus size={14} /></button>
                <b>{otherSpeciesQuantity}</b>
                <button
                  type="button"
                  onClick={() => setOtherSpeciesQuantity((current) => Math.min(totalOtherPets - identifiedOtherPets + (editingOtherSpecies ? (otherSpecies.find((species) => species.name === editingOtherSpecies)?.count ?? 0) : 0), current + 1))}
                  aria-label="Aumentar quantidade"
                ><Plus size={14} /></button>
              </div>
            </div>
            <button
              type="button"
              className="ep-other-species-editor__save"
              onClick={saveOtherSpecies}
              disabled={!otherSpeciesDraft.trim()}
            >
              <Check size={14} aria-hidden="true" /> Salvar
            </button>
            {editingOtherSpecies ? (
              <button
                type="button"
                className="ep-other-species-editor__remove"
                onClick={removeOtherSpecies}
              >
                Remover
              </button>
            ) : null}
          </div>
          <FlowActions
            back={() => setIsChoosingOtherSpecies(false)}
            next={() => {
              createPetsFromKinds();
              setIsChoosingOtherSpecies(false);
              go(routeFirst ? 3 : 2);
            }}
            nextLabel="Continuar"
            disabled={identifiedOtherPets !== totalOtherPets}
          />
        </div>
      )}

      {step === 2 && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Sobre a viagem</p>
          <h2 className="ep-flow-title">Para onde <em>vocês vão?</em></h2>
          <p className="ep-flow-intro">
            A rota e o prazo já ajudam a abrir a conversa certa.
          </p>
          <p className="ep-flow-international-notice" role="note">
            <AlertTriangle size={16} aria-hidden="true" />
            <span>
              <b>Aviso importante:</b> {text.notice}
            </span>
          </p>
          <RoutePreview {...route} petCount={selectedPetCount} />
          <div className="ep-flow-fields ep-flow-fields--stack">
            <div className="ep-route-inline ep-route-inline--airport">
              <CityAirportField
                label="Origem"
                value={route.origin}
                onChange={(value, code) =>
                  setRouteCountry("origin", value, code)
                }
                counterpartCode={route.destinationCode}
              />
              <CityAirportField
                label="Destino"
                value={route.destination}
                onChange={(value, code) =>
                  setRouteCountry("destination", value, code)
                }
                counterpartCode={route.originCode}
              />
              {route.origin && route.destination ? (
                <button
                  type="button"
                  className="ep-route-inline__swap"
                  onClick={swapRoute}
                  aria-label="Inverter origem e destino"
                  title="Inverter origem e destino"
                >
                  <ArrowLeftRight size={16} aria-hidden="true" />
                </button>
              ) : null}
            </div>
            <div className="ep-travel-timing">
              <div className="ep-field">
                <span>
                  Quando pretende viajar? <RequiredMark />
                </span>
                {hasSpecificDate ? (
                  <CompactWheelDatePicker
                    value={route.period}
                    onChange={(value) => setRouteField("period", value)}
                  />
                ) : (
                  <TravelPeriodSelect
                    value={route.period}
                    onChange={(value) => setRouteField("period", value)}
                  />
                )}
              </div>
              <button
                type="button"
                className="ep-specific-date"
                onClick={() => {
                  setHasSpecificDate((current) => !current);
                  setRouteField("period", "");
                }}
              >
                {!hasSpecificDate ? (
                  <CalendarDays size={15} aria-hidden="true" />
                ) : null}
                {hasSpecificDate
                  ? "Prefiro informar só o período"
                  : "Já tenho uma data definida"}
              </button>
            </div>
          </div>
          <FlowActions
            back={routeFirst ? undefined : () => go(1)}
            next={advanceRoute}
            nextLabel="Continuar"
            disabled={!hasValidInternationalRoute() || !route.period}
          />
        </div>
      )}

      {step === 3 && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Detalhes que ajudam a analisar</p>
          <h2 className="ep-flow-title">Vamos conhecer <em>{pets.length > 1 ? "cada pet." : "seu pet."}</em></h2>
          {pets.length > 1 ? (
            <div className="ep-pet-detail-progress" aria-label={`Pet ${activePetDetail + 1} de ${pets.length}`}>
              <span>Pet {activePetDetail + 1} de {pets.length}</span>
              <i aria-hidden="true"><b style={{ width:`${((activePetDetail + 1) / pets.length) * 100}%` }} /></i>
            </div>
          ) : null}
          <div className="ep-pet-details">
            {pets.map((pet, index) => {
              if (index !== activePetDetail) return null;
              const PetIcon =
                petKinds.find((item) => item.label === pet.kind)?.icon ??
                CircleHelp;
              return (
                <div className="ep-pet-detail" key={index}>
                  <div className="ep-pet-detail__kind">
                    <span>
                      {index === 0 ? "Pet principal" : `Pet ${index + 1}`}
                    </span>
                    <span className="ep-pet-detail__select">
                      <PetIcon size={19} strokeWidth={1.7} />
                      <b>{pet.kind}</b>
                      <input
                        value={pet.name ?? ""}
                        onChange={(event) =>
                          changePet(index, "name", event.target.value)
                        }
                        placeholder="Nome do pet (opcional)"
                        aria-label={`Nome do ${index === 0 ? "pet principal" : `pet ${index + 1}`} (opcional)`}
                      />
                    </span>
                  </div>
                  <div className="ep-pet-detail__fields">
                    <label className={pet.breed === "Sem raça definida" ? "is-undefined" : ""}>
                      <span>
                        Raça ou espécie <RequiredMark />
                      </span>
                      <input
                        value={pet.breed}
                        onChange={(event) =>
                          changePet(index, "breed", event.target.value)
                        }
                        placeholder="Ex.: Sírio, Anão Russo, Teddy..."
                        disabled={pet.breed === "Sem raça definida"}
                        required
                      />
                    </label>
                    <label>
                      <span>
                        Peso aproximado (kg) <RequiredMark />
                      </span>
                      <input
                        inputMode="decimal"
                        value={pet.weight}
                        onChange={(event) =>
                          changePet(index, "weight", formatWeight(event.target.value))
                        }
                        placeholder="Ex.: 4,5 kg"
                        aria-describedby={`pet-weight-hint-${index}`}
                        required
                      />
                      <small id={`pet-weight-hint-${index}`}>Use quilogramas, com vírgula se necessário.</small>
                    </label>
                  </div>
                  <label className="ep-pet-detail__undefined">
                    <input
                      type="checkbox"
                      checked={pet.breed === "Sem raça definida"}
                      onChange={(event) =>
                        changePet(
                          index,
                          "breed",
                          event.target.checked ? "Sem raça definida" : "",
                        )
                      }
                    />
                    <span>Sem raça definida</span>
                  </label>
                </div>
              );
            })}
          </div>
          <FlowActions
            back={() => {
              if (activePetDetail > 0) {
                setActivePetDetail((current) => current - 1);
                return;
              }
              go(routeFirst ? 1 : 2);
            }}
            next={() => {
              if (activePetDetail < pets.length - 1) {
                setActivePetDetail((current) => current + 1);
                return;
              }
              go(4);
            }}
            nextLabel={activePetDetail < pets.length - 1 ? "Próximo pet" : "Continuar"}
            disabled={!pets[activePetDetail]?.breed || !pets[activePetDetail]?.weight}
          />
        </div>
      )}

      {step === 4 && !sent && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Quase pronto</p>
          <h2 className="ep-flow-title">Para quem enviamos <em>a análise?</em></h2>
          <div className="ep-flow-summary">
            <span className="ep-flow-summary__icon">
              <Plane size={21} aria-hidden="true" />
            </span>
            <span className="ep-flow-summary__content">
              <small>Sua rota</small>
              <b className="ep-flow-summary__route">
                <CountryFlag code={route.originCode} name={route.origin} />
                {route.origin} <i>→</i>
                <CountryFlag
                  code={route.destinationCode}
                  name={route.destination}
                />
                {route.destination}
              </b>
              <em>
                {pets.length} {pets.length === 1 ? "pet" : "pets"} ·{" "}
                {route.period}
              </em>
            </span>
          </div>
          <div className="ep-flow-fields ep-flow-fields--stack">
            <label className="ep-field">
              <span>
                Seu nome <RequiredMark />
              </span>
              <span className="ep-contact-input">
                <UserRound size={16} aria-hidden="true" />
                <input
                  value={contact.name}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Como podemos chamar você?"
                  required
                />
              </span>
            </label>
            <div className="ep-field">
              <span>
                WhatsApp com DDI <RequiredMark />
              </span>
              <span
                className="ep-contact-input ep-contact-input--phone"
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  )
                    setPhoneCountryOpen(false);
                }}
              >
                <button
                  className="ep-phone-country-trigger"
                  type="button"
                  aria-label={`País do WhatsApp: ${phoneCountry.name}`}
                  aria-haspopup="listbox"
                  aria-expanded={phoneCountryOpen}
                  onClick={() => setPhoneCountryOpen((current) => !current)}
                >
                  <img
                    src={countryFlagSvg(phoneCountry.code)}
                    alt={`Bandeira de ${phoneCountry.name}`}
                    width="24"
                    height="24"
                  />
                  <small>{phoneCountry.dial}</small>
                  <ChevronDown size={13} aria-hidden="true" />
                </button>
                {phoneCountryOpen ? (
                  <span
                    className="ep-phone-country-options"
                    role="listbox"
                    aria-label="Selecione o país do WhatsApp"
                  >
                    {phoneCountries.map((country) => (
                      <button
                        type="button"
                        role="option"
                        aria-selected={country.code === phoneCountry.code}
                        className={
                          country.code === phoneCountry.code
                            ? "is-selected"
                            : ""
                        }
                        key={country.code}
                        onClick={() => {
                          setPhoneCountry(country);
                          setPhoneCountryOpen(false);
                        }}
                      >
                        <img
                          src={countryFlagSvg(country.code)}
                          alt=""
                          width="24"
                          height="24"
                        />
                        <span>
                          <b>{country.name}</b>
                          <small>{country.dial}</small>
                        </span>
                        {country.code === phoneCountry.code ? (
                          <Check size={14} aria-hidden="true" />
                        ) : null}
                      </button>
                    ))}
                  </span>
                ) : null}
                <input
                  aria-label="Número do WhatsApp"
                  inputMode="tel"
                  value={formatPhoneNumber(contact.phone, phoneCountry.code)}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      phone: normalizePhoneNumber(event.target.value, phoneCountry.code),
                    }))
                  }
                  placeholder="Número do WhatsApp"
                  required
                />
              </span>
              <small className="ep-phone-hint">
                Preenchido pelo país de origem. Você pode alterar o país.
              </small>
            </div>
          </div>
          <FlowActions
            back={() => go(3)}
            next={complete}
            nextLabel="Ver meu resumo"
            disabled={!contact.name || !contact.phone}
          />
        </div>
      )}

      {step === 4 && sent && (
        <div className="ep-flow-card ep-flow-success">
          <span>
            <Check size={23} />
          </span>
          <p className="ep-eyebrow">Resumo preparado</p>
          <h2 className="ep-flow-title">
            Sua viagem está pronta <em>para análise.</em>
          </h2>
          <p className="ep-flow-intro">
            {route.origin} → {route.destination} · {pets.length}{" "}
            {pets.length === 1 ? "pet" : "pets"}
          </p>
          <button type="button" className="ep-button ep-button--primary">
            Continuar no WhatsApp <ArrowRight size={16} />
          </button>
          <small>
            Fluxo de frontend: o envio ao banco será conectado na próxima fase.
          </small>
        </div>
      )}
    </section>
  );
}

function RoutePreview({
  origin,
  destination,
  period,
  originCode,
  destinationCode,
  petCount,
}: RouteData & { petCount: number }) {
  const petLabel = petCount
    ? `${petCount} ${petCount === 1 ? "pet" : "pets"}`
    : "";
  const hasRouteMeta = Boolean(petLabel || period);
  return (
    <div className="ep-flow-route-preview" aria-live="polite">
      <span className="ep-flow-route-preview__icon">
        <Plane size={18} aria-hidden="true" />
      </span>
      <span className="ep-flow-route-preview__content">
        <small>Sua rota</small>
        <span className="ep-flow-route-preview__main">
          <b>
            <span title={origin}>
              <CountryFlag code={originCode} name={origin} />
              {origin || "Origem"}
            </span>
            <i>→</i>
            <span title={destination}>
              <CountryFlag code={destinationCode} name={destination} />
              {destination || "Destino"}
            </span>
          </b>
          {hasRouteMeta ? (
            <span className="ep-flow-route-preview__meta">
              {petLabel ? <em>{petLabel}</em> : null}
              {period ? <em>{period}</em> : null}
            </span>
          ) : null}
        </span>
      </span>
    </div>
  );
}

function TravelPeriodSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const options = [
    "Dentro de 1 a 3 meses",
    "De 3 a 6 meses",
    "De 6 a 12 meses",
    "Sem data definida",
  ];
  return (
    <div
      className="ep-period-pills"
      role="radiogroup"
      aria-label="Quando pretende viajar?"
    >
      {options.map((option) => (
        <button
          type="button"
          role="radio"
          aria-checked={value === option}
          className={value === option ? "is-selected" : ""}
          key={option}
          onClick={() => onChange(option)}
        >
          <i aria-hidden="true">
            {value === option ? <Check size={14} /> : null}
          </i>
          <span>{option}</span>
        </button>
      ))}
    </div>
  );
}

function CityAirportField({
  label,
  value,
  onChange,
  counterpartCode,
}: {
  label: "Origem" | "Destino";
  value: string;
  onChange: (value: string, code?: string) => void;
  counterpartCode?: string;
}) {
  const [open, setOpen] = useState(false);
  const { locale, text } = useLocale();
  const suggestions = useCountrySuggestions(value, open, locale).filter((suggestion) => {
    if (!counterpartCode) return true;
    // Se um lado é Brasil, o outro precisa ser internacional; se já há um
    // país estrangeiro, a única contraparte válida é Brasil.
    return counterpartCode === "BR" ? suggestion.code !== "BR" : suggestion.code === "BR";
  });
  const canSuggest = value.trim().length >= 2;
  const chooseSuggestion = (suggestion: (typeof suggestions)[number]) => {
    onChange(suggestion.name, suggestion.code);
    setOpen(false);
  };

  return (
    <label className="ep-airport-field">
      <span>
        {label} <RequiredMark />
      </span>
      <span className="ep-airport-field__input">
        <MapPin size={15} aria-hidden="true" />
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value, undefined);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          placeholder={text.cityPlaceholder}
          autoComplete="off"
          aria-label={`${label}. ${text.cityPlaceholder}`}
          aria-expanded={open && canSuggest && suggestions.length > 0}
          aria-controls={`${label.toLowerCase()}-country-options`}
          required
        />
      </span>
      {open && canSuggest && suggestions.length > 0 ? (
        <span
          className="ep-airport-field__options"
          id={`${label.toLowerCase()}-country-options`}
          role="listbox"
        >
          {suggestions.map((suggestion) => (
            <button
              type="button"
              key={suggestion.code}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => chooseSuggestion(suggestion)}
              role="option"
            >
              <img
                src={countryFlagSvg(suggestion.code)}
                alt=""
                width="24"
                height="24"
              />
              <b>{suggestion.name}</b>
              <small>{suggestion.code}</small>
            </button>
          ))}
        </span>
      ) : null}
    </label>
  );
}

function RequiredMark() {
  return (
    <span className="ep-required-mark" aria-hidden="true">
      *
    </span>
  );
}

function CountryFlag({ code, name }: { code?: string; name?: string }) {
  const { locale } = useLocale();
  const resolvedCode = code ?? resolveCountryCode(name ?? "", locale);
  if (!resolvedCode) return null;
  return (
    <img
      className="ep-route-country-flag"
      src={countryFlagSvg(resolvedCode)}
      alt={`Bandeira de ${name || resolvedCode}`}
      width="22"
      height="22"
    />
  );
}

const dateToIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const isoToDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : undefined;
};

type DateWheelOption = {
  value: number;
  label: string;
  disabled?: boolean;
};

function CompactDateWheelColumn({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: DateWheelOption[];
  selected: number;
  onSelect: (value: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const readyForScroll = useRef(false);
  const scrollFrame = useRef<number | undefined>(undefined);
  const dragStart = useRef<{ y: number; scrollTop: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const index = options.findIndex((option) => option.value === selected);
    if (index < 0 || !scrollerRef.current) return;
    scrollerRef.current.scrollTop = index * 28;
    window.requestAnimationFrame(() => { readyForScroll.current = true; });
  }, [options, selected]);

  const selectFromScroll = (target: HTMLDivElement) => {
    if (!readyForScroll.current) return;
    if (scrollFrame.current !== undefined) window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = window.requestAnimationFrame(() => {
      const option = options[Math.round(target.scrollTop / 28)];
      if (option && !option.disabled && option.value !== selected) onSelect(option.value);
    });
  };

  const startMouseDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    dragStart.current = { y: event.clientY, scrollTop: event.currentTarget.scrollTop };
    dragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveMouseDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current || event.pointerType !== "mouse") return;
    const distance = event.clientY - dragStart.current.y;
    if (Math.abs(distance) > 2) dragged.current = true;
    event.currentTarget.scrollTop = dragStart.current.scrollTop - distance;
  };
  const finishMouseDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current || event.pointerType !== "mouse") return;
    dragStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    selectFromScroll(event.currentTarget);
  };

  return <div className="ep-date-wheel__column">
    <span>{label}</span>
    <div ref={scrollerRef} className="ep-date-wheel__scroller" onScroll={(event) => selectFromScroll(event.currentTarget)} onPointerDown={startMouseDrag} onPointerMove={moveMouseDrag} onPointerUp={finishMouseDrag} onPointerCancel={finishMouseDrag} onClickCapture={(event) => { if (!dragged.current) return; event.preventDefault(); event.stopPropagation(); dragged.current = false; }}>
      <i aria-hidden="true" />
      {options.map((option) => <button type="button" key={option.value} disabled={option.disabled} className={selected === option.value ? "is-selected" : ""} aria-pressed={selected === option.value} onClick={(event) => { if (!event.defaultPrevented) onSelect(option.value); }}>{option.label}</button>)}
      <i aria-hidden="true" />
    </div>
  </div>;
}

function CompactWheelDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { locale } = useLocale();
  const selectedDate = isoToDate(value);
  const today = new Date();
  const firstAvailableDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const baseDate = selectedDate && selectedDate >= firstAvailableDate ? selectedDate : firstAvailableDate;
  const [cursor, setCursor] = useState(() => new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate()));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const day = cursor.getDate();
  const currentYear = today.getFullYear();
  const commit = (nextYear: number, nextMonth: number, nextDay: number) => {
    const next = new Date(nextYear, nextMonth, Math.min(nextDay, new Date(nextYear, nextMonth + 1, 0).getDate()));
    if (next < firstAvailableDate) return;
    setCursor(next);
    onChange(dateToIso(next));
  };
  const days = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, index) => ({
    value: index + 1,
    label: String(index + 1).padStart(2, "0"),
    disabled: new Date(year, month, index + 1) < firstAvailableDate,
  }));
  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index,
    label: new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1)).replace(".", ""),
    disabled: new Date(year, index, 1) < new Date(firstAvailableDate.getFullYear(), firstAvailableDate.getMonth(), 1),
  }));
  const years = Array.from({ length: 6 }, (_, index) => ({ value: currentYear + index, label: String(currentYear + index) }));

  return (
    <div className="ep-date-wheel ep-date-wheel--compact" aria-label="Selecione a data da viagem">
      <div className="ep-date-wheel__compact-heading"><CalendarDays size={15} aria-hidden="true" /><span><b>Selecione a data do embarque</b><small>{selectedDate ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(selectedDate) : "Deslize ou toque para ajustar."}</small></span></div>
      <div className="ep-date-wheel__columns">
        <CompactDateWheelColumn label="Dia" options={days} selected={day} onSelect={(nextDay) => commit(year, month, nextDay)} />
        <CompactDateWheelColumn label="Mês" options={months} selected={month} onSelect={(nextMonth) => commit(year, nextMonth, day)} />
        <CompactDateWheelColumn label="Ano" options={years} selected={year} onSelect={(nextYear) => commit(nextYear, month, day)} />
      </div>
    </div>
  );
}

function FlowActions({
  back,
  next,
  nextLabel,
  disabled,
}: {
  back?: () => void;
  next: () => void;
  nextLabel: string;
  disabled?: boolean;
}) {
  const [showValidation, setShowValidation] = useState(false);
  const advance = () => {
    if (disabled) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    next();
  };
  return (
    <div
      className={`ep-flow-actions ${back ? "ep-flow-actions--split" : "ep-flow-actions--single"}`}
    >
      {showValidation ? (
        <small className="ep-flow-validation" role="alert">
          Preencha as informações desta etapa para continuar.
        </small>
      ) : null}
      {back ? (
        <button
          className="ep-button ep-button--text"
          type="button"
          onClick={back}
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      ) : null}
      <button
        className="ep-button ep-button--primary"
        type="button"
        aria-disabled={disabled}
        onClick={advance}
      >
        {nextLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
