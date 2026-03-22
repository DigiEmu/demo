import {
  buildLocalCoreBundle,
  verifyLocalCoreBundle,
} from "./core-mappers";
import type {
  CoreBundleV1,
  CoreCreateRequest,
  CoreVerifyRequest,
  CoreVerifyResponse,
} from "./core-contract";
import type { CoreMode } from "./ui-types";

const CORE_BASE_URL = process.env.CORE_BASE_URL?.trim() || "";
const CORE_HTTP_TIMEOUT_MS = Number(process.env.CORE_HTTP_TIMEOUT_MS || "8000");
const CORE_HTTP_FALLBACK_TO_DEMO =
  String(process.env.CORE_HTTP_FALLBACK_TO_DEMO || "true").toLowerCase() ===
  "true";

function withTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

async function externalCreateBundle(
  input: CoreCreateRequest
): Promise<CoreBundleV1> {
  if (!CORE_BASE_URL) {
    throw new Error("CORE_BASE_URL is not configured.");
  }

  const res = await fetch(`${CORE_BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    signal: withTimeoutSignal(CORE_HTTP_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`External core create failed with status ${res.status}.`);
  }

  const data = (await res.json()) as { bundle?: CoreBundleV1 };

  if (!data.bundle) {
    throw new Error("External core create response missing bundle.");
  }

  return data.bundle;
}

async function externalVerifyBundle(
  input: CoreVerifyRequest
): Promise<CoreVerifyResponse> {
  if (!CORE_BASE_URL) {
    throw new Error("CORE_BASE_URL is not configured.");
  }

  const res = await fetch(`${CORE_BASE_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    signal: withTimeoutSignal(CORE_HTTP_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`External core verify failed with status ${res.status}.`);
  }

  const data = (await res.json()) as { result?: CoreVerifyResponse };

  if (!data.result) {
    throw new Error("External core verify response missing result.");
  }

  return data.result;
}

export async function serverCreateBundle(
  input: CoreCreateRequest,
  mode: CoreMode
): Promise<{
  bundle: CoreBundleV1;
  source: "demo-local" | "external-core" | "fallback-demo";
}> {
  switch (mode) {
    case "demo-local":
      return {
        bundle: await buildLocalCoreBundle(input, "demo-local"),
        source: "demo-local",
      };

    case "core-http":
      try {
        const bundle = await externalCreateBundle(input);
        return {
          bundle,
          source: "external-core",
        };
      } catch (error) {
        if (!CORE_HTTP_FALLBACK_TO_DEMO) {
          throw error;
        }

        return {
          bundle: await buildLocalCoreBundle(input, "core-http"),
          source: "fallback-demo",
        };
      }

    default:
      return {
        bundle: await buildLocalCoreBundle(input, "demo-local"),
        source: "demo-local",
      };
  }
}

export async function serverVerifyBundle(
  input: CoreVerifyRequest,
  mode: CoreMode
): Promise<{
  result: CoreVerifyResponse;
  source: "demo-local" | "external-core" | "fallback-demo";
}> {
  switch (mode) {
    case "demo-local":
      return {
        result: await verifyLocalCoreBundle(input.bundle),
        source: "demo-local",
      };

    case "core-http":
      try {
        const result = await externalVerifyBundle(input);
        return {
          result,
          source: "external-core",
        };
      } catch (error) {
        if (!CORE_HTTP_FALLBACK_TO_DEMO) {
          throw error;
        }

        return {
          result: await verifyLocalCoreBundle(input.bundle),
          source: "fallback-demo",
        };
      }

    default:
      return {
        result: await verifyLocalCoreBundle(input.bundle),
        source: "demo-local",
      };
  }
}