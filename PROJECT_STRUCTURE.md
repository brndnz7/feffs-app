# 📱 FEFFS - Application Mobile

Application mobile pour le **Festival Européen du Film Fantastique de Strasbourg** développée en React Native avec Expo.

## 🏗️ Structure du Projet

```
feffs-app/
├── src/                          # Code source principal
│   ├── types/                    # Définitions TypeScript
│   │   ├── index.ts             # Types principaux (Film, Event, Pass, etc.)
│   │   ├── navigation.ts        # Types de navigation
│   │   └── env.d.ts             # Variables d'environnement
│   │
│   ├── contexts/                 # Contextes React (État global)
│   │   ├── AuthContext.tsx      # Authentification utilisateur
│   │   ├── ThemeContext.tsx     # Gestion du thème (light/dark)
│   │   ├── PlanningContext.tsx  # Planning personnalisé
│   │   └── index.tsx            # Provider principal
│   │
│   ├── services/                 # Couche de services
│   │   ├── storage.ts           # AsyncStorage (données locales)
│   │   ├── api.ts               # Communication avec l'API
│   │   ├── schedule.ts          # Algorithme de conflits horaires
│   │   ├── notifications.ts     # Push notifications
│   │   ├── camera.ts            # Caméra/Galerie (photo pass)
│   │   ├── qrcode.ts            # Génération QR Code
│   │   └── index.ts             # Export de tous les services
│   │
│   ├── screens/                  # Écrans de l'application
│   │   ├── home/                # Page d'accueil
│   │   ├── catalog/             # Catalogue films/événements
│   │   ├── schedule/            # Planning personnalisé
│   │   ├── pass/                # Achat et affichage du pass
│   │   └── settings/            # Paramètres
│   │
│   ├── navigation/               # Configuration de navigation
│   │
│   └── utils/                    # Utilitaires
│       ├── accessibility.ts     # Helpers accessibilité
│       ├── date.ts              # Formatage dates
│       ├── constants.ts         # Constantes (couleurs, etc.)
│       └── index.ts
│
├── app/                          # Routes Expo Router
│   ├── _layout.tsx              # Layout racine
│   ├── (tabs)/                  # Navigation par onglets
│   └── modal.tsx
│
├── components/                   # Composants réutilisables
├── assets/                       # Images, fonts, etc.
└── constants/                    # Constantes legacy
```

## 🎯 Fonctionnalités Principales

### ✅ Fonctionnalités "Cœur de Métier"

1. **Catalogue Numérique**
   - Affichage des films, projections et événements
   - Recherche et filtres
   - Bandes-annonces vidéo

2. **Programme Personnalisé**
   - Sélection de projections
   - Algorithme de vérification des conflits horaires
   - Calcul automatique du temps de trajet entre salles

3. **Billetterie (Pass Festivalier)**
   - Formulaire d'achat de pass
   - Prise de photo (caméra ou galerie)
   - Génération de QR Code
   - Pass numérique stocké localement

4. **Communication**
   - Notifications Push (changements de planning)
   - Module "La Quotidienne" (programme du jour)
   - Alertes personnalisées

### 🚀 Fonctionnalités Techniques Avancées

1. **Accès aux Capteurs (Caméra/Galerie)**
   - Service: `src/services/camera.ts`
   - Prise de photo pour le pass festivalier
   - Sélection depuis la galerie

2. **Export Calendrier**
   - Service: `src/services/schedule.ts`
   - Ajout automatique au calendrier natif
   - Rappels avant les projections

### ♿ Accessibilité

- Labels sémantiques sur tous les éléments interactifs
- Support complet TalkBack/VoiceOver
- Navigation au clavier
- Contraste de couleurs optimisé
- Utilitaires: `src/utils/accessibility.ts`

## 📦 Technologies

- **React Native** avec **Expo**
- **TypeScript** pour le typage statique
- **Expo Router** pour la navigation
- **React Context API** pour l'état global
- **AsyncStorage** pour la persistance locale
- **React Native Paper** pour les composants UI

### Packages Principaux

```json
{
  "@react-native-async-storage/async-storage": "Stockage local",
  "expo-camera": "Accès caméra",
  "expo-image-picker": "Sélection images",
  "expo-notifications": "Push notifications",
  "expo-calendar": "Export calendrier",
  "react-native-qrcode-svg": "Génération QR Code",
  "react-native-paper": "Composants UI"
}
```

## 🚀 Installation et Démarrage

### Prérequis

- Node.js >= 18
- npm ou yarn
- Expo CLI
- Un émulateur Android/iOS ou l'app Expo Go

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer sur Web
npm run web
```

## 👥 Organisation de l'Équipe

### Pôle Architecture & Données

- Initialisation du projet ✅
- Services de stockage (`storage.ts`, `api.ts`)
- Contexts (`AuthContext`, `ThemeContext`)
- Configuration TypeScript

### Pôle Planning

- Service de planning (`schedule.ts`)
- Algorithme de détection de conflits
- Export calendrier
- Context de planning (`PlanningContext`)

### Pôle Utilisateur

- Achat de pass
- Service caméra (`camera.ts`)
- Génération QR Code (`qrcode.ts`)
- Écrans pass

### Pôle UX/UI & Accessibilité

- Design et thèmes
- Notifications (`notifications.ts`)
- Module d'enquête
- Validation accessibilité (`accessibility.ts`)

## 📝 Variables d'Environnement

Créer un fichier `.env` à la racine :

```env
EXPO_PUBLIC_API_URL=https://api.feffs.eu
EXPO_PUBLIC_PROJECT_ID=your-expo-project-id
```

## 🎨 Thèmes

L'application supporte:

- Mode clair
- Mode sombre
- Mode automatique (suit les préférences système)

Configuration: `src/contexts/ThemeContext.tsx`

## 📱 Plateformes Cibles

- ✅ Android (min SDK 21)
- ✅ iOS (min iOS 13)
- ✅ Web (PWA)

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests de lint
npm run lint
```

## 📚 Documentation des Services

### StorageService

Gestion de la persistance locale avec AsyncStorage.

```typescript
import { storageService } from "@/services";

await storageService.saveUser(user);
const user = await storageService.getUser();
```

### ApiService

Communication avec le backend FEFFS.

```typescript
import { apiService } from "@/services";

const films = await apiService.getFilms();
const screening = await apiService.getScreeningById(id);
```

### ScheduleService

Vérification des conflits horaires et export calendrier.

```typescript
import { scheduleService } from "@/services";

const conflicts = await scheduleService.checkScheduleConflicts(schedule);
await scheduleService.exportToCalendar(schedule);
```

## 🔐 Sécurité

- Validation des entrées utilisateur
- Stockage sécurisé des données sensibles
- HTTPS pour toutes les communications API
- Validation des QR Codes

## 📄 Licence

Projet académique - DI5 2026

---

**Équipe de développement**: [Vos noms ici]  
**Encadrement**: [Nom de l'encadrant]  
**Année**: 2025-2026
