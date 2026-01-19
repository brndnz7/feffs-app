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

// Données de démonstration
const DEMO_FILMS = [
  {
    id: "1",
    title: "Le Monstre des Abysses",
    director: "Jean Dupont",
    year: 2026,
    duration: 95,
    genre: ["Horreur", "Thriller"],
  },
  {
    id: "2",
    title: "Dimension Parallèle",
    director: "Marie Martin",
    year: 2025,
    duration: 112,
    genre: ["Science-Fiction"],
  },
  {
    id: "3",
    title: "Les Ombres du Passé",
    director: "Pierre Bernard",
    year: 2026,
    duration: 88,
    genre: ["Fantastique", "Drame"],
  },
  {
    id: "4",
    title: "Créatures de la Nuit",
    director: "Sophie Lefebvre",
    year: 2026,
    duration: 105,
    genre: ["Horreur"],
  },
];

const CATEGORIES = ["Tous", "Films", "Événements", "Masterclass"];

export default function ProgramScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFilms = DEMO_FILMS.filter(
    (film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase()),
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
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Catégorie ${category}`}
            accessibilityState={{ selected: selectedCategory === category }}
          >
            <ThemedText
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste des films */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          🎬 Films ({filteredFilms.length})
        </ThemedText>

        {filteredFilms.map((film) => (
          <TouchableOpacity
            key={film.id}
            style={[styles.filmCard, isDark && styles.cardDark]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${film.title}, réalisé par ${film.director}, ${film.year}, durée ${film.duration} minutes`}
            accessibilityHint="Appuyez pour voir les détails et les séances"
          >
            <View style={styles.filmPoster}>
              <ThemedText style={styles.posterEmoji}>🎬</ThemedText>
            </View>
            <View style={styles.filmInfo}>
              <ThemedText type="defaultSemiBold" style={styles.filmTitle}>
                {film.title}
              </ThemedText>
              <ThemedText style={styles.filmDirector}>
                {film.director} • {film.year}
              </ThemedText>
              <View style={styles.genreContainer}>
                {film.genre.map((g, index) => (
                  <View key={index} style={styles.genreBadge}>
                    <ThemedText style={styles.genreText}>{g}</ThemedText>
                  </View>
                ))}
              </View>
              <ThemedText style={styles.filmDuration}>
                ⏱️ {Math.floor(film.duration / 60)}h
                {film.duration % 60 > 0 ? `${film.duration % 60}` : ""}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Message si pas de résultats */}
      {filteredFilms.length === 0 && (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>
            {`Aucun film trouvé pour "${searchQuery}"`}
          </ThemedText>
        </ThemedView>
      )}
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
    padding: 12,
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
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#E63946",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
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
  },
  cardDark: {
    backgroundColor: "#1a1a1a",
  },
  filmPoster: {
    width: 80,
    height: 120,
    backgroundColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  posterEmoji: {
    fontSize: 32,
  },
  filmInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  filmTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  filmDirector: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  genreBadge: {
    backgroundColor: "#E6394620",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  genreText: {
    fontSize: 12,
    color: "#E63946",
    fontWeight: "600",
  },
  filmDuration: {
    fontSize: 13,
    opacity: 0.7,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    opacity: 0.6,
  },
});
