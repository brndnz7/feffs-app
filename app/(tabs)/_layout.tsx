import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          headerTitle: "FEFFS 2026",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          tabBarAccessibilityLabel: "Onglet Accueil",
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: "Programme",
          headerTitle: "Programme",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="film.fill" color={color} />
          ),
          tabBarAccessibilityLabel: "Onglet Programme des films et événements",
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Mon Planning",
          headerTitle: "Mon Planning",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
          tabBarAccessibilityLabel: "Onglet Mon planning personnalisé",
        }}
      />
      <Tabs.Screen
        name="pass"
        options={{
          title: "Mon Pass",
          headerTitle: "Mon Pass",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="ticket.fill" color={color} />
          ),
          tabBarAccessibilityLabel: "Onglet Mon pass festivalier",
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "Plus",
          headerTitle: "Plus",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="ellipsis" color={color} />
          ),
          tabBarAccessibilityLabel: "Onglet Plus et paramètres",
        }}
      />
      {/* Cache l'ancien onglet explore */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
