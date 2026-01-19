/**
 * Service de génération de QR Code
 * PÔLE: UTILISATEUR
 */


export interface QRCodeData {
  passId: string;
  userId: string;
  type: string;
  validUntil: string;
}

class QRCodeService {
  /**
   * Génère les données pour un QR Code de Pass
   */
  generatePassQRData(
    passId: string,
    userId: string,
    type: string,
    validUntil: Date,
  ): string {
    const data: QRCodeData = {
      passId,
      userId,
      type,
      validUntil: validUntil.toISOString(),
    };
    return JSON.stringify(data);
  }

  /**
   * Vérifie la validité des données d'un QR Code
   */
  verifyQRCodeData(qrData: string): boolean {
    try {
      const data: QRCodeData = JSON.parse(qrData);
      const validUntil = new Date(data.validUntil);
      return validUntil > new Date();
    } catch (error) {
      console.error("Invalid QR Code data:", error);
      return false;
    }
  }

  /**
   * Parse les données d'un QR Code
   */
  parseQRCodeData(qrData: string): QRCodeData | null {
    try {
      return JSON.parse(qrData);
    } catch (error) {
      console.error("Error parsing QR Code:", error);
      return null;
    }
  }
}

export const qrCodeService = new QRCodeService();
