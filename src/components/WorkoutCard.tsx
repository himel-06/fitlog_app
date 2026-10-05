import Image from "next/image";
import Link from "next/link";
import StatsRow from "./StatsRow";
import type { Workout } from "@/types/workout";

export default function WorkoutCard({ w }: { w: Workout }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="group block overflow-hidden rounded-xl border border-line bg-card transition hover:-translate-y-1 hover:border-accent"
    >
      <Image
        src={w.image}
        alt={w.name}
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-2">
          {w.muscleGroups.map((m) => (
            <span
              key={m}
              className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
            >
              {m}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl uppercase tracking-wide">
          {w.name}
        </h3>

        <p className="text-sm text-muted">
          {w.equipment}
        </p>

        <StatsRow w={w} />
      </div>
    </Link>
  );
}
