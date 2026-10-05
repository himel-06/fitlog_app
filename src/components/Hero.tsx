
import Image from "next/image";
import banner from "../assets/banner.png";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-accent">
          WORKOUT LIBRARY
        </p>

        <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
          Train with intent. Log every set.
        </h1>

        <p className="mt-5 max-w-lg text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="btn mt-8 rounded-md bg-accent px-6 font-bold uppercase tracking-wide text-black hover:brightness-95"
        >
          Browse workouts <span>↓</span>
        </a>
      </div>

      <Image
        src={banner}
        alt="FitLog workout banner"
        className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
      />
    </section>
  );
}
