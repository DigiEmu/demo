"use client";

type ModeBadgeProps = {
  mode: string;
};

export default function ModeBadge({ mode }: ModeBadgeProps) {
  const tone =
    mode === "core-http"
      ? "border-emerald-800/70 bg-emerald-950/30 text-emerald-200"
      : "border-cyan-800/70 bg-cyan-950/30 text-cyan-200";

  return (
    <div
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${tone}`}
    >
      {mode}
    </div>
  );
}