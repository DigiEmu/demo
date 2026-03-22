"use client";

import type { AppStatus } from "@/lib/ui-types";

type StatusBarProps = {
  status: AppStatus;
  message: string;
};

export default function StatusBar({ status, message }: StatusBarProps) {
  const tone =
    status === "verify-valid"
      ? "border-emerald-800 bg-emerald-950/40 text-emerald-200"
      : status === "verify-invalid" || status === "error"
      ? "border-red-800 bg-red-950/40 text-red-200"
      : status === "snapshot-tampered"
      ? "border-amber-800 bg-amber-950/40 text-amber-200"
      : "border-cyan-900/60 bg-cyan-950/20 text-cyan-100";

  return (
    <div className={`rounded-3xl border px-4 py-3 text-sm ${tone}`}>
      <span className="mr-3 font-semibold uppercase tracking-[0.16em]">
        {status}
      </span>
      <span>{message}</span>
    </div>
  );
}