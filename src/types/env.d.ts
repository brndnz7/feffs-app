/**
 * Configuration TypeScript pour les alias de chemins
 */

export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL?: string;
      EXPO_PUBLIC_PROJECT_ID?: string;
    }
  }
}
