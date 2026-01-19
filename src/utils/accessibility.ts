/**
 * Utilitaires pour l'accessibilité
 * PÔLE: UX/UI & ACCESSIBILITÉ
 */

import { AccessibilityInfo, Platform } from "react-native";

/**
 * Annonce un message au lecteur d'écran
 */
export const announceForAccessibility = (message: string) => {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    AccessibilityInfo.announceForAccessibility(message);
  }
};

/**
 * Vérifie si le lecteur d'écran est activé
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.error("Error checking screen reader:", error);
    return false;
  }
};

/**
 * Génère un label accessible pour un bouton
 */
export const getAccessibleLabel = (
  label: string,
  hint?: string,
  state?: string,
): string => {
  let fullLabel = label;
  if (state) fullLabel += `, ${state}`;
  if (hint) fullLabel += `. ${hint}`;
  return fullLabel;
};

/**
 * Props d'accessibilité communes pour les boutons
 */
export const getButtonA11yProps = (
  label: string,
  hint?: string,
  disabled = false,
) => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: "button" as const,
  accessibilityState: { disabled },
});

/**
 * Props d'accessibilité pour les liens
 */
export const getLinkA11yProps = (label: string, hint?: string) => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: "link" as const,
});

/**
 * Props d'accessibilité pour les images
 */
export const getImageA11yProps = (description: string) => ({
  accessible: true,
  accessibilityLabel: description,
  accessibilityRole: "image" as const,
});

/**
 * Props d'accessibilité pour les en-têtes
 */
export const getHeaderA11yProps = (level: number = 1) => ({
  accessible: true,
  accessibilityRole: "header" as const,
  accessibilityLevel: level,
});
