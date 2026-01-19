import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  EVENTS,
  EventData,
  FESTIVAL_DATES,
  getFilmById,
  getVenueById,
  SCREENINGS,
  ScreeningData,
} from "@/src/data/films";

// État local pour simuler les séances ajoutées au planning
const INITIAL_SCHEDULE = ["s1", "s3", "s5", "s10"];

export default function ScheduleScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedDate, setSelectedDate] = useState(FESTIVAL_DATES.days[0]);
  const [mySchedule, setMySchedule] = useState<string[]>(INITIAL_SCHEDULE);

  // Récupérer les séances du planning pour la date sélectionnée
  const scheduleForDate = SCREENINGS.filter(
    (s) => mySchedule.includes(s.id) && s.date === selectedDate
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Récupérer les événements pour la date sélectionnée
  const eventsForDate = EVENTS.filter((e) => e.date === selectedDate).sort(
    (a, b) => a.startTime.localeCompare(b.startTime)
  );

  // Détecter les conflits
  const detectConflicts = (screenings: ScreeningData[]): string[] => {
    const conflicts: string[] = [];
    for (let i = 0; i < screenings.length; i++) {
      for (let j = i + 1; j < screenings.length; j++) {
        const a = screenings[i];
        const b = screenings[j];
        // Conflit si les horaires se chevauchent
        if (a.startTime < b.endTime && b.startTime < a.endTime) {
          if (!conflicts.includes(a.id)) conflicts.push(a.id);
          if (!conflicts.includes(b.id)) conflicts.push(b.id);
        }
      }
    }
    return conflicts;
  };

  const allMyScreenings = SCREENINGS.filter((s) => mySchedule.includes(s.id));
  const conflictIds = detectConflicts(allMyScreenings);
  const hasConflicts = conflictIds.length > 0;

  const removeFromSchedule = (id: string) => {
    setMySchedule((prev) => prev.filter((s) => s !== id));
    Alert.alert("Retiré", "Séance retirée de votre planning");
  };

  const exportToCalendar = () => {
    Alert.alert(
      "Export Calendrier",
      `${mySchedule.length} séance(s) seraient exportées vers votre calendrier.`,
      [{ text: "OK" }]
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  const formatDateLong = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      {/* En-tête */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" accessibilityRole="header">
          📅 Mon Planning
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {mySchedule.length} séance{mySchedule.length > 1 ? "s" : ""} programmée
          {mySchedule.length > 1 ? "s" : ""}
        </ThemedText>
      </ThemedView>

      {/* Alerte conflits */}
      {hasConflicts && (
        <View
          style={styles.conflictAlert}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLabel="Attention, il y a des conflits dans votre planning"
        >
          <ThemedText style={styles.conflictAlertText}>
            ⚠️ Attention : {conflictIds.length} conflit(s) horaire(s) détecté(s)
          </ThemedText>
        </View>
      )}

      {/* Sélecteur de date */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateSelector}
        contentContainerStyle={styles.dateSelectorContent}
      >
        {FESTIVAL_DATES.days.map((date) => {
          const hasEventsOnDate =
            SCREENINGS.some((s) => mySchedule.includes(s.id) && s.date === date) ||
            EVENTS.some((e) => e.date === date);
          return (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                selectedDate === date && styles.dateButtonActive,
              ]}
              onPress={() => setSelectedDate(date)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Voir le ${formatDateLong(date)}`}
              accessibilityState={{ selected: selectedDate === date }}
            >
              <ThemedText
                style={[
                  styles.dateDayText,
                  selectedDate === date && styles.dateTextActive,
                ]}
              >
                {formatDate(date).split(" ")[0]}
              </ThemedText>
              <ThemedText
                style={[
                  styles.dateNumText,
                  selectedDate === date && styles.dateTextActive,
                ]}
              >
                {new Date(date).getDate()}
              </ThemedText>
              {hasEventsOnDate && <View style={styles.dateDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.exportButton]}
          onPress={exportToCalendar}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Exporter vers le calendrier"
          accessibilityHint="Ajoute toutes les séances à votre calendrier"
        >
          <ThemedText style={styles.actionButtonText}>
            📤 Exporter
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.checkButton]}
          onPress={() =>
            Alert.alert(
              "Vérification",
              hasConflicts
                ? `${conflictIds.length} conflit(s) détecté(s)`
                : "Aucun conflit dans votre planning !"
            )
          }
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Vérifier les conflits"
        >
          <ThemedText style={styles.actionButtonText}>
            🔍 Conflits
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Date sélectionnée */}
      <ThemedText type="subtitle" style={styles.selectedDateTitle}>
        {formatDateLong(selectedDate)}
      </ThemedText>

      {/* Mes séances pour cette date */}
      {scheduleForDate.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🎬 Mes séances ({scheduleForDate.length})
          </ThemedText>

          {scheduleForDate.map((screening) => {
            const film = getFilmById(screening.filmId);
            const venue = getVenueById(screening.venueId);
            const isConflict = conflictIds.includes(screening.id);

            return (
              <TouchableOpacity
                key={screening.id}
                style={[
                  styles.scheduleCard,
                  isDark && styles.cardDark,
                  isConflict && styles.conflictCard,
                ]}
                onPress={() => router.push(`/film/${screening.filmId}` as any)}
                accessible={true}
                accessibilityLabel={`${film?.title}, à ${screening.startTime}, ${venue?.name}${isConflict ? ", conflit horaire" : ""}`}
              >
                {isConflict && (
                  <View style={styles.conflictBadge}>
                    <ThemedText style={styles.conflictBadgeText}>⚠️ Conflit</ThemedText>
                  </View>
                )}

                <View style={styles.scheduleTime}>
                  <ThemedText style={styles.timeText}>{screening.startTime}</ThemedText>
                  <ThemedText style={styles.timeSeparator}>-</ThemedText>
                  <ThemedText style={styles.timeText}>{screening.endTime}</ThemedText>
                </View>

                <View style={styles.scheduleInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.filmTitle}>
                    {film?.title || "Film inconnu"}
                  </ThemedText>
                  <ThemedText style={styles.venueText}>
                    📍 {venue?.shortName || venue?.name || "Lieu inconnu"}
                  </ThemedText>
                  {screening.guestPresence && screening.guestPresence.length > 0 && (
                    <ThemedText style={styles.guestText}>
                      👤 {screening.guestPresence.join(", ")}
                    </ThemedText>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    removeFromSchedule(screening.id);
                  }}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Retirer du planning"
                >
                  <ThemedText style={styles.removeBtnText}>✕</ThemedText>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      )}

      {/* Événements du jour */}
      {eventsForDate.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            🎭 Événements du jour ({eventsForDate.length})
          </ThemedText>

          {eventsForDate.map((event) => {
            const venue = getVenueById(event.venueId);
            return (
              <View
                key={event.id}
                style={[styles.eventCard, isDark && styles.cardDark]}
              >
                <View style={styles.eventTime}>
                  <ThemedText style={styles.timeText}>{event.startTime}</ThemedText>
                </View>
                <View style={styles.eventInfo}>
                  <View style={styles.eventHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.eventTitle}>
                      {event.title}
                    </ThemedText>
                    {event.isFree && (
                      <View style={styles.freeBadge}>
                        <ThemedText style={styles.freeBadgeText}>Gratuit</ThemedText>
                      </View>
                    )}
                  </View>
                  <ThemedText style={styles.eventType}>
                    {event.type === "masterclass" && "🎓 Masterclass"}
                    {event.type === "ceremony" && "🏆 Cérémonie"}
                    {event.type === "debate" && "💬 Débat"}
                    {event.type === "vr" && "🥽 Réalité Virtuelle"}
                    {event.type === "gaming" && "🎮 Jeux Vidéo"}
                    {event.type === "zombiewalk" && "🧟 Zombie Walk"}
                    {event.type === "concert" && "🎵 Concert"}
                    {event.type === "exhibition" && "🖼️ Exposition"}
                    {event.type === "other" && "📌 Événement"}
                  </ThemedText>
                  <ThemedText style={styles.venueText}>
                    📍 {venue?.shortName || venue?.name || "Lieu inconnu"}
                  </ThemedText>
                  <ThemedText style={styles.eventDescription} numberOfLines={2}>
                    {event.description}
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </ThemedView>
      )}

      {/* Message si rien ce jour */}
      {scheduleForDate.length === 0 && eventsForDate.length === 0 && (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyEmoji}>📭</ThemedText>
          <ThemedText type="subtitle">Rien de prévu ce jour</ThemedText>
          <ThemedText style={styles.emptyText}>
            {"Ajoutez des séances depuis l'onglet Programme"}
          </ThemedText>
        </ThemedView>
      )}

      {/* Légende */}
      <ThemedView style={styles.legend}>
        <ThemedText type="defaultSemiBold" style={styles.legendTitle}>
          Légende
        </ThemedText>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#E63946" }]} />
          <ThemedText style={styles.legendText}>Conflit horaire</ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#2A9D8F" }]} />
          <ThemedText style={styles.legendText}>Séance confirmée</ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerDark: {
    backgroundColor: "#000",
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  conflictAlert: {
    backgroundColor: "#E6394620",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#E63946",
    marginBottom: 16,
  },
  conflictAlertText: {
    color: "#E63946",
    fontWeight: "600",
  },
  // Date selector
  dateSelector: {
    marginBottom: 16,
  },
  dateSelectorContent: {
    gap: 8,
    paddingRight: 16,
  },
  dateButton: {
    width: 60,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginRight: 8,
  },
  dateButtonActive: {
    backgroundColor: "#E63946",
  },
  dateDayText: {
    fontSize: 11,
    textTransform: "uppercase",
    opacity: 0.7,
  },
  dateNumText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  dateTextActive: {
    color: "#fff",
  },
  dateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2A9D8F",
    marginTop: 4,
  },
  selectedDateTitle: {
    marginBottom: 16,
    textTransform: "capitalize",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  exportButton: {
    backgroundColor: "#457B9D",
  },
  checkButton: {
    backgroundColor: "#2A9D8F",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  section: {
    marginBottom: 24,
  },
  scheduleCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2A9D8F",
  },
  cardDark: {
    backgroundColor: "#1a1a1a",
  },
  conflictCard: {
    borderLeftColor: "#E63946",
    backgroundColor: "#E6394610",
  },
  conflictBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#E63946",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  conflictBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  filmTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  scheduleDetails: {
    gap: 4,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    opacity: 0.8,
  },
  removeButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#E6394620",
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#E63946",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    opacity: 0.6,
    marginTop: 8,
    textAlign: "center",
  },
  legend: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
  },
  legendTitle: {
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    opacity: 0.8,
  },
  // Section titles
  sectionTitle: {
    marginBottom: 12,
  },
  // Schedule card with time
  scheduleTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E63946",
  },
  timeSeparator: {
    marginHorizontal: 4,
    opacity: 0.5,
  },
  scheduleInfo: {
    flex: 1,
  },
  venueText: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 4,
  },
  guestText: {
    fontSize: 12,
    color: "#1D3557",
    marginTop: 4,
  },
  removeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E6394620",
    justifyContent: "center",
    alignItems: "center",
  },
  removeBtnText: {
    color: "#E63946",
    fontSize: 14,
    fontWeight: "bold",
  },
  // Events
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#457B9D",
  },
  eventTime: {
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 15,
    flex: 1,
  },
  eventType: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 6,
    lineHeight: 18,
  },
  freeBadge: {
    backgroundColor: "#2A9D8F",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  freeBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
