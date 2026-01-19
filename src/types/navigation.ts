/**
 * Types pour la navigation de l'application
 */

export type RootStackParamList = {
  // Tabs principaux
  Tabs: undefined;

  // Authentification et Pass
  PassPurchase: undefined;
  PassView: { passId: string };

  // Catalogue et Programme
  FilmDetails: { filmId: string };
  ScreeningDetails: { screeningId: string };
  EventDetails: { eventId: string };

  // Planning personnalisé
  MySchedule: undefined;
  ScheduleConflicts: undefined;

  // Enquêtes
  Survey: { surveyId: string; screeningId?: string };
  QRCodeScanner: undefined;

  // Notifications
  NotificationsList: undefined;
  DailyProgram: { date?: string };

  // Paramètres
  Settings: undefined;
  Accessibility: undefined;
  About: undefined;
};

export type TabsParamList = {
  Home: undefined;
  Catalog: undefined;
  Schedule: undefined;
  Pass: undefined;
  More: undefined;
};
