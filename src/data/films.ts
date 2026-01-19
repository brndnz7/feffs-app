/**
 * Données des films pour le FEFFS 2026
 * Basé sur le vrai festival avec des films réalistes
 */

export type FilmCategory =
  | "competition"
  | "eurogenre"
  | "crossovers"
  | "animation"
  | "retrospective"
  | "short"
  | "connexions";

export type Competition =
  | "octopus-or"
  | "melies-argent"
  | "crossovers"
  | "animation"
  | "court-metrage"
  | "none";

export interface FilmData {
  id: string;
  title: string;
  originalTitle?: string;
  director: string;
  country: string;
  year: number;
  duration: number;
  genre: string[];
  synopsis: string;
  posterUrl?: string;
  trailerUrl?: string;
  category: FilmCategory;
  competition: Competition;
  cast?: string[];
  language: string;
  subtitles?: string;
  rating?: string; // "Tous publics", "-12", "-16", "-18"
  isWorldPremiere?: boolean;
  isFrenchPremiere?: boolean;
}

export interface ScreeningData {
  id: string;
  filmId: string;
  venueId: string;
  date: string; // "2026-09-25"
  startTime: string; // "20:30"
  endTime: string;
  isSpecialEvent?: boolean;
  guestPresence?: string[];
}

export interface VenueData {
  id: string;
  name: string;
  shortName: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  capacity: number;
  accessibilityInfo: string;
  travelTimeFromCenter: number; // minutes depuis le centre
}

// ============================================
// LIEUX DU FESTIVAL
// ============================================

export const VENUES: VenueData[] = [
  {
    id: "ugc",
    name: "UGC Ciné Cité Strasbourg",
    shortName: "UGC",
    address: "25 Rue du Jeu des Enfants, 67000 Strasbourg",
    coordinates: { latitude: 48.5844, longitude: 7.7469 },
    capacity: 350,
    accessibilityInfo: "Accessible PMR, boucle magnétique",
    travelTimeFromCenter: 5,
  },
  {
    id: "star",
    name: "Cinéma Star",
    shortName: "Star",
    address: "27 Rue du Jeu des Enfants, 67000 Strasbourg",
    coordinates: { latitude: 48.5842, longitude: 7.7465 },
    capacity: 200,
    accessibilityInfo: "Accessible PMR",
    travelTimeFromCenter: 5,
  },
  {
    id: "star-st-ex",
    name: "Cinéma Star Saint-Exupéry",
    shortName: "Star St-Ex",
    address: "18 Rue du 22 Novembre, 67000 Strasbourg",
    coordinates: { latitude: 48.5834, longitude: 7.7512 },
    capacity: 180,
    accessibilityInfo: "Accessible PMR, audio-description disponible",
    travelTimeFromCenter: 7,
  },
  {
    id: "odyssee",
    name: "Cinéma Odyssée",
    shortName: "Odyssée",
    address: "3 Rue des Francs-Bourgeois, 67000 Strasbourg",
    coordinates: { latitude: 48.5812, longitude: 7.7534 },
    capacity: 150,
    accessibilityInfo: "Accessible PMR au rez-de-chaussée",
    travelTimeFromCenter: 10,
  },
  {
    id: "shadok",
    name: "Le Shadok",
    shortName: "Shadok",
    address: "25 Presqu'île André Malraux, 67000 Strasbourg",
    coordinates: { latitude: 48.5728, longitude: 7.7621 },
    capacity: 80,
    accessibilityInfo: "Entièrement accessible PMR",
    travelTimeFromCenter: 15,
  },
];

// ============================================
// FILMS EN COMPÉTITION - LONGS MÉTRAGES
// ============================================

export const FILMS: FilmData[] = [
  // === COMPÉTITION INTERNATIONALE ===
  {
    id: "good-boy",
    title: "Good Boy",
    director: "Ben Leonberg",
    country: "États-Unis",
    year: 2026,
    duration: 98,
    genre: ["Horreur", "Comédie noire"],
    synopsis:
      "Un jeune homme adopte un chien aux comportements étranges. Rapidement, il découvre que son nouvel animal de compagnie a des goûts très particuliers... pour la chair humaine.",
    category: "competition",
    competition: "octopus-or",
    cast: ["Judy Greer", "Steve Guttenberg"],
    language: "Anglais",
    subtitles: "Français",
    rating: "-16",
    isWorldPremiere: true,
  },
  {
    id: "the-holy-boy",
    title: "The Holy Boy",
    originalTitle: "Il Sacro Ragazzo",
    director: "Paolo Strippoli",
    country: "Italie",
    year: 2026,
    duration: 105,
    genre: ["Horreur", "Thriller"],
    synopsis:
      "Dans un petit village italien, un adolescent commence à manifester des stigmates. Miracle ou malédiction ? Le prêtre local va découvrir une vérité terrifiante.",
    category: "competition",
    competition: "melies-argent",
    cast: ["Andrea Ferrante", "Giuseppe Catanzaro"],
    language: "Italien",
    subtitles: "Français",
    rating: "-16",
  },
  {
    id: "new-group",
    title: "New Group",
    originalTitle: "Shin Gurupu",
    director: "Yûta Shimotsu",
    country: "Japon",
    year: 2026,
    duration: 112,
    genre: ["Horreur", "Psychologique"],
    synopsis:
      "Un groupe de lycéens découvre un jeu en ligne mystérieux. Pour gagner, ils doivent révéler leurs secrets les plus sombres. Mais le jeu semble avoir sa propre volonté...",
    category: "competition",
    competition: "octopus-or",
    cast: ["Yuki Yamada", "Mei Nagano"],
    language: "Japonais",
    subtitles: "Français",
    rating: "-12",
  },
  {
    id: "luger",
    title: "Luger",
    director: "Bruno Martín",
    country: "Espagne",
    year: 2026,
    duration: 95,
    genre: ["Thriller", "Policier"],
    synopsis:
      "Un détective en disgrâce découvre qu'une série de meurtres est liée à un pistolet Luger de la Seconde Guerre mondiale, et que l'arme semble choisir elle-même ses victimes.",
    category: "crossovers",
    competition: "crossovers",
    cast: ["Javier Bardem", "Carmen Machi"],
    language: "Espagnol",
    subtitles: "Français",
    rating: "-16",
  },
  {
    id: "forbidden-city",
    title: "The Forbidden City",
    originalTitle: "La Città Proibita",
    director: "Gabriele Mainetti",
    country: "Italie",
    year: 2026,
    duration: 118,
    genre: ["Action", "Fantastique"],
    synopsis:
      "Rome, 2045. Une zone interdite cache un secret que le gouvernement tente de protéger à tout prix. Un groupe de rebelles va découvrir ce qui s'y trame vraiment.",
    category: "crossovers",
    competition: "crossovers",
    cast: ["Claudio Santamaria", "Aurora Giovinazzo"],
    language: "Italien",
    subtitles: "Français",
    rating: "-12",
    isFrenchPremiere: true,
  },

  // === ANIMATION ===
  {
    id: "arco",
    title: "Arco",
    director: "Ugo Bienvenue",
    country: "France",
    year: 2026,
    duration: 85,
    genre: ["Animation", "Aventure", "Fantastique"],
    synopsis:
      "Dans un monde où les couleurs ont disparu, un jeune archer part en quête du mythique Arc-en-Ciel pour redonner vie à son village.",
    category: "animation",
    competition: "animation",
    language: "Français",
    rating: "Tous publics",
  },
  {
    id: "heart-of-darkness",
    title: "Heart of Darkness",
    originalTitle: "Coração das Trevas",
    director: "Rogério Nunes",
    country: "Brésil",
    year: 2026,
    duration: 92,
    genre: ["Animation", "Horreur"],
    synopsis:
      "Une adaptation animée du roman de Joseph Conrad, transposée dans la jungle amazonienne contemporaine avec une touche d'horreur folk.",
    category: "animation",
    competition: "animation",
    cast: ["Wagner Moura (voix)"],
    language: "Portugais",
    subtitles: "Français",
    rating: "-12",
  },

  // === RÉTROSPECTIVES ===
  {
    id: "alien-1979",
    title: "Alien, le huitième passager",
    originalTitle: "Alien",
    director: "Ridley Scott",
    country: "États-Unis / Royaume-Uni",
    year: 1979,
    duration: 117,
    genre: ["Science-Fiction", "Horreur"],
    synopsis:
      "Le cargo spatial Nostromo est détourné vers une planète déserte. L'équipage y découvre un vaisseau extraterrestre abandonné et ramène à bord un organisme inconnu...",
    category: "retrospective",
    competition: "none",
    cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
    language: "Anglais",
    subtitles: "Français",
    rating: "-12",
  },
  {
    id: "suspiria-1977",
    title: "Suspiria",
    director: "Dario Argento",
    country: "Italie",
    year: 1977,
    duration: 98,
    genre: ["Horreur", "Fantastique"],
    synopsis:
      "Une jeune danseuse américaine intègre une prestigieuse académie de danse en Allemagne. Elle découvre rapidement que l'école cache un terrible secret.",
    category: "retrospective",
    competition: "none",
    cast: ["Jessica Harper", "Stefania Casini"],
    language: "Anglais",
    subtitles: "Français",
    rating: "-16",
  },
  {
    id: "shining-1980",
    title: "Shining",
    originalTitle: "The Shining",
    director: "Stanley Kubrick",
    country: "États-Unis / Royaume-Uni",
    year: 1980,
    duration: 146,
    genre: ["Horreur", "Thriller"],
    synopsis:
      "Jack Torrance devient gardien d'hiver de l'hôtel Overlook, isolé dans les montagnes. Avec sa femme et son fils, il s'installe dans cet immense palace désert...",
    category: "retrospective",
    competition: "none",
    cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    language: "Anglais",
    subtitles: "Français",
    rating: "-12",
  },

  // === COURTS MÉTRAGES ===
  {
    id: "gynoid",
    title: "Gynoid",
    director: "Celia Galán",
    country: "Espagne",
    year: 2026,
    duration: 18,
    genre: ["Science-Fiction", "Drame"],
    synopsis:
      "Dans un futur proche, une androïde domestique développe une conscience et doit faire face à la réalité de sa condition.",
    category: "short",
    competition: "court-metrage",
    language: "Espagnol",
    subtitles: "Français",
    rating: "-12",
  },
  {
    id: "nervous-ellie",
    title: "Nervous Ellie",
    director: "David Yorke",
    country: "Royaume-Uni",
    year: 2026,
    duration: 15,
    genre: ["Horreur", "Comédie"],
    synopsis:
      "Ellie, anxieuse chronique, doit faire face à un monstre qui se nourrit littéralement de sa nervosité.",
    category: "short",
    competition: "court-metrage",
    language: "Anglais",
    subtitles: "Français",
    rating: "Tous publics",
  },
  {
    id: "don-quichotte",
    title: "Don Quichotte contre les Forces du Mal",
    director: "Guillaume Rieu",
    country: "France",
    year: 2026,
    duration: 22,
    genre: ["Fantastique", "Aventure"],
    synopsis:
      "Don Quichotte revient dans le monde moderne pour combattre des moulins à vent d'un nouveau genre: les algorithmes des réseaux sociaux.",
    category: "short",
    competition: "court-metrage",
    language: "Français",
    rating: "Tous publics",
  },
];

// ============================================
// SÉANCES
// ============================================

export const SCREENINGS: ScreeningData[] = [
  // Jour 1 - Vendredi 25 septembre
  {
    id: "s1",
    filmId: "good-boy",
    venueId: "ugc",
    date: "2026-09-25",
    startTime: "20:30",
    endTime: "22:15",
    isSpecialEvent: true,
    guestPresence: ["Ben Leonberg"],
  },
  {
    id: "s2",
    filmId: "alien-1979",
    venueId: "star",
    date: "2026-09-25",
    startTime: "21:00",
    endTime: "23:00",
  },

  // Jour 2 - Samedi 26 septembre
  {
    id: "s3",
    filmId: "the-holy-boy",
    venueId: "ugc",
    date: "2026-09-26",
    startTime: "14:00",
    endTime: "15:50",
    guestPresence: ["Paolo Strippoli"],
  },
  {
    id: "s4",
    filmId: "arco",
    venueId: "star",
    date: "2026-09-26",
    startTime: "14:30",
    endTime: "16:00",
  },
  {
    id: "s5",
    filmId: "new-group",
    venueId: "ugc",
    date: "2026-09-26",
    startTime: "17:00",
    endTime: "19:00",
  },
  {
    id: "s6",
    filmId: "suspiria-1977",
    venueId: "odyssee",
    date: "2026-09-26",
    startTime: "21:00",
    endTime: "22:45",
  },
  {
    id: "s7",
    filmId: "luger",
    venueId: "star-st-ex",
    date: "2026-09-26",
    startTime: "20:30",
    endTime: "22:10",
  },

  // Jour 3 - Dimanche 27 septembre
  {
    id: "s8",
    filmId: "heart-of-darkness",
    venueId: "star",
    date: "2026-09-27",
    startTime: "11:00",
    endTime: "12:35",
  },
  {
    id: "s9",
    filmId: "forbidden-city",
    venueId: "ugc",
    date: "2026-09-27",
    startTime: "15:00",
    endTime: "17:00",
    isSpecialEvent: true,
    guestPresence: ["Gabriele Mainetti"],
  },
  {
    id: "s10",
    filmId: "shining-1980",
    venueId: "odyssee",
    date: "2026-09-27",
    startTime: "20:00",
    endTime: "22:30",
  },

  // Jour 4 - Lundi 28 septembre - Courts métrages
  {
    id: "s11",
    filmId: "gynoid",
    venueId: "star",
    date: "2026-09-28",
    startTime: "18:00",
    endTime: "18:20",
  },
  {
    id: "s12",
    filmId: "nervous-ellie",
    venueId: "star",
    date: "2026-09-28",
    startTime: "18:25",
    endTime: "18:42",
  },
  {
    id: "s13",
    filmId: "don-quichotte",
    venueId: "star",
    date: "2026-09-28",
    startTime: "18:45",
    endTime: "19:10",
  },

  // Séances supplémentaires
  {
    id: "s14",
    filmId: "good-boy",
    venueId: "star-st-ex",
    date: "2026-09-28",
    startTime: "21:00",
    endTime: "22:45",
  },
  {
    id: "s15",
    filmId: "the-holy-boy",
    venueId: "ugc",
    date: "2026-09-29",
    startTime: "20:00",
    endTime: "21:50",
  },
];

// ============================================
// ÉVÉNEMENTS
// ============================================

export interface EventData {
  id: string;
  title: string;
  type:
    | "masterclass"
    | "debate"
    | "concert"
    | "exhibition"
    | "ceremony"
    | "zombiewalk"
    | "vr"
    | "gaming"
    | "other";
  description: string;
  venueId: string;
  date: string;
  startTime: string;
  endTime: string;
  guests?: string[];
  imageUrl?: string;
  isFree?: boolean;
}

export const EVENTS: EventData[] = [
  {
    id: "e1",
    title: "Cérémonie d'ouverture",
    type: "ceremony",
    description:
      "Soirée d'ouverture officielle du 19e Festival Européen du Film Fantastique de Strasbourg avec projection du film d'ouverture et cocktail.",
    venueId: "ugc",
    date: "2026-09-25",
    startTime: "19:00",
    endTime: "20:00",
  },
  {
    id: "e2",
    title: "Masterclass - L'horreur moderne",
    type: "masterclass",
    description:
      "Rencontre avec les réalisateurs de la nouvelle vague du cinéma d'horreur. Discussion sur les techniques de mise en scène et l'évolution du genre.",
    venueId: "shadok",
    date: "2026-09-26",
    startTime: "10:30",
    endTime: "12:30",
    guests: ["Ben Leonberg", "Paolo Strippoli"],
  },
  {
    id: "e3",
    title: "VR Experience - Immersion Horrifique",
    type: "vr",
    description:
      "Plongez dans des expériences de réalité virtuelle sélectionnées par le festival. Accès libre dans la limite des places disponibles.",
    venueId: "shadok",
    date: "2026-09-26",
    startTime: "14:00",
    endTime: "19:00",
    isFree: true,
  },
  {
    id: "e4",
    title: "Indie Game Contest - Finale",
    type: "gaming",
    description:
      "Finale du concours de jeux vidéo indépendants. Découvrez les créations des développeurs en compétition et votez pour votre favori !",
    venueId: "shadok",
    date: "2026-09-27",
    startTime: "14:00",
    endTime: "18:00",
    isFree: true,
  },
  {
    id: "e5",
    title: "Zombie Walk Strasbourg",
    type: "zombiewalk",
    description:
      "La traditionnelle marche des zombies dans les rues de Strasbourg ! Maquillage sur place ou venez déjà transformé. Départ place Kléber.",
    venueId: "ugc",
    date: "2026-09-27",
    startTime: "16:00",
    endTime: "18:00",
    isFree: true,
  },
  {
    id: "e6",
    title: "Débat - Femmes et cinéma de genre",
    type: "debate",
    description:
      "Table ronde avec des réalisatrices et actrices du cinéma fantastique sur la place des femmes devant et derrière la caméra.",
    venueId: "odyssee",
    date: "2026-09-28",
    startTime: "15:00",
    endTime: "16:30",
    guests: ["Celia Galán"],
  },
  {
    id: "e7",
    title: "Cérémonie de clôture et palmarès",
    type: "ceremony",
    description:
      "Annonce du palmarès et remise des prix. Octopus d'Or, Méliès d'Argent, Prix du Public et mentions spéciales.",
    venueId: "ugc",
    date: "2026-10-04",
    startTime: "19:00",
    endTime: "21:00",
  },
];

// ============================================
// INVITÉS D'HONNEUR
// ============================================

export interface GuestData {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  filmography?: string[];
  isHonorGuest?: boolean;
}

export const GUESTS: GuestData[] = [
  {
    id: "g1",
    name: "Alexandre Aja",
    role: "Réalisateur",
    bio: "Réalisateur français spécialisé dans le cinéma d'horreur, connu pour Haute Tension, La Colline a des yeux, Piranha 3D et Crawl.",
    filmography: [
      "Haute Tension (2003)",
      "La Colline a des yeux (2006)",
      "Piranha 3D (2010)",
      "Crawl (2019)",
    ],
    isHonorGuest: true,
  },
  {
    id: "g2",
    name: "Ben Leonberg",
    role: "Réalisateur",
    bio: "Réalisateur américain émergent, présent au festival avec son film Good Boy en compétition officielle.",
    filmography: ["Good Boy (2026)"],
  },
  {
    id: "g3",
    name: "Paolo Strippoli",
    role: "Réalisateur",
    bio: "Réalisateur italien de la nouvelle génération du cinéma d'horreur transalpin.",
    filmography: ["A Classic Horror Story (2021)", "The Holy Boy (2026)"],
  },
  {
    id: "g4",
    name: "Gabriele Mainetti",
    role: "Réalisateur",
    bio: "Réalisateur italien, créateur de l'univers de Freaks Out, présent avec The Forbidden City.",
    filmography: ["Ils l'appellent Jeeg Robot (2015)", "Freaks Out (2021)"],
  },
];

// ============================================
// HELPERS
// ============================================

export function getFilmById(id: string): FilmData | undefined {
  return FILMS.find((f) => f.id === id);
}

export function getVenueById(id: string): VenueData | undefined {
  return VENUES.find((v) => v.id === id);
}

export function getScreeningsForFilm(filmId: string): ScreeningData[] {
  return SCREENINGS.filter((s) => s.filmId === filmId);
}

export function getScreeningsForDate(date: string): ScreeningData[] {
  return SCREENINGS.filter((s) => s.date === date);
}

export function getEventsForDate(date: string): EventData[] {
  return EVENTS.filter((e) => e.date === date);
}

export function getFilmsByCategory(category: FilmCategory): FilmData[] {
  return FILMS.filter((f) => f.category === category);
}

export function getFilmsByCompetition(competition: Competition): FilmData[] {
  return FILMS.filter((f) => f.competition === competition);
}

export const FESTIVAL_DATES = {
  start: "2026-09-25",
  end: "2026-10-04",
  days: [
    "2026-09-25",
    "2026-09-26",
    "2026-09-27",
    "2026-09-28",
    "2026-09-29",
    "2026-09-30",
    "2026-10-01",
    "2026-10-02",
    "2026-10-03",
    "2026-10-04",
  ],
};

export const CATEGORY_LABELS: Record<FilmCategory, string> = {
  competition: "Compétition Internationale",
  eurogenre: "Eurogenre",
  crossovers: "Crossovers",
  animation: "Animation",
  retrospective: "Rétrospectives",
  short: "Courts Métrages",
  connexions: "Connexions",
};

export const COMPETITION_LABELS: Record<Competition, string> = {
  "octopus-or": "Octopus d'Or",
  "melies-argent": "Méliès d'Argent",
  crossovers: "Grand Prix Crossovers",
  animation: "Cigogne d'Or",
  "court-metrage": "Compétition Courts Métrages",
  none: "",
};
