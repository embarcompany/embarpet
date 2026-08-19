"use client";

import { useState } from "react";
import { MapPin, PlaneTakeoff } from "lucide-react";
import { useCountrySuggestions } from "../../hooks/use-country-suggestions";
import { useLocale } from "../../i18n/locale";
import { AnalysisButton } from "./buttons";

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
      <AnalysisButton className="ep-hero-route-starter__action" size="lg" type="submit" aria-label={text.startAnalysis}>{text.startAnalysis}</AnalysisButton>
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
  const { text, locale } = useLocale();
  const suggestions = useCountrySuggestions(value, active, locale);
  const showOptions = active && value.trim().length >= 2 && suggestions.length > 0;
  const requiredMessage = field === "origin" ? text.originRequired : text.destinationRequired;
  const chooseSuggestion = (suggestion: typeof suggestions[number]) => onResolve(suggestion.name);

  return <label className={`ep-hero-route-starter__field${invalid ? " is-invalid" : ""}`}>
    <span className="ep-hero-route-starter__field-icon" aria-hidden="true">{field === "origin" ? <PlaneTakeoff /> : <MapPin />}</span>
    <span className="ep-hero-route-starter__field-content"><span>{label}</span><input data-hero-route-field={field} value={value} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} onBlur={onBlur} placeholder={invalid ? requiredMessage : placeholder} autoComplete="off" aria-invalid={invalid} aria-expanded={showOptions} aria-controls={`hero-${field}-options`} /></span>
    {showOptions ? <span className="ep-hero-route-starter__options" id={`hero-${field}-options`} role="listbox">
      {suggestions.map((suggestion) => <button type="button" key={suggestion.code} role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => chooseSuggestion(suggestion)}>
        <img src={`https://flagcdn.com/w40/${suggestion.code.toLowerCase()}.png`} alt="" width="24" height="18" /><b>{suggestion.name}</b><small>{suggestion.code}</small>
      </button>)}
    </span> : null}
  </label>;
}
