/**
 * Service de notifications push
 * PÔLE: UX/UI & ACCESSIBILITÉ
 */

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { storageService } from "./storage";

// Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  /**
   * Initialise les notifications et demande les permissions
   */
  async initialize(): Promise<boolean> {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.warn("Permission pour les notifications refusée");
        return false;
      }

      // Configuration pour Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "FEFFS Notifications",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return true;
    } catch (error) {
      console.error("Error initializing notifications:", error);
      return false;
    }
  }

  /**
   * Envoie une notification locale
   */
  async sendLocalNotification(
    title: string,
    body: string,
    data?: any,
  ): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: null, // Immédiat
    });
  }

  /**
   * Programme une notification pour plus tard
   */
  async scheduleNotification(
    title: string,
    body: string,
    triggerDate: Date,
    data?: any,
  ): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });
  }

  /**
   * Programme des rappels pour les projections du planning
   */
  async scheduleScreeningReminders(
    screeningId: string,
    startTime: Date,
  ): Promise<void> {
    const settings = await storageService.getSettings();
    if (!settings?.notificationsEnabled) return;

    // Rappel 30 minutes avant
    const reminder30min = new Date(startTime.getTime() - 30 * 60 * 1000);
    if (reminder30min > new Date()) {
      await this.scheduleNotification(
        "Projection dans 30 minutes",
        "Votre prochaine projection commence bientôt",
        reminder30min,
        { type: "screening_reminder", screeningId },
      );
    }
  }

  /**
   * Envoie la notification quotidienne "La Quotidienne"
   */
  async sendDailyProgramNotification(): Promise<void> {
    const settings = await storageService.getSettings();
    if (!settings?.notificationsEnabled) return;

    await this.sendLocalNotification(
      "📅 La Quotidienne",
      "Découvrez le programme du jour !",
      { type: "daily_program", date: new Date().toISOString() },
    );
  }

  /**
   * Annule toutes les notifications programmées
   */
  async cancelAllScheduledNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  /**
   * Annule une notification spécifique
   */
  async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  /**
   * Récupère le token push (pour les notifications serveur)
   */
  async getPushToken(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
      });
      return token.data;
    } catch (error) {
      console.error("Error getting push token:", error);
      return null;
    }
  }
}

export const notificationService = new NotificationService();
