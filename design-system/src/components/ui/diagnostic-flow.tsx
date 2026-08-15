"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Bird, CalendarDays, Cat, Check, ChevronDown, CircleHelp, Dog, MapPin, Minus, Plane, Plus, Rabbit, UserRound, type LucideIcon } from "lucide-react";
import type { PublicLead } from "../../lead-contract";
import { airportCities, type AirportCity } from "../../data/airport-cities";
import { trackConversionEvent } from "../../lib/analytics";

type Step = 1 | 2 | 3 | 4;
type PetKind = "Cachorro" | "Gato" | "Hamster" | "Exótico" | "Outro";
type PetDetail = { kind: PetKind; name?: string; breed: string; weight: string };
type RouteData = { origin: string; destination: string; period: string };

const phoneCountries = [
  { code: "BR", flag: "🇧🇷", dial: "+55", name: "Brasil" },
  { code: "PT", flag: "🇵🇹", dial: "+351", name: "Portugal" },
  { code: "US", flag: "🇺🇸", dial: "+1", name: "Estados Unidos" },
  { code: "ES", flag: "🇪🇸", dial: "+34", name: "Espanha" },
  { code: "FR", flag: "🇫🇷", dial: "+33", name: "França" },
  { code: "AR", flag: "🇦🇷", dial: "+54", name: "Argentina" },
  { code: "UY", flag: "🇺🇾", dial: "+598", name: "Uruguai" },
  { code: "PY", flag: "🇵🇾", dial: "+595", name: "Paraguai" },
];

const dialFromOrigin = (origin: string) => phoneCountries.find((country) => origin.toLocaleLowerCase().includes(country.name.toLocaleLowerCase())) ?? phoneCountries[0];

const petKinds: { label: PetKind; icon: LucideIcon }[] = [
  { label: "Cachorro", icon: Dog },
  { label: "Gato", icon: Cat },
  { label: "Hamster", icon: Rabbit },
  { label: "Exótico", icon: Bird },
];

export function DiagnosticFlow({ onComplete, onRouteChange, initialRoute, routeFirst = false, startAtPet = false, integrated = false, analyticsSource = routeFirst ? "mobile_header" : "hero_form" }: { onComplete?: (lead: PublicLead) => void; onRouteChange?: (route: RouteData) => void; initialRoute?: Partial<RouteData>; routeFirst?: boolean; startAtPet?: boolean; integrated?: boolean; analyticsSource?: string }) {
  // O pop-up móvel começa pela rota; o formulário da hero desktop preserva a ordem original.
  const [step, setStep] = useState<Step>(routeFirst && !startAtPet ? 2 : 1);
  const [firstKind, setFirstKind] = useState<PetKind | "">("");
  const [hasMultiplePets, setHasMultiplePets] = useState(false);
  const [petCounts, setPetCounts] = useState<Partial<Record<PetKind, number>>>({});
  const [otherPets, setOtherPets] = useState<string[]>([]);
  const [activeOtherPet, setActiveOtherPet] = useState(0);
  const [route, setRoute] = useState<RouteData>({ origin: initialRoute?.origin ?? "", destination: initialRoute?.destination ?? "", period: initialRoute?.period ?? "" });
  const [pets, setPets] = useState<PetDetail[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [sent, setSent] = useState(false);
  const [hasSpecificDate, setHasSpecificDate] = useState(false);
  const hasTrackedStart = useRef(false);
  const otherPetCount = petCounts.Outro ?? 0;
  const activeOtherIndex = Math.min(activeOtherPet, Math.max(0, otherPetCount - 1));
  const selectedPetCount = hasMultiplePets ? Object.values(petCounts).reduce((total, count) => total + (count ?? 0), 0) : firstKind ? 1 : 0;
  const trackStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackConversionEvent("analysis_started", { source: analyticsSource, route_first: routeFirst });
  };
  const go = (next: Step) => {
    if (next === 4 && !sent) trackConversionEvent("pets_completed", { source: analyticsSource, pet_count: pets.length, species: pets.map((pet) => pet.kind).join(",") });
    setStep(next);
  };
  const setRouteField = (field: keyof RouteData, value: string) => {
    if (value.trim()) trackStart();
    setRoute((current) => ({ ...current, [field]: value }));
    if (field === "origin") setPhoneCountry(dialFromOrigin(value));
  };
  const updateKindCount = (kind: PetKind, count: number) => setPetCounts((current) => ({ ...current, [kind]: Math.max(0, Math.min(count, 4)) }));
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
    go(routeFirst ? 3 : 2);
  };
  const changeMultiCount = (kind: PetKind, nextCount: number) => {
    updateKindCount(kind, nextCount);
    if (kind === "Outro") {
      const count = Math.max(0, Math.min(nextCount, 4));
      setOtherPets((current) => Array.from({ length: count }, (_, index) => current[index] ?? ""));
      setActiveOtherPet((current) => Math.min(current, Math.max(0, count - 1)));
    }
    if (nextCount > 0 && !firstKind) setFirstKind(kind);
  };
  const createPetsFromKinds = () => {
    const selected = Object.entries(petCounts).flatMap(([kind, count]) => Array.from({ length: count ?? 0 }, (_, index) => ({ kind: kind as PetKind, breed: kind === "Outro" ? otherPets[index] ?? "" : "", weight: "" })));
    setPets(selected.length ? selected : [{ kind: firstKind as PetKind, breed: firstKind === "Outro" ? otherPets[0] ?? "" : "", weight: "" }]);
  };
  const changePet = (index: number, field: keyof PetDetail, value: string) => setPets((current) => current.map((pet, petIndex) => petIndex === index ? { ...pet, [field]: value } as PetDetail : pet));
  const advanceRoute = () => { trackConversionEvent("route_completed", { source: analyticsSource, has_origin: Boolean(route.origin), has_destination: Boolean(route.destination), travel_period: route.period }); onRouteChange?.(route); go(routeFirst ? 1 : 3); };
  const complete = () => {
    const lead: PublicLead = { source: "hero-diagnostic", page: "/", ...route, species: pets.map((pet) => pet.kind).join(", "), size: pets.map((pet) => pet.weight).join(", "), name: contact.name, phone: contact.phone, consent: true };
    trackConversionEvent("analysis_completed", { source: analyticsSource, pet_count: pets.length, travel_period: route.period }); onComplete?.(lead); setSent(true); setStep(4);
  };

  return <section className={`ep-diagnostic-flow ep-diagnostic-flow--hero ep-diagnostic-flow--step-${step}${integrated ? " ep-diagnostic-flow--integrated" : ""}`} aria-label="Diagnóstico inicial da viagem">
    {step === 1 && <div className="ep-flow-card"><p className="ep-flow-kicker">Sobre seu pet</p><h2 className="ep-flow-title">Quem vai viajar?</h2><p className="ep-flow-intro">Comece escolhendo o tipo do seu pet.</p><div className={hasMultiplePets ? "ep-pet-choice-grid ep-pet-choice-grid--multiple" : "ep-pet-choice-grid"}>{petKinds.map((pet) => { const count = petCounts[pet.label] ?? 0; const selected = hasMultiplePets ? count > 0 : firstKind === pet.label; const PetIcon = pet.icon; return <div className={selected ? "ep-pet-choice is-selected" : "ep-pet-choice"} key={pet.label}><button type="button" onClick={() => !hasMultiplePets && selectSinglePet(pet.label)} disabled={hasMultiplePets}><span className="ep-pet-choice__icon"><PetIcon size={28} strokeWidth={1.6} /></span><span>{pet.label}</span></button>{hasMultiplePets && selected ? <Check className="ep-pet-choice__selected" size={15} strokeWidth={3} aria-hidden="true" /> : null}{hasMultiplePets ? <div className="ep-pet-choice__quantity"><button type="button" aria-label={`Diminuir ${pet.label}`} onClick={() => changeMultiCount(pet.label, count - 1)}><Minus size={12} /></button><b>{count}</b><button type="button" aria-label={`Aumentar ${pet.label}`} onClick={() => changeMultiCount(pet.label, count + 1)}><Plus size={12} /></button></div> : null}</div>; })}</div><div className={hasMultiplePets && otherPetCount > 0 ? "ep-other-pet is-selected" : "ep-other-pet"}><div className="ep-other-pet__heading"><button type="button" onClick={toggleOther} aria-expanded={hasMultiplePets ? otherPetCount > 0 : firstKind === "Outro"}><CircleHelp size={17} /><span>Outro</span></button>{(hasMultiplePets ? otherPetCount > 0 : firstKind === "Outro") ? <input value={otherPets[activeOtherIndex] ?? ""} onChange={(event) => setOtherPets((current) => current.map((pet, index) => index === activeOtherIndex ? event.target.value : pet))} onKeyDown={(event) => { if (!hasMultiplePets && event.key === "Enter" && otherPets[0]) selectSinglePet("Outro"); }} placeholder={hasMultiplePets ? `Qual animal ${activeOtherIndex + 1}?` : "Qual animal?"} aria-label={`Qual é o outro animal ${activeOtherIndex + 1}?`} /> : null}</div>{hasMultiplePets && otherPetCount > 1 ? <div className="ep-other-pet__sequence"><span>Animal {activeOtherIndex + 1} de {otherPetCount}</span>{activeOtherIndex < otherPetCount - 1 ? <button type="button" disabled={!otherPets[activeOtherIndex]} onClick={() => setActiveOtherPet((current) => current + 1)}>Próximo animal <ArrowRight size={13} /></button> : <button type="button" onClick={() => setActiveOtherPet(0)}>Revisar animais</button>}</div> : null}{hasMultiplePets ? <div className="ep-pet-choice__quantity"><button type="button" onClick={() => changeMultiCount("Outro", otherPetCount - 1)} aria-label="Diminuir outro animal"><Minus size={12} /></button><b>{otherPetCount}</b><button type="button" onClick={() => changeMultiCount("Outro", otherPetCount + 1)} aria-label="Aumentar outro animal"><Plus size={12} /></button></div> : null}</div><button type="button" className="ep-multi-pet-trigger" onClick={hasMultiplePets ? disableMultiple : enableMultiple}><em>{hasMultiplePets ? "Não vou viajar com mais de um pet" : "Vai viajar com mais de um pet?"}</em></button>{hasMultiplePets ? <FlowActions back={routeFirst ? () => go(2) : undefined} next={() => { createPetsFromKinds(); go(routeFirst ? 3 : 2); }} nextLabel="Continuar" disabled={(otherPetCount > 0 && otherPets.slice(0, otherPetCount).some((pet) => !pet)) || Object.values(petCounts).every((count) => !count)} /> : null}</div>}

    {step === 2 && <div className="ep-flow-card"><p className="ep-flow-kicker">Sobre a viagem</p><h2 className="ep-flow-title">Para onde vocês vão?</h2><p className="ep-flow-intro">A rota e o prazo já ajudam a abrir a conversa certa.</p><RoutePreview origin={route.origin} destination={route.destination} period={route.period} petCount={selectedPetCount} /><div className="ep-flow-fields ep-flow-fields--stack"><div className="ep-route-inline ep-route-inline--airport"><CityAirportField label="Origem" value={route.origin} onChange={(value) => setRouteField("origin", value)} /><Plane className="ep-route-inline__arrow" size={17} aria-hidden="true" /><CityAirportField label="Destino" value={route.destination} onChange={(value) => setRouteField("destination", value)} /></div><div className="ep-travel-timing"><label className="ep-field"><span>Quando pretende viajar?</span>{hasSpecificDate ? <input type="month" value={route.period} onChange={(event) => setRouteField("period", event.target.value)} /> : <TravelPeriodSelect value={route.period} onChange={(value) => setRouteField("period", value)} />}</label><button type="button" className="ep-specific-date" onClick={() => { setHasSpecificDate((current) => !current); setRouteField("period", ""); }}><CalendarDays size={13} aria-hidden="true" />{hasSpecificDate ? "Não tenho data definida" : "Já tenho uma data definida"}</button></div></div><FlowActions back={routeFirst ? undefined : () => go(1)} next={advanceRoute} nextLabel="Continuar" disabled={!route.origin || !route.destination || !route.period} /></div>}

    {step === 3 && <div className="ep-flow-card"><p className="ep-flow-kicker">Detalhes que ajudam a analisar</p><h2 className="ep-flow-title">Vamos conhecer os pets.</h2><div className="ep-pet-details">{pets.map((pet, index) => { const PetIcon = petKinds.find((item) => item.label === pet.kind)?.icon ?? CircleHelp; return <div className="ep-pet-detail" key={index}><div className="ep-pet-detail__kind"><span>{index === 0 ? "Pet principal" : `Pet ${index + 1}`}</span><span className="ep-pet-detail__select"><PetIcon size={19} strokeWidth={1.7} /><b>{pet.kind}</b><input value={pet.name ?? ""} onChange={(event) => changePet(index, "name", event.target.value)} placeholder="Nome do pet (opcional)" aria-label={`Nome do ${index === 0 ? "pet principal" : `pet ${index + 1}`} (opcional)`} /></span></div><div className="ep-pet-detail__fields"><label><span>Raça ou espécie</span><input value={pet.breed} onChange={(event) => changePet(index, "breed", event.target.value)} placeholder="Ex.: Sírio, Anão Russo, Teddy..." disabled={pet.breed === "Sem raça definida"} /></label><label><span>Peso aproximado (kg)</span><input inputMode="decimal" value={pet.weight} onChange={(event) => changePet(index, "weight", event.target.value)} placeholder="Ex.: 0,15" /></label></div><label className="ep-pet-detail__undefined"><input type="checkbox" checked={pet.breed === "Sem raça definida"} onChange={(event) => changePet(index, "breed", event.target.checked ? "Sem raça definida" : "")} /><span>Sem raça definida</span></label></div>; })}</div><FlowActions back={() => go(routeFirst ? 1 : 2)} next={() => go(4)} nextLabel="Continuar" disabled={pets.some((pet) => !pet.breed || !pet.weight)} /></div>}

    {step === 4 && !sent && <div className="ep-flow-card"><p className="ep-flow-kicker">Quase pronto</p><h2 className="ep-flow-title">Para quem enviamos a análise?</h2><div className="ep-flow-summary"><span className="ep-flow-summary__icon"><Plane size={21} aria-hidden="true" /></span><span className="ep-flow-summary__content"><small>Sua rota</small><b>{route.origin} <i>→</i> {route.destination}</b><em>{pets.length} {pets.length === 1 ? "pet" : "pets"} · {route.period}</em></span></div><div className="ep-flow-fields ep-flow-fields--stack"><label className="ep-field"><span>Seu nome</span><span className="ep-contact-input"><UserRound size={16} aria-hidden="true" /><input value={contact.name} onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))} placeholder="Como podemos chamar você?" /></span></label><label className="ep-field"><span>WhatsApp com DDI</span><span className="ep-contact-input ep-contact-input--phone"><select value={phoneCountry.code} onChange={(event) => setPhoneCountry(phoneCountries.find((country) => country.code === event.target.value) ?? phoneCountries[0])} aria-label="País do WhatsApp">{phoneCountries.map((country) => <option key={country.code} value={country.code}>{country.flag} {country.name} ({country.dial})</option>)}</select><b>{phoneCountry.flag} <small>{phoneCountry.dial}</small></b><input inputMode="tel" value={contact.phone} onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value.replace(/\D/g, "") }))} placeholder="Número do WhatsApp" /></span><small className="ep-phone-hint">Preenchido pela cidade de origem. Você pode alterar o país.</small></label></div><FlowActions back={() => go(3)} next={complete} nextLabel="Ver meu resumo" disabled={!contact.name || !contact.phone} /></div>}

    {step === 4 && sent && <div className="ep-flow-card ep-flow-success"><span><Check size={23} /></span><p className="ep-eyebrow">Resumo preparado</p><h2 className="ep-flow-title">Sua viagem está pronta para análise.</h2><p className="ep-flow-intro">{route.origin} → {route.destination} · {pets.length} {pets.length === 1 ? "pet" : "pets"}</p><button type="button" className="ep-button ep-button--primary">Continuar no WhatsApp <ArrowRight size={16} /></button><small>Fluxo de frontend: o envio ao banco será conectado na próxima fase.</small></div>}
  </section>;
}

function RoutePreview({ origin, destination, period, petCount }: RouteData & { petCount: number }) {
  const petLabel = petCount ? `${petCount} ${petCount === 1 ? "pet" : "pets"}` : "Inclua seu pet";
  return <div className="ep-flow-route-preview" aria-live="polite"><span className="ep-flow-route-preview__icon"><Plane size={18} aria-hidden="true" /></span><span className="ep-flow-route-preview__content"><small>Sua rota</small><b><span title={origin}>{origin || "Origem"}</span><i>→</i><span title={destination}>{destination || "Destino"}</span></b><em>{petLabel}{period ? ` · ${period}` : " · Defina o prazo"}</em></span></div>;
}

function TravelPeriodSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const options = ["Dentro de 1 a 3 meses", "De 3 a 6 meses", "Sem data definida"];
  return <div className="ep-period-select" onBlur={() => window.setTimeout(() => setOpen(false), 120)}><button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}><span>{value || "Escolha uma previsão"}</span><ChevronDown size={16} aria-hidden="true" /></button>{open ? <div role="listbox">{options.map((option) => <button type="button" role="option" aria-selected={value === option} className={value === option ? "is-selected" : ""} key={option} onMouseDown={(event) => event.preventDefault()} onClick={() => { onChange(option); setOpen(false); }}><CalendarDays size={14} aria-hidden="true" /><span>{option}</span>{value === option ? <Check size={14} aria-hidden="true" /> : null}</button>)}</div> : null}</div>;
}

function CityAirportField({ label, value, onChange }: { label: "Origem" | "Destino"; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const matches = searchAirports(value);
  const choose = (airport: AirportCity) => {
    onChange(`${airport.city}, ${airport.country} · ${airport.iata}`);
    setOpen(false);
  };
  const canSuggest = value.trim().length >= 3;
  return <label className="ep-airport-field"><span>{label}:</span><span className="ep-airport-field__input"><MapPin size={15} aria-hidden="true" /><input value={value} onChange={(event) => { onChange(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => window.setTimeout(() => setOpen(false), 120)} placeholder="Digite uma cidade" autoComplete="off" aria-label={`${label}: digite uma cidade`} aria-expanded={open && canSuggest && matches.length > 0} aria-controls={`${label.toLowerCase()}-airport-options`} /></span>{open && canSuggest && matches.length > 0 ? <span className="ep-airport-field__options" id={`${label.toLowerCase()}-airport-options`} role="listbox">{matches.map((airport) => <button type="button" key={`${airport.city}-${airport.iata}`} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(airport)} role="option"><b>{airport.city}, {airport.country}</b><small>{airport.iata} · {airport.airport}</small></button>)}</span> : null}</label>;
}

const normalizeAirportSearch = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

function searchAirports(value: string) {
  const query = normalizeAirportSearch(value);
  if (query.length < 3) return [];

  const queryTokens = query.split(" ").filter(Boolean);
  return airportCities
    .map((airport) => {
      const city = normalizeAirportSearch(airport.city);
      const country = normalizeAirportSearch(airport.country);
      const airportName = normalizeAirportSearch(airport.airport);
      const iata = normalizeAirportSearch(airport.iata);
      const aliases = (airport.aliases ?? []).map(normalizeAirportSearch);
      const searchable = [city, country, airportName, iata, ...aliases];
      const matchesEveryTerm = queryTokens.every((term) => searchable.some((termValue) => termValue.includes(term)));
      if (!matchesEveryTerm) return null;

      // Código e cidade exatos ficam no topo; país e aeroporto continuam descobertos naturalmente.
      const score =
        (iata === query ? 1000 : 0) +
        (city === query ? 900 : city.startsWith(query) ? 700 : city.includes(query) ? 500 : 0) +
        (aliases.some((alias) => alias === query) ? 800 : aliases.some((alias) => alias.startsWith(query)) ? 600 : 0) +
        (airportName.startsWith(query) ? 450 : airportName.includes(query) ? 250 : 0) +
        (country === query ? 300 : country.startsWith(query) ? 180 : 0);
      return { airport, score };
    })
    .filter((result): result is { airport: AirportCity; score: number } => Boolean(result))
    .sort((left, right) => right.score - left.score || left.airport.city.localeCompare(right.airport.city, "pt-BR"))
    .slice(0, 6)
    .map(({ airport }) => airport);
}

function FlowActions({ back, next, nextLabel, disabled }: { back?: () => void; next: () => void; nextLabel: string; disabled?: boolean }) {
  return <div className="ep-flow-actions">{back ? <button className="ep-button ep-button--text" type="button" onClick={back}><ArrowLeft size={16} />Voltar</button> : <span />}<button className="ep-button ep-button--primary" type="button" disabled={disabled} onClick={next}>{nextLabel}<ArrowRight size={16} /></button></div>;
}
