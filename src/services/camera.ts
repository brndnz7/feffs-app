/**
 * Service de gestion de la caméra et galerie
 * PÔLE: UTILISATEUR
 * FONCTIONNALITÉ TECHNIQUE AVANCÉE #1
 */

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export interface ImageResult {
  uri: string;
  base64?: string;
  width: number;
  height: number;
}

class CameraService {
  /**
   * Demande les permissions pour la caméra
   */
  async requestCameraPermission(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      return false;
    }
  }

  /**
   * Demande les permissions pour la galerie
   */
  async requestGalleryPermission(): Promise<boolean> {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error requesting gallery permission:", error);
      return false;
    }
  }

  /**
   * Prend une photo avec la caméra
   * Utilisé pour la photo du Pass festivalier
   */
  async takePhoto(): Promise<ImageResult | null> {
    try {
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) {
        throw new Error("Permission caméra refusée");
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4], // Format portrait pour la photo de pass
        quality: 0.8,
        base64: true,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        base64: asset.base64 ?? undefined,
        width: asset.width,
        height: asset.height,
      };
    } catch (error) {
      console.error("Error taking photo:", error);
      throw error;
    }
  }

  /**
   * Sélectionne une photo depuis la galerie
   */
  async pickFromGallery(): Promise<ImageResult | null> {
    try {
      const hasPermission = await this.requestGalleryPermission();
      if (!hasPermission) {
        throw new Error("Permission galerie refusée");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        base64: asset.base64 ?? undefined,
        width: asset.width,
        height: asset.height,
      };
    } catch (error) {
      console.error("Error picking from gallery:", error);
      throw error;
    }
  }

  /**
   * Redimensionne une image si nécessaire
   */
  async resizeImage(
    uri: string,
    maxWidth: number,
    maxHeight: number,
  ): Promise<string> {
    // TODO: Implémenter le redimensionnement avec expo-image-manipulator
    return uri;
  }

  /**
   * Sauvegarde une image localement
   */
  async saveImageLocally(uri: string, filename: string): Promise<string> {
    try {
      const directory = `${FileSystem.documentDirectory}photos/`;
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      const newPath = `${directory}${filename}`;
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      return newPath;
    } catch (error) {
      console.error("Error saving image:", error);
      throw error;
    }
  }
}

export const cameraService = new CameraService();
