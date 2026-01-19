/**
 * Exemple de composant Button accessible
 * PÔLE: UX/UI & ACCESSIBILITÉ
 *
 * Ce composant montre comment utiliser les utilitaires d'accessibilité
 */

import React from "react";
import {
    ActivityIndicator,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { getButtonA11yProps } from "../utils/accessibility";
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "../utils/constants";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  accessibilityHint?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  accessibilityHint,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const { isDark } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BORDER_RADIUS.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: SPACING.sm,
    };

    // Size
    switch (size) {
      case "small":
        baseStyle.paddingVertical = SPACING.xs;
        baseStyle.paddingHorizontal = SPACING.md;
        break;
      case "large":
        baseStyle.paddingVertical = SPACING.md;
        baseStyle.paddingHorizontal = SPACING.xl;
        break;
      default:
        baseStyle.paddingVertical = SPACING.sm;
        baseStyle.paddingHorizontal = SPACING.lg;
    }

    // Variant
    switch (variant) {
      case "primary":
        baseStyle.backgroundColor = disabled ? "#CCCCCC" : COLORS.primary;
        break;
      case "secondary":
        baseStyle.backgroundColor = disabled
          ? "#EEEEEE"
          : isDark
            ? COLORS.background.dark
            : COLORS.background.light;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = isDark ? "#333" : "#DDD";
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = disabled ? "#CCCCCC" : COLORS.primary;
        break;
    }

    if (fullWidth) {
      baseStyle.width = "100%";
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: "600",
    };

    // Size
    switch (size) {
      case "small":
        baseStyle.fontSize = FONT_SIZES.sm;
        break;
      case "large":
        baseStyle.fontSize = FONT_SIZES.lg;
        break;
      default:
        baseStyle.fontSize = FONT_SIZES.md;
    }

    // Variant color
    if (variant === "primary") {
      baseStyle.color = "#FFFFFF";
    } else if (variant === "outline") {
      baseStyle.color = disabled ? "#CCCCCC" : COLORS.primary;
    } else {
      baseStyle.color = isDark
        ? COLORS.text.primary.dark
        : COLORS.text.primary.light;
    }

    if (disabled) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      {...getButtonA11yProps(title, accessibilityHint, disabled || loading)}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : COLORS.primary}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

// Exemple d'utilisation :
// import { Button } from '@/components/Button';
//
// <Button
//   title="Acheter un pass"
//   onPress={handlePurchase}
//   variant="primary"
//   size="large"
//   accessibilityHint="Ouvre le formulaire d'achat de pass festivalier"
// />
