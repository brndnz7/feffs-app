/**
 * Utilitaires pour formater les dates
 */

/**
 * Formate une date en français
 */
export const formatDate = (
  date: Date | string,
  format: "short" | "long" | "time" = "short",
): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  switch (format) {
    case "short":
      return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    case "long":
      return d.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    case "time":
      return d.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    default:
      return d.toLocaleDateString("fr-FR");
  }
};

/**
 * Formate une durée en minutes en format lisible
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h${mins.toString().padStart(2, "0")}`;
};

/**
 * Calcule le temps restant avant une date
 */
export const getTimeUntil = (date: Date | string): string => {
  const target = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff < 0) {
    return "Passé";
  }

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `Dans ${days} jour${days > 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    return `Dans ${hours}h`;
  }
  if (minutes > 0) {
    return `Dans ${minutes} min`;
  }
  return "Maintenant";
};

/**
 * Vérifie si deux dates sont le même jour
 */
export const isSameDay = (
  date1: Date | string,
  date2: Date | string,
): boolean => {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
