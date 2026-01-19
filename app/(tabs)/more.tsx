import { useState } from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function MoreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyDigestEnabled, setDailyDigestEnabled] = useState(true);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      {/* Section Paramètres */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          ⚙️ Paramètres
        </ThemedText>

        <View style={[styles.settingCard, isDark && styles.cardDark]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <ThemedText type="defaultSemiBold">Notifications</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Recevoir les alertes du festival
              </ThemedText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#E63946" }}
              thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
              accessible={true}
              accessibilityLabel="Activer les notifications"
              accessibilityRole="switch"
              accessibilityState={{ checked: notificationsEnabled }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <ThemedText type="defaultSemiBold">La Quotidienne</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Résumé quotidien du programme
              </ThemedText>
            </View>
            <Switch
              value={dailyDigestEnabled}
              onValueChange={setDailyDigestEnabled}
              trackColor={{ false: "#767577", true: "#E63946" }}
              thumbColor={dailyDigestEnabled ? "#fff" : "#f4f3f4"}
              accessible={true}
              accessibilityLabel="Activer la quotidienne"
              accessibilityRole="switch"
              accessibilityState={{ checked: dailyDigestEnabled }}
            />
          </View>
        </View>
      </ThemedView>

      {/* Section Accessibilité */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          ♿ Accessibilité
        </ThemedText>

        <TouchableOpacity
          style={[styles.menuItem, isDark && styles.cardDark]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Paramètres d'accessibilité"
          accessibilityHint="Ouvre les options d'accessibilité"
        >
          <ThemedText>{"🔤 Paramètres d'accessibilité"}</ThemedText>
          <ThemedText style={styles.menuArrow}>→</ThemedText>
        </TouchableOpacity>

        <View style={[styles.infoBox, isDark && styles.cardDark]}>
          <ThemedText style={styles.infoText}>
            {"Cette application est compatible avec les lecteurs d'écran (TalkBack sur Android, VoiceOver sur iOS)."}
          </ThemedText>
        </View>
      </ThemedView>

      {/* Section Liens */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          🔗 Liens utiles
        </ThemedText>

        <TouchableOpacity
          style={[styles.menuItem, isDark && styles.cardDark]}
          onPress={() => openLink("https://feffs.eu")}
          accessible={true}
          accessibilityRole="link"
          accessibilityLabel="Site officiel du FEFFS"
        >
          <ThemedText>🌐 Site officiel</ThemedText>
          <ThemedText style={styles.menuArrow}>↗</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, isDark && styles.cardDark]}
          onPress={() => openLink("https://feffs.eu/infos-pratiques")}
          accessible={true}
          accessibilityRole="link"
          accessibilityLabel="Informations pratiques"
        >
          <ThemedText>📍 Infos pratiques</ThemedText>
          <ThemedText style={styles.menuArrow}>↗</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, isDark && styles.cardDark]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Scanner un QR Code d'enquête"
        >
          <ThemedText>📝 Scanner une enquête</ThemedText>
          <ThemedText style={styles.menuArrow}>→</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Section À propos */}
      <ThemedView style={styles.section}>
        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          ℹ️ À propos
        </ThemedText>

        <View style={[styles.aboutCard, isDark && styles.cardDark]}>
          <ThemedText style={styles.aboutTitle}>FEFFS App</ThemedText>
          <ThemedText style={styles.aboutVersion}>Version 1.0.0</ThemedText>
          <ThemedText style={styles.aboutDescription}>
            Application officielle du Festival Européen du Film Fantastique de
            Strasbourg.
          </ThemedText>
          <ThemedText style={styles.aboutCredits}>
            Développé dans le cadre du projet DI5 2026
          </ThemedText>
        </View>
      </ThemedView>

      {/* Actions */}
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={[styles.dangerButton]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Effacer les données locales"
        >
          <ThemedText style={styles.dangerButtonText}>
            🗑️ Effacer les données locales
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          © FEFFS 2026 - Tous droits réservés
        </ThemedText>
        <ThemedText style={styles.footerText}>
          Fait avec ❤️ à Strasbourg
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  settingCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
  },
  cardDark: {
    backgroundColor: "#1a1a1a",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingDescription: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuArrow: {
    fontSize: 18,
    opacity: 0.5,
  },
  infoBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
  aboutCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 12,
  },
  aboutDescription: {
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 12,
  },
  aboutCredits: {
    fontSize: 12,
    opacity: 0.5,
    fontStyle: "italic",
  },
  dangerButton: {
    backgroundColor: "#E6394615",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E63946",
  },
  dangerButtonText: {
    color: "#E63946",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 4,
  },
});
