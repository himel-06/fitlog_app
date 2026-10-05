import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export default function StatsRow({ w }: { w: Workout }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span className="flex items-center gap-1"><Clock size={14} /> {w.duration} min</span>
      <span className="flex items-center gap-1"><Flame size={14} /> {w.calories} kcal</span>
      <span className="flex items-center gap-1 text-accent"><Star size={14} fill="currentColor" /> {w.rating}</span>
    </div>
  );
}
