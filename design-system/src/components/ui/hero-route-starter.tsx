"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Plane } from "lucide-react";
import { airportCities, type AirportCity } from "../../data/airport-cities";

type RouteStarterData = { origin: string; destination: string; period: string };

const travelPeriods = ["Dentro de 1 a 3 meses", "De 3 a 6 meses", "Sem data definida"];

export function HeroRouteStarter() {
  const [route, setRoute] = useState<RouteStarterData>({ origin: "", destination: "", period: "" });
  const [activeField, setActiveField] = useState<"origin" | "destination" | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const matches = activeField ? searchAirports(route[activeField]) : [];
  const invalidPeriod = showValidation && !route.period;
  const invalidOrigin = showValidation && !route.origin.trim();
  const invalidDestination = showValidation && !route.destination.trim();

  const setField = (field: keyof RouteStarterData, value: string) => {
    setRoute((current) => ({ ...current, [field]: value }));
  };

  const chooseAirport = (field: "origin" | "destination", airport: AirportCity) => {
    setField(field, `${airport.city}, ${airport.country} · ${airport.iata}`);
    setActiveField(null);
  };

  const start = () => {
    if (!route.origin.trim() || !route.destination.trim() || !route.period) {
      setShowValidation(true);
      const selector = !route.period
        ? "[data-hero-period]"
        : !route.origin.trim()
          ? '[data-hero-route-field="origin"]'
          : '[data-hero-route-field="destination"]';
      window.requestAnimationFrame(() => document.querySelector<HTMLElement>(selector)?.focus());
      return;
    }

    const query = new URLSearchParams(route).toString();
    window.location.assign(`/analise?${query}`);
  };

  return (
    <form className="ep-hero-route-starter" onSubmit={(event) => { event.preventDefault(); start(); }} noValidate>
      <label className={`ep-hero-route-starter__period${invalidPeriod ? " is-invalid" : ""}`}>
        <CalendarDays size={16} aria-hidden="true" />
        <select
          data-hero-period
          value={route.period}
          onChange={(event) => setField("period", event.target.value)}
          aria-label="Quando deseja viajar?"
          aria-invalid={invalidPeriod}
        >
          <option value="" disabled>Quando deseja viajar?</option>
          {travelPeriods.map((period) => <option key={period} value={period}>{period}</option>)}
        </select>
      </label>
      <div className="ep-hero-route-starter__route">
        <RouteField
          label="De onde seu pet parte?"
          field="origin"
          value={route.origin}
          active={activeField === "origin"}
          invalid={invalidOrigin}
          matches={matches}
          onChange={(value) => { setField("origin", value); setActiveField("origin"); }}
          onFocus={() => setActiveField("origin")}
          onBlur={() => window.setTimeout(() => setActiveField(null), 120)}
          onChoose={(airport) => chooseAirport("origin", airport)}
        />
        <span className="ep-hero-route-starter__line" aria-hidden="true" />
        <RouteField
          label="Para onde seu pet vai?"
          field="destination"
          value={route.destination}
          active={activeField === "destination"}
          invalid={invalidDestination}
          matches={matches}
          onChange={(value) => { setField("destination", value); setActiveField("destination"); }}
          onFocus={() => setActiveField("destination")}
          onBlur={() => window.setTimeout(() => setActiveField(null), 120)}
          onChoose={(airport) => chooseAirport("destination", airport)}
        />
      </div>
      <button className="ep-hero-route-starter__submit" type="submit">
        Começar minha análise <Plane size={16} aria-hidden="true" />
      </button>
    </form>
  );
}

function RouteField({ label, field, value, active, invalid, matches, onChange, onFocus, onBlur, onChoose }: {
  label: string;
  field: "origin" | "destination";
  value: string;
  active: boolean;
  invalid: boolean;
  matches: AirportCity[];
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onChoose: (airport: AirportCity) => void;
}) {
  const showOptions = active && value.trim().length >= 3 && matches.length > 0;
  const requiredMessage = field === "origin" ? "Informe a cidade de origem" : "Informe a cidade de destino";

  return (
    <label className={`ep-hero-route-starter__field${invalid ? " is-invalid" : ""}`}>
      <MapPin className="ep-hero-route-starter__field-icon" size={19} aria-hidden="true" />
      <span className="ep-hero-route-starter__field-content">
        <span>{label}</span>
        <input
          data-hero-route-field={field}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={invalid ? requiredMessage : "Digite uma cidade"}
          autoComplete="off"
          aria-invalid={invalid}
          aria-expanded={showOptions}
          aria-controls={`hero-${field}-options`}
        />
      </span>
      {showOptions ? (
        <span className="ep-hero-route-starter__options" id={`hero-${field}-options`} role="listbox">
          {matches.map((airport) => (
            <button type="button" key={`${airport.city}-${airport.iata}`} role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => onChoose(airport)}>
              <b>{airport.city}, {airport.country}</b>
              <small>{airport.iata} · {airport.airport}</small>
            </button>
          ))}
        </span>
      ) : null}
    </label>
  );
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function searchAirports(value: string) {
  const query = normalize(value);
  if (query.length < 3) return [];
  const terms = query.split(" ").filter(Boolean);
  return airportCities.filter((airport) => {
    const values = [airport.city, airport.country, airport.airport, airport.iata, ...(airport.aliases ?? [])].map(normalize);
    return terms.every((term) => values.some((candidate) => candidate.includes(term)));
  }).slice(0, 5);
}
