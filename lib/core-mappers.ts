import { canonicalJson } from "./canonical-json";
import { makeBundleId, sha256 } from "./hash";
import type {
  ApiCreateBundleRequest,
  CoreBundleV1,
  CoreCreateRequest,
  CoreVerifyRequest,
  CoreVerifyResponse,
} from "./core-contract";
import type {
  ComposeFormInput,
  CoreMode,
  UiBundle,
  UiDiffField,
  UiVerifyResult,
} from "./ui-types";

function normalizeTags(tags: string): string[] {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function mapComposeToCoreCreateRequest(
  input: ComposeFormInput
): CoreCreateRequest {
  return {
    schema_version: "core-create-request-v1",
    entry: {
      title: input.title.trim(),
      content: input.content.trim(),
      meaning: input.meaning.trim(),
      claim: input.claim.trim(),
      uncertainty: input.uncertainty.trim(),
      provenance: input.provenance.trim(),
      confidence: input.confidence.trim(),
      tags: normalizeTags(input.tags),
      event_timestamp: input.eventTimestamp.trim(),
    },
  };
}

export function mapCoreBundleToUi(bundle: CoreBundleV1): UiBundle {
  return {
    bundleId: bundle.bundle_id,
    createdAt: bundle.created_at,
    mode: bundle.mode,
    schemaVersion: bundle.schema_version,
    title: bundle.entry.title,
    content: bundle.entry.content,
    meaning: bundle.entry.meaning,
    claim: bundle.entry.claim,
    uncertainty: bundle.entry.uncertainty,
    provenance: bundle.entry.provenance,
    confidence: bundle.entry.confidence,
    tags: bundle.entry.tags,
    eventTimestamp: bundle.entry.event_timestamp,
    canonical: bundle.canonical,
    hash: bundle.hash_sha256,
    raw: bundle,
  };
}

export function mapUiBundleToCoreVerifyRequest(
  bundle: UiBundle
): CoreVerifyRequest {
  return {
    schema_version: "core-verify-request-v1",
    bundle: mapUiBundleToCoreBundle(bundle),
  };
}

export function mapCoreVerifyToUi(result: CoreVerifyResponse): UiVerifyResult {
  return {
    ok: result.ok,
    expectedHash: result.expected_hash,
    actualHash: result.actual_hash,
    reason: result.reason,
    canonicalMatches: result.canonical_match,
    verifierVersion: result.verifier_version,
  };
}

export function mapUiBundleToCoreBundle(bundle: UiBundle): CoreBundleV1 {
  return {
    schema_version: "core-bundle-v1",
    bundle_id: bundle.bundleId,
    created_at: bundle.createdAt,
    mode: bundle.mode,
    entry: {
      title: bundle.title,
      content: bundle.content,
      meaning: bundle.meaning,
      claim: bundle.claim,
      uncertainty: bundle.uncertainty,
      provenance: bundle.provenance,
      confidence: bundle.confidence,
      tags: bundle.tags,
      event_timestamp: bundle.eventTimestamp,
    },
    canonical: bundle.canonical,
    hash_sha256: bundle.hash,
  };
}

export async function buildLocalCoreBundle(
  request: CoreCreateRequest,
  mode: CoreMode
): Promise<CoreBundleV1> {
  const bundleBase = {
    schema_version: "core-bundle-v1" as const,
    bundle_id: makeBundleId(),
    created_at: new Date().toISOString(),
    mode,
    entry: request.entry,
  };

  const canonical = canonicalJson(bundleBase);
  const hash = await sha256(canonical);

  return {
    ...bundleBase,
    canonical,
    hash_sha256: hash,
  };
}

export async function verifyLocalCoreBundle(
  bundle: CoreBundleV1
): Promise<CoreVerifyResponse> {
  const rebuiltCanonical = canonicalJson({
    schema_version: bundle.schema_version,
    bundle_id: bundle.bundle_id,
    created_at: bundle.created_at,
    mode: bundle.mode,
    entry: bundle.entry,
  });

  const rebuiltHash = await sha256(rebuiltCanonical);
  const canonicalMatch = rebuiltCanonical === bundle.canonical;
  const ok = canonicalMatch && rebuiltHash === bundle.hash_sha256;

  return {
    schema_version: "core-verify-response-v1",
    ok,
    reason: ok
      ? "Bundle valid. Canonical representation and hash match."
      : "Bundle invalid. Canonical representation or hash differs.",
    expected_hash: bundle.hash_sha256,
    actual_hash: rebuiltHash,
    canonical_match: canonicalMatch,
    verifier_version: "local-core-contract-v1",
  };
}

export function diffUiBundle(bundle: UiBundle): UiDiffField[] {
  let parsed: Partial<CoreBundleV1> | null = null;

  try {
    parsed = JSON.parse(bundle.canonical) as Partial<CoreBundleV1>;
  } catch {
    return [
      {
        field: "canonical",
        before: "Stored canonical JSON could not be parsed.",
        after: "Current UI bundle exists but canonical source is unreadable.",
      },
    ];
  }

  const before = parsed?.entry;
  if (!before) {
    return [
      {
        field: "entry",
        before: "No entry found in canonical bundle.",
        after: "Current UI bundle contains entry data.",
      },
    ];
  }

  const after = {
    title: bundle.title,
    content: bundle.content,
    meaning: bundle.meaning,
    claim: bundle.claim,
    uncertainty: bundle.uncertainty,
    provenance: bundle.provenance,
    confidence: bundle.confidence,
    tags: bundle.tags,
    event_timestamp: bundle.eventTimestamp,
  };

  const fields = [
    "title",
    "content",
    "meaning",
    "claim",
    "uncertainty",
    "provenance",
    "confidence",
    "tags",
    "event_timestamp",
  ] as const;

  const diffs: UiDiffField[] = [];

  for (const field of fields) {
    const beforeRaw = before[field];
    const afterRaw = after[field];

    const beforeValue = Array.isArray(beforeRaw)
      ? beforeRaw.join(", ")
      : String(beforeRaw ?? "");
    const afterValue = Array.isArray(afterRaw)
      ? afterRaw.join(", ")
      : String(afterRaw ?? "");

    if (beforeValue !== afterValue) {
      diffs.push({
        field,
        before: beforeValue,
        after: afterValue,
      });
    }
  }

  return diffs;
}

export function mapComposeToApiCreateRequest(
  input: ComposeFormInput,
  mode: CoreMode
): ApiCreateBundleRequest {
  return {
    mode,
    input: mapComposeToCoreCreateRequest(input),
  };
}