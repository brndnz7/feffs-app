/**
 * Context pour le planning personnalisé de l'utilisateur
 * PÔLE: PLANNING
 */

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { scheduleService } from "../services/schedule";
import { storageService } from "../services/storage";
import { Schedule, ScheduleConflict } from "../types";

interface PlanningContextType {
  schedule: Schedule | null;
  isLoading: boolean;
  addScreening: (screeningId: string) => Promise<void>;
  removeScreening: (screeningId: string) => Promise<void>;
  addEvent: (eventId: string) => Promise<void>;
  removeEvent: (eventId: string) => Promise<void>;
  checkConflicts: () => Promise<ScheduleConflict[]>;
  exportToCalendar: () => Promise<void>;
  refreshSchedule: () => Promise<void>;
}

const PlanningContext = createContext<PlanningContextType | undefined>(
  undefined,
);

export function PlanningProvider({ children }: { children: ReactNode }) {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      const savedSchedule = await storageService.getSchedule();
      setSchedule(savedSchedule);
    } catch (error) {
      console.error("Error loading schedule:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addScreening = async (screeningId: string) => {
    const newSchedule = schedule || {
      userId: "current",
      screenings: [],
      events: [],
      conflicts: [],
    };
    if (!newSchedule.screenings.includes(screeningId)) {
      newSchedule.screenings.push(screeningId);
      const conflicts =
        await scheduleService.checkScheduleConflicts(newSchedule);
      newSchedule.conflicts = conflicts;
      await storageService.saveSchedule(newSchedule);
      setSchedule({ ...newSchedule });
    }
  };

  const removeScreening = async (screeningId: string) => {
    if (!schedule) return;
    const newSchedule = {
      ...schedule,
      screenings: schedule.screenings.filter((id) => id !== screeningId),
    };
    const conflicts = await scheduleService.checkScheduleConflicts(newSchedule);
    newSchedule.conflicts = conflicts;
    await storageService.saveSchedule(newSchedule);
    setSchedule(newSchedule);
  };

  const addEvent = async (eventId: string) => {
    const newSchedule = schedule || {
      userId: "current",
      screenings: [],
      events: [],
      conflicts: [],
    };
    if (!newSchedule.events.includes(eventId)) {
      newSchedule.events.push(eventId);
      const conflicts =
        await scheduleService.checkScheduleConflicts(newSchedule);
      newSchedule.conflicts = conflicts;
      await storageService.saveSchedule(newSchedule);
      setSchedule({ ...newSchedule });
    }
  };

  const removeEvent = async (eventId: string) => {
    if (!schedule) return;
    const newSchedule = {
      ...schedule,
      events: schedule.events.filter((id) => id !== eventId),
    };
    const conflicts = await scheduleService.checkScheduleConflicts(newSchedule);
    newSchedule.conflicts = conflicts;
    await storageService.saveSchedule(newSchedule);
    setSchedule(newSchedule);
  };

  const checkConflicts = async (): Promise<ScheduleConflict[]> => {
    if (!schedule) return [];
    const conflicts = await scheduleService.checkScheduleConflicts(schedule);
    setSchedule({ ...schedule, conflicts });
    await storageService.saveSchedule({ ...schedule, conflicts });
    return conflicts;
  };

  const exportToCalendar = async () => {
    if (!schedule) return;
    await scheduleService.exportToCalendar(schedule);
  };

  const refreshSchedule = async () => {
    await loadSchedule();
  };

  return (
    <PlanningContext.Provider
      value={{
        schedule,
        isLoading,
        addScreening,
        removeScreening,
        addEvent,
        removeEvent,
        checkConflicts,
        exportToCalendar,
        refreshSchedule,
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
}

export function usePlanning() {
  const context = useContext(PlanningContext);
  if (!context) {
    throw new Error("usePlanning must be used within PlanningProvider");
  }
  return context;
}
