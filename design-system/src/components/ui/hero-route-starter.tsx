"use client";

import { useState } from "react";
import { useAirportSuggestions } from "../../hooks/use-airport-suggestions";
import { useLocale } from "../../i18n/locale";

type RouteStarterData = { origin: string; destination: string };

export function HeroRouteStarter() {
  const { text } = useLocale();
  const [route, setRoute] = useState<RouteStarterData>({ origin: "", destination: "" });
  const [activeField, setActiveField] = useState<"origin" | "destination" | null>(null);

  const setField = (field: keyof RouteStarterData, value: string) => setRoute((current) => ({ ...current, [field]: value }));
  const chooseRouteValue = (field: "origin" | "destination", value: string) => {
    setField(field, value);
    setActiveField(null);
  };

  const start = () => window.dispatchEvent(new CustomEvent("embarp:open-analysis", { detail: route }));

  return (
    <form className="ep-hero-route-starter" onSubmit={(event) => { event.preventDefault(); start(); }} noValidate>
      <div className="ep-hero-route-starter__route">
        <RouteField
          label={text.origin}
          field="origin"
          value={route.origin}
          active={activeField === "origin"}
          invalid={false}
          onChange={(value) => { setField("origin", value); setActiveField("origin"); }}
          onFocus={() => setActiveField("origin")}
          onBlur={() => window.setTimeout(() => setActiveField(null), 120)}
          onResolve={(value) => chooseRouteValue("origin", value)}
          placeholder={text.cityPlaceholder}
        />
        <span className="ep-hero-route-starter__line" aria-hidden="true" />
        <RouteField
          label={text.destination}
          field="destination"
          value={route.destination}
          active={activeField === "destination"}
          invalid={false}
          onChange={(value) => { setField("destination", value); setActiveField("destination"); }}
          onFocus={() => setActiveField("destination")}
          onBlur={() => window.setTimeout(() => setActiveField(null), 120)}
          onResolve={(value) => chooseRouteValue("destination", value)}
          placeholder={text.cityPlaceholder}
        />
      </div>
      <button className="ep-hero-route-starter__submit is-ready" type="submit" aria-label={text.startAnalysis}><span>{text.startAnalysis}</span><img src="/embarpet-cta-plane-top.webp" alt="" aria-hidden="true" /></button>
    </form>
  );
}

function RouteField({ label, field, value, active, invalid, onChange, onFocus, onBlur, onResolve, placeholder }: {
  label: string;
  field: "origin" | "destination";
  value: string;
  active: boolean;
  invalid: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onResolve: (value: string) => void;
  placeholder: string;
}) {
  const { text } = useLocale();
  const { suggestions, hasGoogleSuggestions, resolveSuggestion } = useAirportSuggestions(value, active);
  const showOptions = active && value.trim().length >= 3 && suggestions.length > 0;
  const requiredMessage = field === "origin" ? text.originRequired : text.destinationRequired;
  const chooseSuggestion = async (suggestion: typeof suggestions[number]) => onResolve((await resolveSuggestion(suggestion)).value);

  return <label className={`ep-hero-route-starter__field${invalid ? " is-invalid" : ""}`}>
    <span className="ep-hero-route-starter__field-icon" role="img" aria-label={field === "origin" ? "Decolagem" : "Pouso"}>{field === "origin" ? "🛫" : "🛬"}</span>
    <span className="ep-hero-route-starter__field-content"><span>{label}</span><input data-hero-route-field={field} value={value} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} onBlur={onBlur} placeholder={invalid ? requiredMessage : placeholder} autoComplete="off" aria-invalid={invalid} aria-expanded={showOptions} aria-controls={`hero-${field}-options`} /></span>
    {showOptions ? <span className="ep-hero-route-starter__options" id={`hero-${field}-options`} role="listbox">
      {suggestions.map((suggestion, index) => <button type="button" key={suggestion.source === "local" ? `${suggestion.airport.city}-${suggestion.airport.iata}` : `${suggestion.source}-${index}`} role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => void chooseSuggestion(suggestion)}>
        {suggestion.source === "local" ? <><b>{suggestion.airport.city}, {suggestion.airport.country}</b><small>{suggestion.airport.iata} · {suggestion.airport.airport}</small></> : suggestion.source === "google" ? <><b>{suggestion.label}</b><small>{suggestion.detail} · aeroporto sugerido após a seleção</small></> : <><b>Usar “{suggestion.value}”</b><small>Vamos confirmar o aeroporto ideal na análise.</small></>}
      </button>)}
      {hasGoogleSuggestions ? <span className="ep-hero-route-starter__google-attribution"><img src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png" alt="Google" /></span> : null}
    </span> : null}
  </label>;
}
