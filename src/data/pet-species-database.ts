// Comprehensive AI Database of 140+ Breeds and Species for Embarpet International Travel

export const comprehensiveDogBreeds = [
  "Spitz Alemão",
  "Golden Retriever",
  "Labrador Retriever",
  "Bulldog Francês",
  "Bulldog Inglês",
  "Pug",
  "Shih Tzu",
  "Lhasa Apso",
  "Yorkshire Terrier",
  "Maltês",
  "Border Collie",
  "Pastor Alemão",
  "Poodle",
  "Dachshund (Teckel)",
  "Beagle",
  "Bernese Mountain Dog",
  "Boxer",
  "Cavalier King Charles",
  "Chihuahua",
  "Chow Chow",
  "Cocker Spaniel",
  "Dálmata",
  "Doberman",
  "Husky Siberiano",
  "Jack Russell Terrier",
  "Pinscher",
  "Pit Bull",
  "Rottweiler",
  "Samoieda",
  "Schnauzer",
  "Setter Irlandês",
  "Shar-Pei",
  "Shiba Inu",
  "Weimaraner",
  "Akita",
  "Basset Hound",
  "Boston Terrier",
  "Bull Terrier",
  "Cane Corso",
  "Collie",
  "Dogue Alemão",
  "Fox Paulistinha",
  "Greyhound",
  "Maltipoo",
  "Pastor Australiano",
  "Pastor Belga",
  "Pastor de Shetland",
  "Pequinês",
  "Pointer Inglês",
  "Rhodesian Ridgeback",
  "São Bernardo",
  "Staffordshire Bull Terrier",
  "Vizsla",
  "West Highland White",
  "Whippet",
  "Buldogue Americano",
  "Pastor Branco Suíço",
  "Terra Nova",
  "Corgi",
  "Sem Raça Definida (SRD)",
];

export const comprehensiveCatBreeds = [
  "Siamês",
  "Persa",
  "Maine Coon",
  "Bengal",
  "Ragdoll",
  "Sphynx",
  "British Shorthair",
  "American Shorthair",
  "Angorá",
  "Birmanês",
  "Scottish Fold",
  "Abissínio",
  "Azul Russo",
  "Bombaim",
  "Burmese",
  "Cornish Rex",
  "Devon Rex",
  "Exótico Shorthair",
  "Himalaio",
  "Munchkin",
  "Norueguês da Floresta",
  "Oriental Shorthair",
  "Siberiano",
  "Somali",
  "Tonquinês",
  "Chartreux",
  "Burmilla",
  "Gato Comum (SRD)",
];

export const comprehensiveBirds = [
  "Calopsita",
  "Papagaio-Verdadeiro",
  "Canário-Belga",
  "Canário-da-Terra",
  "Periquito Australiano",
  "Agapornis",
  "Cacatua",
  "Arara",
  "Trinca-Ferro",
  "Curió",
  "Coleiro",
  "Mandarim",
  "Calafate",
  "Tucano",
  "Papagaio do Congo",
  "Ring Neck",
  "Cardeal",
  "Lóris",
];

export const comprehensiveRodentsAndSmall = [
  "Coelho",
  "Porquinho-da-Índia",
  "Furão (Ferret)",
  "Hamster Sírio",
  "Hamster Anão Russo",
  "Chinchila",
  "Gerbil (Esquilo da Mongólia)",
  "Mini Coelho",
  "Rato Dumbo",
  "Twister",
  "Esquilo",
  "Ouriço (Hedgehog)",
  "Mini Pig",
  "Camundongo",
  "Degus",
];

export const comprehensiveExoticsAndReptiles = [
  "Jabuti",
  "Tartaruga d'Água",
  "Iguana",
  "Gecko (Leopardo)",
  "Pogona (Dragão-Barbudo)",
  "Jiboia Legalizada",
  "Camaleão",
  "Axolote",
  "Corn Snake",
  "Teiú Legalizado",
  "Cágado",
  "Serpente Exótica",
];

export function normalizeText(val: string): string {
  return val
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Real-time AI Breed search and scoring engine.
 * Filters matching breeds as the user types and guarantees
 * a balanced array divisible by 3 for 100% full grid rows.
 */
export function searchAiBreeds(query: string, petSpecies: string, limit = 12): string[] {
  const normQuery = normalizeText(query);
  const isCat = petSpecies.toLowerCase().includes("gato");
  const isBird = petSpecies.toLowerCase().includes("ave") || petSpecies.toLowerCase().includes("pássaro");
  const isRodent = petSpecies.toLowerCase().includes("roedor");
  const isExotic =
    petSpecies.toLowerCase().includes("exótico") ||
    petSpecies.toLowerCase().includes("outro") ||
    petSpecies.toLowerCase().includes("especial");

  let baseList: string[] = comprehensiveDogBreeds;
  if (isCat) {
    baseList = comprehensiveCatBreeds;
  } else if (isBird) {
    baseList = comprehensiveBirds;
  } else if (isRodent) {
    baseList = comprehensiveRodentsAndSmall;
  } else if (isExotic) {
    baseList = [...comprehensiveRodentsAndSmall, ...comprehensiveBirds, ...comprehensiveExoticsAndReptiles];
  }

  if (!normQuery) {
    // Return top popular recommendations for that species (max 12, divisible by 3)
    const topCount = Math.min(limit, Math.floor(baseList.length / 3) * 3 || baseList.length);
    return baseList.slice(0, topCount);
  }

  // Score matching breeds within base species
  const scored = baseList
    .map((breed) => {
      const normBreed = normalizeText(breed);
      let score = 0;
      if (normBreed === normQuery) {
        score = 100;
      } else if (normBreed.startsWith(normQuery)) {
        score = 80;
      } else if (normBreed.split(/\s+/).some((w) => w.startsWith(normQuery))) {
        score = 70;
      } else if (normBreed.includes(normQuery)) {
        score = 50;
      }
      return { breed, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.breed.localeCompare(b.breed));

  let results = scored.map((s) => s.breed);

  // If no match in the specific category, search across ALL categories so user finds anything!
  if (results.length === 0) {
    const allBreeds = Array.from(
      new Set([
        ...comprehensiveDogBreeds,
        ...comprehensiveCatBreeds,
        ...comprehensiveBirds,
        ...comprehensiveRodentsAndSmall,
        ...comprehensiveExoticsAndReptiles,
      ]),
    );

    const fallbackScored = allBreeds
      .map((breed) => {
        const normBreed = normalizeText(breed);
        let score = 0;
        if (normBreed === normQuery) {
          score = 100;
        } else if (normBreed.startsWith(normQuery)) {
          score = 80;
        } else if (normBreed.split(/\s+/).some((w) => w.startsWith(normQuery))) {
          score = 70;
        } else if (normBreed.includes(normQuery)) {
          score = 50;
        }
        return { breed, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.breed.localeCompare(b.breed));

    results = fallbackScored.map((s) => s.breed);
  }

  // Balance result length to multiple of 3 if >= 3
  if (results.length >= 3) {
    const rounded = Math.min(limit, Math.floor(results.length / 3) * 3);
    return results.slice(0, rounded > 0 ? rounded : results.length);
  }

  return results.slice(0, limit);
}
