/**
 * Provider principal combinant tous les contextes
 * PÔLE: ARCHITECTURE & DONNÉES
 */

import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { PlanningProvider } from "./PlanningContext";
import { ThemeProvider } from "./ThemeContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlanningProvider>{children}</PlanningProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
