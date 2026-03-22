"use client";

import type { UiBundle } from "@/lib/ui-types";

type SnapshotViewProps = {
  bundle: UiBundle | null;
  onTamper: () => void;
  onExport: () => void;
  hasBundle: boolean;
  disabled?: boolean;
};

export default function SnapshotView({
  bundle,
  onTamper,
  onExport,
  hasBundle,
  disabled = false,
}: SnapshotViewProps) {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
          Step 2
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Snapshot Bundle</h2>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={onExport}
          disabled={!hasBundle || disabled}
          className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Export JSON
        </button>

        <button
          onClick={onTamper}
          disabled={!hasBundle || disabled}
          className="rounded-2xl border border-amber-700 bg-amber-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Tamper Snapshot
        </button>
      </div>

      {!bundle ? (
        <p className="text-neutral-400">No snapshot bundle generated yet.</p>
      ) : (
        <div className="grid gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              SHA-256
            </p>
            <p className="break-all font-mono text-sm text-neutral-100">
              {bundle.hash}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Canonical JSON
            </p>
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words text-sm text-neutral-200">
              {bundle.canonical}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}