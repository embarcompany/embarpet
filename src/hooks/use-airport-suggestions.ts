import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  createGooglePlacesSession,
  isGooglePlacesEnabled,
  resolveAirportSuggestion,
  searchAirports,
  searchGooglePlaces,
  type AirportSearchSuggestion,
} from "../data/airport-search";

export function useAirportSuggestions(value: string, enabled: boolean) {
  const deferredValue = useDeferredValue(value);
  const [localSuggestions, setLocalSuggestions] = useState<AirportSearchSuggestion[]>([]);
  const [googleSuggestions, setGoogleSuggestions] = useState<AirportSearchSuggestion[]>([]);
  const session = useRef(createGooglePlacesSession());
  const canSearch = enabled && deferredValue.trim().length >= 3;
  useEffect(() => {
    if (!canSearch) { setLocalSuggestions([]); return; }
    let active = true;
    void searchAirports(deferredValue).then((suggestions) => { if (active) setLocalSuggestions(suggestions); });
    return () => { active = false; };
  }, [canSearch, deferredValue]);

  useEffect(() => {
    if (!canSearch || !isGooglePlacesEnabled()) { setGoogleSuggestions([]); return; }
    let active = true;
    const timeout = window.setTimeout(() => {
      void searchGooglePlaces(deferredValue, session.current).then((suggestions) => {
        if (active) setGoogleSuggestions(suggestions);
      });
    }, 160);
    return () => { active = false; window.clearTimeout(timeout); };
  }, [canSearch, deferredValue]);

  const suggestions = useMemo(() => {
    const local = localSuggestions.filter((suggestion) => suggestion.source !== "manual");
    const manual = localSuggestions.filter((suggestion) => suggestion.source === "manual");
    const localLabels = new Set(local.map((suggestion) => suggestion.source === "local" ? `${suggestion.airport.city}-${suggestion.airport.country}`.toLocaleLowerCase() : ""));
    const google = googleSuggestions.filter((suggestion) => suggestion.source !== "google" || !localLabels.has(`${suggestion.label}-${suggestion.detail}`.toLocaleLowerCase()));
    return [...local, ...google, ...manual];
  }, [googleSuggestions, localSuggestions]);

  return {
    suggestions,
    hasGoogleSuggestions: googleSuggestions.length > 0,
    resolveSuggestion: (suggestion: AirportSearchSuggestion) => resolveAirportSuggestion(suggestion, session.current),
  };
}
