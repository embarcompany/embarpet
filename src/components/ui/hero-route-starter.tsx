"use client";

import { useState } from "react";
import { ArrowLeftRight, MapPin, PlaneTakeoff } from "lucide-react";
import { resolveCountryCode, useCountrySuggestions } from "../../hooks/use-country-suggestions";
import { useLocale } from "../../i18n/locale";
import { countryFlagSvg } from "../../lib/country-flag";

type RouteStarterData = { origin: string; destination: string; originCode?: string; destinationCode?: string };

export function HeroRouteStarter() {
  const { text, locale, path } = useLocale();
  const [route, setRoute] = useState<RouteStarterData>({ origin: "", destination: "" });
  const [activeField, setActiveField] = useState<"origin" | "destination" | null>(null);

  const setField = (field: "origin" | "destination", value: string) => setRoute((current) => ({
    ...current,
    [field]: value,
    [field === "origin" ? "originCode" : "destinationCode"]: resolveCountryCode(value, locale),
  }));
  const chooseRouteValue = (field: "origin" | "destination", value: string, code: string) => {
    if (field === "destination" && code.toUpperCase() === "US") {
      window.location.assign(path("/destinos/estados-unidos"));
      return;
    }
    const otherField = field === "origin" ? "destination" : "origin";
    const otherCodeField = field === "origin" ? "destinationCode" : "originCode";
    const codeField = field === "origin" ? "originCode" : "destinationCode";
    setRoute((current) => {
      const next = { ...current, [field]: value, [codeField]: code };
      if (code !== "BR") return { ...next, [otherField]: "Brasil", [otherCodeField]: "BR" };
      if (next[otherCodeField] === "BR") return { ...next, [otherField]: "", [otherCodeField]: undefined };
      return next;
    });
    setActiveField(null);
  };
  const swapRoute = () => {
    setRoute((current) => ({
      ...current,
      origin: current.destination,
      destination: current.origin,
      originCode: current.destinationCode,
      destinationCode: current.originCode,
    }));
    setActiveField(null);
  };

  const start = () => {
    if (route.destinationCode?.toUpperCase() === "US") {
      window.location.assign(path("/destinos/estados-unidos"));
      return;
    }
    window.dispatchEvent(new CustomEvent("embarp:open-analysis", { detail: route }));
  };

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
          onResolve={(value, code) => chooseRouteValue("origin", value, code)}
          counterpartCode={route.destinationCode}
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
          onResolve={(value, code) => chooseRouteValue("destination", value, code)}
          counterpartCode={route.originCode}
          placeholder={text.cityPlaceholder}
        />
        {route.origin && route.destination ? (
          <button
            type="button"
            className="ep-hero-route-starter__swap"
            onClick={swapRoute}
            aria-label="Inverter origem e destino"
            title="Inverter origem e destino"
          >
            <ArrowLeftRight aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <button className="ep-hero-route-starter__submit is-ready" type="submit" aria-label={text.startAnalysis}><span>{text.startAnalysis}</span><img src="/embarpet-cta-plane-top.webp" alt="" aria-hidden="true" /></button>
    </form>
  );
}

function RouteField({ label, field, value, active, invalid, onChange, onFocus, onBlur, onResolve, counterpartCode, placeholder }: {
  label: string;
  field: "origin" | "destination";
  value: string;
  active: boolean;
  invalid: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onResolve: (value: string, code: string) => void;
  counterpartCode?: string;
  placeholder: string;
}) {
  const { text, locale } = useLocale();
  const suggestions = useCountrySuggestions(value, active, locale).filter((suggestion) => {
    if (!counterpartCode) return true;
    return counterpartCode === "BR" ? suggestion.code !== "BR" : suggestion.code === "BR";
  });
  const showOptions = active && value.trim().length >= 2 && suggestions.length > 0;
  const requiredMessage = field === "origin" ? text.originRequired : text.destinationRequired;
  const chooseSuggestion = (suggestion: typeof suggestions[number]) => onResolve(suggestion.name, suggestion.code);

  return <label className={`ep-hero-route-starter__field${invalid ? " is-invalid" : ""}`}>
    <span className="ep-hero-route-starter__field-icon" aria-hidden="true">{field === "origin" ? <PlaneTakeoff /> : <MapPin />}</span>
    <span className="ep-hero-route-starter__field-content"><span>{label}</span><input data-hero-route-field={field} value={value} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} onBlur={onBlur} placeholder={invalid ? requiredMessage : placeholder} autoComplete="off" aria-invalid={invalid} aria-expanded={showOptions} aria-controls={`hero-${field}-options`} /></span>
    {showOptions ? <span className="ep-hero-route-starter__options" id={`hero-${field}-options`} role="listbox">
      {suggestions.map((suggestion) => <button type="button" key={suggestion.code} role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => chooseSuggestion(suggestion)}>
        <img src={countryFlagSvg(suggestion.code)} alt="" width="24" height="24" /><b>{suggestion.name}</b><small>{suggestion.code}</small>
      </button>)}
    </span> : null}
  </label>;
}
