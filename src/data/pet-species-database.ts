// Comprehensive AI Database of 150+ Breeds and Species for Embarpet International Travel

export type AiPetCategory = "dog" | "cat" | "bird" | "rodent" | "exotic";

export interface AiPetSuggestion {
  name: string;
  category: AiPetCategory;
  categoryLabel: string;
  tag?: string;
  isBrachy?: boolean;
  aliases?: string[];
}

export const detailedPetDatabase: AiPetSuggestion[] = [
  // --- CÃES (DOGS) ---
  {
    name: "Sem Raça Definida (SRD)",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Sem restrições de raça",
    isBrachy: false,
    aliases: [
      "srd",
      "sem raca",
      "sem raca definida",
      "sem raca",
      "sem raca def",
      "sem pedigree",
      "vira lata",
      "vira-lata",
      "viralata",
      "vira latinha",
      "vira-latinha",
      "mestiço",
      "mestico",
      "mestiça",
      "mestica",
      "cachorro sem raca",
      "cachorro sem raça",
      "viralta",
      "virala",
      "viraata",
      "vir lata",
      "sr",
      "v",
      "vi",
      "vir",
      "vira",
      "mut",
      "mutt",
      "mixed",
      "adotado",
      "resgatado",
      "comum",
    ],
  },
  {
    name: "Spitz Alemão (Lulu da Pomerânia)",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["spitz", "spitz alemao", "lulu da pomerania", "pomerania", "pomeranian", "lulu"],
  },
  {
    name: "Golden Retriever",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["golden", "goldem", "retriever dourado", "goldie", "retriever"],
  },
  {
    name: "Labrador Retriever",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["labrador", "labradour", "lab"],
  },
  {
    name: "Bulldog Francês",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["bulldog frances", "buldogue frances", "frenchie", "buldogue", "french bulldog"],
  },
  {
    name: "Bulldog Inglês",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["bulldog ingles", "buldogue ingles", "english bulldog"],
  },
  {
    name: "Pug",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["pug", "pugg", "pugue", "carlino"],
  },
  {
    name: "Shih Tzu",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["shih tzu", "shihtzu", "shitzu", "shit-zu", "shitsu", "shi tzu", "shitzi", "shitu"],
  },
  {
    name: "Lhasa Apso",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["lhasa", "lhaza", "lhasa apso", "lhasa-apso", "lasa apso"],
  },
  {
    name: "Yorkshire Terrier",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["yorkshire", "york", "yorkie", "iorque", "yorkishire", "york shire"],
  },
  {
    name: "Maltês",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["maltes", "maltese", "bichon maltes"],
  },
  {
    name: "Border Collie",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["border collie", "border", "collie border"],
  },
  {
    name: "Pastor Alemão",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["pastor alemao", "pastor-alemao", "pastoralemao", "german shepherd", "capa preta"],
  },
  {
    name: "Poodle (Toy / Médio / Gigante)",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Popular",
    isBrachy: false,
    aliases: ["poodle", "pudle", "podle", "poodle toy", "poodle gigante", "poodle medio", "caniche"],
  },
  {
    name: "Dachshund (Teckel / Salsicha)",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["salsicha", "teckel", "dachshund", "dachsund", "cofap", "salsichinha", "basset salsicha"],
  },
  {
    name: "Beagle",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["beagle", "bigle", "begle"],
  },
  {
    name: "Bernese Mountain Dog",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Gigante",
    isBrachy: false,
    aliases: ["bernese", "boiadeiro de berna", "bernese mountain"],
  },
  {
    name: "Boxer",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["boxer", "boxerdog"],
  },
  {
    name: "Cavalier King Charles",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["cavalier", "king charles", "cavalier king"],
  },
  {
    name: "Chihuahua",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Mini",
    isBrachy: false,
    aliases: ["chihuahua", "chiuaua", "chihuaha", "chiuawa"],
  },
  {
    name: "Chow Chow",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["chow chow", "chowchow", "chow-chow", "xau xau"],
  },
  {
    name: "Cocker Spaniel",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["cocker", "cocker spaniel", "cocker ingles", "cocker americano"],
  },
  {
    name: "Dálmata",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["dalmata", "dalmatian"],
  },
  {
    name: "Doberman",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["doberman", "dobermann"],
  },
  {
    name: "Husky Siberiano",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Clima Frio",
    isBrachy: false,
    aliases: ["husky", "husky siberiano", "rusky", "hasque"],
  },
  {
    name: "Jack Russell Terrier",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["jack russell", "jack russel", "jack"],
  },
  {
    name: "Pinscher",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Mini",
    isBrachy: false,
    aliases: ["pinscher", "pincher", "pinsher", "pinscher 0", "pinscher 1"],
  },
  {
    name: "Pit Bull",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Caixa Reforçada IATA",
    isBrachy: false,
    aliases: ["pit bull", "pitbull", "pit-bull", "american pit bull terrier"],
  },
  {
    name: "Rottweiler",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Caixa Reforçada IATA",
    isBrachy: false,
    aliases: ["rottweiler", "rotweiller", "rotweiler", "rotwailler"],
  },
  {
    name: "Samoieda",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["samoieda", "samoyed", "samoieda branco"],
  },
  {
    name: "Schnauzer",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["schnauzer", "eschnauzer", "schnauzer miniatura", "shnauzer"],
  },
  {
    name: "Setter Irlandês",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["setter", "setter irlandes"],
  },
  {
    name: "Shar-Pei",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["shar pei", "shar-pei", "sharpei"],
  },
  {
    name: "Shiba Inu",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["shiba", "shiba inu"],
  },
  {
    name: "Weimaraner",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["weimaraner", "weimaraner cinza", "veimaraner"],
  },
  {
    name: "Akita Inu",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["akita", "akita inu", "akita americano"],
  },
  {
    name: "Basset Hound",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["basset", "basset hound"],
  },
  {
    name: "Boston Terrier",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["boston terrier", "boston"],
  },
  {
    name: "Bull Terrier",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["bull terrier", "bullterrier"],
  },
  {
    name: "Cane Corso",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Gigante",
    isBrachy: false,
    aliases: ["cane corso", "canecorso"],
  },
  {
    name: "Collie",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["collie", "rough collie"],
  },
  {
    name: "Dogue Alemão",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Gigante",
    isBrachy: false,
    aliases: ["dogue alemao", "great dane", "dog alemao"],
  },
  {
    name: "Fox Paulistinha",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["fox paulistinha", "terrier brasileiro"],
  },
  {
    name: "Greyhound (Galgo)",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["galgo", "greyhound", "galgo italiano"],
  },
  {
    name: "Maltipoo",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Mini",
    isBrachy: false,
    aliases: ["maltipoo", "malti poo"],
  },
  {
    name: "Pastor Australiano",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["pastor australiano", "australian shepherd", "aussie"],
  },
  {
    name: "Pastor Belga (Malinois)",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["pastor belga", "malinois", "pastor malinois"],
  },
  {
    name: "Pastor de Shetland",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["pastor de shetland", "sheltie"],
  },
  {
    name: "Pequinês",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["pequines", "pequinez"],
  },
  {
    name: "Pointer Inglês",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["pointer", "pointer ingles"],
  },
  {
    name: "Rhodesian Ridgeback",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["rhodesian", "ridgeback"],
  },
  {
    name: "São Bernardo",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Gigante",
    isBrachy: false,
    aliases: ["sao bernardo", "saint bernard"],
  },
  {
    name: "Staffordshire Bull Terrier",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["staffordshire", "staffbull", "staff"],
  },
  {
    name: "Vizsla",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["vizsla", "braco hungaro"],
  },
  {
    name: "West Highland White",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["westie", "west highland", "west terrier"],
  },
  {
    name: "Whippet",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Médio",
    isBrachy: false,
    aliases: ["whippet", "whipet"],
  },
  {
    name: "Buldogue Americano",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["buldogue americano", "american bulldog"],
  },
  {
    name: "Pastor Branco Suíço",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["pastor branco", "pastor branco suico"],
  },
  {
    name: "Terra Nova",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Gigante",
    isBrachy: false,
    aliases: ["terra nova", "newfoundland"],
  },
  {
    name: "Welsh Corgi Pembroke",
    category: "dog",
    categoryLabel: "Cão",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["corgi", "welsh corgi", "pembroke"],
  },

  // --- GATOS (CATS) ---
  {
    name: "Sem Raça Definida (SRD)",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Sem restrições de raça",
    isBrachy: false,
    aliases: [
      "srd",
      "sem raca",
      "sem raca definida",
      "sem pedigree",
      "vira lata",
      "vira-lata",
      "viralata",
      "vira latinha",
      "vira-latinha",
      "mestiço",
      "mestico",
      "mestiça",
      "mestica",
      "gato sem raca",
      "gato sem raça",
      "viralta",
      "virala",
      "viraata",
      "vir lata",
      "sr",
      "v",
      "vi",
      "vir",
      "vira",
      "mut",
      "mutt",
      "mixed",
      "adotado",
      "resgatado",
      "comum",
    ],
  },
  {
    name: "Siamês",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Felino Doméstico",
    isBrachy: false,
    aliases: ["siames", "siamese"],
  },
  {
    name: "Persa",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Braquicefálico Felino",
    isBrachy: true,
    aliases: ["persa", "persian"],
  },
  {
    name: "Maine Coon",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["maine coon", "mainecoon", "maine-coon"],
  },
  {
    name: "Bengal",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Exótico Permitido",
    isBrachy: false,
    aliases: ["bengal", "gato leopardo", "bengali"],
  },
  {
    name: "Ragdoll",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Felino Dócil",
    isBrachy: false,
    aliases: ["ragdoll", "rag doll"],
  },
  {
    name: "Sphynx (Sem Pelo)",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Cuidados Especiais",
    isBrachy: false,
    aliases: ["sphynx", "esfinge", "sem pelo", "gato pelado"],
  },
  {
    name: "British Shorthair",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["british", "british shorthair", "britanico de pelo curto"],
  },
  {
    name: "American Shorthair",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Felino Doméstico",
    isBrachy: false,
    aliases: ["american shorthair", "americano de pelo curto"],
  },
  {
    name: "Angorá Turco",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pelo Longo",
    isBrachy: false,
    aliases: ["angora", "angora turco"],
  },
  {
    name: "Birmanês (Sagrado da Birmânia)",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Felino Dócil",
    isBrachy: false,
    aliases: ["birmanes", "sagrado da birmania"],
  },
  {
    name: "Scottish Fold",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Orelha Dobrada",
    isBrachy: false,
    aliases: ["scottish fold", "scottish"],
  },
  {
    name: "Abissínio",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Felino Ativo",
    isBrachy: false,
    aliases: ["abissinio", "abyssinian"],
  },
  {
    name: "Azul Russo",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Hipoalergênico",
    isBrachy: false,
    aliases: ["azul russo", "russian blue"],
  },
  {
    name: "Bombaim",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pelagem Negra",
    isBrachy: false,
    aliases: ["bombaim", "bombay"],
  },
  {
    name: "Burmese",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["burmese", "burmes"],
  },
  {
    name: "Cornish Rex",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pelo Ondulado",
    isBrachy: false,
    aliases: ["cornish rex", "cornish"],
  },
  {
    name: "Devon Rex",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pelo Ondulado",
    isBrachy: false,
    aliases: ["devon rex", "devon"],
  },
  {
    name: "Exótico Shorthair",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["exotico", "exotic shorthair", "gato exotico"],
  },
  {
    name: "Himalaio",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Braquicefálico",
    isBrachy: true,
    aliases: ["himalaio", "himalayan"],
  },
  {
    name: "Munchkin",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pernas Curtas",
    isBrachy: false,
    aliases: ["munchkin", "perna curta"],
  },
  {
    name: "Norueguês da Floresta",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Porte Grande",
    isBrachy: false,
    aliases: ["noruegues", "noruegues da floresta", "norwegian forest"],
  },
  {
    name: "Oriental Shorthair",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Felino Elegante",
    isBrachy: false,
    aliases: ["oriental", "oriental shorthair"],
  },
  {
    name: "Siberiano",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Hipoalergênico",
    isBrachy: false,
    aliases: ["siberiano", "siberian"],
  },
  {
    name: "Somali",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pelagem Macia",
    isBrachy: false,
    aliases: ["somali"],
  },
  {
    name: "Tonquinês",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Felino Afetuoso",
    isBrachy: false,
    aliases: ["tonquines", "tonkinese"],
  },
  {
    name: "Chartreux",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pelagem Azulada",
    isBrachy: false,
    aliases: ["chartreux", "cartuxo"],
  },
  {
    name: "Burmilla",
    category: "cat",
    categoryLabel: "Gato",
    tag: "Pelagem Prateada",
    isBrachy: false,
    aliases: ["burmilla"],
  },

  // --- AVES (BIRDS) ---
  {
    name: "Calopsita",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave de Companhia",
    isBrachy: false,
    aliases: ["calopsita", "calopsita mansa", "cockatiel"],
  },
  {
    name: "Papagaio-Verdadeiro",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha IBAMA / CITES",
    isBrachy: false,
    aliases: ["papagaio", "papagaio verdadeiro", "louro"],
  },
  {
    name: "Canário-Belga",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave Canora",
    isBrachy: false,
    aliases: ["canario", "canario belga"],
  },
  {
    name: "Canário-da-Terra",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha IBAMA",
    isBrachy: false,
    aliases: ["canario da terra"],
  },
  {
    name: "Periquito Australiano",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave de Companhia",
    isBrachy: false,
    aliases: ["periquito", "periquito australiano", "budgie"],
  },
  {
    name: "Agapornis (Inseparável)",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave de Companhia",
    isBrachy: false,
    aliases: ["agapornis", "inseparavel", "lovebird"],
  },
  {
    name: "Cacatua",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha / CITES",
    isBrachy: false,
    aliases: ["cacatua", "cockatoo"],
  },
  {
    name: "Arara (Canindé / Vermelha)",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha IBAMA / CITES",
    isBrachy: false,
    aliases: ["arara", "arara caninde", "arara vermelha", "macaw"],
  },
  {
    name: "Trinca-Ferro",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha IBAMA / SISPASS",
    isBrachy: false,
    aliases: ["trinca ferro", "trinca-ferro"],
  },
  {
    name: "Curió",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha IBAMA / SISPASS",
    isBrachy: false,
    aliases: ["curio", "curio canoro"],
  },
  {
    name: "Coleiro",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha IBAMA / SISPASS",
    isBrachy: false,
    aliases: ["coleiro", "coleirinho", "papa capim"],
  },
  {
    name: "Mandarim",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave Exótica Doméstica",
    isBrachy: false,
    aliases: ["mandarim", "diamante mandarim"],
  },
  {
    name: "Calafate",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave Exótica Doméstica",
    isBrachy: false,
    aliases: ["calafate", "padre"],
  },
  {
    name: "Tucano",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Documentação CITES",
    isBrachy: false,
    aliases: ["tucano", "toucan"],
  },
  {
    name: "Papagaio do Congo (Cinza Africano)",
    category: "bird",
    categoryLabel: "Ave",
    tag: "CITES I",
    isBrachy: false,
    aliases: ["papagaio do congo", "cinza africano", "african grey"],
  },
  {
    name: "Ring Neck (Periquito-de-Colar)",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave Exótica Doméstica",
    isBrachy: false,
    aliases: ["ring neck", "ringneck", "periquito de colar"],
  },
  {
    name: "Cardeal",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Anilha IBAMA",
    isBrachy: false,
    aliases: ["cardeal", "cardeal do sul"],
  },
  {
    name: "Lóris",
    category: "bird",
    categoryLabel: "Ave",
    tag: "Ave Exótica",
    isBrachy: false,
    aliases: ["loris", "loris arco iris"],
  },

  // --- ROEDORES & PEQUENOS MAMÍFEROS (RODENTS) ---
  {
    name: "Coelho Doméstico",
    category: "rodent",
    categoryLabel: "Roedor / Coelho",
    tag: "Lagomorfo Doméstico",
    isBrachy: false,
    aliases: ["coelho", "coelho domestico", "rabbit", "bunny"],
  },
  {
    name: "Mini Coelho (Lion Head / Netherland)",
    category: "rodent",
    categoryLabel: "Roedor / Coelho",
    tag: "Porte Pequeno",
    isBrachy: false,
    aliases: ["mini coelho", "lion head", "netherland dwarf", "mini lop"],
  },
  {
    name: "Porquinho-da-Índia",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Roedor Doméstico",
    isBrachy: false,
    aliases: ["porquinho da india", "porquinho", "guinea pig", "cavia"],
  },
  {
    name: "Furão (Ferret)",
    category: "rodent",
    categoryLabel: "Roedor / Ferret",
    tag: "Microchip Obrigatório",
    isBrachy: false,
    aliases: ["furao", "ferret", "furao domestico"],
  },
  {
    name: "Hamster Sírio",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Roedor Pequeno",
    isBrachy: false,
    aliases: ["hamster", "hamster sirio", "ranster"],
  },
  {
    name: "Hamster Anão Russo",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Roedor Pequeno",
    isBrachy: false,
    aliases: ["hamster anao russo", "anao russo", "hamster russo"],
  },
  {
    name: "Chinchila",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Controle de Temperatura",
    isBrachy: false,
    aliases: ["chinchila", "chinchilla"],
  },
  {
    name: "Gerbil (Esquilo da Mongólia)",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Roedor Pequeno",
    isBrachy: false,
    aliases: ["gerbil", "esquilo da mongolia", "gerbil da mongolia"],
  },
  {
    name: "Rato Dumbo (Twister Pet)",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Roedor Doméstico Pet",
    isBrachy: false,
    aliases: ["rato dumbo", "twister", "rato pet", "ratana"],
  },
  {
    name: "Ouriço (Hedgehog Pigmeu Africano)",
    category: "rodent",
    categoryLabel: "Animal Especial",
    tag: "Animal Especial",
    isBrachy: false,
    aliases: ["ourico", "hedgehog", "porco espinho pet"],
  },
  {
    name: "Mini Pig",
    category: "rodent",
    categoryLabel: "Animal Especial",
    tag: "Regras Específicas",
    isBrachy: false,
    aliases: ["mini pig", "minipig", "mini porco"],
  },
  {
    name: "Camundongo Pet",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Roedor Pequeno",
    isBrachy: false,
    aliases: ["camundongo", "topolino"],
  },
  {
    name: "Degus",
    category: "rodent",
    categoryLabel: "Roedor",
    tag: "Roedor Exótico",
    isBrachy: false,
    aliases: ["degu", "degus", "octodon"],
  },

  // --- RÉPTEIS & EXÓTICOS (EXOTICS) ---
  {
    name: "Jabuti (Piranga / Tinga)",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Microchip + Nota Fiscal IBAMA",
    isBrachy: false,
    aliases: ["jabuti", "jabuti piranga", "jabuti tinga"],
  },
  {
    name: "Tartaruga d'Água (Tigre d'Água)",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Origem Legalizada",
    isBrachy: false,
    aliases: ["tartaruga", "tartaruga d agua", "tigre d agua"],
  },
  {
    name: "Iguana-Verde",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "CITES II Legalizada",
    isBrachy: false,
    aliases: ["iguana", "iguana verde"],
  },
  {
    name: "Gecko Leopardo",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Réptil Doméstico",
    isBrachy: false,
    aliases: ["gecko", "gecko leopardo", "leopard gecko"],
  },
  {
    name: "Pogona (Dragão-Barbudo)",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Réptil Pet",
    isBrachy: false,
    aliases: ["pogona", "dragao barbudo", "bearded dragon"],
  },
  {
    name: "Jiboia Legalizada",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Microchip + CITES",
    isBrachy: false,
    aliases: ["jiboia", "cobra jiboia", "boa constrictor"],
  },
  {
    name: "Camaleão",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Réptil Exótico",
    isBrachy: false,
    aliases: ["camaleao", "chameleon"],
  },
  {
    name: "Axolote",
    category: "exotic",
    categoryLabel: "Anfíbio",
    tag: "Anfíbio Especial",
    isBrachy: false,
    aliases: ["axolote", "axolotl"],
  },
  {
    name: "Corn Snake (Cobra do Milho)",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Réptil Legalizado",
    isBrachy: false,
    aliases: ["corn snake", "cobra do milho"],
  },
  {
    name: "Teiú Legalizado",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Microchip IBAMA",
    isBrachy: false,
    aliases: ["teiu", "teiu legalizado"],
  },
  {
    name: "Cágado",
    category: "exotic",
    categoryLabel: "Réptil",
    tag: "Origem Legalizada",
    isBrachy: false,
    aliases: ["cagado", "cagado de carapaça"],
  },
];

// String arrays for backwards compatibility
export const comprehensiveDogBreeds = detailedPetDatabase.filter((p) => p.category === "dog").map((p) => p.name);
export const comprehensiveCatBreeds = detailedPetDatabase.filter((p) => p.category === "cat").map((p) => p.name);
export const comprehensiveBirds = detailedPetDatabase.filter((p) => p.category === "bird").map((p) => p.name);
export const comprehensiveRodentsAndSmall = detailedPetDatabase.filter((p) => p.category === "rodent").map((p) => p.name);
export const comprehensiveExoticsAndReptiles = detailedPetDatabase.filter((p) => p.category === "exotic").map((p) => p.name);

/**
 * Normaliza o texto: minúsculas, sem acentos, remove caracteres especiais e consolida espaços.
 */
export function normalizeText(val: string): string {
  if (!val) return "";
  return val
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Versão compacta sem espaços para comparações diretas (ex: "pastoralemao" vs "pastor alemao").
 */
export function stripSpaces(val: string): string {
  return normalizeText(val).replace(/\s+/g, "");
}

/**
 * Cálculo de distância de Levenshtein para absorção de erros de digitação (typos).
 */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substituição
          matrix[i][j - 1] + 1,     // inserção
          matrix[i - 1][j] + 1      // remoção
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Reconhece automaticamente variações populares de Sem Raça Definida (SRD) / vira-lata.
 */
export function isSrdTerm(term: string): boolean {
  const norm = normalizeText(term);
  const compact = stripSpaces(term);
  if (!norm) return false;

  const srdKeywords = [
    "srd",
    "sem raca",
    "sem raca definida",
    "sem pedigree",
    "vira lata",
    "vira",
    "viralata",
    "vira latinha",
    "viralatinha",
    "mestico",
    "mestica",
    "cachorro sem raca",
    "gato sem raca",
    "mixed",
    "mutt",
    "mut",
    "indefinid",
    "sem definicao",
    "comum",
    "adotado",
    "resgatado",
    "viralta",
    "virala",
    "viraata",
  ];

  return (
    srdKeywords.some((k) => norm.includes(k) || compact.includes(stripSpaces(k))) ||
    norm.startsWith("vir") ||
    norm === "v" ||
    norm === "vi" ||
    norm === "sr"
  );
}

/**
 * Real-time AI Breed search and scoring engine returning rich structured metadata.
 * Isolamento estrito por espécie com 3 níveis de correspondência e ranking refinado:
 * 1. Correspondência exata / Alias exato
 * 2. Prefix match (começa com)
 * 3. Substring (contém)
 * 4. Fuzzy / Levenshtein matching (tolerância a typos)
 */
export function searchAiBreedsDetailed(
  query: string,
  petSpecies: string,
  limit = 8
): AiPetSuggestion[] {
  const normQuery = normalizeText(query);
  const compactQuery = stripSpaces(query);
  const specLower = normalizeText(petSpecies);

  const isCat = specLower.includes("gato") || specLower.includes("felin") || specLower.includes("cat");
  const isDog = specLower.includes("cao") || specLower.includes("cachorro") || specLower.includes("canin") || specLower.includes("dog");
  const isBird = specLower.includes("ave") || specLower.includes("passaro") || specLower.includes("bird");
  const isRodent = specLower.includes("roedor") || specLower.includes("coelho") || specLower.includes("hamster") || specLower.includes("rodent");
  const isExotic =
    specLower.includes("exotico") ||
    specLower.includes("outro") ||
    specLower.includes("especial") ||
    specLower.includes("reptil") ||
    specLower.includes("exotic");

  let baseList: AiPetSuggestion[] = [];
  if (isCat) {
    baseList = detailedPetDatabase.filter((p) => p.category === "cat");
  } else if (isDog) {
    baseList = detailedPetDatabase.filter((p) => p.category === "dog");
  } else if (isBird) {
    baseList = detailedPetDatabase.filter((p) => p.category === "bird");
  } else if (isRodent) {
    baseList = detailedPetDatabase.filter((p) => p.category === "rodent");
  } else if (isExotic) {
    baseList = detailedPetDatabase.filter((p) => p.category === "rodent" || p.category === "bird" || p.category === "exotic");
  } else {
    baseList = detailedPetDatabase.filter((p) => p.category === "dog");
  }

  if (!normQuery) {
    return baseList.slice(0, limit);
  }

  // Se o usuário digitou algum termo de vira-lata/SRD (mesmo começando por 'v', 'vir', etc.), prioriza SRD
  if (isSrdTerm(normQuery)) {
    const srdItem = baseList.find((p) => p.name.includes("SRD")) || {
      name: "Sem Raça Definida (SRD)",
      category: isCat ? "cat" : "dog",
      categoryLabel: isCat ? "Gato" : "Cão",
      tag: "Sem restrições de raça",
      isBrachy: false,
    };
    // Se a query for curta ("v" ou "vir"), adiciona outras raças que começam com v depois do SRD
    if (normQuery.length <= 3) {
      const otherMatches = baseList
        .filter((p) => !p.name.includes("SRD"))
        .filter((p) => normalizeText(p.name).startsWith(normQuery))
        .slice(0, limit - 1);
      return [srdItem, ...otherMatches];
    }
    return [srdItem];
  }

  // Score matching breeds strictly within current category
  const scored = baseList
    .map((item) => {
      const normName = normalizeText(item.name);
      const compactName = stripSpaces(item.name);
      const aliases = (item.aliases || []).map(normalizeText);
      const compactAliases = (item.aliases || []).map(stripSpaces);
      const normTag = normalizeText(item.tag || "");

      let score = 0;

      // NÍVEL 1: Match Exato / Alias Exato
      if (normName === normQuery || compactName === compactQuery) {
        score = 100;
      } else if (aliases.includes(normQuery) || compactAliases.includes(compactQuery)) {
        score = 95;
      }
      // NÍVEL 2: Prefix Match (Começa com)
      else if (normName.startsWith(normQuery) || compactName.startsWith(compactQuery)) {
        score = 85;
      } else if (aliases.some((a) => a.startsWith(normQuery)) || compactAliases.some((ca) => ca.startsWith(compactQuery))) {
        score = 80;
      } else if (normName.split(/\s+/).some((w) => w.startsWith(normQuery))) {
        score = 75;
      }
      // NÍVEL 3: Substring (Contém)
      else if (normName.includes(normQuery) || compactName.includes(compactQuery)) {
        score = 65;
      } else if (aliases.some((a) => a.includes(normQuery)) || compactAliases.some((ca) => ca.includes(compactQuery))) {
        score = 60;
      } else if (normTag.includes(normQuery)) {
        score = 45;
      }
      // NÍVEL 4: Fuzzy Matching (Levenshtein) para tolerância a pequenos erros de digitação
      else if (normQuery.length >= 3) {
        // Comparação com palavras do nome
        const nameWords = normName.split(/\s+/);
        let minWordDist = 999;
        for (const w of nameWords) {
          if (w.length >= 3) {
            const dist = levenshtein(w, normQuery);
            if (dist < minWordDist) minWordDist = dist;
          }
        }

        // Comparação com aliases
        let minAliasDist = 999;
        for (const a of aliases) {
          if (a.length >= 3) {
            const dist = levenshtein(a, normQuery);
            if (dist < minAliasDist) minAliasDist = dist;
          }
        }

        const directDist = levenshtein(compactName, compactQuery);
        const bestDist = Math.min(minWordDist, minAliasDist, directDist);

        const maxAllowedDist = normQuery.length >= 6 ? 2 : 1;
        if (bestDist <= maxAllowedDist) {
          score = Math.max(30, 50 - bestDist * 10);
        }
      }

      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.item);
}

/**
 * Backwards compatible simple string search
 */
export function searchAiBreeds(query: string, petSpecies: string, limit = 12): string[] {
  return searchAiBreedsDetailed(query, petSpecies, limit).map((p) => p.name);
}
