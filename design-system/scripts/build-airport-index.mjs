import { writeFile } from "node:fs/promises";

const DATA_URL = "https://davidmegginson.github.io/ourairports-data/airports.csv";
const COUNTRIES_URL = "https://davidmegginson.github.io/ourairports-data/countries.csv";
const output = new URL("../src/data/airports.global.json", import.meta.url);

const portugueseCountries = {
  BR: "Brasil", US: "Estados Unidos", PT: "Portugal", ES: "Espanha", IT: "Itália", FR: "França", DE: "Alemanha", GB: "Reino Unido", AR: "Argentina", UY: "Uruguai", PY: "Paraguai", CL: "Chile", CA: "Canadá", MX: "México", AU: "Austrália", NZ: "Nova Zelândia", JP: "Japão", CN: "China", KR: "Coreia do Sul", AE: "Emirados Árabes Unidos", QA: "Catar", TR: "Turquia", ZA: "África do Sul", CH: "Suíça", NL: "Países Baixos", BE: "Bélgica", AT: "Áustria", IE: "Irlanda", SE: "Suécia", NO: "Noruega", DK: "Dinamarca", FI: "Finlândia", PL: "Polônia", GR: "Grécia", IL: "Israel", SG: "Singapura", HK: "Hong Kong", TH: "Tailândia", IN: "Índia", CO: "Colômbia", PE: "Peru", EC: "Equador", BO: "Bolívia", PA: "Panamá", CR: "Costa Rica", DO: "República Dominicana",
};

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === '"') {
      if (quoted && source[index + 1] === '"') { cell += '"'; index += 1; } else quoted = !quoted;
    } else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && source[index + 1] === "\n") index += 1;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [headers, ...values] = rows;
  return values.map((entry) => Object.fromEntries(headers.map((header, index) => [header, entry[index] ?? ""])));
}

const [airportResponse, countryResponse] = await Promise.all([fetch(DATA_URL), fetch(COUNTRIES_URL)]);
if (!airportResponse.ok || !countryResponse.ok) throw new Error("Não foi possível obter a base pública de aeroportos.");

const countries = new Map(parseCsv(await countryResponse.text()).map((country) => [country.code, portugueseCountries[country.code] ?? country.name]));
const byIata = new Map();

for (const airport of parseCsv(await airportResponse.text())) {
  if (!airport.iata_code || !airport.municipality || !["medium_airport", "large_airport"].includes(airport.type)) continue;
  const entry = {
    city: airport.municipality,
    country: countries.get(airport.iso_country) ?? airport.iso_country,
    countryCode: airport.iso_country,
    airport: airport.name,
    iata: airport.iata_code,
    latitude: Number(airport.latitude_deg),
    longitude: Number(airport.longitude_deg),
    aliases: airport.keywords ? airport.keywords.split(",").map((value) => value.trim()).filter(Boolean).slice(0, 8) : [],
  };
  const current = byIata.get(entry.iata);
  if (!current || current.airport.length > entry.airport.length) byIata.set(entry.iata, entry);
}

const airports = [...byIata.values()].sort((left, right) => left.city.localeCompare(right.city, "pt-BR") || left.iata.localeCompare(right.iata));
await writeFile(output, `${JSON.stringify(airports)}\n`);
console.log(`Índice atualizado com ${airports.length} aeroportos.`);
