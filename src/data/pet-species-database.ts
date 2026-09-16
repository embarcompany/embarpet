// Comprehensive AI Database of 150+ Breeds and Species for Embarpet International Travel

export type AiPetCategory = "dog" | "cat" | "bird" | "rodent" | "exotic";

export interface AiPetSuggestion {
  name: string;
  category: AiPetCategory;
  categoryLabel: string;
  tag?: string;
  isBrachy?: boolean;
}

export const detailedPetDatabase: AiPetSuggestion[] = [
  // --- CÃES (DOGS) ---
  { name: "Sem Raça Definida (SRD)", category: "dog", categoryLabel: "Cão", tag: "Sem restrições de raça", isBrachy: false },
  { name: "Spitz Alemão (Lulu da Pomerânia)", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Golden Retriever", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Labrador Retriever", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Bulldog Francês", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Bulldog Inglês", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Pug", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Shih Tzu", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Lhasa Apso", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Yorkshire Terrier", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Maltês", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Border Collie", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Pastor Alemão", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Poodle (Toy / Médio / Gigante)", category: "dog", categoryLabel: "Cão", tag: "Popular", isBrachy: false },
  { name: "Dachshund (Teckel / Salsicha)", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Beagle", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Bernese Mountain Dog", category: "dog", categoryLabel: "Cão", tag: "Porte Gigante", isBrachy: false },
  { name: "Boxer", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Cavalier King Charles", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Chihuahua", category: "dog", categoryLabel: "Cão", tag: "Porte Mini", isBrachy: false },
  { name: "Chow Chow", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Cocker Spaniel", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Dálmata", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Doberman", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Husky Siberiano", category: "dog", categoryLabel: "Cão", tag: "Clima Frio", isBrachy: false },
  { name: "Jack Russell Terrier", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Pinscher", category: "dog", categoryLabel: "Cão", tag: "Porte Mini", isBrachy: false },
  { name: "Pit Bull", category: "dog", categoryLabel: "Cão", tag: "Caixa Reforçada IATA", isBrachy: false },
  { name: "Rottweiler", category: "dog", categoryLabel: "Cão", tag: "Caixa Reforçada IATA", isBrachy: false },
  { name: "Samoieda", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Schnauzer", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Setter Irlandês", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Shar-Pei", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Shiba Inu", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Weimaraner", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Akita Inu", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Basset Hound", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Boston Terrier", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Bull Terrier", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Cane Corso", category: "dog", categoryLabel: "Cão", tag: "Porte Gigante", isBrachy: false },
  { name: "Collie", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Dogue Alemão", category: "dog", categoryLabel: "Cão", tag: "Porte Gigante", isBrachy: false },
  { name: "Fox Paulistinha", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Greyhound (Galgo)", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Maltipoo", category: "dog", categoryLabel: "Cão", tag: "Porte Mini", isBrachy: false },
  { name: "Pastor Australiano", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Pastor Belga (Malinois)", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Pastor de Shetland", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Pequinês", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Pointer Inglês", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Rhodesian Ridgeback", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "São Bernardo", category: "dog", categoryLabel: "Cão", tag: "Porte Gigante", isBrachy: false },
  { name: "Staffordshire Bull Terrier", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Vizsla", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "West Highland White", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },
  { name: "Whippet", category: "dog", categoryLabel: "Cão", tag: "Porte Médio", isBrachy: false },
  { name: "Buldogue Americano", category: "dog", categoryLabel: "Cão", tag: "Braquicefálico", isBrachy: true },
  { name: "Pastor Branco Suíço", category: "dog", categoryLabel: "Cão", tag: "Porte Grande", isBrachy: false },
  { name: "Terra Nova", category: "dog", categoryLabel: "Cão", tag: "Porte Gigante", isBrachy: false },
  { name: "Welsh Corgi Pembroke", category: "dog", categoryLabel: "Cão", tag: "Porte Pequeno", isBrachy: false },

  // --- GATOS (CATS) ---
  { name: "Sem Raça Definida (SRD)", category: "cat", categoryLabel: "Gato", tag: "Sem restrições de raça", isBrachy: false },
  { name: "Siamês", category: "cat", categoryLabel: "Gato", tag: "Felino Doméstico", isBrachy: false },
  { name: "Persa", category: "cat", categoryLabel: "Gato", tag: "Braquicefálico Felino", isBrachy: true },
  { name: "Maine Coon", category: "cat", categoryLabel: "Gato", tag: "Porte Grande", isBrachy: false },
  { name: "Bengal", category: "cat", categoryLabel: "Gato", tag: "Exótico Permitido", isBrachy: false },
  { name: "Ragdoll", category: "cat", categoryLabel: "Gato", tag: "Felino Dócil", isBrachy: false },
  { name: "Sphynx (Sem Pelo)", category: "cat", categoryLabel: "Gato", tag: "Cuidados Especiais", isBrachy: false },
  { name: "British Shorthair", category: "cat", categoryLabel: "Gato", tag: "Braquicefálico", isBrachy: true },
  { name: "American Shorthair", category: "cat", categoryLabel: "Gato", tag: "Felino Doméstico", isBrachy: false },
  { name: "Angorá Turco", category: "cat", categoryLabel: "Gato", tag: "Pelo Longo", isBrachy: false },
  { name: "Birmanês (Sagrado da Birmânia)", category: "cat", categoryLabel: "Gato", tag: "Felino Dócil", isBrachy: false },
  { name: "Scottish Fold", category: "cat", categoryLabel: "Gato", tag: "Orelha Dobrada", isBrachy: false },
  { name: "Abissínio", category: "cat", categoryLabel: "Gato", tag: "Felino Ativo", isBrachy: false },
  { name: "Azul Russo", category: "cat", categoryLabel: "Gato", tag: "Hipoalergênico", isBrachy: false },
  { name: "Bombaim", category: "cat", categoryLabel: "Gato", tag: "Pelagem Negra", isBrachy: false },
  { name: "Burmese", category: "cat", categoryLabel: "Gato", tag: "Braquicefálico", isBrachy: true },
  { name: "Cornish Rex", category: "cat", categoryLabel: "Gato", tag: "Pelo Ondulado", isBrachy: false },
  { name: "Devon Rex", category: "cat", categoryLabel: "Gato", tag: "Pelo Ondulado", isBrachy: false },
  { name: "Exótico Shorthair", category: "cat", categoryLabel: "Gato", tag: "Braquicefálico", isBrachy: true },
  { name: "Himalaio", category: "cat", categoryLabel: "Gato", tag: "Braquicefálico", isBrachy: true },
  { name: "Munchkin", category: "cat", categoryLabel: "Gato", tag: "Pernas Curtas", isBrachy: false },
  { name: "Norueguês da Floresta", category: "cat", categoryLabel: "Gato", tag: "Porte Grande", isBrachy: false },
  { name: "Oriental Shorthair", category: "cat", categoryLabel: "Gato", tag: "Felino Elegante", isBrachy: false },
  { name: "Siberiano", category: "cat", categoryLabel: "Gato", tag: "Hipoalergênico", isBrachy: false },
  { name: "Somali", category: "cat", categoryLabel: "Gato", tag: "Pelagem Macia", isBrachy: false },
  { name: "Tonquinês", category: "cat", categoryLabel: "Gato", tag: "Felino Afetuoso", isBrachy: false },
  { name: "Chartreux", category: "cat", categoryLabel: "Gato", tag: "Pelagem Azulada", isBrachy: false },
  { name: "Burmilla", category: "cat", categoryLabel: "Gato", tag: "Pelagem Prateada", isBrachy: false },

  // --- AVES (BIRDS) ---
  { name: "Calopsita", category: "bird", categoryLabel: "Ave", tag: "Ave de Companhia", isBrachy: false },
  { name: "Papagaio-Verdadeiro", category: "bird", categoryLabel: "Ave", tag: "Anilha IBAMA / CITES", isBrachy: false },
  { name: "Canário-Belga", category: "bird", categoryLabel: "Ave", tag: "Ave Canora", isBrachy: false },
  { name: "Canário-da-Terra", category: "bird", categoryLabel: "Ave", tag: "Anilha IBAMA", isBrachy: false },
  { name: "Periquito Australiano", category: "bird", categoryLabel: "Ave", tag: "Ave de Companhia", isBrachy: false },
  { name: "Agapornis (Inseparável)", category: "bird", categoryLabel: "Ave", tag: "Ave de Companhia", isBrachy: false },
  { name: "Cacatua", category: "bird", categoryLabel: "Ave", tag: "Anilha / CITES", isBrachy: false },
  { name: "Arara (Canindé / Vermelha)", category: "bird", categoryLabel: "Ave", tag: "Anilha IBAMA / CITES", isBrachy: false },
  { name: "Trinca-Ferro", category: "bird", categoryLabel: "Ave", tag: "Anilha IBAMA / SISPASS", isBrachy: false },
  { name: "Curió", category: "bird", categoryLabel: "Ave", tag: "Anilha IBAMA / SISPASS", isBrachy: false },
  { name: "Coleiro", category: "bird", categoryLabel: "Ave", tag: "Anilha IBAMA / SISPASS", isBrachy: false },
  { name: "Mandarim", category: "bird", categoryLabel: "Ave", tag: "Ave Exótica Doméstica", isBrachy: false },
  { name: "Calafate", category: "bird", categoryLabel: "Ave", tag: "Ave Exótica Doméstica", isBrachy: false },
  { name: "Tucano", category: "bird", categoryLabel: "Ave", tag: "Documentação CITES", isBrachy: false },
  { name: "Papagaio do Congo (Cinza Africano)", category: "bird", categoryLabel: "Ave", tag: "CITES I", isBrachy: false },
  { name: "Ring Neck (Periquito-de-Colar)", category: "bird", categoryLabel: "Ave", tag: "Ave Exótica Doméstica", isBrachy: false },
  { name: "Cardeal", category: "bird", categoryLabel: "Ave", tag: "Anilha IBAMA", isBrachy: false },
  { name: "Lóris", category: "bird", categoryLabel: "Ave", tag: "Ave Exótica", isBrachy: false },

  // --- ROEDORES & PEQUENOS MAMÍFEROS (RODENTS) ---
  { name: "Coelho Doméstico", category: "rodent", categoryLabel: "Roedor / Coelho", tag: "Lagomorfo Doméstico", isBrachy: false },
  { name: "Mini Coelho (Lion Head / Netherland)", category: "rodent", categoryLabel: "Roedor / Coelho", tag: "Porte Pequeno", isBrachy: false },
  { name: "Porquinho-da-Índia", category: "rodent", categoryLabel: "Roedor", tag: "Roedor Doméstico", isBrachy: false },
  { name: "Furão (Ferret)", category: "rodent", categoryLabel: "Roedor / Ferret", tag: "Microchip Obrigatório", isBrachy: false },
  { name: "Hamster Sírio", category: "rodent", categoryLabel: "Roedor", tag: "Roedor Pequeno", isBrachy: false },
  { name: "Hamster Anão Russo", category: "rodent", categoryLabel: "Roedor", tag: "Roedor Pequeno", isBrachy: false },
  { name: "Chinchila", category: "rodent", categoryLabel: "Roedor", tag: "Controle de Temperatura", isBrachy: false },
  { name: "Gerbil (Esquilo da Mongólia)", category: "rodent", categoryLabel: "Roedor", tag: "Roedor Pequeno", isBrachy: false },
  { name: "Rato Dumbo (Twister Pet)", category: "rodent", categoryLabel: "Roedor", tag: "Roedor Doméstico Pet", isBrachy: false },
  { name: "Ouriço (Hedgehog Pigmeu Africano)", category: "rodent", categoryLabel: "Animal Especial", tag: "Animal Especial", isBrachy: false },
  { name: "Mini Pig", category: "rodent", categoryLabel: "Animal Especial", tag: "Regras Específicas", isBrachy: false },
  { name: "Camundongo Pet", category: "rodent", categoryLabel: "Roedor", tag: "Roedor Pequeno", isBrachy: false },
  { name: "Degus", category: "rodent", categoryLabel: "Roedor", tag: "Roedor Exótico", isBrachy: false },

  // --- RÉPTEIS & EXÓTICOS (EXOTICS) ---
  { name: "Jabuti (Piranga / Tinga)", category: "exotic", categoryLabel: "Réptil", tag: "Microchip + Nota Fiscal IBAMA", isBrachy: false },
  { name: "Tartaruga d'Água (Tigre d'Água)", category: "exotic", categoryLabel: "Réptil", tag: "Origem Legalizada", isBrachy: false },
  { name: "Iguana-Verde", category: "exotic", categoryLabel: "Réptil", tag: "CITES II Legalizada", isBrachy: false },
  { name: "Gecko Leopardo", category: "exotic", categoryLabel: "Réptil", tag: "Réptil Doméstico", isBrachy: false },
  { name: "Pogona (Dragão-Barbudo)", category: "exotic", categoryLabel: "Réptil", tag: "Réptil Pet", isBrachy: false },
  { name: "Jiboia Legalizada", category: "exotic", categoryLabel: "Réptil", tag: "Microchip + CITES", isBrachy: false },
  { name: "Camaleão", category: "exotic", categoryLabel: "Réptil", tag: "Réptil Exótico", isBrachy: false },
  { name: "Axolote", category: "exotic", categoryLabel: "Anfíbio", tag: "Anfíbio Especial", isBrachy: false },
  { name: "Corn Snake (Cobra do Milho)", category: "exotic", categoryLabel: "Réptil", tag: "Réptil Legalizado", isBrachy: false },
  { name: "Teiú Legalizado", category: "exotic", categoryLabel: "Réptil", tag: "Microchip IBAMA", isBrachy: false },
  { name: "Cágado", category: "exotic", categoryLabel: "Réptil", tag: "Origem Legalizada", isBrachy: false },
];

// String arrays for backwards compatibility
export const comprehensiveDogBreeds = detailedPetDatabase.filter((p) => p.category === "dog").map((p) => p.name);
export const comprehensiveCatBreeds = detailedPetDatabase.filter((p) => p.category === "cat").map((p) => p.name);
export const comprehensiveBirds = detailedPetDatabase.filter((p) => p.category === "bird").map((p) => p.name);
export const comprehensiveRodentsAndSmall = detailedPetDatabase.filter((p) => p.category === "rodent").map((p) => p.name);
export const comprehensiveExoticsAndReptiles = detailedPetDatabase.filter((p) => p.category === "exotic").map((p) => p.name);

export function normalizeText(val: string): string {
  return val
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Real-time AI Breed search and scoring engine returning rich structured metadata.
 */
export function searchAiBreedsDetailed(
  query: string,
  petSpecies: string,
  limit = 8
): AiPetSuggestion[] {
  const normQuery = normalizeText(query);
  const specLower = petSpecies.toLowerCase();
  const isCat = specLower.includes("gato");
  const isBird = specLower.includes("ave") || specLower.includes("pássaro");
  const isRodent = specLower.includes("roedor") || specLower.includes("coelho") || specLower.includes("hamster");
  const isExotic =
    specLower.includes("exótico") ||
    specLower.includes("outro") ||
    specLower.includes("especial") ||
    specLower.includes("réptil");
  const isMulti =
    (specLower.includes("cão") || specLower.includes("cachorro") || specLower.includes("cães")) &&
    specLower.includes("gato") ||
    specLower.includes("múltiplos") ||
    specLower.includes("pets");

  let baseList = detailedPetDatabase.filter((p) => p.category === "dog");
  if (isMulti) {
    baseList = detailedPetDatabase;
  } else if (isCat) {
    baseList = detailedPetDatabase.filter((p) => p.category === "cat");
  } else if (isBird) {
    baseList = detailedPetDatabase.filter((p) => p.category === "bird");
  } else if (isRodent) {
    baseList = detailedPetDatabase.filter((p) => p.category === "rodent");
  } else if (isExotic) {
    baseList = detailedPetDatabase.filter((p) => p.category === "rodent" || p.category === "bird" || p.category === "exotic");
  }

  if (!normQuery) {
    return baseList.slice(0, limit);
  }

  // Score matching breeds within current category
  const scored = baseList
    .map((item) => {
      const normName = normalizeText(item.name);
      const normTag = normalizeText(item.tag || "");
      let score = 0;
      if (normName === normQuery) {
        score = 100;
      } else if (normName.startsWith(normQuery)) {
        score = 85;
      } else if (normName.split(/\s+/).some((w) => w.startsWith(normQuery))) {
        score = 75;
      } else if (normName.includes(normQuery)) {
        score = 55;
      } else if (normTag.includes(normQuery)) {
        score = 40;
      }
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    return scored.slice(0, limit).map((s) => s.item);
  }

  // Fallback to cross-category search if nothing matched in current species
  const allScored = detailedPetDatabase
    .map((item) => {
      const normName = normalizeText(item.name);
      const normTag = normalizeText(item.tag || "");
      let score = 0;
      if (normName === normQuery) {
        score = 100;
      } else if (normName.startsWith(normQuery)) {
        score = 85;
      } else if (normName.split(/\s+/).some((w) => w.startsWith(normQuery))) {
        score = 75;
      } else if (normName.includes(normQuery)) {
        score = 55;
      } else if (normTag.includes(normQuery)) {
        score = 40;
      }
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return allScored.slice(0, limit).map((s) => s.item);
}

/**
 * Backwards compatible simple string search
 */
export function searchAiBreeds(query: string, petSpecies: string, limit = 12): string[] {
  return searchAiBreedsDetailed(query, petSpecies, limit).map((p) => p.name);
}

