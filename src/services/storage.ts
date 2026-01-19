/**
 * Service de stockage local (AsyncStorage)
 * PÔLE: ARCHITECTURE & DONNÉES
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppSettings, Pass, Schedule, User } from "../types";

const KEYS = {
  USER: "@feffs:user",
  SETTINGS: "@feffs:settings",
  SCHEDULE: "@feffs:schedule",
  PASS: "@feffs:pass",
  NOTIFICATIONS: "@feffs:notifications",
  CACHE: "@feffs:cache",
};

class StorageService {
  // User
  async getUser(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  async clearUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
    } catch (error) {
      console.error("Error clearing user:", error);
    }
  }

  // Settings
  async getSettings(): Promise<AppSettings | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SETTINGS);
      return data
        ? JSON.parse(data)
        : {
            theme: "auto",
            language: "fr",
            notificationsEnabled: true,
            accessibilityMode: false,
          };
    } catch (error) {
      console.error("Error getting settings:", error);
      return null;
    }
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }

  // Schedule
  async getSchedule(): Promise<Schedule | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SCHEDULE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting schedule:", error);
      return null;
    }
  }

  async saveSchedule(schedule: Schedule): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.SCHEDULE, JSON.stringify(schedule));
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  }

  // Pass
  async getPass(): Promise<Pass | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.PASS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting pass:", error);
      return null;
    }
  }

  async savePass(pass: Pass): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.PASS, JSON.stringify(pass));
    } catch (error) {
      console.error("Error saving pass:", error);
    }
  }

  // Cache générique
  async getCache<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(`${KEYS.CACHE}:${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting cache ${key}:`, error);
      return null;
    }
  }

  async setCache<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        ttl,
      };
      await AsyncStorage.setItem(`${KEYS.CACHE}:${key}`, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting cache ${key}:`, error);
    }
  }

  async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((key) => key.startsWith(KEYS.CACHE));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing all data:", error);
    }
  }
}

export const storageService = new StorageService();
