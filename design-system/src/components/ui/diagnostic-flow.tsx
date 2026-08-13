"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Bird, CalendarDays, Cat, Check, ChevronDown, CircleHelp, Dog, MapPin, Minus, Plane, Plus, Rabbit, UserRound, type LucideIcon } from "lucide-react";
import type { PublicLead } from "../../lead-contract";
import { airportCities, type AirportCity } from "../../data/airport-cities";

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

export function DiagnosticFlow({ onComplete, onRouteChange }: { onComplete?: (lead: PublicLead) => void; onRouteChange?: (route: RouteData) => void }) {
  const [step, setStep] = useState<Step>(1);
  const [firstKind, setFirstKind] = useState<PetKind | "">("");
  const [hasMultiplePets, setHasMultiplePets] = useState(false);
  const [petCounts, setPetCounts] = useState<Partial<Record<PetKind, number>>>({});
  const [otherPets, setOtherPets] = useState<string[]>([]);
  const [route, setRoute] = useState<RouteData>({ origin: "", destination: "", period: "" });
  const [pets, setPets] = useState<PetDetail[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0]);
  const [sent, setSent] = useState(false);
  const [hasSpecificDate, setHasSpecificDate] = useState(false);
  const go = (next: Step) => setStep(next);
  const setRouteField = (field: keyof RouteData, value: string) => {
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
    setFirstKind(kind);
    setPets([{ kind, breed: "", weight: "" }]);
    go(2);
  };
  const changeMultiCount = (kind: PetKind, nextCount: number) => {
    updateKindCount(kind, nextCount);
    if (kind === "Outro") {
      const count = Math.max(0, Math.min(nextCount, 4));
      setOtherPets((current) => Array.from({ length: count }, (_, index) => current[index] ?? ""));
    }
    if (nextCount > 0 && !firstKind) setFirstKind(kind);
  };
  const createPetsFromKinds = () => {
    const selected = Object.entries(petCounts).flatMap(([kind, count]) => Array.from({ length: count ?? 0 }, (_, index) => ({ kind: kind as PetKind, breed: kind === "Outro" ? otherPets[index] ?? "" : "", weight: "" })));
    setPets(selected.length ? selected : [{ kind: firstKind as PetKind, breed: firstKind === "Outro" ? otherPets[0] ?? "" : "", weight: "" }]);
  };
  const changePet = (index: number, field: keyof PetDetail, value: string) => setPets((current) => current.map((pet, petIndex) => petIndex === index ? { ...pet, [field]: value } as PetDetail : pet));
  const advanceRoute = () => { onRouteChange?.(route); go(3); };
  const complete = () => {
    const lead: PublicLead = { source: "hero-diagnostic", page: "/", ...route, species: pets.map((pet) => pet.kind).join(", "), size: pets.map((pet) => pet.weight).join(", "), name: contact.name, phone: contact.phone, consent: true };
    onComplete?.(lead); setSent(true); go(4);
  };

  return <section className={`ep-diagnostic-flow ep-diagnostic-flow--hero ep-diagnostic-flow--step-${step}`} aria-label="Diagnóstico inicial da viagem">
    {step === 1 && <div className="ep-flow-card"><p className="ep-flow-kicker">Sobre seu pet</p><h2 className="ep-flow-title">Quem vai viajar?</h2><p className="ep-flow-intro">Comece escolhendo o tipo do seu pet.</p><div className={hasMultiplePets ? "ep-pet-choice-grid ep-pet-choice-grid--multiple" : "ep-pet-choice-grid"}>{petKinds.map((pet) => { const count = petCounts[pet.label] ?? 0; const selected = hasMultiplePets ? count > 0 : firstKind === pet.label; const PetIcon = pet.icon; return <div className={selected ? "ep-pet-choice is-selected" : "ep-pet-choice"} key={pet.label}><button type="button" onClick={() => !hasMultiplePets && selectSinglePet(pet.label)} disabled={hasMultiplePets}><span className="ep-pet-choice__icon"><PetIcon size={28} strokeWidth={1.6} /></span><span>{pet.label}</span></button>{hasMultiplePets && selected ? <Check className="ep-pet-choice__selected" size={15} strokeWidth={3} aria-hidden="true" /> : null}{hasMultiplePets ? <div className="ep-pet-choice__quantity"><button type="button" aria-label={`Diminuir ${pet.label}`} onClick={() => changeMultiCount(pet.label, count - 1)}><Minus size={12} /></button><b>{count}</b><button type="button" aria-label={`Aumentar ${pet.label}`} onClick={() => changeMultiCount(pet.label, count + 1)}><Plus size={12} /></button></div> : null}</div>; })}</div><div className={hasMultiplePets && (petCounts.Outro ?? 0) > 0 ? "ep-other-pet is-selected" : "ep-other-pet"}><div className="ep-other-pet__heading"><button type="button" onClick={toggleOther} aria-expanded={hasMultiplePets ? (petCounts.Outro ?? 0) > 0 : firstKind === "Outro"}><CircleHelp size={17} /><span>Outro</span></button>{(hasMultiplePets ? (petCounts.Outro ?? 0) > 0 : firstKind === "Outro") ? <input value={otherPets[0] ?? ""} onChange={(event) => setOtherPets((current) => [event.target.value, ...current.slice(1)])} onKeyDown={(event) => { if (!hasMultiplePets && event.key === "Enter" && otherPets[0]) selectSinglePet("Outro"); }} placeholder="Qual animal?" aria-label="Qual outro animal vai viajar?" /> : null}</div>{hasMultiplePets && otherPets.slice(1).map((pet, index) => <input className="ep-other-pet__input" key={index + 1} value={pet} onChange={(event) => setOtherPets((current) => current.map((item, petIndex) => petIndex === index + 1 ? event.target.value : item))} placeholder={`Outro animal ${index + 2}`} aria-label={`Qual é o outro animal ${index + 2}?`} />)}{hasMultiplePets ? <div className="ep-pet-choice__quantity"><button type="button" onClick={() => changeMultiCount("Outro", (petCounts.Outro ?? 0) - 1)} aria-label="Diminuir outro animal"><Minus size={12} /></button><b>{petCounts.Outro ?? 0}</b><button type="button" onClick={() => changeMultiCount("Outro", (petCounts.Outro ?? 0) + 1)} aria-label="Aumentar outro animal"><Plus size={12} /></button></div> : null}</div><button type="button" className="ep-multi-pet-trigger" onClick={hasMultiplePets ? disableMultiple : enableMultiple}><em>{hasMultiplePets ? "Não vou viajar com mais de um pet" : "Vai viajar com mais de um pet?"}</em></button>{hasMultiplePets ? <FlowActions next={() => { createPetsFromKinds(); go(2); }} nextLabel="Continuar" disabled={((petCounts.Outro ?? 0) > 0 && otherPets.slice(0, petCounts.Outro ?? 0).some((pet) => !pet)) || Object.values(petCounts).every((count) => !count)} /> : null}</div>}

    {step === 2 && <div className="ep-flow-card"><p className="ep-flow-kicker">Sobre a viagem</p><h2 className="ep-flow-title">Para onde vocês vão?</h2><p className="ep-flow-intro">A rota e o prazo já ajudam a abrir a conversa certa.</p><div className="ep-flow-fields ep-flow-fields--stack"><div className="ep-route-inline ep-route-inline--airport"><CityAirportField label="Origem" value={route.origin} onChange={(value) => setRouteField("origin", value)} /><Plane className="ep-route-inline__arrow" size={17} aria-hidden="true" /><CityAirportField label="Destino" value={route.destination} onChange={(value) => setRouteField("destination", value)} /></div><div className="ep-travel-timing"><label className="ep-field"><span>Quando pretende viajar?</span>{hasSpecificDate ? <input type="month" value={route.period} onChange={(event) => setRouteField("period", event.target.value)} /> : <TravelPeriodSelect value={route.period} onChange={(value) => setRouteField("period", value)} />}</label><button type="button" className="ep-specific-date" onClick={() => { setHasSpecificDate((current) => !current); setRouteField("period", ""); }}><CalendarDays size={13} aria-hidden="true" />{hasSpecificDate ? "Não tenho data definida" : "Já tenho uma data definida"}</button></div></div><FlowActions back={() => go(1)} next={advanceRoute} nextLabel="Continuar" disabled={!route.origin || !route.destination || !route.period} /></div>}

    {step === 3 && <div className="ep-flow-card"><p className="ep-flow-kicker">Detalhes que ajudam a analisar</p><h2 className="ep-flow-title">Vamos conhecer os pets.</h2><div className="ep-pet-details">{pets.map((pet, index) => { const PetIcon = petKinds.find((item) => item.label === pet.kind)?.icon ?? CircleHelp; return <div className="ep-pet-detail" key={index}><div className="ep-pet-detail__kind"><span>{index === 0 ? "Pet principal" : `Pet ${index + 1}`}</span><span className="ep-pet-detail__select"><PetIcon size={19} strokeWidth={1.7} /><b>{pet.kind}</b><input value={pet.name ?? ""} onChange={(event) => changePet(index, "name", event.target.value)} placeholder="Nome do pet (opcional)" aria-label={`Nome do ${index === 0 ? "pet principal" : `pet ${index + 1}`} (opcional)`} /></span></div><div className="ep-pet-detail__fields"><label><span>Raça ou espécie</span><input value={pet.breed} onChange={(event) => changePet(index, "breed", event.target.value)} placeholder="Ex.: Sírio, Anão Russo, Teddy..." disabled={pet.breed === "Sem raça definida"} /></label><label><span>Peso aproximado (kg)</span><input inputMode="decimal" value={pet.weight} onChange={(event) => changePet(index, "weight", event.target.value)} placeholder="Ex.: 0,15" /></label></div><label className="ep-pet-detail__undefined"><input type="checkbox" checked={pet.breed === "Sem raça definida"} onChange={(event) => changePet(index, "breed", event.target.checked ? "Sem raça definida" : "")} /><span>Sem raça definida</span></label></div>; })}</div><FlowActions back={() => go(2)} next={() => go(4)} nextLabel="Continuar" disabled={pets.some((pet) => !pet.breed || !pet.weight)} /></div>}

    {step === 4 && !sent && <div className="ep-flow-card"><p className="ep-flow-kicker">Quase pronto</p><h2 className="ep-flow-title">Para quem enviamos a análise?</h2><div className="ep-flow-summary"><span className="ep-flow-summary__icon"><Plane size={21} aria-hidden="true" /></span><span className="ep-flow-summary__content"><small>Sua rota</small><b>{route.origin} <i>→</i> {route.destination}</b><em>{pets.length} {pets.length === 1 ? "pet" : "pets"} · {route.period}</em></span></div><div className="ep-flow-fields ep-flow-fields--stack"><label className="ep-field"><span>Seu nome</span><span className="ep-contact-input"><UserRound size={16} aria-hidden="true" /><input value={contact.name} onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))} placeholder="Como podemos chamar você?" /></span></label><label className="ep-field"><span>WhatsApp com DDI</span><span className="ep-contact-input ep-contact-input--phone"><select value={phoneCountry.code} onChange={(event) => setPhoneCountry(phoneCountries.find((country) => country.code === event.target.value) ?? phoneCountries[0])} aria-label="País do WhatsApp">{phoneCountries.map((country) => <option key={country.code} value={country.code}>{country.flag} {country.name} ({country.dial})</option>)}</select><b>{phoneCountry.flag} <small>{phoneCountry.dial}</small></b><input inputMode="tel" value={contact.phone} onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value.replace(/\D/g, "") }))} placeholder="Número do WhatsApp" /></span><small className="ep-phone-hint">Preenchido pela cidade de origem. Você pode alterar o país.</small></label></div><FlowActions back={() => go(3)} next={complete} nextLabel="Ver meu resumo" disabled={!contact.name || !contact.phone} /></div>}

    {step === 4 && sent && <div className="ep-flow-card ep-flow-success"><span><Check size={23} /></span><p className="ep-eyebrow">Resumo preparado</p><h2 className="ep-flow-title">Sua viagem está pronta para análise.</h2><p className="ep-flow-intro">{route.origin} → {route.destination} · {pets.length} {pets.length === 1 ? "pet" : "pets"}</p><button type="button" className="ep-button ep-button--primary">Continuar no WhatsApp <ArrowRight size={16} /></button><small>Fluxo de frontend: o envio ao banco será conectado na próxima fase.</small></div>}
  </section>;
}

function TravelPeriodSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const options = ["Dentro de 1 a 3 meses", "De 3 a 6 meses", "Sem data definida"];
  return <div className="ep-period-select" onBlur={() => window.setTimeout(() => setOpen(false), 120)}><button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}><span>{value || "Escolha uma previsão"}</span><ChevronDown size={16} aria-hidden="true" /></button>{open ? <div role="listbox">{options.map((option) => <button type="button" role="option" aria-selected={value === option} className={value === option ? "is-selected" : ""} key={option} onMouseDown={(event) => event.preventDefault()} onClick={() => { onChange(option); setOpen(false); }}><CalendarDays size={14} aria-hidden="true" /><span>{option}</span>{value === option ? <Check size={14} aria-hidden="true" /> : null}</button>)}</div> : null}</div>;
}

function CityAirportField({ label, value, onChange }: { label: "Origem" | "Destino"; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const normalized = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const matches = airportCities.filter((airport) => `${airport.city} ${airport.country} ${airport.airport} ${airport.iata}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalized)).slice(0, 6);
  const choose = (airport: AirportCity) => {
    onChange(`${airport.city}, ${airport.country} · ${airport.iata}`);
    setOpen(false);
  };
  const canSuggest = value.trim().length >= 3;
  return <label className="ep-airport-field"><span>{label}:</span><span className="ep-airport-field__input"><MapPin size={15} aria-hidden="true" /><input value={value} onChange={(event) => { onChange(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => window.setTimeout(() => setOpen(false), 120)} placeholder="Digite uma cidade" autoComplete="off" aria-label={`${label}: digite uma cidade`} aria-expanded={open && canSuggest && matches.length > 0} aria-controls={`${label.toLowerCase()}-airport-options`} /></span>{open && canSuggest && matches.length > 0 ? <span className="ep-airport-field__options" id={`${label.toLowerCase()}-airport-options`} role="listbox">{matches.map((airport) => <button type="button" key={`${airport.city}-${airport.iata}`} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(airport)} role="option"><b>{airport.city}, {airport.country}</b><small>{airport.iata} · {airport.airport}</small></button>)}</span> : null}</label>;
}

function FlowActions({ back, next, nextLabel, disabled }: { back?: () => void; next: () => void; nextLabel: string; disabled?: boolean }) {
  return <div className="ep-flow-actions">{back ? <button className="ep-button ep-button--text" type="button" onClick={back}><ArrowLeft size={16} />Voltar</button> : <span />}<button className="ep-button ep-button--primary" type="button" disabled={disabled} onClick={next}>{nextLabel}<ArrowRight size={16} /></button></div>;
}
