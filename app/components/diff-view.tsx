"use client";

import type { UiDiffField } from "@/lib/ui-types";

type DiffViewProps = {
  diffs: UiDiffField[];
};

export default function DiffView({ diffs }: DiffViewProps) {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
          Drift Analysis
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Diff View</h2>
      </div>

      {diffs.length === 0 ? (
        <p className="text-neutral-400">No drift detected.</p>
      ) : (
        <div className="grid gap-4">
          {diffs.map((diff) => (
            <div
              key={diff.field}
              className="rounded-2xl border border-red-900/70 bg-red-950/20 p-4"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-red-300">
                {diff.field}
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Before
                  </p>
                  <p className="whitespace-pre-wrap text-sm text-neutral-200">
                    {diff.before}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                    After
                  </p>
                  <p className="whitespace-pre-wrap text-sm text-neutral-200">
                    {diff.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}