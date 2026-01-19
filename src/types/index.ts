/**
 * Types principaux pour l'application FEFFS
 * Selon le cahier des charges
 */

// ============================================
// PÔLE ARCHITECTURE & DONNÉES
// ============================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo?: string;
  createdAt: Date;
}

export interface AppSettings {
  theme: "light" | "dark" | "auto";
  language: "fr" | "en";
  notificationsEnabled: boolean;
  accessibilityMode: boolean;
}

// ============================================
// PÔLE PLANNING
// ============================================

export interface Film {
  id: string;
  title: string;
  originalTitle?: string;
  director: string;
  year: number;
  duration: number; // en minutes
  genre: string[];
  synopsis: string;
  posterUrl?: string;
  trailerUrl?: string;
  rating?: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  capacity: number;
  accessibilityInfo?: string;
}

export interface Screening {
  id: string;
  filmId: string;
  venueId: string;
  startTime: Date;
  endTime: Date;
  language: "vo" | "vf";
  subtitles?: "fr" | "en";
  specialEvent?: boolean;
  availableSeats?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: "masterclass" | "debate" | "concert" | "exhibition" | "other";
  venueId: string;
  startTime: Date;
  endTime: Date;
  guests?: string[];
  imageUrl?: string;
}

export interface Schedule {
  userId: string;
  screenings: string[]; // IDs des projections
  events: string[]; // IDs des événements
  conflicts: ScheduleConflict[];
}

export interface ScheduleConflict {
  type: "time_overlap" | "travel_time" | "impossible_route";
  items: string[]; // IDs des items en conflit
  message: string;
  severity: "error" | "warning";
}

// ============================================
// PÔLE UTILISATEUR (Pass & Billetterie)
// ============================================

export type PassType = "full" | "weekend" | "day" | "student";

export interface Pass {
  id: string;
  userId: string;
  type: PassType;
  qrCode: string;
  photo: string;
  purchaseDate: Date;
  validFrom: Date;
  validUntil: Date;
  price: number;
  active: boolean;
}

export interface PassPurchaseForm {
  firstName: string;
  lastName: string;
  email: string;
  passType: PassType;
  photo?: string;
  agreeToTerms: boolean;
}

// ============================================
// PÔLE UX/UI & ACCESSIBILITÉ
// ============================================

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "schedule_change" | "reminder" | "news" | "daily";
  date: Date;
  read: boolean;
  actionUrl?: string;
}

export interface DailyProgram {
  date: Date;
  screenings: Screening[];
  events: Event[];
  highlights: string[];
}

export interface Survey {
  id: string;
  screeningId?: string;
  questions: SurveyQuestion[];
  submitted: boolean;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: "rating" | "text" | "choice" | "multiple_choice";
  options?: string[];
  required: boolean;
}

export interface SurveyResponse {
  surveyId: string;
  screeningId?: string;
  answers: {
    questionId: string;
    answer: string | number | string[];
  }[];
  submittedAt: Date;
}

// ============================================
// TYPES UTILITAIRES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
