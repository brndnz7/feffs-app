import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Données de démonstration du planning
const DEMO_SCHEDULE = [
  {
    id: "1",
    filmTitle: "Le Monstre des Abysses",
    venue: "UGC Ciné Cité",
    date: "10 Sept 2026",
    time: "20:00",
    hasConflict: false,
  },
  {
    id: "2",
    filmTitle: "Dimension Parallèle",
    venue: "Star Saint-Exupéry",
    date: "11 Sept 2026",
    time: "14:30",
    hasConflict: false,
  },
  {
    id: "3",
    filmTitle: "Les Ombres du Passé",
    venue: "UGC Ciné Cité",
    date: "11 Sept 2026",
    time: "15:00",
    hasConflict: true,
  },
];

export default function ScheduleScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [schedule, setSchedule] = useState(DEMO_SCHEDULE);

  const hasConflicts = schedule.some((item) => item.hasConflict);

  const removeFromSchedule = (id: string) => {
    setSchedule((prev) => prev.filter((item) => item.id !== id));
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
          {schedule.length} séance{schedule.length > 1 ? "s" : ""} programmée
          {schedule.length > 1 ? "s" : ""}
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
            ⚠️ Attention : conflits horaires détectés dans votre planning
          </ThemedText>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.exportButton]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Exporter vers le calendrier"
          accessibilityHint="Ajoute toutes les séances à votre calendrier"
        >
          <ThemedText style={styles.actionButtonText}>
            📤 Exporter vers Calendrier
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.checkButton]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Vérifier les conflits"
        >
          <ThemedText style={styles.actionButtonText}>
            🔍 Vérifier conflits
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Liste des séances */}
      {schedule.length > 0 ? (
        <ThemedView style={styles.section}>
          {schedule.map((item) => (
            <View
              key={item.id}
              style={[
                styles.scheduleCard,
                isDark && styles.cardDark,
                item.hasConflict && styles.conflictCard,
              ]}
              accessible={true}
              accessibilityLabel={`${item.filmTitle}, le ${item.date} à ${item.time}, salle ${item.venue}${item.hasConflict ? ", conflit horaire détecté" : ""}`}
            >
              {item.hasConflict && (
                <View style={styles.conflictBadge}>
                  <ThemedText style={styles.conflictBadgeText}>
                    ⚠️ Conflit
                  </ThemedText>
                </View>
              )}

              <ThemedText type="defaultSemiBold" style={styles.filmTitle}>
                {item.filmTitle}
              </ThemedText>

              <View style={styles.scheduleDetails}>
                <ThemedText style={styles.detailText}>
                  📍 {item.venue}
                </ThemedText>
                <ThemedText style={styles.detailText}>
                  📅 {item.date}
                </ThemedText>
                <ThemedText style={styles.detailText}>
                  🕐 {item.time}
                </ThemedText>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromSchedule(item.id)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Retirer ${item.filmTitle} du planning`}
              >
                <ThemedText style={styles.removeButtonText}>
                  ❌ Retirer
                </ThemedText>
              </TouchableOpacity>
            </View>
          ))}
        </ThemedView>
      ) : (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyEmoji}>📭</ThemedText>
          <ThemedText type="subtitle">Votre planning est vide</ThemedText>
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
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
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
});
