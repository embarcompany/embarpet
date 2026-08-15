"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Plane } from "lucide-react";
import { airportCities, type AirportCity } from "../../data/airport-cities";

type RouteStarterData = { origin: string; destination: string; period: string };

const travelPeriods = ["Dentro de 1 a 3 meses", "De 3 a 6 meses", "Sem data definida"];

export function HeroRouteStarter() {
  const [route, setRoute] = useState<RouteStarterData>({ origin:"", destination:"", period:"" });
  const [activeField, setActiveField] = useState<"origin" | "destination" | null>(null);
  const matches = activeField ? searchAirports(route[activeField]) : [];
  const setField = (field: keyof RouteStarterData, value: string) => setRoute((current) => ({ ...current, [field]:value }));
  const chooseAirport = (field: "origin" | "destination", airport: AirportCity) => {
    setField(field, `${airport.city}, ${airport.country} · ${airport.iata}`);
    setActiveField(null);
  };
  const start = () => {
    if (!route.origin || !route.destination || !route.period) return;
    const query = new URLSearchParams(route).toString();
    window.location.assign(`/analise?${query}`);
  };

  return <form className="ep-hero-route-starter" onSubmit={(event) => { event.preventDefault(); start(); }}>
    <label className="ep-hero-route-starter__period"><CalendarDays size={16} aria-hidden="true" /><span>Quando pretende viajar?</span><select value={route.period} onChange={(event) => setField("period", event.target.value)} aria-label="Quando pretende viajar"><option value="">Escolha uma previsão</option>{travelPeriods.map((period) => <option key={period} value={period}>{period}</option>)}</select></label>
    <div className="ep-hero-route-starter__route">
      <RouteField label="De onde seu pet parte?" field="origin" value={route.origin} active={activeField === "origin"} matches={matches} onChange={(value) => { setField("origin", value); setActiveField("origin"); }} onFocus={() => setActiveField("origin")} onBlur={() => window.setTimeout(() => setActiveField(null), 120)} onChoose={(airport) => chooseAirport("origin", airport)} />
      <span className="ep-hero-route-starter__line" aria-hidden="true"><i /><Plane size={15} /></span>
      <RouteField label="Para onde seu pet vai?" field="destination" value={route.destination} active={activeField === "destination"} matches={matches} onChange={(value) => { setField("destination", value); setActiveField("destination"); }} onFocus={() => setActiveField("destination")} onBlur={() => window.setTimeout(() => setActiveField(null), 120)} onChoose={(airport) => chooseAirport("destination", airport)} />
    </div>
    <button className="ep-hero-route-starter__submit" type="submit" disabled={!route.origin || !route.destination || !route.period}>Começar minha análise <Plane size={16} aria-hidden="true" /></button>
  </form>;
}

function RouteField({ label, field, value, active, matches, onChange, onFocus, onBlur, onChoose }: { label: string; field: "origin" | "destination"; value: string; active: boolean; matches: AirportCity[]; onChange: (value: string) => void; onFocus: () => void; onBlur: () => void; onChoose: (airport: AirportCity) => void }) {
  const showOptions = active && value.trim().length >= 3 && matches.length > 0;
  return <label className="ep-hero-route-starter__field"><span><MapPin size={15} aria-hidden="true" />{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} onBlur={onBlur} placeholder="Digite uma cidade" autoComplete="off" aria-expanded={showOptions} aria-controls={`hero-${field}-options`} />{showOptions ? <span className="ep-hero-route-starter__options" id={`hero-${field}-options`} role="listbox">{matches.map((airport) => <button type="button" key={`${airport.city}-${airport.iata}`} role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => onChoose(airport)}><b>{airport.city}, {airport.country}</b><small>{airport.iata} · {airport.airport}</small></button>)}</span> : null}</label>;
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
