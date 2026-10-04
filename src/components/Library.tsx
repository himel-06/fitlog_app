"use client";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";

type SortKey = "duration" | "calories" | "rating";

export default function Library() {
  const { workouts, loading, error } = usePlan();
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const sorted = useMemo(() => {
    const list = [...workouts];
    // duration: shortest first; calories & rating: highest first
    return sortBy === "duration"
      ? list.sort((a, b) => a.duration - b.duration)
      : list.sort((a, b) => b[sortBy] - a[sortBy]);
  }, [workouts, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl uppercase">The Library</h2>
          <p className="mt-1 text-muted">Twelve lifts covering every major muscle group.</p>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none rounded-md border border-line bg-card py-2 pl-3 pr-9 text-white outline-none focus:border-accent"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </span>
        </label>
      </div>

      {loading && <Spinner />}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((w) => <WorkoutCard key={w.id} w={w} />)}
        </div>
      )}
    </section>
  );
}
