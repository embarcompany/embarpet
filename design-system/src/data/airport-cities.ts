export type AirportCity = {
  city: string;
  country: string;
  countryCode?: string;
  airport: string;
  iata: string;
  latitude?: number;
  longitude?: number;
  aliases?: string[];
};

const curatedAliases: Record<string, string[]> = {
  GRU: ["Guarulhos", "Cumbica", "São Paulo Guarulhos", "Sao Paulo"],
  GIG: ["Galeão", "Galeao", "Rio", "Rio Galeão"],
  BSB: ["Brasilia"],
  LIS: ["Lisbon", "Portela"],
  LHR: ["London", "Londres Inglaterra", "Inglaterra", "UK"],
  JFK: ["New York", "NYC", "Nova Iorque"],
  CDG: ["Roissy", "Paris França", "Paris France"],
  MIA: ["Miami EUA", "Miami USA"],
  MCO: ["Orlando EUA", "Orlando USA"],
  FCO: ["Rome", "Roma Fiumicino"],
  MXP: ["Milan", "Milão Malpensa"],
  EZE: ["Ezeiza", "Buenos Aires"],
};

// Mantido vazio para não baixar o índice global antes do usuário iniciar uma busca.
// Componentes legados podem continuar importando o símbolo enquanto são migrados.
export const airportCities: AirportCity[] = [];

let airportIndex: Promise<AirportCity[]> | undefined;

export function loadAirportCities() {
  airportIndex ??= import("./airports.global.json").then(({ default: airports }) => (airports as AirportCity[]).map((airport) => ({
    ...airport,
    aliases: [...new Set([...(airport.aliases ?? []), ...(curatedAliases[airport.iata] ?? [])])],
  })));
  return airportIndex;
}
