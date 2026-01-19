import { CameraView, useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ScanScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Si les permissions ne sont pas encore chargées
  if (!permission) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: "Scanner QR Code" }} />
        <ThemedText>Chargement des permissions...</ThemedText>
      </ThemedView>
    );
  }

  // Si la permission n'est pas accordée
  if (!permission.granted) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <Stack.Screen options={{ title: "Scanner QR Code" }} />
        <View style={styles.permissionContainer}>
          <ThemedText style={styles.permissionEmoji}>📷</ThemedText>
          <ThemedText type="title" style={styles.permissionTitle}>
            Accès à la caméra requis
          </ThemedText>
          <ThemedText style={styles.permissionText}>
            {"Pour scanner les QR codes des enquêtes de satisfaction, nous avons besoin d'accéder à votre caméra."}
          </ThemedText>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Autoriser l'accès à la caméra"
          >
            <ThemedText style={styles.permissionButtonText}>
              Autoriser la caméra
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Retour"
          >
            <ThemedText style={styles.backButtonText}>← Retour</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  // Quand un QR code est scanné
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;

    setScanned(true);
    setScannedData(data);
    setShowResult(true);
  };

  // Ouvrir le lien scanné
  const openScannedLink = async () => {
    if (!scannedData) return;

    // Vérifier si c'est une URL valide
    if (
      scannedData.startsWith("http://") ||
      scannedData.startsWith("https://")
    ) {
      const canOpen = await Linking.canOpenURL(scannedData);
      if (canOpen) {
        await Linking.openURL(scannedData);
        setShowResult(false);
        router.back();
      } else {
        Alert.alert("Erreur", "Impossible d'ouvrir ce lien.");
      }
    } else if (scannedData.startsWith("FEFFS-SURVEY-")) {
      // QR Code d'enquête FEFFS interne
      Alert.alert(
        "Enquête FEFFS",
        `Code d'enquête détecté : ${scannedData}\n\nL'enquête de satisfaction s'ouvrirait ici.`,
        [
          {
            text: "OK",
            onPress: () => {
              setShowResult(false);
              router.back();
            },
          },
        ]
      );
    } else {
      // Autre type de données
      Alert.alert(
        "QR Code scanné",
        `Données : ${scannedData}`,
        [
          {
            text: "OK",
            onPress: () => {
              setShowResult(false);
              setScanned(false);
            },
          },
        ]
      );
    }
  };

  // Scanner à nouveau
  const scanAgain = () => {
    setScanned(false);
    setScannedData(null);
    setShowResult(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Scanner QR Code",
          headerTransparent: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />

      {/* Vue caméra */}
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {/* Overlay avec zone de scan */}
        <View style={styles.overlay}>
          {/* Zone supérieure sombre */}
          <View style={styles.overlayTop} />

          {/* Zone du milieu avec le cadre */}
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanArea}>
              {/* Coins du cadre */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
            <View style={styles.overlaySide} />
          </View>

          {/* Zone inférieure sombre */}
          <View style={styles.overlayBottom}>
            <ThemedText style={styles.scanText}>
              Placez le QR Code dans le cadre
            </ThemedText>
            <ThemedText style={styles.scanSubtext}>
              {"Scannez le QR code affiché en salle pour accéder à l'enquête de satisfaction"}
            </ThemedText>
          </View>
        </View>
      </CameraView>

      {/* Bouton retour flottant */}
      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => router.back()}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Fermer le scanner"
      >
        <ThemedText style={styles.floatingBackButtonText}>✕</ThemedText>
      </TouchableOpacity>

      {/* Modal de résultat */}
      <Modal
        visible={showResult}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowResult(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
            <ThemedText style={styles.modalEmoji}>✅</ThemedText>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              QR Code détecté !
            </ThemedText>
            <ThemedText style={styles.modalData} numberOfLines={3}>
              {scannedData}
            </ThemedText>

            <View style={styles.modalActions}>
              {scannedData?.startsWith("http") && (
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={openScannedLink}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Ouvrir le lien"
                >
                  <ThemedText style={styles.modalButtonText}>
                    🔗 Ouvrir le lien
                  </ThemedText>
                </TouchableOpacity>
              )}

              {scannedData?.startsWith("FEFFS-SURVEY-") && (
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={openScannedLink}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Accéder à l'enquête"
                >
                  <ThemedText style={styles.modalButtonText}>
                    {"📝 Accéder à l'enquête"}
                  </ThemedText>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={scanAgain}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Scanner un autre QR code"
              >
                <ThemedText style={styles.modalButtonSecondaryText}>
                  🔄 Scanner à nouveau
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => {
                  setShowResult(false);
                  router.back();
                }}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Fermer"
              >
                <ThemedText style={styles.modalButtonCancelText}>
                  Fermer
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  // Overlay pour le cadre de scan
  overlay: {
    flex: 1,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  overlayMiddle: {
    flexDirection: "row",
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scanArea: {
    width: 280,
    height: 280,
    position: "relative",
  },
  overlayBottom: {
    flex: 1.5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingTop: 30,
    alignItems: "center",
  },
  scanText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  scanSubtext: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 40,
  },
  // Coins du cadre
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#E63946",
    borderWidth: 4,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 12,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 12,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 12,
  },
  // Permission
  permissionContainer: {
    padding: 40,
    alignItems: "center",
  },
  permissionEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  permissionTitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  permissionText: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: "#E63946",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    padding: 12,
  },
  backButtonText: {
    color: "#E63946",
    fontSize: 16,
  },
  // Bouton retour flottant
  floatingBackButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingBackButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 30,
    alignItems: "center",
  },
  modalContentDark: {
    backgroundColor: "#1a1a1a",
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    marginBottom: 12,
  },
  modalData: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  modalActions: {
    width: "100%",
    gap: 12,
  },
  modalButton: {
    backgroundColor: "#E63946",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalButtonSecondary: {
    backgroundColor: "#E6394620",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonSecondaryText: {
    color: "#E63946",
    fontSize: 16,
    fontWeight: "600",
  },
  modalButtonCancel: {
    paddingVertical: 12,
    alignItems: "center",
  },
  modalButtonCancelText: {
    opacity: 0.6,
    fontSize: 14,
  },
});
