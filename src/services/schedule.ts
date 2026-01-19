/**
 * Service de gestion du planning et vérification des conflits
 * PÔLE: PLANNING
 */

import { Schedule, ScheduleConflict } from "../types";
import { apiService } from "./api";

class ScheduleService {
  /**
   * Vérifie les conflits dans le planning
   * - Conflits horaires (chevauchements)
   * - Temps de trajet entre salles
   */
  async checkScheduleConflicts(
    schedule: Schedule,
  ): Promise<ScheduleConflict[]> {
    const conflicts: ScheduleConflict[] = [];

    try {
      // Récupérer toutes les projections
      const screeningsPromises = schedule.screenings.map((id) =>
        apiService.getScreeningById(id),
      );
      const screeningsResults = await Promise.all(screeningsPromises);
      const screenings = screeningsResults
        .filter((r) => r.success && r.data)
        .map((r) => r.data!);

      // Récupérer tous les événements
      const eventsPromises = schedule.events.map((id) =>
        apiService.getEventById(id),
      );
      const eventsResults = await Promise.all(eventsPromises);
      const events = eventsResults
        .filter((r) => r.success && r.data)
        .map((r) => r.data!);

      // Combiner et trier par heure de début
      const allItems = [
        ...screenings.map((s) => ({ ...s, type: "screening" as const })),
        ...events.map((e) => ({ ...e, type: "event" as const })),
      ].sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );

      // Vérifier les chevauchements et temps de trajet
      for (let i = 0; i < allItems.length - 1; i++) {
        const current = allItems[i];
        const next = allItems[i + 1];

        const currentEnd = new Date(current.endTime);
        const nextStart = new Date(next.startTime);

        // Vérifier chevauchement temporel
        if (currentEnd > nextStart) {
          conflicts.push({
            type: "time_overlap",
            items: [current.id, next.id],
            message: `Conflit horaire entre deux événements`,
            severity: "error",
          });
          continue;
        }

        // Vérifier temps de trajet si salles différentes
        if (current.venueId !== next.venueId) {
          const travelTime = await this.estimateTravelTime(
            current.venueId,
            next.venueId,
          );
          const availableTime =
            (nextStart.getTime() - currentEnd.getTime()) / 1000 / 60; // en minutes

          if (availableTime < travelTime) {
            conflicts.push({
              type: "travel_time",
              items: [current.id, next.id],
              message: `Temps de trajet insuffisant (${Math.round(availableTime)} min disponible, ${travelTime} min nécessaire)`,
              severity: availableTime < travelTime * 0.8 ? "error" : "warning",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error checking schedule conflicts:", error);
    }

    return conflicts;
  }

  /**
   * Estime le temps de trajet entre deux salles (en minutes)
   */
  private async estimateTravelTime(
    venueId1: string,
    venueId2: string,
  ): Promise<number> {
    // TODO: Implémenter le calcul réel avec les coordonnées GPS
    // Pour l'instant, retourne une estimation fixe
    if (venueId1 === venueId2) return 0;

    try {
      const venue1Response = await apiService.getVenueById(venueId1);
      const venue2Response = await apiService.getVenueById(venueId2);

      if (!venue1Response.success || !venue2Response.success) {
        return 15; // Valeur par défaut
      }

      const venue1 = venue1Response.data!;
      const venue2 = venue2Response.data!;

      // Calcul de distance à vol d'oiseau
      const distance = this.calculateDistance(
        venue1.coordinates.latitude,
        venue1.coordinates.longitude,
        venue2.coordinates.latitude,
        venue2.coordinates.longitude,
      );

      // Estimation: 4 km/h de marche + 5 min de marge
      return Math.ceil((distance / 4) * 60) + 5;
    } catch (error) {
      console.error("Error estimating travel time:", error);
      return 15;
    }
  }

  /**
   * Calcule la distance entre deux points GPS (formule de Haversine)
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Exporte le planning vers le calendrier natif
   * FONCTIONNALITÉ TECHNIQUE AVANCÉE #2
   */
  async exportToCalendar(schedule: Schedule): Promise<void> {
    // TODO: Implémenter avec expo-calendar
    console.log("Export to calendar:", schedule);
  }
}

export const scheduleService = new ScheduleService();
