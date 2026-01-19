import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  CATEGORY_LABELS,
  COMPETITION_LABELS,
  FILMS,
  FilmCategory,
  FilmData,
} from "@/src/data/films";

const CATEGORY_FILTERS: { key: FilmCategory | "all"; label: string; emoji: string }[] = [
  { key: "all", label: "Tous", emoji: "🎬" },
  { key: "competition", label: "Compétition", emoji: "🏆" },
  { key: "eurogenre", label: "Eurogenre", emoji: "🇪🇺" },
  { key: "crossovers", label: "Crossovers", emoji: "🎭" },
  { key: "animation", label: "Animation", emoji: "🎨" },
  { key: "retrospective", label: "Rétrospectives", emoji: "📽️" },
  { key: "short", label: "Courts", emoji: "⏱️" },
];

export default function ProgramScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedCategory, setSelectedCategory] = useState<FilmCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFilms = FILMS.filter((film) => {
    const matchesSearch =
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || film.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Séparer les films par type pour l'affichage
  const longFilms = filteredFilms.filter(
    (f) => f.category !== "short" && f.duration >= 40
  );
  const shortFilms = filteredFilms.filter(
    (f) => f.category === "short" || f.duration < 40
  );

  const navigateToFilm = (filmId: string) => {
    router.push(`/film/${filmId}` as any);
  };

  const renderFilmCard = (film: FilmData) => (
    <TouchableOpacity
      key={film.id}
      style={[styles.filmCard, isDark && styles.cardDark]}
      onPress={() => navigateToFilm(film.id)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${film.title}, réalisé par ${film.director}, ${film.year}, durée ${film.duration} minutes`}
      accessibilityHint="Appuyez pour voir les détails et les séances"
    >
      <View style={styles.filmPoster}>
        <ThemedText style={styles.posterEmoji}>🎬</ThemedText>
      </View>
      <View style={styles.filmInfo}>
        <View style={styles.filmHeader}>
          <ThemedText type="defaultSemiBold" style={styles.filmTitle} numberOfLines={2}>
            {film.title}
          </ThemedText>
          {film.isWorldPremiere && (
            <View style={styles.premiereBadge}>
              <ThemedText style={styles.premiereBadgeText}>AP</ThemedText>
            </View>
          )}
        </View>

        <ThemedText style={styles.filmDirector}>
          {film.director} • {film.country}
        </ThemedText>

        <View style={styles.genreContainer}>
          {film.genre.slice(0, 2).map((g, index) => (
            <View key={index} style={styles.genreBadge}>
              <ThemedText style={styles.genreText}>{g}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.filmMeta}>
          <ThemedText style={styles.filmDuration}>
            ⏱️ {film.duration} min
          </ThemedText>
          {film.competition !== "none" && (
            <ThemedText style={styles.competitionTag}>
              🏆 {COMPETITION_LABELS[film.competition]}
            </ThemedText>
          )}
        </View>

        <ThemedText style={styles.categoryLabel}>
          {CATEGORY_LABELS[film.category]}
        </ThemedText>
      </View>
      <ThemedText style={styles.chevron}>›</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDark && styles.searchInputDark]}
          placeholder="Rechercher un film, un réalisateur..."
          placeholderTextColor={isDark ? "#888" : "#666"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessible={true}
          accessibilityLabel="Champ de recherche"
          accessibilityHint="Entrez le nom d'un film ou d'un réalisateur"
        />
      </View>

      {/* Filtres par catégorie */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORY_FILTERS.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              selectedCategory === category.key && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.key)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Catégorie ${category.label}`}
            accessibilityState={{ selected: selectedCategory === category.key }}
          >
            <ThemedText style={styles.categoryEmoji}>{category.emoji}</ThemedText>
            <ThemedText
              style={[
                styles.categoryText,
                selectedCategory === category.key && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats */}
      <ThemedView style={styles.statsBar}>
        <ThemedText style={styles.statsText}>
          {filteredFilms.length} film{filteredFilms.length > 1 ? "s" : ""} trouvé
          {filteredFilms.length > 1 ? "s" : ""}
        </ThemedText>
      </ThemedView>

      {/* Longs métrages */}
      {longFilms.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText
            type="subtitle"
            style={styles.sectionTitle}
            accessibilityRole="header"
          >
            🎬 Longs métrages ({longFilms.length})
          </ThemedText>
          {longFilms.map(renderFilmCard)}
        </ThemedView>
      )}

      {/* Courts métrages */}
      {shortFilms.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText
            type="subtitle"
            style={styles.sectionTitle}
            accessibilityRole="header"
          >
            ⏱️ Courts métrages ({shortFilms.length})
          </ThemedText>
          {shortFilms.map(renderFilmCard)}
        </ThemedView>
      )}

      {/* Message si pas de résultats */}
      {filteredFilms.length === 0 && (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyEmoji}>🔍</ThemedText>
          <ThemedText style={styles.emptyTitle}>Aucun résultat</ThemedText>
          <ThemedText style={styles.emptyText}>
            {`Aucun film trouvé pour "${searchQuery}"`}
          </ThemedText>
          <TouchableOpacity
            onPress={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            style={styles.resetButton}
          >
            <ThemedText style={styles.resetButtonText}>
              Réinitialiser les filtres
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      {/* Bottom padding */}
      <View style={{ height: 40 }} />
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
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: "#000",
  },
  searchInputDark: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    gap: 8,
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: "#E63946",
  },
  categoryEmoji: {
    fontSize: 14,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
  },
  statsBar: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  statsText: {
    fontSize: 13,
    opacity: 0.6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  filmCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  cardDark: {
    backgroundColor: "#1a1a1a",
  },
  filmPoster: {
    width: 70,
    height: 100,
    backgroundColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  posterEmoji: {
    fontSize: 28,
  },
  filmInfo: {
    flex: 1,
    marginLeft: 12,
  },
  filmHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
  },
  filmTitle: {
    fontSize: 15,
    flex: 1,
  },
  premiereBadge: {
    backgroundColor: "#E63946",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiereBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
  filmDirector: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 6,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 6,
  },
  genreBadge: {
    backgroundColor: "#E6394620",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  genreText: {
    fontSize: 11,
    color: "#E63946",
    fontWeight: "600",
  },
  filmMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  filmDuration: {
    fontSize: 12,
    opacity: 0.7,
  },
  competitionTag: {
    fontSize: 10,
    color: "#B8860B",
    fontWeight: "500",
  },
  categoryLabel: {
    fontSize: 11,
    opacity: 0.5,
  },
  chevron: {
    fontSize: 24,
    opacity: 0.3,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    opacity: 0.6,
    marginBottom: 20,
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#E63946",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

