"use client";

import type { UiBundle } from "@/lib/ui-types";

type BundleSummaryProps = {
  bundle: UiBundle | null;
};

export default function BundleSummary({ bundle }: BundleSummaryProps) {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
          Bundle Summary
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Metadata Overview</h2>
      </div>

      {!bundle ? (
        <p className="text-neutral-400">No bundle available yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Bundle ID
            </p>
            <p className="break-all text-sm text-neutral-100">{bundle.bundleId}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Mode
            </p>
            <p className="text-sm text-neutral-100">{bundle.mode}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Created At
            </p>
            <p className="text-sm text-neutral-100">{bundle.createdAt}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Schema Version
            </p>
            <p className="text-sm text-neutral-100">{bundle.schemaVersion}</p>
          </div>
        </div>
      )}
    </section>
  );
}