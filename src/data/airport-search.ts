import { loadAirportCities, type AirportCity } from "./airport-cities";

export type AirportSearchSuggestion =
  | { source: "local"; airport: AirportCity }
  | { source: "manual"; value: string }
  | { source: "google"; label: string; detail: string; prediction: unknown };

export type AirportSelection = { value: string; airport?: AirportCity; countryCode?: string; suggestedAirport?: boolean };

type GoogleSession = { token?: unknown };

const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
let googleMapsLoader: Promise<void> | undefined;
let googlePlacesLibrary: Promise<any> | undefined;

export const normalizeAirportSearch = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

export async function searchAirports(value: string, limit = 6): Promise<AirportSearchSuggestion[]> {
  const query = normalizeAirportSearch(value);
  if (query.length < 3) return [];

  const airportCities = await loadAirportCities();
  const terms = query.split(" ").filter(Boolean);
  const results = airportCities
    .map((airport) => ({ airport, score: airportScore(airport, query, terms) }))
    .filter((result): result is { airport: AirportCity; score: number } => result.score > 0)
    .sort((left, right) => right.score - left.score || left.airport.city.localeCompare(right.airport.city, "pt-BR"))
    .slice(0, limit)
    .map(({ airport }) => ({ source: "local" as const, airport }));

  return results.length ? results : [{ source: "manual", value: value.trim() }];
}

export function createGooglePlacesSession(): GoogleSession {
  return {};
}

export function isGooglePlacesEnabled() {
  return Boolean(googleApiKey);
}

export async function searchGooglePlaces(value: string, session: GoogleSession): Promise<AirportSearchSuggestion[]> {
  if (!googleApiKey || normalizeAirportSearch(value).length < 3) return [];

  try {
    const places = await loadGooglePlaces();
    session.token ??= new places.AutocompleteSessionToken();
    const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
      input: value,
      sessionToken: session.token,
      includedPrimaryTypes: ["locality", "airport"],
      language: "pt-BR",
    });

    return suggestions
      .flatMap((suggestion: any) => suggestion.placePrediction ? [suggestion.placePrediction] : [])
      .slice(0, 4)
      .map((prediction: any) => ({
        source: "google" as const,
        label: prediction.mainText?.toString?.() ?? prediction.text?.toString?.() ?? value,
        detail: prediction.secondaryText?.toString?.() ?? "Resultado do Google",
        prediction,
      }));
  } catch {
    return [];
  }
}

export async function resolveAirportSuggestion(suggestion: AirportSearchSuggestion, session: GoogleSession): Promise<AirportSelection> {
  if (suggestion.source === "local") return airportSelection(suggestion.airport);
  if (suggestion.source === "manual") return { value: suggestion.value };

  try {
    const place = (suggestion.prediction as any).toPlace();
    await place.fetchFields({ fields: ["displayName", "formattedAddress", "location", "addressComponents"] });
    session.token = undefined;
    const latitude = place.location?.lat?.();
    const longitude = place.location?.lng?.();
    const nearest = Number.isFinite(latitude) && Number.isFinite(longitude) ? await findNearestAirport(latitude, longitude) : undefined;
    const label = place.displayName ?? suggestion.label;
    const location = place.formattedAddress ?? suggestion.detail;
    if (!nearest) return { value: `${label}, ${location}` };
    return {
      value: `${label}, ${location} · ${nearest.iata}`,
      airport: nearest,
      countryCode: nearest.countryCode,
      suggestedAirport: true,
    };
  } catch {
    return { value: `${suggestion.label}, ${suggestion.detail}` };
  }
}

export function airportSelection(airport: AirportCity): AirportSelection {
  return { value: `${airport.city}, ${airport.country} · ${airport.iata}`, airport, countryCode: airport.countryCode };
}

export async function findNearestAirport(latitude: number, longitude: number) {
  const airportCities = await loadAirportCities();
  let nearest: AirportCity | undefined;
  let shortestDistance = Number.POSITIVE_INFINITY;
  for (const airport of airportCities) {
    if (!Number.isFinite(airport.latitude) || !Number.isFinite(airport.longitude)) continue;
    const distance = haversine(latitude, longitude, airport.latitude!, airport.longitude!);
    if (distance < shortestDistance) { nearest = airport; shortestDistance = distance; }
  }
  return nearest;
}

function airportScore(airport: AirportCity, query: string, terms: string[]) {
  const city = normalizeAirportSearch(airport.city);
  const country = normalizeAirportSearch(airport.country);
  const airportName = normalizeAirportSearch(airport.airport);
  const iata = normalizeAirportSearch(airport.iata);
  const aliases = (airport.aliases ?? []).map(normalizeAirportSearch);
  const fields = [city, country, airportName, iata, ...aliases];
  const words = fields.flatMap((field) => field.split(" "));
  const direct = terms.every((term) => fields.some((field) => field.includes(term)));

  if (direct) {
    return (iata === query ? 1200 : 0)
      + (city === query ? 1100 : city.startsWith(query) ? 900 : city.includes(query) ? 700 : 0)
      + (aliases.some((alias) => alias === query) ? 1000 : aliases.some((alias) => alias.startsWith(query)) ? 820 : 0)
      + (airportName.startsWith(query) ? 560 : airportName.includes(query) ? 390 : 0)
      + (country === query ? 350 : country.startsWith(query) ? 220 : 0)
      + terms.reduce((score, term) => score + (words.some((word) => word.startsWith(term)) ? 30 : 0), 0);
  }

  const distances = terms.map((term) => Math.min(...words.filter(Boolean).map((word) => damerauLevenshtein(term, word))));
  if (distances.some((distance, index) => distance > typoTolerance(terms[index].length))) return 0;
  return 120 - distances.reduce((total, distance) => total + distance * 18, 0) + (city.includes(terms[0]) ? 40 : 0);
}

function typoTolerance(length: number) {
  if (length <= 4) return 1;
  if (length <= 7) return 2;
  return 3;
}

function damerauLevenshtein(left: string, right: string) {
  if (left === right) return 0;
  if (!left) return right.length;
  if (!right) return left.length;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  let current = new Array<number>(right.length + 1);
  for (let row = 1; row <= left.length; row += 1) {
    current[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      const substitution = previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1);
      current[column] = Math.min(previous[column] + 1, current[column - 1] + 1, substitution);
      if (row > 1 && column > 1 && left[row - 1] === right[column - 2] && left[row - 2] === right[column - 1]) {
        current[column] = Math.min(current[column], previous[column - 2] + 1);
      }
    }
    [previous, current] = [current, previous];
  }
  return previous[right.length];
}

function haversine(latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number) {
  const radians = (value: number) => value * Math.PI / 180;
  const latitudeDistance = radians(latitudeB - latitudeA);
  const longitudeDistance = radians(longitudeB - longitudeA);
  const a = Math.sin(latitudeDistance / 2) ** 2 + Math.cos(radians(latitudeA)) * Math.cos(radians(latitudeB)) * Math.sin(longitudeDistance / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function loadGooglePlaces() {
  if (!googlePlacesLibrary) {
    googlePlacesLibrary = loadGoogleMaps().then(async () => {
      const google = (window as Window & { google?: any }).google;
      return google.maps.importLibrary("places");
    });
  }
  return googlePlacesLibrary;
}

function loadGoogleMaps() {
  if (!googleMapsLoader) {
    googleMapsLoader = new Promise((resolve, reject) => {
      const google = (window as Window & { google?: any }).google;
      if (google?.maps?.importLibrary) { resolve(); return; }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleApiKey!)}&v=weekly&libraries=places`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Google Maps indisponível"));
      document.head.appendChild(script);
    });
  }
  return googleMapsLoader;
}
