"use client";

import { useState } from "react";
import { CalendarDays, Check, ChevronDown } from "lucide-react";
import { useAirportSuggestions } from "../../hooks/use-airport-suggestions";

type RouteStarterData = { origin: string; destination: string; period: string };

const travelPeriods = ["Dentro de 1 a 3 meses", "De 3 a 6 meses", "Sem data definida"];

export function HeroRouteStarter() {
  const [route, setRoute] = useState<RouteStarterData>({ origin: "", destination: "", period: "" });
  const [activeField, setActiveField] = useState<"origin" | "destination" | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const invalidPeriod = showValidation && !route.period;
  const invalidOrigin = showValidation && !route.origin.trim();
  const invalidDestination = showValidation && !route.destination.trim();

  const setField = (field: keyof RouteStarterData, value: string) => setRoute((current) => ({ ...current, [field]: value }));
  const chooseRouteValue = (field: "origin" | "destination", value: string) => {
    setField(field, value);
    setActiveField(null);
  };

  const start = () => {
    if (!route.origin.trim() || !route.destination.trim() || !route.period) {
      setShowValidation(true);
      const selector = !route.period ? "[data-hero-period]" : !route.origin.trim() ? '[data-hero-route-field="origin"]' : '[data-hero-route-field="destination"]';
      window.requestAnimationFrame(() => document.querySelector<HTMLElement>(selector)?.focus());
      return;
    }
    window.location.assign(`/analise?${new URLSearchParams(route).toString()}`);
  };

  return (
    <form className="ep-hero-route-starter" onSubmit={(event) => { event.preventDefault(); start(); }} noValidate>
      <HeroTravelPeriodSelect value={route.period} invalid={invalidPeriod} onChange={(value) => setField("period", value)} />
      <div className="ep-hero-route-starter__route">
        <RouteField
          label="De onde seu pet parte?"
          field="origin"
          value={route.origin}
          active={activeField === "origin"}
          invalid={invalidOrigin}
          onChange={(value) => { setField("origin", value); setActiveField("origin"); }}
          onFocus={() => setActiveField("origin")}
          onBlur={() => window.setTimeout(() => setActiveField(null), 120)}
          onResolve={(value) => chooseRouteValue("origin", value)}
        />
        <span className="ep-hero-route-starter__line" aria-hidden="true" />
        <RouteField
          label="Para onde seu pet vai?"
          field="destination"
          value={route.destination}
          active={activeField === "destination"}
          invalid={invalidDestination}
          onChange={(value) => { setField("destination", value); setActiveField("destination"); }}
          onFocus={() => setActiveField("destination")}
          onBlur={() => window.setTimeout(() => setActiveField(null), 120)}
          onResolve={(value) => chooseRouteValue("destination", value)}
        />
      </div>
      <button className="ep-hero-route-starter__submit" type="submit"><span>Começar minha análise</span><img src="/embarpet-cta-plane-top.webp" alt="" aria-hidden="true" /></button>
    </form>
  );
}

function HeroTravelPeriodSelect({ value, invalid, onChange }: { value: string; invalid: boolean; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  return <div className={`ep-hero-route-starter__period${invalid ? " is-invalid" : ""}${open ? " is-open" : ""}`} onBlur={() => window.setTimeout(() => setOpen(false), 120)}>
    <CalendarDays size={16} aria-hidden="true" />
    <button data-hero-period type="button" aria-label="Quando deseja viajar?" aria-haspopup="listbox" aria-expanded={open} aria-invalid={invalid} onClick={() => setOpen((current) => !current)}><span>{value || "Quando deseja viajar?"}</span><ChevronDown aria-hidden="true" /></button>
    {open ? <div className="ep-hero-route-starter__period-options" role="listbox" aria-label="Quando deseja viajar?">{travelPeriods.map((period) => {
      const selected = value === period;
      return <button className={selected ? "is-selected" : undefined} type="button" key={period} role="option" aria-selected={selected} onMouseDown={(event) => event.preventDefault()} onClick={() => { onChange(period); setOpen(false); }}><span>{period}</span>{selected ? <Check size={16} aria-hidden="true" /> : null}</button>;
    })}</div> : null}
  </div>;
}

function RouteField({ label, field, value, active, invalid, onChange, onFocus, onBlur, onResolve }: {
  label: string;
  field: "origin" | "destination";
  value: string;
  active: boolean;
  invalid: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onResolve: (value: string) => void;
}) {
  const { suggestions, hasGoogleSuggestions, resolveSuggestion } = useAirportSuggestions(value, active);
  const showOptions = active && value.trim().length >= 3 && suggestions.length > 0;
  const requiredMessage = field === "origin" ? "Informe a cidade de origem" : "Informe a cidade de destino";
  const chooseSuggestion = async (suggestion: typeof suggestions[number]) => onResolve((await resolveSuggestion(suggestion)).value);

  return <label className={`ep-hero-route-starter__field${invalid ? " is-invalid" : ""}`}>
    <span className="ep-hero-route-starter__field-icon" role="img" aria-label={field === "origin" ? "Decolagem" : "Pouso"}>{field === "origin" ? "🛫" : "🛬"}</span>
    <span className="ep-hero-route-starter__field-content"><span>{label}</span><input data-hero-route-field={field} value={value} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} onBlur={onBlur} placeholder={invalid ? requiredMessage : "Digite uma cidade"} autoComplete="off" aria-invalid={invalid} aria-expanded={showOptions} aria-controls={`hero-${field}-options`} /></span>
    {showOptions ? <span className="ep-hero-route-starter__options" id={`hero-${field}-options`} role="listbox">
      {suggestions.map((suggestion, index) => <button type="button" key={suggestion.source === "local" ? `${suggestion.airport.city}-${suggestion.airport.iata}` : `${suggestion.source}-${index}`} role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => void chooseSuggestion(suggestion)}>
        {suggestion.source === "local" ? <><b>{suggestion.airport.city}, {suggestion.airport.country}</b><small>{suggestion.airport.iata} · {suggestion.airport.airport}</small></> : suggestion.source === "google" ? <><b>{suggestion.label}</b><small>{suggestion.detail} · aeroporto sugerido após a seleção</small></> : <><b>Usar “{suggestion.value}”</b><small>Vamos confirmar o aeroporto ideal na análise.</small></>}
      </button>)}
      {hasGoogleSuggestions ? <span className="ep-hero-route-starter__google-attribution"><img src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png" alt="Google" /></span> : null}
    </span> : null}
  </label>;
}
