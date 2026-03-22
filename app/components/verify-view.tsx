"use client";

import type { UiVerifyResult } from "@/lib/ui-types";

type VerifyViewProps = {
  result: UiVerifyResult | null;
  onVerify: () => void;
  onClear: () => void;
  onImportClick: () => void;
  hasBundle: boolean;
  disabled?: boolean;
};

export default function VerifyView({
  result,
  onVerify,
  onClear,
  onImportClick,
  hasBundle,
  disabled = false,
}: VerifyViewProps) {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
          Step 3
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Verifier Panel</h2>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={onVerify}
          disabled={!hasBundle || disabled}
          className="rounded-2xl border border-emerald-700 bg-emerald-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Verify Snapshot
        </button>

        <button
          onClick={onImportClick}
          disabled={disabled}
          className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Import JSON
        </button>

        <button
          onClick={onClear}
          disabled={disabled}
          className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear
        </button>
      </div>

      {!result ? (
        <p className="text-neutral-400">No verification executed yet.</p>
      ) : (
        <div className="grid gap-4">
          <div
            className={`rounded-2xl border p-4 ${
              result.ok
                ? "border-emerald-800 bg-emerald-950/40"
                : "border-red-800 bg-red-950/40"
            }`}
          >
            <p className="mb-1 text-xs uppercase tracking-[0.18em] text-neutral-400">
              Verify Status
            </p>
            <p className="text-xl font-semibold">
              {result.ok ? "VALID" : "INVALID"}
            </p>
            <p className="mt-2 text-sm text-neutral-300">{result.reason}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Canonical Match
            </p>
            <p className="text-sm text-neutral-100">
              {result.canonicalMatches ? "Yes" : "No"}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Expected Hash
            </p>
            <p className="break-all font-mono text-sm text-neutral-100">
              {result.expectedHash}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Actual Hash
            </p>
            <p className="break-all font-mono text-sm text-neutral-100">
              {result.actualHash}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              Verifier Version
            </p>
            <p className="text-sm text-neutral-100">{result.verifierVersion}</p>
          </div>
        </div>
      )}
    </section>
  );
}