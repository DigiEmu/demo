"use client";

import type { ComposeFormInput } from "@/lib/ui-types";

type ComposeFormProps = {
  value: ComposeFormInput;
  onChange: (value: ComposeFormInput) => void;
  onBuildSnapshot: () => void;
  disabled?: boolean;
};

export default function ComposeForm({
  value,
  onChange,
  onBuildSnapshot,
  disabled = false,
}: ComposeFormProps) {
  function update<K extends keyof ComposeFormInput>(
    key: K,
    nextValue: ComposeFormInput[K]
  ) {
    onChange({
      ...value,
      [key]: nextValue,
    });
  }

  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
          Step 1
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Compose Knowledge</h2>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm text-neutral-300">Title</label>
          <input
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.title}
            onChange={(e) => update("title", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">Content</label>
          <textarea
            className="min-h-[120px] w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.content}
            onChange={(e) => update("content", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">Meaning</label>
          <textarea
            className="min-h-[100px] w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.meaning}
            onChange={(e) => update("meaning", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">Claim</label>
          <textarea
            className="min-h-[100px] w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.claim}
            onChange={(e) => update("claim", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Uncertainty
          </label>
          <textarea
            className="min-h-[100px] w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.uncertainty}
            onChange={(e) => update("uncertainty", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Provenance / Source
          </label>
          <input
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.provenance}
            onChange={(e) => update("provenance", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Confidence
          </label>
          <input
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.confidence}
            onChange={(e) => update("confidence", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Entity Tags
          </label>
          <input
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.tags}
            onChange={(e) => update("tags", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Event Timestamp
          </label>
          <input
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-cyan-500"
            value={value.eventTimestamp}
            onChange={(e) => update("eventTimestamp", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="pt-2">
          <button
            onClick={onBuildSnapshot}
            disabled={disabled}
            className="rounded-2xl border border-cyan-700 bg-cyan-300 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Build Snapshot Bundle
          </button>
        </div>
      </div>
    </section>
  );
}