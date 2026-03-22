"use client";

import type { UiBundle } from "@/lib/ui-types";

type StructuredEntryViewProps = {
  bundle: UiBundle | null;
};

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
        {title}
      </p>
      <p className="whitespace-pre-wrap text-sm text-neutral-200">{value}</p>
    </div>
  );
}

export default function StructuredEntryView({
  bundle,
}: StructuredEntryViewProps) {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
          Structured View
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Semantics and Context</h2>
      </div>

      {!bundle ? (
        <p className="text-neutral-400">No structured entry available yet.</p>
      ) : (
        <div className="grid gap-4">
          <Card title="Title" value={bundle.title} />
          <Card title="Content" value={bundle.content} />
          <Card title="Meaning" value={bundle.meaning} />
          <Card title="Claim" value={bundle.claim} />
          <Card title="Uncertainty" value={bundle.uncertainty} />
          <Card title="Provenance" value={bundle.provenance} />
          <Card title="Confidence" value={bundle.confidence} />
          <Card title="Entity Tags" value={bundle.tags.join(", ")} />
          <Card title="Event Timestamp" value={bundle.eventTimestamp} />
        </div>
      )}
    </section>
  );
}