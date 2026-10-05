import Image from "next/image";
import logo from "@/assets/logo.png"

export default function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <Image
        src={logo}
        alt="FitLog Logo"
        className="h-8 w-8 rounded-md"
      />

      {showText && (
        <span className="font-display text-xl tracking-wider">
          FITLOG
        </span>
      )}
    </span>
  );
}
