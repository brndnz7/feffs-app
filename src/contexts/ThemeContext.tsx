/**
 * Context pour le thème de l'application
 * PÔLE: UX/UI & ACCESSIBILITÉ
 */

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import { storageService } from "../services/storage";
import { AppSettings } from "../types";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: "light" | "dark" | "auto") => void;
  themePreference: "light" | "dark" | "auto";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [themePreference, setThemePreference] = useState<
    "light" | "dark" | "auto"
  >("auto");
  const [theme, setThemeState] = useState<Theme>(deviceColorScheme || "light");

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (themePreference === "auto") {
      setThemeState(deviceColorScheme || "light");
    } else {
      setThemeState(themePreference);
    }
  }, [themePreference, deviceColorScheme]);

  const loadThemePreference = async () => {
    const settings = await storageService.getSettings();
    if (settings) {
      setThemePreference(settings.theme);
    }
  };

  const setTheme = async (newTheme: "light" | "dark" | "auto") => {
    setThemePreference(newTheme);
    const settings = await storageService.getSettings();
    await storageService.saveSettings({
      ...settings,
      theme: newTheme,
    } as AppSettings);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        setTheme,
        themePreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
