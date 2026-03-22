export type CoreCreateRequest = {
  schema_version: "core-create-request-v1";
  entry: {
    title: string;
    content: string;
    meaning: string;
    claim: string;
    uncertainty: string;
    provenance: string;
    confidence: string;
    tags: string[];
    event_timestamp: string;
  };
};

export type CoreBundleV1 = {
  schema_version: "core-bundle-v1";
  bundle_id: string;
  created_at: string;
  mode: "demo-local" | "core-http";
  entry: {
    title: string;
    content: string;
    meaning: string;
    claim: string;
    uncertainty: string;
    provenance: string;
    confidence: string;
    tags: string[];
    event_timestamp: string;
  };
  canonical: string;
  hash_sha256: string;
};

export type CoreVerifyRequest = {
  schema_version: "core-verify-request-v1";
  bundle: CoreBundleV1;
};

export type CoreVerifyResponse = {
  schema_version: "core-verify-response-v1";
  ok: boolean;
  reason: string;
  expected_hash: string;
  actual_hash: string;
  canonical_match: boolean;
  verifier_version: string;
};

export type ApiCreateBundleRequest = {
  mode: "demo-local" | "core-http";
  input: CoreCreateRequest;
};

export type ApiCreateBundleResponse = {
  ok: true;
  bundle: CoreBundleV1;
  source?: "demo-local" | "external-core" | "fallback-demo";
};

export type ApiVerifyBundleRequest = {
  mode: "demo-local" | "core-http";
  input: CoreVerifyRequest;
};

export type ApiVerifyBundleResponse = {
  ok: true;
  result: CoreVerifyResponse;
  source?: "demo-local" | "external-core" | "fallback-demo";
};