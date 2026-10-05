
"use client";

import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";
import WorkoutCard from "./WorkoutCard";

type SortKey = "duration" | "caloriesBurned" | "rating";

export default function Library() {
  const { workouts, loading, error } = usePlan();
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const sorted = useMemo(() => {
    const list = [...workouts];

    if (sortBy === "duration") {
      return list.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "caloriesBurned") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    return list.sort((a, b) => b.rating - a.rating);
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl uppercase">
            The Library
          </h2>

          <p className="mt-1 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          Sort By

          <span className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              style={{ appearance: "none", WebkitAppearance: "none" }}
              className="rounded-md border border-line bg-card py-2 pl-3 pr-9 text-white outline-none focus:border-accent"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
              ▼
            </span>
          </span>
        </label>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
          <span className="text-3xl animate-spin">
            ⟳
          </span>

          <p className="text-sm font-semibold uppercase tracking-wider">
            Loading workouts...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-center">
          <p className="font-semibold text-red-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-accent px-5 py-2 font-bold text-black"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} w={w} />
          ))}
        </div>
      )}
    </section>
  );
}