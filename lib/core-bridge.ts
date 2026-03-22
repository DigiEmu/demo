import type {
  ApiCreateBundleRequest,
  ApiCreateBundleResponse,
  ApiVerifyBundleRequest,
  ApiVerifyBundleResponse,
} from "./core-contract";

export async function coreCreateBundle(request: ApiCreateBundleRequest) {
  const res = await fetch("/api/core/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    let message = "Failed to create bundle.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {}
    throw new Error(message);
  }

  return (await res.json()) as ApiCreateBundleResponse;
}

export async function coreVerifyBundle(request: ApiVerifyBundleRequest) {
  const res = await fetch("/api/core/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    let message = "Failed to verify bundle.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {}
    throw new Error(message);
  }

  return (await res.json()) as ApiVerifyBundleResponse;
}