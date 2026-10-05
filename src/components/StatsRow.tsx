
import type { Workout } from "@/types/workout";

export default function StatsRow({ w }: { w: Workout }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span className="flex items-center gap-1">
        🕒 {w.duration} min
      </span>

      <span className="flex items-center gap-1">
        🔥 {w.caloriesBurned} kcal
      </span>

      <span className="flex items-center gap-1 text-accent">
        ★ {w.rating}
      </span>
    </div>
  );
}

