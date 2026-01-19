/**
 * Constantes de l'application
 */

export const COLORS = {
  // Palette principale (à adapter selon la charte graphique FEFFS)
  primary: "#FF0000",
  secondary: "#1A1A1A",
  accent: "#FFD700",

  // Backgrounds
  background: {
    light: "#FFFFFF",
    dark: "#000000",
  },

  // Texte
  text: {
    primary: {
      light: "#1A1A1A",
      dark: "#FFFFFF",
    },
    secondary: {
      light: "#666666",
      dark: "#AAAAAA",
    },
  },

  // États
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3",

  // Transparence
  overlay: "rgba(0, 0, 0, 0.5)",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const FESTIVAL_CONFIG = {
  name: "FEFFS",
  fullName: "Festival Européen du Film Fantastique de Strasbourg",
  year: 2026,
  startDate: new Date("2026-09-10"),
  endDate: new Date("2026-09-20"),
};
