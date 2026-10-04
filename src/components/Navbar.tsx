"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
] as const;

export default function Navbar() {
  const path = usePathname();
  const { planItems, savedIds } = usePlan();

  const isActive = (href: string) =>
    href === "/" ? path === "/" || path.startsWith("/workout") : path.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" aria-label="FitLog home">
          <span className="hidden sm:block"><Logo /></span>
          <span className="sm:hidden"><Logo showText={false} /></span>
        </Link>

        <ul className="flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider sm:text-sm ${
                  isActive(l.href) ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">
            Plan {planItems.length}
          </Link>
          <Link href="/my-plan" className="rounded-full border border-line px-3 py-1 text-xs font-bold text-white hover:border-accent">
            Saved {savedIds.length}
          </Link>
        </div>
      </nav>
    </header>
  );
}
