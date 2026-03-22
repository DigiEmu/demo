export type ComposeFormInput = {
  title: string;
  content: string;
  meaning: string;
  claim: string;
  uncertainty: string;
  provenance: string;
  confidence: string;
  tags: string;
  eventTimestamp: string;
};

export type UiBundle = {
  bundleId: string;
  createdAt: string;
  mode: "demo-local" | "core-http";
  schemaVersion: string;
  title: string;
  content: string;
  meaning: string;
  claim: string;
  uncertainty: string;
  provenance: string;
  confidence: string;
  tags: string[];
  eventTimestamp: string;
  canonical: string;
  hash: string;
  raw: unknown;
};

export type UiVerifyResult = {
  ok: boolean;
  expectedHash: string;
  actualHash: string;
  reason: string;
  canonicalMatches: boolean;
  verifierVersion: string;
};

export type UiDiffField = {
  field: string;
  before: string;
  after: string;
};

export type AppStatus =
  | "idle"
  | "snapshot-built"
  | "snapshot-loaded"
  | "snapshot-tampered"
  | "verify-valid"
  | "verify-invalid"
  | "snapshot-cleared"
  | "snapshot-exported"
  | "snapshot-imported"
  | "error";

export type CoreMode = "demo-local" | "core-http";