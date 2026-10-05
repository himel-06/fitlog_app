"use client";

import { useParams, notFound } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Spinner from "@/components/Spinner";

export default function WorkoutDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    workouts,
    loading,
    error,
    addToPlan,
    save,
    inPlan,
    isSaved,
    planFull,
  } = usePlan();

  if (loading) return <Spinner />;

  if (error) {
    return <p className="px-4 py-20 text-center text-red-400">{error}</p>;
  }

  const w = workouts.find((x) => x.id === Number(id));

  if (!w) return notFound();

  const specs: [string, string | number][] = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating],
  ];

  const planDisabled = inPlan(w.id) || planFull;

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={w.image}
        alt={w.name}
        className="aspect-square w-full rounded-xl border border-line object-cover"
      />

      <div>
        <h1 className="font-display text-4xl uppercase sm:text-5xl">
          {w.name}
        </h1>

        <p className="mt-3 text-muted">{w.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {w.muscleGroups.map((m) => (
            <span
              key={m}
              className="rounded-full border border-line px-3 py-1 text-xs font-semibold uppercase text-accent"
            >
              {m}
            </span>
          ))}
        </div>

        <h2 className="mt-8 font-display text-xl uppercase">
          Key Specs
        </h2>

        <dl className="mt-3 divide-y divide-line rounded-lg border border-line bg-card">
          {specs.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between px-4 py-3 text-sm"
            >
              <dt className="uppercase tracking-wider text-muted">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-display text-xl uppercase">
          Instructions
        </h2>

        <ol className="mt-3 space-y-3">
          {w.instructions.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-black">
                {i + 1}
              </span>

              <span className="text-muted">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => addToPlan(w)}
            disabled={planDisabled}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-lg">+</span>
            Add to today&apos;s plan
          </button>

          <button
            onClick={() => save(w)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-6 py-3 font-bold hover:border-accent"
          >
            <span className="text-lg">☆</span>
            {isSaved(w.id) ? "Saved" : "Save for later"}
          </button>
        </div>

        {planFull && !inPlan(w.id) && (
          <p className="mt-2 text-xs text-muted">
            Today&apos;s plan is full (5 lifts).
          </p>
        )}
      </div>
    </div>
  );
}