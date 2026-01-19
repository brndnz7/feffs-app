import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

type PassType = "full" | "weekend" | "day" | "student";

// Données de démonstration d'un pass
const DEMO_PASS: {
  id: string;
  type: PassType;
  typeName: string;
  firstName: string;
  lastName: string;
  validFrom: string;
  validUntil: string;
  photo: string | null;
  qrCode: string;
} = {
  id: "FEFFS-2026-001234",
  type: "full",
  typeName: "Pass Intégral",
  firstName: "Jean",
  lastName: "Dupont",
  validFrom: "10 Sept 2026",
  validUntil: "20 Sept 2026",
  photo: null,
  qrCode: "FEFFS2026-001234-JEAN-DUPONT",
};

const PASS_TYPES: {
  type: PassType;
  name: string;
  price: number;
  description: string;
}[] = [
  {
    type: "full",
    name: "Pass Intégral",
    price: 120,
    description: "Accès illimité pendant tout le festival",
  },
  {
    type: "weekend",
    name: "Pass Week-end",
    price: 60,
    description: "Accès le samedi et dimanche",
  },
  {
    type: "day",
    name: "Pass Journée",
    price: 25,
    description: "Accès pour une journée au choix",
  },
  {
    type: "student",
    name: "Pass Étudiant",
    price: 80,
    description: "Pass intégral tarif réduit (sur justificatif)",
  },
];

export default function PassScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [hasPass, setHasPass] = useState(false);
  const [pass, setPass] = useState(DEMO_PASS);

  // Simuler l'achat d'un pass
  const purchasePass = (type: PassType) => {
    const passType = PASS_TYPES.find((p) => p.type === type);
    setPass({
      ...DEMO_PASS,
      type,
      typeName: passType?.name || "Pass",
    });
    setHasPass(true);
  };

  if (hasPass) {
    return (
      <ScrollView
        style={[styles.container, isDark && styles.containerDark]}
        contentContainerStyle={styles.content}
      >
        {/* Pass Card */}
        <View
          style={styles.passCard}
          accessible={true}
          accessibilityLabel={`Pass ${pass.typeName} pour ${pass.firstName} ${pass.lastName}, valide du ${pass.validFrom} au ${pass.validUntil}`}
        >
          <View style={styles.passHeader}>
            <ThemedText style={styles.passLogo}>🎬 FEFFS 2026</ThemedText>
            <ThemedText style={styles.passType}>{pass.typeName}</ThemedText>
          </View>

          <View style={styles.passBody}>
            {/* Photo */}
            <View style={styles.photoContainer}>
              {pass.photo ? (
                <Image source={{ uri: pass.photo }} style={styles.photo} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <ThemedText style={styles.photoPlaceholderText}>
                    📷
                  </ThemedText>
                </View>
              )}
              <TouchableOpacity
                style={styles.photoButton}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Ajouter ou modifier la photo"
              >
                <ThemedText style={styles.photoButtonText}>
                  📸 Modifier
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Infos */}
            <View style={styles.passInfo}>
              <ThemedText style={styles.passName}>
                {pass.firstName} {pass.lastName}
              </ThemedText>
              <ThemedText style={styles.passId}>N° {pass.id}</ThemedText>
              <ThemedText style={styles.passValidity}>
                Valide du {pass.validFrom} au {pass.validUntil}
              </ThemedText>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrCode}>
              <ThemedText style={styles.qrPlaceholder}>📱</ThemedText>
              <ThemedText style={styles.qrText}>QR Code</ThemedText>
            </View>
            <ThemedText style={styles.qrHint}>
              {"Présentez ce code à l'entrée des salles"}
            </ThemedText>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.passActions}>
          <TouchableOpacity
            style={styles.passActionButton}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Afficher le QR Code en plein écran"
          >
            <ThemedText style={styles.passActionText}>
              🔍 QR Code plein écran
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Bouton pour retourner à l'achat (démo) */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setHasPass(false)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Retour à l'écran d'achat (démo)"
        >
          <ThemedText style={styles.resetButtonText}>
            {"🔄 Retour à l'achat (démo)"}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.content}
    >
      {/* En-tête */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" accessibilityRole="header">
          🎟️ Acheter un Pass
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Choisissez le pass qui vous convient
        </ThemedText>
      </ThemedView>

      {/* Liste des pass */}
      <ThemedView style={styles.section}>
        {PASS_TYPES.map((passType) => (
          <TouchableOpacity
            key={passType.type}
            style={[styles.passTypeCard, isDark && styles.cardDark]}
            onPress={() => purchasePass(passType.type)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${passType.name}, ${passType.price} euros, ${passType.description}`}
            accessibilityHint="Appuyez pour acheter ce pass"
          >
            <View style={styles.passTypeHeader}>
              <ThemedText type="defaultSemiBold" style={styles.passTypeName}>
                {passType.name}
              </ThemedText>
              <ThemedText style={styles.passTypePrice}>
                {passType.price}€
              </ThemedText>
            </View>
            <ThemedText style={styles.passTypeDescription}>
              {passType.description}
            </ThemedText>
            <View style={styles.buyButton}>
              <ThemedText style={styles.buyButtonText}>Acheter →</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Infos */}
      <ThemedView style={[styles.infoCard, isDark && styles.cardDark]}>
        <ThemedText type="defaultSemiBold">ℹ️ Informations</ThemedText>
        <ThemedText style={styles.infoText}>
          {"• Le pass est nominatif et non cessible\n• Une photo est requise pour la génération du QR Code\n• Le pass donne accès à toutes les projections (selon le type)\n• Présentez votre QR Code à l'entrée des salles"}
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
    marginBottom: 24,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  passTypeCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardDark: {
    backgroundColor: "#1a1a1a",
  },
  passTypeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  passTypeName: {
    fontSize: 18,
  },
  passTypePrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E63946",
  },
  passTypeDescription: {
    opacity: 0.7,
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: "#E63946",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    marginTop: 12,
    lineHeight: 24,
    opacity: 0.8,
  },
  // Styles du pass
  passCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  passHeader: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  passLogo: {
    color: "#E63946",
    fontSize: 24,
    fontWeight: "bold",
  },
  passType: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
  },
  passBody: {
    flexDirection: "row",
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: "center",
  },
  photo: {
    width: 100,
    height: 130,
    borderRadius: 8,
  },
  photoPlaceholder: {
    width: 100,
    height: 130,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholderText: {
    fontSize: 32,
  },
  photoButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#333",
    borderRadius: 6,
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  passInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  passName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  passId: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
  },
  passValidity: {
    color: "#2A9D8F",
    fontSize: 14,
  },
  qrContainer: {
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  qrCode: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  qrPlaceholder: {
    fontSize: 48,
    color: "#000",
  },
  qrText: {
    color: "#000",
    fontSize: 12,
    marginTop: 4,
  },
  qrHint: {
    color: "#888",
    fontSize: 13,
  },
  passActions: {
    marginBottom: 16,
  },
  passActionButton: {
    backgroundColor: "#457B9D",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  passActionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  resetButton: {
    padding: 16,
    alignItems: "center",
    opacity: 0.6,
  },
  resetButtonText: {
    fontSize: 14,
  },
});
