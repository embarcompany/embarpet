"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bird,
  CalendarDays,
  Cat,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  const { path } = useLocale();
  // O pop-up móvel começa pela rota; o formulário da hero desktop preserva a ordem original.
  const [step, setStep] = useState<Step>(routeFirst && !startAtPet ? 2 : 1);
  const [firstKind, setFirstKind] = useState<PetKind | "">("");
  const [hasMultiplePets, setHasMultiplePets] = useState(false);
  const [petCounts, setPetCounts] = useState<Partial<Record<PetKind, number>>>(
    {},
  );
  const [otherPets, setOtherPets] = useState<string[]>([]);
  const [activeOtherPet, setActiveOtherPet] = useState(0);
  const [route, setRoute] = useState<RouteData>({
    origin: initialRoute?.origin ?? "",
    destination: initialRoute?.destination ?? "",
    period: initialRoute?.period ?? "",
    originCode: initialRoute?.originCode,
    destinationCode: initialRoute?.destinationCode,
  });
  const [pets, setPets] = useState<PetDetail[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [phoneCountryOpen, setPhoneCountryOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [hasSpecificDate, setHasSpecificDate] = useState(false);
  const hasTrackedStart = useRef(false);
  const otherPetCount = petCounts.Outro ?? 0;
  const activeOtherIndex = Math.min(
    activeOtherPet,
    Math.max(0, otherPetCount - 1),
  );
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
  const setRouteField = (field: keyof RouteData, value: string) => {
    if (value.trim()) trackStart();
    setRoute((current) => ({ ...current, [field]: value }));
    if (field === "origin") setPhoneCountry(dialFromOrigin(value));
  };
  const setRouteCountry = (
    field: "origin" | "destination",
    name: string,
    code?: string,
  ) => {
    if (name.trim()) trackStart();
    setRoute((current) => ({
      ...current,
      [field]: name,
      [field === "origin" ? "originCode" : "destinationCode"]: code,
    }));
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
      setActiveOtherPet(0);
      return;
    }
    if (firstKind === "Outro") {
      setFirstKind("");
      setOtherPets([]);
      setActiveOtherPet(0);
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
      setActiveOtherPet((current) => Math.min(current, Math.max(0, count - 1)));
    }
    if (nextCount > 0 && !firstKind) setFirstKind(kind);
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
  const complete = () => {
    const lead: PublicLead = {
      source: "hero-diagnostic",
      page: "/",
      ...route,
      species: pets.map((pet) => pet.kind).join(", "),
      size: pets.map((pet) => pet.weight).join(", "),
      name: contact.name,
      phone: contact.phone,
      consent: true,
    };
    const query = new URLSearchParams({
      destino: route.destination,
      animal: lead.species ?? "Pet",
      prazo: route.period,
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
      {step === 1 && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Sobre seu pet</p>
          <h2 className="ep-flow-title">
            Quem vai viajar? <RequiredMark />
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
              {(hasMultiplePets ? otherPetCount > 0 : firstKind === "Outro") ? (
                <input
                  value={otherPets[activeOtherIndex] ?? ""}
                  onChange={(event) =>
                    setOtherPets((current) =>
                      current.map((pet, index) =>
                        index === activeOtherIndex ? event.target.value : pet,
                      ),
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      !hasMultiplePets &&
                      event.key === "Enter" &&
                      otherPets[0]
                    )
                      selectSinglePet("Outro");
                  }}
                  placeholder={
                    hasMultiplePets
                      ? `Qual animal ${activeOtherIndex + 1}? *`
                      : "Qual animal? *"
                  }
                  aria-label={`Qual é o outro animal ${activeOtherIndex + 1}?`}
                  aria-required="true"
                />
              ) : null}
            </div>
            {hasMultiplePets && otherPetCount > 1 ? (
              <div className="ep-other-pet__sequence">
                <span>
                  Animal {activeOtherIndex + 1} de {otherPetCount}
                </span>
                {activeOtherIndex < otherPetCount - 1 ? (
                  <button
                    type="button"
                    disabled={!otherPets[activeOtherIndex]}
                    onClick={() => setActiveOtherPet((current) => current + 1)}
                  >
                    Próximo animal <ArrowRight size={13} />
                  </button>
                ) : (
                  <button type="button" onClick={() => setActiveOtherPet(0)}>
                    Revisar animais
                  </button>
                )}
              </div>
            ) : null}
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
            next={() => {
              createPetsFromKinds();
              go(routeFirst ? 3 : 2);
            }}
            nextLabel="Continuar"
            disabled={
              hasMultiplePets
                ? (otherPetCount > 0 &&
                    otherPets.slice(0, otherPetCount).some((pet) => !pet)) ||
                  Object.values(petCounts).every((count) => !count)
                : !firstKind || (firstKind === "Outro" && !otherPets[0])
            }
          />
        </div>
      )}

      {step === 2 && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Sobre a viagem</p>
          <h2 className="ep-flow-title">Para onde vocês vão?</h2>
          <p className="ep-flow-intro">
            A rota e o prazo já ajudam a abrir a conversa certa.
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
              />
              <CityAirportField
                label="Destino"
                value={route.destination}
                onChange={(value, code) =>
                  setRouteCountry("destination", value, code)
                }
              />
            </div>
            <div className="ep-travel-timing">
              <div className="ep-field">
                <span>
                  Quando pretende viajar? <RequiredMark />
                </span>
                {hasSpecificDate ? (
                  <InlineDateCalendar
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
                  ? "Não tenho data definida"
                  : "Já tenho uma data definida"}
              </button>
            </div>
          </div>
          <FlowActions
            back={routeFirst ? undefined : () => go(1)}
            next={advanceRoute}
            nextLabel="Continuar"
            disabled={!route.origin || !route.destination || !route.period}
          />
        </div>
      )}

      {step === 3 && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Detalhes que ajudam a analisar</p>
          <h2 className="ep-flow-title">Vamos conhecer os pets.</h2>
          <div className="ep-pet-details">
            {pets.map((pet, index) => {
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
                    <label>
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
                          changePet(index, "weight", event.target.value)
                        }
                        placeholder="Ex.: 0,15"
                        required
                      />
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
            back={() => go(routeFirst ? 1 : 2)}
            next={() => go(4)}
            nextLabel="Continuar"
            disabled={pets.some((pet) => !pet.breed || !pet.weight)}
          />
        </div>
      )}

      {step === 4 && !sent && (
        <div className="ep-flow-card">
          <p className="ep-flow-kicker">Quase pronto</p>
          <h2 className="ep-flow-title">Para quem enviamos a análise?</h2>
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
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      phone: event.target.value.replace(/\D/g, ""),
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
            Sua viagem está pronta para análise.
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
    : "Inclua seu pet";
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
          <span className="ep-flow-route-preview__meta">
            <em>{petLabel}</em>
            <em>{period || "Defina o prazo"}</em>
          </span>
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
          <span>{option}</span>
          <i aria-hidden="true">
            {value === option ? <Check size={14} /> : null}
          </i>
        </button>
      ))}
    </div>
  );
}

function CityAirportField({
  label,
  value,
  onChange,
}: {
  label: "Origem" | "Destino";
  value: string;
  onChange: (value: string, code?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { locale, text } = useLocale();
  const suggestions = useCountrySuggestions(value, open, locale);
  const canSuggest = value.trim().length >= 2;
  const chooseSuggestion = (suggestion: (typeof suggestions)[number]) => {
    onChange(suggestion.name, suggestion.code);
    setOpen(false);
  };

  return (
    <label className="ep-airport-field">
      <span>
        {label}: <RequiredMark />
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
          aria-label={`${label}: ${text.cityPlaceholder}`}
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

function InlineDateCalendar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { locale } = useLocale();
  const selectedDate = isoToDate(value);
  const today = useMemo(() => {
    const current = new Date();
    return new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
    );
  }, []);
  const [visibleMonth, setVisibleMonth] = useState(
    () => selectedDate ?? new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const calendarDays = useMemo(() => {
    const monthStart = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      1,
    );
    const gridStart = new Date(monthStart);
    gridStart.setDate(monthStart.getDate() - monthStart.getDay());
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + index);
      return date;
    });
  }, [visibleMonth]);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const selectedLabel = selectedDate
    ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
        selectedDate,
      )
    : "Escolha o dia da viagem";
  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2026, 7, 16 + index);
    return weekdayFormatter.format(day).replace(".", "");
  });

  return (
    <div className="ep-inline-calendar" aria-label="Selecione a data da viagem">
      <div className="ep-inline-calendar__selection" aria-live="polite">
        <CalendarDays size={18} aria-hidden="true" />
        <span>
          <small>Data escolhida</small>
          <b>{selectedLabel}</b>
        </span>
      </div>
      <div className="ep-inline-calendar__header">
        <button
          type="button"
          aria-label="Mês anterior"
          onClick={() =>
            setVisibleMonth(
              (current) =>
                new Date(current.getFullYear(), current.getMonth() - 1, 1),
            )
          }
        >
          <ChevronLeft size={18} />
        </button>
        <strong>{monthLabel}</strong>
        <button
          type="button"
          aria-label="Próximo mês"
          onClick={() =>
            setVisibleMonth(
              (current) =>
                new Date(current.getFullYear(), current.getMonth() + 1, 1),
            )
          }
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="ep-inline-calendar__weekdays" aria-hidden="true">
        {weekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className="ep-inline-calendar__grid" role="grid">
        {calendarDays.map((date) => {
          const iso = dateToIso(date);
          const outsideMonth = date.getMonth() !== visibleMonth.getMonth();
          const disabled = date < today;
          const selected = iso === value;
          return (
            <button
              type="button"
              role="gridcell"
              key={iso}
              className={`${outsideMonth ? "is-outside" : ""}${selected ? " is-selected" : ""}`}
              disabled={disabled}
              aria-pressed={selected}
              aria-label={new Intl.DateTimeFormat(locale, {
                dateStyle: "full",
              }).format(date)}
              onClick={() => onChange(iso)}
            >
              {date.getDate()}
            </button>
          );
        })}
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
