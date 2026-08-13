export type AirportCity = {
  city: string;
  country: string;
  airport: string;
  iata: string;
};

// Base local do protótipo. Cada opção já informa o aeroporto internacional mais próximo.
// Em produção, esta mesma estrutura pode ser alimentada por uma base global de cidades/aeroportos.
export const airportCities: AirportCity[] = [
  { city: "São Paulo", country: "Brasil", airport: "Aeroporto Internacional de Guarulhos", iata: "GRU" },
  { city: "Rio de Janeiro", country: "Brasil", airport: "Aeroporto Internacional do Galeão", iata: "GIG" },
  { city: "Brasília", country: "Brasil", airport: "Aeroporto Internacional de Brasília", iata: "BSB" },
  { city: "Belo Horizonte", country: "Brasil", airport: "Aeroporto Internacional de Confins", iata: "CNF" },
  { city: "Campinas", country: "Brasil", airport: "Aeroporto Internacional de Viracopos", iata: "VCP" },
  { city: "Curitiba", country: "Brasil", airport: "Aeroporto Internacional Afonso Pena", iata: "CWB" },
  { city: "Porto Alegre", country: "Brasil", airport: "Aeroporto Internacional Salgado Filho", iata: "POA" },
  { city: "Florianópolis", country: "Brasil", airport: "Aeroporto Internacional Hercílio Luz", iata: "FLN" },
  { city: "Salvador", country: "Brasil", airport: "Aeroporto Internacional de Salvador", iata: "SSA" },
  { city: "Recife", country: "Brasil", airport: "Aeroporto Internacional do Recife", iata: "REC" },
  { city: "Fortaleza", country: "Brasil", airport: "Aeroporto Internacional de Fortaleza", iata: "FOR" },
  { city: "Manaus", country: "Brasil", airport: "Aeroporto Internacional Eduardo Gomes", iata: "MAO" },
  { city: "Lisboa", country: "Portugal", airport: "Aeroporto Humberto Delgado", iata: "LIS" },
  { city: "Porto", country: "Portugal", airport: "Aeroporto Francisco Sá Carneiro", iata: "OPO" },
  { city: "Madrid", country: "Espanha", airport: "Aeroporto Adolfo Suárez Madrid-Barajas", iata: "MAD" },
  { city: "Barcelona", country: "Espanha", airport: "Aeroporto Josep Tarradellas Barcelona-El Prat", iata: "BCN" },
  { city: "Paris", country: "França", airport: "Aeroporto Charles de Gaulle", iata: "CDG" },
  { city: "Londres", country: "Reino Unido", airport: "Aeroporto de Heathrow", iata: "LHR" },
  { city: "Frankfurt", country: "Alemanha", airport: "Aeroporto de Frankfurt", iata: "FRA" },
  { city: "Milão", country: "Itália", airport: "Aeroporto de Malpensa", iata: "MXP" },
  { city: "Roma", country: "Itália", airport: "Aeroporto Leonardo da Vinci–Fiumicino", iata: "FCO" },
  { city: "Miami", country: "Estados Unidos", airport: "Miami International Airport", iata: "MIA" },
  { city: "Orlando", country: "Estados Unidos", airport: "Orlando International Airport", iata: "MCO" },
  { city: "Nova York", country: "Estados Unidos", airport: "John F. Kennedy International Airport", iata: "JFK" },
  { city: "Los Angeles", country: "Estados Unidos", airport: "Los Angeles International Airport", iata: "LAX" },
  { city: "Boston", country: "Estados Unidos", airport: "Logan International Airport", iata: "BOS" },
  { city: "Buenos Aires", country: "Argentina", airport: "Aeroporto Internacional de Ezeiza", iata: "EZE" },
  { city: "Montevidéu", country: "Uruguai", airport: "Aeroporto Internacional de Carrasco", iata: "MVD" },
  { city: "Assunção", country: "Paraguai", airport: "Aeroporto Internacional Silvio Pettirossi", iata: "ASU" },
  { city: "Santiago", country: "Chile", airport: "Aeroporto Internacional Arturo Merino Benítez", iata: "SCL" },
  { city: "Toronto", country: "Canadá", airport: "Toronto Pearson International Airport", iata: "YYZ" },
  { city: "Vancouver", country: "Canadá", airport: "Vancouver International Airport", iata: "YVR" },
];
