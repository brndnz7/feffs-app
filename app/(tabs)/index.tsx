import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      {/* Header Festival */}
      <ThemedView style={styles.header}>
        <ThemedText
          type="title"
          style={styles.festivalTitle}
          accessibilityRole="header"
        >
          🎬 FEFFS 2026
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Festival Européen du Film Fantastique de Strasbourg
        </ThemedText>
        <ThemedText style={styles.dates}>10 - 20 Septembre 2026</ThemedText>
      </ThemedView>

      {/* La Quotidienne */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          📅 La Quotidienne
        </ThemedText>
        <ThemedView style={[styles.card, isDark && styles.cardDark]}>
          <ThemedText type="defaultSemiBold">Dimanche 19 Janvier</ThemedText>
          <ThemedText style={styles.cardText}>
            Bienvenue sur l'application officielle du FEFFS ! Découvrez le
            programme, créez votre planning personnalisé et accédez à votre pass
            festivalier.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Actualités */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          📢 Actualités
        </ThemedText>

        <TouchableOpacity
          style={[styles.newsCard, isDark && styles.cardDark]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Article: La programmation 2026 bientôt dévoilée"
          accessibilityHint="Appuyez pour lire l'article complet"
        >
          <ThemedText type="defaultSemiBold">🎉 Programmation 2026</ThemedText>
          <ThemedText style={styles.cardText}>
            La programmation complète sera dévoilée prochainement. Restez
            connectés !
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.newsCard, isDark && styles.cardDark]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Article: Les pass sont disponibles"
          accessibilityHint="Appuyez pour lire l'article complet"
        >
          <ThemedText type="defaultSemiBold">🎟️ Pass en vente</ThemedText>
          <ThemedText style={styles.cardText}>
            Les pass festivaliers sont maintenant disponibles à l'achat
            directement dans l'application.
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Raccourcis */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          🚀 Accès rapide
        </ThemedText>
        <View style={styles.shortcuts}>
          <TouchableOpacity
            style={[styles.shortcutButton, { backgroundColor: "#E63946" }]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Voir le programme"
          >
            <ThemedText style={styles.shortcutText}>🎬 Programme</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shortcutButton, { backgroundColor: "#457B9D" }]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Mon planning"
          >
            <ThemedText style={styles.shortcutText}>📅 Planning</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.shortcutButton, { backgroundColor: "#2A9D8F" }]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Mon pass"
          >
            <ThemedText style={styles.shortcutText}>🎟️ Pass</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          © FEFFS 2026 - Tous droits réservés
        </ThemedText>
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
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 16,
  },
  festivalTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E63946",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    opacity: 0.8,
  },
  dates: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
  },
  cardDark: {
    backgroundColor: "#1a1a1a",
  },
  cardText: {
    marginTop: 8,
    lineHeight: 22,
  },
  newsCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  shortcuts: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  shortcutButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  shortcutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
  },
});
