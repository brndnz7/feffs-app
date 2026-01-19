/**
 * Exemple de composant FilmCard
 * PÔLE: UX/UI & ACCESSIBILITÉ
 *
 * Affiche une carte de film avec accessibilité complète
 */

import React from "react";
import {
    Image,
    ImageStyle,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Film } from "../types";
import { getImageA11yProps } from "../utils/accessibility";
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "../utils/constants";
import { formatDuration } from "../utils/date";

interface FilmCardProps {
  film: Film;
  onPress: () => void;
}

export function FilmCard({ film, onPress }: FilmCardProps) {
  const { isDark } = useTheme();

  const accessibilityLabel = `${film.title}, réalisé par ${film.director}, ${film.year}, durée ${formatDuration(film.duration)}. ${film.genre.join(", ")}.`;

  return (
    <TouchableOpacity
      style={[styles.container, isDark && styles.containerDark]}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityHint="Appuyez pour voir les détails du film"
    >
      {film.posterUrl ? (
        <Image
          source={{ uri: film.posterUrl }}
          style={styles.poster}
          {...getImageA11yProps(`Affiche du film ${film.title}`)}
        />
      ) : (
        <View style={[styles.poster, styles.placeholderPoster]}>
          <Text style={styles.placeholderText}>{"Pas d'affiche"}</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text
          style={[styles.title, isDark && styles.titleDark]}
          numberOfLines={2}
          accessibilityRole="header"
        >
          {film.title}
        </Text>

        <Text style={[styles.info, isDark && styles.infoDark]}>
          {film.director} • {film.year}
        </Text>

        <View style={styles.genreContainer}>
          {film.genre.slice(0, 2).map((genre, index) => (
            <View
              key={index}
              style={[styles.genreBadge, isDark && styles.genreBadgeDark]}
            >
              <Text style={[styles.genreText, isDark && styles.genreTextDark]}>
                {genre}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.duration, isDark && styles.durationDark]}>
          ⏱️ {formatDuration(film.duration)}
        </Text>

        {film.rating && (
          <View style={styles.rating}>
            <Text style={styles.ratingText}>
              ⭐ {film.rating.toFixed(1)}/10
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerDark: {
    backgroundColor: COLORS.background.dark,
    borderWidth: 1,
    borderColor: "#333",
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: "#EEE",
  } as ImageStyle,
  placeholderPoster: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDD",
  },
  placeholderText: {
    color: "#999",
    fontSize: FONT_SIZES.xs,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: "space-between",
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    color: COLORS.text.primary.light,
    marginBottom: SPACING.xs,
  },
  titleDark: {
    color: COLORS.text.primary.dark,
  },
  info: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary.light,
    marginBottom: SPACING.xs,
  },
  infoDark: {
    color: COLORS.text.secondary.dark,
  },
  genreContainer: {
    flexDirection: "row",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  genreBadge: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  genreBadgeDark: {
    backgroundColor: COLORS.primary + "40",
  },
  genreText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: "600",
  },
  genreTextDark: {
    color: COLORS.accent,
  },
  duration: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary.light,
  },
  durationDark: {
    color: COLORS.text.secondary.dark,
  },
  rating: {
    marginTop: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.accent,
  },
});

// Exemple d'utilisation :
// import { FilmCard } from '@/components/FilmCard';
//
// <FilmCard
//   film={film}
//   onPress={() => navigation.navigate('FilmDetails', { filmId: film.id })}
// />
