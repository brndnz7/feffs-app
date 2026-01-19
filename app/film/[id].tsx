import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  CATEGORY_LABELS,
  COMPETITION_LABELS,
  getFilmById,
  getScreeningsForFilm,
  getVenueById,
} from "../../src/data/films";

export default function FilmDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const film = getFilmById(id);
  const screenings = film ? getScreeningsForFilm(film.id) : [];

  const [addedToSchedule, setAddedToSchedule] = useState<string[]>([]);

  if (!film) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: "Film non trouvé" }} />
        <ThemedText>{"Ce film n'existe pas."}</ThemedText>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={styles.backLink}>← Retour</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const handleAddToSchedule = (screeningId: string) => {
    if (addedToSchedule.includes(screeningId)) {
      setAddedToSchedule(addedToSchedule.filter((s) => s !== screeningId));
      Alert.alert("Retiré", "Séance retirée de votre planning");
    } else {
      setAddedToSchedule([...addedToSchedule, screeningId]);
      Alert.alert("Ajouté !", "Séance ajoutée à votre planning");
    }
  };

  const openTrailer = () => {
    if (film.trailerUrl) {
      Linking.openURL(film.trailerUrl);
    }
  };

  const formatDate = (dateStr: string) => {
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
      <Stack.Screen
        options={{
          title: film.title,
          headerBackTitle: "Retour",
        }}
      />

      {/* Poster / Header */}
      <View style={[styles.posterContainer, isDark && styles.posterDark]}>
        <View style={styles.posterPlaceholder}>
          <ThemedText style={styles.posterEmoji}>🎬</ThemedText>
        </View>
        {film.isWorldPremiere && (
          <View style={styles.premiereBadge}>
            <ThemedText style={styles.premiereBadgeText}>
              AVANT-PREMIÈRE MONDIALE
            </ThemedText>
          </View>
        )}
        {film.isFrenchPremiere && !film.isWorldPremiere && (
          <View style={[styles.premiereBadge, styles.frenchPremiereBadge]}>
            <ThemedText style={styles.premiereBadgeText}>
              AVANT-PREMIÈRE FRANCE
            </ThemedText>
          </View>
        )}
      </View>

      {/* Titre et infos principales */}
      <ThemedView style={styles.headerInfo}>
        <ThemedText type="title" style={styles.title}>
          {film.title}
        </ThemedText>
        {film.originalTitle && film.originalTitle !== film.title && (
          <ThemedText style={styles.originalTitle}>
            {film.originalTitle}
          </ThemedText>
        )}

        <ThemedText style={styles.director}>
          Réalisé par {film.director}
        </ThemedText>

        <View style={styles.metaRow}>
          <ThemedText style={styles.metaText}>{film.country}</ThemedText>
          <ThemedText style={styles.metaDot}>•</ThemedText>
          <ThemedText style={styles.metaText}>{film.year}</ThemedText>
          <ThemedText style={styles.metaDot}>•</ThemedText>
          <ThemedText style={styles.metaText}>{film.duration} min</ThemedText>
          {film.rating && (
            <>
              <ThemedText style={styles.metaDot}>•</ThemedText>
              <View style={styles.ratingBadge}>
                <ThemedText style={styles.ratingText}>{film.rating}</ThemedText>
              </View>
            </>
          )}
        </View>

        {/* Genres */}
        <View style={styles.genreContainer}>
          {film.genre.map((g, index) => (
            <View key={index} style={styles.genreBadge}>
              <ThemedText style={styles.genreText}>{g}</ThemedText>
            </View>
          ))}
        </View>

        {/* Compétition / Catégorie */}
        {film.competition !== "none" && (
          <View style={styles.competitionBadge}>
            <ThemedText style={styles.competitionText}>
              🏆 {COMPETITION_LABELS[film.competition]}
            </ThemedText>
          </View>
        )}
        <ThemedText style={styles.categoryText}>
          {CATEGORY_LABELS[film.category]}
        </ThemedText>
      </ThemedView>

      {/* Actions */}
      <View style={styles.actionsRow}>
        {film.trailerUrl && (
          <TouchableOpacity
            style={[styles.actionButton, styles.trailerButton]}
            onPress={openTrailer}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Voir la bande-annonce"
          >
            <ThemedText style={styles.actionButtonText}>
              ▶️ Bande-annonce
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Synopsis */}
      <ThemedView style={[styles.section, isDark && styles.sectionDark]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Synopsis
        </ThemedText>
        <ThemedText style={styles.synopsis}>{film.synopsis}</ThemedText>
      </ThemedView>

      {/* Casting */}
      {film.cast && film.cast.length > 0 && (
        <ThemedView style={[styles.section, isDark && styles.sectionDark]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Avec
          </ThemedText>
          <ThemedText style={styles.castText}>{film.cast.join(", ")}</ThemedText>
        </ThemedView>
      )}

      {/* Infos techniques */}
      <ThemedView style={[styles.section, isDark && styles.sectionDark]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Informations techniques
        </ThemedText>
        <View style={styles.techInfo}>
          <View style={styles.techRow}>
            <ThemedText style={styles.techLabel}>Langue :</ThemedText>
            <ThemedText style={styles.techValue}>{film.language}</ThemedText>
          </View>
          {film.subtitles && (
            <View style={styles.techRow}>
              <ThemedText style={styles.techLabel}>Sous-titres :</ThemedText>
              <ThemedText style={styles.techValue}>{film.subtitles}</ThemedText>
            </View>
          )}
          <View style={styles.techRow}>
            <ThemedText style={styles.techLabel}>Durée :</ThemedText>
            <ThemedText style={styles.techValue}>
              {Math.floor(film.duration / 60)}h
              {film.duration % 60 > 0
                ? ` ${String(film.duration % 60).padStart(2, "0")}min`
                : ""}
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Séances */}
      <ThemedView style={[styles.section, isDark && styles.sectionDark]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          📅 Séances ({screenings.length})
        </ThemedText>

        {screenings.length === 0 ? (
          <ThemedText style={styles.noScreenings}>
            Aucune séance programmée pour le moment.
          </ThemedText>
        ) : (
          screenings.map((screening) => {
            const venue = getVenueById(screening.venueId);
            const isAdded = addedToSchedule.includes(screening.id);

            return (
              <View
                key={screening.id}
                style={[styles.screeningCard, isDark && styles.cardDark]}
              >
                <View style={styles.screeningInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.screeningDate}>
                    {formatDate(screening.date)}
                  </ThemedText>
                  <ThemedText style={styles.screeningTime}>
                    {screening.startTime} - {screening.endTime}
                  </ThemedText>
                  <ThemedText style={styles.screeningVenue}>
                    📍 {venue?.name || "Lieu inconnu"}
                  </ThemedText>
                  {screening.guestPresence && screening.guestPresence.length > 0 && (
                    <ThemedText style={styles.guestPresence}>
                      👤 En présence de : {screening.guestPresence.join(", ")}
                    </ThemedText>
                  )}
                  {screening.isSpecialEvent && (
                    <View style={styles.specialBadge}>
                      <ThemedText style={styles.specialBadgeText}>
                        ⭐ Événement spécial
                      </ThemedText>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    isAdded && styles.addButtonActive,
                  ]}
                  onPress={() => handleAddToSchedule(screening.id)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={
                    isAdded
                      ? "Retirer du planning"
                      : "Ajouter au planning"
                  }
                >
                  <ThemedText
                    style={[
                      styles.addButtonText,
                      isAdded && styles.addButtonTextActive,
                    ]}
                  >
                    {isAdded ? "✓" : "+"}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ThemedView>

      {/* Espace en bas */}
      <View style={styles.bottomSpacer} />
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
    paddingBottom: 40,
  },
  posterContainer: {
    height: 280,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  posterDark: {
    backgroundColor: "#0a0a15",
  },
  posterPlaceholder: {
    width: 150,
    height: 220,
    backgroundColor: "#2a2a4e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  posterEmoji: {
    fontSize: 64,
  },
  premiereBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#E63946",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  frenchPremiereBadge: {
    backgroundColor: "#1D3557",
  },
  premiereBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  headerInfo: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  originalTitle: {
    fontSize: 16,
    fontStyle: "italic",
    opacity: 0.7,
    marginBottom: 8,
  },
  director: {
    fontSize: 16,
    marginBottom: 12,
    opacity: 0.8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  metaText: {
    fontSize: 14,
    opacity: 0.7,
  },
  metaDot: {
    marginHorizontal: 8,
    opacity: 0.5,
  },
  ratingBadge: {
    backgroundColor: "#E63946",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  genreBadge: {
    backgroundColor: "#E6394620",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  genreText: {
    fontSize: 13,
    color: "#E63946",
    fontWeight: "600",
  },
  competitionBadge: {
    backgroundColor: "#FFD60A20",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  competitionText: {
    fontSize: 14,
    color: "#B8860B",
    fontWeight: "600",
  },
  categoryText: {
    fontSize: 13,
    opacity: 0.6,
  },
  actionsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  trailerButton: {
    backgroundColor: "#E63946",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  sectionDark: {
    backgroundColor: "#111",
  },
  sectionTitle: {
    marginBottom: 12,
  },
  synopsis: {
    fontSize: 15,
    lineHeight: 24,
  },
  castText: {
    fontSize: 15,
    lineHeight: 22,
  },
  techInfo: {
    gap: 8,
  },
  techRow: {
    flexDirection: "row",
  },
  techLabel: {
    fontSize: 14,
    opacity: 0.7,
    width: 100,
  },
  techValue: {
    fontSize: 14,
    flex: 1,
  },
  noScreenings: {
    opacity: 0.6,
    fontStyle: "italic",
  },
  screeningCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardDark: {
    backgroundColor: "#1a1a1a",
    borderColor: "#333",
  },
  screeningInfo: {
    flex: 1,
  },
  screeningDate: {
    fontSize: 15,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  screeningTime: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E63946",
    marginBottom: 4,
  },
  screeningVenue: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  guestPresence: {
    fontSize: 13,
    color: "#1D3557",
    marginTop: 4,
  },
  specialBadge: {
    marginTop: 6,
  },
  specialBadgeText: {
    fontSize: 12,
    color: "#B8860B",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E6394620",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E63946",
  },
  addButtonActive: {
    backgroundColor: "#E63946",
  },
  addButtonText: {
    fontSize: 24,
    color: "#E63946",
    fontWeight: "bold",
  },
  addButtonTextActive: {
    color: "#fff",
  },
  bottomSpacer: {
    height: 40,
  },
  backLink: {
    color: "#E63946",
    marginTop: 20,
    fontSize: 16,
  },
});
