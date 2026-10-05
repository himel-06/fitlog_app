export interface Workout {
  id: number;
  name: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  image: string;
  description: string;
  instructions: string[];
}

export interface PlanItem {
  id: number;
  done: boolean;
}

export type PlanWorkout = Workout & { done: boolean };