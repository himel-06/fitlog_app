"use client";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PlanProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#151516", color: "#fff", border: "1px solid #2a2a2d" },
          iconTheme: { primary: "#ccff00", secondary: "#000" },
        }}
      />
    </PlanProvider>
  );
}
