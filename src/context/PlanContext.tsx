"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import { fetchWorkouts } from "@/lib/api";
import type { PlanItem, PlanWorkout, Workout } from "@/types/workout";

export const MAX_PLAN = 5;

interface PlanContextValue {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  plan: PlanWorkout[];
  saved: PlanWorkout[];
  planItems: PlanItem[];
  savedIds: number[];
  inPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  planFull: boolean;
  addToPlan: (w: Workout) => void;
  save: (w: Workout) => void;
  markDone: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const Ctx = createContext<PlanContextValue | null>(null);

export function usePlan(): PlanContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 1. Load workouts from API
  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // 2. Hydrate from localStorage
  useEffect(() => {
    try {
      const storedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      ) as PlanItem[];

      const storedSaved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      ) as number[];

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlanItems(storedPlan);
      
      setSavedIds(storedSaved);
    } catch {}
    
    setHydrated(true);
  }, []);

  // 3. Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(planItems));
    localStorage.setItem("fitlog-saved", JSON.stringify(savedIds));
  }, [planItems, savedIds, hydrated]);

  const byId = useMemo(
    () =>
      Object.fromEntries(workouts.map((w) => [w.id, w])) as Record<
        number,
        Workout
      >,
    [workouts]
  );

  const plan: PlanWorkout[] = planItems
    .filter((p) => byId[p.id])
    .map((p) => ({ ...byId[p.id], done: p.done }));

  const saved: PlanWorkout[] = savedIds
    .filter((id) => byId[id])
    .map((id) => ({ ...byId[id], done: false }));

  const inPlan = (id: number) => planItems.some((p) => p.id === id);
  const isSaved = (id: number) => savedIds.includes(id);
  const planFull = planItems.length >= MAX_PLAN;

  const addToPlan = (w: Workout) => {
    if (inPlan(w.id)) return void toast("Already in today's plan");
    if (planFull)
      return void toast.error(`Plan is full (${MAX_PLAN} lifts max)`);
    setPlanItems((p) => [...p, { id: w.id, done: false }]);
    toast.success("Added to today's plan");
  };

  const save = (w: Workout) => {
    if (isSaved(w.id)) return void toast("Already saved");
    setSavedIds((s) => [...s, w.id]);
    toast.success("Saved for later");
  };

  const markDone = (id: number) => {
    setPlanItems((p) =>
      p.map((x) => (x.id === id ? { ...x, done: true } : x))
    );
    toast.success("Marked as done");
  };

  const removeFromPlan = (id: number) => {
    setPlanItems((p) => p.filter((x) => x.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSavedIds((s) => s.filter((x) => x !== id));
    toast.success("Removed from saved");
  };

  return (
    <Ctx.Provider
      value={{
        workouts,
        loading,
        error,
        plan,
        saved,
        planItems,
        savedIds,
        inPlan,
        isSaved,
        planFull,
        addToPlan,
        save,
        markDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}