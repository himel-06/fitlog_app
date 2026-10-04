import { Dumbbell } from "lucide-react";

export default function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-black">
        <Dumbbell size={18} />
      </span>
      {showText && <span className="font-display text-xl tracking-wider">FITLOG</span>}
    </span>
  );
}
