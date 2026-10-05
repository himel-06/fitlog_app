"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import StatsRow from "@/components/StatsRow";
import Spinner from "@/components/Spinner";

type Tab = "plan" | "saved";

const TABS: [Tab, string][] = [
  ["plan", "Today's Plan"],
  ["saved", "Saved"],
];

export default function MyPlan() {
  const { plan, saved, loading, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");

  const list = tab === "plan" ? plan : saved;
  const stats: [string, number][] = [
    ["Exercises", plan.length],
    ["Minutes", plan.reduce((s, w) => s + w.duration, 0)],
    ["Calories", plan.reduce((s, w) => s + w.caloriesBurned, 0)],
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase sm:text-5xl">My Plan</h1>
      <p className="mt-1 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {stats.map(([label, val]) => (
          <div key={label} className="rounded-lg border border-line bg-card p-4">
            <p className="font-display text-3xl text-accent">{val}</p>
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 border-b border-line">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider ${
              tab === key ? "border-b-2 border-accent text-accent" : "text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <Spinner label="Loading workouts…" />
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <h2 className="font-display text-3xl uppercase">Nothing here yet</h2>
            <p className="mt-2 text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-bold text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {list.map((w) => (
              <li
                key={w.id}
                className="flex flex-col gap-4 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.name}
                  className="h-24 w-full rounded-lg object-cover sm:w-32"
                />
                <div className="flex-1 space-y-1">
                  <h3
                    className={`font-display text-xl uppercase ${
                      w.done ? "line-through opacity-60" : ""
                    }`}
                  >
                    {w.name}
                  </h3>
                  <p className="text-sm text-muted">{w.equipment}</p>
                  <StatsRow w={w} />
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="rounded-md border border-line px-3 py-2 text-sm hover:border-accent"
                  >
                    View Details
                  </Link>
                  {tab === "plan" && (
                    <button
                      onClick={() => markDone(w.id)}
                      disabled={w.done}
                      className="inline-flex items-center gap-1 rounded-md bg-accent px-3 py-2 text-sm font-bold text-black disabled:opacity-50"
                    >
                      <Check size={16} /> {w.done ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id)
                    }
                    aria-label={`Remove ${w.name}`}
                    className="rounded-md border border-line p-2 hover:border-red-400 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}